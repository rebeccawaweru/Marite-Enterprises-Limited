import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Carousel, Spinner } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

function RentBuyDetails() {
  const { id } = useParams();
  console.log(id);
  const [property, setProperty] = useState([]);
  const { db } = useAuth();
  useEffect(() => {
    db.collection("List_Properties")
      .doc(id)
      .get()
      .then((snapshot) => {
        setProperty(snapshot.data());
      });
  }, [db, id]);
  console.log(property);

  //<Spinner animation="border" />
  return property.length === 0 ? (
    <div
      style={{ minHeight: "90vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Spinner variant="warning" animation="border" />
    </div>
  ) : (
    <Container
      style={{ minHeight: "100vh" }}
      className="w-100 d-flex justify-content-center "
    >
      <Card className="mt-5 " style={{ maxWidth: "500px" }} bg="warning">
        <Carousel fade>
          {property.List_Img_Urls &&
            property.List_Img_Urls.map((img) => [
              <Carousel.Item
                className="therentBuydetailImg"
                interval={2500}
                key={img.id}
              >
                <Card.Img
                  className="w-100 imgrentBuy"
                  src={img.url}
                  alt={img.id}
                />
              </Carousel.Item>,
            ])}
        </Carousel>
        <Card.Body className="d-flex flex-column justify-content-start">
          <Card.Title className="text-center">
            {property.Property_Title}
          </Card.Title>{" "}
          <hr />
          <Card.Text className="text-warning">
            Price: {property.Price}
          </Card.Text>
          <Card.Text className="align-self-start">
            Physical_Address: {property.Physical_Address}
          </Card.Text>
          <Card.Text>Status: {property.Status}</Card.Text>
          <Card.Text>Type: {property.Type}</Card.Text>
          <Card.Text>
            Detailed_Information :{property.Detailed_Information}
          </Card.Text>
          <Card.Text>
            Size: {property.Length} {property.Width}
          </Card.Text>
          <Card.Text>Location: {property.City}</Card.Text>
          <Card.Text>
            Price Per Unit: {property.PriceUnit} per {property.Width}
          </Card.Text>
          
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RentBuyDetails;
