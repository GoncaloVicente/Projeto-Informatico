<template>
    <div class="row">
        <div class="jumbotron col-md-12" style="background-color: rgb(48,117,173);">
            <h1 style="text-align: center"><span style="color: white; ">{{title}}</span></h1>
        </div>
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-body no-padding">
                    <div class="modal fade" id="modal-default">
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
                                    <br>
                                    <label>Procurar por Sala</label>
                                    <input v-model="filter.sala" type="text" class="search-input form-control"
                                           placeholder="Procurar..."/>
                                    <br>
                                    <label>Procurar por Aluno</label>
                                    <input v-model="filter.aluno" type="text" class="search-input form-control"
                                           placeholder="Procurar..."/>
                                    <br>
                                    <label>Procurar por Unidade Curricular</label>
                                    <input v-model="filter.uC" type="text" class="search-input form-control"
                                           placeholder="Procurar..."/>
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
                                        <th v-on:click="toogleorder(0)">Pedido
                                            <i class="fa"
                                               v-bind:class="[filter.sortPedido === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(1)">Data
                                            <i class="fa"
                                               v-bind:class="[filter.sortData === 'asc' ? 'fa-sort-numeric-desc' : 'fa-sort-numeric-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(2)">Hora
                                            <i class="fa"
                                               v-bind:class="[filter.sortHora === 'asc' ? 'fa-sort-numeric-desc' : 'fa-sort-numeric-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(3)">Assunto
                                            <i class="fa"
                                               v-bind:class="[filter.sortAssunto === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
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
                                            <select v-model="filter.pedido" class="search-select form-control">
                                                <option value="" selected>Procurar...</option>
                                                <option value="a">Aluno</option>
                                                <option value="p">Professor</option>
                                            </select>
                                        </th>
                                        <th>
                                            <date-picker
                                                v-model="filter.dataInicio"
                                                :input-props='{class: "search-input form-control", placeholder: "Procurar...",}'
                                            />
                                        </th>
                                        <th>
                                            <input v-model="filter.hora" type="time" class="search-input form-control"
                                                   placeholder="Procurar..."/>
                                        </th>
                                        <th>
                                            <input v-model="filter.assunto" type="text"
                                                   class="search-input form-control"
                                                   placeholder="Procurar..."/>
                                        </th>
                                        <th>
                                            <select v-model="filter.estado" class="search-select form-control">
                                                <option value="" selected>Procurar...</option>
                                                <option value="0">Por Confirmar</option>
                                                <option value="1">Confirmado</option>
                                            </select>
                                        </th>
                                        <th>
                                            <button type="button" class="btn btn-default" data-toggle="modal"
                                                    data-target="#modal-default">
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
                                        v-for="tutoria in tutorias"
                                        :class="{activerow: viewDetails === tutoria}"
                                    >
                                        <td>{{tutoria.pedido}}</td>
                                        <td>{{tutoria.data}}</td>
                                        <td>{{tutoria.horaInicio}}</td>
                                        <td>{{tutoria.assunto}}</td>
                                        <td v-if="tutoria.estado == 1">Confirmado</td>
                                        <td v-else>Por confirmar</td>
                                        <td>
                                            <a class="btn btn-sm btn-info"
                                               v-on:click.prevent="viewDetail(tutoria)">Detalhes</a>
                                            <p></p>
                                            <a class="btn btn-sm btn-primary"
                                               v-on:click.prevent="desarquivar(tutoria)">Recuperar</a>
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
                <div class="col-md-12">
                    <detalhes v-if="viewDetails" :tutoria="selectedDetail" @save-tutoria="saveTutoria"
                              @cancel-tutoria="cancelTutoria"></detalhes>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Detalhes from "./detalhes";

    let moment = require('moment-timezone');
    export default {
        components: {
            "detalhes": Detalhes,
        },
        name: "arquivadas",
        data: function () {
            return {
                title: "Lista de Tutorias Arquivadas",
                total: 0,
                tutorias: [],
                página: 1,
                viewDetails: false,
                selectedDetail: null,
                filter: {
                    pedido: '',
                    dataInicio: null,
                    dataFim: null,
                    hora: '',
                    assunto: '',
                    estado: '',
                    sala: '',
                    aluno: '',
                    uC: '',
                    sortPedido: '',
                    sortData: '',
                    sortHora: '',
                    sortAssunto: '',
                    sortEstado: 'asc',
                },
                isSala: ''
            }
        },
        methods: {
            limparFiltros: function () {
                this.filter.pedido = '';
                this.filter.dataInicio = null;
                this.filter.dataFim = null;
                this.filter.hora = '';
                this.filter.assunto = '';
                this.filter.estado = '';
                this.filter.sala = '';
                this.filter.aluno = '';
                this.filter.uC = '';
                this.isSala = '';
            },
            getTutorias: function () {
                let variables = '&pedido=' + this.filter.pedido + '&dataInicio=' + this.filter.dataInicio + '&hora=' + this.filter.hora + '&assunto=' + this.filter.assunto + '&estado=' + this.filter.estado
                    + '&dataFim=' + this.filter.dataFim + '&sala=' + this.filter.sala + '&aluno=' + this.filter.aluno + '&uC=' + this.filter.uC + '&isData=' + this.isSala
                    + '&sortPedido=' + this.filter.sortPedido + '&sortData=' + this.filter.sortData + '&sortHora=' + this.filter.sortHora + '&sortAssunto=' + this.filter.sortAssunto + '&sortEstado=' + this.filter.sortEstado;

                axios.get("api/tutorias/arquivadas?page=" + this.página + variables).then(response => {
                    this.tutorias = response.data.data;
                    this.total = response.data.total;
                }).catch(function (error) {
                    if (error.response) {
                        window.location = '/home';
                    }
                });
            },
            toogleorder: function (position) {
                switch (position) {
                    case 0:
                        this.filter.sortPedido === 'asc' ? this.filter.sortPedido = 'desc' : this.filter.sortPedido = 'asc';
                        this.filter.sortData = '';
                        this.filter.sortHora = '';
                        this.filter.sortAssunto = '';
                        this.filter.sortEstado = '';
                        break;
                    case 1:
                        this.filter.sortData === 'asc' ? this.filter.sortData = 'desc' : this.filter.sortData = 'asc';
                        this.filter.sortPedido = '';
                        this.filter.sortHora = '';
                        this.filter.sortAssunto = '';
                        this.filter.sortEstado = '';
                        break;
                    case 2:
                        this.filter.sortHora === 'asc' ? this.filter.sortHora = 'desc' : this.filter.sortHora = 'asc';
                        this.filter.sortPedido = '';
                        this.filter.sortData = '';
                        this.filter.sortAssunto = '';
                        this.filter.sortEstado = '';
                        break;
                    case 3:
                        this.filter.sortAssunto === 'asc' ? this.filter.sortAssunto = 'desc' : this.filter.sortAssunto = 'asc';
                        this.filter.sortPedido = '';
                        this.filter.sortData = '';
                        this.filter.sortHora = '';
                        this.filter.sortEstado = '';
                        break;
                    case 4:
                        this.filter.sortEstado === 'asc' ? this.filter.sortEstado = 'desc' : this.filter.sortEstado = 'asc';
                        this.filter.sortPedido = '';
                        this.filter.sortData = '';
                        this.filter.sortHora = '';
                        this.filter.sortAssunto = '';
                        break;
                }
            },
            desarquivar: function (tutoria) {
                axios.patch("api/tutorias/desarquivar/" + tutoria.id).then(response => {
                    this.getTutorias();
                });
            },
            viewDetail: function (tutoria) {
                this.selectedDetail = Object.assign({}, tutoria);
                this.selectedDetail.data = moment(this.selectedDetail.data, "DD-MM-YYYY").toDate();
                this.viewDetails = true;
                axios.get("api/tutorias/arquivadas?page=" + this.página).then(response => {
                    window.scrollTo(0, document.body.scrollHeight);
                });
            },
            saveTutoria: function (tutoria) {
                this.viewDetails = false;
                tutoria.data = moment.tz(tutoria.data, "DD-MM-YYYY", "Europe/Lisbon").format('DD-MM-YYYY');
                axios.put('api/tutoria/' + tutoria.id, tutoria)
                    .then(response => {
                        this.selectedDetail = null;
                        this.viewDetails = false;
                        this.getTutorias();
                        this.$vToastify.success("Tutoria editada!", "Sucesso!");
                    }).catch(error => {
                    this.$vToastify.error("Edições de tutoria!", "Erro!");
                });
            },
            cancelTutoria: function () {
                this.selectedDetail = false;
                this.viewDetails = false;
                this.getTutorias();
            },
            clickCallback: function (page) {
                this.viewDetails = false;
                this.página = page;
                let dataini = this.filter.dataInicio != null ? moment(this.filter.dataInicio).format('YYYY-MM-DD') : '';
                let datafim = this.filter.dataFim != null ? moment(this.filter.dataFim).format('YYYY-MM-DD') : '';
                let variables = '&pedido=' + this.filter.pedido + '&dataInicio=' + dataini + '&hora=' + this.filter.hora + '&assunto=' + this.filter.assunto + '&estado=' + this.filter.estado
                    + '&dataFim=' + datafim + '&sala=' + this.filter.sala + '&aluno=' + this.filter.aluno + '&uC=' + this.filter.uC + '&isData=' + this.isSala
                    + '&sortPedido=' + this.filter.sortPedido + '&sortData=' + this.filter.sortData + '&sortHora=' + this.filter.sortHora + '&sortAssunto=' + this.filter.sortAssunto + '&sortEstado=' + this.filter.sortEstado;

                axios.get("api/tutorias/arquivadas?page=" + page + variables).then(response => {
                    this.tutorias = response.data.data;
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

                    let variables = '&pedido=' + this.filter.pedido + '&dataInicio=' + dataini + '&hora=' + this.filter.hora + '&assunto=' + this.filter.assunto + '&estado=' + this.filter.estado
                        + '&dataFim=' + datafim + '&sala=' + this.filter.sala + '&aluno=' + this.filter.aluno + '&uC=' + this.filter.uC + '&isData=' + this.isSala
                        + '&sortPedido=' + this.filter.sortPedido + '&sortData=' + this.filter.sortData + '&sortHora=' + this.filter.sortHora + '&sortAssunto=' + this.filter.sortAssunto + '&sortEstado=' + this.filter.sortEstado;

                    axios.get("api/tutorias/arquivadas?page=" + this.página + variables).then(response => {
                        this.tutorias = response.data.data;
                        this.total = response.data.total;
                    });
                }
            },
        },
        mounted() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.getTutorias();
        }
    }
</script>

<style scoped>
    tr.activerow {
        background: #123456 !important;
        color: #fff !important;
    }

    ::-webkit-input-placeholder {
        color: black;
    }

    :-moz-placeholder { /* Firefox 18- */
        color: black;
    }

    ::-moz-placeholder { /* Firefox 19+ */
        color: black;
    }

    :-ms-input-placeholder {
        color: black;
    }
</style>
