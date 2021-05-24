import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import OutsideClickHandler from "react-outside-click-handler";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({
  title,
  message,
  ok,
  cancel,
  status,
  onConfirmModal,
  onCloseModal,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  if (open !== status) {
    setOpen(status);
  }

  const handleClose = () => {
    onCloseModal();
  };

  return (
    <div>
      <OutsideClickHandler onOutsideClick={() => handleClose()}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div style={{ display: "block" }} className="modal">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        {title}
                      </h5>
                      <button
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">{message}</div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        {cancel}
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => onConfirmModal()}
                      >
                        {ok}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </OutsideClickHandler>
    </div>
  );
}
