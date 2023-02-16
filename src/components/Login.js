
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading,setLoading] = useState(false)
  const [details,setDetails] = useState({
    username:'',
    password:''
  })
  const history = useHistory()
  const handleInput= (e) =>{
    setDetails((prevState) =>({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
  }
  const login = async (formData) => {
    formData.preventDefault()
    if(validateInput(details)){
      setLoading(true)
      await axios.post(`${config.endpoint}/auth/login`,details)
      .then((res)=>{
        enqueueSnackbar("Logged in successfully",{ variant:"success" , autoHideDuration: 3000})
        persistLogin(res.data.token,res.data.username,res.data.balance)
        setLoading(false)

        history.push('/')
      })
      .catch((err)=>{
        if(err.response.status >= 400 ){
          enqueueSnackbar(err.response.data.message,{ variant:"error" , autoHideDuration: 3000})
        }
        else{
          enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON',{ variant:"error" , autoHideDuration: 3000})
        }
        setLoading(false)

      })}
  };

  const validateInput = (data) => {
    if(data.username.length === 0){
      enqueueSnackbar('Username is a required field',{ variant:"warning" , autoHideDuration: 3000})
      return false
    }
    else if(data.password.length === 0){
    enqueueSnackbar('Password is a required field',{ variant:"warning" , autoHideDuration: 3000})
      return false
    }
    return true
  };

  const persistLogin = (token, username, balance) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('balance', balance);
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
        <form onSubmit={login}>
        <Stack spacing={2} className="form">
        <h2 className="title" >Login</h2>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={details.username}
            onChange={handleInput}
          />
          <TextField
            id="password"
            variant="outlined"
            label="password"
            name="password"
            type="password"
            fullWidth
            placeholder="Enter password"
            value={details.password}
            onChange={handleInput}
          />
          {loading ? (<Stack alignItems="center">
                <CircularProgress />
            </Stack>) :(<Button type='submit' name='login' className="button" variant="contained">
          LOGIN TO QKART
            </Button>)}
            <p className="secondary-action">
            Don't have an account?{" "}
            <Link className="link" to="/register">Register Now</Link>
          </p>
        </Stack>
        </form>
        </Box>
      <Footer />
    </Box>
  );
};

export default Login;
