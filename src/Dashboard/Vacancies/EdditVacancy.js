import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Card,
  Button,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function EdditVacancy(props) {
  const { id } = useParams();
  const { db, currentUser } = useAuth();
  const [vacancyDetails, setVacanctDetails] = useState();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (id && !vacancyDetails) {
      db.collection("Vacancies")
        .doc(id)
        .get()
        .then((snapshot) => {
          setVacanctDetails(snapshot.data());
        });
    }
  }, [id, vacancyDetails]);
  console.log(vacancyDetails);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentUser.uid === vacancyDetails.owner) {
      console.log(currentUser.uid);
      db.collection("Vacancies")
        .doc(id)
        .update(vacancyDetails)
        .then(() => setMessage("Document successfully updated"));
    } else {
      setError("Only the owner of the vacancy can update details");
    }
  };

  if (vacancyDetails) {
    return (
      <Container>
        <Card className="mt-4 mb-5">
          <Container>
            <Card.Header className="text-center">EdditVacancy</Card.Header>
            {error || message ? (
              <Alert variant={`${error ? "danger" : "success"}`}>
                {error ? error : message}
              </Alert>
            ) : null}

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label className="listlabel">Building Name</Form.Label>
                <Form.Control
                  required
                  onChange={(e) =>
                    setVacanctDetails({
                      ...vacancyDetails,
                      BuildingName: e.target.value,
                    })
                  }
                  defaultValue={vacancyDetails && vacancyDetails.BuildingName}
                  placeholder="Building Name"
                />
              </Form.Group>
              <Form.Label className="listlabel">Number of Bedrooms</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  defaultValue={
                    vacancyDetails && vacancyDetails.NumberOfBedrooms
                  }
                  onChange={(e) =>
                    setVacanctDetails({
                      ...vacancyDetails,
                      NumberOfBedrooms: Number(e.target.value),
                    })
                  }
                  required
                  as="select"
                  custom
                >
                  <option>Select rooms</option>
                  <option value="1.1">Bedsitter</option>
                  <option value = "1.2">SingleRoom</option>
                  <option value = "1.3">DoubleRoom</option>
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
                  onChange={(e) =>
                    setVacanctDetails({
                      ...vacancyDetails,
                      location: e.target.value,
                    })
                  }
                  defaultValue={vacancyDetails && vacancyDetails.location}
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

              <Form.Group>
                <Form.Label className="listlabel">Monthly Rent</Form.Label>
                <Form.Control
                  required
                  defaultValue={vacancyDetails && vacancyDetails.monthlyRent}
                  onChange={(e) =>
                    setVacanctDetails({
                      ...vacancyDetails,
                      monthlyRent: Number(e.target.value),
                    })
                  }
                  placeholder="Monthly Rent"
                />
              </Form.Group>
              <Card.Footer className="d-flex justify-content-between  align-items-center">
                <Button
                  onClick={() => props.history.push("/vacancylist")}
                  variant="outline-danger"
                >
                  Cancel
                </Button>
                <Button variant="outline-success" type="submit">
                  Submit
                </Button>
              </Card.Footer>
            </Form>
          </Container>
        </Card>
      </Container>
    );
  } else {
    return (
      <h1 className="text-center text-danger">Vacancy details Not Found</h1>
    );
  }
}

export default EdditVacancy;
