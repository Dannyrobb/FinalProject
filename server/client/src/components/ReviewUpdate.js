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
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
const ReviewUpdate = (props) => {
  const [updated, setUpdated] = useState("");
  const [rating, setRating] = useState();

  const [open, setOpen] = useState(false);
  useEffect(() => {}, [setUpdated]);
  const updateReview = (props) => {
    axios
      .put(
        "/updateReviewByReviewId",
        {
          user_id: props.user_id,
          business_id: props.business_id,
          review: updated,
          rating: rating,
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
    updateReview(props);
    props.setReplied(true);
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Review</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", width: 500 }}>
          <DialogContentText>Update your review </DialogContentText>
          <Typography component="legend">Rating</Typography>
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
            minRows="7"
            multiline
            fullwidth={true}
            inputProps={{ maxLength: 280 }}
            variant="standard"
            onChange={(e) => {
              setUpdated(e.target.value);
            }}
          />
          <Typography>{updated.length}/280</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleCloseAndSubmit()}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReviewUpdate;
