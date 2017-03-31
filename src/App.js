import React, { Component } from 'react';
import './App.css';
{/**import JSONTree from 'react-json-tree';**/}
import { Button, Panel } from 'react-bootstrap';
var fileDownload = require('react-file-download');
import update from 'immutability-helper';
import actionResponse from './structures/ActionResponse.json';
import metadataRequest from './structures/MetadataRequest.json';
import metadataResponse from './structures/MetadataResponse.json';
import actionRequest from './structures/ActionRequest.json';
import MetadataViewer from './MetadataViewer';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {metadata: metadataResponse};

    }

    modifyMetadata = (metadataParam) => {
        this.setState({
            metadata: metadataParam
        });
    };

    addConfigurationValue = (configurationValue) => {
        const stateCopy = update(this.state.metadata, {configurationValues: { $push: [configurationValue]}});
        this.setState({metadata: stateCopy});
    }

    removeConfigurationValue = (developerName) => {
        let index = this.state.metadata.configurationValues.findIndex((config) => config.developerName == developerName);
        const stateCopy = update(this.state.metadata, {configurationValues: { $splice: [[index,1]]}});
        this.setState({metadata: stateCopy});
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2> WhomiBoo </h2>
                </div>
                <p>This project is under active development and is not fully functional.</p>
                <p className="App-intro">
                    <br/>
                    <Button bsStyle="primary" onClick={() => fileDownload(JSON.stringify(actionRequest, null, 2), 'MessageActionRequestProfile.json')}>
                        Message Action Request Profile (static)
                    </Button> <br/><br/>
                    <Button bsStyle="primary" onClick={() => fileDownload(JSON.stringify(actionResponse, null, 2), 'MessageActionResponseProfile.json')}>
                        Message Action Response Profile (static)
                    </Button> <br/><br/>
                    <Button bsStyle="primary" onClick={() => fileDownload(JSON.stringify(metadataRequest, null, 2), 'MetadataRequestProfile.json')}>
                        Metadata Request Profile
                    </Button><br/><br/>
                    <Button bsStyle="primary" onClick={() => fileDownload(JSON.stringify(this.state.metadata, null, 2), 'MetadataResponseProfile.json')}>
                        Metadata Response Profile
                    </Button>
                    <br/><br/>
                    <MetadataViewer metadata={this.modifyMetadata} response={this.state.metadata} addConfigurationValue={this.addConfigurationValue} removeConfigurationValue={this.removeConfigurationValue} />
                </p>
            </div>
        );
    }
}

export default App;