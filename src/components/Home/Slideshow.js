import React from 'react'
import {
  Carousel
  } from "react-bootstrap";
import PictureImg1 from "./../../assets/images/pic4.jpg";
import PictureImg2 from "./../../assets/images/pic2.jpg";
import PictureImg3 from "./../../assets/images/pic3.jpg";
import "./Home.css";

function Slideshow(){
    return(
    
        <Carousel>
        <Carousel.Item interval={2000} className= "homecarousel">
          <img
            className="d-block w-100 slideshowimage"
            src= {PictureImg1}
            alt="First slide"
            
          />
           <div className="textDiv">
          <p>HOMES</p>
          <h1>Property Solutions Firm</h1>
        </div>
     
        </Carousel.Item>
        <Carousel.Item interval={2000} className= "homecarousel">
          <img
            className="d-block w-100 slideshowimage"
            src= {PictureImg2}
            alt="Second slide"
          />
          <div className="textDiv">
          <p>SALE AND RESIDENTIAL</p>
          <h1>Property Sale and Management</h1>
        </div>
        
        </Carousel.Item>
        <Carousel.Item interval = {2000} className= "homecarousel">
          <img
            className="d-block w-100 slideshowimage"
            src= {PictureImg3}
            alt="Third slide"
          />
          <div className="textDiv">
          <p>AHEAD</p>
          <h1>Future To Dream Home</h1>
        </div>
         
        </Carousel.Item>
      </Carousel>
    )
}

export default Slideshow