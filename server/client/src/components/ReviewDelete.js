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
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState, useEffect } from "react";
const ReviewDelete = (props) => {
  const [updated, setUpdated] = useState();
  const [rating, setRating] = useState();

  const [open, setOpen] = useState(false);
  useEffect(() => {}, [props.setReplied]);
  const deleteReview = (props) => {
    console.log("review id sent to server: ", props.review_id);
    axios.delete(`/deleteReviewByReviewId/${props.review_id}`, {}).then((res) => console.log(res));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAndSubmit = () => {
    deleteReview(props);
    props.setReplied(true);
    setOpen(false);
  };

  return (
    <div>
      <IconButton color="error" onClick={handleClickOpen}>
        <DeleteForeverIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Review</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you would like to delete your review? </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleCloseAndSubmit()}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReviewDelete;
