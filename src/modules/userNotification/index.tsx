import './user.css';
import NotificationIcon from "../../assets/icons/notification";
import React from "react";

export default function UserNotification(){
    return(
        <div className={"plan-side-card"}>
            <p className={"base plan-title"}>
                <NotificationIcon/>
                Notifications
                <span className={"middot notifications"}>&middot;</span>
            </p>
            <div>
                <p className={"xs"}>
                    John Doe
                </p>
                <p className={"xs"}>
                    johndoe@asure.pro
                </p>
            </div>
        </div>
    )
}