import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import jwt_decode from "jwt-decode";
import Box from "@mui/material/Box";
import ReviewBox from "./ReviewBox";
import ReviewReply from "./ReviewReply";
import ReviewUpdate from "./ReviewUpdate";
import { Filtered } from "./BusinessPage";
import ReviewDelete from "./ReviewDelete";
import ReviewReplyUpdate from "./ReviewReplyUpdate";
const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
const filterReviewsFromHighest = (a, b) => {
  if (a.rating < b.rating) {
    return 1;
  }
  if (a.rating > b.rating) {
    return -1;
  }
  return 0;
};

const filterReviewsFromLowest = (a, b) => {
  if (a.rating < b.rating) {
    return -1;
  }
  if (a.rating > b.rating) {
    return 1;
  }
  return 0;
};
const AccordionTest = (props) => {
  const [expanded, setExpanded] = React.useState("panel1");
  const [clicked, setClicked] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div>
      {props.review.map((review, i) => {
        return (
          <Accordion expanded={expanded === `panel${i + 1}`} onChange={handleChange(`panel${i + 1}`)} sx={{ margin: "4px" }}>
            <AccordionSummary aria-controls={`panel${i + 1}d-content`} id={`panel${i + 1}d-header`}>
              <Typography
                variant="h5"
                component={Link}
                to={`/userpage/${review.user_id}`}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                {review.user.fname} {review.user.lname}
                <Rating name="read-only" value={review.rating} readOnly size="small" sx={{ alignSelf: "" }} />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ height: "auto", wordWrap: "break-word" }}>
                {review.review}
                <br></br> ~ {review.review_date}
              </Typography>
              {review.review_reply && (
                <Box
                  sx={{
                    border: "1px solid black",
                    "&:hover": {
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  <Typography variant="h7">Reply from the business: </Typography>
                  <Typography variant="subtitle1"> {review.review_reply}</Typography>
                </Box>
              )}
              {props.accessToken &&
                jwt_decode(props.accessToken).role === "business" &&
                jwt_decode(props.accessToken).id == props.business_id &&
                !review.review_reply && (
                  <ReviewReply user_id={review.user_id} business_id={props.business_id} setReplied={props.setSomething} />
                )}
              {props.accessToken &&
                jwt_decode(props.accessToken).role === "business" &&
                jwt_decode(props.accessToken).id == props.business_id &&
                review.review_reply && (
                  <ReviewReplyUpdate user_id={review.user_id} business_id={props.business_id} setReplied={props.setSomething} />
                )}
              {props.accessToken && jwt_decode(props.accessToken).role === "user" && jwt_decode(props.accessToken).id == review.user_id && (
                <>
                  <ReviewUpdate user_id={review.user_id} business_id={props.business_id} setReplied={props.setSomething} />
                  <ReviewDelete setReplied={props.setSomething} review_id={review.review_id} />
                </>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default AccordionTest;
