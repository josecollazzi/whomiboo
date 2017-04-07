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
                transform             : 'translate(-50%, -50%)'
            }
        };

        return (

            <Modal
                isOpen={this.props.isVisible}
                onRequestClose={()=> this.props.closeModal()}
                style={customStyles}
                contentLabel="Message Action Response"
            >
                <Panel header="Mesage Action Response" bsStyle="primary">
                    <p>
                        The structure for a Message Action Response it always the same, what it change is the data.<br/>
                    </p>
                    <p>
                        This file can be used as profile for all the entry-points Message Action Responses.
                    </p>
                </Panel>
                <Button bsStyle="success" onClick={()=>this.props.onClose()}> Close </Button>
            </Modal>
        );
    }
}
export default MessageActionResponseInfo;