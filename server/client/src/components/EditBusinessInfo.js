import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
const EditBusinessInfo = (props) => {
  const [updated, setUpdated] = useState();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log(props.title);
  }, [setUpdated]);
  const handleUpdate = (props) => {
    console.log(updated);
    console.log(props.business_id);
    if (props.title == "description") {
      axios
        .put(
          "/updateBusinessInfo",
          {
            businesse_description: updated,
            business_id: props.business_id,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res));
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAndSubmit = () => {
    handleUpdate(props);
    props.setReplied(true);
    setOpen(false);
  };

  return (
    <div>
      {props.title == "description" && (
        <>
          <IconButton onClick={handleClickOpen} style={{ display: "inline" }}>
            <EditIcon />
          </IconButton>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update {props.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>Update your {props.title}</DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Review"
                fullWidth
                multiline
                sx={{ width: 300 }}
                minRows={10}
                variant="standard"
                onChange={(e) => {
                  setUpdated(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => handleCloseAndSubmit()}>Update</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default EditBusinessInfo;
