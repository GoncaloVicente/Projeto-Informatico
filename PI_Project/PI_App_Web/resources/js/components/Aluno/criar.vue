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
                            <label>Número de estudante</label><label style="color: red;">&nbsp;*</label>
                            <input type="number" class="search-input form-control"
                                   placeholder="Número de estudante"
                                   v-model="$v.aluno.numero.$model">
                            <div class="error" style="color:red"
                                 v-if="!$v.aluno.numero.required && $v.aluno.numero.$anyDirty"><strong>Número de
                                estudante é obrigatório</strong></div>
                            <div class="error" style="color:red"
                                 v-if="!$v.aluno.numero.minLength || !$v.aluno.numero.maxLength || !$v.aluno.numero.numeric">
                                <strong>Número de estudante tem de ter 7 números</strong></div>
                            <div class="error" style="color:red" v-if="!$v.aluno.numero.numeric"><strong>Número de
                                estudante tem de ser do tipo númerico</strong></div>
                        </div>
                        <div class="col-md-12">
                            <br>
                            <label>Nome</label><label style="color: red;">&nbsp;*</label>
                            <input type="text" class="search-input form-control"
                                   placeholder="Nome do aluno"
                                   v-model="$v.aluno.nome.$model">
                            <div class="error" style="color:red"
                                 v-if="!$v.aluno.nome.required && $v.aluno.nome.$anyDirty"><strong>Nome é obrigatório</strong>
                            </div>
                            <div style="color:red" v-if="!$v.aluno.nome.spacesLetters && $v.aluno.nome.$anyDirty"><strong>Nome apenas pode incluir espaços e letras</strong>
                            </div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Curso</label><label style="color: red;">&nbsp;*</label>
                            <vue-select @class="form-control" name="curso" label="nome" :filterable="true"
                                        :options="aluno.cursos"
                                        @search="fetchCursos" placeholder="Curso associado ao aluno"
                                        v-model="$v.aluno.curso_id.$model"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <div class="error" style="color:red"
                                 v-if="!$v.aluno.curso_id.required && $v.aluno.curso_id.$anyDirty"><strong>Curso é obrigatório</strong></div>
                            <br>
                        </div>
                        <div class="form-group col-md-12">
                            <a class="btn btn-primary" @click.prevent="!$v.$invalid ? saveAluno() : showErrors()">Guardar</a>
                            <a class="btn btn-light" v-on:click.prevent="cancelAluno()">Cancelar</a>
                        </div>
                        <br>
                    </div>
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

    const spacesLetters = (value) => /^[A-Za-záàâãéèêíóôõúçÁÀÂÃÉÈÍÓÔÕÚÇ ]+$/.test(value);

    export default {
        name: "criar",
        components: {
            vueSelect,
        },
        data: function () {
            return {
                aluno: {
                    numero: '',
                    nome: '',
                    curso_id: '',
                    cursos: [],
                },
            }
        },
        methods: {
            saveAluno() {
                this.$emit('save-NewAluno', this.aluno)
            },
            cancelAluno() {
                this.$emit('cancel-NewAluno')
            },
            fetchCursos(search, loading) {
                let self = this;
                loading(true);
                if (search) {
                    axios.get('/api/cursos/' + search)
                        .then(function (response) {
                            self.aluno.cursos = response.data;
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
            aluno: {
                numero: {
                    required,
                    minLength: minLength(7),
                    maxLength: maxLength(7),
                    numeric
                },
                nome: {
                    required,
                    spacesLetters
                },
                curso_id: {
                    required,
                }
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
