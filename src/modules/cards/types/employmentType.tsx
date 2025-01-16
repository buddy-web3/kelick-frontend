type EmploymentTypeProps = {
    data: any[];
}
export default function EmploymentType({data}:EmploymentTypeProps) {
    const countFullTime = data.filter((value:any)=>value && value["employment status"]==="Full time").length;
    let employmentTypes = data.reduce((acc: Record<string, number>, value: any) => {
        if (value && value["employment status"]) {
            let displayName = value["employment status"];
            acc[displayName] = (acc[displayName] || 0) + 1;
        }
        return acc;
    }, {});
    employmentTypes = Object.keys(employmentTypes).sort((a, b) => employmentTypes[b] - employmentTypes[a]).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = employmentTypes[key];
        return acc;
    }, {});

    // percentage of all employment types
    const colorIndexes = ["#02B9B0", "#FAC905", "#B774FC", "#B3BEBE", "#B3BEBE", "#B3BEBE", "#B3BEBE"];
    const employmentTypesAsPercentage = Object.keys(employmentTypes).reduce((acc, key,index) => {
        // @ts-ignore
        acc[key] = ((employmentTypes[key] / data.length) * 100).toFixed(2);
        return acc;

    }, {});


    return (
        <div className={"employment-type"}>
            <div className={"divided-header"}>
                <div className={"header-left"}>
                    <span className={"card-title"}>Employment Type</span>
                    <span className={"card-title total"}>{countFullTime}</span>
                    <span className={"card-title total-nationality"}>Full Timers</span>
                </div>
                <div className={"header-right"}>

                </div>
            </div>
            <div className={"progress-bar-linear"}>
                {(Object.keys(employmentTypesAsPercentage).map((key, index) => (
                    <div key={index} className={"progress-bar-item"} style={{
                        background: colorIndexes[index],
                        //@ts-ignore
                        width: Number(employmentTypesAsPercentage[key])+"%",
                        height:'15px',
                    }}></div>
                )))}
            </div>


            <div className={"employment-type nationality-list"}>
                {Object.keys(employmentTypes).map((key, index) => (
                    <div key={index} className={"nationality-item"}>
                        <span className={"nationality-count"}>{employmentTypes[key]}</span>
                        <span className={"nationality-name"}>{key}</span>
                    </div>
                ))}
            </div>

        </div>
    )
}