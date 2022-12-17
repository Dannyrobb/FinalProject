import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  VKShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  VKIcon,
  WhatsappIcon,
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
} from "react-share";

import ShareIcon from "@mui/icons-material/Share";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ShareBusiness(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "inline" }}>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <ShareIcon style={{ color: "#73BAB1" }} />
      </IconButton>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} sx={{ width: "auto" }}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Share Business
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ width: 500, display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
          <RedditShareButton sx={{ m: 1 }} onClick={handleClose} url={`https://shareit.herokuapp.com/business/${props.id}`}>
            <RedditIcon size={40} />
          </RedditShareButton>
          <FacebookShareButton sx={{ m: 1 }} onClick={handleClose} url={`https://shareit.herokuapp.com/business/${props.id}`}>
            <FacebookIcon size={40} />
          </FacebookShareButton>

          <LinkedinShareButton sx={{ m: 1 }} onClick={handleClose} url={`https://shareit.herokuapp.com/business/${props.id}`}>
            <LinkedinIcon size={40} />
          </LinkedinShareButton>
          <WhatsappShareButton sx={{ m: 1 }} onClick={handleClose} url={`https://shareit.herokuapp.com/${props.id}`}>
            <WhatsappIcon size={40} />
          </WhatsappShareButton>
          <TelegramShareButton sx={{ m: 1 }} onClick={handleClose} url={`https://shareit.herokuapp.com/${props.id}`}>
            <TelegramIcon size={40} />
          </TelegramShareButton>

          <VKShareButton sx={{ m: 1 }} onClick={handleClose} url={`https://shareit.herokuapp.com/business/${props.id}`}>
            <VKIcon size={40} />
          </VKShareButton>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
