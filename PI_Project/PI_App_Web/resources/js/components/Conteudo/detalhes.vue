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
                            <label>Nome do conteúdo</label><label style="color: red;">&nbsp;*</label>
                            <input type="text" class="search-input form-control"
                                   placeholder="Nome do conteúdo"
                                   v-model="$v.conteudo.nome.$model">
                            <div class="error" style="color:red"
                                 v-if="!$v.conteudo.nome.required && $v.conteudo.nome.$anyDirty"><strong>Nome é obrigatório</strong>
                            </div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Tipo</label><label style="color: red;">&nbsp;*</label>
                            <select v-model="$v.conteudo.tipo.$model" class="search-select form-control">
                                <option value="" disabled selected>Tipo do conteúdo</option>
                                <option>Teórico</option>
                                <option>Prático-Laboratorial</option>
                                <option>Exercício Teórico</option>
                                <option>Exercício Prático-Laboratorial</option>
                            </select>
                            <div class="error" style="color:red"
                                 v-if="!$v.conteudo.tipo.required && $v.conteudo.tipo.$anyDirty"><strong>Tipo de conteúdo é obrigatório</strong></div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Tema</label><label style="color: red;">&nbsp;*</label>
                            <vue-select @class="form-control" name="tema" label="nome" :filterable="true"
                                        :options="temas"
                                        @search="fetchTemas"
                                        placeholder="Tema associado ao conteúdo"
                                        v-model="$v.conteudo.tema.$model"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <div class="error" style="color:red"
                                 v-if="!$v.conteudo.tema.required && $v.conteudo.tema.$anyDirty"><strong>Tema é obrigatório</strong></div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Descrição</label>
                            <textarea class="search-input form-control"
                                      placeholder="Descrição do conteúdo"
                                      v-model="conteudo.descricao" rows="6" cols="50"></textarea>
                            <br>
                        </div>
                        <div class="form-group col-md-12">
                            <a class="btn btn-primary" @click.prevent="!$v.$invalid ? saveConteudo() : showErrors()">Guardar</a>
                            <a class="btn btn-light" v-on:click.prevent="cancelConteudo()">Cancelar</a>
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
        props: ['conteudo'],
        data: function () {
            return {
                temas: [],
            };
        },
        methods: {
            saveConteudo() {
                this.$emit('save-conteudo', this.conteudo)
            },
            cancelConteudo() {
                this.$emit('cancel-conteudo')
            },
            fetchTemas(search, loading) {
                let self = this;
                loading(true);
                if (search) {
                    axios.get('/api/temas/' + search)
                        .then(function (response) {
                            self.temas = response.data;
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
            conteudo: {
                tipo: {
                    required,
                },
                nome: {
                    required,
                },
                tema: {
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
