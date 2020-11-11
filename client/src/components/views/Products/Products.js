import React, { Component } from "react";
import {
  Card,
  Row,
  Button,
  Modal,
  ListGroupItem,
  ListGroup,
} from "react-bootstrap";
import ModalProduct from "../ModalProduct/ModalProduct";
import ModalConfirmDelete from "../ModalConfirmDelete/ModalConfirmDelete";

class Products extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  render() {
    let products = this.props.filteredCategory
      ? this.props.products.filter(
          (product) => product.category == this.props.filteredCategory
        )
      : this.props.products;

    products = products.map((product) => (
      <>
        <Card style={{ width: "22rem", marginLeft: "30px", marginTop: "10px" }}>
          <a onClick={this.handleShow} style={{ cursor: "pointer" }}>
            {" "}
            <Card.Img
              style={{ height: "300px" }}
              variant="top"
              src={product.img}
            />{" "}
          </a>
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>Description konabilir</Card.Text>
            <p></p>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <b>Price:</b> {product.price} TL
              </ListGroupItem>
              <ListGroupItem><b>Stock:</b> :{product.stock} piece</ListGroupItem>
              <ListGroupItem><b>Eski fiyatları:</b>{" "}
              {[...product.price_history]
                .reverse()
                .slice(1, 4)
                .map((oldPrice, index) => (
                oldPrice < product.price ? <b style={{color:"red"}}>{oldPrice+"TL, "}  </b> :<b style={{color:"green"}}>{oldPrice} TL,</b> 
                ))}</ListGroupItem>
            </ListGroup>
            
          </Card.Body>
          <Card.Footer>
            <ModalConfirmDelete
              headerTitle="Delete Product"
              buttonTriggerTitle="Delete"
              product={product}
              onProductDeleted={this.props.onProductDeleted}
              server={this.props.server}
              socket={this.props.socket}
            />
            <ModalProduct
              headerTitle="Edit Product"
              buttonTriggerTitle="Edit"
              buttonSubmitTitle="Save"
              price_history={product.price_history}
              productID={product._id}
              onProductAdded={this.props.onProductAdded}
              onProductUpdated={this.props.onProductUpdated}
              server={this.props.server}
              socket={this.props.socket}
            />
          </Card.Footer>
        </Card>

        {/* <Modal show={this.state.show} onHide={this.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Product Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <Card.Img style={{ height:'300px'}} variant="top" src={product.img} /> 
    <Card.Body >
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>Description konabilir</Card.Text>
      <p>PRice: {product.price}</p>
      <p>Stock :{product.stock}</p>
      <p>Category :{product.category}</p>
      
<p>En son fiyattan aşağı doğru eski fiyatlar: {[...product.price_history].reverse().map(oldPrice=> <p>-{oldPrice} Tl</p>)}</p>
    </Card.Body>
    <Card.Footer>
      <ModalConfirmDelete
        headerTitle="Delete Product"
        buttonTriggerTitle="Delete"
        product={product}
        onProductDeleted={this.props.onProductDeleted}
        server={this.props.server}
        socket={this.props.socket}
      />
      <ModalProduct
        headerTitle="Edit Product"
        buttonTriggerTitle="Edit"
        buttonSubmitTitle="Save"
        price_history={product.price_history}
        productID={product._id}
        onProductAdded={this.props.onProductAdded}
        onProductUpdated={this.props.onProductUpdated}
        server={this.props.server}
        socket={this.props.socket}
      />
    </Card.Footer>
      </Modal.Body>
    
  </Modal> */}
      </>
    ));
    // New products to top
    products = [...products].reverse();

    return (
      <>
        <Row>{products}</Row>
      </>
    );
  }
}

export default Products;
