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
                    <a class="btn .btn-xs btn-primary" style="margin: 10px;" v-on:click.prevent="viewAdicionarTema()">Adicionar
                        Tema</a>
                    <div class="col-md-12">
                        <marcar v-if="adicionarTema" @save-NewTema="saveNewTema"
                                @cancel-NewTema="cancelNewTema"></marcar>
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
                                        <th v-on:click="toogleorder(1)">Professor
                                            <i class="fa"
                                               v-bind:class="[filter.sortProfessor === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(2)">Unidade Curricular
                                            <i class="fa"
                                               v-bind:class="[filter.sortUc === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
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
                                            <input v-model="filter.professor" type="text"
                                                   class="search-input form-control"
                                                   placeholder="Procurar..."/>
                                        </th>
                                        <th>
                                            <input v-model="filter.uC" type="text" class="search-input form-control"
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
                                        v-for="tema in temas"
                                        :class="{activerow: viewDetails === tema}"
                                    >
                                        <td>{{tema.nome}}</td>
                                        <td>{{tema.professor.nome}}</td>
                                        <td>{{tema.uC.nome}}</td>
                                        <td>
                                            <a class="btn btn-sm btn-info" v-on:click.prevent="viewDetail(tema)">Detalhes</a>
                                            <p></p>
                                            <a class="btn btn-sm btn-danger" v-on:click.prevent="eliminarTema(tema)">Eliminar</a>
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
                <div id="detalhesTema" class="col-md-6">
                    <detalhes v-if="viewDetails" :tema="selectedDetail" @save-tema="saveTema"
                              @cancel-tema="cancelTema"></detalhes>
                </div>
                <div id="temaConteudo" class="col-md-6">
                    <temaConteudo v-if="viewTemaConteudo" :temaConteudo=temaConteudo
                                  @cancel-TemaConteudo="cancelTemaConteudo"></temaConteudo>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Detalhes from "./detalhes";
    import AdicionarTema from "./criar";
    import TemaConteudo from "./temaConteudo";

    export default {
        components: {
            "detalhes": Detalhes,
            "marcar": AdicionarTema,
            "temaConteudo": TemaConteudo,
        },
        name: "tema",
        data: function () {
            return {
                title: "Lista de Temas",
                total: 0,
                temas: [],
                página: 1,
                viewDetails: false,
                selectedDetail: null,
                adicionarTema: false,
                temaConteudo: [],
                viewTemaConteudo: false,
                filter: {nome: '', professor: '', uC: '', sortNome: '', sortProfessor: '', sortUc: ''},
                has_errors: ''
            }
        },
        methods: {
            limparFiltros: function () {
                this.filter.nome = '';
                this.filter.professor = '';
                this.filter.uC = '';
            },
            getTemas: function () {
                let variables = '&nome=' + this.filter.nome + '&professor=' + this.filter.professor + '&uC=' + this.filter.uC
                    + '&sortNome=' + this.filter.sortNome + '&sortProfessor=' + this.filter.sortProfessor + '&sortUc=' + this.filter.sortUc;
                axios.get("api/temas?page=" + this.página + variables).then(response => {
                    this.temas = response.data.data;
                    this.total = response.data.total;
                }).catch(function (error) {
                    if (error.response) {
                        window.location = '/unauthorized';
                    }
                });            },
            toogleorder: function (position) {
                switch (position) {
                    case 0:
                        this.filter.sortNome === 'asc' ? this.filter.sortNome = 'desc' : this.filter.sortNome = 'asc';
                        this.filter.sortProfessor = '';
                        this.filter.sortUc = '';
                        break;
                    case 1:
                        this.filter.sortProfessor === 'asc' ? this.filter.sortProfessor = 'desc' : this.filter.sortProfessor = 'asc';
                        this.filter.sortNome = '';
                        this.filter.sortUc = '';
                        break;
                    case 2:
                        this.filter.sortUc === 'asc' ? this.filter.sortUc = 'desc' : this.filter.sortUc = 'asc';
                        this.filter.sortNome = '';
                        this.filter.sortProfessor = '';
                        break;
                }
            },
            eliminarTema: function (tema) {
                axios.delete("api/tema/delete/" + tema.id).then(response => {
                    this.getTemas();
                });
            },
            viewAdicionarTema: function () {
                this.adicionarTema = true;
            },
            saveNewTema: function (tema) {
                this.has_errors = false;
                this.adicionarAula = false;
                axios.post('api/tema/new', tema)
                    .then(response => {
                        this.adicionarTema = false;
                        this.getTemas();
                        this.$vToastify.success("Tema criado!", "Sucesso!");
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Criar tema!", "Erro!");
                });

            },
            cancelNewTema: function () {
                this.adicionarTema = false;
                this.getTemas();
            },
            viewDetail: function (tema) {
                document.getElementById("detalhesTema").setAttribute('class', 'col-md-6');
                document.getElementById("temaConteudo").setAttribute('class', 'col-md-6');
                this.selectedDetail = Object.assign({}, tema);
                this.viewDetails = tema;
                this.viewTemaConteudo = true;
                axios.get("api/tema/conteudos?tema=" + tema.id).then(response => {
                    this.temaConteudo = response.data.data;
                    window.scrollTo(0, document.body.scrollHeight);
                });
            },
            saveTema: function (tema) {
                this.has_errors = false;
                this.viewDetails = false;
                axios.put('api/tema/' + tema.id, tema)
                    .then(response => {
                        this.selectedDetail = null;
                        this.viewTemaConteudo = false;
                        this.viewDetails = false;
                        this.getTemas();
                        this.$vToastify.success("Tema editado!", "Sucesso!");
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Edições de tema!", "Erro!");
                });
                var element = document.getElementById("temaConteudo");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
            },
            cancelTemaConteudo: function () {
                this.viewTemaConteudo = false;
                var element = document.getElementById("detalhesTema");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
            },
            cancelTema: function () {
                this.selectedDetail = false;
                this.viewDetails = false;
                this.getTemas();
                var element = document.getElementById("temaConteudo");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
            },
            clickCallback: function (page) {
                this.viewDetails = false;
                this.viewTemaConteudo = false;
                this.página = page;
                let variables = '&nome=' + this.filter.nome + '&professor=' + this.filter.professor + '&uC=' + this.filter.uC
                    + '&sortNome=' + this.filter.sortNome + '&sortProfessor=' + this.filter.sortProfessor + '&sortUc=' + this.filter.sortUc;
                axios.get("api/temas?page=" + page + variables).then(response => {
                    this.temas = response.data.data;
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
                    let variables = '&nome=' + this.filter.nome + '&professor=' + this.filter.professor + '&uC=' + this.filter.uC
                        + '&sortNome=' + this.filter.sortNome + '&sortProfessor=' + this.filter.sortProfessor + '&sortUc=' + this.filter.sortUc;

                    axios.get("api/temas?page=" + this.página + variables).then(response => {
                        this.temas = response.data.data;
                        this.total = response.data.total;
                    });
                }
            },
        },
        mounted() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.getTemas();
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
