import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import {Link,useHistory } from "react-router-dom"
import "./Register.css";

const Register = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [message,setMessage] = useState("")
  const [passmessage,setPassmessage] = useState("")
  const [loading,setLoading] = useState(false)
  const [details,setDeatails] = useState({
    username:'',
    password:'',
    confirmPassword:''
  })
  const [match,setMatch] = useState(false)
  const handler = (e) =>{
    setDeatails((prevState) =>({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
  }
  const history = useHistory();
  const alert='';
  const register = async (formData) => {
    formData.preventDefault()


    if(validateInput(details)){
      setLoading(true)
      await axios.post(`${config.endpoint}/auth/register`,{
        username:details.username,
        password:details.password
      })
        .then((res)=>{
          enqueueSnackbar('Registered Successfully', { variant:"success" , autoHideDuration: 3000})
          setLoading(false)
          history.push('/login')

        })
        .catch((error)=> {
          enqueueSnackbar(error.response.data.message, { variant:"error" , autoHideDuration: 3000})
          setLoading(false)

        })
      
    }
  
  };

  const validateInput = (data) => {
    if(data.username.length===0){
      enqueueSnackbar("Username is a required field" ,{ variant:"warning" , autoHideDuration: 3000})
      setMessage('Username is a required field')
      return false
    }
    else if(data.username.length>0 && data.username.length<6){
      enqueueSnackbar("Username must be at least 6 characters" ,{ variant:"warning" , autoHideDuration: 3000})
      setMessage('Username must be at least 6 characters')  
      return false
    }
    else if(data.password.length === 0){
      enqueueSnackbar("Password is a required field" ,{ variant:"warning" , autoHideDuration: 3000})
      setPassmessage('Password is a required field')
      return false
    }
    else if(data.password.length>0 && data.password.length<6){
      enqueueSnackbar("Password must be at least 6 characters" ,{ variant:"warning" , autoHideDuration: 3000})
      setPassmessage('Password must be at least 6 characters')
      return false
    }
    else if(data.password !== data.confirmPassword){
      enqueueSnackbar("Passwords do not match" ,{ variant:"warning" , autoHideDuration: 3000})
      setMatch(true)
      return false
    }
    setMatch(false)
    return true
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
      <form onSubmit={register}>
        <Stack spacing={2} className="form">
        
          <h2 className="title">Register</h2>
          
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              title="Username"
              name="username"
              helperText={details.username.length<6?message:''}
              placeholder="Enter Username"
              fullWidth
              value={details.username}
              onChange={handler}
              
            />
            <TextField
              id="password"
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              helperText={details.password.length<6 ? passmessage: ""}
              fullWidth
              placeholder="Enter a password with minimum 6 characters"
              value={details.password}
              onChange={handler}
            />
            <TextField
              id="confirmPassword"
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              helperText={match ? alert: ''}
              error={match? true:false}
              value={details.confirmPassword}
              onChange={handler}
            />
            {loading ? 
            (<Stack alignItems="center">
                <CircularProgress />
            </Stack>) : (<Button type='submit' name='register' className="button" variant="contained">
              Register Now
            </Button>)}

          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/login">Login here</Link>
          </p>
        
        </Stack>
        </form>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
