import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Rating } from "@mui/material";
import axios from "axios";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Fade from "react-reveal/Fade";

const Category = (props) => {
  const params = useParams();
  const [businesses, setBusinesses] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    axios
      .post(
        "/buisnessesWithLocationsByCatId",
        {
          businesse_category_id: params.id,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setBusinesses(response.data);
      });

    axios
      .post(
        "/categoryById",
        {
          id: params.id,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => setCategory(response.data));
  }, []);
  return (
    <div style={{ minHeight: "77vh", paddingTop: 50 }}>
      {category ? (
        <Fade big>
          <Typography variant="h2" sx={{ color: "white", paddingTop: "40px", textDecoration: "underline #52ab98 " }}>
            {category[0].category}
          </Typography>
        </Fade>
      ) : (
        <CircularProgress />
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row", paddingTop: 12, justifyContent: "center", alignItems: "center" }}>
        {businesses
          ? businesses.map((item) => {
              return (
                <Fade bottom cascade>
                  <Box
                    key={item.id}
                    sx={{
                      minWidth: "350px",
                      minHeight: "250px",
                      maxWidth: "350px",
                      maxHeight: "200px",
                      boxShadow: 3,
                      m: 3,
                      overflow: "hidden",
                      backgroundColor: "#52ab98",
                      borderRadius: 4,
                    }}
                  >
                    <Typography variant="h5" sx={{ textDecoration: "none", color: "white" }} component={Link} to={`/business/${item.id}`}>
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
                      <Typography varient="p">"No Ratings Yet..."</Typography>
                    )}
                    <Typography sx={{ color: "black" }} varient="p" component={Link} to={`/locations/${item.location.location_id}`}>
                      {item.location.location_name}
                    </Typography>
                    <Typography varient="p" sx={{ color: "white" }}>
                      {item.businesse_description}
                    </Typography>
                  </Box>
                </Fade>
              );
            })
          : "loading"}
      </Box>
    </div>
  );
};
export default Category;
