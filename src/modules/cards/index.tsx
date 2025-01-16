import NationalityCard from "./types/nationality";
import EmploymentType from "./types/employmentType";
import EmployeeStatus from "./types/EmployeeStatus";
import "./cards.css";
type CardsProps = {
    cardType: string;
    data: any[];
}
export default function Cards({cardType,data}:CardsProps) {

    return (
        <div className={["card-parent", cardType==="employment-type"?"employment-type":""].join(' ')}>
            {cardType==="nationalities"&& <NationalityCard data={data}/>}
            {cardType==="employment-type"&& <EmploymentType data={data}/>}
            {cardType==="employee-status"&& <EmployeeStatus data={data}/>}
        </div>
    )
}