import React, { useState } from "react";
import "./vacancy.css";
import { Button, Container, Table, Modal, Form } from "react-bootstrap";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
function VacancyList(props) {
  const { state, db } = useAuth();

  const [propertyUpdate, setPropertyUpdate] = useState({});
  const [vacanciesData, setVacanciesData] = useState([]);

  function getAllVacancies() {
    return new Promise((success, fail) => {
      db.collection("Vacancies")
        .get()
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.docs.map((doc) => {
            return arr.push({ ...doc.data(), id: doc.id });
          });
          return success(arr);
        });
    });
  }

  function getOwner(id) {
    return new Promise((success, fail) => {
      db.collection("Users")
        .doc(id)
        .get()
        .then((user) => {
          return success(user.data());
        });
    });
  }

  async function allInfo() {
    try {
      const vacancies = await getAllVacancies();
      let arr = [];
      vacancies.map(async (vacancy) => {
        const owner = await getOwner(vacancy.owner);

        if (owner.UID === vacancy.owner) {
          arr.push({ ...vacancy, ...owner });
        }
        setVacanciesData([...arr]);
      });
      console.log([arr]);
    } catch (error) {}
  }

  useEffect(() => {
    allInfo();
  }, []);

  console.log([vacanciesData]);

  const handleDelete = (id) => {
    console.log(id);

    db.collection("Vacancies")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
        window.location.reload();
      });
  };
  return (
    <div className="vacancy">
      <Container style={{ minHeight: "100vh", textAlign: "center" }}>
        <h4 className="mt-2">Vacancies</h4>
        <Table
          responsive="sm"
          striped
          bordered
          hover
          variant="dark"
          className="mt-5"
        >
          <thead>
            <tr>
              <th>Building Name</th>
              <th>Number of Bedrooms</th>
              <th>Location</th>
              <th>Monthly Rent</th>
              <th>Listed by:</th>
              <th>Phone Number</th>
              <th>Edit Vacancy</th>
              <th>Remove vacancy</th>
            </tr>
          </thead>
          <tbody>
            {vacanciesData &&
              vacanciesData.map((vacant) => (
                <tr key={vacant.id}>
                  <td>{vacant.BuildingName}</td>

                  <td>
                    {" "}
                    {vacant.NumberOfBedrooms === 1.1
                      ? "Bedsitter"
                      : vacant.NumberOfBedrooms === 1.2
                      ? " SingleRoom"
                      : vacant.NumberOfBedrooms === 1.3
                      ? "DoubleRoom "
                      :vacant.NumberOfBedrooms === 1.4
                      ? "Shop"
                      : vacant.NumberOfBedrooms}
                  </td>

                  <td>{vacant.location}</td>
                  <td>Ksh. {vacant.monthlyRent}</td>
                  <td>{vacant.FirstName}</td>
                  <td>{vacant.Phone_Number}</td>

                  <td>
                    <Button
                      onClick={() =>
                        props.history.push(`vacancylist/${vacant.id}`)
                      }
                      variant="outline-success"
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDelete(vacant.id)}
                      variant="outline-success"
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default VacancyList;
