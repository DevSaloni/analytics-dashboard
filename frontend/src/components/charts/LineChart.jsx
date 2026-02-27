import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ sales, loading, error }) => {
    const [chartData, setChartData] = useState(null);
    const [yMax, setYMax] = useState(null);

    useEffect(() => {
        if (!Array.isArray(sales) || sales.length === 0) {
            setChartData(null);
            setYMax(null);
            return;
        }

        const monthFormatter = new Intl.DateTimeFormat("en", {
            month: "short",
            year: "2-digit",
        });

        const monthMap = {};

        sales.forEach((item) => {
            const date = new Date(item.date);
            const key = monthFormatter.format(date); // e.g. "Jan 26"
            if (!monthMap[key]) {
                monthMap[key] = 0;
            }
            monthMap[key] += item.amount;
        });

        const labels = Object.keys(monthMap);
        const revenue = Object.values(monthMap);

        const maxValue = Math.max(...revenue, 0);
        const bufferedMax = maxValue * 1.1 || 1;
        const magnitude = Math.pow(10, Math.floor(Math.log10(bufferedMax)));
        const niceMax = Math.ceil(bufferedMax / magnitude) * magnitude;
        setYMax(niceMax);

        setChartData({
            labels,
            datasets: [
                {
                    label: "Revenue",
                    data: revenue,
                    fill: true,
                    backgroundColor: "rgba(236, 72, 153, 0.2)",
                    borderColor: "rgba(236, 72, 153, 1)",
                    tension: 0.4,
                    pointBackgroundColor: "rgba(236, 72, 153, 1)",
                    pointBorderColor: "#fff",
                    pointRadius: 4,
                    pointHoverRadius: 6,
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
                Revenue Trend (Monthly)
            </h2>

            <div className="h-[320px]">
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { labels: { color: "#fff" } },
                            tooltip: {
                                backgroundColor: "#111827",
                                titleColor: "#fff",
                                bodyColor: "#fff",
                            },
                        },
                        scales: {
                            x: {
                                ticks: { color: "#fff" },
                                grid: { color: "rgba(255, 255, 255, 0.1)" },
                            },
                            y: {
                                beginAtZero: true,
                                suggestedMax: yMax || undefined,
                                ticks: {
                                    color: "#fff",
                                    stepSize: yMax
                                        ? Math.max(Math.round(yMax / 5), 1)
                                        : undefined,
                                },
                                grid: { color: "rgba(255, 255, 255, 0.1)" },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default LineChart;