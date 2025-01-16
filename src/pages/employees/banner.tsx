import React from "react";
import Modal from 'react-modal';
import FilesIcon from "../../assets/icons/files";
import PersonIcon from "../../assets/icons/person";
import UploadModal from "../../modules/upload";

export default function BannerUploadFirstBatch() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const addEmployee = () => {
        alert('Manual add coming soon, give Bulk Upload a try!')
    }
    const openModal = ()=> {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }
    return (
        <div className="banner">
            <img src={"images/employees.png"} alt={"employees_banner"} className={"banner-image"} />
            <h1>Start building your team</h1>
            <p>Add your first team member or import your entire team</p>
            <div className={"banner-actions"}>
                <button className={"button"} onClick={openModal}><FilesIcon/> Bulk Upload</button>
                <button className={"button main"} onClick={addEmployee}><PersonIcon/> Add Employee</button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName={"banner-modal-overlay"}
                className={"banner-modal"}
                contentLabel="Example Modal"
            >
                <UploadModal closeModal={closeModal}/>
            </Modal>
        </div>
    );
}