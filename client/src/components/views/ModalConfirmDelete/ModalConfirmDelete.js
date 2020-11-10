import React, { Component } from "react";
// import { Button, Modal } from "semantic-ui-react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

class ModalConfirmDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen = (e) => this.setState({ modalOpen: true });
  handleClose = (e) => this.setState({ modalOpen: false });

  handleSubmit(e) {
    let params = e.target.getAttribute("data-productid");

    axios({
      method: "delete",
      responseType: "json",
      url: `${this.props.server}/api/products/${params}`,
    })
      .then((response) => {
        this.handleClose();
        this.props.onProductDeleted(response.data);
        this.props.socket.emit("delete", response.data);
      })
      .catch((err) => {
        this.handleClose();
        throw err;
      });
  }

  render() {
    return (
    
      //-------react-bootstrap
      <>
        <Button variant="danger" onClick={this.handleOpen} style={{display:"flex",float:"right"}}>
          {this.props.buttonTriggerTitle}
        </Button>

        <Modal show={this.state.modalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.headerTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>Are you sure you want to delete <strong>{this.props.product.name}</strong>?</p>
          </Modal.Body>
          <Button onClick={this.handleSubmit} data-productid={this.props.product._id} variant="danger" >Yes</Button>
        <Button onClick={this.handleClose} variant="warning"  >No</Button>
        </Modal>
      </>
    );
  }
}

export default ModalConfirmDelete;
