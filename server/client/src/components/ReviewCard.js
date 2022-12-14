import * as React from "react";
import { styled } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";

import ReviewReplyDialog from "./ReplyOfReview";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";

import StoreIcon from "@mui/icons-material/Store";

import Fade from "react-reveal/Fade";

export default function ReviewCard(props) {
  return (
    <Fade bottom cascade>
      <div style={{ display: "flex", flexDirection: "column", margin: 20 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            {" "}
            <Card sx={{ maxWidth: 420, minWidth: 420, height: 270, m: 1, borderRadius: 9 }}>
              <CardHeader
                avatar={
                  <Avatar
                    component={Link}
                    to={`/userpage/${props.review.user_id}`}
                    sx={{ bgcolor: "#73BAB1", textDecoration: "none" }}
                    aria-label="avatar"
                  >
                    {props.review.user.fname.charAt(0).toUpperCase()}
                    {props.review.user.lname.charAt(0).toUpperCase()}
                  </Avatar>
                }
                action={
                  props.review.review_reply ? (
                    <ReviewReplyDialog business_name={props.review.business.businesse_name} review_reply={props.review.review_reply} />
                  ) : (
                    <Button variant="contained" disabled sx={{ backgroundColor: "#2b6777 " }}>
                      No Reply Yet
                    </Button>
                  )
                }
                title={
                  <Typography variant="h5">
                    <Link style={{ color: "black", textDecoration: "none" }} to={`/business/${props.review.business_id}`}>
                      {props.review.business.businesse_name}
                    </Link>
                  </Typography>
                }
                subheader={<Typography>{props.review.review_date}</Typography>}
              />
              <Rating name="read-only" value={props.review.rating} readOnly size="medium" />

              <CardContent sx={{ display: "flex", padding: 0 }}>
                <Box sx={{ minHeight: 100, display: "flex", paddingLeft: 1 }}>
                  <Typography variant={props.review.review.length > 50 ? "h7" : "h5"}>{props.review.review}</Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-start", padding: 0 }}>
                <IconButton component={Link} to={`/business/${props.review.business_id}`}>
                  <StoreIcon />
                </IconButton>
                <CardContent></CardContent>
              </CardActions>
            </Card>
          </div>
        </Box>
      </div>
    </Fade>
  );
}
