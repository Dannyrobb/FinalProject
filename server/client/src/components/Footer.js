import React from "react";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted ">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Learn more about my journey:</span>
        </div>

        <div>
          <a href="/myPortfolio" className="me-4 text-reset">
            <InfoIcon />
          </a>

          <a href="https://www.linkedin.com/in/dannyrobb/" className="me-4 text-reset">
            <LinkedInIcon />
          </a>
          <a href="https://github.com/Dannyrobb" className="me-4 text-reset">
            <GitHubIcon />
          </a>
        </div>
      </section>

      <section>
        <MDBContainer className="text-center text-md-start mt-5 ">
          <MDBRow className="mt-3">
            <MDBCol md="6" lg="5" xl="6" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon color="secondary" icon="gem" className="me-3" />
                Share It
              </h6>
              <p>A platform to share experiences with local businesses and services.</p>
              <p> "What makes us unique are our thoughts. Do not hesitate to speak your mind"</p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>

              <p>
                <EmailIcon />
                daniel.00001@gmail.com
              </p>
              <p>
                <PhoneIcon /> +97 254 424 24 13
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        © 2023 Copyright Daniel Robin
      </div>
    </MDBFooter>
  );
}
