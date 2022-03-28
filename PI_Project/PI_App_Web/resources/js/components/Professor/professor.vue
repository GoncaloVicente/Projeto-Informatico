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
                       v-on:click.prevent="viewAdicionarProfessor()">Adicionar
                        Professor</a>
                    <div class="col-md-12">
                        <marcar v-if="adicionarProfessor" @save-NewProfessor="saveNewProfessor"
                                @cancel-NewProfessor="cancelNewProfessor"></marcar>
                    </div>
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
                                        <th v-on:click="toogleorder(1)">Email
                                            <i class="fa"
                                               v-bind:class="[filter.sortEmail === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
                                               aria-hidden="true"></i>
                                        </th>
                                        <th v-on:click="toogleorder(2)">Gabinete
                                            <i class="fa"
                                               v-bind:class="[filter.sortGabinete === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc']"
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
                                            <input v-model="filter.email" type="text" class="search-input form-control"
                                                   placeholder="Procurar..."/>
                                        </th>
                                        <th>
                                            <input v-model="filter.gabinete" type="text"
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
                                        v-for="professor in professores"
                                        :class="{activerow: viewDetails === professor}">
                                        <td>{{ professor.nome }}</td>
                                        <td>{{professor.email}}</td>
                                        <td v-if="professor.gabinete_id">{{professor.gabinete_id}}</td>
                                        <td v-else>Sem Gabinete</td>
                                        <td>
                                            <a class="btn btn-sm btn-info" v-on:click.prevent="viewDetail(professor)">Detalhes</a>
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
                <div id="editProf" class="col-md-12">
                    <edit v-if="viewDetailsProfessor" :professor=this.viewDetailsProfessor :curso=this.profCurso
                          @save-Professor="saveProfessor"
                          @cancel-Professor="cancelEditProfessor"></edit>
                </div>
                <div id="detalhesProf" class="col-md-6">
                    <detalhes v-if="viewDetails" :profCurso=this.profCurso
                              @cancel-professor="cancelProfessor"></detalhes>
                </div>
                <div id="professorUc" class="col-md-6">
                    <profUC v-if="viewProfUC" :profUC=this.profUC
                            @cancel-professorUC="cancelProfessorUC"></profUC>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DetalhesProfessor from "./detalhes";
    import ProfessorUC from "./professorUc"
    import Marcar from "./criar";
    import Editar from "./edit";

    export default {
        components: {
            "detalhes": DetalhesProfessor,
            "profUC": ProfessorUC,
            "marcar": Marcar,
            "edit": Editar,
        },
        name: "professor",
        data: function () {
            return {
                title: "Lista de Professores",
                total: 0,
                professores: [],
                página: 1,
                viewDetails: false,
                viewDetailsProfessor: false,
                selectedDetail: null,
                profCurso: [],
                profUC: [],
                viewProfUC: false,
                adicionarProfessor: false,
                filter: {nome: '', curso: '', email: '', gabinete: '', sortNome: '', sortEmail: '', sortGabinete: ''},
                has_errors: false
            }
        },
        methods: {
            limparFiltros: function () {
                this.filter.nome = '';
                this.filter.curso = '';
                this.filter.email = '';
                this.filter.gabinete = '';
            },
            getProfessores: function () {
                let variables = '&nome=' + this.filter.nome + '&email=' + this.filter.email + '&gabinete=' + this.filter.gabinete + '&sortNome=' + this.filter.sortNome + '&sortEmail=' + this.filter.sortEmail + '&sortGabinete=' + this.filter.sortGabinete;
                axios.get("api/professores?page=" + this.página + variables)
                    .then(response => {
                    this.professores = response.data.data;
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
                        this.filter.sortEmail = '';
                        this.filter.sortGabinete = '';
                        break;
                    case 1:
                        this.filter.sortEmail === 'asc' ? this.filter.sortEmail = 'desc' : this.filter.sortEmail = 'asc';
                        this.filter.sortNome = '';
                        this.filter.sortGabinete = '';
                        break;
                    case 2:
                        this.filter.sortGabinete === 'asc' ? this.filter.sortGabinete = 'desc' : this.filter.sortGabinete = 'asc';
                        this.filter.sortNome = '';
                        this.filter.sortEmail = '';
                        break;
                }
            },
            cancelProfessorUC: function () {
                this.viewProfUC = false;
                var element = document.getElementById("detalhesProf");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
                this.getProfessores();
            },
            cancelEditProfessor: function () {
                this.viewDetailsProfessor = false;
                this.getProfessores();
            },
            saveProfessor: function (professor) {
                axios.put('api/professor/' + professor.id, professor)
                    .then(response => {
                        this.viewDetailsProfessor = false;
                        this.viewDetails = false;
                        this.viewProfUC = false;
                        this.getProfessores();
                        this.$vToastify.success("Professor editado!", "Sucesso!");
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Edições de professor!", "Erro!");
                });
            },
            cancelProfessor: function () {
                this.selectedDetail = false;
                var element = document.getElementById("professorUc");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
                this.viewDetails = false;
                this.getProfessores();
            },
            viewAdicionarProfessor: function () {
                this.adicionarProfessor = true;
            },
            saveNewProfessor: function (professor) {
                this.has_errors = false;
                this.adicionarProfessor = false;
                axios.post('api/professor/new', professor)
                    .then(response => {
                        this.adicionarProfessor = false;
                        this.getProfessores();
                        this.$vToastify.success("Professor criado!", "Sucesso!");
                    }).catch(error => {
                    this.has_errors = true;
                    this.errors = error.response.data.errors;
                    this.$vToastify.error("Criar professor!", "Erro!");
                });
            },
            cancelNewProfessor: function () {
                this.adicionarProfessor = false;
            },
            viewDetail: function (professor) {
                document.getElementById("professorUc").setAttribute('class', 'col-md-6');
                document.getElementById("detalhesProf").setAttribute('class', 'col-md-6');
                this.selectedDetail = Object.assign({}, professor);
                this.viewDetailsProfessor = Object.assign({}, professor);
                this.viewDetails = professor;
                this.viewProfUC = true;
                axios.get("api/professor/curso?professor=" + professor.id).then(response => {
                    this.profCurso = response.data.data;
                });
                axios.get("api/professor/uC?professor=" + professor.id).then(response => {
                    this.profUC = response.data.data;
                    window.scrollTo(0, document.body.scrollHeight);
                });
            },
            clickCallback: function (page) {
                this.viewDetailsProfessor = false;
                this.viewDetails = false;
                this.viewProfUC = false;
                this.página = page;
                let variables = '&numero=' + this.filter.numero + '&nome=' + this.filter.nome + '&email=' + this.filter.email + '&gabinete=' + this.filter.gabinete + '&sortNumero=' + this.filter.sortNumero + '&sortNome=' + this.filter.sortNome + '&sortEmail=' + this.filter.sortEmail + '&sortGabinete=' + this.filter.sortGabinete;

                axios.get("api/professores?page=" + page + variables).then(response => {
                    this.professores = response.data.data;
                    this.total = response.data.total;
                });
            },
            getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            }
        }
        ,
        computed: {
            pageCount: function () {
                if (this.total) {
                    let pagecount = Math.ceil(this.total / 15);
                    return pagecount;
                } else {
                    return 0;
                }
            }
        }
        ,
        watch: {
            filter: {
                deep: true,
                handler() {
                    this.viewDetailsProfessor = false;
                    this.viewDetails = false;
                    this.viewProfUC = false;
                    let variables = '&nome=' + this.filter.nome + '&email=' + this.filter.email + '&gabinete=' + this.filter.gabinete + '&sortNome=' + this.filter.sortNome + '&sortEmail=' + this.filter.sortEmail + '&sortGabinete=' + this.filter.sortGabinete;
                    axios.get("api/professores?page=" + this.página + variables).then(response => {
                        this.professores = response.data.data;
                        this.total = response.data.total;
                    });
                }
            }
            ,
        }
        ,
        mounted() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.getProfessores();
        }
        ,
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
