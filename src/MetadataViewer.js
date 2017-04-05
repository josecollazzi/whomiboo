import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import Property from './Property';
import Type from './Type';
import Action from './Action';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class MetadataViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {propertyOpen: false, typeOpen: false, actionOpen: false};
    }

    handleClickForRemoveConfigValue(e, developerName){
        e.preventDefault();
        this.props.removeConfigurationValue(developerName);
    };

    handleClickForRemoveType(e, developerName){
        e.preventDefault();
        this.props.removeType(developerName);
    };

    handleClickForRemoveAction(e, developerName){
        e.preventDefault();
        this.props.removeAction(developerName);
    };

    closeTypeModal = () => {
        this.setState({typeOpen: false});
    };

    closePropertyModal = () => {
        this.setState({propertyOpen: false});
    };

    closeActionModal = () => {
        this.setState({actionOpen: false});
    };

    render  () {
        const listConfig = this.props.response.configurationValues.map(
            (value) => <p>{value.developerName + "("+ value.contentType + ")"} <br/>
              <Button bsStyle="danger"
                      onClick={(e)=>this.handleClickForRemoveConfigValue(e, value.developerName, this.props.removeConfigurationValue)}>
                  remove
              </Button></p>
        );

        const listTypes = this.props.response.install.typeElements.map((value) => {
            if (value.properties) {
                return <p>{value.developerName}<br/>
                    {value.properties.map((prop) => <p>{prop.developerName} ({prop.contentType})</p>)}
                    <Button bsStyle="danger" onClick={(e)=>this.handleClickForRemoveType(e, value.developerName)}>
                        remove
                    </Button>
                </p>
            }
            return <p>{value.developerName}</p>
        });

        const listActions = this.props.response.actions.map((value) => {
            return (<div><p>{value.developerName}</p>
                    inputs <br/>
                    {value.serviceInputs.map((input) => <p>{input.developerName} ({input.contentType})</p>)}
                    outputs <br/>
                    {value.serviceOutputs.map((output) => <p>{output.developerName} ({output.contentType})</p>)}
                    <Button bsStyle="danger" onClick={(e)=>this.handleClickForRemoveAction(e, value.developerName)}>
                        remove
                    </Button><br/><br/>
                </div>
            )
        });

        {/*function onAfterSaveCell(row, cellName, cellValue) {*/}
            {/*this.props.addConfigurationValue(row);*/}
        {/*}*/}

        {/*function onBeforeSaveCell(row, cellName, cellValue) {*/}
            {/*// You can do any validation on here for editing value,*/}
            {/*// return false for reject the editing*/}
            {/*return true;*/}
        {/*}*/}

        //
        // const cellEditProp = {
        //     mode: 'click',
        //     blurToSave: true,
        //     beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
        //     afterSaveCell: onAfterSaveCell  // a hook for after saving cell
        // };

        // <BootstrapTable data={this.props.response.configurationValues} cellEdit={ cellEditProp }>
        //     <TableHeaderColumn dataField='developerName' isKey={true}> developerName </TableHeaderColumn>
        //     <TableHeaderColumn dataField='contentType' > contentType </TableHeaderColumn>
        // </BootstrapTable>


        return (
            <div>
              <Panel header="List of configurationValues" bsStyle="success">
                <Button bsStyle="success"  onClick={()=>this.setState({propertyOpen: true})}> Add a new configuration value </Button>
                  <div>
                      <Property onClose={this.closePropertyModal} addConfigurationValue={this.props.addConfigurationValue} isVisible={this.state.propertyOpen}/>
                  </div>
                  <br />


                  {listConfig}
              </Panel>
                <Panel header="List of types" bsStyle="success">
                    <Button bsStyle="success"  onClick={()=>this.setState({typeOpen: true})}> Add a new Type </Button>
                    <div>
                        <Type onClose={this.closeTypeModal} addType={this.props.addType} isVisible={this.state.typeOpen}/>
                    </div>
                    <br />
                    {listTypes}
                </Panel>
              <Panel header="List of actions" bsStyle="success">
                  <Button bsStyle="success" onClick={()=>this.setState({actionOpen: true})}> Add Message Action </Button> <br/>
                  <div>
                      <Action onClose={this.closeActionModal} objects={this.props.response.install.typeElements} addAction={this.props.addAction} isVisible={this.state.actionOpen}/>
                  </div>
                  <br/>
                  {listActions}
              </Panel>

            </div>
        );
    }
}
export default MetadataViewer;