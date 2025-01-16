import React from "react";

import EmployeesTable from "../../modules/table";
import "./employees.css";
import BannerUploadFirstBatch from "./banner";
import Cards from "../../modules/cards";
import Modal from "react-modal";
import ModalConfirm from "../../modules/modalConfirm";

export default function Employees() {

    const [showInitialBanner, setShowInitialBanner] = React.useState(true);

    React.useEffect(() => {
        if(localStorage.getItem('employees-data') !== null) {
            setShowInitialBanner(false);
        }
    }, []);

    return (
        <div className={"page"}>
            {showInitialBanner&& <BannerUploadFirstBatch/>}
            {!showInitialBanner&& <EmployeesData/>}
        </div>
    );
}

const EmployeesData = () => {
    const [modalIsOpen, setIsOpen] = React.useState(localStorage.getItem('upload-success') === 'true');


    const closeModal = () => {
        setIsOpen(false);
        localStorage.removeItem('upload-success')
    }

    const employeesData= JSON.parse(localStorage.getItem('employees-data')!)
    return (
        <div>
            <div className={"all-cards"}>
                <Cards cardType={"nationalities"} data={employeesData}/>
                <Cards cardType={"employment-type"} data={employeesData}/>
                <Cards cardType={"employee-status"} data={employeesData}/>
            </div>
            <EmployeesTable data={employeesData}/>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName={"banner-modal-overlay"}
                className={"banner-modal confirm"}
                contentLabel="Example Modal"
            >
                <ModalConfirm closeModal={closeModal}/>
            </Modal>
        </div>
    );
}
