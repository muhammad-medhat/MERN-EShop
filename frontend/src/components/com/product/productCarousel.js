import React, { useState } from "react";
import { Carousel, Image } from "react-bootstrap";
import Rating from "../rating.js";
import { Link } from "react-router-dom";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTopRatedProducts } from "../../../actions/productActions.js";
import Loader from "../../loader.js";
import Message from "../../message.js";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const topProducts = useSelector((state) => state.productTopRated);
  const { loading, products, error } = topProducts;
  // console.log('carousel...', loading, products, error);
  const handleSelect = (i, e) =>{
    // console.log(i, e);
    setIndex(i)
  }
  useEffect(()=>{
    dispatch(getTopRatedProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    products && (
      <>
        <Carousel pause="hover" activeIndex={index} onSelect={handleSelect}>
          {products.map((p, i) => (
            <Carousel.Item key={p._id}>
              <Image fluid src={p.image} alt={p.name} />
              <Carousel.Caption>
                <h3>{p.name}</h3>
                <p>
                  <Rating value={p.rating} />
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </>
    )
  );
};

export default ProductCarousel;
