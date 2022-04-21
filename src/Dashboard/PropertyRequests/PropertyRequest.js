import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
function PropertyRequest(props) {
  const { db } = useAuth();
  const [propertyData, setPropertyData] = useState([]);

  //  get Propety Data
  function getPropertyData() {
    return new Promise((success, fail) => {
      db.collection("List_Properties")
        .get()
        .then((snapshot) => {
          let arr = [];
          snapshot.docs.map((doc) => {
            let docId = doc.id;
            let value = doc.data();
            return arr.push({ docId, ...value });
          });
          success(arr);
        });
    });
  }
  function getOwner(id) {
    return new Promise((success, fail) => {
      db.collection("Users")
        .doc(id)
        .get()
        .then((querySnapshot) => {
          success(querySnapshot.data());
        });
    });
  }
  async function allData() {
    try {
      const propertyData = await getPropertyData();

      let arr = [];
      propertyData.forEach(async (data) => {
        const Owner = await getOwner(data.Owner_id);
        if (data.Owner_id === Owner.UID) {
          arr.push({ ...data, ...Owner });
        }
        setPropertyData([...arr]);
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    allData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log([propertyData]);

  return (
    <div className="requestcontainer">
      <Container style={{ minHeight: "100vh" }} className="requestcontainer">
        <h6 className="text-center text-success mt-3">Property Requests</h6>
        <Table striped bordered hover responsive="lg" className="mt-5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone </th>
              <th>Property Title</th>
              <th>Property Type</th>
              <th>Price</th>
              <th>status</th> <th>Edit</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {propertyData &&
              propertyData.map((data) => {
                return (
                  <tr key={data.docId}>
                    <td>
                      {data.FirstName} {data.LastName}
                    </td>
                    <td>{data.Phone_Number}</td>
                    <td>{data.Property_Title}</td>
                    <td>{data.Type}</td>
                    <td>Ksh: {data.Price}</td>
                    {!data.visited ? (
                      <td className="text-primary">Pending...</td>
                    ) : !data.approved ? (
                      <td className="text-danger">Rejected</td>
                    ) : (
                      <td className="text-success">Approved</td>
                    )}
                    <td>
                      <Button
                        variant="outline-warning"
                        onClick={() =>
                          props.history.push(`/list/${data.docId}`)
                        }
                      >
                        {" "}
                        Eddit
                      </Button>
                    </td>
                    <td>
                      <Button variant="outline-warning">
                        <Link to={`/propertydetails/${data.docId}`}>
                          View More
                        </Link>
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default PropertyRequest;
