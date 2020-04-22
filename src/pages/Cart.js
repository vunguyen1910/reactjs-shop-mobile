import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: props.cart,
    };
    this.deleteFromCart = props.deleteFromCart;
    this.editItemCart = props.editItemCart;
  }
  renderData() {
    const data =
      this.state.cart &&
      this.state.cart.map((item) => {
        return (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={
                <>
                  <IconButton
                    onClick={() => this.editItemCart(item, item.number - 1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  Number : {item.number}
                  <IconButton
                    onClick={() => this.editItemCart(item, item.number + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  this.deleteFromCart(item);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      });
    return data;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({ cart: this.props.cart });
    }
  }

  render() {
    return (
      <div>
        <center>
          <Typography variant="h6">YOUR CART</Typography>
        </center>

        <div>
          <List>{this.renderData()}</List>
        </div>
      </div>
    );
  }
}

export default Cart;
