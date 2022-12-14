import * as React from "react";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import Fade from "react-reveal/Fade";

import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import jwt_decode from "jwt-decode";
import Box from "@mui/material/Box";
import ReviewReply from "./ReviewReply";
import ReviewUpdate from "./ReviewUpdate";
import ReviewDelete from "./ReviewDelete";
import ReviewReplyUpdate from "./ReviewReplyUpdate";
import ReviewReplyDialog from "./ReplyOfReview";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";

export default function ReviewCards(props) {
  const [clicked, setClicked] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);

  const a = props.reviews;

  React.useEffect(() => {
    setReviews(props.reviews);
  }, [clicked, props.reviews]);

  return (
    <div style={{ width: "100vw", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {a.length > 0 &&
          a.map((review) => {
            return (
              <Fade bottom cascade>
                {" "}
                <Card
                  sx={{
                    width: 400,
                    height: 260,
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
                    style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: 400, padding: 10 }}
                    avatar={
                      <Avatar sx={{ m: 1, bgcolor: "#73BAB1", width: "60px", height: "60px" }} aria-label="recipe">
                        {review.user.fname.charAt(0).toUpperCase()}
                        {review.user.lname.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    action={
                      review.review_reply ? (
                        <ReviewReplyDialog business_name={props.business_name} review_reply={review.review_reply} />
                      ) : (
                        <Button variant="contained" disabled sx={{ backgroundColor: "#2b6777 ", marginTop: 2 }}>
                          No Reply Yet
                        </Button>
                      )
                    }
                    title={
                      <Typography variant="h5">
                        <Link to={`/userpage/${review.user_id}`} style={{ textDecoration: "none", color: "black" }}>
                          {`${review.user.fname} ${review.user.lname}`}
                        </Link>
                      </Typography>
                    }
                    subheader={<Typography>{review.review_date}</Typography>}
                  />
                  <Rating name="read-only" value={review.rating} readOnly size="medium" sx={{ marginLeft: 3 }} />

                  <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ minHeight: 60, display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Typography variant={review.review.length > 50 ? " body-1" : "h5"} sx={{ textAlign: "center" }}>
                        {review.review}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                    {props.accessToken &&
                      jwt_decode(props.accessToken).role === "business" &&
                      jwt_decode(props.accessToken).id == props.business_id &&
                      review.review_reply && (
                        <ReviewReplyUpdate user_id={review.user_id} business_id={props.business_id} setReplied={props.setSomething} />
                      )}

                    {props.accessToken &&
                      jwt_decode(props.accessToken).role === "business" &&
                      jwt_decode(props.accessToken).id == props.business_id &&
                      !review.review_reply && (
                        <ReviewReply user_id={review.user_id} business_id={props.business_id} setReplied={props.setSomething} />
                      )}

                    {props.accessToken &&
                      jwt_decode(props.accessToken).role === "user" &&
                      jwt_decode(props.accessToken).id == review.user_id && (
                        <>
                          <ReviewUpdate user_id={review.user_id} business_id={props.business_id} setReplied={props.setSomething} />
                          <ReviewDelete setReplied={props.setSomething} review_id={review.review_id} />
                        </>
                      )}
                  </CardActions>
                </Card>
              </Fade>
            );
          })}
      </Box>
    </div>
  );
}
