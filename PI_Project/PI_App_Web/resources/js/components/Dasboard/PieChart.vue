<template>
    <div>
        <div v-show="data">
            <p v-if="data.length == 0">Não foi registada atividade neste mês</p>
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
                    var myChart = new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: labels,
                            datasets:
                                [{
                                    data: dados,
                                    backgroundColor: [dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors()],
                                    borderWidth: 1,
                                }],
                        },
                        options: {
                            title: {
                                display: false,
                            }
                            ,
                        }
                    });
                }
            }
        }
    };
</script>
