import React, { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton, Slide } from '@mui/material';
import DeleteIcon from "@material-ui/icons/Delete";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = ({ item, onClick }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickAgree = () => {
        onClick(item);
        handleClose();
    };

    return (
        <Box>
            <IconButton
                aria-label="delete"
                onClick={handleClickOpen}
                color='error'
            >
                <DeleteIcon />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="dialog-confirm"
            >
                <DialogTitle id="dialog-confirm-id">
                    {"Bạn muốn xóa tính năng này?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-confirm-content">
                        {item.title}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleClickAgree}
                        style={{ color: 'white', maxWidth: 120, minWidth: 120 }}>
                        Đồng ý
                    </Button>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={handleClose} 
                        autoFocus
                        style={{ maxWidth: 120, minWidth: 120 }}
                    >
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default CustomDialog;