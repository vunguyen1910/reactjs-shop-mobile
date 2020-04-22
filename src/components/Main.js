import React, { Component } from "react";

import Header from "./Header";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import _ from "lodash";

import { Switch, Route } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: "home",
      mobiles: props.mobiles,
      priceFilter: null,
      textFilter: "",
      pageNumber: 1,
      cart: [],
    };
    this.filterData = this.filterData.bind(this);
    this.changeTextFilter = _.debounce(this.changeTextFilter.bind(this), 1000);
    this.changePriceFilter = this.changePriceFilter.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.editItemCart = this.editItemCart.bind(this);
  }
  changeTextFilter(text) {
    this.setState({ textFilter: text });
  }
  changePriceFilter(price) {
    this.setState({ priceFilter: price });
  }
  filterData(data, text, price) {
    const textFilter = text.toLowerCase();
    data =
      data &&
      data.filter((a) => {
        const nameFilter = a.name;
        const nameLower = nameFilter.toLowerCase();
        return nameLower.includes(textFilter) ? true : false;
      });
    if (price) {
      data =
        data && data.filter((a) => (parseInt(a.price) >= price ? true : false));
    }
    return data;
  }
  addToCart(item) {
    const newData = this.state.mobiles.slice();
    const indexItem = newData.indexOf(item);
    if (newData[indexItem].number > 0) {
      newData[indexItem] = {
        ...item,
        number: item.number - 1,
      };
      item = {
        ...item,
        number:
          this.props.mobiles[indexItem].number - newData[indexItem].number,
      };
      this.setState({ mobiles: newData });
      const list = this.state.cart.concat(item);

      this.setState({ cart: list });
    } else {
      alert(`${newData[indexItem].name} out of number`);
    }
  }
  deleteFromCart(item) {
    const index = this.state.cart.indexOf(item);
    if (index > -1) {
      const list = this.state.cart;
      list.splice(index, 1);
      this.setState({
        cart: list,
      });
    }
  }
  editItemCart(item, number){
    const newData = this.state.mobiles.slice();
    console.log(number)
    newData.map(i =>{
      if( i.id === item.id ){
        const indexI = newData.indexOf(i)
        newData[indexI] = {
          ...i,
          number: this.props.mobiles[indexI].number - number
        }
      }
    })
    this.setState({mobiles : newData})
    const newCart = this.state.cart.slice();
    const indexCart = newCart.indexOf(item)
    newCart[indexCart] = {
      ...item,
      number: number
    }
    this.setState({cart : newCart})
  }
  //life Cycle
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.mobiles !== this.props.mobiles) {
      this.setState({ mobiles: this.props.mobiles });
    }
  }
  render() {
    return (
      <div id="main">
        <Header
          changeTextFilter={this.changeTextFilter}
          changePriceFilter={this.changePriceFilter}
          priceFilter={this.state.priceFilter}
          lengthCart={this.state.cart.length}
        />
        <Switch>
          <Route exact path="/">
            <Home
              mobiles={this.filterData(
                this.state.mobiles,
                this.state.textFilter,
                this.state.priceFilter
              )}
              addToCart={this.addToCart}
            />
          </Route>
          <Route exact path="/cart">
            <Cart cart={this.state.cart} deleteFromCart={this.deleteFromCart} editItemCart={this.editItemCart}/>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Main;
