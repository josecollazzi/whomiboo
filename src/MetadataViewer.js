import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import ConfigurationValue from './ConfigurationValue';
import Type from './Type';
import Action from './Action';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class MetadataViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertyOpen: false,
            typeOpen: false,
            actionOpen: false,
            configurationValueSelected: "",
            typeSelected: "",
            actionSelected: ""
        };
    }

    handleClickForRemoveConfigValue(){
        this.props.removeConfigurationValue(this.state.configurationValueSelected);
        this.setState({configurationValueSelected: ""});
    };

    handleClickForRemoveType(){
        this.props.removeType(this.state.typeSelected);
        this.setState({typeSelected: ""});
    };

    handleClickForRemoveAction(){
        this.props.removeAction(this.state.actionSelected);
        this.setState({actionSelected: ""});
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

    onConfigurationValueSelect = (row, isSelected, e) => {
        this.setState({configurationValueSelected: row.developerName});
    };

    onTypeSelect = (row, isSelected, e) => {
            this.setState({typeSelected: row.developerName});
    };

    onActionSelect = (row, isSelected, e) => {
            this.setState({actionSelected: row.developerName});
    };

    inOutPuts = (cell, row) => {
        if (cell) {
            const inout = cell.map((prop) => <div>{prop.developerName} ({prop.contentType})</div>);
            return <div>{inout}</div>;
        }
        return <div></div>
    };

    render  () {
        const selectConfigurationValueRowProp = {
            mode: 'radio',
            bgColor: 'pink',
            onSelect: this.onConfigurationValueSelect,
        };

        const selectTypeRowProp = {
            mode: 'radio',
            bgColor: 'pink',
            onSelect: this.onTypeSelect,
        };

        const selectActionRowProp = {
            mode: 'radio',
            bgColor: 'pink',
            onSelect: this.onActionSelect,
        };

        return (
            <div>
                <Panel header="List of configurationValues" bsStyle="success">
                    <Button className="button-long-size" bsStyle="success"  onClick={()=>this.setState({propertyOpen: true})}> Add a ConfigurationValue </Button>
                    <div>
                        <ConfigurationValue onClose={this.closePropertyModal} addConfigurationValue={this.props.addConfigurationValue} isVisible={this.state.propertyOpen}/>
                    </div>
                    <br />
                    <BootstrapTable className="default-table-with" data={ this.props.response.configurationValues }  selectRow={ selectConfigurationValueRowProp }>
                      <TableHeaderColumn dataField='developerName' isKey={ true } dataAlign='center'> developerName </TableHeaderColumn>
                      <TableHeaderColumn dataField='contentType' dataAlign='center'> contentType </TableHeaderColumn>
                    </BootstrapTable>

                    <Button className="button-long-size" bsStyle="danger" onClick={(e)=>this.handleClickForRemoveConfigValue()}>
                      Remove Selected ConfigurationValue
                    </Button>

                </Panel>
                <Panel header="List of types" bsStyle="success">
                    <Button className="button-long-size" bsStyle="success"  onClick={()=>this.setState({typeOpen: true})}> Add a Type </Button>
                    <div>
                        <Type onClose={this.closeTypeModal} addType={this.props.addType} isVisible={this.state.typeOpen}/>
                    </div>
                    <br />

                    <BootstrapTable className="default-table-with" data={ this.props.response.install.typeElements }  selectRow={ selectTypeRowProp }>
                        <TableHeaderColumn dataField='developerName' isKey={ true } dataAlign='center'> developerName </TableHeaderColumn>
                        <TableHeaderColumn dataField='developerSummary' dataAlign='center'> developerSummary </TableHeaderColumn>
                        <TableHeaderColumn dataField='properties' dataFormat={ this.inOutPuts }> properties </TableHeaderColumn>
                    </BootstrapTable>

                    <Button className="button-long-size" bsStyle="danger" onClick={(e)=>this.handleClickForRemoveType()}>
                        Remove Selected Type
                    </Button>
                </Panel>
                <Panel header="List of actions" bsStyle="success">
                    <Button  className="button-long-size" bsStyle="success" onClick={()=>this.setState({actionOpen: true})}> Add a Message Action </Button>
                    <div>
                        <Action onClose={this.closeActionModal} objects={this.props.response.install.typeElements} addAction={this.props.addAction} isVisible={this.state.actionOpen}/>
                    </div>
                    <br/>
                    <BootstrapTable className="default-table-with" data={ this.props.response.actions }  selectRow={ selectActionRowProp }>
                        <TableHeaderColumn dataField='uriPart' dataAlign='center'> uriPart </TableHeaderColumn>
                        <TableHeaderColumn dataField='developerName' isKey={ true } dataAlign='center'> developerName </TableHeaderColumn>
                        <TableHeaderColumn dataField='developerSummary' dataAlign='center'> developerSummary </TableHeaderColumn>
                        <TableHeaderColumn dataField='serviceInputs' dataFormat={ this.inOutPuts }> serviceInputs </TableHeaderColumn>
                        <TableHeaderColumn dataField='serviceOutputs' dataFormat={ this.inOutPuts }> serviceOutputs </TableHeaderColumn>
                    </BootstrapTable>
                    <Button className="button-long-size" bsStyle="danger" onClick={(e)=>this.handleClickForRemoveAction()}>
                          Remove Selected Action
                    </Button>
                </Panel>

            </div>
        );
    }
}
export default MetadataViewer;