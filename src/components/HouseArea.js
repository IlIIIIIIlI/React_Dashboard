import axios from "axios"
import Chart from "react-apexcharts";
import React, { Component } from "react";

// remember to export the component, or it cannot be called.
export default class HouseArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                colors: ["#06bee1", "#1768ac", "#2541b2", "#FFF"],
                chart: {
                    id: "basic-bar",
                    title: {
                        align: 'center',
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                            fontSize: '14px',
                            // fontWeight: 'bold',
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
                            fontSize: '13px',
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    },
                },
                yaxis: {
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
                }
            },
            series: [
                {
                    name: "面积平均值",
                    type: 'column',
                    data: [],
                },
                {
                    name: "面积最大值",
                    type: 'column',
                    data: [],
                },
                {
                    name: "面积最小值",
                    type: 'column',
                    data: [],
                },
                {
                    name: "面积标准差",
                    type: 'line',
                    data: [],
                },
            ],
        }
    }
    async componentDidMount() {
        const normal_cat = [];
        const house_area_mean = [];
        const house_area_max = [];
        const house_area_min = [];
        const house_area_std = [];
        await axios.get("https://backendapicall.click:8000/api/house")
            .then(Response => {
                console.log(Response.data);
                // console.log("Response", Response.data.data.house_detail);
                for (const obj of Response.data) {
                    console.log("obj", obj);
                    // species is always the district
                    if (obj.house_detail.cond === "normal") {
                        normal_cat.push(obj.house_detail.district);
                        house_area_mean.push(Math.round(obj.house_detail.house_area_mean));
                        house_area_max.push(Math.round(obj.house_detail.house_area_max));
                        house_area_min.push(Math.round(obj.house_detail.house_area_min));
                        house_area_std.push(Math.round(obj.house_detail.house_area_std));

                    } else {
                        // year_struct_mean.push(0);
                        // year_struct_max.push(0);
                        // year_struct_min.push(0);
                    }
                }
                // try to sort the array, from small to big
                const
                    arrays = [house_area_std, house_area_mean, house_area_max, house_area_min, normal_cat],
                    sorted = arrays.map(
                        (indices => a => indices.map(i => a[i]))
                            ([...arrays[0].keys()].sort((a, b) => arrays[0][a] - arrays[0][b]))
                    );
                console.log(sorted);

                //  sorted[4] is the sorted district
                var District_dic = { 'pudong': '浦东', 'minhang': '闵行', 'baoshan': '宝山', 'xuhui': '徐汇', 'putuo': '普陀', 'chongming': '崇明', 'jinshan': '金山', 'fengxian': '奉贤', 'qingpu': '青浦', 'hongkou': '虹口', 'jingan': '静安', 'huangpu': '黄浦', 'jiading': '嘉定', 'songjiang': '松江', 'changning': '长宁', 'yangpu': '杨浦' };
                var py_ds = [];
                console.log(sorted[4]);
                for (var cats in sorted[4]) {
                    // append new value to the array
                    py_ds.push(District_dic[sorted[4][cats]]);
                }

                this.setState({
                    options: {
                        xaxis: {
                            categories: py_ds,
                        },
                        chart: {
                            height: 350,
                            type: 'line',
                        },
                        dataLabels: {
                            enabled: true,
                            enabledOnSeries: [3],
                            style: {
                                fontSize: '14px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 'bold',
                                colors: undefined,
                            },
                        },
                        stroke: {
                            width: [1, 1, 1, 1]
                        },
                    },
                    series: [
                        {
                            name: "面积平均值",
                            data: sorted[1],
                        },
                        {
                            name: "面积最大值",
                            data: sorted[2],
                        },
                        {
                            name: "面积最小值",
                            data: sorted[3],
                        },
                        {
                            name: "面积标准差",
                            data: sorted[0],
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
                    <h1>房屋面积</h1>
                    <p> 此图记录了目前挂载的上海各区二手房的面积信息 （2022年10月3日更新）
                        <script>
                            date = new Date().toLocaleDateString();
                            document.write(date);
                        </script>
                    </p>
                    <Chart options={this.state.options} series={this.state.series} type="bar" width={600} align="center" />
                </article>
            </>
        )
    }

}
