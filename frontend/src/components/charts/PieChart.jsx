import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ sales, loading, error }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!Array.isArray(sales) || sales.length === 0) {
            setChartData(null);
            return;
        }

        // Distribution of sales amount by status
        const statusMap = {
            completed: 0,
            pending: 0,
            cancelled: 0,
        };

        sales.forEach((item) => {
            const key = (item.status || "").toLowerCase();
            if (statusMap[key] !== undefined) {
                statusMap[key] += item.amount;
            }
        });

        const labels = ["Completed", "Pending", "Cancelled"];
        const values = [
            statusMap.completed,
            statusMap.pending,
            statusMap.cancelled,
        ];

        if (values.every((v) => v === 0)) {
            setChartData(null);
            return;
        }

        setChartData({
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: [
                        "rgba(236, 72, 153, 0.9)",   // pink
                        "rgba(168, 85, 247, 0.9)",   // purple
                        "rgba(59, 130, 246, 0.9)",   // blue
                    ],
                    borderColor: "#18181b",
                    borderWidth: 2,
                    hoverOffset: 12,
                },
            ],
        });
    }, [sales]);

    if (loading)
        return <p className="text-white text-center">Loading chart...</p>;
    if (error)
        return <p className="text-red-500 text-center">{error}</p>;
    if (!chartData)
        return <p className="text-gray-400 text-center">No data for selected filters.</p>;
    return (
        <div className="chart-card bg-zinc-900 p-5 rounded-xl shadow-lg h-[400px]">
            <h2 className="text-white text-lg font-semibold mb-4">
                Sales by Status
            </h2>

            <div className="h-[320px] flex items-center justify-center">
                <Pie
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false, // IMPORTANT
                        plugins: {
                            legend: {
                                position: "bottom",
                                labels: {
                                    color: "#fff",
                                    padding: 20,
                                },
                            },
                            tooltip: {
                                backgroundColor: "#111827",
                                titleColor: "#fff",
                                bodyColor: "#fff",
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default PieChart;