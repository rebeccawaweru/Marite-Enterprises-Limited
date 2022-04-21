import React, { useRef, useState } from "react";
import "./Signup.css";
import { auth, db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { Form, Card, Container, Button, Alert } from "react-bootstrap";
import Message from "../MESSAGE/Message";
import { Link, useHistory } from "react-router-dom";
export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const confirmPasswordRef = useRef();
  const { dispatch, state } = useAuth();

  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return dispatch({
        type: "ADD_ERROR",
        payload: "Password do not match!",
      });
    }
    try {
      const Email = emailRef.current.value;

      setLoading(true);

      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then((userCred) => {
          const user = userCred.user;
          db.collection("Users")
            .doc(user.uid)
            .set({
              Email: Email,
              UID: user.uid,
              UserType: "User",
              date_Joined: new Date(),
              status: true,
            })
            .then(function () {
              console.log("Value successfully written!");
              setLoading(false);
              history.push("/editprofile");
            })
            .catch(function (error) {
              dispatch({
                type: "ADD_ERROR",
                payload: "Failed to create an account",
              });
              console.error("Error writing Value: ", error);
            });
        });

      history.push("/home");
    } catch {
      dispatch({ type: "ADD_ERROR", payload: "Failed to create an account" });
    }
    setLoading(false);
  }

  

  return (
    <div>
      <Container
        className="signUpDiv d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card bg="warning">
            <Card.Body>
              <h2 className="text-center mb-4"> Sign Up</h2>
              {state.Error || state.Message ? (
                <Alert variant={state.Error ? "danger" : "success"}>
                  <Message
                    message={state.Error ? state.Error : state.Message}
                    dispatch={dispatch}
                  />
                </Alert>
              ) : null}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    ref={emailRef}
                    required
                    type="email"
                    placeholder=" Email"
                  />
                </Form.Group>
                <Form.Group id="Password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    ref={passwordRef}
                    required
                    type="password"
                    placeholder=" password"
                  />
                </Form.Group>
                <Form.Group id="ConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    ref={confirmPasswordRef}
                    required
                    type="password"
                    placeholder="Confirm password"
                  />
                </Form.Group>
                <Button
                  disabled={loading}
                  variant="warning"
                  className="w-20 mt-5"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
            <div className="w-100 text-center mt-0">
              Already have an account? <Link to="/login">Log-In</Link> &nbsp;
              &nbsp;
              <Link className="ml-2" to="/ForgotPassword">
                Forgot Password
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
