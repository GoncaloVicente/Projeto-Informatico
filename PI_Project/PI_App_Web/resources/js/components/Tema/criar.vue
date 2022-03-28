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
                            <label>Nome</label><label style="color: red;">&nbsp;*</label>
                            <input type="text" class="search-input form-control" placeholder="Nome do tema"
                                   v-model="$v.tema.nome.$model">
                            <div class="error" style="color:red"
                                 v-if="!$v.tema.nome.required && $v.tema.nome.$anyDirty"><strong>Nome é obrigatório</strong>
                            </div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Unidade Curricular</label><label style="color: red;">&nbsp;*</label>
                            <vue-select @class="form-control" name="unidadeCurricular" label="nome" :filterable="true"
                                        :options="unidadesCurriculares"
                                        @search="fetchUnidadesCurriculares"
                                        placeholder="Unidade curricular associada ao tema"
                                        v-model="$v.tema.uC_id.$model"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <div class="error" style="color:red"
                                 v-if="!$v.tema.uC_id.required && $v.tema.uC_id.$anyDirty"><strong>Unidade curricular é obrigatória</strong>
                            </div>
                            <br>
                        </div>
                        <div class="form-group col-md-12">
                            <a class="btn btn-primary" @click.prevent="!$v.$invalid ? saveTema() : showErrors()">Guardar</a>
                            <a class="btn btn-light" v-on:click.prevent="cancelTema()">Cancelar</a>
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
                tema: {
                    nome: '',
                    uC_id: '',
                },
                unidadesCurriculares: [],
            }
        },
        methods: {
            saveTema() {
                this.$emit('save-NewTema', this.tema)
            },
            cancelTema() {
                this.$emit('cancel-NewTema')
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
            tema: {
                nome: {
                    required,
                },
                uC_id: {
                    required,
                }
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
