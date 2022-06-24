import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {

    size: "large",
    precision:0.5,
    value: product.ratings,
    readOnly: true,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className= "productCardSpan" >({product.numOfReviews} reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
