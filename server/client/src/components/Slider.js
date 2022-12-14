import { Typography } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import Fade from "react-reveal/Fade";

const Slider = (props) => {
  return (
    <Fade big>
      {" "}
      <div
        style={{
          backgroundColor: "white",
          paddingBottom: "30px",
          paddingTop: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Carousel interval={6000} fade pause={false} ride={"caurosel"}>
          <Carousel.Item>
            <img className=" rounded mx-auto d-block" src="images/MobileLogin.gif" alt="First slide" />
            <div style={{ height: "5vh" }}></div>
            <Carousel.Caption>
              <Typography variant="h5" sx={{ color: "black" }}>
                First step: Register
              </Typography>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className=" rounded mx-auto d-block" src="images/Search.gif" alt="Second slide" />
            <div style={{ height: "5vh" }}></div>
            <Carousel.Caption>
              <Typography variant="h5" sx={{ color: "black" }}>
                Second step: Search for businesses
              </Typography>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className=" rounded mx-auto d-block" src="images/review.gif" alt="Third slide" />
            <div style={{ height: "5vh" }}></div>
            <Carousel.Caption>
              <Typography variant="h5" sx={{ color: "black" }}>
                Third Step: Review!
              </Typography>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </Fade>
  );
};
export default Slider;
