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
                transform             : 'translate(-50%, -50%)',
                maxWidth              : '50%'
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
                        ManyWho requires an entrypoint at the URL <code>&#123;your Boomi API base URL&#125;/metadata</code>.
                        This entrypoint will consume and produce <code>application/json</code> with a specifically
                        defined JSON structure, and has to expose all the information required to allow ManyWho to
                        connect to the Boomi API entrypoints.
                    </p>
                    <p>
                        The response should include Configuration Values, Types and Actions (which you've configured in the sections above).
                    </p>
                    <p>
                        Once you have your new entrypoint (<code>&#123;your Boomi API base URL&#125;/metadata</code>) in
                        Boomi, and you have finished constructing the metadata using this app, copy it to the clipboard
                        using the button. In Boomi, create a new Message Shape and paste what you have in the clipboard
                        (remember to add <code>&#39;</code> at the beginning and end of your JSON object)
                    </p>
                    <p>
                        At this point you will be able to install your service built using Boomi inside ManyWho, using the
                        URL <code>&#123;your Boomi API base URL&#125;</code>.
                    </p>
                    <p>The next step is to create the entrypoint for your Message Actions.</p>
                </Panel>
                <Button bsStyle="success" onClick={()=>this.props.onClose()}> Close </Button>
            </Modal>
        );
    }
}
export default MetadataResponseInfo;