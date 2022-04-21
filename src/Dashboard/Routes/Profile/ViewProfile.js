import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Message from "../../../components/MESSAGE/Message";
import moment from "moment";
import {
  Container,
  Col,
  Row,
  InputGroup,
  Table,
  Button,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Profile.css";

function ViewProfile(props) {
  const { db, dispatch, state } = useAuth();
  const { userId } = useParams();
  const [userData, setUserData] = useState([]);
  const [userListings, setUserListings] = useState([]);
  console.log(userListings);
  useEffect(() => {
    // get user profile
    db.collection("Users")
      .doc(userId)
      .get()
      .then((querySnapshot) => {
        const response = querySnapshot.data();
        setUserData(response);
      })
      .catch((err) => console.error(err));
    // get user listings
    db.collection("List_Properties")
      .where("Owner_id", "==", userId)

      .get()

      .then((snapshot) => {
        let arr = [];
        snapshot.docs.map((doc) => {
          let docId = doc.id;
          let value = doc.data();

          return arr.push({ docId, ...value });
        });
        return setUserListings(arr);
      });
  }, [db, userId]);
  if (state.CurrentUserInfo.UserType === "User") {
    props.history.push("/list");
  }
  // const handleOnclick = () => {
  //   db.collection("Users")
  //     .doc(userId)
  //     .update({
  //       status: !userData.status,
  //     })
  //     .then(() => {
  //       dispatch({ type: "REMOVE_ERROR" });
  //       dispatch({
  //         type: "ADD_MESSAGE",
  //         payload: "User Profile Updated Successfully",
  //       });
  //     })
  //     .catch((err) => {
  //       dispatch({ type: "REMOVE_MESSAGE" });
  //       dispatch({
  //         type: "ADD_ERROR",
  //         payload: "Error! Failed to update User Profile",
  //       });
  //     });
  // };
  return (
    <div className="profile">
      <Container>
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

        <Row className="viewprofilerow mt-5">
          <Col className="mt-3">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" className="inputstyle">
                FirstName: {userData.FirstName}
              </InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" className="inputstyle">
                LastName :{userData.LastName}
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <Col className="mt-3">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" className="inputstyle">
                Email: {userData.Email}
              </InputGroup.Text>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" className="inputstyle">
                Phone Number :{userData.Phone_Number}
              </InputGroup.Text>
            </InputGroup>
          </Col>

          <Col className="mt-3">
            {/* <InputGroup className="mb-3 mt-4">
              <InputGroup.Text id="basic-addon1" className="inputstyle">
                Date Joined:{" todo"}
              </InputGroup.Text>
            </InputGroup> */}

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" className="inputstyle">
                ID Number:{userData.ID_Number}
              </InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3 mt-4">
              <InputGroup.Text id="basic-addon1" className="inputstyle">
                Ocupation:{userData.Ocupation}
              </InputGroup.Text>
            </InputGroup>
            {/* status */}
            {/* <Form>
              <Button
                onClick={() => handleOnclick()}
                variant={`${userData.status ? "success" : "danger"}`}
              >
                {userData.status ? "Deactivate" : "Activate"}
              </Button>
            </Form> */}
          </Col>
        </Row>
        <hr style={{ backgroundColor: "yellow", opacity: "0.5" }}></hr>
        <h4>Listings</h4>
        <Table striped bordered hover responsive="lg">
          <thead>
            <tr>
              <th>Property Title</th>
              <th>Date Requested</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {userListings &&
              userListings.map((listing) => [
                <tr key={listing.docId}>
                  <td>{listing.Property_Title}</td>
                  <td>
                    {moment(listing.date_created.toDate()).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </td>
                  {!listing.visited ? (
                    <td className="text-primary">Pending...</td>
                  ) : listing.approved ? (
                    <td className="text-success">Approved</td>
                  ) : (
                    <td className="text-danger">Rejected</td>
                  )}

                  <td>
                    <Button variant="outline-success">
                      <Link to={`/propertydetails/${listing.docId}`}>
                        View Details
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

export default ViewProfile;
