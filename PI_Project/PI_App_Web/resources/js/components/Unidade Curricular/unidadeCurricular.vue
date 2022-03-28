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
                    <a v-if="this.$root.user == 'o'" class="btn .btn-xs btn-primary" style="margin: 10px;"
                       v-on:click.prevent="viewAdicionarUC()">Adicionar Unidade
                        Curricular</a>
                    <div class="col-md-12">
                        <marcar v-if="adicionarUC" @save-NewUC="saveNewUC"
                                @cancel-NewUC="cancelNewUC"></marcar>
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
                                        <th v-on:click="toogleorder(1)">Semestre
                                            <i class="fa"
                                               v-bind:class="[filter.sortSemestre === 'asc' ? 'fa-sort-numeric-desc' : 'fa-sort-numeric-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(2)">Ano
                                            <i class="fa"
                                               v-bind:class="[filter.sortAno === 'asc' ? 'fa-sort-numeric-desc' : 'fa-sort-numeric-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(3)">Ano Letivo
                                            <i class="fa"
                                               v-bind:class="[filter.sortAnoLetivo === 'asc' ? 'fa-sort-numeric-desc' : 'fa-sort-numeric-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(4)">Curso
                                            <i class="fa"
                                               v-bind:class="[filter.sortCurso === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(5)">Estado
                                            <i class="fa"
                                               v-bind:class="[filter.sortEstado === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
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
                                            <select v-model="filter.semestre" class="search-select form-control">
                                                <option value="" selected>Procurar...</option>
                                                <option value="1">1º Semestre</option>
                                                <option value="2">2º Semestre</option>
                                            </select>
                                        </th>
                                        <th>
                                            <select v-model="filter.ano" class="search-select form-control">
                                                <option value="" selected>Procurar...</option>
                                                <option value="1">1º</option>
                                                <option value="2">2º</option>
                                                <option value="3">3º</option>
                                                <option value="4">4º</option>
                                                <option value="5">5º</option>
                                            </select>
                                        </th>
                                        <th>
                                            <select v-model="filter.anoLetivo" class="search-select form-control">
                                                <option value="" selected>Procurar...</option>
                                                <option value="2016/2017">2016/2017</option>
                                                <option value="2017/2018">2017/2018</option>
                                                <option value="2018/2019">2018/2019</option>
                                                <option value="2019/2020">2019/2020</option>
                                                <option value="2020/2021">2020/2021</option>
                                                <option value="2021/2022">2021/2022</option>
                                            </select>
                                        </th>
                                        <th>
                                            <input v-model="filter.curso" type="text" class="search-input form-control"
                                                   placeholder="Procurar..."/>
                                        </th>
                                        <th>
                                            <select v-model="filter.estado" class="search-select form-control">
                                                <option value="" selected>Procurar...</option>
                                                <option value="0">Desativada</option>
                                                <option value="1">Ativada</option>
                                            </select>
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
                                        v-for="unidadeCurricular in unidadesCurriculares"
                                        :class="{activerow: viewDetails === unidadeCurricular}"
                                    >
                                        <td>{{unidadeCurricular.nome}}</td>
                                        <td>{{unidadeCurricular.semestre}}º Semestre</td>
                                        <td>{{unidadeCurricular.ano}}º</td>
                                        <td>{{unidadeCurricular.anoLetivo}}</td>
                                        <td>{{ unidadeCurricular.curso.nome }}</td>
                                        <td v-if="unidadeCurricular.estado == 1">Ativada</td>
                                        <td v-else>Desativada</td>
                                        <td>
                                            <a v-if="unidadeCurricular.estado=='1'" class="btn btn-sm btn-info"
                                               v-on:click.prevent="viewDetail(unidadeCurricular)">Detalhes</a>
                                            <p v-if="unidadeCurricular.estado=='1'"></p>
                                            <p v-if="unidadeCurricular.estado=='1'"></p>
                                            <a v-if="unidadeCurricular.estado=='1' && getUser() == 'o'"
                                               class="btn btn-sm btn-danger"
                                               v-on:click.prevent="desativarUC(unidadeCurricular)">Desativar</a>
                                            <a v-else-if="unidadeCurricular.estado=='0' && getUser() == 'o'"
                                               class="btn btn-sm btn-warning"
                                               v-on:click.prevent="ativarUC(unidadeCurricular)">Ativar</a>
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
                <div id="detalhesuC" class="col-md-6">
                    <detalhes v-if="viewDetails" :unidadeCurricular="selectedDetail" @save-uc="saveUC"
                              @cancel-uc="cancelUC"></detalhes>
                </div>
                <div id="uCProf" class="col-md-6">
                    <ucProf v-if="viewProfessores" :uCProfessor=uCProfessor @cancel-ucProf="cancelUCProf"></ucProf>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Detalhes from "./detalhes";
    import MarcarAula from "./criar";
    import UCProf from "./unidadeCurricularProfessor"

    export default {
        components: {
            "detalhes": Detalhes,
            "marcar": MarcarAula,
            "ucProf": UCProf,
        },
        name: "unidadeCurricular",
        data: function () {
            return {
                title: "Lista de Unidades Curriculares",
                total: 0,
                unidadesCurriculares: [],
                página: 1,
                viewDetails: false,
                selectedDetail: null,
                adicionarUC: false,
                uCProfessor: [],
                viewProfessores: false,
                filter: {
                    nome: '',
                    semestre: '',
                    ano: '',
                    anoLetivo: '',
                    curso: '',
                    estado: '',
                    sortNome: '',
                    sortSemestre: '',
                    sortAno: '',
                    sortAnoLetivo: '',
                    sortCurso: '',
                    sortEstado: ''
                },
                has_errors: false,
            }
        },
        methods: {
            limparFiltros: function () {
                this.filter.nome = '';
                this.filter.semestre = '';
                this.filter.ano = '';
                this.filter.anoLetivo = '';
                this.filter.curso = '';
                this.filter.estado = '';
            },
            getUnidadeCurricular: function () {
                let variables = '&nome=' + this.filter.nome + '&semestre=' + this.filter.semestre + '&ano=' + this.filter.ano + '&anoLetivo=' + this.filter.anoLetivo + '&curso=' + this.filter.curso + '&estado=' + this.filter.estado
                    + '&sortNome=' + this.filter.sortNome + '&sortSemestre=' + this.filter.sortSemestre + '&sortAno=' + this.filter.sortAno + '&sortAnoLetivo=' + this.filter.sortAnoLetivo + '&sortCurso=' + this.filter.sortCurso + '&sortEstado=' + this.filter.sortEstado;
                axios.get("api/unidadesCurriculares?page=" + this.página + variables).then(response => {
                    this.unidadesCurriculares = response.data.data;
                    this.total = response.data.total;
                });
            },
            getUser: function () {
                return this.$root.user;
            },
            toogleorder: function (position) {
                switch (position) {
                    case 0:
                        this.filter.sortNome === 'asc' ? this.filter.sortNome = 'desc' : this.filter.sortNome = 'asc';
                        this.filter.sortSemestre = '';
                        this.filter.sortAno = '';
                        this.filter.sortAnoLetivo = '';
                        this.filter.sortCurso = '';
                        this.filter.sortEstado = '';
                        break;
                    case 1:
                        this.filter.sortSemestre === 'asc' ? this.filter.sortSemestre = 'desc' : this.filter.sortSemestre = 'asc';
                        this.filter.sortNome = '';
                        this.filter.sortAno = '';
                        this.filter.sortAnoLetivo = '';
                        this.filter.sortCurso = '';
                        this.filter.sortEstado = '';
                        break;
                    case 2:
                        this.filter.sortAno === 'asc' ? this.filter.sortAno = 'desc' : this.filter.sortAno = 'asc';
                        this.filter.sortNome = '';
                        this.filter.sortSemestre = '';
                        this.filter.sortAnoLetivo = '';
                        this.filter.sortCurso = '';
                        this.filter.sortEstado = '';
                        break;
                    case 3:
                        this.filter.sortAnoLetivo === 'asc' ? this.filter.sortAnoLetivo = 'desc' : this.filter.sortAnoLetivo = 'asc';
                        this.filter.sortNome = '';
                        this.filter.sortSemestre = '';
                        this.filter.sortAno = '';
                        this.filter.sortCurso = '';
                        this.filter.sortEstado = '';
                        break;
                    case 4:
                        this.filter.sortCurso === 'asc' ? this.filter.sortCurso = 'desc' : this.filter.sortCurso = 'asc';
                        this.filter.sortNome = '';
                        this.filter.sortSemestre = '';
                        this.filter.sortAno = '';
                        this.filter.sortAnoLetivo = '';
                        this.filter.sortEstado = '';
                        break;
                    case 5:
                        this.filter.sortEstado === 'asc' ? this.filter.sortEstado = 'desc' : this.filter.sortEstado = 'asc';
                        this.filter.sortNome = '';
                        this.filter.sortSemestre = '';
                        this.filter.sortAno = '';
                        this.filter.sortAnoLetivo = '';
                        this.filter.sortCurso = '';
                        break;
                }
            },
            ativarUC: function (unidadeCurricular) {
                axios.patch("api/unidadeCurricular/ativar/" + unidadeCurricular.id).then(response => {
                    this.getUnidadeCurricular();
                });
            },
            desativarUC: function (unidadeCurricular) {
                axios.patch("api/unidadeCurricular/desativar/" + unidadeCurricular.id).then(response => {
                    this.getUnidadeCurricular();
                });
            },
            viewAdicionarUC: function () {
                this.adicionarUC = true;
            },
            saveNewUC: function (unidadeCurricular) {
                this.adicionarUC = false;
                axios.post('api/unidadeCurricular/new', unidadeCurricular)
                    .then(response => {
                        this.adicionarUC = false;
                        this.getUnidadeCurricular();
                        this.$vToastify.success("Unidade curricular criada!", "Sucesso!");
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Criar unidade curricular!", "Erro!");
                });
            },
            cancelNewUC: function () {
                this.adicionarUC = false;
                this.getUnidadeCurricular();
            },
            cancelUCProf: function () {
                this.viewProfessores = false;
                var element = document.getElementById("detalhesuC");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
                this.getUnidadeCurricular();
            },
            viewDetail: function (unidadeCurricular) {
                document.getElementById("uCProf").setAttribute('class', 'col-md-6');
                document.getElementById("detalhesuC").setAttribute('class', 'col-md-6');
                this.selectedDetail = Object.assign({}, unidadeCurricular);
                this.viewDetails = unidadeCurricular;
                this.viewProfessores = unidadeCurricular;
                axios.get("api/unidadeCurricular/professor?uC=" + unidadeCurricular.id).then(response => {
                    this.uCProfessor = response.data.data;
                    window.scrollTo(0, document.body.scrollHeight);
                });
            },
            saveUC: function (unidadeCurricular) {
                this.viewDetails = false;
                axios.put('api/unidadeCurricular/' + unidadeCurricular.id, unidadeCurricular)
                    .then(response => {
                        this.selectedDetail = null;
                        this.viewDetails = false;
                        this.getUnidadeCurricular();
                        this.$vToastify.success("Unidade curricular editada!", "Sucesso!");
                        var element = document.getElementById("uCProf");

                        if (element != null) {
                            element.setAttribute('class', 'col-md-12');
                        }
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Edições de unidade curricular!", "Erro!");
                });
            },
            cancelUC: function () {
                this.selectedDetail = false;
                this.viewDetails = false;
                var element = document.getElementById("uCProf");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
                this.getUnidadeCurricular();
            },
            clickCallback: function (page) {
                this.página = page;
                this.viewDetails = false;
                this.viewProfessores = false;
                let variables = '&nome=' + this.filter.nome + '&semestre=' + this.filter.semestre + '&ano=' + this.filter.ano + '&anoLetivo=' + this.filter.anoLetivo + '&curso=' + this.filter.curso + '&estado=' + this.filter.estado + '&sortNome=' + this.filter.sortNome + '&sortSemestre=' + this.filter.sortSemestre + '&sortAno=' + this.filter.sortAno + '&sortAnoLetivo=' + this.filter.sortAnoLetivo + '&sortCurso=' + this.filter.sortCurso + '&sortEstado=' + this.filter.sortEstado;
                axios.get("api/unidadesCurriculares?page=" + page + variables).then(response => {
                    this.unidadesCurriculares = response.data.data;
                    this.total = response.data.total;
                });
            },
            getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            }
        },
        watch: {
            filter: {
                deep: true,
                handler() {
                    let variables = '&nome=' + this.filter.nome + '&semestre=' + this.filter.semestre + '&ano=' + this.filter.ano + '&anoLetivo=' + this.filter.anoLetivo + '&curso=' + this.filter.curso + '&estado=' + this.filter.estado + '&sortNome=' + this.filter.sortNome + '&sortSemestre=' + this.filter.sortSemestre + '&sortAno=' + this.filter.sortAno + '&sortAnoLetivo=' + this.filter.sortAnoLetivo + '&sortCurso=' + this.filter.sortCurso + '&sortEstado=' + this.filter.sortEstado;
                    axios.get("api/unidadesCurriculares?page=" + this.página + variables).then(response => {
                        this.unidadesCurriculares = response.data.data;
                        this.total = response.data.total;
                    });
                }
            },
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
        mounted() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.getUnidadeCurricular();
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

    ::-moz-placeholder { /* Firefox 19+ */
        color: black;
    }

    :-ms-input-placeholder {
        color: black;
    }
</style>
