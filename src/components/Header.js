
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import {  Stack , TextField,InputAdornment} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useSnackbar } from "notistack";

import "./Header.css";
import {useHistory} from 'react-router-dom'
import { Search,FavoriteBorder,ShoppingCart ,AccountCircle} from "@mui/icons-material";
import {useState} from 'react'
import axios from "axios";
import { config, Config } from  "../App";
import { Button } from 'react-bootstrap';


const Header = ({ cartLength}) => {
  console.log(cartLength)
  const { enqueueSnackbar } = useSnackbar();

  const [products,setProduct] = useState(null)
  const history = useHistory()



  const productsFetch = async ()=>{
    let catSet = new Set()
    await axios.get(`${config.endpoint}/products`)
    .then((res)=>{
      var dataData = res.data
      setProduct(dataData)
    })
  }
  useEffect(()=>{
    productsFetch()
  },[])
  var token = localStorage.getItem('token')
    return (
      <>
      <Box className='top-header' >
        <Box className="contents" display='flex' justifyContent='space-between'>
            <Stack direction="row" justifyContent="start" alignItems="center" spacing={3} display='flex'>
              <CallIcon/> +221 33 66 22
              <EmailIcon /> Support@elextra.io
            </Stack>
            <Stack direction="row" justifyContent="end" alignItems="center" spacing={3} display='flex'>
              <LocationOnIcon/> Location
              <div className="vl"></div>
              <select className="form-select" aria-label="Default select example">
                <option selected value="1">$ Dollar (US) </option>
                <option value="2">₹ Inr (India)</option>
              </select>
              <select className="form-select" aria-label="Default select example">
                <option selected value="1"> EN </option>
                <option value="2"> Hindi </option>
              </select>
            </Stack>
        </Box>
        
      </Box>
      <Box className="header">
        <Stack direction="row" alignItems="center" justifyContent='space-between' spacing={3} display='flex' width='100%'>
          <Box className="header-title">
              <AlignVerticalCenterIcon /> <span>logoipsum</span>
          </Box>
          <Box className='classified-select'> 
            <select className="classified" aria-label="Default select example">
              <option selected > Classified </option>
              <option value="1"> example 1 </option>
              <option value="2"> example 2 </option>
            </select>
          </Box>
          <Box className='search'>
            <TextField
              className="search-desktop "
            InputProps={{endAdornment: (
                <InputAdornment position="end">
                  <Search color="blue" />
                </InputAdornment>
              ),
            }}
            placeholder="Seach here...."
            name="search"
            // onChange={(e) => value(e.target.value) }
          />
          </Box>
          


          <a ><FavoriteBorder/></a>
          <a href="/checkout" style={{textDecoration:'none',color: "inherit",background:''}}>
            <ShoppingCart style={{position: "absolute"}}/>
            <div className='non-empty'>{cartLength}</div>
          </a>
          <Button onClick={()=>!token ? history.push('/login') : enqueueSnackbar('Already logged in', { variant:"success" , autoHideDuration: 3000})} style={{textDecoration:'none',color: "inherit",background:'transparent',border:"none"}}>
            <a style={{textDecoration:'none',color: "inherit"}}>
              
              <AccountCircle/>
            </a>
          </Button>
          <button className="button-classifieds" justifyContent='end'>Classifieds</button>



        </Stack>
      </Box>
      <Box className='header'>
          <Stack direction="row" alignItems="center" justifyContent='space-between' spacing={3} display='flex'  width='100%'>
            <select className="category" aria-label="Default select example" spacing={3} size='16px'>
                <option selected > All Categories </option>
                <>
                {products && products.map((ele)=>(
                  <option  > {ele.category} </option>
                ))}
                </>
            </select>
            {products && products.map((ele)=>(
                  <a>{ele.category}</a>
              ))}
          </Stack>
      </Box>

      </>
    );
};

export default Header;
