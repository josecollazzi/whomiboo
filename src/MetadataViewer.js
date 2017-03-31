import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import Modal from 'react-modal';

class MetadataViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            configName: "",
            configType: "ContentString"
        };

        this.handleConfigNameChange = this.handleConfigNameChange.bind(this);
        this.handleConfigTypeChange = this.handleConfigTypeChange.bind(this);

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.refs.subtitle.style.color = '#368bff ';
    }

    closeModal() {
        const configValue = {
            "developerName": this.state.configName,
            "contentValue": null,
            "contentType": this.state.configType,
            "typeElementDeveloperName": null,
            "ordinal": 0,
            "required": true
        };

        this.props.addConfigurationValue(configValue);
        this.setState({modalIsOpen: false});
    }

    handleConfigNameChange(event) {
        this.setState({configName: event.target.value});
    }

    handleConfigTypeChange(event) {
        this.setState({configType: event.target.value});
    }

    handleClickForRemoveConfigValue(e, developerName, removeConfigurationValue){
        e.preventDefault();
        removeConfigurationValue(developerName);
    };

    render  () {
        const listConfig = this.props.response.configurationValues.map(
            (value) => <p>{value.developerName + "("+ value.contentType + ")"}
              <Button bsStyle="danger" onClick={(e)=>this.handleClickForRemoveConfigValue(e,value.developerName, this.props.removeConfigurationValue)}>remove</Button></p>
        );
        const listActions = this.props.response.actions.map((value) => <p>{value.developerName}</p>);
        const listTypes = this.props.response.install.typeElements.map((value) => <p>{value.developerName}</p>);

        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };

        return (
            <div>
              <Panel header="List of configurationValues" bsStyle="success">
                <div>
                  <Modal
                      isOpen={this.state.modalIsOpen}
                      onAfterOpen={this.afterOpenModal}
                      onRequestClose={this.closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                  >
                    <h2 ref="subtitle">Add a Configuration Value</h2>
                    <form>
                        <label>Configuration Name</label><br/>
                        <input value={this.state.configName} onChange={this.handleConfigNameChange}/><br /><br/>
                        <label>Configuration Type</label><br/>
                        <select value={this.state.configType} onChange={this.handleConfigTypeChange}>
                            <option value="ContentString">ContentString</option>
                            <option value="ContentNumber">ContentNumber</option>
                            <option value="ContentPassword">ContentPassword</option>
                            <option value="ContentDateTime">ContentDateTime</option>
                        </select>
                    </form><br/><br/><br/>
                    <button onClick={this.closeModal}> Create </button>
                  </Modal>
                </div>
                <Button bsStyle="success" onClick={()=>this.openModal()}> Add a new configuration value </Button>
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