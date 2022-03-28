<template>
    <div class="row">
        <div class="jumbotron col-md-12" style="background-color: rgb(48,117,173);">
            <h1 style="text-align: center"><span style="color: white; ">{{title}}</span></h1>
        </div>
        <div class="col-md-12">
            <aulaConteudo :temas=this.temas @save-aulaConteudo="saveAulaConteudo"></aulaConteudo>
        </div>
        <br>
        <form>
            <div class="col-md-12">
                <div v-if="has_errors">
                    <div v-for="error in errors" v-bind:key="error.key" class="alert alert-danger">
                        <span>{{ error }}</span>
                    </div>
                </div>
                <div class="box box-primary">
                    <div class="box-body no-padding">
                        <div class="col-md-12">
                            <label style="color: red;">* Campos obrigatórios</label>
                            <p></p>
                            <label>Data</label><label style="color: red;">&nbsp;*</label>
                            <date-picker
                                v-model="$v.aula.data.$model"
                                :input-props='{class: "search-input form-control", placeholder: "dd/mm/aaaa",}'
                                :min-date='new Date()'
                            />
                            <div class="error" style="color:red"
                                 v-if="!$v.aula.data.required && $v.aula.data.$anyDirty"><strong>Data é
                                obrigatória</strong></div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Unidade Curricular</label><label style="color: red;">&nbsp;*</label>
                            <vue-select @class="form-control" name="unidadeCurricular" label="nome" :filterable="true"
                                        :options="unidadesCurriculares"
                                        @search="fetchUnidadesCurriculares"
                                        placeholder="Unidade curricular associada à aula"
                                        v-model="$v.aula.unidade_curricular_id.$model"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <div class="error" style="color:red"
                                 v-if="!$v.aula.unidade_curricular_id.required && $v.aula.unidade_curricular_id.$anyDirty">
                                <strong>Unidade curricular é obrigatória</strong></div>
                            <br>
                        </div>
                        <div class="form-group col-md-12">
                            <a class="btn btn-primary" @click.prevent="!$v.$invalid ? saveNewAula(aula) : showErrors()">Guardar</a>
                            <a class="btn btn-light" v-on:click.prevent="cancelNewAula()">Cancelar</a>
                        </div>
                    </div>
                    <br>
                </div>
            </div>
        </form>
    </div>
</template>


<script>
    const Swal = require('sweetalert2');
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

    let moment = require('moment-timezone');

    import AulaConteudo from "./aulaConteudo";

    export default {
        components: {
            vueSelect,
            "aulaConteudo": AulaConteudo,
        },
        name: "criarAula",
        data: function () {
            return {
                aula: {
                    data: '',
                    unidade_curricular_id: '',
                },
                unidadesCurriculares: [],
                novaAula: {
                    data: '',
                    unidade_curricular_id: '',
                },
                temas: [],
                title: "Criar aula",
                codigo: '',
                id: '',
                has_errors: false
            }
        },
        methods: {
            saveNewAula: function (aula) {
                this.has_errors = false;
                aula.data = moment.tz(aula.data, "DD-MM-YYYY", "Europe/Lisbon").format('DD-MM-YYYY');
                aula.codigo = Math.floor(Math.random() * (1000 + 8000) + 1000);
                axios.post('api/aula/new', aula)
                    .then(response => {
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
                            this.id = response.data.id;
                            this.codigo = response.data.codigo;
                            axios.get("api/tema/conteudo?aula=" + response.data.id).then(response => {
                                this.temas = response.data;
                            });
                            if (result.value) {
                                document.getElementById("modal").click();
                            } else {
                                this.$vToastify.success("Aula criada!", "Sucesso!");
                                this.aula = null;
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
                this.aula.data = null;
                this.aula.unidade_curricular_id = '';
            },
            saveAulaConteudo: function (destination) {
                axios.post('api/aula/conteudos/' + this.id, destination)
                    .then(response => {
                        document.getElementById("modal").click();
                        this.$vToastify.success("Adicionado conteúdo à aula!", "Sucesso!");
                        this.aula = null;
                        Swal.fire({
                            title: '\nCódigo de acesso\n\n' + this.codigo,
                            icon: 'success',
                            width: '800px'
                        })
                    }).catch(error => {
                    this.$vToastify.error("Adicionar conteúdo à aula!", "Erro!");
                });
            },
            fetchUnidadesCurriculares(search, loading) {
                let self = this;
                loading(true);
                if (search) {
                    axios.get('/api/unidadesCurriculares/' + search)
                        .then(function (response) {
                            self.unidadesCurriculares = response.data;
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
            showErrors() {
                this.$v.$touch();
            },
        },
        validations: {
            aula: {
                data: {
                    required,
                },
                unidade_curricular_id: {
                    required,
                },
            },
        }
    }
</script>

<style scoped>
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
