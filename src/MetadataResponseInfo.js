import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import Modal from 'react-modal';

class MetadataResponseInfo extends Component {
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
                        ManyWho require an entry-point &#123;your Boomi API base URL&#125;/metadata, this entry point<br />
                        have to consume and produce application/json content, also the json object have to be defined <br/>
                        with a very specific structure, and it have to expose all the information required to allow <br/>
                        ManyWho to connect to the Boomi API entry-points.
                    </p>
                    <p>
                        The information required are ConfigurationValues, Types and Actions. <br/>
                        You have configure this information in the sections above.
                    </p>
                    <p>
                        Once you have your new entry point &#123;your Boomi API base URL&#125;/metadata in Boomi,<br/>
                        and you have finished the metadata using this app. Copy it to the clipboard using the button. <br/>
                        In Boomi create a new Message Shape and paste what you have in the clipboard to be responded.<br/>
                        (remember to add <b>&#39;</b> at the beginning and end of your json object )
                    </p>
                    <p>At this point you will be able to install your ManyWho service built using Boomi. <br/>
                        The URL of the services will be &#123;your Boomi API base URL&#125;
                    </p>
                    <p>Your next step will be to create the entry point for your Message Actions</p>
                </Panel>
                <Button bsStyle="success" onClick={()=>this.props.onClose()}> Close </Button>
            </Modal>
        );
    }
}
export default MetadataResponseInfo;