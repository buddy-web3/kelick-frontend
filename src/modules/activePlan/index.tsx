import './plan.css'
import WalletIcon from "../../assets/icons/wallet";
export default function ActivePlan(){
    return(
        <div className={"plan-side-card"}>
            <p className={"base plan-title"}>
                <WalletIcon/>
                Free Plan
            </p>
            <p className={"xs"}>
                1/10 Employees
                <br />
                <progress value={1} max={10}/>
            </p>
        </div>
    )
}