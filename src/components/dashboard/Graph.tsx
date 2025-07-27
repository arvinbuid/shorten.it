import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    Filler,
    Title,
    type ChartOptions
} from "chart.js";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    Filler,
    Title
)

interface GraphDataItem {
    clickDate: string;
    count: number;
}

interface GraphProps {
    graphData: GraphDataItem[]
}

const Graph = ({ graphData }: GraphProps) => {
    const labels = graphData.map((item) => `${item.clickDate}`);
    const userPerData = graphData.map(item => item.count);

    const data = {
        labels: graphData.length > 0 ? labels : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        datasets: [
            {
                label: "Total Clicks",
                data: graphData.length > 0 ? userPerData : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
                backgroundColor:
                    graphData.length > 0 ? "#3b82f6" : "rgba(54, 162, 235, 0.1)",
                borderColor: "#1D2327",
                barThickness: 20,
                categoryPercentage: 1.5,
                barPercentage: 1.5,
            }
        ]
    }

    const options: ChartOptions<"bar"> = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Date",
                    color: "#FF0000",
                    font: {
                        family: "Arial",
                        size: 16,
                        weight: "bold",
                    },
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: string | number) {
                        if (Number.isInteger(value)) {
                            return value.toString();
                        }
                        return "";
                    },
                },
                title: {
                    display: true,
                    text: "Number Of Clicks",
                    color: "#FF0000",
                    font: {
                        family: "Arial",
                        size: 16,
                        weight: "bold",
                    },
                },
            },
        },
    }

    return <Bar className="w-full" data={data} options={options}></Bar>
}

export default Graph;