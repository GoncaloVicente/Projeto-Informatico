<template>
    <div>
        <div v-show="data">
            <p v-if="data.length == 0">Não foi registada qualquer atividade</p>
            <canvas v-else v-bind:id="id"></canvas>
        </div>
        <div v-if="!data">
            <div style="text-align:center;">
                <i class="fas fa-spin fa-spinner fa-3x"></i>
                <span>Loading..</span>
            </div>
        </div>
    </div>
</template>
<script>

    import 'chart.js';

    export default {
        props: ['id', 'data'],
        watch: {
            data: function (val) {
                if (val) {

                    var ctx = document.getElementById(this.id).getContext('2d');
                    let labels = this.data.map(d => d.mes);
                    let dados = this.data.map(d => d.total);
                    var dynamicColors = function () {
                        var r = Math.floor(Math.random() * 255);
                        var g = Math.floor(Math.random() * 255);
                        var b = Math.floor(Math.random() * 255);
                        return "rgb(" + r + "," + g + "," + b + ")";
                    };
                    if (this.myChart === undefined || this.myChart === null) {
                        this.myChart = new Chart(ctx, {
                            type: 'bar',
                            data:
                                {
                                    labels: labels,
                                    datasets:
                                        [{
                                            data: dados,
                                            borderWidth: 1,
                                            backgroundColor: [dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors()]
                                        }]
                                }
                            ,
                            options: {
                                title: {
                                    display: false,
                                }
                                ,
                                legend: {
                                    display: false
                                }
                                ,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }
                        })
                    }
                }
            }
        }
    }
</script>
