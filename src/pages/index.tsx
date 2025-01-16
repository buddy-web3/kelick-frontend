import Employees from "./employees/employees";
import './pages.css';
type PageProps = {
    activePage?: string
}
export default function Page(props: PageProps) {
    switch (props.activePage) {
        case "employees":
            return <Employees />
        default:
            return (<>Page under construction</>)
    }
}