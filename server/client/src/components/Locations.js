import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import Box from "@mui/material/Box";

import CircularProgress from "@mui/material/CircularProgress";

const LocationsPage = (props) => {
  const params = useParams();
  const [businesses, setBusinessesByLocation] = useState([]);
  const [reviewsArray, setReviewsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(params.id);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    axios
      .post(
        "/getBusinessesByLocationId",
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
      .then((response) => {
        console.log(response.data);
        setBusinessesByLocation(response.data);
        return response.data;
      })
      .then((data) => {
        console.log(data.reviews);
        return setReviewsArray(data.reviews);
      })
      .then(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: "75vh", maxWidth: "100vw", paddingTop: "60px" }}>
      <Box>{loading == true && <CircularProgress />}</Box>

      {businesses.length > 0 && (
        <Typography variant="h2" sx={{ color: "white", paddingTop: "40px", textDecoration: "underline #52ab98 " }}>
          {businesses[0].location.location_name}
        </Typography>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", paddingTop: "40px" }}>
        {businesses
          ? businesses.map((item) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    width: 400,
                    height: 280,
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
                    <Typography varient="p">No Ratings Yet!...</Typography>
                  )}
                  <Typography sx={{ color: "black" }} variant="p" component={Link} to={`/locations/${item.location.location_id}`}>
                    {item.location.location_name}
                  </Typography>
                  <br />
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 100 }}>
                    {" "}
                    <Typography variant={item.businesse_description.length > 50 ? "body-2" : "h5"} sx={{ maxHeight: 100, color: "white" }}>
                      {item.businesse_description}
                    </Typography>
                  </Box>
                </Box>
              );
            })
          : "loading"}
      </Box>
    </div>
  );
};
export default LocationsPage;
