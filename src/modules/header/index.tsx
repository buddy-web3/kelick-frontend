import './header.css'
import { sub_menu_items } from "../../config";
import PersonIcon from "../../assets/icons/person";
import React from "react";
import Modal from "react-modal";
import UploadModal from "../upload";
type HeaderProps = {
    activePage?: string
}
 const Header = (props: HeaderProps) => {
     const [modalIsOpen, setIsOpen] = React.useState(false);

     const openModal = ()=> {
         setIsOpen(true);
     }

     const closeModal = () => {
         setIsOpen(false);
     }
    const activePageName = sub_menu_items.filter(subitem => subitem.url === props.activePage)[0].name;
    return (
        <div className="header">
            <h1 className={"page-title"}>{activePageName}</h1>
            {props.activePage ==='employees' && localStorage.getItem('employees-data') !== null && (
                <div className="banner-actions">
                    <button className="button main" onClick={openModal}>
                        <PersonIcon/>
                        Add Employee
                    </button>
                </div>
            )}

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
export default Header;