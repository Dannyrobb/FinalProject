import { AppContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, blue } from "@mui/material/colors";
import StoreIcon from "@mui/icons-material/Store";
import Rating from "@mui/material/Rating";
import Fade from "react-reveal/Fade";
import GradeIcon from "@mui/icons-material/Grade";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewReplyDialog from "./ReplyOfReview";
import { Button } from "@mui/material";
const UserPagePersonal = () => {
  const params = useParams();
  const { accessToken } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = yyyy + "/" + mm + "/" + dd;
  console.log(new Date(today));
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    axios
      .get("/getUserById", {
        headers: {
          user_id: params.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        return setUserInfo(res.data);
      })
      .then(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: "70vh", paddingTop: "40px" }}>
      <Box>{loading && <CircularProgress />}</Box>

      {userInfo.length > 0 && (
        <Box>
          <Box sx={{}}>
            <Box
              sx={{
                minHeight: "200px",
                maxWidth: "1400px",
                display: "flex",
                flexDirection: "row",
                marginTop: "40px",
                flexWrap: "wrap",
                justifyContent: "center",
                marginLeft: 3,
                borderRadius: "5px",
              }}
            >
              <Box sx={{ minWidth: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                <Typography variant="h3" sx={{ height: "20px", color: "white", fontWeight: "bold" }}>
                  {userInfo[0].fname} {userInfo[0].lname}
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 4, fontStyle: "italic", color: "white" }}>
                  {`"${userInfo[0].about}"`}
                </Typography>
              </Box>

              {userInfo[0].reviews.length > 0 ? (
                <Box sx={{ minWidth: "300px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <Typography variant="h5" sx={{ color: "white", padding: 3 }}>
                    <Typography
                      variant="h3"
                      sx={{
                        color: "white",

                        transition: "transform .2s",
                        "&:hover": {
                          transform: "scale(1.5)",
                        },
                      }}
                    >
                      <GradeIcon sx={{ fontSize: 50, marginBottom: 1, color: "#73BAB1" }} /> {userInfo[0].reviews.length}
                    </Typography>
                    Contributions
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography>No Reviews So Far...</Typography>
                </Box>
              )}
              <Box sx={{ minWidth: "300px", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 3 }}>
                <Typography variant="h5" sx={{ color: "white" }}>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "white",

                      transition: "transform .2s",
                      "&:hover": {
                        transform: "scale(1.5)",
                      },
                    }}
                  >
                    <CalendarMonthIcon sx={{ fontSize: 50, marginBottom: 1, marginRight: 1, color: "#73BAB1" }} />
                    {Math.round((new Date(today).getTime() - new Date(userInfo[0].joined).getTime()) / (1000 * 3600 * 24))}
                  </Typography>{" "}
                  Days Active
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box></Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", paddingTop: "100px", paddingBottom: "100px" }}>
            {userInfo[0].reviews.length > 0 &&
              userInfo[0].reviews.map((review) => {
                return (
                  <Fade bottom cascade>
                    {" "}
                    <div>
                      <Card
                        sx={{
                          width: 400,
                          height: 280,
                          m: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignContent: "flex-start",
                          alignItems: "flex-start",
                          borderRadius: 10,
                        }}
                      >
                        <CardHeader
                          style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: 400 }}
                          avatar={
                            <Avatar sx={{ bgcolor: "#73BAB1", width: "60px", height: "60px" }} aria-label="recipe">
                              {userInfo[0].fname.charAt(0).toUpperCase()}
                              {userInfo[0].lname.charAt(0).toUpperCase()}
                            </Avatar>
                          }
                          action={
                            review.review_reply ? (
                              <ReviewReplyDialog business_name={review.business.businesse_name} review_reply={review.review_reply} />
                            ) : (
                              <Button variant="contained" disabled sx={{ backgroundColor: "#2b6777 ", height: 20, marginTop: 2 }}>
                                No Reply Yet
                              </Button>
                            )
                          }
                          title={<Typography variant="h5">{review.business.businesse_name}</Typography>}
                          subheader={<Typography>{review.review_date}</Typography>}
                        />
                        <Rating name="read-only" value={review.rating} readOnly size="medium" style={{ marginLeft: 10 }} />

                        <CardContent sx={{ display: "flex", padding: 0, width: 350, paddingLeft: 1 }}>
                          <Box sx={{ minHeight: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant={review.review.length > 50 ? " body-2" : "h5"}>{review.review}</Typography>
                          </Box>
                        </CardContent>
                        <CardActions disableSpacing sx={{ padding: 0 }}>
                          <IconButton sx={{ marginLeft: 2 }} component={Link} to={`/business/${review.business_id}`}>
                            <StoreIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </div>
                  </Fade>
                );
              })}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default UserPagePersonal;
