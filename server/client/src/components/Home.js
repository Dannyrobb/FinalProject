import { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../App";
import { useNavigate, Link } from "react-router-dom";
import { Button, CircularProgress, Typography } from "@mui/material";
import Slider from "./Slider.js";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { Box } from "@mui/material";
import Fade from "react-reveal/Fade";
import { Rating } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import StoreIcon from "@mui/icons-material/Store";

const Home = (props) => {
  const [token, setToken] = useState({});
  const { accessToken } = useContext(AppContext);
  const [someReviews, setSomeReviews] = useState();
  const [businesses, setSomeBusinesses] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    try {
      axios.get("/getAllReviews").then((res) => {
        console.log(res.data);
        return setSomeReviews(res.data);
      });
      axios.get("/allBuisnessesWithLocationAndReviews").then((res) => {
        setSomeBusinesses(res.data);
      });
    } catch (e) {
      navigate("/login");
    }
  }, []);

  return (
    <Box sx={{ minHeight: "70vh", width: "99.1vw" }}>
      <Slider />

      <Typography variant="h3" sx={{ color: "white", paddingTop: "100px", textDecoration: "underline #52ab98" }}>
        Check out some recent reviews!
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "center", m: 3, paddingBottom: "100px" }}>
        {someReviews ? (
          someReviews.map((review) => {
            return <ReviewCard review={review} />;
          })
        ) : (
          <CircularProgress />
        )}
        <Box>
          {" "}
          <Typography variant="h3" sx={{ color: "white", paddingTop: "50px", textDecoration: "underline #52ab98", paddingBottom: "50px" }}>
            Lets welcome some of our new businesses!
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "center", m: 3 }}>
            {businesses
              ? businesses.map((item) => {
                  return (
                    <Fade bottom cascade>
                      <Box
                        key={item.id}
                        sx={{
                          width: 400,
                          height: 290,
                          m: 3,
                          borderRadius: 9,
                          backgroundColor: "white",
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            color: "black",
                            textDecoration: "none",
                            "&:hover": {
                              color: "black",
                            },
                            margin: 1,
                          }}
                          component={Link}
                          to={`/business/${item.id}`}
                        >
                          {item.businesse_name}
                        </Typography>

                        {item.reviews.length > 0 ? (
                          <Typography variant="h5">
                            <Rating
                              name="read-only"
                              value={item.reviews.reduce((accumulator, object) => {
                                return accumulator + object.rating / item.reviews.length;
                              }, 0)}
                              readOnly
                              size="small"
                            />
                          </Typography>
                        ) : (
                          <Typography varient="p" sx={{ margin: 1 }}>
                            No Ratings Yet...
                          </Typography>
                        )}
                        <Typography sx={{ color: "black" }} varient="p" component={Link} to={`/locations/${item.location.location_id}`}>
                          {item.location.location_name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignContent: "center",
                            maxHeight: "170px",
                            minHeight: "100px",
                          }}
                        >
                          <Typography
                            variant={item.businesse_description.length > 40 ? " subtitle2" : "h5"}
                            sx={{ overflow: "hidden", padding: 2 }}
                          >
                            {item.businesse_description}
                          </Typography>
                          <IconButton component={Link} to={`/business/${item.id}`} sx={{ position: "absolute", left: 0, bottom: 0 }}>
                            <StoreIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Fade>
                  );
                })
              : "loading"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
