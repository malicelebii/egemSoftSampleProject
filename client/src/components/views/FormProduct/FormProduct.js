import React, { Component } from 'react';
import { Button, Form  } from 'react-bootstrap';
import axios from 'axios';



class FormProduct extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      img: '',
      price: 0,
      stock: 0,
      category: '',
      price_history:[]
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.productID) {
      axios.get(`${this.props.server}/api/products/${this.props.productID}`)
      .then((res) => {
        this.setState({
          name: res.data.name,
          img: res.data.img,
          price: res.data.price,
          category: res.data.category,
          stock: res.data.stock,
          price_history: res.data.price_history,
        });
        // this.props.cliked({name:this.state.name,img:this.state.img,price:this.state.price,category:this.state.category,stock:this.state.stock,price_history:this.state.price_history})
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

 

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

 

  handleSubmit(e) {
    e.preventDefault();

    const product = {
      name: this.state.name,
      img: this.state.img,
      price: this.state.price,
      category: this.state.category,
      stock: this.state.stock,
      price_history:this.state.price_history[this.state.price_history.length-1]==this.state.price?this.props.price_history:[...this.state.price_history,this.state.price]
    }

    const method = this.props.productID ? 'put' : 'post';
    const params = this.props.productID ? this.props.productID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${this.props.server}/api/products/${params}`,
      data: product
    })
    .then((response) => {
     

      if (!this.props.productID) {
        this.setState({
          name: '',
          img: '',
          category: '',
          price: 0,
          stock: 0,
         price_history:[]
        });
        this.props.onProductAdded(response.data);
        this.props.socket.emit('add', response.data);
      }
      else {
        this.props.onProductUpdated(response.data);
        this.props.socket.emit('update', response.data);
      }
      
    })
    .catch((err) => console.log(err));


    this.props.cliked(false)
  }

  render() {
    return (
      <Form  onSubmit={this.handleSubmit}>
        <Form.Control
          label='Name'
          type='text'
          name='name'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <Form.Control
          label='Name'
          type='text'
          name='img'
          maxLength='40'
          required
          value={this.state.img}
          onChange={this.handleInputChange}
        />
        <Form.Control
          label='Price'
          type='number'
          name='price'
          required
          value={this.state.price}
          onChange={this.handleInputChange}
        />
        <Form.Control
          label='Stock'
          type='number'
          name='stock'
          required
          value={this.state.stock}
          onChange={this.handleInputChange}
        />
           <Form.Label>Example select</Form.Label>
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
       
        <Button color={this.props.buttonColor}  type="submit" onClick={this.handleSubmit}>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    );
  }
}

export default FormProduct;
