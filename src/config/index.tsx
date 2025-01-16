import EmployeesIcon from "../assets/icons/employees";
import PayrollIcon from "../assets/icons/payroll";
import LeavesIcon from "../assets/icons/leaves";
import ClaimsIcon from "../assets/icons/claims";
import OrganizationIcon from "../assets/icons/organization";
import React from "react";

export const menu_items = [
    { name: "Organization", url: "", collabsible: true },
    { name: "Manage", url: "", collabsible: false },
];

export const sub_menu_items = [
    {parent: "Manage", name: "Employees", url: "employees", icon: <EmployeesIcon />},
    {parent: "Manage", name: "Payroll", url: "payroll", icon: <PayrollIcon/>},
    {parent: "Manage", name: "Leaves", url: "leaves", icon: <LeavesIcon/>},
    {parent: "Manage", name: "Claims", url: "claims", icon: <ClaimsIcon/>},
    {parent: "Manage", name: "Reports", url: "reports", icon: <ClaimsIcon/>},
    {parent: "Manage", name: "Settings", url: "settings", icon: <ClaimsIcon/>},

    {parent: "Organization", name: "Kelick", url: "kelick", icon: <OrganizationIcon/>},
];