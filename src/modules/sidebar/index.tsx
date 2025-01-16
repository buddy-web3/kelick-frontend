import Menu from "../menu";
import "./sidebar.css";
import ActivePlan from "../activePlan";
import UserNotification from "../userNotification";

type SidebarProps = {
    activePage?: string
}

export default function Sidebar(props: SidebarProps) {
    return (
        <div className="sidebar">
            <div>
                <img src="images/Kelick_Logo.png" alt="Kelick_Logo" className={"logo"} />
                <Menu activePage={props.activePage} />
            </div>
            <div>
                <ActivePlan/>
                <UserNotification/>
            </div>
        </div>
    );
}