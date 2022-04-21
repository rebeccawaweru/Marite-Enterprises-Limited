import React from "react";
import "./About.css";
import theImg from "./../../assets/images/preview2.jpg";
// icons
import missionImg from "./../../assets/images/mission2.png";
import vissionImg from "./../../assets/images/vision.png";
import quotes from "./../../assets/images/image-icons/icon-quote.png";
import { Row, Col, Container } from "react-bootstrap";
const thisYear = new Date().getFullYear();
function About() {
  return (
    <div className="aboutContainer">
      <Container className="justify-content-center">
        <Row className="mt-5">
          <Col sm={6}>
            <h5 className="firm mb-3">ABOUT US</h5>
            <h6>
              We are a <span className="firm">Property Solutions</span> Firm
            </h6>
            Established in 1996, Marite Enterprises Limited has evolved to
            become one of the leading private real estate companies in Kenya. We
            deal in Property management, Property acquisition and Property
            development. We aid our partners through the processes of the now
            strongly regulated property market in Kenya.
            <div className="square">
              <h1>
                <strong>{thisYear - 1996}</strong>
              </h1>
            </div>
            <p className="years">
              Years<br></br> Serving<br></br>You
            </p>
          </Col>

          <Col sm={4}>
            <img src={theImg} alt="" className="flyer"></img>
          </Col>
        </Row>

        <Row className="state">
          <Col
            md
            xs={10}
            className="mt-3 statecontainer"
            style={{ marginRight: "10px" }}
          >
            <img src={missionImg} alt="" className="stateimage mb-3"></img>
            <p className="firm"> Mission</p>
            <img
              src={quotes}
              alt=""
              style={{ height: "15px", float: "right" }}
            ></img>
            <p>
              We beleive in heart-centered business practises that build on
              people to develop social welfare for sustainable wealth creation
              and the future well-being of our planet!
            </p>
          </Col>

          <Col md xs={10} className="mt-3 statecontainer">
            <img src={vissionImg} alt="" className="stateimage mb-3"></img>
            <p className="firm"> Vision</p>
            <img
              src={quotes}
              alt=""
              style={{ height: "15px", float: "right" }}
            ></img>
            <p>
              To be the premier real estate managers of choice in kenya and to
              be an established provider of competent,efficient,prompt and cost
              effective real estate services on the widest possible spectrum of
              clients needs
            </p>
          </Col>
        </Row>
        <h6 className="mt-5 choosetitle">Why Choose Us?</h6>
        <div className="whychooseus mt-5">
          <ul className="fontIcons">
            <li className="why">
              <span className="icon fa fa-building-o fa-3x"></span>Property
              Management
            </li>
            <li className="why">
              {" "}
              <span className="icon fas fa-hand-holding-usd fa-3x"></span>
              Property Development
            </li>
            <li className="why">
              {" "}
              <span className="icon fa fa-handshake-o fa-3x"></span>Property
              Acquisition
            </li>
            <li className="why">
              <span className=" icon fa fa-home fa-3x"></span>Real Estate
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
export default About;
