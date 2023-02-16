import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

export const generateCartItemsFrom = (arr1, arr2) => {
  // console.log("function called")
  let res = [];
  res = arr2.filter(el => {
    return arr1.find(element => {
      if (element.productId === el._id) {
        el.qty = element.qty
      }
      return element.productId === el._id
    });
  });
  return res;
};

export const getTotalCartValue = (items) => {
  var total = 0
  items.forEach((ele) => {
    total += ele.cost * ele.qty
  })
  return total
};


const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
}) => {


  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={e => handleDelete(value)}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value.qty}
      </Box>
      <IconButton size="small" color="primary" onClick={e => handleAdd(value)}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

const Cart = ({ products, items, handleAdd, handleDelet, isReadOnly }) => {
  const history = useHistory()
  const totalQty = (items) => {
    var total = 0
    if (items.length > 0) {
      items.map((item) => {
        total += item.qty
        return total
      })
    }
    return total
  }
  if (items.length === 0) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
        {items.map((item, index) => {
          return (
          <Box display="flex"  padding="1rem" key={index}>
              <Box className="image-container">
                <img
                  // Add product image
                  src={item.image}
                  // Add product name as alt eext
                  alt={item.name}
                  width="100%"
                  height="100%"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                paddingX="1rem"
              >
                <div>{item.name}</div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                <ItemQuantity value={item} handleAdd={handleAdd} handleDelete={handleDelet}/>

                  <Box padding="0.5rem" fontWeight="700">
                    <div>${item.cost}</div>
                  </Box>
                </Box>
              </Box>
          </Box>)
        })}
        
      </Box>
      <Box
          padding= '1rem 150px 1rem 150px'
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>

        <Box display="flex" padding= '1rem 150px 1rem 150px' justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
            onClick={() => history.push('/checkout')}
          >
            Checkout
          </Button>
        </Box>
      
    </>
  );
};

export default Cart;
