import React, { Component } from 'react';
import './App.css';
{/**import JSONTree from 'react-json-tree';**/}
import { Button, Panel, Grid, Row, Col } from 'react-bootstrap';
var fileDownload = require('react-file-download');
import update from 'immutability-helper';
import actionResponse from './structures/ActionResponse.json';
import metadataRequest from './structures/MetadataRequest.json';
import actionRequest from './structures/ActionRequest.json';
import metadataResponse from './structures/MetadataResponse.json';
import MetadataViewer from './MetadataViewer';
import CopyToClipboard from 'react-copy-to-clipboard';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {copied: false, metadata: metadataResponse};
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
                    <h2> WhomiBoo </h2>
                </div>
                <div>
                    <Grid className="download-container">
                        <Row>
                            <Col xs={6} md={4}>
                                <Button bsStyle="primary" onClick={() => fileDownload(JSON.stringify(actionRequest, null, 2), 'MessageActionRequestProfile.json')}>
                                    Message Action Request Profile (static)
                                </Button>
                            </Col>
                            <Col xs={6} md={4}>
                                <Button bsStyle="primary" onClick={() => fileDownload(JSON.stringify(actionResponse, null, 2), 'MessageActionResponseProfile.json')}>
                                    Message Action Response Profile (static)
                                </Button>
                            </Col>
                            <Col xs={6} md={4}>
                                <Button bsStyle="primary" onClick={() => fileDownload(JSON.stringify(metadataRequest, null, 2), 'MetadataRequestProfile.json')}>
                                    Metadata Request Profile (example)
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