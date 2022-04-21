import React from "react";
import "./NotFoundPage.css";
import {
  Button,
  Container,
  Row,
  Col
} from "react-bootstrap";
import RobotImg from './../../assets/images/robot.jpg';
import {Link} from 'react-router-dom'


function NotFoundPage() {
  return (    
    <div className = "error">
       <Container className= "justify-content-center " style = {{ height:'100vh'}}>
         <Row>
           <Col>
        <ul style = {{paddingTop:'30%', marginLeft:'20%'}}>
          <li>
          <div className = "circle"></div>
          </li>
          <li>
          ERROR
          </li>
          <li>
          <div className = "circle"></div>
          </li>
        </ul>
       <p className=' font-weight-bold' style = {{fontSize:'7rem', color:'greenyellow', paddingTop:'30%'}}>404</p> 
       {/* <hr style = {{width: '300px', marginTop: '-30px'}}></hr> */}
       <hr></hr>
        <p><i>The page you are looking for cannot be found</i></p>
        <Button variant= "outline-success" style = {{marginLeft: '25%'}}><Link to = "/">Go Back to HomePage</Link></Button>
        </Col>

        <Col>
         <img src = {RobotImg} alt= "" style = {{height:'500px', width: '600px', backgroundColor:'transparent'}} className= "robot"></img>
        </Col>
        </Row>
        </Container>
        </div>
  );
}

export default NotFoundPage;
