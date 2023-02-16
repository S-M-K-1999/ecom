import { shadows, width } from "@mui/system";
import React, { Component } from "react";
import Slider from "react-slick";
import Card from 'react-bootstrap/Card';
import {
    Stack
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Button from 'react-bootstrap/Button';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", background: "rgb(207, 207, 207)", width: "50px", height: "50px", borderRadius: "50%", justifyContent: 'center', alignItems: 'center' }}
            onClick={onClick}
        ></div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", background: "rgb(207, 207, 207)", width: "50px", height: "50px", borderRadius: "50%", justifyContent: 'center', alignItems: 'center', }}
            onClick={onClick}
        />
    );
}
export default class Recommended extends Component {
    state = {
        display: true,
        width: 1600
    };
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div>
                <div
                    style={{
                        width: this.state.width + "px",
                        display: this.state.display ? "block" : "none"
                    }}
                >
                    <Slider {...settings}>
                        {this.props.products && this.props.products.map((ele) => (
                            <div>
                                <Card className="classified-card" style={{ width: '80%', margin: "30px", boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                    <Card.Img variant="top" style={{ borderRadius: '30px' }} src={ele.image} />
                                    <Card.Body>
                                        <Card.Text>{ele.name}</Card.Text>
                                        <Card.Text><span style={{ color: '#3187ED' }}>${ele.cost}</span></Card.Text>
                                        <Stack direction="row" justifyContent="space-between" display='flex'>
                                            <Card.Text><span style={{ color: '#8D8D8D' }}><del>$1,200.88</del></span></Card.Text>
                                            <Card.Text>{ele.rating}<StarIcon/></Card.Text>
                                        </Stack>
                                        <Button onClick={()=>this.props.handleAddToCart(localStorage.getItem('token'),ele,1)} style={{width:'100%',background:'white',color:'#3187ED',border:'1px solid #3187ED'}}>Add to cart</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        );
    }
}