import React, { Component } from "react";
import Slider from "react-slick";

export default class Resizable extends Component {
  state = {
    display: true,
    width: 1200
  };
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <div
          style={{
            height:'100%',
            width: this.state.width + "px",
            display: this.state.display ? "block" : "none"
          }}
        >
          <Slider {...settings}>
            <div>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRisv-yQgXGrto6OxQxX62JyvyQGvRsQQ760g&usqp=CAU'/>
            </div>
            <div>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRisv-yQgXGrto6OxQxX62JyvyQGvRsQQ760g&usqp=CAU'/>
            </div>
            <div>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRisv-yQgXGrto6OxQxX62JyvyQGvRsQQ760g&usqp=CAU'/>
            </div>

          </Slider>
        </div>
      </div>
    );
  }
}