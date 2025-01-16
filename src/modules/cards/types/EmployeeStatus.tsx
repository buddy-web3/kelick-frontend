import React from "react";
import Chart from "chart.js/auto";

type EmployeeStatusProps = {
    data: any[];
}

export default function EmployeeStatus({data}:EmployeeStatusProps) {
    const activeCount = data.filter((value:any)=>value && value.status==="Active").length;
    let countByStatus = data.reduce((acc: Record<string, number>, value: any) => {
        if (value && value.status) {
            let displayName = value.status;
            acc[displayName] = (acc[displayName] || 0) + 1;
        }
        return acc;
    }, {});


    countByStatus = Object.keys(countByStatus).sort((a, b) => countByStatus[b] - countByStatus[a]).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = countByStatus[key];
        return acc;
    }, {});


    return (
        <div className={"employment-status"}>
            <div className={"divided-header"}>
                <div className={"header-left"}>
                    <span className={"card-title"}>Employment Status</span>
                    <span className={"card-title total"}>{activeCount}</span>
                    <span className={"card-title total-nationality"}>Active Employees</span>
                </div>
                <div className={"header-right"}>

                    <MyChart chartData={Object.values(countByStatus)} labels={Object.keys(countByStatus)} />
                </div>
            </div>

            <div className={"nationality-list"}>
                {Object.keys(countByStatus).slice(0, 3).map((key, index) => (
                    <div key={index} className={"nationality-item"}>
                        <span className={"nationality-count"}>{countByStatus[key]}</span>
                        <span className={"nationality-name"}>{key}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}


interface Props {
    chartData: number[];
    labels: string[];
}

const MyChart = ({ chartData,labels }: Props) => {
    // helper function to format chart data since you do this twice
    const formatData = (data: number[],labels:string[]) => ({
        labels: labels,
        datasets: [{
            data:data,
            borderRadius: 4,
            borderWidth: 14,
            backgroundColor: [
                '#02B9B0',
                '#FAC905',
                '#B774FC',
                '#B3BEBE',
                '#7a8383',
                '#545959',
            ]
        }],
    });

    // use a ref to store the chart instance since it it mutable
    const chartRef = React.useRef<Chart | null>(null);

    // callback creates the chart on the canvas element
    const canvasCallback = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (ctx) {

            if (chartRef.current) {
                chartRef.current.destroy();
            }
            // @ts-ignore
            chartRef.current = new Chart(ctx, {
                type: "doughnut",
                data: formatData(chartData,labels),
                options: { responsive: true,
                    spacing:0,
                    circumference:180,
                    // borderRadius:10,
                    plugins:{
                        tooltip:{
                            enabled:false
                        },
                        legend:{
                            display:false,
                        }
                    }
                }
            });
        }
    };

    // effect to update the chart when props are updated
    React.useEffect(() => {

        // must verify that the chart exists
        if (chartRef.current) {
            // @ts-ignore
            chartRef.current.data = formatData(chartData,labels);
            chartRef.current.update();
        }

        // cleanup function - I had to remove this as it was causing errors
        /*return () => {
          chartRef.current?.destroy();
        };*/
    }, [chartData,labels]);

    return (
        <div className="self-center w-1/2" style={{width:'100px',
            transform:'rotate(-90deg)'}}>
            <div className="overflow-hidden">
                <canvas ref={canvasCallback}></canvas>
            </div>
        </div>
    );
};
