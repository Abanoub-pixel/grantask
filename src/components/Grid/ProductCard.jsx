import {
  Card,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  wrapper: {
    width: 340,
    position: "relative",
  },
  price: { color: "red" },
  cardContent: { paddingBottom: "50px" },
  button: { position: "absolute", bottom: "0px", width: "100%" },
}));

const ProductCard = ({ product }) => {
  const classes = useStyles();
  return (
    <Card className={classes.wrapper}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.thumbnail}
          alt={product.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography
            className={classes.price}
            variant="h6"
            color="text.secondary"
            gutterBottom
          >
            Price: {product.price}$
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.button}>
        <Button fullWidth variant="contained" color="primary">
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
