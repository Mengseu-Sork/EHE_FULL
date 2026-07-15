import Chart from "react-apexcharts";

export default function VisitorChart({ data = [] }) {

    const options = {
        chart: {
            type: "area",
            height: 420,
            background: "transparent",

            toolbar: {
                show: false,
            },

            zoom: {
                enabled: false,
            },

            animations: {
                enabled: true,
                easing: "easeinout",
                speed: 1200,
            },
        },

        theme: {
            mode: "light",
        },

        colors: ["green"],

        stroke: {
            curve: "smooth",
            width: 2,
            lineCap: "round",
        },

        fill: {
            type: "gradient",

            gradient: {
                shade: "light",
                type: "vertical",

                shadeIntensity: 0.6,

                opacityFrom: 0.45,
                opacityTo: 0,

                stops: [0, 90, 100],
            },
        },

        dataLabels: {
            enabled: false,
        },

        markers: {
            size: 0,

            hover: {
                size: 7,
            },
        },

        grid: {
            borderColor: "#F1F5F9",
            strokeDashArray: 6,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },

        xaxis: {

            categories: data.map(item => item.month),

            labels: {
                style: {
                    colors: "#64748B",
                    fontSize: "14px",
                    fontWeight: 600,
                },
            },

            axisBorder: {
                show: false,
            },

            axisTicks: {
                show: false,
            },
        },

        yaxis: {

            labels: {
                style: {
                    colors: "#64748B",
                },
            },
        },

        tooltip: {

            shared: true,

            intersect: false,

            theme: "light",

            style: {
                fontSize: "14px",
            },

            y: {
                formatter: value => `${value} Visitors`,
            },
        },

        legend: {
            show: false,
        },
    };

    const series = [
        {
            name: "Visitors",
            data: data.map(item => item.total),
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