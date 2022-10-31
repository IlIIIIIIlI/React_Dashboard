import axios from "axios"
import Chart from "react-apexcharts";
import React, { Component } from "react";

// remember to export the component, or it cannot be called.
export default class Records extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                colors: ["#0d47a1"],
                chart: {
                    id: "basic-bar",
                    title: {
                        text: "Basic Bar",
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
                legend: {
                    markers: {
                        width: 12,
                        height: 12,
                        strokeWidth: 0,
                        strokeColor: '#fff',
                        fillColors: undefined,
                        radius: 12,
                        customHTML: undefined,
                        onClick: undefined,
                        offsetX: 0,
                        offsetY: 0
                    },
                    labels: {
                        show: true,
                        colors: '#fff',
                        fontSize: '15px',
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
                xaxis: {
                    categories: [],
                    labels: {
                        show: true,
                        style: {
                            colors: '#fff',
                            fontSize: '15px',
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    },
                },
                yaxis: {
                    min: 0,
                    floating: false,
                    decimalsInFloat: undefined,
                    labels: {
                        show: true,
                        minWidth: 0,
                        maxWidth: 160,
                        style: {
                            color: '#fff',
                            fontSize: '20px',
                            cssClass: 'apexcharts-yaxis-label',
                        },
                        offsetX: 0,
                        offsetY: 0,
                        rotate: 0,
                    }
                },
            },
            series: [
                {
                    name: "目前站上数据量",
                    data: [],
                },
            ],
        }
    }
    async componentDidMount() {
        const normal_cat = [];
        const records = []
        await axios.get("https://backendapicall.click:8000/api/house")
            .then(Response => {
                console.log(Response.data);
                // console.log("Response", Response.data.data.house_detail);
                for (const obj of Response.data) {
                    console.log("obj", obj);
                    // species is always the district
                    if (obj.house_detail.cond === "normal") {
                        normal_cat.push(obj.house_detail.district);
                        records.push(obj.house_detail.lens);
                    } else {
                        // year_struct_mean.push(0);
                        // year_struct_max.push(0);
                        // year_struct_min.push(0);
                    }
                }
                //  sorted[4] is the sorted district
                var District_dic = { 'pudong': '浦东', 'minhang': '闵行', 'baoshan': '宝山', 'xuhui': '徐汇', 'putuo': '普陀', 'chongming': '崇明', 'jinshan': '金山', 'fengxian': '奉贤', 'qingpu': '青浦', 'hongkou': '虹口', 'jingan': '静安', 'huangpu': '黄浦', 'jiading': '嘉定', 'songjiang': '松江', 'changning': '长宁', 'yangpu': '杨浦' };
                var py_ds = [];
                for (var cats in normal_cat) {
                    // append new value to the array
                    py_ds.push(District_dic[normal_cat[cats]]);
                }

                this.setState({
                    options: {
                        xaxis: {
                            categories: py_ds,
                        },
                    },
                    series: [
                        {
                            name: "目前站上数据量",
                            data: records,
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
                    <Chart options={this.state.options} series={this.state.series} type="bar" width={1000} height={700} align="center" />
                </article>
            </>
        )
    }

}
