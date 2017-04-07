import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import Modal from 'react-modal';

class MessageActionRequestInfo extends Component {
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
                contentLabel="Metadata Response"
            >
                <Panel header="Metadata Response" bsStyle="primary">
                    <p>
                        The structure for a Message Action Request it is always the same, what it change is the data.<br/>
                    </p>
                    <p>
                        This file can be used as profile for all the Message Action request entry-points.
                    </p>
                </Panel>
                <Button bsStyle="success" onClick={()=>this.props.onClose()}> Close </Button>
            </Modal>
        );
    }
}
export default MessageActionRequestInfo;