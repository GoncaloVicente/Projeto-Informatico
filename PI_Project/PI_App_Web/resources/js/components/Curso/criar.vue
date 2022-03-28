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
                                   placeholder="Nome do curso"
                                   v-model="$v.curso.nome.$model">
                            <div class="error" style="color:red"
                                 v-if="!$v.curso.nome.required && $v.curso.nome.$anyDirty"><strong>Nome é obrigatório</strong>
                            </div>
                            <div style="color:red" v-if="!$v.curso.nome.spacesLetters && $v.curso.nome.$anyDirty"><strong>Nome apenas pode incluir espaços e letras</strong>
                            </div>
                            <br>
                        </div>
                        <div class="form-group col-md-12">
                            <a class="btn btn-primary"@click.prevent="!$v.$invalid ? saveCurso() : showErrors()">Guardar</a>
                            <a class="btn btn-light" v-on:click.prevent="cancelCurso()">Cancelar</a>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
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
        data: function () {
            return {
                curso: {
                    nome: '',
                },
            }
        },
        methods: {
            saveCurso() {
                this.$emit('save-NewCurso', this.curso)
            },
            cancelCurso() {
                this.$emit('cancel-NewCurso')
            },
            showErrors() {
                this.$v.$touch();
            },
        },
        validations: {
            curso: {
                nome: {
                    required,
                    spacesLetters
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
