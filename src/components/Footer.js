import { Box } from "@mui/system";
import React from "react";
import "./Footer.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MailIcon from '@mui/icons-material/Mail';
import { Grid } from "@mui/material";
const Footer = () => {
  return (
    <>
      <Box className='back-to-top'>
        <a href="#" style={{ textDecoration: 'none', color: '#8D8D8D' }}>Back to Top <KeyboardArrowUpIcon style={{ color: '#8D8D8D' }} /></a>
      </Box>
      <Box className='news-letter' >
        <Box  width='100%' display='flex'>
          <Grid width='50%' height='100%'  display='flex' alignItems='center'>
            <Grid width='20%'>
              <MailIcon style={{ fontSize: 70, opacity: "30%", color: "white" }} />
            </Grid>
            <Grid color='white' display= "flex" direction= "column">
              <span style={{fontWeight:700,fontSize:'30px'}}>Sign Up for Newsletter</span><br />
              <span style={{fontWeight:200,fontSize:'18px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
            </Grid>
          </Grid>
          <Grid width='50%' height='100%'  display='flex' alignItems='center' justifyContent='center' >
            <Grid className="custom-search"> 
              <input type="text" class="custom-search-input" placeholder="Enter your email here"/>
              <button class="custom-search-botton" type="submit">Subscribe</button>  
            </Grid>
            
          </Grid>
        </Box>
      </Box>

      <Box className='bottom-footer '>
        <Grid className="row">
          <Grid className="col-sm-3">
            <Grid className="row pt-3">
              sdfs
            </Grid>
            <Grid className="row pt-4">
              sdfs
            </Grid>
            <Grid className="row pt-4">
              sdfs
            </Grid>
          </Grid>
          <Grid className="col-sm-1">
            sdfsfsdf
          </Grid>
          <Grid className="col-sm-2">
            sdfsfsdf
          </Grid>
          <Grid className="col-sm-2">
            sdfsfsdf
          </Grid>
          <Grid className="col-sm-4">
            sdfsfsdf
          </Grid>
        </Grid>
      </Box>

    </>
  );
};

export default Footer;
