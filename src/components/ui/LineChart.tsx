import React, { useState } from "react";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const intervals = {
    "1d": 1,
    "3d": 3,
    "7d": 7,
    "15d": 15,
    "30d": 30,
    "3m": 90,
    "6m": 180,
    "1y": 365,
    "3y": 1095,
    "5y": 1825,
    all: Infinity,
};

export default function LineChart({ data, intervals: intervalOptions }) {
    const [selectedInterval, setSelectedInterval] = useState("all");

    const filteredData = data.filter((item) => {
        const itemDate = new Date(item.date).getTime();
        const now = new Date().getTime();
        const daysAgo = (now - itemDate) / (1000 * 60 * 60 * 24);
        return daysAgo <= intervals[selectedInterval];
    });

    const chartData = {
        labels: filteredData.map((item) => item.date),
        datasets: [
            {
                label: "Users",
                data: filteredData.map((item) => item.count),
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: "#3b82f6",
                pointBorderColor: "#fff",
                pointHoverRadius: 5,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    font: {
                        size: 14,
                        weight: 700, // changed from "bold"
                    },
                    padding: 20,
                },
            },
            title: {
                display: true,
                text: "User Growth Trend",
                font: {
                    size: 16,
                    weight: 700, // already correct
                },
                padding: 20,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                },
            },
        },
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {intervalOptions.map((interval) => (
                    <button
                        key={interval}
                        onClick={() => setSelectedInterval(interval)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                            selectedInterval === interval
                                ? "bg-blue-500 text-white shadow-md"
                                : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50"
                        }`}
                    >
                        {interval}
                    </button>
                ))}
            </div>
            <div className="w-full h-[400px]">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}
