<template>
    <div class="row">
        <div class="modal fade" id="modal-default1" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalScrollableTitle">{{aluno.nome}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="box box-primary" v-for="(item, index) in alunosAula">
                            <div class="box-header with-border">
                                <h3 class="box-title">{{item.nome}}</h3>
                            </div>
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <pie-chart :id="index" :data="item"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PieChart from "./PieChart.vue";

    export default {
        components: {
            'pie-chart': PieChart,
        },
        name: "estatisticasAlunos",
        props: ['alunosAula', 'aluno'],
    }
</script>

<style scoped>

</style>
