import React, { useState, useEffect } from "react";
import "./Rentbuy.css";
import emailjs from "emailjs-com";
import { Card, Button, Modal, Form, Carousel, Spinner} from "react-bootstrap";

import { useAuth } from "./../../context/AuthContext";

const pageUrl = document.location.href;
function Rentbuy() {
  document.title = "Rent or Buy";
  const { db } = useAuth();
  //collect all property visited and approved
  const [listProprty, setListProperty] = useState();
  const [search, setSearch] = useState({
    type: "",
    LPrice: 0,
    hPrice: 0,
  });
  console.log(listProprty);
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
        return setListProperty(arr);
      });
  }, [db]);
  const handleOnClick = () => {
    console.log(search);
    setListProperty();
    db.collection("List_Properties")
      .where("approved", "==", true)
      .where("visited", "==", true)
      .where("Type", "==", search.type)
      .where("Price", ">=", search.LPrice)
      .where("Price", "<=", search.hPrice)
      .get()

      .then((snapshot) => {
        let arr = [];
        snapshot.docs.map((doc) => {
          let docId = doc.id;
          let value = doc.data();

          return arr.push({ docId, ...value });
        });
        return setListProperty(arr);
      });
  };
  console.log(listProprty);

  return listProprty === undefined ? (
    <div
      style={{ minHeight: "90vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Spinner variant="warning" animation="border" />
    </div>
  ) : (
    <div className="rentbuyContainer">
      <div className="mt-3">
        <h4 className="text-center">Rent or Buy Property</h4>

        <div className="selections mt-5 mb-3">
          {/* <SelectionFunction1 /> */}
          <>
            <select
              className="form-select"
              onChange={(e) => setSearch({ ...search, type: e.target.value })}
            >
              <option>Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Shop">Shops</option>
              <option value="Office">Offices</option>
              <option value="WareHouse">WareHouse</option>
              <option value="Land">Land</option>
              <option value="Garage">Garage</option>
            </select>
          </>
          <>
            <select
              className="form-select"
              onChange={(e) =>
                setSearch({ ...search, LPrice: Number(e.target.value) })
              }
            >
              <option>Minimum Price</option>
              <option value="1000">1000</option>
              <option value="2000">2000</option>
              <option value="3000">3000</option>
              <option value="4000">4000</option>
              <option value="100000">100000+</option>
            </select>
          </>
          <>
            <select
              className="form-select"
              onChange={(e) =>
                setSearch({ ...search, hPrice: Number(e.target.value) })
              }
            >
              <option>Maximum Price</option>
              <option value="10000">10000</option>
              <option value="25000">25000</option>
              <option value="50000">50000</option>
              <option value="75000">75000</option>
              <option value="100000">100000</option>
              <option value="200000">200000</option>
              <option value="300000">300000</option>
              <option value="400000">400000</option>
              <option value="500000">500000+</option>
            </select>
          </>
          <Button
            onClick={() => handleOnClick()}
            variant="outline-success"
            className="m-1"
          >
            Submit
          </Button>
        </div>
        <div className="w-100 redBuycardContainer">
          {listProprty ? (
            listProprty.map((data) => {
              return <PropertyCard key={data.docId} {...data} />;
            })
          ) : (
            <>
              <h1>Opps! No propery Found</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const PropertyCard = ({
  docId,
  Property_Title,
  Price,
  Physical_Address,
  Type,
  City,
  Status,
  Detailed_Information,
  List_Img_Urls,
  PriceUnit,
  Length,
  Width,
}) => {
  const [showModal, setShow] = useState(false);
  const [showShare, setShoShare] = useState(false);

  return (
  
    <Card
      className="float-left mt-2 mxw"
      style={{ maxWidth: "220px", marginRight: "5px" }}
    >
  
      <Carousel fade>
        {List_Img_Urls &&
          List_Img_Urls.map((img) => [
            <Carousel.Item className="caroselImg" interval={2000} key={img.id}>
              <img
                className="d-block  caroselIndividualImg "
                src={img.url}
                alt={img.id}
              />
            </Carousel.Item>,
          ])}
      </Carousel>
      
      <Card.Body className="cardBody">
        <Card.Title>{Property_Title}</Card.Title>
        <Card.Text> Price:{Price}</Card.Text>
        <Card.Text> Location:{City}</Card.Text>
        <Card.Text> Address:{Physical_Address}</Card.Text>
        <Card.Text> PropertyType:{Type}</Card.Text>
        <Card.Text>
          {" "}
          Size:{Length} {Width}{" "}
        </Card.Text>
        <Card.Text>
          {" "}
          Price Per Unit:{PriceUnit} per {Width}{" "}
        </Card.Text>
        <Card.Text>Status:{Status}</Card.Text>
        <Card.Text> Details:{Detailed_Information}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="outline-success" onClick={() => setShow(!showModal)}>
            Request Quote
          </Button>
          <i
            onClick={() => setShoShare(!showShare)}
            className={`fa fa-share-alt shareIcon ${
              showShare ? "d-none" : "d-block"
            }`}
            aria-hidden="true"
          ></i>
        </div>
        <div className={`showShareOptions ${showShare ? "d-block" : "d-none"}`}>
          <h1 onClick={() => setShoShare(!showShare)}>X</h1>
          <div className="d-flex justify-content-center align-items-center flex-column bg-transparent">
            <a
              href={`https://www.facebook.com/sharer.php?u=${
                pageUrl + "/" + docId
              }`}
            >
              <i className="fab fa-facebook shareIcons"></i>
            </a>
            <a
              href={`https://twitter.com/share?url=${
                pageUrl + "/" + docId
              }&text=${Property_Title}&via=[via]&hashtags=${"MariteLimited"}`}
            >
              <i className="fab fa-twitter shareIcons"></i>
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${Property_Title} ${
                pageUrl + "/" + docId
              }`}
            >
              <i className="fa fa-whatsapp shareIcons" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <Modals
          Property_Title={Property_Title}
          docId={docId}
          showModal={showModal}
          setShow={setShow}
        />
      </Card.Body>
    
    </Card>
 
  );
};

 const Modals = ({ Property_Title, docId, showModal, setShow }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    //  setLoading(true);
    emailjs
      .sendForm(
        "service_rwkus9i",
        "template_peeu77r",
        e.target,
        "user_vZ6viFp8CFEgYs6KsFZou"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    setShow(!showModal);
    e.target.reset();
  };

  return (
    <Modal show={showModal} onHide={() => setShow(!showModal)}>
      <Modal.Header closeButton>
        <Modal.Title>Enquiry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            required
            name="name"
            type="text"
            placeholder="Name"
            className="mb-3 equiry"
          />
          <Form.Control
            required
            name="phone"
            type="number"
            placeholder="07 XXXXXXXX"
            className="mb-3 equiry"
          />
          <Form.Control
            required
            name="email"
            type="email"
            placeholder="youremail@domain.com"
            className="mb-3 equiry"
          />
          <Form.Control
            name="id"
            type="hidden"
            Value={`${docId}`}
            className="mb-3 equiry"
            required
          />
          <Form.Control
            name="message"
            type="text"
            defaultValue={`I would like to inquire about ${Property_Title}`}
            className="mb-3 equiry"
            required
          />
          <Button type="submit" variant="outline-success">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rentbuy;
