
import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import './table.css'
import SearchIcon from "../../assets/icons/search";

class EmployeesTable extends React.Component <{data: any}> {

    // @ts-ignore
    constructor(props) {
        super(props);
        this.state = {
            originalData: props.data,
            data: props.data,
            columns: [],
            searchInput: "",
            existingRoles: props.data.map((item: { role: any; }) => item.role).filter((value: any, index: any, self: any) => self.indexOf(value) === index),
        };
    }

    componentDidMount() {
        let columns = [
            {
                Header: "Employee ID ↕",
                accessor: "id",
                sortable: true,
                show: true,
                displayValue: "ID"
            },
            {
                Header: "Employee Profile ↕",
                accessor: "description",
                sortable: true,
                show: true,
                displayValue: "Employee Profile"
            },
            {
                Header: "Email ↕",
                accessor: "email",
                sortable: true,
                show: true,
                displayValue: "Email "
            },
            {
                Header: "Role ↕",
                accessor: "role",
                sortable: true,
                show: true,
                displayValue: "Role ",

            },
            {
                Header: "Status ↕",
                accessor: "status",
                sortable: true,
                show: true,
                displayValue: "Status ",
                Cell: (props: { value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
                    let className = 'active';
                    switch (String(props.value).toLowerCase()) {
                        case 'active':
                            className = 'active';
                            break;
                        case 'payroll only':
                            className = 'gray';
                            break;
                        case 'invite sent':
                            className = 'purple';
                            break;
                        default:
                            className = 'active';
                    }
                    return(
                        <div className={["employee-status",className].join(' ')}>
                            <span className={"middot"}>&middot;</span>
                            <span>{props.value}</span>
                        </div>
                    )
                }
            }
        ];
        this.setState({ columns });
    }

    // @ts-ignore
    handleChange = event => {
        this.setState({ searchInput: event.target.value }, () => {
            this.globalSearch();
        });
    };
    // @ts-ignore
    handleFilterStatus = event => {
        // @ts-ignore
        let { originalData } = this.state;
        if(event.target.value === 'all') return this.setState({ data: originalData });

        // @ts-ignore
        let filteredData = originalData.filter(value => {
            return value.status.toLowerCase().includes(event.target.value.toLowerCase());
        });
        this.setState({ data: filteredData });
    }
    // @ts-ignore
    handleFilterRole = event => {
        // @ts-ignore
        let { originalData } = this.state;
        if(event.target.value === 'all') return this.setState({ data: originalData });

        // @ts-ignore
        let filteredData = originalData.filter(value => {
            return value.role.toLowerCase().includes(event.target.value.toLowerCase());
        });
        this.setState({ data: filteredData });
    }

    globalSearch = () => {
        // @ts-ignore
        let { searchInput,originalData } = this.state;
        // @ts-ignore
        let filteredData = originalData.filter(value => {
            return (
                value.email.toLowerCase().includes(searchInput.toLowerCase()) ||
                value.description.toLowerCase().includes(searchInput.toLowerCase()) ||
                value.role.toLowerCase().includes(searchInput.toLowerCase()) ||
                value.status.toLowerCase().includes(searchInput.toLowerCase())
            );
        });
        this.setState({ data: filteredData });
    };

    render() {
        // @ts-ignore
        let { data, columns, searchInput, existingRoles } = this.state;
        // @ts-ignore
        return (
            <div>
                <br />
                <div className={"table-header-title"}>
                    <h2>All Employees</h2>
                    <div className={"table-filters"}>
                        <div className={"search-input-parent"}>
                            <SearchIcon/>
                            <input
                                name="searchInput"
                                value={searchInput || ""}
                                onChange={this.handleChange}
                                placeholder="Search"
                                className={"employees-search-input"}
                            />
                        </div>
                        <select key={"status"} className={"employees-search-select"} onChange={this.handleFilterStatus}>
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="payroll">Payroll Only</option>
                            <option value="invite">Invite Sent</option>
                        </select>
                        <select className={"employees-search-select"} key={"role"} onChange={this.handleFilterRole}>
                            <option value="all">All Role</option>
                            {(existingRoles || []).map((role: any) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>

                    </div>

                </div>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default EmployeesTable;