import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
const ReviewBox = (props) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {}, []);

  const submitReview = (props) => {
    axios
      .post(
        "/insertReviewByBusinessId",
        {
          rating: rating,
          user_id: props.user_id,
          business_id: props.business_id,
          review: review,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAndSubmit = () => {
    submitReview(props);
    props.setSomething(true);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Review this business
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Review Business</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.businesse_name}</DialogContentText>
          <Typography component="legend" variant="subtitle1">
            Rating:
          </Typography>

          <Rating
            name="simple-controlled"
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Review"
            fullWidth
            variant="standard"
            minRows="7"
            multiline
            fullwidth={true}
            inputProps={{ maxLength: 280 }}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
          <Typography>{`${review.length}/280`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleCloseAndSubmit()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReviewBox;
