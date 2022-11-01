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
export default class Records extends Component {
    constructor(props) {
        super(props);
        // 这行是dropdown的关键
        this.handleChange = this.handleChange.bind(this);
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

            // the initial dropdown component's value
            // todo: default value
            monthselect: 2210,
        }
    }
    async componentDidMount() {
        await axios.get("https://backendapicall.click:8000/api/house")
            .then(Response => {
                dataRead = Response.data;
                let normal_cat = [];
                let records = []

                // console.log("Response", Response.data.data.house_detail);
                for (const obj of Response.data) {
                    // use a if to filter month
                    if (obj.house_detail.paqu_date == this.state.monthselect) {
                        // species is always the district
                        if (obj.house_detail.cond === "normal") {
                            normal_cat.push(obj.house_detail.district);
                            records.push(obj.house_detail.lens);
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
                    arrays = [records, normal_cat],
                    sorted = arrays.map(
                        (indices => a => indices.map(i => a[i]))
                            ([...arrays[0].keys()].sort((a, b) => arrays[0][a] - arrays[0][b]))
                    );

                //  sorted[4] is the sorted district
                var District_dic = { 'pudong': '浦东', 'minhang': '闵行', 'baoshan': '宝山', 'xuhui': '徐汇', 'putuo': '普陀', 'chongming': '崇明', 'jinshan': '金山', 'fengxian': '奉贤', 'qingpu': '青浦', 'hongkou': '虹口', 'jingan': '静安', 'huangpu': '黄浦', 'jiading': '嘉定', 'songjiang': '松江', 'changning': '长宁', 'yangpu': '杨浦' };
                var py_ds = [];
                for (var cats in sorted[1]) {
                    // append new value to the array
                    py_ds.push(District_dic[sorted[1][cats]]);
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
                            data: sorted[0],
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
        let normal_cat = [];
        let records = []

        // console.log("Response", Response.data.data.house_detail);
        for (const obj of dataRead) {
            // use a if to filter month
            if (obj.house_detail.paqu_date == e.target.value) {
                // species is always the district
                if (obj.house_detail.cond === "normal") {
                    normal_cat.push(obj.house_detail.district);
                    records.push(obj.house_detail.lens);
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
            arrays = [records, normal_cat],
            sorted = arrays.map(
                (indices => a => indices.map(i => a[i]))
                    ([...arrays[0].keys()].sort((a, b) => arrays[0][a] - arrays[0][b]))
            );

        //  sorted[4] is the sorted district
        var District_dic = { 'pudong': '浦东', 'minhang': '闵行', 'baoshan': '宝山', 'xuhui': '徐汇', 'putuo': '普陀', 'chongming': '崇明', 'jinshan': '金山', 'fengxian': '奉贤', 'qingpu': '青浦', 'hongkou': '虹口', 'jingan': '静安', 'huangpu': '黄浦', 'jiading': '嘉定', 'songjiang': '松江', 'changning': '长宁', 'yangpu': '杨浦' };
        var py_ds = [];
        for (var cats in sorted[1]) {
            // append new value to the array
            py_ds.push(District_dic[sorted[1][cats]]);
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
                    data: sorted[0],
                },
            ],
            // catch the errors
        })
    }

    render() {
        return (
            <>
                <article>
                    <div id="Dropdownpanel">
                        <div className="select-container">
                            <select value={this.state.monthselect} onChange={this.handleChange}>
                                {options.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Chart options={this.state.options} series={this.state.series} type="bar" width={1000} height={700} align="center" />
                </article>
            </>
        )
    }

}
