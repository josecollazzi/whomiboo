import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import configurationValue from './structures/ConfigurationValue.json';

class MetadataViewer extends Component {
  constructor(props) {
    super(props);
  }

  render  () {
    const listConfig = this.props.response.configurationValues.map(
      (value) => <p>{value.developerName}
      <Button bsStyle="danger" onClick={(e)=>handleClick(e,value.developerName, this.props.removeConfigurationValue)}>remove</Button></p>
    );
    const listActions = this.props.response.actions.map((value) => <p>{value.developerName}</p>);
    const listTypes = this.props.response.install.typeElements.map((value) => <p>{value.developerName}</p>);

    function handleClick(e, developerName, removeConfigurationValue) {
      console.log(developerName);
        e.preventDefault();
        removeConfigurationValue(developerName);
    }

    return (
      <div>
      <Panel header="List of configurationValues" bsStyle="success">
        <Button bsStyle="success" onClick={()=>this.props.addConfigurationValue(configurationValue)}>add a new configuration value</Button>
        <br /><br />
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
