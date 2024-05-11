"use client";
import React, { useEffect, useRef, useState } from "react";
import Highcharts, { color } from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import "./index.css";
Highcharts.setOptions({
    lang: {
        rangeSelectorZoom: "Time",
    },
});

const AreaChart = () => {
    const [options, setoption] = useState();
    useEffect(() => {
        (async () => {
            const data = await fetch(
                "https://demo-live-data.highcharts.com/aapl-c.json"
            ).then((response) => response.json());

            const volumeData = await fetch(
                "https://demo-live-data.highcharts.com/aapl-v.json"
            ).then((response) => response.json());

            // Create the chart
            let chart = {
                chart: {
                    height: 600, // Set the height of the chart to 400 pixels
                    marginRight: 50,
                    marginLeft: 50,
                    backgroundColor: "#141416",
                    spacingTop: 20,
                },
                rangeSelector: {
                    selected: 0,
                    verticalAlign: "top",
                    buttonPosition: {
                        align: "right",
                    },
                    inputPosition: {
                        align: "left",
                    },
                    buttonSpacing: 30,
                    buttonTheme: {
                        fill: "none", // Set the initial fill color to transparent
                        stroke: "none",
                        "stroke-width": 0,
                        r: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                        fontFamily: "DM Sans", // Set the font family for the button text
                        fontSize: 12, // Set the font size for the button text
                        lineHeight: 18, // Set the line height for the button text
                        style: {
                            color: "#777E90", // Set the text color
                            fontWeight: "bold",
                        },
                        states: {
                            hover: {
                                fill: "none",
                            },
                            select: {
                                fill: "#3772FF", // Change fill color to blue on selection
                                style: {
                                    color: "#F7F7F7", // Change text color to white on selection
                                },
                            },
                        },
                    },
                    buttons: [
                        {
                            type: "week",
                            count: 1,
                            text: "1D",
                        },
                        {
                            type: "week",
                            count: 1,
                            text: "1W",
                        },
                        {
                            type: "month",
                            count: 1,
                            text: "1M",
                        },
                        {
                            type: "year",
                            count: 1,
                            text: "1Y",
                        },
                        {
                            type: "all",
                            text: "All",
                        },
                    ],
                },
                navigator: {
                    enabled: true,
                    stickToMax: true,
                    handles: {
                        // backgroundColor: ,
                        borderColor: "#2996C0",
                        symbols: [
                            "M 0 0 L 12 0 L 12 16 L 0 16 Z",
                            "M 0 0 L 12 0 L 12 16 L 0 16 Z",
                        ],
                    },
                    height: 24,
                    maskFill: "rgba(41, 150, 192, 0.2)", // Set the background color of the navigator
                    series: {
                        type: "areaspline",
                        // color: "blue",
                        fillOpacity: 0.5,
                    },
                    xAxis: {
                        labels: {
                            align: "center",
                            overflow: "allow",
                            y: 20,
                            style: {
                                color: "#777e90",
                            },
                            staggerLines: 1,
                        },
                        className: "custom-navigator-xaxis",
                    },
                    outlineColor: "#23262F",
                    outlineWidth: 1,
                    opposite: false,
                    minorGridLineColor: "#000",
                },
                title: {
                    text: "AAPL Stock Price",
                },

                series: [
                    {
                        name: "AAPL Stock Price",
                        data: data,
                        type: "areaspline",
                        threshold: null,
                        tooltip: {
                            valueDecimals: 2,
                        },
                        animation: true,
                        zIndex: 20,
                        yAxis: 0,
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1,
                            },
                            stops: [
                                // [0, Highcharts.getOptions().colors[0]],
                                // [
                                //     1,
                                //     Highcharts.color(
                                //         Highcharts.getOptions().colors[0]
                                //     )
                                //         .setOpacity(0)
                                //         .get("rgba"),
                                // ],
                                [0, "rgba(50, 182, 234, 0.35)"],
                                [1, "rgba(0, 0, 0, 0.00)"],
                            ],
                        },
                    },
                    {
                        name: "Volume",
                        data: volumeData,
                        type: "column",
                        yAxis: 1,
                        tooltip: {
                            valueDecimals: 0,
                        },
                        animation: true,
                        className: "",
                        color: "#233F2E",
                        zIndex: 10,
                    },
                ],
                yAxis: [
                    {
                        labels: {
                            align: "left",
                            overflow: "justify",
                            // style:{
                            //     color:"#777E90"
                            // }
                        },
                        title: {
                            text: "", // Stock price
                        },
                        lineWidth: 1,
                        resize: {
                            enabled: true,
                        },
                        height: "100%",
                        opposite: true,
                        offset: 0, // Move the axis labels outside the border
                        showLastLabel: true,
                        // marginRight: 40,
                        // marginLeft: 40,
                        className: "custom-y-axis",
                    },
                    {
                        labels: {
                            x: -10,
                            overflow: "justify",
                            // style:{
                            //     color:"#777E90"
                            // }
                        },
                        title: {
                            text: "", // Volume
                        },
                        height: "100%",
                        // top:"50%",
                        offset: 0,
                        lineWidth: 1,
                        opposite: false,
                        offset: 0, // Move the axis labels outside the border
                        showLastLabel: true,
                        max: 196114600,
                        className: "custom-y-axis",
                    },
                ],
            };
            setoption(chart);
        })();
    }, []);
    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
            // ref={chartRef}
        />
    );
};

export default AreaChart;