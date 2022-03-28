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
                            <label>Nome</label>
                            <input type="text" class="search-input form-control"
                                   placeholder="Nome da unidade curricular"
                                   v-model="unidadeCurricular.nome" disabled>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Semestre</label><label style="color: red;">&nbsp;*</label>
                            <select v-model="$v.unidadeCurricular.semestre.$model" class="search-select form-control">
                                <option value="1">1ª Semestre</option>
                                <option value="2">2ª Semestre</option>
                            </select>
                            <div class="error" style="color:red"
                                 v-if="!$v.unidadeCurricular.semestre.required && $v.unidadeCurricular.semestre.$anyDirty"><strong>Semestre é obrigatório</strong>
                            </div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Ano letivo</label><label style="color: red;">&nbsp;*</label>
                            <select v-model="$v.unidadeCurricular.anoLetivo.$model" class="search-select form-control">
                                <option value="" disabled selected>Ano letivo da unidade curricular</option>
                                <option>2016/2017</option>
                                <option>2017/2018</option>
                                <option>2018/2019</option>
                                <option>2019/2020</option>
                                <option>2020/2021</option>
                                <option>2021/2022</option>
                            </select>
                            <div class="error" style="color:red"
                                 v-if="!$v.unidadeCurricular.anoLetivo.required && $v.unidadeCurricular.anoLetivo.$anyDirty"><strong>Ano letivo é obrigatório</strong>
                            </div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Ano</label><label style="color: red;">&nbsp;*</label>
                            <input type="number" class="search-input form-control"
                                   placeholder="Ano da unidade curricular"
                                   v-model="$v.unidadeCurricular.ano.$model">
                            <div class="error" style="color:red"
                                 v-if="!$v.unidadeCurricular.ano.required && $v.unidadeCurricular.ano.$anyDirty"><strong>Ano é obrigatório</strong>
                            </div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Curso</label><label style="color: red;">&nbsp;*</label>
                            <vue-select @class="form-control" name="curso" label="nome" :filterable="true" :options="cursos"
                                        @search="fetchCursos" placeholder="Curso associado à unidade curricular" v-model="$v.unidadeCurricular.curso.$model"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <div class="error" style="color:red"
                                 v-if="!$v.unidadeCurricular.curso.required && $v.unidadeCurricular.curso.$anyDirty"><strong>Curso é obrigatório</strong>
                            </div>
                            <br>
                        </div>
                        <div class="form-group col-md-12">
                            <a v-if="this.$root.user == 'o'" class="btn btn-primary" @click.prevent="!$v.$invalid ? saveUC() : showErrors()">Guardar</a>
                            <a v-if="this.$root.user == 'o'" class="btn btn-light" v-on:click.prevent="cancelUC()">Cancelar</a>
                            <a v-else class="btn btn-primary" v-on:click.prevent="cancelUC()">Cancelar</a>
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
        props: ['unidadeCurricular'],
        data: function () {
            return {
                cursos: [],
            };
        },
        methods: {
            saveUC() {
                this.$emit('save-uc', this.unidadeCurricular)
            },
            cancelUC() {
                this.$emit('cancel-uc')
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
            showErrors() {
                this.$v.$touch();
            },
        },
        validations: {
            unidadeCurricular: {
                nome: {
                    required,
                },
                semestre: {
                    required,
                },
                anoLetivo: {
                    required,
                },
                ano: {
                    required,
                },
                curso: {
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

    ::-moz-placeholder {  /* Firefox 19+ */
        color: black;
    }

    :-ms-input-placeholder {
        color: black;
    }
</style>
