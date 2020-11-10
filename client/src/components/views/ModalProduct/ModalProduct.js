import React, { Component } from 'react';
// import { Button, Modal } from 'semantic-ui-react';
import { Button, Modal } from 'react-bootstrap';

import FormProduct from '../FormProduct/FormProduct';

class ModalProduct extends Component {

  constructor(){
    super()

    this.state={
      show:false
    }


  }


 handleClose = () => this.setState({show:false});
   handleShow = () => this.setState({show:true});
   clicked = (data) => this.setState({show:data});

  
  render() {
    return (
     
    
      //-----------reactbootstrap
      <>
      <Button variant="warning" onClick={this.handleShow} style={{display:"flex",float:"right"}}>
      {this.props.buttonTriggerTitle}
      </Button>

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.headerTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormProduct
            cliked={this.clicked}
            buttonSubmitTitle={this.props.buttonSubmitTitle}
            price_history={this.props.price_history}
            productID={this.props.productID}
            onProductAdded={this.props.onProductAdded}
            onProductUpdated={this.props.onProductUpdated}
            server={this.props.server}
            socket={this.props.socket}
          />
          </Modal.Body>
        
      </Modal>
    </>
    );
  }
}

export default ModalProduct;