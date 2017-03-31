import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import Modal from 'react-modal';
import configurationValue from './structures/ConfigurationValue.json';

class MetadataViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {modalIsOpen: false};

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
        this.setState({modalIsOpen: false});
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

                    <div>I am a modal</div>
                    <form>
                      <input id="inputNameValue"/><br />
                      <input id="inputTypeValue"/>
                    </form>
                    <button onClick={this.closeModal}> Cancel </button>
                    <button onClick={this.closeModal}> Create </button>
                  </Modal>
                </div>
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