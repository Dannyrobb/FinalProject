import { useContext, useState, useEffect, useRef } from "react";
// import { SearchContext } from "../App";
import { AppContext } from "../App";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Rating } from "@mui/material";
import { Box } from "@mui/material";
import Fade from "react-reveal/Fade";

import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [loadState, setLoadState] = useState(false);
  const [message, setMessage] = useState([]);

  const params = useParams();
  const { searchQueryGlobal, setSearchQueryGlobal } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setLoadState(true);
    search();
  }, [params.search, params.locationId]);
  const search = async () => {
    setMessage("");
    // setSearchQueryGlobal("");
    if (params.locationId === undefined) {
      axios
        .post(
          `/getBusinessesBySearch`,
          {
            search: params.search,
          },

          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.length < 1) {
            console.log(response.data);
            setResults(response.data);
            setLoadState(false);

            return setMessage("Businesses not found. Please try changing your search query!");
          } else {
            console.log(response.data);

            setLoadState(false);
            return setResults(response.data);
          }
        });
    } else {
      axios
        .post(
          `/getBusinessesBySearchAndLocationId`,
          {
            search: params.search,
            location: params.locationId,
          },

          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.length < 1) {
            console.log(response.data);

            setResults(response.data);
            setLoadState(false);

            return setMessage("Businesses not found. Please try changing your search query!");
          } else {
            console.log(response.data);

            setLoadState(false);
            return setResults(response.data);
          }
        });
    }
  };

  return (
    <div style={{ minHeight: "65vh", paddingTop: "40px" }}>
      <Fade big>
        <Typography variant="h2" sx={{ color: "white", paddingTop: "40px" }}>
          Searching {results && ` '${params.search}'`}
        </Typography>
      </Fade>
      <Box>{loadState == true && <CircularProgress />}</Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center" }}>
        {results.length > 0 &&
          results.map((item) => {
            return (
              <Fade bottom cascade>
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
                    <Typography varient="p">No Ratings Yet..</Typography>
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
              </Fade>
            );
          })}
      </Box>

      {/* {results.length < 1 && <Typography>No results at this time</Typography>} */}
      {<Typography variant="h6">{message}</Typography>}
    </div>
  );
};
export default SearchPage;
