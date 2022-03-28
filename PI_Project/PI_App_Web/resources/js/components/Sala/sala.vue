<template>
    <div class="row">
        <div class="jumbotron col-md-12" style="background-color: rgb(48,117,173);">
            <h1 style="text-align: center"><span style="color: white; ">{{title}}</span></h1>
        </div>
        <div class="col-md-12">
            <div v-if="has_errors">
                <div v-for="error in errors" v-bind:key="error.key" class="alert alert-danger">
                    <span>{{ error }}</span>
                </div>
            </div>
            <div class="box box-primary">
                <div class="box-body no-padding">
                    <a class="btn .btn-xs btn-primary" style="margin: 10px;" v-on:click.prevent="viewAdicionarSala()">Adicionar Sala</a>
                    <div class="col-md-12">
                        <marcar v-if="adicionarAula" @save-NewSala="saveNewSala"
                                @cancel-NewSala="cancelNewSala"></marcar>
                    </div>
                    <br>
                    <div class="table-responsive-grid">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th v-on:click="toogleorder(0)">Nome
                                            <i class="fa"
                                               v-bind:class="[filter.sortNome === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(1)">Professor Associado
                                            <i class="fa"
                                               v-bind:class="[filter.sortProf === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th>Ações</th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input v-model="filter.nome" type="text" class="search-input form-control"
                                                   placeholder="Procurar..."/>
                                        </th>
                                        <th>
                                            <input v-model="filter.professor" type="text" class="search-input form-control"
                                                   placeholder="Procurar..."/>
                                        </th>
                                        <th>
                                            <button class="btn btn-default" v-on:click.prevent="limparFiltros()">
                                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar
                                            </button>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr
                                        v-for="sala in salas"
                                        :class="{activerow: viewDetails === sala}"
                                    >
                                        <td>{{sala.nome}}</td>
                                        <td v-if="sala.gabinete==null">Não é um gabinete</td>
                                        <td v-else>{{sala.gabinete.nome}}</td>
                                        <td>
                                            <a class="btn btn-sm btn-info" v-on:click.prevent="viewDetail(sala)">Detalhes</a>
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
                    <detalhes v-if="viewDetails" :sala="selectedDetail" @save-sala="saveSala"
                              @cancel-sala="cancelSala"></detalhes>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Detalhes from "./detalhes";
    import AdicionarSala from "./criar";

    export default {
        components: {
            "detalhes": Detalhes,
            "marcar": AdicionarSala,
        },
        name: "sala",
        data: function () {
            return {
                title: "Lista de Salas",
                total: 0,
                salas: [],
                página: 1,
                viewDetails: false,
                selectedDetail: null,
                adicionarAula: false,
                filter: {nome: '', professor: '', sortNome: '', sortProf: ''},
                has_errors: ''
            }
        },
        methods: {
            limparFiltros: function () {
                this.filter.nome = '';
                this.filter.professor = '';
            },
            getSalas: function () {
                let variables = '&nome='+this.filter.nome+'&professor='+this.filter.professor
                + '&sortNome='+this.filter.sortNome + '&sortProfessor=' + this.filter.sortProf;
                axios.get("api/salas?page=" + this.página + variables).then(response => {
                    this.salas = response.data.data;
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
                        this.filter.sortNome === 'asc' ? this.filter.sortNome = 'desc' : this.filter.sortNome = 'asc';
                        this.filter.sortProf = '';
                        break;
                    case 1:
                        this.filter.sortProf === 'asc' ? this.filter.sortProf = 'desc' : this.filter.sortProf = 'asc';
                        this.filter.sortNome = '';
                        break;
                }
            },
            viewAdicionarSala: function () {
                this.adicionarAula = true;
            },
            saveNewSala: function (sala) {
                this.has_errors = false;
                this.adicionarAula = false;
                axios.post('api/sala/new', sala)
                    .then(response => {
                        this.adicionarAula = false;
                        this.getSalas();
                        this.$vToastify.success("Sala criada!", "Sucesso!");
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Criar sala!", "Erro!");
                });

            },
            cancelNewSala: function () {
                this.adicionarAula = false;
                this.getSalas();
            },
            viewDetail: function (sala) {
                this.selectedDetail = Object.assign({}, sala);
                this.viewDetails = sala;
                axios.get("api/salas?page=" + this.página).then(response => {
                    window.scrollTo(0,document.body.scrollHeight);
                });
            },
            saveSala: function (sala) {
                this.has_errors = false;
                this.viewDetails = false;
                axios.put('api/sala/' + sala.id, sala)
                    .then(response => {
                        this.selectedDetail = null;
                        this.viewDetails = false;
                        this.getSalas();
                        this.$vToastify.success("Sala editada!", "Sucesso!");
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Edições de sala!", "Erro!");
                });
            },
            cancelSala: function () {
                this.selectedDetail = false;
                this.viewDetails = false;
                this.getSalas();
            },
            clickCallback: function (page) {
                this.página = page;
                let variables = '&nome='+this.filter.nome+'&professor='+this.filter.professor + '&sortNome='+this.filter.sortNome + '&sortProfessor=' + this.filter.sortProf;

                axios.get("api/salas?page=" + page + variables).then(response => {
                    this.salas = response.data.data;
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
        watch:{
            filter: {
                deep: true,
                handler() {
                    let variables = '&nome='+this.filter.nome+'&professor='+this.filter.professor + '&sortNome='+this.filter.sortNome + '&sortProfessor=' + this.filter.sortProf;
                    axios.get("api/salas?page=" + this.página + variables).then(response => {
                        this.salas = response.data.data;
                        this.total = response.data.total;
                    });
                }
            },
        },
        mounted() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.getSalas();
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

    ::-moz-placeholder {  /* Firefox 19+ */
        color: black;
    }

    :-ms-input-placeholder {
        color: black;
    }
</style>
