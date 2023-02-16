import React, { Component } from "react";
import { Search,NavigateBefore ,NavigateNext } from "@mui/icons-material";
import Button from 'react-bootstrap/Button';
import {
    Rating,
    Stack
  } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "slick-carousel/slick/slick-theme.css";
export default class Resizable extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
      }
      
      next() {
        this.slider.slickNext();
      }
      previous() {
        this.slider.slickPrev();
      }
    state = {
      display: true,
      width: 1500
    };
    
    render() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
      };
      return (
        <div>

          <div
            style={{
              width: this.state.width + "px",
              display: this.state.display ? "block" : "none",
              display:'flex'
            }}
          >
        <Row lg={12} display="flex" alignItems='center' className="g-4"></Row>    
            <Col>
                <Card className="classified-card-offer">
                    <Card.Body className='classified-main'>
                    <Card.Title>Classified Products on the week</Card.Title>
                    <Stack display='flex' direction='row' justifyContent='space-between'spacing={2}>
                        <Button className="round-btn" onClick={this.previous} variant="primary"><NavigateBefore style={{color:'black'}}/></Button>
                        <Button className="round-btn" onClick={ this.next.bind(this)} variant="primary"><NavigateNext style={{color:'black'}}/></Button>
                    </Stack>
                    <Button className="explore">Explore <NavigateNext/></Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Slider {...settings}>
                    {this.props.products && this.props.products.map((ele)=>(
                        <div>
                        <Card className="classified-card" style={{width:'80%',margin:"20px"}}>
                            <Card.Img variant="top" style={{borderRadius:'30px'}} src={ele.image} />
                                <Card.Body>
                                <Card.Text>{ele.name}</Card.Text>
                                    <Stack direction="row" justifyContent="space-between"  display='flex'>
                                    <Card.Text><span style={{color:'#00C6D7'}}>${ele.cost}</span></Card.Text>
                                    <Card.Text>location</Card.Text>
                                </Stack>
                            </Card.Body>
                            </Card>
                    </div>
                    ))}
                    
                    
                </Slider>
            </Col>
          </div>
        </div>
      );
    }
  }
