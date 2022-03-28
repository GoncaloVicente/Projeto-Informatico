<template>
    <div class="row">
        <div class="jumbotron col-md-12" style="background-color: rgb(48,117,173);">
            <h1 style="text-align: center"><span style="color: white; ">{{title}}</span></h1>
        </div>
        <div class="col-md-12">
            <aulaConteudo :temas=this.temas :conteudosAssociados=this.conteudosAssociados
                          @save-aulaConteudo="saveAulaConteudo"></aulaConteudo>
        </div>
        <div class="col-md-12">
            <addAulaConteudo :temas=this.temas :conteudosAssociados=this.conteudosAssociados
                             @save-aulaconteudo="saveAulaconteudo"></addAulaConteudo>
        </div>
        <div class="col-md-12">
            <div v-if="has_errors">
                <div v-for="error in errors" v-bind:key="error.key" class="alert alert-danger">
                    <span>{{ error }}</span>
                </div>
            </div>
            <div class="box box-primary">
                <div class="box-body no-padding">
                    <a class="btn .btn-xs btn-primary" style="margin: 10px;" v-on:click.prevent="viewCriarAula()">Adicionar
                        aula</a>
                    <div class="col-md-12">
                        <criar v-if="criarAula" @save-NewAula="saveNewAula"
                               @cancel-NewAula="cancelNewAula"></criar>
                    </div>
                    <br>
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
                                            <a v-if="aula.estado=='0'" type="button" id="modal1"
                                               class="btn btn-sm btn-warning"
                                               data-toggle="modal"
                                               data-target="#modal-default1" v-on:click.prevent="addAulaConteudo(aula)">
                                                Adicionar Conteúdos
                                            </a>
                                            <p v-if="aula.estado=='0'"></p>
                                            <a v-if="aula.estado=='0'" class="btn btn-sm btn-info"
                                               v-on:click.prevent="viewDetail(aula)">Detalhes</a>
                                            <p v-if="aula.estado=='0'"></p>
                                            <a v-if="aula.estado=='0'" class="btn btn-sm btn-success"
                                               v-on:click.prevent="gerarCodigo(aula)">Gerar Código</a>
                                            <p v-if="aula.estado=='0'"></p>
                                            <a v-if="aula.estado=='0'" class="btn btn-sm btn-danger"
                                               v-on:click.prevent="terminarAula(aula)">Terminar Aula</a>
                                            <a v-else class="btn btn-sm btn-warning"
                                               v-on:click.prevent="iniciarAula(aula)">Iniciar
                                                Aula</a>
                                            <p v-if="aula.estado=='1'"></p>
                                            <a v-if="aula.estado=='1'"
                                               class="btn btn-sm btn-primary"
                                               v-on:click.prevent="arquivar(aula)">Arquivar</a>
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
                              @save-aula="saveAula"
                              @cancel-aula="cancelAula"></detalhes>
                </div>
                <div id="aulaConteudo" class="col-md-6">
                    <aulaComCobteudo v-if="viewAulaConteudo" :aulaConteudo="aulaConteudo" @save-aula="saveAula"
                                     @cancel-aulaConteudo="cancelAulaConteudo"></aulaComCobteudo>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    const Swal = require('sweetalert2');
    import CriarAula from "./criar";
    import DetalhesAula from "./detalhes";
    import AulaConteudo from "./aulaConteudo";
    import AulaComConteudo from "./aulaComConteudo";
    import AdicionarAulaConteudo from "./adicionarAulaConteudo";

    let moment = require('moment-timezone');

    export default {
        components: {
            "criar": CriarAula,
            "detalhes": DetalhesAula,
            "aulaConteudo": AulaConteudo,
            "aulaComCobteudo": AulaComConteudo,
            "addAulaConteudo": AdicionarAulaConteudo,
        },
        name: "aula",
        data: function () {
            return {
                title: "Lista de Aulas",
                total: 0,
                aulas: [],
                página: 1,
                codigo: null,
                criarAula: false,
                viewDetails: false,
                selectedDetail: null,
                temas: [],
                novaAula: [],
                url: null,
                viewAulaConteudo: false,
                aulaConteudo: [],
                conteudosAssociados: [],
                aula: 0,
                filter: {
                    codigo: '', dataInicio: null, dataFim: null, professor: '', uC: '',
                    estado: '',
                    sortCodigo: '',
                    sortData: '',
                    sortProfessor: '',
                    sortUc: '',
                    sortEstado: 'asc',
                },
                isSala: '',
                isClassificacao: false,
                has_errors: false
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
                axios.get("api/aulas?page=" + this.página + variables).then(response => {
                    this.aulas = response.data.data;
                    this.total = response.data.total;
                }).catch(function (error) {
                    if (error.response) {
                        window.location = '/unauthorized';
                    }
                });            },
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
            arquivar: function (aula) {
                axios.patch("api/aula/arquivar/" + aula.id).then(response => {
                    this.getAulas();
                });
            },
            terminarAula: function (aula) {
                axios.patch("api/aula/terminar/" + aula.id).then(response => {
                    this.getAulas();
                });
            },
            iniciarAula: function (aula) {
                axios.patch("api/aula/iniciar/" + aula.id).then(response => {
                    this.getAulas();
                    Swal.fire({
                        title: '\nNovo código de acesso\n\n' + response.data,
                        icon: 'success',
                        width: '800px'
                    })
                    this.$vToastify.success("Nova aula inicializada!", "Sucesso!");
                });

            },
            gerarCodigo: function (aula) {
                this.codigo = Math.floor(Math.random() * (1000 + 8000) + 1000);
                let stringCodigo = aula.id.toString() + this.codigo.toString();
                axios.patch("api/aula/codigo/" + aula.id, stringCodigo).then(response => {
                    this.getAulas();
                });
                Swal.fire({
                    title: '\nNovo código de acesso\n\n' + stringCodigo,
                    icon: 'question',
                    width: '800px'
                });
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
            addAulaConteudo: function (aula) {
                this.aula = aula.id;
                axios.get("api/tema/conteudo?aula=" + aula.id).then(response => {
                    this.temas = response.data;
                });
            },
            viewCriarAula: function () {
                this.criarAula = true;
            },
            saveNewAula: function (aula) {
                this.has_errors = false;
                aula.data = moment.tz(aula.data, "DD-MM-YYYY", "Europe/Lisbon").format('DD-MM-YYYY');
                this.criarAula = false;
                aula.codigo = Math.floor(Math.random() * (1000 + 8000) + 1000);
                axios.post('api/aula/new', aula)
                    .then(response => {
                        this.criarAula = false;
                        this.novaAula = aula;
                        Swal.fire({
                            title: 'Deseja adicionar conteúdos à aula?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Adicionar conteúdos!',
                            cancelButtonText: "Mais tarde!",
                            width: '800px',
                        }).then((result) => {
                            this.aula = response.data;
                            this.aula = aula.id;
                            this.codigo = response.data.codigo;
                            axios.get("api/tema/conteudo?aula=" + response.data.id).then(response => {
                                this.temas = response.data;
                            });
                            if (result.value) {
                                document.getElementById("modal").click();
                                this.getAulas();
                            } else {
                                this.getAulas();
                                this.$vToastify.success("Aula criada!", "Sucesso!");
                                Swal.fire({
                                    icon: 'success',
                                    title: '\nCódigo de acesso\n\n' + response.data.codigo,
                                    width: '800px'
                                })
                            }
                        })
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Criar aula!", "Erro!");
                });
            },
            cancelNewAula: function () {
                this.criarAula = false;
                this.getAulas();
            },
            saveAula: function (aula) {
                this.has_errors = false;
                this.viewDetails = false;
                aula.data = moment.tz(aula.data, "DD-MM-YYYY", "Europe/Lisbon").format('DD-MM-YYYY');
                axios.put('api/aula/' + aula.id, aula)
                    .then(response => {
                        this.viewDetails = false;
                        this.viewAulaConteudo = false;
                        this.selectedDetail = null;
                        this.getAulas();
                        this.$vToastify.success("Aula editada!", "Sucesso!");
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Edições de aula!", "Erro!");
                });
                var element = document.getElementById("aulaConteudo");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
            },
            cancelAula: function () {
                var element = document.getElementById("aulaConteudo");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
                this.selectedDetail = false;
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
            saveAulaconteudo: function (destination) {
                axios.post('api/aula/conteudos/' + this.aula, destination)
                    .then(response => {
                        this.getAulas();
                        document.getElementById("modal1").click();
                        this.$vToastify.success("Adicionado conteúdo à aula!", "Sucesso!");
                    }).catch(error => {
                    this.$vToastify.error("Adicionar conteúdo à aula!", "Erro!");
                });
            },
            saveAulaConteudo: function (destination) {
                axios.post('api/aula/conteudo', destination)
                    .then(response => {
                        this.getAulas();
                        document.getElementById("modal").click();
                        this.$vToastify.success("Adicionado conteúdo à aula!", "Sucesso!");
                    }).catch(error => {
                    this.$vToastify.error("Adicionar conteúdo à aula!", "Erro!");
                });
                Swal.fire({
                    title: '\nCódigo de acesso\n\n' + this.codigo,
                    icon: 'success',
                    width: '800px'
                })
            },
            clickCallback: function (page) {
                this.viewDetails = false;
                this.viewAulaConteudo = false;

                this.página = page;
                let dataini = this.filter.dataInicio != null ? moment(this.filter.dataInicio).format('YYYY-MM-DD') : '';
                let datafim = this.filter.dataFim != null ? moment(this.filter.dataFim).format('YYYY-MM-DD') : '';

                let variables = '&codigo=' + this.filter.codigo + '&dataInicio=' + dataini + '&estado=' + this.filter.estado
                    + '&dataFim=' + datafim + '&professor=' + this.filter.professor + '&uC=' + this.filter.uC + '&isData=' + this.isSala + '&sortCodigo=' + this.filter.sortCodigo + '&sortData=' + this.filter.sortData + '&sortProfessor=' + this.filter.sortProfessor + '&sortUc=' + this.filter.sortUc + '&sortEstado=' + this.filter.sortEstado;
                axios.get("api/aulas?page=" + page + variables).then(response => {
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
                    this.viewDetails = false;
                    this.viewAulaConteudo = false;

                    let dataini = this.filter.dataInicio != null ? moment(this.filter.dataInicio).format('YYYY-MM-DD') : '';
                    let datafim = this.filter.dataFim != null ? moment(this.filter.dataFim).format('YYYY-MM-DD') : '';

                    let variables = '&codigo=' + this.filter.codigo + '&dataInicio=' + dataini + '&estado=' + this.filter.estado
                        + '&dataFim=' + datafim + '&professor=' + this.filter.professor + '&uC=' + this.filter.uC + '&isData=' + this.isSala + '&sortCodigo=' + this.filter.sortCodigo + '&sortData=' + this.filter.sortData + '&sortProfessor=' + this.filter.sortProfessor + '&sortUc=' + this.filter.sortUc + '&sortEstado=' + this.filter.sortEstado;
                    axios.get("api/aulas?page=" + this.página + variables).then(response => {
                        this.aulas = response.data.data;
                        this.total = response.data.total;
                    });
                }
            },
        },
        mounted() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.getAulas();
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
