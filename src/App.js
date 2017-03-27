import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import JSONTree from 'react-json-tree';
import { Button, Panel } from 'react-bootstrap';
var fileDownload = require('react-file-download');

import actionResponse from './structures/ActionResponse.json';
import actionRequest from './structures/ActionRequest.json';
import metadataRequest from './structures/MetadataRequest.json';
import metadataResponse from './structures/MetadataResponse.json';
import configurationValue from './structures/ConfigurationValue.json';

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};

class MetadataViewer extends Component {
  constructor(props) {
    super(props);
  }

  render  () {
    const listItems = this.props.metadata.configurationValues.map((value) =><p>{value.developerName}</p>);
    const listActions = this.props.metadata.actions.map((value) =><p>{value.developerName}</p>);

    return (
      <div>
      <Panel header="List of configurationValues" bsStyle="success">
        {listItems}
      </Panel>
      <Panel header="List of actions" bsStyle="success">
        {listActions}
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