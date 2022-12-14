import axios from "axios"
import Chart from "react-apexcharts";
import React, { Component } from "react";

// remember to export the component, or it cannot be called.
export default class Interesting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                colors: ["#001219", "#005f73", "#0a9396", "#94d2bd", "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226", "#ff5400", "#ff6d00", "#ff8500", "#ff9100", "#ff9e00", "#00b4d8", "#0096c7", "#0077b6", "#023e8a"],
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
                    },
                    dataLabels: {
                        enabled: true,
                        background: {
                            enabled: true,
                            borderRadius: 2,
                        }
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
                    floating: false,
                    labels: {
                        show: true,
                        style: {
                            colors: '#fff',
                            fontSize: '15px',
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    },
                },
            },
            series: [
                {
                    name: "?????????????????????",
                    data: [],
                },
                {
                    name: "?????????????????????",
                    data: [],
                },
                {
                    name: "?????????????????????",
                    data: [],
                },

            ],
        }
    }
    async componentDidMount() {
        const pudong = [];
        const minhang = [];
        const baoshan = [];
        const xuhui = [];
        const putuo = [];
        const yangpu = [];
        const changning = [];
        const songjiang = [];
        const jiading = [];
        const huangpu = [];
        const jingan = [];
        const hongkou = [];
        const qingpu = [];
        const fengxian = [];
        const jinshan = [];
        const chongming = [];
        await axios.get("https://backendapicall.click:8000/api/house")
            .then(Response => {
                console.log(Response.data);
                // console.log("Response", Response.data.data.house_detail);
                for (const obj of Response.data) {
                    console.log("obj", obj);
                    // species is always the district
                    if (obj.house_detail.cond === "interesting") {
                        if (obj.house_detail.district === "pudong") {
                            pudong.push(obj.house_detail.house_area_mean * 10);
                            pudong.push(obj.house_detail.total_price_mean);
                            pudong.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "minhang") {
                            minhang.push(obj.house_detail.house_area_mean * 10);
                            minhang.push(obj.house_detail.total_price_mean);
                            minhang.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "baoshan") {
                            baoshan.push(obj.house_detail.house_area_mean * 10);
                            baoshan.push(obj.house_detail.total_price_mean);
                            baoshan.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "xuhui") {
                            xuhui.push(obj.house_detail.house_area_mean * 10);
                            xuhui.push(obj.house_detail.total_price_mean);
                            xuhui.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "putuo") {
                            putuo.push(obj.house_detail.house_area_mean * 10);
                            putuo.push(obj.house_detail.total_price_mean);
                            putuo.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "yangpu") {
                            yangpu.push(obj.house_detail.house_area_mean * 10);
                            yangpu.push(obj.house_detail.total_price_mean);
                            yangpu.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "changning") {
                            changning.push(obj.house_detail.house_area_mean * 10);
                            changning.push(obj.house_detail.total_price_mean);
                            changning.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "songjiang") {
                            songjiang.push(obj.house_detail.house_area_mean * 10);
                            songjiang.push(obj.house_detail.total_price_mean);
                            songjiang.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "jiading") {
                            jiading.push(obj.house_detail.house_area_mean * 10);
                            jiading.push(obj.house_detail.total_price_mean);
                            jiading.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "huangpu") {
                            huangpu.push(obj.house_detail.house_area_mean * 10);
                            huangpu.push(obj.house_detail.total_price_mean);
                            huangpu.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "jingan") {
                            jingan.push(obj.house_detail.house_area_mean * 10);
                            jingan.push(obj.house_detail.total_price_mean);
                            jingan.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "hongkou") {
                            hongkou.push(obj.house_detail.house_area_mean * 10);
                            hongkou.push(obj.house_detail.total_price_mean);
                            hongkou.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "qingpu") {
                            qingpu.push(obj.house_detail.house_area_mean * 10);
                            qingpu.push(obj.house_detail.total_price_mean);
                            qingpu.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "fengxian") {
                            fengxian.push(obj.house_detail.house_area_mean * 10);
                            fengxian.push(obj.house_detail.total_price_mean);
                            fengxian.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "jinshan") {
                            jinshan.push(obj.house_detail.house_area_mean * 10);
                            jinshan.push(obj.house_detail.total_price_mean);
                            jinshan.push(obj.house_detail.attention_ppl_mean * 5);
                        } else if (obj.house_detail.district === "chongming") {
                            chongming.push(obj.house_detail.house_area_mean * 10);
                            chongming.push(obj.house_detail.total_price_mean);
                            chongming.push(obj.house_detail.attention_ppl_mean * 5);
                        }

                    } else {
                        // year_struct_mean.push(0);
                        // year_struct_max.push(0);
                        // year_struct_min.push(0);
                    }
                }
                this.setState({
                    options: {
                        xaxis: {
                            categories: ['???????????? (??????10)', '????????????', '?????????????????? (??????5)'],
                            // categories: ['house_area_mean', 'total_price_mean', 'year_struct_mean'],
                        },
                    },
                    series: [

                        {
                            name: "??????",
                            data: pudong,
                        },
                        {
                            name: "??????",
                            data: minhang,
                        },
                        {
                            name: "??????",
                            data: baoshan,
                        },
                        {
                            name: "??????",
                            data: xuhui,
                        },
                        {
                            name: "??????",
                            data: putuo,
                        },
                        {
                            name: "??????",
                            data: yangpu,
                        },
                        {
                            name: "??????",
                            data: changning,
                        },
                        {
                            name: "??????",
                            data: songjiang,
                        },
                        {
                            name: "??????",
                            data: jiading,
                        },
                        {
                            name: "??????",
                            data: huangpu,
                        },
                        {
                            name: "??????",
                            data: jingan,
                        },
                        {
                            name: "??????",
                            data: hongkou,
                        },
                        {
                            name: "??????",
                            data: qingpu,
                        },
                        {
                            name: "??????",
                            data: fengxian,
                        },
                        {
                            name: "??????",
                            data: jinshan,
                        },
                        {
                            name: "??????",
                            data: chongming,
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
                    <h1>???? ????????????????????????</h1>
                    <p> ???????????????????????????????????????????????????????????????????????????????????????????????? ???2022???11???1????????????
                    </p>
                    <Chart options={this.state.options} series={this.state.series} type="radar" width={800} align="center" />
                </article>
            </>
        )
    }

}
