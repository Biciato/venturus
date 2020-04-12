import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function UserDialog(props) {
    // send button clicked message to parent component
    const handleAccept = accepted => {
        props.onAccept(accepted)
    };
    return (
        <div>
            <Dialog
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Warning !!!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want delete this user ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleAccept(false)} color="primary">
                        No
                    </Button>
                    <Button onClick={() => handleAccept(true)} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
