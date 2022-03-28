<template>
    <div class="row">
        <br>
        <form>
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-body no-padding">
                        <div class="col-md-12">
                            <br>
                            <label>Nome</label>
                            <input type="text" class="search-input form-control"
                                   placeholder="Nome do professor"
                                   v-model="professor.nome" disabled>
                        </div>
                        <div class="col-md-12">
                            <br>
                            <label>Email</label>
                            <input type="text" class="search-input form-control"
                                   placeholder="Email do professor"
                                   v-model="professor.email" disabled>
                        </div>
                        <div class="col-md-12">
                            <br>
                            <label>Curso</label>
                            <vue-select multiple @class="form-control" name="curso" label="nome" :filterable="true" :options="cursos"
                                        @search="fetchCursos" placeholder="Curso associado ao professor"
                                        v-model="professor.cursos"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                        </div>
                        <div class="col-md-12">
                            <br>
                            <label>Unidades Curriculares</label>
                            <vue-select multiple @class="form-control" name="uC" label="nome" :filterable="true" :options="uCs"
                                        @search="fetchUcs" placeholder="Unidades curriculares associadas ao professor"
                                        v-model="professor.ucs"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                        </div>
                        <div class="form-group col-md-12">
                            <br>
                            <a class="btn btn-primary" v-on:click.prevent="saveProfessor()">Guardar</a>
                            <a class="btn btn-light" v-on:click.prevent="cancelProfessor()">Cancelar</a>
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

    export default {
        name: "edit",
        components: {
            vueSelect,
        },
        props: ['professor', 'curso'],
        data: function () {
            return {
                cursos: [],
                uCs: [],
            }
        },
        methods: {
            saveProfessor() {
                this.$emit('save-Professor', this.professor)
            },
            cancelProfessor() {
                this.$emit('cancel-Professor')
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
            fetchUcs(search, loading) {
                let self = this;
                loading(true);

                let ids = this.professor.cursos.map(function(elem) {
                    return elem.id;
                }).join(',');

                if (search) {
                    axios.get('/api/unidadesCurricularescurso/' + search + '/?ids='+ids)
                        .then(function (response) {
                            self.uCs = response.data;
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
        },
        watch:{
            'professor.cursos': function (val, oldval) {
                if(val.length < oldval.length)
                    this.professor.ucs = [];
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
