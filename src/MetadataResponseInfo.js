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
                        ManyWho require a entry-point which url should be &#123;your Boomi api base url&#125;/metadata,<br/>
                        this entry point have too consume and produce application/json content, also the json object <br/>
                        have to be in a very specific structure, and it have to expose all the information required <br/>
                        to allow ManyWho to connect to the Boomi api entry-points.
                    </p>
                    <p>
                        The information required are ConfigurationValues, Types and Actions. <br/>
                        You have configure this information in the section above.
                    </p>
                    <p>
                        Once you have your new entry point &#123;your new api base url&#125;/metadata in Boomi,<br/>
                        and your metadata looks like you want. Copy to the clipboard using the button. <br/>
                        In Boomi create a new Message Shape and paste what you have in the clipboard.<br/>
                        (remember to add <b>&#39;</b> at the beginning and end of your json object )
                    </p>
                    <p>At this point you will be able to install your ManyWho service built using Boomi.</p>
                    <p>Your next step will be create the entry point for your Message Actions</p>
                </Panel>
                <Button bsStyle="success" onClick={()=>this.props.onClose()}> Close </Button>
            </Modal>
        );
    }
}
export default MetadataResponseInfo;