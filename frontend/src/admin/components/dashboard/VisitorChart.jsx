import Chart from "react-apexcharts";

export default function VisitorChart({ data = [] }) {

    const options = {
        chart: {
            type: "area",
            height: 420,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            animations: {
                enabled: true,
                easing: "easeinout",
                speed: 1000,
            },
        },

        colors: ["#10B981", "#3B82F6"],

        stroke: {
            curve: "smooth",
            width: 3,
        },

        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                opacityFrom: 0.35,
                opacityTo: 0,
                stops: [0, 100],
            },
        },

        dataLabels: {
            enabled: false,
        },

        markers: {
            size: 4,
            hover: {
                size: 7,
            },
        },

        grid: {
            borderColor: "#E5E7EB",
            strokeDashArray: 5,
        },

        xaxis: {
            categories: data.map(item => item.month),

            labels: {
                style: {
                    colors: "#64748B",
                    fontSize: "13px",
                },
            },
        },

        yaxis: {
            min: 0,

            labels: {
                style: {
                    colors: "#64748B",
                },
            },
        },

        tooltip: {
            shared: true,
            intersect: false,
        },

        legend: {
            show: true,
            position: "top",
            horizontalAlign: "right",
        },
    };

    const series = [
        {
            name: "Visitors",
            data: data.map(item => item.visitors),
        },
        {
            name: "News",
            data: data.map(item => item.news),
        },
    ];

    return (
        <Chart
            options={options}
            series={series}
            type="area"
            height={420}
        />
    );
}