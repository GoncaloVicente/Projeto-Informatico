<template>
    <div class="row">
        <br>
        <form>
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-body no-padding">
                        <div class="col-md-12">
                            <label v-if="isClassificacao==false" style="color: red;">* Campos obrigatórios</label>
                            <p></p>
                            <label>Codigo</label>
                            <input type="number" class="search-input form-control" placeholder="Código da aula"
                                   v-model="aula.codigo" disabled>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Data</label><label v-if="isClassificacao==false" style="color: red;">&nbsp;*</label>
                            <date-picker v-if="isClassificacao==false"
                                         v-model="$v.aula.data.$model"
                                         :input-props='{class: "search-input form-control", placeholder: "dd/mm/aaaa",}'
                                         :min-date='new Date()'
                            />
                            <date-picker v-if="isClassificacao==true"
                                         v-model="$v.aula.data.$model"
                                         :input-props='{class: "search-input form-control", placeholder: "dd/mm/aaaa",}'
                                         :min-date='new Date()'
                                         :disabled-dates='{}'
                            />
                            <div class="error" style="color:red"
                                  v-if="!$v.aula.data.required && $v.aula.data.$anyDirty"><strong>Data é obrigatória</strong></div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Unidade Curricular</label><label v-if="isClassificacao==false" style="color: red;">&nbsp;*</label>
                            <vue-select v-if="isClassificacao==false"
                                        @class="form-control" name="sala" label="nome" :filterable="true"
                                        :options="unidadesCurriculares"
                                        @search="fetchUnidadesCurriculares"
                                        placeholder="Unidade curricular associada à aula"
                                        v-model="$v.aula.unidade_curricular.$model"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <vue-select v-if="isClassificacao==true"
                                        @class="form-control" name="sala" label="nome" :filterable="true"
                                        :options="unidadesCurriculares"
                                        @search="fetchUnidadesCurriculares"
                                        placeholder="Unidade curricular associada à aula"
                                        v-model="$v.aula.unidade_curricular.$model"
                                        style="background-color: #fff"
                                        disabled>
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <div class="error" style="color:red"
                                 v-if="!$v.aula.unidade_curricular.required && $v.aula.unidade_curricular.$anyDirty"><strong>Unidade curricular é obrigatória</strong></div>
                            <br>
                        </div>
                        <div class="form-group col-md-12">
                            <a v-if="isClassificacao==false" class="btn btn-primary"
                               @click.prevent="!$v.$invalid ? saveAula() : showErrors()">Guardar</a>
                            <a v-if="isClassificacao==false" class="btn btn-light"
                               v-on:click.prevent="cancelAula()">Cancelar</a>
                            <a v-if="isClassificacao==true" class="btn btn-primary" v-on:click.prevent="cancelAula()">Cancelar</a>
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
        name: "detalhes",
        components: {
            vueSelect,
        },
        props: ['aula', 'isClassificacao'],
        data: function () {
            return {
                unidadesCurriculares: [],
            };
        },
        methods: {
            saveAula() {
                this.$emit('save-aula', this.aula)
            },
            cancelAula() {
                this.$emit('cancel-aula')
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
                unidade_curricular: {
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
