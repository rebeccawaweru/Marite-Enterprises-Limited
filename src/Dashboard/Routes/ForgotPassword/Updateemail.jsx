import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
function Updateemail() {
  const { updateEmail, DataFunctions, currentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (reload) {
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  }, [reload]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);
    try {
      await updateEmail(email).then(() => {
        DataFunctions.updateEailAddress(email, currentUser.uid);
      });

      setError("");
      setMessage("email updated successfully ");
      setLoading(false);

      setReload(true);
    } catch (error) {
      setMessage("");
      console.log(error);
      setLoading(false);
      setError(error.message);
    
      setReload(true);
    }
  };
  return (
    <Container
      className="d-flex justify-content-center "
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="mt-5"
        style={{ maxWidth: "550px", maxHeight: "60vh" }}
        bg="warning"
      >
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <h2 className="text-center">Enter new email address</h2> <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                name="email"
              />
            </Form.Group>
            <Form.Group className="mt-5">
              <Form.Label />
              <Button
                disabled={loading}
                variant="outline-warning"
                className="w-100"
                type="submit"
              >
                Update Email
              </Button>
            </Form.Group>
          </Form>
          <div className="w-100 text-center mt-0">
            Need an account? <Link to="/Signup"> Sign-Up</Link> &nbsp; &nbsp;
            <Link className="ml-2" to="/login">
              Log-In
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Updateemail;
