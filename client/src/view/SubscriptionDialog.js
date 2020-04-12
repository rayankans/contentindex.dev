import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { handlePushToggle } from '../storage/push_manager.js';

export default function AlertDialog(props) {
  return (
    <div>
    <Dialog
      open={props.activated}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.notifOn
          ? "Unsubscribe from Sad Chonks"
          : "Subscribe to Sad Chonks"}
      </DialogTitle>
      <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {props.notifOn
          ? "Stop receiving daily sad chonk updates to press F over."
          : "Let Sad Chonks send you a daily notification with a new sad chonk to press F for."}
      </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={() => props.hide()} color="primary" variant="outlined">
          Disagree
      </Button>
      <Button
        onClick={async () =>{
          await handlePushToggle(props.notifOn, props.setNotifOn);
          props.hide();
        }}
        color="primary" autoFocus variant="contained">
          Agree
      </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}