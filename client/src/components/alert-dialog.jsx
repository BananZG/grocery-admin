import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

class AlertDialog extends React.Component {
    handleClose = (action) => {
        this.props.hideCallback(false); 
        if (action != null) action();
    };

    render() {
        const { title, message, button1Text, button1Color, button1Action, button2Text, button2Color, button2Action } = this.props;
        return (
            <div>
                <Dialog
                    open
                    onClose={() => { this.handleClose(null);}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={() => { this.handleClose(button1Action) }} color={button1Color ? button1Color : "secondary"}>
                            {button1Text ? button1Text : "Cancel"}
                        </Button>
                        <Button variant="outlined" onClick={() => { this.handleClose(button2Action) }} color={button2Color ? button2Color : "primary"} autoFocus>
                            {button2Text ? button2Text : "OK"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AlertDialog.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    hideCallback: PropTypes.func.isRequired,
};

export default AlertDialog;
