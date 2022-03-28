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
                            <input type="text" class="search-input form-control"
                                   placeholder="Sala"
                                   v-model="$v.sala.nome.$model">
                            <div class="error" style="color:red"
                                 v-if="!$v.sala.nome.required && $v.sala.nome.$anyDirty"><strong>Nome é obrigatório</strong>
                            </div>
                            <br>
                        </div>
                        <div class="col-md-12" v-if="sala.gabinete != null">
                            <label>Professor Associado</label>
                            <vue-select @class="form-control" name="professor" label="nome" :filterable="true" :options="professores"
                                        @search="fetchProfessores" placeholder="Professor associado ao gabinete" v-model="sala.gabinete"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <br>
                        </div>
                        <div class="form-group col-md-12">
                            <a class="btn btn-primary" @click.prevent="!$v.$invalid ? saveSala() : showErrors()">Guardar</a>
                            <a class="btn btn-light" v-on:click.prevent="cancelSala()">Cancelar</a>
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
        props: ['sala'],
        data: function () {
            return {
                professores: [],
            };
        },
        methods: {
            saveSala() {
                this.$emit('save-sala', this.sala)
            },
            cancelSala() {
                this.$emit('cancel-sala')
            },
            fetchProfessores(search, loading) {
                let self = this;
                loading(true);
                if (search) {
                    axios.get('/api/professores/' + search)
                        .then(function (response) {
                            self.professores = response.data;
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
            sala: {
                nome: {
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
