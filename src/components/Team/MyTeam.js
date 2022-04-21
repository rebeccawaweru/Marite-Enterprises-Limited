import React, { useState } from "react";
import "./myteam.css";
import {
  Col,
  Row
} from "react-bootstrap";

// import data
import { staffData } from "./staffData";

function MyTeam() {
  console.log(staffData);
  document.title = "Our Team";
  return (
    <div className="teamContainer">
      <Row className="mt-5 mb-5">
        <Col className="leftside">
          <hr className = "horizontal"></hr>
        <h5 className = "mb-2" >MEET</h5>
        <h5 className = "mb-2" >OUR</h5>
        <h5 className = "mb-2" >TEAM</h5>
        </Col>

        <Col sm={10} className="rightside">
           {staffData.map((person) => {
            return <StaffDisplay key={person.id} {...person}></StaffDisplay>;
          })}
        </Col>
      </Row>
    </div>
  );
}


const StaffDisplay = ({
  name,
  position,
  facebook,
  twitter,
  img,
  moreInfo,
  linkedin,
}) => {
  const [displayText, setDisplayText] = useState(false);
  return (
    <div
      onClick={() => {
        displayStaff(
          name,
          position,
          facebook,
          twitter,
          img,
          moreInfo,
          linkedin
        );
      }}
      onMouseOver={() => {
        setDisplayText(true);
      }}
      onMouseOut={() => {
        setDisplayText(false);
      }}
      className="flotLeft"
    >
      <img src={img} alt="" />

      <div className="textDivContainer">
        <h1 className="staffName" id={displayText ? "di-block" : null}>
          {name}
        </h1>
        <h2 className="staffPosition" id={displayText ? "di-block" : null}>
          {position}
        </h2>
        <div
          className="socialMediaAndLink"
          id={displayText ? "di-block" : null}
        >
          <a href={facebook}>
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </a>
          <a href={twitter}>
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </a>
          <a href={linkedin}>
            <i className="fa fa-linkedin-square" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

const displayStaff = (name, position, facebook, twitter, img, moreInfo) => {
  console.log(name);
  return (
    <>
      <div className="popup">
        <h1>hey you poped {name}</h1>
        <button>Close</button>
      </div>
    </>
  );
};

export default MyTeam;
