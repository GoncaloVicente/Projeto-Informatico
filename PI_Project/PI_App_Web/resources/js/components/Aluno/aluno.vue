<template>
    <div class="row">
        <div class="jumbotron col-md-12" style="background-color: rgb(48,117,173);">
            <h1 style="text-align: center"><span style="color: white; ">{{title}}</span></h1>
        </div>
        <div class="col-md-12">
            <div v-if="has_errors">
                <div v-for="error in errors" v-bind:key="error.key" class="alert alert-danger">
                    <span>{{ error[0] }}</span>
                </div>
            </div>
            <div class="box box-primary">
                <div class="box-body no-padding">
                    <a v-if="this.$root.user == 'o'" class="btn .btn-xs btn-primary" style="margin: 10px;"
                       v-on:click.prevent="viewAdicionarAluno()">Adicionar
                        Aluno</a>
                    <button v-if="this.$root.user == 'o'" type="button" class="btn .btn-xs btn-primary"
                            data-toggle="modal"
                            data-target="#modal-default">
                        Importar Excel
                    </button>
                    <div class="col-md-12">
                        <marcar v-if="adicionarAluno" @save-NewAluno="saveNewAluno"
                                @cancel-NewAluno="cancelNewAluno"></marcar>
                    </div>
                    <div class="modal fade" id="modal-default">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title">Importar Excel</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label style="color: red;">* Campos obrigatórios</label>
                                        <p></p>
                                        <label>Curso</label><label style="color: red;">&nbsp;*</label>
                                        <vue-select @class="form-control" name="curso" label="nome"
                                                    :filterable="true"
                                                    :options="cursos"
                                                    v-model="$v.curso.$model"
                                                    @search="fetchCursos" placeholder="Curso associado ao aluno"
                                                    style="background-color: #fff">
                                            <span slot="no-options">Não existem opções compatíveis!</span>
                                        </vue-select>
                                        <br>
                                        <label v-if="curso">Escolher ficheiro</label><label v-if="curso" style="color: red;">&nbsp;*</label>
                                        <input v-if="curso" id="file" name="file" class="form-control-file" type="file"
                                               @change="handleExcel">
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Fechar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive-grid">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-striped">

                                    <thead>
                                    <tr>
                                        <th v-on:click="toogleorder(0)">Número
                                            <i class="fa"
                                               v-bind:class="[filter.sortNumero === 'asc' ? 'fa-sort-numeric-desc' : 'fa-sort-numeric-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(1)">Nome
                                            <i class="fa"
                                               v-bind:class="[filter.sortNome === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(2)">Curso
                                            <i class="fa"
                                               v-bind:class="[filter.sortCurso === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
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
                                                   placeholder="Procurar..."/>
                                        </th>
                                        <th>
                                            <input v-model="filter.curso" type="text" class="search-input form-control"
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
                                        v-for="aluno in alunos"
                                        :class="{activerow: viewDetails === aluno}"
                                    >
                                        <td>{{aluno.numero}}</td>
                                        <td>{{ aluno.nome }}</td>
                                        <td v-if="aluno.curso">{{aluno.curso.nome}}</td>
                                        <td v-else>Sem curso associado</td>

                                        <td>
                                            <a class="btn btn-sm btn-info" v-on:click.prevent="viewDetail(aluno)">Detalhes</a>
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
                <div class="col-md-6" id="editAluno">
                    <edit v-if="viewDetailsAluno" :aluno=this.viewDetailsAluno @save-Aluno="saveAluno"
                          @cancel-Aluno="cancelDetailsAluno"></edit>
                </div>
                <div class="col-md-6" id="detalhesAluno">
                    <detalhes v-if="viewDetails" :alunoUc=this.alunoUc
                              @cancel-aluno="cancelAluno"></detalhes>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DetalhesAluno from "./detalhes";
    import Marcar from "./criar";
    import Editar from "./edit";
    import XLSX from 'xlsx';
    import vueSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {
        required,
        numeric,
        email,
        minLength,
        maxLength,
        minValue,
        maxValue,
        helpers
    } from "vuelidate/src/validators";

    export default {
        components: {
            "detalhes": DetalhesAluno,
            "marcar": Marcar,
            'edit': Editar,
            vueSelect,
        },
        name: "aluno",
        data: function () {
            return {
                title: "Lista de Alunos",
                total: 0,
                alunos: [],
                página: 1,
                viewDetails: false,
                viewDetailsAluno: false,
                selectedDetail: null,
                alunoUc: [],
                dadosExcel: null,
                adicionarAluno: false,
                filter: {numero: '', nome: '', curso: '', sortNumero: '', sortNome: '', sortCurso: ''},
                has_errors: false,
                cursos: [],
                curso: ''
            }
        },
        methods: {
            limparFiltros: function () {
                this.filter.numero = '';
                this.filter.nome = '';
                this.filter.curso = '';
            },
            getAlunos: function () {
                let variables = '&numero=' + this.filter.numero + '&nome=' + this.filter.nome + '&curso=' + this.filter.curso + '&sortNumero=' + this.filter.sortNumero + '&sortNome=' + this.filter.sortNome + '&sortCurso=' + this.filter.sortCurso;
                axios.get("api/alunos?page=" + this.página + variables).then(response => {
                    this.alunos = response.data.data;
                    this.total = response.data.total;
                });
            },
            toogleorder: function (position) {
                switch (position) {
                    case 0:
                        this.filter.sortNumero === 'asc' ? this.filter.sortNumero = 'desc' : this.filter.sortNumero = 'asc';
                        this.filter.sortNome = '';
                        this.filter.sortCurso = '';
                        break;
                    case 1:
                        this.filter.sortNome === 'asc' ? this.filter.sortNome = 'desc' : this.filter.sortNome = 'asc';
                        this.filter.sortNumero = '';
                        this.filter.sortCurso = '';
                        break;
                    case 2:
                        this.filter.sortCurso === 'asc' ? this.filter.sortCurso = 'desc' : this.filter.sortCurso = 'asc';
                        this.filter.sortNumero = '';
                        this.filter.sortNome = '';
                        break;
                }
            },
            cancelAluno: function () {
                this.getAlunos();
                var element = document.getElementById("editAluno");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
            },
            cancelDetailsAluno: function () {
                this.viewDetailsAluno = false;
                var element = document.getElementById("detalhesAluno");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
                this.getAlunos();
            },
            viewAdicionarAluno: function () {
                this.adicionarAluno = true;
            },
            saveNewAluno: function (aluno) {
                this.has_errors = false;
                axios.post('api/aluno/new', aluno)
                    .then(response => {
                        this.adicionarAluno = false;
                        this.getAlunos();
                        this.$vToastify.success("Aluno criado!", "Sucesso!");
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Criar aluno!", "Erro!");
                });
            },
            cancelNewAluno: function () {
                this.adicionarAluno = false;
            },
            saveAluno: function (aluno) {
                this.has_errors = false;
                axios.put('api/aluno/' + aluno.id, aluno)
                    .then(response => {
                        this.viewDetailsAluno = false;
                        this.viewDetails = false;
                        this.getAlunos();
                        this.$vToastify.success("Aluno editado!", "Sucesso!");
                        var element = document.getElementById("detalhesAluno");

                        if (element != null) {
                            element.setAttribute('class', 'col-md-12');
                        }
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Edições de aluno!", "Erro!");
                });
            },
            viewDetail: function (aluno) {
                var element = document.getElementById("editAluno");

                if (element != null) {
                    element.setAttribute('class', 'col-md-6');
                }
                var element = document.getElementById("detalhesAluno");

                if (element != null) {
                    element.setAttribute('class', 'col-md-6');
                }
                this.selectedDetail = Object.assign({}, aluno);
                this.viewDetails = aluno;
                this.viewDetailsAluno = Object.assign({}, aluno);
                axios.get("api/aluno/unidadeCurricular?aluno=" + aluno.id).then(response => {
                    this.alunoUc = response.data.data;
                    window.scrollTo(0, document.body.scrollHeight);
                });
            },
            fetchCursos(search, loading) {
                let self = this;
                loading(true);
                if (search) {
                    axios.get('/api/cursos/' + search)
                        .then(function (response) {
                            self.cursos = response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                        .finally(function () {
                            loading(false);
                        });
                }
                loading(false);
            },
            clickCallback: function (page) {
                this.viewDetailsAluno = false;
                this.viewDetails = false;
                let variables = '&numero=' + this.filter.numero + '&nome=' + this.filter.nome + '&curso=' + this.filter.curso + '&sortNumero=' + this.filter.sortNumero + '&sortNome=' + this.filter.sortNome + '&sortCurso=' + this.filter.sortCurso;
                this.página = page;
                axios.get("api/alunos?page=" + page + variables).then(response => {
                    this.alunos = response.data.data;
                    this.total = response.data.total;
                });
            },
            getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            },
            handleExcel(e) {
                var self = this;
                var f = e.target.files[0];
                var reader = new FileReader();
                if (f.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || f.type === "application/vnd.ms-excel") {
                    reader.onload = function (e) {
                        var data = new Uint8Array(e.target.result);
                        var result = {};
                        var workbook = XLSX.read(data, {type: 'array'});
                        workbook.SheetNames.forEach(function (sheetName) {
                            var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1});
                            if (roa.length) result[sheetName] = roa;
                        });
                        self.dadosExcel = result.Inscritos;
                        axios.post("api/aluno/excel", {dados: self.dadosExcel, curso_id: self.curso}).then(response => {
                            if (response.data.valid) {
                                self.getAlunos();
                                self.$vToastify.success("Ficheiro processado!", "Sucesso!");
                            } else {
                                response.data.errors.forEach(function (erro) {
                                    self.$vToastify.error(erro, "Erro!");
                                });
                            }
                        });
                    };
                    reader.readAsArrayBuffer(f);
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
        watch: {
            filter: {
                deep: true,
                handler() {
                    this.viewDetailsAluno = false;
                    this.viewDetails = false;
                    let variables = '&numero=' + this.filter.numero + '&nome=' + this.filter.nome + '&curso=' + this.filter.curso + '&sortNumero=' + this.filter.sortNumero + '&sortNome=' + this.filter.sortNome + '&sortCurso=' + this.filter.sortCurso;
                    axios.get("api/alunos?page=" + this.página + variables).then(response => {
                        this.alunos = response.data.data;
                        this.total = response.data.total;
                    });
                }
            },
        },
        mounted() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.getAlunos();
        },
        validations: {
            curso: {
                required,
            }
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
