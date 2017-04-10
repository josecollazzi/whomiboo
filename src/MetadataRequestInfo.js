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
                transform             : 'translate(-50%, -50%)',
                maxWidth              : '50%'
            }
        };

        return (

            <Modal
                isOpen={this.props.isVisible}
                onRequestClose={()=> this.props.closeModal()}
                style={customStyles}
                contentLabel="Metadata Request"
            >
                <Panel header="Metadata Request" bsStyle="primary">
                    <p>
                        ManyWho requires an entrypoint at the URL <code>&#123;your Boomi API base URL&#125;/metadata</code>.
                    </p>
                    <p>
                        In certain scenarios, data in the request is needed in order to dynamically create the metadata - this file is an example of what that would look like.
                    </p>
                    <p>
                        Most of the time, an empty JSON object is all that's needed to create metadata.
                    </p>
                </Panel>
                <Button bsStyle="success" onClick={()=>this.props.onClose()}> Close </Button>
            </Modal>
        );
    }
}
export default MetadataRequestInfo;