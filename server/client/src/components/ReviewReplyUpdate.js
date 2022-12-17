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
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import { useState, useEffect } from "react";
const ReviewReplyUpdate = (props) => {
  const [updated, setUpdated] = useState("");

  const [open, setOpen] = useState(false);
  useEffect(() => {}, [setUpdated]);
  const updateReviewReply = (props) => {
    axios
      .put(
        "/updateReviewReply",
        {
          user_id: props.user_id,
          business_id: props.business_id,
          review_reply: updated,
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
    updateReviewReply(props);
    props.setReplied(true);
    setOpen(false);
  };

  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Review reply</DialogTitle>
        <DialogContent>
          <DialogContentText>Update your review reply </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Review"
            variant="standard"
            minRows="7"
            multiline
            fullwidth={true}
            sx={{ width: 300 }}
            inputProps={{ maxLength: 280 }}
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

export default ReviewReplyUpdate;
