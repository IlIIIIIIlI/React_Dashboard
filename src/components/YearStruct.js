import axios from "axios"
import Chart from "react-apexcharts";
import React, { Component } from "react";

// remember to export the component, or it cannot be called.
export default class YearStruct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                colors: ["#03256c", "#1976d2", "#0d47a1"],
                chart: {
                    id: "line-chart",
                    title: {
                        align: 'center',
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontFamily: undefined,
                            color: '#263238'
                        },
                    }
                },
                // xaxis: {
                //     categories: [],
                // },
                yaxis: {
                    min: 1924,
                    floating: false,
                    decimalsInFloat: undefined,
                },
            },
            series: [
                {
                    name: "建造年份平均值",
                    type: 'line',
                    data: [],
                },
                {
                    name: "建造年份最大值",
                    type: 'column',
                    data: [],
                },
                {
                    name: "建造年份最小值",
                    type: 'column',
                    data: [],
                },
            ],

        }
    }
    async componentDidMount() {
        const normal_cat = [];
        const year_struct_mean = [];
        const year_struct_max = [];
        const year_struct_min = [];
        await axios.get("https://backendapicall.click:8000/api/house")
            .then(Response => {
                console.log(Response.data);
                // console.log("Response", Response.data.data.house_detail);
                for (const obj of Response.data) {
                    console.log("obj", obj);
                    // species is always the district
                    if (obj.house_detail.cond === "normal") {
                        normal_cat.push(obj.house_detail.district);
                        year_struct_mean.push(Math.round(obj.house_detail.year_struct_mean));
                        year_struct_max.push(Math.round(obj.house_detail.year_struct_max));
                        year_struct_min.push(Math.round(obj.house_detail.year_struct_min));
                    } else {
                        // year_struct_mean.push(0);
                        // year_struct_max.push(0);
                        // year_struct_min.push(0);
                    }
                }
                // try to sort the array, from small to big
                const
                    arrays = [year_struct_mean, year_struct_max, year_struct_min, normal_cat],
                    sorted = arrays.map(
                        (indices => a => indices.map(i => a[i]))
                            ([...arrays[0].keys()].sort((a, b) => arrays[0][a] - arrays[0][b]))
                    );
                console.log(sorted);



                this.setState({
                    options: {
                        xaxis: {
                            categories: sorted[3],
                        },
                        chart: {
                            height: 350,
                            type: 'line',
                        },
                        dataLabels: {
                            enabled: true,
                            enabledOnSeries: [0],
                            style: {
                                fontSize: '14px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 'bold',
                                colors: undefined,
                            },
                        },
                        stroke: {
                            width: [2, 1, 1]
                        },
                    },
                    series: [
                        {
                            name: "建造年份平均值",
                            type: 'line',
                            data: sorted[0],
                        },
                        {
                            name: "建造年份最大值",
                            type: 'column',
                            data: sorted[1],
                        },
                        {
                            name: "建造年份最小值",
                            type: 'column',
                            data: sorted[2],
                        },
                    ],


                    // catch the errors
                })
            })
    }

    render() {
        return (
            <>
                <article>
                    <h2>房屋建立年份</h2>
                    <p> 此图记录了目前挂载的上海各区二手房的建造年份信息 （2022年10月3日更新）
                        <script>
                            date = new Date().toLocaleDateString();
                            document.write(date);
                        </script>
                    </p>
                    <Chart options={this.state.options} series={this.state.series} type="bar" width={800} align="center" />
                </article>
            </>
        )
    }

}
