import { Search, NavigateBefore, NavigateNext } from "@mui/icons-material";
import {
  Grid,
  InputAdornment,
  TextField,
  Stack
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import { ProductCard, Classifiedproduct } from './ProductCard'
import Cart from './Cart'
import { generateCartItemsFrom } from './Cart'

import SimpleSlider from "./slideCard"
import Recommended from "./recomented"
import Hotdeals from './product_files/hot_deals'
/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */


const Products = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [products, setProduct] = useState(null)
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

        setProduct(res.data)
      }).catch(err => {
        if (err.response.status >= 400) {
          enqueueSnackbar(err.response.data.message, { variant: "error", autoHideDuration: 3000 })
        }
        else {
          enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON', { variant: "error", autoHideDuration: 3000 })
        }
      })


  };

  const performSearch = async (text) => {
    await axios.get(`${config.endpoint}/products/search?value=${text}`)
      .then((res) => {
        setProduct(res.data)

      }).catch(err => {
        setProduct([])

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



  const isItemInCart = (items, product) => {
    console.log('called')
    return items.find((item) => item.productId === product._id)
  };

  

  
  const addToCart = async (
    token = localStorage.getItem('token'),
    product,
    qty,
    items = cartItem,
    products = allproduct,
    options = { preventDuplicate: false },
    
  ) => {
    if (!token) {
      enqueueSnackbar('Login to add an item to the Cart', { variant: "warning" });
    }
    else {
      if (isItemInCart(items, product)) {
        enqueueSnackbar('go to cart to update', { variant: "warning" });
      } else {
        var uppend = products.find((item) => item._id === product._id)
        uppend.qty = 1
        all.push(uppend)
        await axios({
          method: 'post',     //put
          url: `${config.endpoint}/cart`,
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
          data: {
            productId: product._id, // This is the body part
            qty: 1
          }
        }).then((res) => {
          console.log(res.data)
          setCartitem(res.data)
        })
      }
    }
  };

  const debounceSearch = (event, debounceTimeout) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        event(...args)
      }, debounceTimeout)
    }
  };
  var token = !localStorage.getItem("token")
  const optimize = useCallback(debounceSearch(performSearch, 500), [])

  return (
    <div>
      {console.log(all)}
      {all && all ? (<Header 
        cartLength={ all.length }>
      </Header>) : (<Header cartLength={0}/>)}

      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"

        onChange={(e) => optimize(e.target.value)}
      />
      <Grid container direction="row" display='flex'>

        {/* this is corrosal */}
        <Grid item className="carousel-grid" display='flex' justifyContent='center' alignItems='center'>

        </Grid>

        {/* best deals grid */}
        <Grid container className="best-deals">
          <Box width='100%' display='flex' fontSize='25px' justifyContent='space-between'>
            <b>Best Deals</b>
            <ul style={{ color: "#3187ED" }}>View All</ul>
          </Box>
          <Grid item>
            <div class='row'>
              {products && products.map((ele, ind) => (
                <ProductCard product={ele} index={ind} />
              ))}
            </div>
          </Grid>
        </Grid>


        {/* classified products */}

        <Grid className="classified-grid" display='flex' >
          <SimpleSlider products={products} />
        </Grid>

        {/* recommended */}

        <Grid container className="recommend" display='flex' >
          <Box width='100%' display='flex' fontSize='25px' justifyContent='space-between'>
            <b>Recommended</b>
            <ul style={{ color: "#3187ED" }}>View All</ul>
          </Box>
          <Grid item>
            <Recommended products={products} />
          </Grid>
          </Grid>



          {/* Flas sale */}
        <Grid height='200px'>
          dfgdgdfg

        </Grid>

        {/* hot sale*/}
        <Grid container className="recommend" display='flex' >
          <Box width='100%' display='flex' fontSize='25px' justifyContent='space-between'>
            <b>Hot Sale!</b>
          </Box>
          <Grid item>
            <Hotdeals products={products} handleAddToCart={addToCart} />
          </Grid>
        </Grid>
        


      </Grid>

      <Footer />
    </div>
  );
};

export default Products;
