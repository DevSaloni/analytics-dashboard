import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ sales, loading, error }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!Array.isArray(sales) || sales.length === 0) {
            setChartData(null);
            return;
        }

        // Share of revenue by category
        const categoryMap = {};

        sales.forEach((item) => {
            if (!categoryMap[item.category]) {
                categoryMap[item.category] = 0;
            }
            categoryMap[item.category] += item.amount;
        });

        const labels = Object.keys(categoryMap);
        const values = Object.values(categoryMap);

        if (values.length === 0 || values.every((v) => v === 0)) {
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
        <div className="bg-zinc-900 p-5 rounded-xl shadow-lg h-[400px]">
            <h2 className="text-white text-lg font-semibold mb-4">
                Revenue Share by Category
            </h2>

            <div className="h-[320px] flex items-center justify-center">
                <Doughnut
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: "65%", // makes it modern SaaS style
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

export default DoughnutChart;