import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import configurationValue from './structures/ConfigurationValue.json';

class MetadataViewer extends Component {
  constructor(props) {
    super(props);
  }

  render  () {
    const listConfig = this.props.response.configurationValues.map((value) => <p>{value.developerName} <button onClick={(e)=>handleClick(e,value.developerName)}>remove</button></p>);
    const listActions = this.props.response.actions.map((value) => <p>{value.developerName}</p>);
    const listTypes = this.props.response.install.typeElements.map((value) => <p>{value.developerName}</p>);

    function handleClick(e, developerName) {
        e.preventDefault();
        this.props.removeConfigurationValue(developerName);
    }

    return (
      <div>
        <button onClick={()=>this.props.addConfigurationValue(configurationValue)}>add one</button>
        <br />
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
export default MetadataViewer;
