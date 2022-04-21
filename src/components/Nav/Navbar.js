import React, { useEffect } from "react";
import logo from "./../../assets/images/roof.jpg";
import facebook from "./../../assets/icons/facebook.png";
import twitter from "./../../assets/icons/twitter.png";
import linkedin from "./../../assets/icons/linkedin.png";
import { Link } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";

import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
// links
export const socialMediaLinks = {
  fbUrl: "https://www.facebook.com/mariteenterprises/",
  twiterUrl: "https://twitter.com/home?lang=en",
  linkedidUrl: "https://www.linkedin.com/",
  // imgs
  facebookImg: facebook,
  twitterImg: twitter,
  linkedinImg: linkedin,
};

function NavBar() {
  const { state, currentUser, dispatch, DataFunctions } = useAuth();

  useEffect(() => {
    if (currentUser) {
      dispatch({ type: "logedin" });
    } else {
      dispatch({ type: "logedout" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  //alert(currentUser.email);
  
  return (
    <Navbar
      sticky="top"
      className="navBar navBarContainer bgColoured"
      expand="lg"
    >
      <Container className="w-100 d-flex justify-content-between navBar ">
        <LogoC />

        <Navbar.Toggle aria-controls="basic-navbar-nav navbar-light " />
        <Navbar.Collapse id="basic-navbar-nav  " className="bgTransparent">
          {state.isLoggedIn ? (
            // is looged in
            <Nav className="me-auto navLinks w-100 justify-content-end navBar navbarLinks bgTransparent ">
              {/* for admin propertyrequest users */}
              {state.CurrentUserInfo &&
              state.CurrentUserInfo.UserType === "admin" ? (
                <>
                  <Link className=" navLinks" to="/Home">
                    DASHBOARD
                  </Link>
                  <Link className=" navLinks" to="/users">
                    USERS
                  </Link>
                </>
              ) : (
                <>
                  <Link className=" navLinks" to="/">
                    HOME
                  </Link>
                  <Link className="navLinks" to="/MyTeam">
                    OUR TEAM
                  </Link>
                  <Link className="navLinks" to="/Rentbuy">
                    RENT OR BUY
                  </Link>
                  <Link className="navLinks" to="/Contact">
                    CONTACT
                  </Link>
                </>
              )}
              <NavDropdown
                className="ml-4 navBarx"
                title="LISTING "
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link to="/list">List Property</Link>
                </NavDropdown.Item>
                {state.CurrentUserInfo.UserType !== "User" && (
                  <NavDropdown.Item>
                    <Link to="/propertyrequest">Listings</Link>
                  </NavDropdown.Item>
                )}
                {state.CurrentUserInfo.UserType !== "User" && (
                  <NavDropdown.Item>
                    <Link to="/listvacancy">List Vacancy</Link>
                  </NavDropdown.Item>
                )}
                {state.CurrentUserInfo.UserType !== "User" && (
                  <NavDropdown.Item>
                    <Link to="/vacancylist">Vacancies</Link>
                  </NavDropdown.Item>
                )}
                {/* <NavDropdown.Item>Support</NavDropdown.Item> */}
              </NavDropdown>
              <NavDropdown
                className="ml-4 navBarx"
                title="PROFILE"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link to="/profile">View Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/editprofile">Edit Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/ForgotPassword">Reset Password</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/Updateemail">Update Email </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => DataFunctions.logout()}>
                  Log-Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            //  ( is looged out
            <Nav className="me-auto navLinks w-100 justify-content-end navBar navbarLinks bgTransparent ">
              <Link className="navLinks" to="/">
                HOME
              </Link>
              <Link className="navLinks" to="/About">
                ABOUT
              </Link>
              <Link className="navLinks" to="/MyTeam">
                OUR TEAM
              </Link>
              <Link className="navLinks" to="/Rentbuy">
                RENT OR BUY
              </Link>
              <Link className="navLinks" to="/Contact">
                CONTACT
              </Link>
              <Link className="navLinks" to="/login">
                LIST PROPERTY
              </Link>
              <div className=" d-flex socialmediaLinks">
                <Nav.Link>
                  <i href={socialMediaLinks.fbUrl}>
                    <img src={facebook} alt="facebook" />
                  </i>
                </Nav.Link>
                <Nav.Link>
                  <i href={socialMediaLinks.twiterUrl}>
                    <img src={twitter} alt="twitter" />
                  </i>
                </Nav.Link>
                <Nav.Link>
                  <i href={socialMediaLinks.linkedidUrl}>
                    <img src={linkedin} alt="linkedin" />
                  </i>
                </Nav.Link>
              </div>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export const LogoC = () => {
  console.log();
  return (
    <Navbar.Brand className="d-flex align-items-baseline mylogo">
      <Link to="/">
        <img className="logo" src={logo} alt="" />
      </Link>
      <Link to="/">
        <>
          <h1 id="marite">MARITE</h1>
          <h2 id="ent">Enterprises</h2>
        </>
      </Link>
    </Navbar.Brand>
  );
};
export default NavBar;
