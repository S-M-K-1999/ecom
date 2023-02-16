import { Box } from "@mui/system";
import React from "react";
import "./Footer.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MailIcon from '@mui/icons-material/Mail';
import { Grid } from "@mui/material";
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import AppsIcon from '@mui/icons-material/Apps';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { Button } from "react-bootstrap";
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
          <Grid className="col-sm-2" padding='1rem'>
            <Grid className="row pt-3" >
              <AlignVerticalCenterIcon style={{fontSize:50}}/><span style={{fontWeight:'700',fontSize:30}}>logoipsum</span>
            </Grid>
            <Grid className="row pt-4" color='#8D8D8D'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
            </Grid>
            <Grid className="row pt-4" width='100%' justifyContent='space-between' style={{opacity:'30%'}}>
              <AppsIcon/>
              <AppsIcon/>
              <AppsIcon/>
              <AppsIcon/>
              <AppsIcon/>
            </Grid>
          </Grid>
          <Grid className="col-sm-2" padding='1rem' style={{display: 'flex',flexDirection:'column' ,justifyContent: 'space-around'}}>
            <Grid class='row' /><b>QUICK LINKS</b>
            <Grid class='row' />example
            <Grid class='row' />example
            <Grid class='row' />example
            <Grid class='row' />example
            <Grid class='row' />example

          </Grid>
          <Grid className="col-sm-2" padding='1rem' style={{display: 'flex',flexDirection:'column' ,justifyContent: 'space-around'}}>
            <Grid class='row' /><b>CUSTOMER AREA</b>
            <Grid class='row' />example
            <Grid class='row' />example
            <Grid class='row' />example
            <Grid class='row' />example
            <Grid class='row' />example

          </Grid>
          <Grid className="col-sm-2" padding='1rem' style={{display: 'flex',flexDirection:'column' ,justifyContent: 'space-around'}}>
            <Grid class='row' /><b>Vendor AREA</b>
            <Grid class='row' />example
            <Grid class='row' />example
            <Grid class='row' />example
            <Grid class='row' />example
            <Grid class='row' />example

          </Grid>
          <Grid className="col-sm-4" padding='1rem' display={'flex'} direction="column" justifyContent='space-evenly'>
            <Grid class='row' /><b>CONTACT</b>
            <Grid class='row' py={2}/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            <Grid class='row' py={2} style={{display:'flex', direction:'row', justifyContent:'space-between'}}>
              <HeadsetMicIcon style={{fontSize:50}}/>
              <div>
                <span>Have any question?</span><br/>
                <span style={{color:'blue'}}>+12 23423 343</span>
              </div>
              <Button style={{width:'150px',background:'white', color:'blue',}}>sdfsdf</Button>
            </Grid>
            <Grid display={'flex'} justifyContent='space-between' width={'100%'}>
              <Button style={{width:'200px',height:'70px', background:'black', color:'white',border:'none'}}>Button</Button>
              <Button style={{width:'200px',height:'70px', background:'black', color:'white',border:'none'}}>Button</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>

    </>
  );
};

export default Footer;
