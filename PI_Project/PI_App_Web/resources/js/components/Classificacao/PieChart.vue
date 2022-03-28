<template>
    <div>
        <div v-show="data">
            <p v-if="data.length == 0">Não foi registada atividade</p>
            <canvas v-bind:id="id"></canvas>
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
        data: function () {
            return {
                chartInstance: null
            }
        },
        mounted() {
            var ctx = document.getElementById(this.id).getContext('2d');

            let labels = ['Muito baixa', 'Baixa', 'Média', 'Boa', 'Excelente'];

            let dados = [this.data.total_1, this.data.total_2, this.data.total_3, this.data.total_4, this.data.total_5];
            var dynamicColors = function () {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";
            };
            if (this.chartInstance === undefined || this.chartInstance === null) {
                this.chartInstance = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets:
                            [{
                                data: dados,
                                backgroundColor: ['#ff5623', '#ff9d25', '#ffdd24', '#b3ff23', '#57e440'],
                                borderWidth: 1,
                            }],
                    }
                    ,
                    options: {
                        title: {
                            display: false,
                        }
                        ,
                    }
                });
                this.chartInstance.update();
            } else {
                //update chart
                this.chartInstance.data.labels = labels;
                this.chartInstance.data.datasets = [{
                    data: dados,
                    backgroundColor: ['#ff5623', '#ff9d25', '#ffdd24', '#b3ff23', '#57e440'],
                    borderWidth: 1,
                }];
                this.chartInstance.update();
            }
            ;
        },
        watch: {
            data: function (val) {
                if (val) {
                    var ctx = document.getElementById(this.id).getContext('2d');

                    let labels = ['Muito baixa', 'Baixa', 'Média', 'Boa', 'Excelente'];

                    let dados = [this.data.total_1, this.data.total_2, this.data.total_3, this.data.total_4, this.data.total_5];
                    var dynamicColors = function () {
                        var r = Math.floor(Math.random() * 255);
                        var g = Math.floor(Math.random() * 255);
                        var b = Math.floor(Math.random() * 255);
                        return "rgb(" + r + "," + g + "," + b + ")";
                    };
                    if (this.chartInstance === undefined || this.chartInstance === null) {
                        this.chartInstance = new Chart(ctx, {
                            type: 'pie',
                            data: {
                                labels: labels,
                                datasets:
                                    [{
                                        data: dados,
                                        backgroundColor: ['#ff5623', '#ff9d25', '#ffdd24', '#b3ff23', '#57e440'],
                                        borderWidth: 1,
                                    }],
                            }
                            ,
                            options: {
                                title: {
                                    display: false,
                                }
                                ,
                            }
                        });
                        this.chartInstance.update();
                    } else {
                        //update chart
                        this.chartInstance.data.labels = labels;
                        this.chartInstance.data.datasets = [{
                            data: dados,
                            backgroundColor: ['#ff5623', '#ff9d25', '#ffdd24', '#b3ff23', '#57e440'],
                            borderWidth: 1,
                        }];
                        this.chartInstance.update();
                    }
                }
            }
        }
    }
</script>
