import Modal from "@mui/material/Modal";
import LogOut from "../pop_ups/LogOut";
import Account from "../pop_ups/Account";
import React from "react";
import { hide_modal } from "../../../store/modal_slide";
import { useSelector, useDispatch } from "react-redux";
const CModal = () => {
  const dispatch = useDispatch();
  const {
    show,
    toShow: { log_out, setting, filter },
  } = useSelector((state) => state.modal);
  return (
    <Modal
      className="h-full w-full grid place-items-center bg-[#00000074]"
      disableAutoFocus={true}
      open={show}
      onClose={() => {
        dispatch(hide_modal());
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <span
          className="absolute top-[10px] right-[10px] p-[7px]  text-bgrey bg-[#FFF] font-semibold cursor-pointer rounded-lg"
          onClick={() => dispatch(hide_modal())}
        >
          X
        </span>
        {log_out ? <LogOut /> : setting ? <Account /> : dispatch(hide_modal())}
      </>
    </Modal>
  );
};

export default CModal;
