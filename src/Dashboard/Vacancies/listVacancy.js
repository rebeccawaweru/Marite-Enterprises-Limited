import React, { useState } from "react";
import "./vacancy.css";
import { useAuth } from "../../context/AuthContext";
import { Button, Form, InputGroup, Container, Alert } from "react-bootstrap";
import { useEffect } from "react";
function ListVacancy() {
  const { DataFunctions, currentUser } = useAuth();
  const [data, setData] = useState({ owner: currentUser.uid, booked: false });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }, [message]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data) {
      DataFunctions.createVacancies(data);
      //
      setMessage("Vacancy created successfully");
    }
  };
  return (
    <div className="vacancy">
      <Container className="w-100  justify-content-between align-items-center">
        <h4 style={{ textAlign: "center" }} className="mb-3">
          List a Vacancy
        </h4>
        {message && (
          <Container>
            <Alert variant="success" className="text-center">
              {message}
            </Alert>
          </Container>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="building">
            <Form.Label className="listlabel">Building Name</Form.Label>
            <Form.Control
              onChange={(e) =>
                setData({ ...data, BuildingName: e.target.value })
              }
              required
              type="text"
              placeholder="name of the building"
            />
          </Form.Group>
          <Form.Label className="listlabel">Number of Bedrooms</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={(e) =>
                setData({ ...data, NumberOfBedrooms: Number(e.target.value) })
              }
              required
              as="select"
              custom
            >
              <option>Select rooms</option>
              <option value="1.1">Bedsitter</option>
              <option value="1.2">SingleRoom</option>
              <option value="1.3">DoubleRoom</option>
              <option value="1.4">Shop</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </Form.Control>
          </InputGroup>
          <Form.Label className="listlabel">Location</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={(e) => setData({ ...data, location: e.target.value })}
              required
              as="select"
              custom
            >
              <option>Select location</option>
              <option value="Town">Town</option>
              <option value="Asianquarters">Asianquarters</option>
              <option value="Baraka">Baraka</option>
              <option value="Bluegum">Bluegum</option>
              <option value="Cottage">Cottage</option>
              <option value="Equator">Equator</option>
              <option value="Gatheri">Gatheri</option>
              <option value="Ichuga">Ichuga</option>
              <option value="JuaKali">JuaKali</option>
              <option value="Kilimo">Kilimo</option>
              <option value="Majengo">Majengo</option>
              <option value="Makutano">Makutano</option>
              <option value="Muthaiga">Muthaiga</option>
              <option value="Roma">Roma</option>
              <option value="Ruai">Ruai</option>
              <option value="Stadium">Stadium</option>
              <option value="Teachers">Teacher</option>
              <option value="Thingithu">Thingithu</option>
              <option value="Likii">Likii</option>
            </Form.Control>
          </InputGroup>
          <Form.Group className="mb-3" controlId="rent">
            <Form.Label className="listlabel">Monthly Rent</Form.Label>
            <Form.Control
              onChange={(e) =>
                setData({ ...data, monthlyRent: Number(e.target.value) })
              }
              required
              type="number"
              placeholder="price per month"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="info">
            <Form.Label className="listlabel">
              More Information (*Optional)
            </Form.Label>
            <Form.Control
              onChange={(e) => setData({ ...data, moreInfo: e.target.value })}
              as="textarea"
            />
          </Form.Group>
          <Button type="submit" variant="success" block className="mt-3 mb-3">
            List
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default ListVacancy;
