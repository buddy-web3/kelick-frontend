import React from "react";
import ChevronDown from "../../assets/icons/chevron-down";
import "./menu.css";
import DashboardIcon from "../../assets/icons/dashboard";
import DotsIcon from "../../assets/icons/3dots";
import {menu_items, sub_menu_items} from "../../config";



type MenuProps = {
    activePage?: string
}
function Menu(props: MenuProps) {
    return (
        <div>
            <ul>
                <li className={["side-menu-sub","dashboard"===props.activePage?"active":""].join(' ')}>
                    <a href={"/"} className={["dashboard"===props.activePage?"active":"", 'base'].join(' ')}>
                        <DashboardIcon />
                        Dashboard
                    </a>
                </li>
                {menu_items.map((item) => (
                    <li key={item.name}>
                        <MenuItem item={item} submenu={sub_menu_items.filter(subitem => subitem.parent === item.name)} collapsible={item.collabsible} activePage={props.activePage} />
                    </li>
                ))}
            </ul>
        </div>
    );
}


type MenuItemProps = {
    item: { name: string, url: string },
    submenu: { name: string, url: string, icon:JSX.Element }[],
    collapsible: boolean
    activePage?: string
}

function MenuItem(props:MenuItemProps) {
    const [open, setOpen] = React.useState(true);
    const displayCount=3;
    const [displayingAll, setDisplayingAll] = React.useState(3 > props.submenu.length);
    const handleClick = () => {
        setOpen(!open);
    }
    const displayAll = () => {
        setDisplayingAll(!displayingAll);
    }

    return (
        <div className={"side-menu-item"}>
            <div className={"side-menu"}>
                <span >{props.item.name}</span>
                {props.collapsible &&
                    (
                        <div onClick={handleClick} className={"icon"}>

                            {!open && <ChevronDown  rotate={true}/>}
                            {open && <ChevronDown   />}
                        </div>
                    )
                }
            </div>

            {open && (
                <ul>
                    {
                        props.submenu.slice(0, displayCount).map((item) => (
                        <li key={item.name} className={["side-menu-sub", item.url===props.activePage?"active":""].join(' ')}>
                            <a href={item.url} className={item.url===props.activePage?"active":""}>
                                {item.icon}
                                {item.name}</a>
                        </li>
                    ))}

                    {/*<div className={[ displayingAll?"": 'side-menu-hidden'].join(' ')}>*/}
                    {props.submenu.slice( displayCount).map((item) => (
                        <li key={item.name} className={["side-menu-sub", "extra", displayingAll?"":"hidden",item.url===props.activePage?"active":""].join(' ')}>
                                <a href={item.url} className={item.url===props.activePage?"active":""}>
                                    {item.icon}
                                    {item.name}</a>
                        </li>))}
                    {/*</div>*/}

                    {props.submenu.length>3 &&  !displayingAll && <li onClick={displayAll} className={"side-menu-sub"}>
                        <span>
                            <DotsIcon/>
                            More</span>
                    </li>}
                    {props.submenu.length>3 && displayingAll && <li onClick={displayAll} className={"side-menu-sub"}>
                        <span>
                            <DotsIcon/>
                            Less</span>
                    </li>}
                </ul>
            )}
        </div>
    );
}


export default Menu;