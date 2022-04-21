import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Container, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./home.css";
function Home() {
  const { state, db } = useAuth();
  const history = useHistory();
  const [approved, setApproved] = useState();
  const [pending, setPending] = useState();
  const [rejected, setRejected] = useState();
  if (state.CurrentUserInfo.UserType !== "admin") {
    history.push("/list");
  }
  // get approved projects

  useEffect(() => {
    db.collection("List_Properties")
      .where("approved", "==", true)
      .where("visited", "==", true)
      .get()

      .then((snapshot) => {
        let arr = [];
        snapshot.docs.map((doc) => {
          let docId = doc.id;
          let value = doc.data();

          return arr.push({ docId, ...value });
        });
        return setApproved(arr.length);
      });

    db.collection("List_Properties")
      .where("approved", "==", false)
      .where("visited", "==", false)
      .get()

      .then((snapshot) => {
        let arr = [];
        snapshot.docs.map((doc) => {
          let docId = doc.id;
          let value = doc.data();

          return arr.push({ docId, ...value });
        });
        return setPending(arr.length);
      });
    db.collection("List_Properties")
      .where("approved", "==", false)
      .where("visited", "==", true)
      .get()

      .then((snapshot) => {
        let arr = [];
        snapshot.docs.map((doc) => {
          let docId = doc.id;
          let value = doc.data();

          return arr.push({ docId, ...value });
        });
        return setRejected(arr.length);
      });
  }, [db]);
  return (
    <div>
    <p className="fs-2 mt-3" style={{color:"yellow"}}>Quick Analysis</p>
    <Container
      className="mt-5 w-100 d-flex flex-wrap flex-row justify-content-center dashboard"
      style={{ marginTop: "20vh", minHeight: "120vh"}}
    >  
     
        
      <Card className="infoCard" bg="primary">
        <Card.Title className="bg-transparent text-center">Users</Card.Title>
        <Card.Body className="d-flex justify-content-center  align-items-center">
          <Card.Text>
            <Link to="/users">{state.allUsers.length}</Link>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="infoCard" bg="success">
        <Card.Title className="text-center bg-transparent">
          Approved Projects
        </Card.Title>
        <Card.Body className="d-flex justify-content-center  align-items-center">
          <Card.Text>{approved && approved}</Card.Text>
        </Card.Body>
      </Card>
      <Card bg="warning" className="infoCard">
        <Card.Title className="text-center bg-transparent">
          Pending Projects
        </Card.Title>
        <Card.Body className="d-flex justify-content-center  align-items-center">
          <Card.Text>{pending && pending}</Card.Text>
        </Card.Body>
      </Card>
      <Card className="infoCard" bg="danger">
        <Card.Title className="text-center bg-transparent">
          Rejected Projects
        </Card.Title>
        <Card.Body className="d-flex justify-content-center  align-items-center">
          <Card.Text>{rejected && rejected}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
}

export default Home;
