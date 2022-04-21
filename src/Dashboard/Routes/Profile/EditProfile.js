import React, { useState } from "react";
import { useAuth } from "./../../../context/AuthContext";
import { Container, Col, Row, Alert, Form, Button } from "react-bootstrap";
import "./Profile.css";
import Message from "../../../components/MESSAGE/Message";

import { useHistory } from "react-router-dom";
function EditProfile() {
  const { currentUser, state, dispatch, db } = useAuth();
  const history = useHistory();
  const [personalData, setPersonalData] = useState({});
  console.log(state.CurrentUserInfo);
  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("Users")
      .doc(currentUser.uid)
      .update({
        ...personalData,
      })
      .then(() => {
        history.push("/list");
        console.log("Document successfully updated!");
        dispatch({ type: "REMOVE_ERROR" });
        dispatch({
          type: "ADD_MESSAGE",
          payload: "Document successfully updated!",
        });
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        dispatch({
          type: "ADD_ERROR",
          payload: "Failed Update Account",
        });
      });
  };

  return (
    <div onSubmit={handleSubmit} className="profile">
      <Container className="mt-5 justify-content-center container">
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

        <Row className="justify-content-center ">
          <Col sm={8}>
            <Form>
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={state.CurrentUserInfo.FirstName}
                onChange={(e) =>
                  setPersonalData({
                    ...personalData,
                    FirstName: e.target.value,
                  })
                }
                placeholder="First Name"
                className="mb-2 edit text-success"
              />
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type="Text"
                required
                defaultValue={state.CurrentUserInfo.LastName}
                onChange={(e) =>
                  setPersonalData({
                    ...personalData,
                    LastName: e.target.value,
                  })
                }
                placeholder="Last Name"
                className="mb-2 edit text-success"
              />
              <Form.Label>ID</Form.Label>
              <Form.Control
                required
                defaultValue={state.CurrentUserInfo.ID_Number}
                onChange={(e) =>
                  setPersonalData({
                    ...personalData,
                    ID_Number: e.target.value,
                  })
                }
                type="number"
                placeholder="ID No"
                className="mb-2 edit text-success"
              />
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                required
                defaultValue={state.CurrentUserInfo.Nationality}
                onChange={(e) =>
                  setPersonalData({
                    ...personalData,
                    Nationality: e.target.value,
                  })
                }
                placeholder="nationality"
                className="mb-2 edit text-success"
              />
              <Form.Label>Phone</Form.Label>
              <Form.Control
                required
                type="number"
                defaultValue={state.CurrentUserInfo.Phone_Number}
                onChange={(e) =>
                  setPersonalData({
                    ...personalData,
                    Phone_Number: e.target.value,
                  })
                }
                placeholder="phone"
                className="mb-2 edit text-success"
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                readOnly
                value={currentUser.email}
                onChange={(e) =>
                  setPersonalData({
                    ...personalData,
                    Email: e.target.value,
                  })
                }
                placeholder="email"
                className="mb-2 edit text-success"
              />
              <Form.Label>Occupation</Form.Label>
              <Form.Control
                type="text"
                required
                defaultValue={state.CurrentUserInfo.Ocupation}
                onChange={(e) =>
                  setPersonalData({
                    ...personalData,
                    Ocupation: e.target.value,
                  })
                }
                placeholder="occupation"
                className="mb-2 edit text-success"
              />

              <Button
                type="submit"
                variant="outline-success"
                className="mt-4"
                block
              >
                Save
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditProfile;
