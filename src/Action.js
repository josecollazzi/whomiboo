import React, {Component} from 'react';
import { Button, Panel } from 'react-bootstrap';
import Modal from 'react-modal';
import update from 'immutability-helper';



class Action extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPropertyIsObject: false,
            newPropertyRequired: "no-required",
            newPropertyName: "",
            newPropertyType: "ContentString",
            newPropertyObjectType: "",
            action: {
                "uriPart": "",
                "developerName": "",
                "developerSummary": "",
                "serviceInputs": [],
                "serviceOutputs": [],
                "viewMessageAction": false,
                "serviceActionOutcomes": null
            }
        };
    }

    handleActionUriChange = (event) => {
        const stateCopy = update(this.state.action, {uriPart: { $set: event.target.value}});
        this.setState({action: stateCopy});
    };

    handleActionNameChange = (event) => {
        const stateCopy = update(this.state.action, {developerName: { $set: event.target.value}});
        this.setState({action: stateCopy});
    };

    handleActionDeveloperSummaryChange = (event) => {
        const stateCopy = update(this.state.action, {developerSummary: { $set: event.target.value}});
        this.setState({action: stateCopy});
    };

    handlePropertyNameChange = (event) => {
        this.setState({newPropertyName: event.target.value})
    };

    handlePropertyTypeChange = (event) => {
        this.setState({newPropertyType: event.target.value})
        if(event.target.value == "Object") {
            this.setState({newPropertyIsObject: true});
        } else {
            this.setState({newPropertyIsObject: false});
        }
    };

    handlePropertyRequiredChange = (event) => {
        this.setState({newPropertyRequired: event.target.value})
    };

    handleObjectTypeChange = (event) => {
        this.setState({newPropertyObjectType: event.target.value});
    };

    addPropertyInput = ()=> {
        if (this.state.newPropertyName) {
            const property = {
                "developerName": this.state.newPropertyName,
                "contentValue": null,
                "contentType": this.state.newPropertyType,
                "typeElementDeveloperName": null,
                "ordinal": 0,
                "required": this.state.newPropertyRequired != "no-required"
            };
            const stateCopy = update(this.state.action, {serviceInputs: {$push: [property]}});
            this.setState({action: stateCopy, newPropertyName: "", newPropertyType: "ContentString"});
        }
    };

    addPropertyOutput = () => {
        if (this.state.newPropertyName) {
            const property = {
                "developerName": this.state.newPropertyName,
                "contentValue": null,
                "contentType": this.state.newPropertyType,
                "typeElementDeveloperName": null,
                "ordinal": 0,
                "required": this.state.newPropertyRequired != "no-required"
            };

            const stateCopy = update(this.state.action, {serviceOutputs: {$push: [property]}});
            this.setState({action: stateCopy, newPropertyName: "", newPropertyType: "ContentString"});
        }
    };

    closeModal = () => {
        if (this.state.action.developerName) {
            const newAction = this.state.action;
            this.props.addAction(newAction);
            this.setState({
                actionUri: "",
                actionDeveloperName: "",
                actionDeveloperSummary: "",
                newPropertyIsObject: false,
                newPropertyRequired: "no-required",
                newPropertyName: "",
                newPropertyType: "ContentString",
                newPropertyObjectType: "",
                action: {
                    "uriPart": "",
                    "developerName": "",
                    "developerSummary": "",
                    "serviceInputs": [],
                    "serviceOutputs": [],
                    "viewMessageAction": false,
                    "serviceActionOutcomes": null
                }
            });
        }
        this.props.onClose();
    };

    render(){
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

        var objectType;
        const objectTypes = this.props.objects.map((val)=> <option value={val.developerName}>{val.developerName}</option>);

        if (this.state.newPropertyIsObject){
             objectType = (<div><label>Type</label><br/> <select value={this.state.newPropertyObjectType} onChange={this.handleObjectTypeChange}>
                 {objectTypes}
            </select></div>);
        } else {
             objectType = null;
        }

        const inputs = this.state.action.serviceInputs.map((input) => {
                if (input.required) {
                    return (<p>{input.developerName}* ({input.contentType})</p>)
                } else {
                    return (<p>{input.developerName} ({input.contentType})</p>)
                }
            }
        );
        const outputs = this.state.action.serviceOutputs.map((output) => {
            if (output.required) {
                return (<p>{output.developerName}* ({output.contentType})</p>)
            } else {
                return (<p>{output.developerName} ({output.contentType})</p>)
            }
        });

        return (
            <Modal isOpen={this.props.isVisible} onRequestClose={this.closeModal} style={customStyles} contentLabel="Action">
                <label>Action Uri</label><br/>
                <input value={this.state.action.uriPart} onChange={this.handleActionUriChange}/><br />
                <label>Action Name</label><br/>
                <input value={this.state.action.developerName} onChange={this.handleActionNameChange}/><br />
                <label>Action Summary</label><br/>
                <input value={this.state.action.developerSummary} onChange={this.handleActionDeveloperSummaryChange}/><br />
                <br/>

                <select value={this.state.newPropertyRequired} onChange={this.handlePropertyRequiredChange}>
                    <option value="required">Is required</option>
                    <option value="no-required">Is not required</option>
                </select><br/>

                <label>Property Name</label><br/>
                <input value={this.state.newPropertyName} onChange={this.handlePropertyNameChange}/><br /><br/>
                <label>Content Type</label><br/>
                <select value={this.state.newPropertyType} onChange={this.handlePropertyTypeChange}>
                    <option value="ContentString">ContentString</option>
                    <option value="ContentNumber">ContentNumber</option>
                    <option value="ContentPassword">ContentPassword</option>
                    <option value="ContentDateTime">ContentDateTime</option>
                    <option value="Object">Object</option>
                </select><br/>
                {objectType}

                <br/><br/>

                <label>Inputs</label>
                {inputs}
                <label>Outputs</label>
                {outputs}
                <br/>
                <button onClick={this.addPropertyInput}> Create Input </button>
                <button onClick={this.addPropertyOutput}> Create Output </button><br />
                <button onClick={this.closeModal}> Create Action </button><br />
            </Modal>
        );
    }
}

export default Action;