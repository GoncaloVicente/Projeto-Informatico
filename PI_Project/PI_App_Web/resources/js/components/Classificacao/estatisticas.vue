<template>
    <div class="row">
        <div class="jumbotron col-md-12" style="background-color: rgb(48,117,173);">
            <h1 style="text-align: center">
                <span style="color: white; ">{{title}}&nbsp
                    <i type="button" class="fa fa-info-circle" aria-hidden="true" data-toggle="modal"
                       data-target="#modal-default">
                    </i>
                </span>
            </h1>
        </div>
        <div class="modal fade" id="modal-default">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Informações da aula</h4>
                    </div>
                    <div class="modal-body" v-for="(item, index) in aulaAtual">
                        <p><strong>Professor: </strong>{{item.prof}}</p>
                        <p><strong>Data: </strong>{{item.data}}</p>
                        <p><strong>Unidade Curricular</strong>: {{item.uc}}</p>
                        <p><strong>Curso</strong>: {{item.curso}}</p>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <stats-alunos :aluno="this.aluno" :alunosAula="this.alunoClassificacao"></stats-alunos>
        </div>
        <div class="col-md-12">
            <div class="col-md-6" v-for="(item, index) in aulaConteudo">
                <div class="box box-primary">
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
        </div>
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-body">
                    <h1>Alunos que classificaram conteúdos</h1>
                    <div class="table-responsive-grid" style="min-height: 360px;">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th v-on:click="toogleorder(0)">Numero
                                            <i class="fa"
                                               v-bind:class="[filter.sortNumero === 'asc' ? 'fa-sort-numeric-desc' : 'fa-sort-numeric-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(1)">Nome
                                            <i class="fa"
                                               v-bind:class="[filter.sortNome === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th>Ações</th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input v-model="filter.numero" type="number"
                                                   class="search-input form-control"
                                                   placeholder="Procurar..."/>
                                        </th>
                                        <th>
                                            <input v-model="filter.nome" type="text" class="search-input form-control"
                                                   placeholder="Procurar..."/></th>
                                        <th>
                                            <button class="btn btn-default" v-on:click.prevent="limparFiltros()">
                                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar
                                            </button>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr
                                        v-for="alunoAula in alunosAula">
                                        <td>{{alunoAula.aluno.numero}}</td>
                                        <td>{{ alunoAula.aluno.nome }}</td>
                                        <td>
                                            <button type="button" class="btn btn-success" data-toggle="modal"
                                                    data-target="#modal-default1"
                                                    v-on:click.prevent="statsAluno(alunoAula)">
                                                Ver Classificações
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <paginate
                :pageCount="pageCount"
                :containerClass="'pagination'"
                :clickHandler="clickCallback">
            </paginate>
        </div>
    </div>
</template>

<script>

    import PieChart from "./PieChart.vue";
    import EstatisticasAlunos from "./estatisticasAlunos";

    export default {
        components: {
            'pie-chart': PieChart,
            'stats-alunos': EstatisticasAlunos
        },
        name: "estatisticas",
        data: function () {
            return {
                title: "Conteúdos classificados",
                página: 1,
                total: 0,
                alunosAula: [],
                aulaConteudo: [],
                aluno: 0,
                aula: 0,
                alunoClassificacao: [],
                aulaAtual: [],
                filter: {numero: '', nome: '', sortNome: '', sortNumero: ''},
                timer: null,
                alunoSelect: null
            }
        },
        methods: {
            getAlunosAula: function () {
                let variables = '&numero=' + this.filter.numero + '&nome=' + this.filter.nome + '&sortNome=' + this.filter.sortNome + '&sortNumero=' + this.filter.sortNumero;
                let id = this.$route.params.id;
                axios.get("api/aula/alunos?page=" + this.página + "&id=" + id + variables).then(response => {
                    this.alunosAula = response.data.data;
                    this.total = response.data.total;
                }).catch(function (error) {
                    if (error.response) {
                        window.location = '/unauthorized';
                    }
                });
            },
            getAulaConteudo: function () {
                let id = this.$route.params.id;
                axios.get("api/aula/conteudo?page=" + this.página + "&id=" + id).then(response => {
                    this.aulaConteudo = response.data;
                });
            },
            limparFiltros: function () {
                this.filter.numero = '';
                this.filter.nome = '';
            },
            toogleorder: function (position) {
                switch (position) {
                    case 0:
                        this.filter.sortNumero === 'asc' ? this.filter.sortNumero = 'desc' : this.filter.sortNumero = 'asc';
                        this.sortNome = '';
                        break;
                    case 1:
                        this.filter.sortNome === 'asc' ? this.filter.sortNome = 'desc' : this.filter.sortNome = 'asc';
                        this.filter.sortNumero = '';
                        break;
                }
            },
            getInfoAula: function () {
                let id = this.$route.params.id;
                axios.get("api/aula/atual?" + "&id=" + id).then(response => {
                    this.aulaAtual = response.data;
                });
            },
            statsAluno: function (alunoAula) {
                this.alunoSelect = alunoAula;
                this.aluno = alunoAula.aluno;
                this.aula = alunoAula.aula_id.id;
                axios.get("api/aluno/classificacao?aula=" + this.aula + "&aluno=" + this.aluno.id).then(response => {
                    this.alunoClassificacao = response.data;
                });
            },
            clickCallback: function (page) {
                let variables = '&numero=' + this.filter.numero + '&nome=' + this.filter.nome + '&sortNome=' + this.filter.sortNome + '&sortNumero=' + this.filter.sortNumero;
                this.página = page;
                let id = this.$route.params.id;
                axios.get("api/aula/alunos?page=" + page + "&id=" + id + variables).then(response => {
                    this.alunosAula = response.data.data;
                    this.total = response.data.total;
                });
            },
            getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            }
        },
        computed: {
            pageCount: function () {
                if (this.total) {
                    let pagecount = Math.ceil(this.total / 15);
                    return pagecount;
                } else {
                    return 0;
                }
            }
        },
        watch: {
            filter: {
                deep: true,
                handler() {
                    let variables = '&numero=' + this.filter.numero + '&nome=' + this.filter.nome + '&sortNome=' + this.filter.sortNome + '&sortNumero=' + this.filter.sortNumero;
                    let id = this.$route.params.id;
                    axios.get("api/aula/alunos?page=" + this.página + "&id=" + id + variables).then(response => {
                        this.alunosAula = response.data.data;
                        this.total = response.data.total;
                    });
                }
            },
        },
        mounted() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            var self = this;
            $('#modal-default1').on('hidden.bs.modal', function () {
                self.alunoClassificacao = [];
                self.alunoSelect = null;
            });
            this.timer = setInterval(() => {
                this.getAlunosAula();
                this.getAulaConteudo();
                if(this.alunoSelect != null){
                    this.statsAluno(this.alunoSelect);
                }
            }, 5000);

            this.getAlunosAula();
            this.getInfoAula();
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        async created() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.getAulaConteudo();
        }
    }
</script>

<style scoped>

</style>
