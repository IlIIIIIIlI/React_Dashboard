import axios from "axios"
import Chart from "react-apexcharts";
import React, { Component } from "react";

// values
const options = [
    {
        label: "2022十月",
        value: 2210,
    },
    {
        label: "2022九月",
        value: 2209,
    },
    {
        label: "2022八月",
        value: 2208,
    },
];

let dataRead = 0;

// remember to export the component, or it cannot be called.
export default class YearStruct extends Component {
    constructor(props) {
        super(props);
        // 这行是dropdown的关键
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            options: {
                colors: ["#fff", "#1976d2", "#0d47a1"],
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
                    min: 1924,
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

            // the initial dropdown component's value
            // todo: default value
            monthselect: 2210,
        }
    }

    // first load, show the default
    async componentDidMount() {
        await axios.get("https://backendapicall.click:8000/api/house")
            .then(Response => {
                dataRead = Response.data;
                //  when uesr re-select, reload page
                let normal_cat = [];
                let year_struct_mean = [];
                let year_struct_max = [];
                let year_struct_min = [];
                // console.log("Response", Response.data.data.house_detail);
                for (const obj of Response.data) {
                    // use a if to filter month
                    if (obj.house_detail.paqu_date == this.state.monthselect) {
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
                    } else {
                        continue
                    }
                }
                // try to sort the array, from small to big
                let
                    arrays = [year_struct_mean, year_struct_max, year_struct_min, normal_cat],
                    sorted = arrays.map(
                        (indices => a => indices.map(i => a[i]))
                            ([...arrays[0].keys()].sort((a, b) => arrays[0][a] - arrays[0][b]))
                    );

                //  sorted[4] is the sorted district
                var District_dic = { 'pudong': '浦东', 'minhang': '闵行', 'baoshan': '宝山', 'xuhui': '徐汇', 'putuo': '普陀', 'chongming': '崇明', 'jinshan': '金山', 'fengxian': '奉贤', 'qingpu': '青浦', 'hongkou': '虹口', 'jingan': '静安', 'huangpu': '黄浦', 'jiading': '嘉定', 'songjiang': '松江', 'changning': '长宁', 'yangpu': '杨浦' };
                var py_ds = [];
                for (var cats in sorted[3]) {
                    // append new value to the array
                    py_ds.push(District_dic[sorted[3][cats]]);
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

    // when user select a component, read its input
    handleChange(e) {
        this.setState({
            monthselect: e.target.value,
        })
        //  when uesr re-select, reload page
        let normal_cat = [];
        let year_struct_mean = [];
        let year_struct_max = [];
        let year_struct_min = [];
        // console.log("Response", Response.data.data.house_detail);
        for (const obj of dataRead) {
            // use a if to filter month
            if (obj.house_detail.paqu_date == e.target.value) {
                // species is always the district
                console.log(obj.house_detail.paqu_date);
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
            } else {
                continue
            }
        }

        // try to sort the array, from small to big
        let
            arrays = [year_struct_mean, year_struct_max, year_struct_min, normal_cat],
            sorted = arrays.map(
                (indices => a => indices.map(i => a[i]))
                    ([...arrays[0].keys()].sort((a, b) => arrays[0][a] - arrays[0][b]))
            );

        //  sorted[4] is the sorted district
        var District_dic = { 'pudong': '浦东', 'minhang': '闵行', 'baoshan': '宝山', 'xuhui': '徐汇', 'putuo': '普陀', 'chongming': '崇明', 'jinshan': '金山', 'fengxian': '奉贤', 'qingpu': '青浦', 'hongkou': '虹口', 'jingan': '静安', 'huangpu': '黄浦', 'jiading': '嘉定', 'songjiang': '松江', 'changning': '长宁', 'yangpu': '杨浦' };
        var py_ds = [];
        for (var cats in sorted[3]) {
            // append new value to the array
            py_ds.push(District_dic[sorted[3][cats]]);
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
    }

    render() {
        return (
            <>
                <article>
                    <h1>房屋建立年份</h1>
                    <p> 此图记录了目前挂载的上海各区二手房的建造年份信息 （2022年11月1日更新）
                        <script>
                            date = new Date().toLocaleDateString();
                            document.write(date);
                        </script>
                    </p>
                    <div id="Dropdownpanel">
                        <div className="select-container">
                            <select value={this.state.monthselect} onChange={this.handleChange}>
                                {options.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Chart options={this.state.options} series={this.state.series} type="bar" width={600} align="center" />
                </article>
            </>
        )
    }

}
