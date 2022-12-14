import { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import Box from "@mui/material/Box";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { Typography } from "@mui/material";
import { Rating } from "@mui/material";
import { shadows } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import Fade from "react-reveal/Fade";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const Categories = (props) => {
  const { accessToken } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    try {
      const decode = jwt_decode(accessToken);
      console.log("decoded=>", decode);
    } catch (e) {
      console.log(e);
    }

    axios
      .get("/getCategoriesAndBusinesses")
      .then((res) => setCategories(res.data))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ minHeight: "70vh", maxWidth: "100vw", paddingTop: "50px" }}>
      <Fade big>
        <Typography variant="h2" sx={{ color: "white", paddingTop: "40px", textDecoration: "underline #52ab98 " }}>
          Categories
        </Typography>
      </Fade>

      <Box>{loading == true && <CircularProgress />}</Box>
      {categories
        ? categories.map((item) => {
            return (
              <div key={item.category_id} style={{ maxWidth: "100vw" }}>
                <Fade bottom cascade>
                  <Typography variant="h4" sx={{ color: "white", padding: "30px" }}>
                    {item.category}
                  </Typography>
                </Fade>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                    overflow: "auto",
                    alignItems: "center",
                  }}
                >
                  {item.businesses.slice(-4).map((business) => {
                    return (
                      <Fade bottom cascade>
                        <Box
                          key={item.id}
                          sx={{
                            width: 400,
                            height: 280,
                            boxShadow: 3,
                            m: 1,
                            overflow: "hidden",
                            backgroundColor: "#52ab98",
                            borderRadius: 4,
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{ textDecoration: "none", color: "white" }}
                            component={Link}
                            to={`/business/${business.id}`}
                          >
                            {business.businesse_name}
                          </Typography>

                          {business.reviews.length > 0 ? (
                            <Typography variant="h5">
                              <Rating
                                name="read-only"
                                value={business.reviews.reduce((accumulator, object) => {
                                  return accumulator + object.rating / business.reviews.length;
                                }, 0)}
                                readOnly
                                size="small"
                              />
                            </Typography>
                          ) : (
                            <Typography varient="p">No Ratings Yet..</Typography>
                          )}
                          <Typography
                            sx={{ color: "black" }}
                            variant="p"
                            component={Link}
                            to={`/locations/${business.location.location_id}`}
                          >
                            {business.location.location_name}
                          </Typography>
                          <br />
                          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 100 }}>
                            {" "}
                            <Typography
                              variant={business.businesse_description.length > 50 ? "body-2" : "h5"}
                              sx={{ maxHeight: 100, color: "white" }}
                            >
                              {business.businesse_description}
                            </Typography>
                          </Box>
                        </Box>
                      </Fade>
                    );
                  })}

                  <Fade bottom cascade>
                    <Button sx={{ m: 2, backgroundColor: "#66b2b2" }}>
                      <Link to={`/category/${item.category_id}`} style={{ maxHeight: "20px", textDecoration: "none", color: "white" }}>
                        More Businesses
                      </Link>
                    </Button>
                  </Fade>
                </Box>
              </div>
            );
          })
        : "Unauthorized"}
    </div>
  );
};

export default Categories;
