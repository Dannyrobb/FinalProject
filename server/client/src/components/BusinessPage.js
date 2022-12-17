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
import Avatar from "@mui/material/Avatar";
import EmailIcon from "@mui/icons-material/Email";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import ShareBusiness from "./ShareBusiness";
import AccordionTest from "./AccordionTest";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
    <div style={{ minHeight: "70vh", paddingTop: "50px", backgroundColor: "white" }}>
      <Box>{loading === true && <CircularProgress />}</Box>

      {business.length > 0
        ? business[0].map((item) => {
            return (
              <div
                style={{
                  display: "Flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "98vw",

                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Box
                  id="sizeItDown"
                  key={item.id}
                  sx={{
                    marginTop: 2,

                    height: "800px",
                    backgroundColor: "#266377",
                    borderRadius: 9,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignContent: "center",
                    width: "390px",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#5b9799",
                      textDecoration: "none",
                      alignSelf: "center",
                      width: "150px",
                      height: "150px",
                      border: "8px solid #73BAB1",
                      marginTop: 2,
                      display: "Flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h3" fontWeight={"bolder"}>
                      {" "}
                      {new Date().getFullYear() - item.activeSince}
                    </Typography>
                    <Typography fontFamily={"poppins"} fontSize="20px">
                      Years
                    </Typography>
                  </Avatar>
                  <Box id="topCard" style={{ padding: 2 }}>
                    <Typography sx={{ color: "White", paddingBottom: 1 }} variant="h2">
                      {item.businesse_name}
                    </Typography>{" "}
                    <Box id="busDesc" sx={{ width: 386, display: "flex", justifyContent: "center" }}>
                      <Typography color="white " sx={{ width: 299 }}>
                        {item.businesse_description}{" "}
                      </Typography>
                    </Box>
                    {business &&
                      accessToken &&
                      jwt_decode(accessToken).role === "business" &&
                      jwt_decode(accessToken).id === Number(params.id) && (
                        <EditBusinessInfo title="description" business_id={business[0][0].id} setReplied={setClicked} />
                      )}
                    <Button
                      sx={{
                        backgroundColor: "#5abcb1",
                        "&:hover": {
                          backgroundColor: "#5abcb1",
                        },
                        minWidth: 150,
                        maxHeight: 30,
                        marginTop: 2,
                      }}
                    >
                      <LocationOnIcon sx={{ color: "#266377" }} />
                      <Typography
                        variant="body"
                        component={Link}
                        to={`/locations/${item.location.location_id}`}
                        sx={{
                          color: "#266377",
                          textDecoration: "none",
                          "&:hover": {
                            backgroundColor: "#5abcb1",
                            color: "#266377",
                          },
                        }}
                      >
                        {item.location.location_name}
                      </Typography>
                    </Button>
                    {business[1][0].avg !== null && (
                      <Typography variant="h5" sx={{ marginTop: 1 }}>
                        <Rating name="read-only" value={business[1][0].avg.split(".")[0]} readOnly size="small" />
                      </Typography>
                    )}
                  </Box>

                  <Box
                    id="contact"
                    sx={{
                      minHeight: 240,
                      display: "Flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography color="white " sx={{ paddingLeft: 2, fontSize: 24 }}>
                      Let's chat
                    </Typography>
                    <Typography color="white " sx={{ paddingLeft: 2, fontSize: 18 }}>
                      You can contact us for a quote or questions
                    </Typography>
                    <Box sx={{ display: "Flex", justifyContent: "flex-start", flexDirection: "Column", alignItems: "flex-start" }}>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <EmailIcon
                          sx={{ height: 35, width: 35, marginLeft: 2, color: "#73BAB1", backgroundColor: "white", borderRadius: 3 }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: 90,
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography sx={{ paddingTop: 3, paddingLeft: 1, fontSize: 18, color: "#73BAB1" }}>EMAIL ADDRESS</Typography>
                          <Typography sx={{ paddingLeft: 1 }} color="white " variant="p">
                            {item.customer_contact_email}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        id="contactBoxBottom"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <PhoneIcon
                          sx={{ height: 35, width: 35, marginLeft: 2, color: "#73BAB1", backgroundColor: "white", borderRadius: 3 }}
                        />

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: 90,
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography sx={{ paddingTop: 1, paddingLeft: 1, fontSize: 18, color: "#73BAB1" }}>PHONE NUMBER</Typography>
                          <Typography sx={{ paddingLeft: 2 }} color="white " variant="p">
                            {item.customer_contact_phone}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
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

                <Box
                  sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center" }}
                >
                  {Array.isArray(reviews) && reviews.length > 0 && (
                    <Box>
                      <Typography variant="h5" sx={{ color: "White" }}>
                        Sort By:
                      </Typography>

                      <Button
                        variant="outlined"
                        onClick={getReviewsFromLowest}
                        sx={{
                          border: "none",
                          color: "White",
                          bgcolor: "#73BAB1",
                          margin: 2,
                          width: 160,
                          "&:hover": {
                            backgroundColor: "#5abcb1",
                            border: "none",
                          },
                        }}
                      >
                        Lowest Rating
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={getReviewsFromHighest}
                        sx={{
                          border: "none",
                          color: "White",
                          bgcolor: "#73BAB1",
                          margin: 2,
                          width: 160,
                          "&:hover": {
                            backgroundColor: "#5abcb1",
                            border: "none",
                          },
                        }}
                      >
                        Highest Rating
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={get}
                        sx={{
                          border: "none",
                          color: "White",
                          bgcolor: "#73BAB1",
                          margin: 2,
                          width: 160,
                          "&:hover": {
                            backgroundColor: "#5abcb1",
                            border: "none",
                          },
                        }}
                      >
                        Latest Reviews
                      </Button>
                      <ShareBusiness id={params.id} />
                    </Box>
                  )}

                  {Array.isArray(reviews) && reviews.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        maxWidth: "70vw",

                        overflow: "auto",
                        height: "700px",
                      }}
                    >
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
                    <Typography variant="h3" sx={{ width: "70vw", alignSelf: "center", padding: 33 }}>
                      No reviews yet...
                    </Typography>
                  )}
                </Box>
              </div>
            );
          })
        : "loading"}
    </div>
  );
};

export default BusinessPage;
