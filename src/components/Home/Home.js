import React, { useState } from "react";
import "./Home.css";
import Slideshow from "./Slideshow";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
function Home() {
  document.title = "Marite Enterprises";
  return (
    <div>
      <Sec1 />
      <Sec2 />
    </div>
  );
}
// section 1
const Sec1 = () => {
  return (
    <div className="home">
      <div className="imgDiv">
        <Slideshow />
      </div>
    </div>
  );
};
// sec two

const Sec2 = () => {
  const { db } = useAuth();
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState({});
  const [searchData, setSearchData] = useState({});
  const getProperties = () => {
    return new Promise((resolve, reject) => {
      db.collection("Vacancies")

        .get()
        .then((snapshot) => {
          let arr = [];
          snapshot.docs.map((doc) => {
            return arr.push({ ...doc.data(), id: doc.id });
          });

          return resolve(arr);
        });
    });
  };

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
      const vacancies = await getProperties();
      let arr = [];
      vacancies.map(async (vacancy) => {
        const owner = await getOwner(vacancy.owner);

        if (owner.UID === vacancy.owner) {
          arr.push({ ...vacancy, ...owner });
        }
        setData([...arr]);
      });
    } catch (error) {}
  }

  useEffect(() => {
    allInfo();
  }, []);

  const handleOnclick = () => {
    if (searchData.NumberOfBedrooms && searchData.location) {
      setData([]);

      db.collection("Vacancies")
        .where("NumberOfBedrooms", "==", searchData.NumberOfBedrooms)
        .where("location", "==", searchData.location)
        .where("monthlyRent", ">=", searchData.min)
        .where("monthlyRent", "<=", searchData.max)

        .get()
        .then((snapshot) => {
          let arr = [];
          setData([]);
          snapshot.docs.map(async (vacancy) => {
            const owner = await getOwner(vacancy.data().owner);

            if (owner.UID === vacancy.data().owner) {
              return arr.push(vacancy.data());
            }
          });
          console.log(arr.BuildingName);
          console.log(arr);
          return setData(arr);
        });
    }
  };

  return (
    <div className="sec2">
      <div className="autolist">
        <h6>VACANCIES</h6>
        <div className="selections mt-5 mb-3">
          <select
            onChange={(e) =>
              setSearchData({
                ...searchData,
                NumberOfBedrooms: Number(e.target.value),
              })
            }
            className="form-select"
          >
            <option>Select Bedroom</option>
            <option value="1.1">Bedsitter</option>
            <option value="1.2">SingleRoom</option>
            <option value="1.3">DoubleRoom</option>
            <option value="1.4">Shop</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4+</option>
          </select>
          <select
            onChange={(e) =>
              setSearchData({ ...searchData, location: e.target.value })
            }
            className="form-select"
          >
            <option>Select location</option>
            <option value="Town">Town</option>
            <option value="Asianquarters">Asianquarters</option>
            <option value="Baraka">Baraka</option>
            <option value="Bluegum">Bluegum</option>
            <option value="Cottage">Cottage</option>
            <option value="Equator">Equator</option>
            <option value="Gatheri">Gatheri</option>
            <option value="Ichuga">Ichuga</option>
            <option value="JuaKali">JuaKali</option>
            <option value="Kilimo">Kilimo</option>
            <option value="Majengo">Majengo</option>
            <option value="Makutano">Makutano</option>
            <option value="Muthaiga">Muthaiga</option>
            <option value="Roma">Roma</option>
            <option value="Ruai">Ruai</option>
            <option value="Stadium">Stadium</option>
            <option value="Teachers">Teacher</option>
            <option value="Thingithu">Thingithu</option>
            <option value="Likii">Likii</option>
          </select>
          <select
            onChange={(e) =>
              setSearchData({ ...searchData, min: Number(e.target.value) })
            }
            className="form-select"
          >
            <option>Min Price</option>
            <option value="1000">1000</option>
            <option value="2000">2000</option>
            <option value="3000">3000</option>
            <option value="4000">4000</option>
            <option value="5000">5000</option>
          </select>

          <select
            onChange={(e) =>
              setSearchData({ ...searchData, max: Number(e.target.value) })
            }
            className="form-select"
          >
            <option>Max Price</option>
            <option value="10000">10000</option>
            <option value="25000">25000</option>
            <option value="50000">50000</option>
            <option value="75000">75000</option>
            <option value="100000">100,000+</option>
          </select>

          <Button
            onClick={() => handleOnclick()}
            variant="outline-success"
            className="m-1"
          >
            Search
          </Button>
        </div>

        {data.length >= 0 ? (
          data.map((vacancy) => [
            <Card
              className="float-left mt-2 mxwv"
              style={{ maxWidth: "235px", marginRight: "5px" }}
            >
              <Card.Body>
                <Card.Text>{vacancy.BuildingName}</Card.Text>
                <Card.Text>
                  Bedrooms:{" "}
                  {vacancy.NumberOfBedrooms === 1.1
                    ? "Bedsitter"
                    : vacancy.NumberOfBedrooms === 1.2
                    ? " SingleRoom"
                    : vacancy.NumberOfBedrooms === 1.3
                    ? "DoubleRoom "
                    :vacancy.NumberOfBedrooms === 1.4
                    ? "Shop"
                    : vacancy.NumberOfBedrooms}
                </Card.Text>
                <Card.Text>Location: {vacancy.location}</Card.Text>
                <Card.Text>Rent :Ksh.{vacancy.monthlyRent}</Card.Text>
                <Card.Text>More Info:{vacancy.moreInfo}</Card.Text>
                <Card.Text>
                  call: {vacancy.FirstName} {vacancy.Phone_Number}
                </Card.Text>
              </Card.Body>
            </Card>,
          ])
        ) : (
          <>
            <h2>No vacancies Found</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
