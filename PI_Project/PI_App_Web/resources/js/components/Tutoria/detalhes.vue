<template>
    <div class="row">
        <br>
        <form>
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-body no-padding">
                        <div class="col-md-12">
                            <label v-if="tutoria.isArchivedProfessor=='0'" style="color: red;">* Campos obrigatórios</label>
                            <p></p>
                            <label>Pedido</label>
                            <input type="text" class="search-input form-control"
                                   placeholder="Quem fez o pedido de tutoria"
                                   v-model="tutoria.pedido" disabled>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Data</label><label v-if="tutoria.isArchivedProfessor=='0'" style="color: red;">&nbsp;*</label>
                            <date-picker
                                v-model="tutoria.data"
                                :input-props='{class: "search-input form-control", placeholder: "dd/mm/aaaa",}'
                                :min-date='new Date()'
                            />
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Hora Início</label><label v-if="tutoria.isArchivedProfessor=='0'" style="color: red;">&nbsp;*</label>
                            <input type="time" class="search-input form-control" placeholder="Hora de início da tutoria"
                                   v-model="tutoria.horaInicio">
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Assunto</label>
                            <input type="text" class="search-input form-control" placeholder="Assunto da tutoria"
                                   v-model="tutoria.assunto" disabled>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Descrição</label>
                            <textarea class="search-input form-control" placeholder="Descrição da tutoria"
                                      v-model="tutoria.descricao" rows="6" cols="50"></textarea>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Sala</label><label v-if="tutoria.isArchivedProfessor=='0'" style="color: red;">&nbsp;*</label>
                            <vue-select @class="form-control" name="sala" label="nome" :filterable="true" :options="salas"
                                        @search="fetchSalas" placeholder="Sala da tutoria" v-model="tutoria.sala"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Professor</label>
                            <input type="text" class="search-input form-control"
                                   placeholder="Professor associado à tutoria"
                                   v-model="tutoria.professor.nome" disabled>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Aluno</label>
                            <input type="text" class="search-input form-control"
                                   placeholder="Aluno associado à tutoria"
                                   v-model="tutoria.aluno.nome" disabled>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Unidade Curricular</label>
                            <input type="text" class="search-input form-control"
                                   placeholder="Unidade curricular associada à tutoria"
                                   v-model="tutoria.unidade_curricular.nome" disabled>
                            <br>
                        </div>
                        <div v-if="tutoria.isArchivedProfessor=='0'" class="form-group col-md-12">
                            <a v-if="tutoria.estado=='0'" class="btn btn-primary" v-on:click.prevent="saveTutoria()">Guardar</a>
                            <a class="btn btn-light" v-on:click.prevent="cancelTutoria()">Cancelar</a>
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
        name: "detalhes",
        components: {
            vueSelect,
        },
        props: ['tutoria'],
        data: function () {
            return {
                salas: [],
            };
        },
        methods: {
            saveTutoria() {
                this.$emit('save-tutoria', this.tutoria)
            },
            cancelTutoria() {
                this.$emit('cancel-tutoria')
            },
            fetchSalas(search, loading) {
                let self = this;
                loading(true);
                if (search) {
                    axios.get('/api/salas/' + search)
                        .then(function (response) {
                            self.salas = response.data;
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
