import '../upload/modal.css';
import React from "react";
import ConfirmIcon from "../../assets/icons/confirm";
import ConfettiExplosion from 'react-confetti-explosion';
type ConfirmModalProps = {
    closeModal: () => void
}
export default function ModalConfirm(props: ConfirmModalProps) {

    return (
        <>
            <div className="modal">
                <div className="modal-content confirm">

                    <ConfettiExplosion />
                        <ConfirmIcon/>

                    <p className={"xl modal-confirm"}>Congrats! You've successfully added all your employees!</p>
                    <p className={"lg modal-confirm"}>Would you like to generate payroll ?</p>
                    <div className={"banner-actions modal-buttons confirm"}>
                        <button onClick={props.closeModal} className={"button"}>I'll do it later</button>
                        <button className={"button main"}>Generate Payroll</button>

                    </div>
                </div>
            </div>
        </>
    )
}