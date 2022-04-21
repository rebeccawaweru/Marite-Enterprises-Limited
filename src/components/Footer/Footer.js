import React from "react";
import { LogoC } from "./../Nav/Navbar";

import { Navbar, Container } from "react-bootstrap";

let year = new Date().getFullYear();

function Footer() {
  return (
    <Navbar className=" navBar">
      <Container className="d-flex justify-content-between align-items-end navBar">
        <LogoC />

        <p style={{ fontSize: "12px" }}>
          Copyright ©{year} All Rights Resevered Marite Enterprises Limited
        </p>
      </Container>
    </Navbar>
  );
}

export default Footer;
