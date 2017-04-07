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
                contentLabel="Metadata Request"
            >
                <Panel header="Metadata Request" bsStyle="primary">
                    <p>
                        ManyWho require a entry-point whith URL &#123;your Boomi API base URL&#125;/metadata,<br/>
                        In very specifics scenarios it is needed to sent information in the request to create the metadata <br/>
                        because it need it to be created dynamically, this file is an example of how it will look like.
                    </p>
                    <p>
                        In most of the scenarios to support an empty json object it will be enough.
                    </p>
                </Panel>
                <Button bsStyle="success" onClick={()=>this.props.onClose()}> Close </Button>
            </Modal>
        );
    }
}
export default MetadataRequestInfo;