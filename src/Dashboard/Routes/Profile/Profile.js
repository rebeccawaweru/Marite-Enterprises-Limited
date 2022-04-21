import React, { useEffect, useState } from "react";
import { useAuth } from "./../../../context/AuthContext";
import { Container, Col, Row, Form, Button, Table } from "react-bootstrap";
import "./Profile.css";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faIdBadge,
  faEnvelope,
  faUser,
  faSuitcase,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

const phone = <FontAwesomeIcon icon={faPhone} className="iconprofile" />;

const id = <FontAwesomeIcon icon={faIdBadge} className="iconprofile" />;
const email = <FontAwesomeIcon icon={faEnvelope} className="iconprofile" />;
const suitcase = <FontAwesomeIcon icon={faSuitcase} className="iconprofile" />;
const user = <FontAwesomeIcon icon={faUser} className="iconprofile" />;
const flag = <FontAwesomeIcon icon={faFlag} className="iconprofile" />;

function Profile(props) {
  const { state, currentUser, db } = useAuth();
  const [propertyList, setPropertyList] = useState();
  useEffect(() => {
    db.collection("List_Properties")
      .where("Owner_id", "==", currentUser.uid)

      .get()

      .then((snapshot) => {
        let arr = [];
        snapshot.docs.map((doc) => {
          let docId = doc.id;
          let value = doc.data();

          return arr.push({ docId, ...value });
        });
        return setPropertyList(arr);
      });
  }, [db, currentUser.uid]);
  console.log(propertyList);
  return (
    <div className="profile">
      <Container className="mt-5 justify-content-center container">
        <Row className="justify-content-center mb-3">
          <h6 className="text-center text-success mb-5">Profile Information</h6>
          <Col sm={4}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="10">
                <h5>
                  <span>{user} Name:</span> {state.CurrentUserInfo.FirstName}
                </h5>
              </Form.Label>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="10">
                <h5>
                  <span> {id}ID :</span> {state.CurrentUserInfo.ID_Number}
                </h5>
              </Form.Label>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="10">
                <h5>
                  <span> {flag} Nationality :</span>{" "}
                  {state.CurrentUserInfo.Nationality}
                </h5>
              </Form.Label>
            </Form.Group>
          </Col>

          <Col sm={4}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="10">
                <h5>
                  <span> {phone} Phone :</span>{" "}
                  {state.CurrentUserInfo.Phone_Number}
                </h5>
              </Form.Label>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="10">
                <h5>
                  <span> {email} Email :</span> {currentUser.email}
                </h5>
              </Form.Label>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="10">
                <h5>
                  <span> {suitcase} Occupation:</span>{" "}
                  {state.CurrentUserInfo.Ocupation}
                </h5>
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="outline-success" className="mt-3" block>
          <Link to="/editprofile">Edit Profile</Link>
        </Button>

        <Table striped bordered hover variant="dark" className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Property Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Physical Address</th>
              <th>Edit</th>
              <th>Property Details</th>
            </tr>
          </thead>
          <tbody>
            {propertyList &&
              propertyList.map((property) => [
                <tr key={property.docId}>
                  <td>{property.index}</td>
                  <td>{property.Property_Title}</td>
                  <td>{property.Type}</td>
                  <td>{property.Price}</td>
                  <td>{property.Physical_Address}</td>
                  <td>
                    <Button
                      variant="outline-warning"
                      onClick={() =>
                        props.history.push(`/list/${property.docId}`)
                      }
                    >
                      Eddit
                    </Button>
                  </td>
                  <td>
                    <Button variant="outline-success">
                      <Link to={`/propertydetails/${property.docId}`}>
                        Details
                      </Link>
                    </Button>
                  </td>
                </tr>,
              ])}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Profile;
