// @flow
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    width: 400,
  },
  media: {
    height: 400,
  },
});

const Home = (props) => {
  const classes = useStyles();
  const { mobiles, addToCart } = props;
  const renderData = () => {
    const data =
      mobiles &&
      mobiles.map((mobile) => {
        return (
          <Grid item key={mobile.id}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={
                    process.env.PUBLIC_URL +
                    mobile.image
                  }
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {mobile.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Price: {mobile.price} <br/>
                    Have: {mobile.number}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={()=>addToCart(mobile)}>
                  Add to card
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      });
      return data
  };

  return (
    <Grid container spacing={3}>
      {renderData()}
    </Grid>
  );
};

export default Home;
