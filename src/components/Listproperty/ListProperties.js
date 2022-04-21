import React, { useRef, useState } from "react";
import "./ListProperties.css";
import Message from "../MESSAGE/Message";
import { Form, Card, Container, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { login, dispatch, state } = useAuth();

  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/Home");
    } catch {
      dispatch({ type: "ADD_ERROR", payload: "Failed to sign in" });
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
              <h2 className="text-center mb-4"> Log In</h2>
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

                <Button
                  disabled={loading}
                  variant="warning"
                  className="w-20 mt-5"
                  type="submit"
                >
                  Log In
                </Button>
              </Form>
            </Card.Body>
            <div className="w-100 text-center mt-0">
              Need an account? <Link to="/Signup"> Sign-Up</Link> &nbsp; &nbsp;
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
