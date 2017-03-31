import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import Property from './Property';

class MetadataViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {propertyOpen: false};
    }

    handleClickForRemoveConfigValue(e, developerName, removeConfigurationValue){
        e.preventDefault();
        removeConfigurationValue(developerName);
    };

    handleClickForRemoveType(e, developerName, removeType){
        e.preventDefault();
        removeType(developerName);
    };

    setVisible() {
        this.refs.property.openModal();
    }

    render  () {
        const listConfig = this.props.response.configurationValues.map(
            (value) => <p>{value.developerName + "("+ value.contentType + ")"}
              <Button bsStyle="danger"
                      onClick={(e)=>this.handleClickForRemoveConfigValue(e,value.developerName, this.props.removeConfigurationValue)}>
                  remove
              </Button></p>
        );
        const listActions = this.props.response.actions.map((value) => <p>{value.developerName}</p>);
        const listTypes = this.props.response.install.typeElements.map((value) =>
            <p>{value.developerName}
                <Button bsStyle="danger"
                        onClick={(e)=>this.handleClickForRemoveType(e,value.developerName, this.props.removeType)}>
                    remove
                </Button></p>
        );

        return (
            <div>
              <Panel header="List of configurationValues" bsStyle="success">
                <Button bsStyle="success"  onClick={()=>this.setVisible()}> Add a new configuration value </Button>
                  <div>
                      <Property ref="property" addConfigurationValue={this.props.addConfigurationValue} isVisible={this.state.propertyOpen}/>
                  </div>
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