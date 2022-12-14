import { useState, useEffect, useContext, useCallback, createContext } from "react";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import axios from "axios";
import ReviewBox from "./ReviewBox";
import { AppContext } from "../App";
import jwt_decode from "jwt-decode";
import ReviewCards from "./ReviewCards";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import EditBusinessInfo from "./EditBusinessInfo";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import ShareBusiness from "./ShareBusiness";
import AccordionTest from "./AccordionTest";
import { bgcolor } from "@mui/system";
export const Filtered = createContext(false);
const BusinessPage = (props) => {
  const params = useParams();
  const [business, setBusiness] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [reviewedState, setReviewedState] = useState([]);
  const [reviews, setReviews] = useState();
  const { accessToken } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const get = useCallback(async () => {
    const data = await axios.get(
      "/buisnessWithLocationAndReviews",

      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          header: params.id,
        },
      }
    );
    // const data = res;
    console.log(data);
    console.log(data.data);
    setBusiness(data.data);
    setReviews(data.data[0][0].reviews);
    setLoading(false);
  }, [clicked, setClicked]);

  const getReviewsFromLowest = async () => {
    const data = await axios.get("/reviewsLowestToHighest", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        header: params.id,
      },
    });
    setReviews(data.data);
  };

  const getReviewsFromHighest = async () => {
    const data = await axios.get("/reviewsHighestToLowest", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        header: params.id,
      },
    });
    setReviews(data.data);
  };

  const checkReviewState = useCallback(async () => {
    axios
      .get("/checkIfReviewed", {
        headers: {
          business_id: params.id,
          user_id: jwt_decode(accessToken).id,
        },
      })
      .then((response) => {
        return setReviewedState(response.data);
      });
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setClicked(false);
    // getInfo();

    get().catch((err) => {
      console.log(err);
      setLoading(false);
    });

    if (accessToken) {
      checkReviewState();
    }
  }, [get, clicked, setClicked]);
  return (
    <div style={{ minHeight: "70vh", paddingTop: "50px" }}>
      <Box>{loading === true && <CircularProgress />}</Box>
      <div>
        {business.length > 0
          ? business[0].map((item) => {
              return (
                <div>
                  <Box
                    key={item.id}
                    sx={{
                      maxWidth: "90vw",
                      minHeight: 200,
                      margin: 6,
                      borderRadius: 9,
                      display: "flex",
                      border: "1px solid white",
                      flexWrap: "wrap",
                    }}
                  >
                    <Box>
                      <Typography sx={{ color: "White" }} variant="h2">
                        {item.businesse_name}
                      </Typography>
                      <Typography color="white" variant="h6">
                        located in
                      </Typography>
                      <Typography
                        variant="h2"
                        component={Link}
                        to={`/locations/${item.location.location_id}`}
                        sx={{ color: "white", textDecoration: "none" }}
                      >
                        {item.location.location_name}
                      </Typography>
                    </Box>

                    <ShareBusiness id={params.id} />

                    <Box id="contact">
                      <Typography variant="h4">Lets chat !</Typography>
                      <Typography>You can contact us for a quote or questions!</Typography>
                      <Typography variant="p">Email: {item.customer_contact_email}</Typography>
                      <br />
                      <Typography variant="p">Phone Number: {item.customer_contact_phone}</Typography>
                    </Box>
                    <Stack>
                      <Typography>{item.businesse_description}</Typography>
                      {business &&
                        accessToken &&
                        jwt_decode(accessToken).role === "business" &&
                        jwt_decode(accessToken).id === Number(params.id) && (
                          <EditBusinessInfo title="description" business_id={business[0][0].id} setReplied={setClicked} />
                        )}
                    </Stack>
                  </Box>

                  <div>
                    {business && accessToken && jwt_decode(accessToken).role === "user" && reviewedState.length <= 0 && (
                      <ReviewBox
                        business_id={business[0][0].id}
                        user_id={jwt_decode(accessToken).id}
                        setSomething={setClicked}
                        businesse_name={business[0][0].businesse_name}
                      />
                    )}
                  </div>

                  <Box>
                    <Box
                      sx={{
                        border: "1px solid",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
                      {" "}
                      {business[1][0].avg !== null && (
                        <Typography variant="h5">
                          <Rating name="read-only" value={business[1][0].avg.split(".")[0]} readOnly size="large" />
                        </Typography>
                      )}
                    </Box>
                    {Array.isArray(reviews) && reviews.length > 0 && (
                      <Box>
                        <Typography variant="h5" sx={{ color: "White" }}>
                          Sort By:
                        </Typography>
                        <Button variant="outlined" onClick={getReviewsFromLowest} sx={{ color: "White", bgcolor: "#73BAB1", margin: 2 }}>
                          Lowest Rating
                        </Button>
                        <Button variant="outlined" onClick={getReviewsFromHighest} sx={{ color: "White", bgcolor: "#73BAB1", margin: 2 }}>
                          Highest Rating
                        </Button>
                        <Button variant="outlined" onClick={get} sx={{ color: "White", bgcolor: "#73BAB1", margin: 2 }}>
                          Newest
                        </Button>
                      </Box>
                    )}

                    {Array.isArray(reviews) && reviews.length > 0 ? (
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        {
                          <ReviewCards
                            accessToken={accessToken}
                            business_id={params.id}
                            setSomething={setClicked}
                            reviews={reviews}
                            business_name={item.businesse_name}
                          />
                        }
                      </div>
                    ) : (
                      <Typography>No reviews yet...</Typography>
                    )}
                  </Box>
                </div>
              );
            })
          : "loading"}
      </div>
    </div>
  );
};

export default BusinessPage;
