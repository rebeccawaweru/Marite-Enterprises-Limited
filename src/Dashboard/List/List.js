import React, { useState, useEffect } from "react";
import "./List.css";
//import ImageUpload from "./ImageUpload";
import Message from "../../components/MESSAGE/Message";
import { useAuth } from "./../../context/AuthContext";
import {
  Button,
  Form,
  Col,
  Row,
  InputGroup,
  Container,
  Alert,
  ProgressBar,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

function List(props) {
  //const [selectedFiles, setSelectedFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [isloader, setIsLoading] = useState(false);
  const [listData, setListData] = useState({
    Property_Title: "",
    Status: "",
    Type: "",
    Price: 0,
    PriceUnit: 0,
    Width: "",
    Length: 0,
    Physical_Address: "",
    City: "",
    State: "",
    Detailed_Information: "",
    Building_Age: "",
    images: images,
  });

  const handleImage = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };
  // transfer data

  const { state, dispatch, currentUser, DataFunctions, storage } = useAuth();
  const [progressBar, setProgressBar] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgressBar(true);
    setIsLoading(true);
    try {
      const title = "List_Properties";
      await DataFunctions.CreateDocNoId(
        title,
        listData,
        dispatch,
        currentUser.uid,
        images,
        storage
      ); //loader

      dispatch({
        type: "ADD_MESSAGE",
        payload: "List Updated Succesfully",
      });
    } catch (error) {
      dispatch({
        type: "ADD_ERROR",
        payload: "Error! Submitting your document",
      });
    }
  };

  const handleOnclick = () => {
    history.push("/editprofile");
  };
  // update Progress bar and didable btn
  useEffect(() => {
    if (state.progressBar > 1) {
      setIsLoading(true);
      setProgressBar(true);
    } else {
      setIsLoading(false);
      setProgressBar(false);
    }
  }, [state.progressBar]);

  if (!progressBar) {
    return (
      <div className="listings">
        <Container className="container-fluid w-100 justify-content-center">
          <Container className="w-100 d-flex justify-content-between align-items-center">
            <h6>
              <i>Client Information</i>
            </h6>{" "}
            <Button variant="outline-success" onClick={() => handleOnclick()}>
              Update Profile
            </Button>
          </Container>
          {state.Error || state.Message ? (
            <Alert variant={state.Error ? "danger" : "success"}>
              <Message
                message={state.Error ? state.Error : state.Message}
                dispatch={dispatch}
              />
            </Alert>
          ) : null}
          <br></br>
          <Row>
            <Col>
              <Form.Label className="listlabel">First Name</Form.Label>
              <Form.Control
                type="text"
                readOnly
                defaultValue={
                  state.CurrentUserInfo.FirstName
                }
                placeholder="first name"
                style={styles}
              />
            </Col>

            <Col>
              <Form.Label className="listlabel">Last Name</Form.Label>
              <Form.Control
                readOnly
                defaultValue={state.CurrentUserInfo.LastName}
                type="text"
                placeholder="last name"
                style={styles}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className="listlabel">Phone number</Form.Label>
              <Form.Control
                readOnly
                defaultValue={state.CurrentUserInfo.Phone_Number}
                type="number"
                placeholder="phone number"
                style={styles}
              />
            </Col>
            <Col>
              <Form.Label className="listlabel">ID number</Form.Label>
              <Form.Control
                readOnly
                defaultValue={state.CurrentUserInfo.ID_Number}
                type="number"
                placeholder="IdNo"
                style={styles}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className="listlabel">Occupation</Form.Label>
              <Form.Control
                readOnly
                defaultValue={state.CurrentUserInfo.Ocupation}
                type="text"
                placeholder="Occupation"
                style={styles}
              />
            </Col>
            <Col>
              <Form.Label className="listlabel">Nationality</Form.Label>
              <Form.Control
                readOnly
                defaultValue={state.CurrentUserInfo.Nationality}
                type="text"
                placeholder="Nationality"
                style={styles}
              />
            </Col>
          </Row>
          <br></br>
          <h6>
            <i>Basic Information</i>
          </h6>
          <br></br>
          {/* hre */}
          <Form onSubmit={handleSubmit}>
            <Form.Label className="listlabel">Property Title</Form.Label>
            <Form.Control
              required
              onChange={(e) =>
                setListData({ ...listData, Property_Title: e.target.value })
              }
              type="text"
              placeholder="Property Title"
              style={styles}
            />
            <Row>
              <Col>
                <Form.Label className="listlabel">Status</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    required
                    onChange={(e) =>
                      setListData({ ...listData, Status: e.target.value })
                    }
                    as="select"
                    custom
                    style={drop}
                  >
                    <option></option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                  </Form.Control>
                </InputGroup>
              </Col>
              <Col>
                <Form.Label className="listlabel">Type</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    required
                    onChange={(e) =>
                      setListData({ ...listData, Type: e.target.value })
                    }
                    as="select"
                    custom
                    style={drop}
                  >
                    <option>Select Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Shop">Shops</option>
                    <option value="Office">Offices</option>
                    <option value="WareHouse">WareHouse</option>
                    <option value="Land">Land</option>
                    <option value="Garage">Garage</option>
                  </Form.Control>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Form.Label className="listlabel">Price</Form.Label>
                <Form.Control
                  required
                  onChange={(e) =>
                    setListData({ ...listData, Price: Number(e.target.value) })
                  }
                  type="number"
                  placeholder="1,000,000"
                  style={styles}
                />
              </Col>

              <Col sm>
                <Form.Label className="listlabel">Size Unit</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    onChange={(e) =>
                      setListData({ ...listData, Width: e.target.value })
                    }
                    as="select"
                    custom
                    style={drop}
                  >
                    <option>Size Unit</option>
                    <option value="m²">m²</option>
                    <option value="ft²">ft²</option>
                    <option value="ha">ha</option>
                    <option value="ac">ac</option>
                    <option value="perch">perch</option>
                  </Form.Control>
                </InputGroup>
              </Col>

              <Col sm>
                <Form.Label className="listlabel">Size</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    setListData({
                      ...listData,
                      Length: e.target.value,
                    })
                  }
                  type="text"
                  step={".01"}
                  min={0}
                  placeholder="(e.g 100)"
                  style={styles}
                />
              </Col>

              <Col sm>
                <Form.Label className="listlabel">Price per unit</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    setListData({
                      ...listData,
                      PriceUnit: Number(e.target.value),
                    })
                  }
                  type="number"
                  placeholder="eg 100,000 /acre/ha/perch/m²/ft²"
                  style={styles}
                />
              </Col>
            </Row>
            <br></br>
            <h6>
              <i>Property Gallery</i>
            </h6>
            <br></br>
            <Form.Label className="listlabel">
              Insert Photos of your property
            </Form.Label>
            <Row>
              <Col>
                <Form.Control
                  required
                  type="file"
                  multiple
                  onChange={handleImage}
                />
              </Col>
            </Row>
            <br></br>
            <h6>
              <i>Location</i>
            </h6>
            <Row>
              <Col>
                <Form.Label className="listlabel">Physical_Address</Form.Label>
                <Form.Control
                  required
                  onChange={(e) =>
                    setListData({
                      ...listData,
                      Physical_Address: e.target.value,
                    })
                  }
                  type="address"
                  placeholder="Physical Address"
                  style={styles}
                />
              </Col>

              <Col>
                <Form.Label className="listlabel">City</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    required
                    onChange={(e) =>
                      setListData({ ...listData, City: e.target.value })
                    }
                    placeholder="City"
                    type="text"
                    style={drop}
                  ></Form.Control>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="listlabel">State</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    required
                    onChange={(e) =>
                      setListData({ ...listData, State: e.target.value })
                    }
                    type="text"
                    defaultValue="Kenya"
                    style={styles}
                  />
                </InputGroup>
              </Col>

              <Col>
                <Form.Label className="listlabel">Postal_Code</Form.Label>
                <Form.Control
                  required
                  onChange={(e) =>
                    setListData({ ...listData, Postal_Code: e.target.value })
                  }
                  type="number"
                  placeholder="Postal Code"
                  style={styles}
                />
              </Col>
            </Row>
            <br></br>
            <h6>
              <i>Detailed Information</i>
            </h6>
            <Row lg={2} xs={1}>
              <Col>
                <Form.Label className="listlabel">
                  Detailed Information
                </Form.Label>

                <Form.Control
                  required
                  onChange={(e) =>
                    setListData({
                      ...listData,
                      Detailed_Information: e.target.value,
                    })
                  }
                  as="textarea"
                  placeholder="Descriptive information"
                  style={{ drop }}
                />
              </Col>

              <Col>
                <Form.Label className="listlabel">
                  Building Age(Optional)
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    onChange={(e) =>
                      setListData({
                        ...listData,
                        Building_Age: e.target.value,
                      })
                    }
                    as="select"
                    custom
                    style={drop}
                  >
                    <option></option>
                    <option value="0-1 years">0-1 Years</option>
                    <option value="2-5 years">2-5 Years</option>
                    <option value="6-10 years">6-10 Years</option>
                    <option value="11-20 years">11-20 Years</option>
                    <option value="21-40 years">21-40 Years</option>
                    <option value="40+ years">40+ Years</option>
                  </Form.Control>
                </InputGroup>
              </Col>
            </Row>
            <Button
              disabled={isloader}
              type="submit"
              variant="outline-success mt-3 mb-2"
              // onClick={handleSubmit}
            >
              Submit Request
            </Button>
          </Form>
        </Container>
      </div>
    );
  } else {
    return (
      <div
        className="mt-0 d-flex justify-content-center align-item-center flex-column"
        style={{ minHeight: "100vh", maxWidth: "100%" }}
      >
        <Container>
          <h2 className="text-center">
            Please wait as we upload your Property Details!{" "}
            {state.progressBar.toFixed(0)}% complete..
          </h2>
          <ProgressBar
            now={state.progressBar}
            label={`${state.progressBar.toFixed(0)}% Complete`}
            className="mt-0 w-100"
            striped
            variant="warning"
          />
        </Container>
      </div>
    );
  }
}
const styles = {
  borderBottom: "greenyellow solid 1px",
  borderTop: "none",
  borderRight: "none",
  borderLeft: "none",
  backgroundColor: "transparent",
  color: "white",
};
const drop = {
  border: "greenyellow solid 1px",
  backgroundColor: "transparent",
  color: "white",
};
export default List;
