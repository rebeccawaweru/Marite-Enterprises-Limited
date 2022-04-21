import React, { useEffect, useState } from "react";
import "./propertyrequest.css";
import {
  Container,
  Button,
  Row,
  Col,
  Carousel,
  Form,
  Alert,
} from "react-bootstrap";
import Message from "../../components/MESSAGE/Message";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function PropertyDetails(props) {
  const { id } = useParams();
  const { db, state, dispatch } = useAuth();
  console.log(state.CurrentUserInfo);
  //
  const [propertDetail, setPropertyDetail] = useState();

  useEffect(() => {
    db.collection("List_Properties")
      .doc(id)
      .get()
      .then((snapshot) => {
        setPropertyDetail(snapshot.data());
      })
      .catch(function (err) {
        console.error(err);
      });
  }, [id, db]);
  console.log(propertDetail);
  const handleApprove = () => {
    db.collection("List_Properties")
      .doc(id)
      .update({
        approved: true,
        visited: true,
        approver: state.CurrentUserInfo.UID,
      })
      .then(() => {
        console.log("Approved");
        dispatch({ type: "REMOVE_ERROR" });
        dispatch({
          type: "ADD_MESSAGE",
          payload: "Property Approved!",
        });
        window.location.reload();
      });
  };

  const handleReject = () => {
    db.collection("List_Properties")
      .doc(id)
      .update({
        approved: false,
        visited: true,
        approver: state.CurrentUserInfo.UID,
      })
      .then(() => {
        props.history.push("/profile");
        dispatch({
          type: "ADD_MESSAGE",
          payload: "Property Rejected!",
        });
        console.log("Rejected");
        window.location.reload();
      });
  };

  const handleDeleteListings = () => {
    db.collection("List_Properties")
      .doc(id)
      .delete()
      .then(function () {
        props.history.push("/propertyrequest");
        console.log("Document successfully deleted!");

        dispatch({
          type: "ADD_MESSAGE",
          payload: "Property Succesfully Deleted!",
        });
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <Container className="detailscontainer">
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
      {propertDetail && !propertDetail.visited ? (
        <p className="mt-4 text-center text-primary">Pending....</p>
      ) : null}
      {propertDetail && !propertDetail.approved ? (
        <p
          className={`text-danger mt-4 text-center ${
            propertDetail && !propertDetail.visited ? "d-none" : "d-block"
          } `}
        >
          Rejected
        </p>
      ) : (
        <p className="mt-4 text-center text-success">Approved</p>
      )}
      <Row>
        <Col>
          <Carousel fade>
            {propertDetail &&
              propertDetail.List_Img_Urls.map((img) => [
                <Carousel.Item
                  className="caroselImgDetails"
                  interval={1000}
                  key={img.id}
                >
                  <img
                    className="d-block w-100 caroselImgDetails "
                    src={img.url}
                    alt={img.id}
                  />
                </Carousel.Item>,
              ])}
          </Carousel>
        </Col>
        <Col>
          {state.CurrentUserInfo.UserType === "admin" ? (
            <>
              <Button variant="outline-warning">
                {" "}
                <Link to={`/user/${propertDetail && propertDetail.Owner_id}`}>
                  {" "}
                  View Owners Info
                </Link>
              </Button>
            </>
          ) : null}

          <Form className="mt-2" style={{ color: "white", fontSize: "10px" }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="propertydetails">
                <h5>
                  <span>
                    <strong>Property Title :</strong>{" "}
                  </span>
                  {propertDetail && propertDetail.Property_Title}
                </h5>
              </Form.Label>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="propertydetails">
                <h5>
                  <span>
                    <strong> Size Unit:</strong>
                  </span>
                  {propertDetail && propertDetail.Width}
                </h5>
              </Form.Label>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="propertydetails">
                <h5>
                  <span>
                    <strong> Size:</strong>
                  </span>
                  {propertDetail && propertDetail.Length}
                </h5>
              </Form.Label>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="propertydetails">
                <h5>
                  <span>
                    <strong> Price Per Unit:</strong>{" "}
                  </span>
                  {propertDetail && propertDetail.PriceUnit}
                </h5>
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="propertydetails">
                <h5>
                  <span>
                    <strong> Physical Address:</strong>
                  </span>
                  {propertDetail && propertDetail.Physical_Address}
                </h5>
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="propertydetails">
                <h5>
                  <span>
                    <strong> Status :</strong>{" "}
                  </span>
                  {propertDetail && propertDetail.Status}
                </h5>
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="propertydetails">
                <h5>
                  <span>
                    <strong> Location:</strong>{" "}
                  </span>
                  {propertDetail && propertDetail.City}
                </h5>
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="propertydetails">
                <h5>
                  <span>
                    <strong> Detailed Information:</strong>{" "}
                  </span>
                  {propertDetail && propertDetail.Detailed_Information}
                </h5>
              </Form.Label>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="propertydetails">
                <h5>
                  <span>
                    <strong> Building Age:</strong>{" "}
                  </span>
                  {propertDetail && propertDetail.Building_Age}
                </h5>
              </Form.Label>
            </Form.Group>
            {state.CurrentUserInfo.UserType === "admin" ? (
              <>
                {propertDetail && !propertDetail.visited ? (
                  <>
                    <Button
                      onClick={() => handleApprove()}
                      variant="outline-warning"
                      style={{ marginRight: "20px" }}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject()}
                      variant="outline-danger"
                    >
                      Reject
                    </Button>
                  </>
                ) : null}
              </>
            ) : null}

            <Button
              onClick={() => handleDeleteListings()}
              variant="danger"
              className="ml "
            >
              Delete!
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PropertyDetails;
