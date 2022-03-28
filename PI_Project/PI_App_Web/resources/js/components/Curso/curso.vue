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
                    <a class="btn .btn-xs btn-primary" style="margin: 10px;" v-on:click.prevent="viewAdicionarCurso()">Adicionar Curso</a>
                    <div class="col-md-12">
                        <criar v-if="adicionarCurso" @save-NewCurso="saveNewCurso"
                               @cancel-NewCurso="cancelNewCurso"></criar>
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
                                        <th>Ações</th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input v-model="filter.nome" type="text" class="search-input form-control"
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
                                        v-for="curso in cursos"
                                        :class="{activerow: viewCursoUc === curso}">
                                        <td>{{curso.nome}}</td>
                                        <td>
                                            <a v-if="curso.estado=='1'" class="btn btn-sm btn-info"
                                               v-on:click.prevent="viewDetail(curso)">Detalhes</a>
                                            <p v-if="curso.estado=='1'"></p>
                                            <a v-if="curso.estado=='1'" class="btn btn-sm btn-danger"
                                               v-on:click.prevent="desativarCurso(curso)">Desativar</a>
                                            <a v-else class="btn btn-sm btn-warning"
                                               v-on:click.prevent="ativarCurso(curso)">Ativar</a>
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
                <div id="cursoUc" class="col-md-12">
                    <cursoUc v-if="viewCursoUc" :curso-uc="cursoUc" @cancel-cursoUc="cancelCursoUc"></cursoUc>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AdicionarCurso from "./criar";
    import CursoUc from "./cursoUnidadeCurricular"

    export default {
        components: {
            "criar": AdicionarCurso,
            "cursoUc": CursoUc
        },
        name: "curso",
        data: function () {
            return {
                title: "Lista de Cursos",
                total: 0,
                cursos: [],
                página: 1,
                selectedDetail: null,
                adicionarCurso: false,
                cursoUc: [],
                viewCursoUc: false,
                filter: {nome: '', sortNome: ''},
                has_errors: false
            }
        },
        methods: {
            limparFiltros: function () {
                this.filter.nome = '';
            },
            getCursos: function () {
                let variables = '&nome=' + this.filter.nome + '&sortNome=' + this.filter.sortNome;
                axios.get("api/cursos?page=" + this.página + variables).then(response => {
                    this.cursos = response.data.data;
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
                        break;
                }
            },
            ativarCurso: function (curso) {
                axios.patch("api/curso/ativar/" + curso.id).then(response => {
                    this.getCursos();
                });
            },
            desativarCurso: function (curso) {
                axios.patch("api/curso/desativar/" + curso.id).then(response => {
                    this.getCursos();
                });
            },
            viewAdicionarCurso: function () {
                this.adicionarCurso = true;
            },
            saveNewCurso: function (curso) {
                this.has_errors = false;
                this.adicionarCurso = false;
                axios.post('api/curso/new', curso)
                    .then(response => {
                        this.adicionarCurso = false;
                        this.getCursos();
                        this.$vToastify.success("Curso criado!", "Sucesso!");
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Criar curso!", "Erro!");
                });

            },
            cancelNewCurso: function () {
                this.adicionarCurso = false;
                this.getCursos();
            },
            cancelCursoUc: function () {
                this.viewCursoUc = false;
                this.getCursos();
            },
            viewDetail: function (curso) {
                this.selectedDetail = Object.assign({}, curso);
                this.viewCursoUc = curso;
                axios.get("api/curso/uc?curso=" + curso.id).then(response => {
                    this.cursoUc = response.data.data;
                    window.scrollTo(0, document.body.scrollHeight);
                });
            },
            clickCallback: function (page) {
                this.página = page;
                this.viewCursoUc = false;
                let variables = '&nome=' + this.filter.nome + '&sortNome=' + this.filter.sortNome;

                axios.get("api/cursos?page=" + page + variables).then(response => {
                    this.cursos = response.data.data;
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
                    let variables = '&nome=' + this.filter.nome + '&sortNome=' + this.filter.sortNome;
                    axios.get("api/cursos?page=" + this.página + variables).then(response => {
                        this.cursos = response.data.data;
                        this.total = response.data.total;
                    });
                }
            },
        },
        mounted() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.getCursos();
        },
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
