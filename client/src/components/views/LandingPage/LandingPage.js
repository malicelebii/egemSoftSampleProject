import React, { Component } from "react";
import { Form, Button, Row, Col, Modal,Container } from "react-bootstrap";
import io from "socket.io-client";
import axios from "axios";
import Products from "../Products/Products";

export class LandingPage extends Component {
  constructor() {
    super();

    this.server = "http://localhost:5000";
    this.socket = io.connect(this.server);

    this.state = {
      products: [],
      name: "",
      img: "",
      price: 0,
      category: "",
      stock: 0,
      show: false,
      filteredProducts: [],
      filteredCategory: "",
      price_history: [],
    };

    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleProductAdded = this.handleProductAdded.bind(this);
    this.handleProductUpdated = this.handleProductUpdated.bind(this);
    this.handleProductDeleted = this.handleProductDeleted.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();

    this.socket.on("add", (data) => this.handleProductAdded(data));
    this.socket.on("update", (data) => this.handleProductUpdated(data));
    this.socket.on("delete", (data) => this.handleProductDeleted(data));
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleProductAdded = (product) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products: products });
  };
  handleProductUpdated = (product) => {
    let products = this.state.products.slice();
    for (let i = 0, n = products.length; i < n; i++) {
      if (products[i]._id === product._id) {
        products[i].name = product.name;
        products[i].img = product.img;
        products[i].price_history = product.price_history;
        products[i].price = product.price;
        products[i].category = product.category;
        products[i].stock = product.stock;
        break;
      }
    }
    this.setState({ products: products });
  };
  handleProductDeleted = (product) => {
    let products = this.state.products.slice();
    products = products.filter((prod) => prod._id !== product._id);
    this.setState({ products: products });
  };

  fetchProducts() {
    axios
      .get(`${this.server}/api/products/`)
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitProduct = (e) => {
    e.preventDefault();

    let product = {
      name: this.state.name,
      img: this.state.img,
      price: this.state.price,
      category: this.state.category,
      stock: this.state.stock,
      price_history: this.state.price_history,
    };

    axios
      .post(`${this.server}/api/products/`, product)
      .then((response) => {
        this.handleProductAdded(response.data);
        this.socket.emit("add", response.data);
      })
      .catch((err) => console.log(err));
    this.setState({
      name: "",
      img: "",
      price: 0,
      stock: 0,
      show: false,
      category: "",
    });
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  render() {
    this.state.filteredProducts = this.state.products.filter(
      (product) => product.price < 150
    );

    let modal = (
      <Container>
          <Row>
            <Col md={6}>
        <Button variant="success" onClick={this.handleShow}>
          Add New Product
        </Button>
        </Col>
        <Col md={6} style={{display:'flex'}}>
          <Form.Label>Select category</Form.Label>
          <Form.Control
          style={{float:'right'}}
            as="select"
            id="filteredCategory"
            defaultValue=""
            name="filteredCategory"
            onChange={this.handleInputChange}
          >
            <option value="">Seçiniz</option>
            <option value="electronic">Electronic</option>
            <option value="whiteTools">White tools</option>
            <option value="toy">Toy</option>
          </Form.Control>
          </Col>
          </Row>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group layout="inline" onSubmit={this.submitProduct}>
              <Col span={18}>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  id="name"
                  placeholder="Product Name"
                  name="name"
                  required
                  type="text"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
                <Form.Label>Img Link</Form.Label>
                <Form.Control
                  id="img"
                  placeholder="Product Image As an External Link"
                  name="img"
                  required
                  type="text"
                  value={this.state.img}
                  onChange={this.handleInputChange}
                />
                {
                  <img
                    src={this.state.img}
                    style={{ height: "200px", width: "200px" }}
                  />
                }
                <br />
                <Form.Label>Product Price(TL)</Form.Label>
                <Form.Control
                  id="price"
                  placeholder="Product Price"
                  name="price"
                  required
                  type="number"
                  value={this.state.price}
                  onChange={this.handleInputChange}
                />
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  id="stock"
                  placeholder="Product Stock"
                  name="stock"
                  required
                  type="number"
                  value={this.state.stock}
                  onChange={this.handleInputChange}
                />
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  id="category"
                  defaultValue=""
                  name="category"
                  required
                  // value={this.state.stock}
                  onChange={this.handleInputChange}
                >
                  <option value="">Seçiniz</option>
                  <option value="electronic">Electronic</option>
                  <option value="whiteTools">White tools</option>
                  <option value="toy">Toy</option>
                </Form.Control>
              </Col>
              <Col span={2}></Col>
              <Col span={4}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={this.submitProduct}
                  htmlType="submit"
                >
                  Add Product
                </Button>
              </Col>
            </Form.Group>
          </Modal.Body>
        </Modal>
      </Container>
    );
    return (
      <React.Fragment>
        <Container>
          <Row>{modal}</Row>
          <Row>
            <Products
              onProductUpdated={this.handleProductUpdated}
              onProductDeleted={this.handleProductDeleted}
              products={this.state.products}
              filteredProducts={this.state.filteredProducts}
              filteredCategory={this.state.filteredCategory}
              server={this.server}
              socket={this.socket}
            />
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default LandingPage;
