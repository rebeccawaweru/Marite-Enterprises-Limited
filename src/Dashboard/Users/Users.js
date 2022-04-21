import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, Container, Table } from "react-bootstrap";
import "./Users.css";
import { Link, useHistory } from "react-router-dom";

function Users() {
  const history = useHistory();

  const { state } = useAuth();
  if (state.CurrentUserInfo.UserType === "User") {
    history.push("/list");
  }
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Table
        responsive="sm"
        striped
        bordered
        hover
        variant="dark"
        className="mt-3"
      >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>ID Number</th>
            <th>Occupation</th>
            <th>Nationality</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {state.allUsers.map((user) => [
            <tr key={user.UID}>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.Phone_Number}</td>
              <td>{user.ID_Number}</td>
              <td>{user.Ocupation}</td>
              <td>{user.Nationality}</td>

              <td id={`${user.status ? "activeUser" : "inactiveUser"}`}>
                {user.status ? "Active" : "In-Active"}
              </td>

              <td>
                <Button variant="outline-success">
                  <Link to={`user/${user.UID}`}>View Profile</Link>
                </Button>
              </td>
            </tr>,
          ])}
        </tbody>
      </Table>
    </Container>
  );
}

export default Users;
