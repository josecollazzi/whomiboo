import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import Modal from 'react-modal';

class MessageActionResponseInfo extends Component {
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
                transform             : 'translate(-50%, -50%)',
                maxWidth              : '50%'
            }
        };

        return (

            <Modal
                isOpen={this.props.isVisible}
                onRequestClose={()=> this.props.closeModal()}
                style={customStyles}
                contentLabel="Exception Response"
            >
                <Panel header="Exception Response" bsStyle="primary">
                    <p>
                        When something goes wrong in Boomi (e.g. a Boomi connector responds with an error code), we need
                        to send this information to ManyWho to be displayed to the user and logged by the service invoker.
                    </p>
                    <p>
                        This file can be used as a profile for all the Exception Responses.
                    </p>
                </Panel>
                <Button bsStyle="success" onClick={()=>this.props.onClose()}> Close </Button>
            </Modal>
        );
    }
}
export default MessageActionResponseInfo;