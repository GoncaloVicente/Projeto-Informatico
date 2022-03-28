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
                                   placeholder="Nome do professor"
                                   v-model="$v.professor.nome.$model">
                            <div class="error" style="color:red"
                                 v-if="!$v.professor.nome.required && $v.professor.nome.$anyDirty"><strong>Nome é obrigatório</strong>
                            </div>
                            <div style="color:red" v-if="!$v.professor.nome.spacesLetters && $v.professor.nome.$anyDirty"><strong>Nome apenas pode incluir espaços e letras</strong>
                            </div>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Email</label><label style="color: red;">&nbsp;*</label>
                            <input type="text" class="search-input form-control"
                                   placeholder="Email do professor"
                                   v-model="$v.professor.email.$model">
                            <div style="color:red" v-if="!$v.professor.email.required && $v.professor.email.$anyDirty"><strong>Email</strong>
                            </div>
                            <div style="color:red" v-if="!$v.professor.email.email && $v.professor.email.$anyDirty"><strong>Email não está no formato correto</strong>
                            </div>
                            <br>
                        </div>
                        <div class="form-group col-md-12">
                            <a class="btn btn-primary" @click.prevent="!$v.$invalid ? saveProfessor() : showErrors()">Guardar</a>
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
                professor: {
                    nome: '',
                    email: '',
                    cursos: [],
                    uC: [],
                },
            }
        },
        methods: {
            saveProfessor() {
                this.$emit('save-NewProfessor', this.professor)
            },
            cancelProfessor() {
                this.$emit('cancel-NewProfessor')
            },
            showErrors() {
                this.$v.$touch();
            },
        },
        validations: {
            professor: {
                nome: {
                    required,
                    spacesLetters
                },
                email: {
                    required,
                    email
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
