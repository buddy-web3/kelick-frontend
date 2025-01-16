import Chart from "chart.js/auto";
import React from "react";

type NationalityCardProps = {
    data: any[];
}

export default function NationalityCard({data}:NationalityCardProps) {
    const totalSingapore = data.filter((value:any)=>value && value.nationality==="Singapore").length;
    let totalNationalities = data.reduce((acc: Record<string, number>, value: any) => {
        if (value && value.nationality) {
            let displayName = value.nationality;
            if(displayName === "Permanent Resident") {
                displayName = "PR";
            }
            acc[displayName] = (acc[displayName] || 0) + 1;
        }
        return acc;
    }, {});
    totalNationalities = Object.keys(totalNationalities).sort((a, b) => totalNationalities[b] - totalNationalities[a]).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = totalNationalities[key];
        return acc;
    }, {});


    // count of all nationalities
    const totalNationalitiesRemainingCount = Object.keys(totalNationalities).slice(3).reduce((acc, key) => acc + totalNationalities[key], 0);

    return (

        <div className={"nationality-card"}>
            <div className={"divided-header"}>
                <div className={"header-left"}>
                    <span className={"card-title"}>Nationality</span>
                    <span className={"card-title total"}>{totalSingapore}</span>
                    <span className={"card-title total-nationality"}>Singaporeans</span>
                </div>
                <div className={"header-right"}>
                        <MyChart chartData={Object.values(totalNationalities)} labels={Object.keys(totalNationalities)} />
                </div>
            </div>
            <div className={"nationality-list"}>
                {Object.keys(totalNationalities).slice(0, 3).map((key, index) => (
                    <div key={index} className={"nationality-item"}>
                        <span className={"nationality-count"}>{totalNationalities[key]}</span>
                        <span className={"nationality-name"}>{key}</span>
                    </div>
                ))}
                <div  className={"nationality-item"}>
                    <span className={"nationality-count"}>{totalNationalitiesRemainingCount}</span>
                    <span className={"nationality-name"}>Others</span>
                </div>
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
                    // circumference:180,
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
        <div className="self-center w-1/2" style={{width:'100px'}}>
            <div className="overflow-hidden">
                <canvas ref={canvasCallback} key={"chart-1"}></canvas>
            </div>
        </div>
    );
};
