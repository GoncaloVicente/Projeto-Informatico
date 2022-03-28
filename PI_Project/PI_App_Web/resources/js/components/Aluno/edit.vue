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
                            <label>Número de estudante</label>
                            <input type="number" class="search-input form-control"
                                   placeholder="Número de estudante"
                                   v-model="aluno.numero" disabled>
                        </div>
                        <div class="col-md-12">
                            <br>
                            <label>Nome</label>
                            <input type="text" class="search-input form-control"
                                   placeholder="Nome do aluno"
                                   v-model="aluno.nome" disabled>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Curso</label><label style="color: red;">&nbsp;*</label>
                            <vue-select @class="form-control" name="curso" label="nome" :filterable="true" :options="cursos"
                                        @search="fetchCursos" placeholder="Curso associado ao aluno"
                                        v-model="aluno.curso"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <br>
                        </div>
                        <div class="form-group col-md-12">
                            <a class="btn btn-primary" @click.prevent="saveAluno()">Guardar</a>
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
    export default {
        name: "edit",
        components: {
            vueSelect,
        },
        props: ['aluno'],
        data: function () {
            return {
                cursos: [],
            }
        },
        methods: {
            saveAluno() {
                this.$emit('save-Aluno', this.aluno)
            },
            cancelAluno() {
                this.$emit('cancel-Aluno')
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
            // showErrors() {
            //     this.$v.$touch();
            // },
        },
        // validations: {
        //     aluno: {
        //         curso: {
        //             required,
        //         }
        //     },
        // }
    }
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
