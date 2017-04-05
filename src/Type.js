import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import Modal from 'react-modal';
import update from 'immutability-helper';
import Property from './Property';

class Type extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPropertyName: "",
            newPropertyContentType: "ContentString",
            type: {
                "elementType": "TYPE",
                "developerName": "",
                "developerSummary": "",
                "id": null,
                "serviceElementId": null,
                "properties": [],
                "bindings": null,
                "updateByName": false
            }
        };
    }

    closeModal = () => {
        this.props.addType(this.state.type);
        this.setState({
            newPropertyName: "",
            newPropertyContentType: "ContentString",
            type: {
                "elementType": "TYPE",
                "developerName": "",
                "developerSummary": "",
                "id": null,
                "serviceElementId": null,
                "properties": [],
                "bindings": null,
                "updateByName": false
            }
        });
        this.props.onClose();
    };

    handleTypeName = (event) => {
        const stateCopy = update(this.state.type, {developerName: { $set: event.target.value}});
        this.setState({type: stateCopy});
    };

    handleTypeSummary = (event) => {
        const stateCopy = update(this.state.type, {developerSummary: { $set: event.target.value}});
        this.setState({type: stateCopy});
    };

    handlePropertyName = (event) => {
        this.setState({newPropertyName: event.target.value});
    };

    handlePropertyContentType = (event) => {
        this.setState({newPropertyContentType: event.target.value});
    };

    removeProperty = (propertyName) => {
        const index = this.state.type.properties.findIndex((value) => value.developerName = propertyName);
        const stateCopy = update(this.state.type, {properties: { $splice: [[index,1]]}});
        this.setState({type: stateCopy});
    };

    addProperty = () => {
        if(this.state.newPropertyName) {
            const property = {
                "id": null,
                "developerName": this.state.newPropertyName,
                "contentFormat": null,
                "contentType": this.state.newPropertyContentType,
                "typeElementId": null,
                "typeElementDeveloperName": null
            };
            const stateCopy = update(this.state.type, {properties: {$push: [property]}});
            this.setState({newPropertyName: ""});
            this.setState({newPropertyContentType: "ContentString"});
            this.setState({type: stateCopy});
        }
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

        const listProperties = this.state.type.properties.map( (prop) => <p>{prop.developerName} ({prop.contentType})</p>)

        return (
            <Modal isOpen={this.props.isVisible} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                <form>
                    <label>Type Name</label><br/>
                    <input value={this.state.type.developerName} onChange={this.handleTypeName}/><br />
                    <label>Type Summary</label><br/>
                    <input value={this.state.type.developerSummary} onChange={this.handleTypeSummary}/><br /><br/>
                    <label>Property Name</label><br/>
                    <input value={this.state.newPropertyName} onChange={this.handlePropertyName}/><br />
                    <label>Property ContentType</label><br/>
                    <select value={this.state.newPropertyContentType} onChange={this.handlePropertyContentType}>
                        <option value="ContentString">ContentString</option>
                        <option value="ContentNumber">ContentNumber</option>
                        <option value="ContentPassword">ContentPassword</option>
                        <option value="ContentDateTime">ContentDateTime</option>
                    </select>
                </form><br/>
                {listProperties}
                <button onClick={this.addProperty}> Create Property </button>
                <button onClick={this.closeModal}> Create Type </button>
            </Modal>
        );
    }
}
export default Type;