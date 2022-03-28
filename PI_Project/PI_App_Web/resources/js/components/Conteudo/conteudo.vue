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
                    <a class="btn .btn-xs btn-primary" style="margin: 10px;"
                       v-on:click.prevent="viewAdicionarConteudo()">Adicionar
                        Conteúdo</a>
                    <div class="col-md-12">
                        <criar v-if="adicionarConteudo" @save-NewConteudo="saveNewConteudo"
                               @cancel-NewConteudo="cancelNewSConteudo"></criar>
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
                                        <th v-on:click="toogleorder(1)">Tipo
                                            <i class="fa"
                                               v-bind:class="[filter.sortTipo === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(2)">Tema
                                            <i class="fa"
                                               v-bind:class="[filter.sortTema === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(3)">Descrição
                                            <i class="fa"
                                               v-bind:class="[filter.sortDescricao === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
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
                                            <select v-model="filter.tipo" class="search-select form-control">
                                                <option value="" selected>Procurar...</option>
                                                <option value="t">Teórico</option>
                                                <option value="pl">Prático-Laboratorial</option>
                                                <option value="ext">Exercício Teórico</option>
                                                <option value="expl">Exercício Prático-Laboratorial</option>
                                            </select>
                                        </th>
                                        <th>
                                            <input v-model="filter.tema" type="text" class="search-input form-control"
                                                   placeholder="Procurar..."/>
                                        </th>
                                        <th>
                                            <input v-model="filter.descricao" type="text"
                                                   class="search-input form-control"
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
                                        v-for="conteudo in conteudos"
                                        :class="{activerow: viewDetails === conteudo}">
                                        <td>{{conteudo.nome}}</td>
                                        <td>{{conteudo.tipo}}</td>
                                        <td v-if="conteudo.tema">{{conteudo.tema.nome}}</td>
                                        <td v-else>--------------------------</td>
                                        <td v-if="conteudo.descricao == null">--------------------------</td>
                                        <td v-else>{{conteudo.descricao}}</td>
                                        <td>
                                            <a class="btn btn-sm btn-info" v-on:click.prevent="viewDetail(conteudo)">Detalhes</a>
                                            <p></p>
                                            <a class="btn btn-sm btn-danger"
                                               v-on:click.prevent="eliminarConteudo(conteudo)">Eliminar</a>
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
                    <div class="col-md-12">
                        <detalhes v-if="viewDetails" :conteudo="selectedDetail" @save-conteudo="saveConteudo"
                                  @cancel-conteudo="cancelConteudo"></detalhes>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Detalhes from "./detalhes";
    import AdicionarConteudo from "./criar";

    export default {
        components: {
            "detalhes": Detalhes,
            "criar": AdicionarConteudo,
        },
        name: "conteudo",
        data: function () {
            return {
                title: "Lista de Conteudos",
                total: 0,
                conteudos: [],
                página: 1,
                viewDetails: false,
                selectedDetail: null,
                adicionarConteudo: false,
                filter: {
                    nome: '',
                    tipo: '',
                    tema: '',
                    descricao: '',
                    sortNome: '',
                    sortTipo: '',
                    sortTema: '',
                    sortDescricao: ''
                },
                has_errors: false
            }
        },
        methods: {
            limparFiltros: function () {
                this.filter.nome = '';
                this.filter.tipo = '';
                this.filter.tema = '';
                this.filter.descricao = '';
            },
            getConteudos: function () {
                let variables = '&nome=' + this.filter.nome + '&tipo=' + this.filter.tipo + '&tema=' + this.filter.tema + '&descricao=' + this.filter.descricao
                    + '&sortNome=' + this.filter.sortNome + '&sortTipo=' + this.filter.sortTipo + '&sortTema=' + this.filter.sortTema + '&sortDescricao=' + this.filter.sortDescricao;

                axios.get("api/conteudos?page=" + this.página + variables).then(response => {
                    this.conteudos = response.data.data;
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
                        this.filter.sortTipo = '';
                        this.filter.sortTema = '';
                        this.filter.sortDescricao = '';
                        break;
                    case 1:
                        this.filter.sortTipo === 'asc' ? this.filter.sortTipo = 'desc' : this.filter.sortTipo = 'asc';
                        this.filter.sortNome = '';
                        this.filter.sortTema = '';
                        this.filter.sortDescricao = '';
                        break;
                    case 2:
                        this.filter.sortTema === 'asc' ? this.filter.sortTema = 'desc' : this.filter.sortTema = 'asc';
                        this.filter.sortNome = '';
                        this.filter.sortTipo = '';
                        this.filter.sortDescricao = '';
                        break;
                    case 3:
                        this.filter.sortDescricao === 'asc' ? this.filter.sortDescricao = 'desc' : this.filter.sortDescricao = 'asc';
                        this.filter.sortNome = '';
                        this.filter.sortTipo = '';
                        this.filter.sortTema = '';
                        break;
                }
            },
            eliminarConteudo: function (conteudo) {
                axios.delete("api/conteudo/delete/" + conteudo.id).then(response => {
                    this.getConteudos();
                });
            },
            viewAdicionarConteudo: function () {
                this.adicionarConteudo = true;
            },
            saveNewConteudo: function (conteudo) {
                this.has_errors = false;
                this.adicionarConteudo = false;
                axios.post('api/conteudo/new', conteudo)
                    .then(response => {
                        this.adicionarConteudo = false;
                        this.getConteudos();
                        this.$vToastify.success("Conteúdo criado!", "Sucesso!");
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Criar conteúdo!", "Erro!");
                });

            },
            cancelNewSConteudo: function () {
                this.adicionarConteudo = false;
                this.getConteudos();
            },
            viewDetail: function (conteudo) {
                this.selectedDetail = Object.assign({}, conteudo);
                this.viewDetails = conteudo;
                axios.get("api/conteudos?page=" + this.página).then(response => {
                    window.scrollTo(0, document.body.scrollHeight);
                });
            },
            saveConteudo: function (conteudo) {
                this.has_errors = false;
                this.viewDetails = false;
                axios.put('api/conteudo/' + conteudo.id, conteudo)
                    .then(response => {
                        this.selectedDetail = null;
                        this.viewDetails = false;
                        this.getConteudos();
                        this.$vToastify.success("Conteúdo editado!", "Sucesso!");
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Edições de conteúdo!", "Erro!");
                });
            },
            cancelConteudo: function () {
                this.selectedDetail = false;
                this.viewDetails = false;
                this.getConteudos();
            },
            clickCallback: function (page) {
                this.página = page;
                this.viewDetails = false;
                let variables = '&nome=' + this.filter.nome + '&tipo=' + this.filter.tipo + '&tema=' + this.filter.tema + '&descricao=' + this.filter.descricao
                    + '&sortNome=' + this.filter.sortNome + '&sortTipo=' + this.filter.sortTipo + '&sortTema=' + this.filter.sortTema + '&sortDescricao=' + this.filter.sortDescricao;

                axios.get("api/conteudos?page=" + page + variables).then(response => {
                    this.conteudos = response.data.data;
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
                    let variables = '&nome=' + this.filter.nome + '&tipo=' + this.filter.tipo + '&tema=' + this.filter.tema + '&descricao=' + this.filter.descricao
                        + '&sortNome=' + this.filter.sortNome + '&sortTipo=' + this.filter.sortTipo + '&sortTema=' + this.filter.sortTema + '&sortDescricao=' + this.filter.sortDescricao;

                    axios.get("api/conteudos?page=" + this.página + variables).then(response => {
                        this.conteudos = response.data.data;
                        this.total = response.data.total;
                    });
                }
            },
        },
        mounted() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.getConteudos();
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
