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

const ReviewReply = (props) => {
  const [reply, setReply] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {}, []);
  // NEED TO WORK ONTHIS
  const replyToReview = (props) => {
    axios
      .put(
        "/insertReviewReplyByBusinessId",
        {
          user_id: props.user_id,
          business_id: props.business_id,
          review: reply,
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
    replyToReview(props);
    props.setReplied(true);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ marginTop: 2 }}>
        Reply to this review
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reply</DialogTitle>
        <DialogContent>
          <DialogContentText>Reply to review </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Review"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setReply(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleCloseAndSubmit()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReviewReply;
