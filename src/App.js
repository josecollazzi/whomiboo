import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
{/**import JSONTree from 'react-json-tree';**/}
import { Button, Panel } from 'react-bootstrap';
var fileDownload = require('react-file-download');

import actionResponse from './structures/ActionResponse.json';
import actionRequest from './structures/ActionRequest.json';
import metadataRequest from './structures/MetadataRequest.json';
import metadataResponse from './structures/MetadataResponse.json';
import configurationValue from './structures/ConfigurationValue.json';

class MetadataViewer extends Component {
  constructor(props) {
    super(props);
  }

  render  () {
    const listConfig = this.props.metadata.configurationValues.map((value) => <p>{value.developerName}</p>);
    const listActions = this.props.metadata.actions.map((value) => <p>{value.developerName}</p>);
    const listTypes = this.props.metadata.install.typeElements.map((value) => <p>{value.developerName}</p>);

    return (
      <div>
      <Panel header="List of configurationValues" bsStyle="success">
        {listConfig}
      </Panel>
      <Panel header="List of actions" bsStyle="success">
        {listActions}
      </Panel>
      <Panel header="List of types" bsStyle="success">
        {listTypes}
      </Panel>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>WhomiBoo</h2>
        </div>
        <p>This project is under active development and is not fully functional.</p>
        <p className="App-intro">
          <br/>
          <Button bsStyle="primary" className="square" onClick={() => fileDownload(JSON.stringify(actionResponse, null, 2), 'MessageActionRequestProfile.json')}>
              Message Action Request Profile (static)
          </Button> <br/><br/>
          <Button bsStyle="primary" onClick={() => fileDownload(JSON.stringify(actionResponse, null, 2), 'MessageActionResponseProfile.json')}>
              Message Action Response Profile (static)
          </Button> <br/><br/>
          <Button bsStyle="primary" onClick={() => fileDownload(JSON.stringify(metadataRequest, null, 2), 'MetadataRequestProfile.json')}>
              Metadata Request Profile
          </Button><br/><br/>
          {/**<JSONTree data={metadataRequest} theme={theme}/><br/><br/>**/}
          <Button bsStyle="primary" onClick={() => fileDownload(JSON.stringify(metadataResponse,null, 2), 'MetadataResponseProfile.json')}>
              Metadata Response Profile
          </Button>
          <br/><br/>
          <MetadataViewer metadata={metadataResponse} />
        </p>
      </div>
    );
  }
}

export default App;
