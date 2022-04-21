import React, { useRef, useState } from "react";
import { Form, Card, Container, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../../context/AuthContext";

import { Link } from "react-router-dom";
export default function ForgotPassword() {
  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your email inbox for password reset instruction");
    } catch {
      setError(`An account with ${emailRef.current.value} does not exist`);
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
              <h2 className="text-center mb-4"> Reset Password</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              {/* {currentUser.uid} */}
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
                <Button
                  disabled={loading}
                  variant="warning"
                  className="w-20 mt-5"
                  type="submit"
                >
                  Reset Password
                </Button>
              </Form>
            </Card.Body>
            <div className="w-100 text-center mt-0">
              Need an account? <Link to="/Signup"> Sign-Up</Link> &nbsp; &nbsp;
              <Link className="ml-2" to="/login">
                Log-In
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
