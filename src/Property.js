import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import Modal from 'react-modal';

class Property extends Component {
    constructor(props) {
        super(props);

        this.state = {
            configName: "",
            configType: "ContentString"
        };
    }

    closeModal = () => {
        if (this.state.configName) {
            const configValue = {
                "developerName": this.state.configName,
                "contentValue": null,
                "contentType": this.state.configType,
                "typeElementDeveloperName": null,
                "ordinal": 0,
                "required": true
            };

            this.props.addConfigurationValue(configValue);
        }
        this.setState({
            configName: "",
            configType: "ContentString"
        });

        this.props.onClose();
    };

    handleConfigNameChange = (event) => {
        this.setState({configName: event.target.value});
    };

    handleConfigTypeChange = (event) => {
        this.setState({configType: event.target.value});
    };

    render  () {
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

            <Modal
                isOpen={this.props.isVisible}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
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
        );
    }
}
export default Property;