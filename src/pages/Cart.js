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
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: props.cart,
      isOpen: false
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
  renderSum() {
    let result = 0;
    const data =
      this.state.cart &&
      this.state.cart.map((item) => {
        result = result + item.price * item.number;
      });
    return result;
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
        <hr />
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            Price of products
          </Grid>
          <Grid item xs={6} md={6}>
            {this.renderSum()} vnd
            <Button variant="contained" color="primary" onClick={()=>{this.setState({isOpen : true})}}>
              Buy
            </Button>
          </Grid>
        </Grid>

        <Dialog
        open={this.state.isOpen}
        onClose={this.handelClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cofirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will pay {this.renderSum()} vnd for your choice
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>this.setState({isOpen: false})} color="primary">
            Disagree
          </Button>
          <Button onClick={()=>this.setState({isOpen: false})} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}

export default Cart;
