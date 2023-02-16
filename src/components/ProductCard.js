import { AddShoppingCartOutlined } from "@mui/icons-material";
import {useState} from 'react'
import {
  Rating,
  Stack
} from "@mui/material";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from "react";
import "./ProductCard.css";
import { useSnackbar } from "notistack";
import { lightBlue } from "@mui/material/colors";


const ProductCard = ({ product, handleAddToCart,index }) => {
  const {enqueueSnackbar} = useSnackbar()
  // console.log(product.image)
  return (
          <div class='col-lg-3' key={index} >
                  <div class="card" >
                    <div class="row no-gutters">
                      <div class="col-md-4 imageDiv" >
                        <img src={product.image} class="card-img" alt="..."/>
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          {product.name}
                          <p class="card-text">$ {product.cost}</p>
                          <Rating name="read-only" value={product.rating} readOnly />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  );
};

const Classifiedproduct = ({products}) =>{
  return (
    <Col key={products._id}>
        <Card className="classified-card">
          <Card.Img variant="top" style={{borderRadius:'30px'}} src={products.image} />
            <Card.Body>
              <Card.Text>{products.name}</Card.Text>
                <Stack direction="row" justifyContent="space-between"  display='flex'>
                  <Card.Text><span style={{color:'#00C6D7'}}>${products.cost}</span></Card.Text>
                  <Card.Text>location</Card.Text>
            </Stack>
          </Card.Body>
        </Card>
      </Col>
    
  )
}

export  {ProductCard,Classifiedproduct};
