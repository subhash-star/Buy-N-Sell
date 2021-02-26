import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { spacing, borders } from "@material-ui/system";
import "./index.css";

const theme = {
  spacing: 8,
};
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  prog: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    paddingLeft: "40%",
  },
  card:{
    backgroundColor:'#222',
  },
  media: {
    // height: 0,
    width:"80%",
    marginLeft:'11%',
    paddingTop: "56.25%", // 16:9
  },
}));


const Item = ({ apiURL }) => {
  const classes = useStyles();
  let { id } = useParams();
  const [itemDetails, setitemDetails] = useState('');
  useEffect(() => {
    async function getData() {
      let data = await fetch(`${apiURL}/products/${id}`);
      data = await data.json();
      let markup = (
        <div>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={`${data.image}`}
              title={`${data.title}`}
            />
          </Card>
          <Box
            mt={2}
            border={1}
            borderRadius="borderRadius"
            borderColor="grey.300"
          >
            <Box pl={4} pt={2}>
              <Typography variant="h6" color="textPrimary" >
                {data.title}
              </Typography>
            </Box>
            <Box pl={4} py={2}>
              <Typography   variant="subtitle1">
                Price:{data.price}
              </Typography>
            </Box>
          </Box>
          <Box
            mt={2}
            border={1}
            borderRadius="borderRadius"
            borderColor="grey.300"
          >
            <Box pl={4} pt={2}>
              <Typography color="textPrimary" variant="h6">Details</Typography>
            </Box>
            <Box px={4} py={2}>
              <Typography color="textSecondary" varient="body1">
                {data.description}
              </Typography>
            </Box>
          </Box>
          <Typography color="primary" varient="h1">
            {data.category}
          </Typography>
        </div>
      );
      setitemDetails(markup);
    }
    getData();
  }, []);

  return(
    <div>
      {itemDetails == false ? (
        <div className={classes.prog}>
          <CircularProgress size={90} />
        </div>
      ) : (
       <div> {itemDetails} </div>
      )}
    </div>
  ) 
 
};

export default Item;