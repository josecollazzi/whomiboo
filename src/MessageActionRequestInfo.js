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
                transform             : 'translate(-50%, -50%)',
                maxWidth              : '50%'
            }
        };

        return (
            <Modal
                isOpen={this.props.isVisible}
                onRequestClose={()=> this.props.closeModal()}
                style={customStyles}
                contentLabel="Message Action Request"
            >
                <Panel header="Message Action Request" bsStyle="primary">
                    <p>
                        The structure for a Message Action Request is always the same; the only thing that changes is the data.
                    </p>
                    <p>
                        This file can be used as a profile for all the Message Action request entrypoints.
                    </p>
                </Panel>
                <Button bsStyle="success" onClick={()=>this.props.onClose()}> Close </Button>
            </Modal>
        );
    }
}
export default MessageActionRequestInfo;