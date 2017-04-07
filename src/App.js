import React, { Component } from 'react';
import './App.css';

{/**import JSONTree from 'react-json-tree';**/}
import { Button, Panel, Grid, Row, Col, Glyphicon } from 'react-bootstrap';
var fileDownload = require('react-file-download');
import update from 'immutability-helper';
import actionResponse from './structures/ActionResponse.json';
import metadataRequest from './structures/MetadataRequest.json';
import actionRequest from './structures/ActionRequest.json';
import exceptionResponse from './structures/ExceptionResponse.json';
import metadataResponse from './structures/MetadataResponse.json';
import MetadataViewer from './MetadataViewer';
import CopyToClipboard from 'react-copy-to-clipboard';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import MessageActionRequestInfo from './MessageActionRequestInfo';
import MessageActionResponseInfo from './MessageActionResponseInfo';
import MetadataRequestInfo from './MetadataRequestInfo';
import MetadataResponseInfo from './MetadataResponseInfo';
import ExceptionResponseInfo from './ExceptionResponseInfo';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            openActionRequestInfo: false,
            openActionResponseInfo: false,
            openMetadataResponseInfo: false,
            openMetadataRequestInfo: false,
            openExceptionResponseInfo: false,
            openMetadataInfo: false,
            copied: false,
            metadata: metadataResponse,
        };
    }

    modifyMetadata = (metadataParam) => {
        this.setState({
            metadata: metadataParam
        });
    };

    addConfigurationValue = (configurationValue) => {
        const stateCopy = update(this.state.metadata, {configurationValues: { $push: [configurationValue]}});
        this.setState({metadata: stateCopy});
    };

    addType = (typeElement) => {
        if (typeElement.developerName) {
            const stateCopy = update(this.state.metadata, {install: {typeElements: {$push: [typeElement]}}});
            this.setState({metadata: stateCopy});
        }
    };

    addAction = (action) => {
        if (action) {
            const stateCopy = update(this.state.metadata, {actions: {$push: [action]}});
            this.setState({metadata: stateCopy});
        }
    };

    closeActionRequestInfo = () => {
        this.setState({openActionRequestInfo: false})
    };

    closeActionResponseInfo = () => {
        this.setState({openActionResponseInfo: false})
    };

    closeMetadataRequestInfo = () => {
        this.setState({openMetadataRequestInfo: false})
    };

    closeMetadataResponseInfo = () => {
        this.setState({openMetadataResponseInfo: false})
    };

    closeExceptionResponseInfo = () => {
        this.setState({openExceptionResponseInfo: false})
    };

    removeConfigurationValue = (developerName) => {
        let index = this.state.metadata.configurationValues.findIndex((config) => config.developerName == developerName);
        const stateCopy = update(this.state.metadata, {configurationValues: { $splice: [[index,1]]}});
        this.setState({metadata: stateCopy});
    };


    removeType = (developerName) => {
        let index = this.state.metadata.install.typeElements.findIndex((type) => type.developerName == developerName);
        const stateCopy = update(this.state.metadata, {install: {typeElements: { $splice: [[index,1]]}}});
        this.setState({metadata: stateCopy});
    };

    removeAction = (developerName) => {
        let index = this.state.metadata.actions.findIndex((action) => action.developerName == developerName);
        const stateCopy = update(this.state.metadata, {actions: { $splice: [[index,1]]}});
        this.setState({metadata: stateCopy});
    };

    render() {
        var copied;

        if(this.state.copied == true) copied = <label>(copied)</label>;
        return (
            <div className="App">
                <div className="App-header">
                    <Grid className="download-container">
                        <Row>
                            <Col xs={4} md={6}>
                                <h2> WhomiBoo </h2>
                            </Col>
                            <Col xs={4} md={6}>
                                <h5 className="white-subtitle"> This application help you to create the JSON files needed to allow Boomi and ManyWho to work
                                    together without knowledge of JSON. Even if you know how to create the files manually it can
                                    help you to check that your files are right</h5>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div>
                    <MessageActionRequestInfo isVisible={this.state.openActionRequestInfo} onClose={this.closeActionRequestInfo}/>
                    <MessageActionResponseInfo isVisible={this.state.openActionResponseInfo} onClose={this.closeActionResponseInfo}/>
                    <MetadataRequestInfo isVisible={this.state.openMetadataRequestInfo} onClose={this.closeMetadataRequestInfo}/>
                    <MetadataResponseInfo isVisible={this.state.openMetadataResponseInfo} onClose={this.closeMetadataResponseInfo}/>
                    <ExceptionResponseInfo isVisible={this.state.openExceptionResponseInfo} onClose={this.closeExceptionResponseInfo}/>

                    <Grid className="download-container">
                        <Row>
                            <Col xs={3} md={3}>
                                <Button bsStyle="primary" onClick={()=> this.setState({openActionRequestInfo:true})}>
                                    <Glyphicon glyph="question-sign" />
                                </Button>
                                <Button className="button-default-size" bsStyle="primary" onClick={() => fileDownload(JSON.stringify(actionRequest, null, 2), 'MessageActionRequestProfile.json')}>
                                    Message Action Request
                                </Button>
                            </Col>
                            <Col xs={3} md={3}>
                                <Button bsStyle="primary" onClick={()=> this.setState({openActionResponseInfo:true})}>
                                    <Glyphicon glyph="question-sign" />
                                </Button>
                                <Button className="button-default-size" bsStyle="primary" onClick={() => fileDownload(JSON.stringify(actionResponse, null, 2), 'MessageActionResponseProfile.json')}>
                                    Message Action Response
                                </Button>
                            </Col>
                            <Col xs={3} md={3}>
                                <Button bsStyle="primary" onClick={()=> this.setState({openMetadataRequestInfo:true})}>
                                    <Glyphicon glyph="question-sign" />
                                </Button>
                                <Button className="button-default-size" bsStyle="primary" onClick={() => fileDownload(JSON.stringify(metadataRequest, null, 2), 'MetadataRequestProfile.json')}>
                                    Metadata Request
                                </Button>
                            </Col>
                            <Col xs={3} md={3}>
                                <Button bsStyle="primary" onClick={()=> this.setState({openExceptionResponseInfo:true})}>
                                    <Glyphicon glyph="question-sign" />
                                </Button>
                                <Button className="button-default-size" bsStyle="primary" onClick={() => fileDownload(JSON.stringify(exceptionResponse, null, 2), 'ExceptionResponseProfile.json')}>
                                    Exception
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                    <MetadataViewer metadata={this.modifyMetadata} response={this.state.metadata}
                                    addConfigurationValue={this.addConfigurationValue}
                                    removeConfigurationValue={this.removeConfigurationValue}
                                    addAction={this.addAction}
                                    addType={this.addType}
                                    removeType={this.removeType}
                                    removeAction={this.removeAction}
                    />
                    <Button bsStyle="primary" onClick={()=> this.setState({openMetadataResponseInfo:true})}>
                        <Glyphicon glyph="question-sign" />
                    </Button>
                    <Button className="button-default-size" bsStyle="primary" onClick={() => fileDownload(JSON.stringify(this.state.metadata, null, 2), 'MetadataResponseProfile.json')}>
                        Metadata Response
                    </Button>
                    <CopyToClipboard text={JSON.stringify(this.state.metadata, null, 2)} onCopy={() => this.setState({copied: true})}>
                        <Button bsStyle="primary">Copy to Clipboard Metadata Response</Button>
                    </CopyToClipboard>{copied}

                    <br/><br/><br/><br/>
                </div>
            </div>
        );
    }
}

export default App;