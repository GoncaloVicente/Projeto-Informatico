<template>
    <div class="row">
        <br>
        <form>
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-body no-padding">
                        <div class="col-md-12">
                            <label style="color: red;">* Campos obrigatórios</label>
                            <p></p>
                            <label>Data</label><label style="color: red;">&nbsp;*</label>
                            <date-picker
                                v-model="$v.tutoria.data.$model"
                                :input-props='{class: "search-input form-control", placeholder: "dd/mm/aaaa",}'
                                :min-date='new Date()'
                            />
                            <div class="error" style="color:red"
                                 v-if="!$v.tutoria.data.required && $v.tutoria.data.$anyDirty"><strong>Data é obrigatória</strong></div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Hora Início</label><label style="color: red;">&nbsp;*</label>
                            <input type="time" class="search-input form-control" placeholder="Hora de início da tutoria"
                                   v-model="$v.tutoria.horaInicio.$model">
                            <div class="error" style="color:red"
                                 v-if="!$v.tutoria.horaInicio.required && $v.tutoria.horaInicio.$anyDirty"><strong>Hora de início é obrigatória</strong></div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Assunto</label><label style="color: red;">&nbsp;*</label>
                            <input type="text" class="search-input form-control" placeholder="Assunto da tutoria"
                                   v-model="$v.tutoria.assunto.$model">
                            <div class="error" style="color:red"
                                 v-if="!$v.tutoria.assunto.required && $v.tutoria.assunto.$anyDirty"><strong>Assunto é obrigatório</strong></div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Descrição</label>
                            <textarea class="search-input form-control"
                                      placeholder="Descrição da tutoria"
                                      v-model="tutoria.descricao" rows="6" cols="50"></textarea>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Sala</label><label style="color: red;">&nbsp;*</label>
                            <vue-select @class="form-control" name="sala" label="nome" :filterable="true"
                                        :options="tutoria.salas"
                                        @search="fetchSalas" placeholder="Sala da tutoria" v-model="$v.tutoria.sala_id.$model"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <div class="error" style="color:red"
                                 v-if="!$v.tutoria.sala_id.required && $v.tutoria.sala_id.$anyDirty"><strong>Sala é obrigatória</strong></div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Aluno</label><label style="color: red;">&nbsp;*</label>
                            <vue-select @class="form-control" name="aluno" label="nome" :filterable="true"
                                        :options="tutoria.alunos"
                                        @search="fetchAlunos" placeholder="Aluno associado à tutoria"
                                        v-model="$v.tutoria.aluno_id.$model"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <div class="error" style="color:red"
                                 v-if="!$v.tutoria.aluno_id.required && $v.tutoria.aluno_id.$anyDirty"><strong>Aluno é obrigatório</strong></div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Unidade Curricular</label><label style="color: red;">&nbsp;*</label>
                            <vue-select @class="form-control" name="unidadeCurricular" label="nome" :filterable="true"
                                        :options="tutoria.unidadesCurriculares"
                                        @search="fetchUnidadesCurriculares"
                                        placeholder="Unidade curricular associada à tutoria"
                                        v-model="$v.tutoria.unidade_curricular_id.$model"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <div class="error" style="color:red"
                                 v-if="!$v.tutoria.unidade_curricular_id.required && $v.tutoria.unidade_curricular_id.$anyDirty"><strong>Unidade curricular é obrigatória</strong></div>
                            <br>
                        </div>
                        <div class="form-group col-md-12">
                            <a class="btn btn-primary" @click.prevent="!$v.$invalid ? saveTutoria() : showErrors()">Guardar</a>
                            <a class="btn btn-light" v-on:click.prevent="cancelTutoria()">Cancelar</a>
                        </div>
                    </div>
                    <br>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
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
        name: "criar",
        components: {
            vueSelect,
        },
        data: function () {
            return {
                tutoria: {
                    data: '',
                    horaInicio: '',
                    assunto: '',
                    descricao: '',
                    sala_id: '',
                    aluno_id: '',
                    unidade_curricular_id: '',
                    salas: [],
                    alunos: [],
                    unidadesCurriculares: [],
                },
            }
        },
        methods: {
            saveTutoria() {
                this.$emit('save-NewTutoria', this.tutoria)
            },
            cancelTutoria() {
                this.$emit('cancel-NewTutoria')
            },
            fetchSalas(search, loading) {
                let self = this;
                loading(true);
                if (search) {
                    axios.get('/api/salas/' + search)
                        .then(function (response) {
                            self.tutoria.salas = response.data;
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
            fetchAlunos(search, loading) {
                let self = this;
                loading(true);
                if (search) {
                    axios.get('/api/alunos/' + search)
                        .then(function (response) {
                            self.tutoria.alunos = response.data;
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
            fetchUnidadesCurriculares(search, loading) {
                let self = this;
                loading(true);
                if (search) {
                    axios.get('/api/unidadesCurriculares/' + search)
                        .then(function (response) {
                            self.tutoria.unidadesCurriculares = response.data;
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
            tutoria: {
                data: {
                    required,
                },
                horaInicio: {
                    required,
                },
                assunto: {
                    required,
                },
                sala_id: {
                    required,
                },
                aluno_id: {
                    required,
                },
                unidade_curricular_id: {
                    required,
                },
            },
        }    }
</script>

<style scoped>
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
