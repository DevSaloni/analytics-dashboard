import React, { useEffect, useState, useRef } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AreaChart = ({ sales, loading, error }) => {
    const [chartData, setChartData] = useState(null);
    const [yMax, setYMax] = useState(null);
    const chartRef = useRef(null);

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
            const key = monthFormatter.format(date);
            if (!monthMap[key]) {
                monthMap[key] = 0;
            }
            monthMap[key] += item.amount;
        });

        const labels = Object.keys(monthMap);
        const values = Object.values(monthMap);

        const maxValue = Math.max(...values, 0);
        const bufferedMax = maxValue * 1.1 || 1;
        const magnitude = Math.pow(10, Math.floor(Math.log10(bufferedMax)));
        const niceMax = Math.ceil(bufferedMax / magnitude) * magnitude;
        setYMax(niceMax);

        setChartData({
            labels,
            datasets: [
                {
                    label: "Total Revenue",
                    data: values,
                    fill: true,
                    borderColor: "rgba(59, 130, 246, 1)",
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 0,
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                        gradient.addColorStop(0, "rgba(236, 72, 153, 0.6)");
                        gradient.addColorStop(1, "rgba(236, 72, 153, 0.05)");
                        return gradient;
                    },
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
                Monthly Revenue (Area)
            </h2>

            <div className="h-[320px]">
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: { color: "#fff" },
                            },
                            tooltip: {
                                backgroundColor: "#111827",
                                titleColor: "#fff",
                                bodyColor: "#fff",
                            },
                        },
                        scales: {
                            x: {
                                ticks: { color: "#fff" },
                                grid: { color: "rgba(255,255,255,0.1)" },
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
                                grid: { color: "rgba(255,255,255,0.1)" },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default AreaChart;