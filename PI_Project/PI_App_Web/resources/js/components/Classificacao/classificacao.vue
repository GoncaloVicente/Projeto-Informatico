<template>
    <div class="row">
        <div class="jumbotron col-md-12" style="background-color: rgb(48,117,173);">
            <h1 style="text-align: center"><span style="color: white; ">{{title}}</span></h1>
        </div>
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-body no-padding">
                    <div class="modal fade" id="modal-default2">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title">Procurar...</h4>
                                </div>
                                <div class="modal-body">
                                    <label>Intervalo de Datas</label>
                                    <input type="checkbox" id="isSala" name="isSala" value="1" v-model="isSala">
                                    <br>
                                    <label v-if="isSala">Data Inicial</label>
                                    <date-picker v-if="isSala"
                                                 v-model="filter.dataInicio"
                                                 :input-props='{class: "search-input form-control", placeholder: "Procurar...",}'
                                    />
                                    <br v-if="isSala">
                                    <label v-if="isSala">Data Final</label>
                                    <date-picker v-if="isSala"
                                                 v-model="filter.dataFim"
                                                 :input-props='{class: "search-input form-control", placeholder: "Procurar...",}'
                                    />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Fechar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive-grid" style="min-height: 360px;">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th v-on:click="toogleorder(0)">Código
                                            <i class="fa"
                                               v-bind:class="[filter.sortCodigo === 'asc' ? 'fa-sort-numeric-desc' : 'fa-sort-numeric-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(1)">Data
                                            <i class="fa"
                                               v-bind:class="[filter.sortData === 'asc' ? 'fa-sort-numeric-desc' : 'fa-sort-numeric-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(2)">Professor
                                            <i class="fa"
                                               v-bind:class="[filter.sortProfessor === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(3)">Unidade Curricular
                                            <i class="fa"
                                               v-bind:class="[filter.sortUc === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(4)">Estado
                                            <i class="fa"
                                               v-bind:class="[filter.sortEstado === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th>Ações</th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input v-model="filter.codigo" type="text"
                                                   class="search-input form-control"
                                                   placeholder="Procurar..."/>
                                        </th>
                                        <th>
                                            <date-picker
                                                v-model="filter.dataInicio"
                                                :input-props='{class: "search-input form-control", placeholder: "Procurar...",}'
                                            />
                                        </th>
                                        <th>
                                            <input v-model="filter.professor" type="text"
                                                   class="search-input form-control"
                                                   placeholder="Procurar..."/>
                                        </th>
                                        <th>
                                            <input v-model="filter.uC" type="text"
                                                   class="search-input form-control"
                                                   placeholder="Procurar..."/>
                                        </th>
                                        <th>
                                            <select v-model="filter.estado" class="search-select form-control">
                                                <option value="" selected>Procurar...</option>
                                                <option value="0">A decorrer</option>
                                                <option value="1">Terminada</option>
                                            </select>
                                        </th>
                                        <th>
                                            <button type="button" class="btn btn-default" data-toggle="modal"
                                                    data-target="#modal-default2">
                                                Mais filtros
                                            </button>
                                            <button class="btn btn-default" v-on:click.prevent="limparFiltros()">
                                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar
                                            </button>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr
                                        v-for="aula in aulas"
                                        :class="{activerow: viewDetails === aula}"
                                    >
                                        <td>{{aula.codigo}}</td>
                                        <td>{{ aula.data }}</td>
                                        <td>{{aula.professor.nome}}</td>
                                        <td>{{aula.unidade_curricular.nome}}</td>
                                        <td v-if="aula.estado==1" style="color:red;">Terminada</td>
                                        <td v-if="aula.estado==0">A decorrer</td>
                                        <td>
                                            <a class="btn btn-sm btn-info"
                                               v-on:click.prevent="viewDetail(aula)">Detalhes</a>
                                            <p></p>
                                            <router-link :to="{ name: 'estatisticas',  params: { id: aula.id }}">
                                                <a class="btn btn-sm btn-success">Ver
                                                estatísticas</a></router-link>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
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
                <div id="detalhesAula" class="col-md-6">
                    <detalhes v-if="viewDetails" :aula="selectedDetail" :isClassificacao="isClassificacao"
                              @cancel-aula="cancelAula"></detalhes>
                </div>
                <div id="aulaConteudo" class="col-md-6">
                    <aulaComCobteudo v-if="viewAulaConteudo" :aulaConteudo="aulaConteudo"
                                     @cancel-aulaConteudo="cancelAulaConteudo"></aulaComCobteudo>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import DetalhesAula from "../Aula/detalhes";
    import AulaComConteudo from "../Aula/aulaComConteudo";

    let moment = require('moment-timezone');
    export default {
        components: {
            "detalhes": DetalhesAula,
            "aulaComCobteudo": AulaComConteudo,
        },
        name: "classificacao",
        data: function () {
            return {
                title: "Lista de Aulas com Classificações",
                total: 0,
                aulas: [],
                página: 1,
                viewDetails: false,
                selectedDetail: null,
                temas: [],
                viewAulaConteudo: false,
                aulaConteudo: [],
                filter: {
                    codigo: '',
                    dataInicio: null,
                    dataFim: null,
                    professor: '',
                    uC: '',
                    estado: '',
                    sortCodigo: '',
                    sortData: '',
                    sortProfessor: '',
                    sortUc: '',
                    sortEstado: 'asc',
                },
                isSala: '',
                isClassificacao: true,
            }
        },
        methods: {
            limparFiltros: function () {
                this.filter.codigo = '';
                this.filter.dataInicio = null;
                this.filter.dataFim = null;
                this.filter.professor = '';
                this.filter.estado = '';
                this.filter.uC = '';
                this.isSala = '';
            },
            getAulas: function () {
                let variables = '&codigo=' + this.filter.codigo + '&dataInicio=' + this.filter.dataInicio + '&estado=' + this.filter.estado
                    + '&dataFim=' + this.filter.dataFim + '&professor=' + this.filter.professor + '&uC=' + this.filter.uC + '&isData=' + this.isSala + '&sortCodigo=' + this.filter.sortCodigo + '&sortData=' + this.filter.sortData + '&sortProfessor=' + this.filter.sortProfessor + '&sortUc=' + this.filter.sortUc + '&sortEstado=' + this.filter.sortEstado;
                axios.get("api/aulas/classificadas?page=" + this.página + variables).then(response => {
                    this.aulas = response.data.data;
                    this.total = response.data.total;
                }).catch(function (error) {
                    if (error.response) {
                        window.location = '/unauthorized';
                    }
                });
            },
            toogleorder: function (position) {
                switch (position) {
                    case 0:
                        this.filter.sortCodigo === 'asc' ? this.filter.sortCodigo = 'desc' : this.filter.sortCodigo = 'asc';
                        this.filter.sortData = '';
                        this.filter.sortProfessor = '';
                        this.filter.sortUc = '';
                        this.filter.sortEstado = '';
                        break;
                    case 1:
                        this.filter.sortData === 'asc' ? this.filter.sortData = 'desc' : this.filter.sortData = 'asc';
                        this.filter.sortCodigo = '';
                        this.filter.sortProfessor = '';
                        this.filter.sortUc = '';
                        this.filter.sortEstado = '';
                        break;
                    case 2:
                        this.filter.sortProfessor === 'asc' ? this.filter.sortProfessor = 'desc' : this.filter.sortProfessor = 'asc';
                        this.filter.sortCodigo = '';
                        this.filter.sortData = '';
                        this.filter.sortUc = '';
                        this.filter.sortEstado = '';
                        break;
                    case 3:
                        this.filter.sortUc === 'asc' ? this.filter.sortUc = 'desc' : this.filter.sortUc = 'asc';
                        this.filter.sortCodigo = '';
                        this.filter.sortData = '';
                        this.filter.sortProfessor = '';
                        this.filter.sortEstado = '';
                        break;
                    case 4:
                        this.filter.sortEstado === 'asc' ? this.filter.sortEstado = 'desc' : this.filter.sortEstado = 'asc';
                        this.filter.sortCodigo = '';
                        this.filter.sortData = '';
                        this.filter.sortProfessor = '';
                        this.filter.sortUc = '';
                        break;
                }
            },
            cancelAula: function () {
                var element = document.getElementById("aulaConteudo");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
                this.viewDetails = false;
                this.getAulas();
            },
            cancelAulaConteudo: function () {
                var element = document.getElementById("detalhesAula");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
                this.viewAulaConteudo = false;
                this.getAulas();
            },
            viewDetail: function (aula) {
                document.getElementById("detalhesAula").setAttribute('class', 'col-md-6');
                document.getElementById("aulaConteudo").setAttribute('class', 'col-md-6');
                this.selectedDetail = Object.assign({}, aula);
                this.viewDetails = aula;
                this.viewAulaConteudo = aula;
                this.selectedDetail.data = moment(this.selectedDetail.data, "DD-MM-YYYY").toDate();
                axios.get("api/aulas/conteudo?aula=" + aula.id).then(response => {
                    this.aulaConteudo = response.data.data;
                    window.scrollTo(0, document.body.scrollHeight);
                });
            },
            clickCallback: function (page) {
                this.viewDetails = false;
                this.viewAulaConteudo = false;
                this.página = page;
                let dataini = this.filter.dataInicio != null ? moment(this.filter.dataInicio).format('YYYY-MM-DD') : '';
                let datafim = this.filter.dataFim != null ? moment(this.filter.dataFim).format('YYYY-MM-DD') : '';

                let variables = '&codigo=' + this.filter.codigo + '&dataInicio=' + dataini + '&estado=' + this.filter.estado
                    + '&dataFim=' + datafim + '&professor=' + this.filter.professor + '&uC=' + this.filter.uC + '&isData=' + this.isSala+ '&sortCodigo=' + this.filter.sortCodigo + '&sortData=' + this.filter.sortData + '&sortProfessor=' + this.filter.sortProfessor + '&sortUc=' + this.filter.sortUc + '&sortEstado=' + this.filter.sortEstado;
                axios.get("api/aulas/classificadas?page=" + page + variables).then(response => {
                    this.aulas = response.data.data;
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
                    let dataini = this.filter.dataInicio != null ? moment(this.filter.dataInicio).format('YYYY-MM-DD') : '';
                    let datafim = this.filter.dataFim != null ? moment(this.filter.dataFim).format('YYYY-MM-DD') : '';
                    let variables = '&codigo=' + this.filter.codigo + '&dataInicio=' + dataini + '&estado=' + this.filter.estado
                        + '&dataFim=' + datafim + '&professor=' + this.filter.professor + '&uC=' + this.filter.uC + '&isData=' + this.isSala + '&sortCodigo=' + this.filter.sortCodigo + '&sortData=' + this.filter.sortData + '&sortProfessor=' + this.filter.sortProfessor + '&sortUc=' + this.filter.sortUc + '&sortEstado=' + this.filter.sortEstado;
                    axios.get("api/aulas/classificadas?page=" + this.página + variables).then(response => {
                        this.aulas = response.data.data;
                        this.total = response.data.total;
                    });
                }
            },
        },
        mounted() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.getAulas();
        },

    }
</script>

<style scoped>
    tr.activerow {
        background: #123456 !important;
        color: #fff !important;
    }
</style>
