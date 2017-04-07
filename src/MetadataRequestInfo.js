import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import Modal from 'react-modal';

class MetadataRequestInfo extends Component {
    constructor(props) {
        super(props);
    }

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
                onRequestClose={()=> this.props.closeModal()}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h1>Info about action request</h1>
                <br/><br/><br/>
                <Button bsStyle="success" onClick={()=>this.props.onClose()}> Close </Button>
            </Modal>
        );
    }
}
export default MetadataRequestInfo;