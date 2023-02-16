
import axios from "axios";
import { useSnackbar } from "notistack";
import React, {  useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import Cart from './Cart'
import { generateCartItemsFrom } from './Cart'

const Products = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [all, setAll] = useState(null)
  const [cartItem, setCartitem] = useState([])
  const [allproduct, setAllproduct] = useState([])
  useEffect(() => {
    performAPICall()
    callAll()
  }, [])
  const callAll = async () => {
    await axios.get(`${config.endpoint}/products`)
      .then((res) => {
        var dataData = res.data
        setAllproduct(res.data)
        fetchCart(localStorage.getItem('token'), dataData)
      })
  }
  const performAPICall = async () => {
    await axios.get(`${config.endpoint}/products`)
      .then((res) => {
      }).catch(err => {
        if (err.response.status >= 400) {
          enqueueSnackbar(err.response.data.message, { variant: "error", autoHideDuration: 3000 })
        }
        else {
          enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON', { variant: "error", autoHideDuration: 3000 })
        }
      })


  };

  const fetchCart = async (token, data) => {
    if (!token) return;
    try {
      await axios.get(`${config.endpoint}/cart`, { headers: { "Authorization": `Bearer ${token}` } })
        .then((res) => {

          setCartitem(res.data)
          var cartInclude = generateCartItemsFrom(res.data, data)
          setAll(cartInclude)
        })
    } catch (e) {

      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }

  };

  

  
  const handleAdd = async  (value) => {
    var product = all.find((item)=>item._id === value._id )
    if(product){
      setAll(
        all.map((item)=>
          item._id===value._id ? 
          {...product , qty:product.qty+1}
          : item
        )
      )
      await axios({
        method: 'post',     //put
        url: `${config.endpoint}/cart`,
        headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}, 
        data: {
          productId: product._id, // This is the body part
          qty: product.qty+1
        }
      }).then((res)=>{

        setCartitem(res.data)
      })
    }else{
      
  }
  }
  const handleDelete = async (value) =>{
    var product = all.find((item)=>item._id === value._id )
    if(product.qty === 1){
      setAll(all.filter((item) => item._id !== value._id))
    }
    else{
      setAll(all.map((item)=> item._id===value._id ? {...product,qty:product.qty-1} : item))
    }
    await axios({
      method: 'post',     //put
      url: `${config.endpoint}/cart`,
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}, 
      data: {
        productId: product._id, // This is the body part
        qty: product.qty-1
      }
    }).then((res)=>{

      setCartitem(res.data)
    })
  }


  return (
    <div>
      {console.log(all)}
      {all && all ? (<Header 
        cartLength={ all.length }>
      </Header>) : (<Header cartLength={0}/>)}

      {all && <>
         <Cart items={all} handleAdd={handleAdd} handleDelet={handleDelete}/>
         </>}

      <Footer />
    </div>
  );
};

export default Products;
