import React, { useState } from "react";
import "./Contact.css";
import "./../../assets/images/bg/dots2-dark.png";
import { Row, Col, Form, Button, Container, Alert } from "react-bootstrap";
import emailjs from "emailjs-com";
import Message from "../MESSAGE/Message";
import { useAuth } from "../../context/AuthContext";
function Contact() {
  const { state, dispatch } = useAuth();

  const [loading, setLoading] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_wvwp4wd",
        "template_x2fim7f",
        e.target,
        "user_ur0LkuC6nDRsMCdSSUlzP"
      )
      .then(
        (result) => {
          console.log(result.text);
          dispatch({
            type: "ADD_MESSAGE",
            payload:
              "Thank you for contacting us, we will get back to you as soon as possible!",
          });
        },
        (error) => {
          console.log(error.text);
          dispatch({
            type: "ADD_ERROR",
            payload: "failed! please try again ",
          });
        }
      );
    setLoading(false);
    e.target.reset();
  }
  return (
    <div className="contactUsContainer">
      <h6 className="headings">Keep In Touch</h6>
      <Row xs={5} className="mb-5">
        <div className="leftcol">
          <Col sm={2} xs={3} className="mt-5">
            <hr className="line1"></hr>
            <p className="fs-5">KEEP </p>
            <p className="fs-5">IN </p>
            <p className="fs-5">TOUCH </p>
          </Col>
        </div>
        <Col md xs={6} className="mt-5 touch">
          <p className="fs-2 gray mb-3">
            <b>Nanyuki,</b> Kenya
          </p>
          <p> Lentile House, 2nd Floor suite 213, Nanyuki, Kenya.</p>
          <p>
            <b>Email:</b>
            <span className="gray">info@mariteltd.co.ke</span>
          </p>
        </Col>
        <Col md xs={6} className="mt-5 touch">
          <p className="fs-5 gray">Call Directly:</p>
          <p>
            <span className="plus">+254</span> 700634034
          </p>
          <p> Follow us </p>
          <div className="icons">
            <li>
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </li>
            <li>
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </li>
            <li>
              <i className="fa fa-linkedin-square" aria-hidden="true"></i>
            </li>
          </div>
        </Col>
      </Row>

      <h6 className="headings">You Need Help?</h6>
      <Row sm="auto" lg={8}>
        <div className="leftcol ">
          <Col sm={4} className="mt-5">
            <hr className="line1"></hr>
            <p className="fs-5">YOU </p>
            <p className="fs-5">NEED </p>
            <p className="fs-5">HELP? </p>
          </Col>
        </div>
        <Col sm={8}>
          <Container>
            {state.Error || state.Message ? (
              <Alert variant={state.Error ? "danger" : "success"}>
                <Message
                  message={state.Error ? state.Error : state.Message}
                  dispatch={dispatch}
                />
              </Alert>
            ) : null}
          </Container>
          <Form onSubmit={handleSubmit} className="help mt-5 touch2">
            <Row sm={8} xs={8}>
              <Col sm={4}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name*"
                  className="contactinput mb-3"
                  required
                />
              </Col>
              <Col sm={4}>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className="contactinput mb-3"
                  required
                />
              </Col>
              <Col sm={4}>
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Subject (Optional)"
                  className="contactinput mb-3"
                />
              </Col>
            </Row>
            <Form.Group as={Row} className="mb-3 mt-3">
              <Col sm={10}>
                <Form.Control
                  name="message"
                  as="textarea"
                  placeholder="Leave a message here"
                  className="textarea"
                  required
                />
              </Col>
            </Form.Group>
            <Button disabled={loading} type="submit" className="send mt-3 mb-3">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Contact;
