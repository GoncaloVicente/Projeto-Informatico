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
                                v-model="$v.aula.data.$model"
                                :input-props='{class: "search-input form-control", placeholder: "dd/mm/aaaa",}'
                                :min-date='new Date()'
                            />
                            <div class="error" style="color:red"
                                 v-if="!$v.aula.data.required && $v.aula.data.$anyDirty"><strong>Data é obrigatória</strong></div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Unidade Curricular</label><label style="color: red;">&nbsp;*</label>
                            <vue-select @class="form-control" name="unidadeCurricular" label="nome" :filterable="true"
                                        :options="aula.unidadesCurriculares"
                                        @search="fetchUnidadesCurriculares"
                                        placeholder="Unidade curricular associada à aula"
                                        v-model="$v.aula.unidade_curricular_id.$model"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <div class="error" style="color:red"
                                 v-if="!$v.aula.unidade_curricular_id.required && $v.aula.unidade_curricular_id.$anyDirty"><strong>Unidade curricular é obrigatória</strong></div>
                            <br>
                        </div>
                        <div class="form-group col-md-12">
                            <a class="btn btn-primary" @click.prevent="!$v.$invalid ? saveAula() : showErrors()">Guardar</a>
                            <a class="btn btn-light" v-on:click.prevent="cancelAula()">Cancelar</a>
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
        components: {
            vueSelect,
        },
        name: "criar",
        data: function () {
            return {
                aula: {
                    data: '',
                    unidade_curricular_id: '',
                    unidadesCurriculares: [],
                },
            }
        },
        methods: {
            saveAula() {
                this.$emit('save-NewAula', this.aula)
            },
            cancelAula() {
                this.$emit('cancel-NewAula')
            },
            fetchUnidadesCurriculares(search, loading) {
                let self = this;
                loading(true);
                if (search) {
                    axios.get('/api/unidadesCurriculares/' + search)
                        .then(function (response) {
                            self.aula.unidadesCurriculares = response.data;
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

    ::-moz-placeholder {  /* Firefox 19+ */
        color: black;
    }

    :-ms-input-placeholder {
        color: black;
    }
</style>
