<template>
    <div class="row">
        <br>
        <form>
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-body no-padding">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>Unidades Curriculares do Curso</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="uc in cursoUc">
                                <td>{{ uc.nome }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="form-group col-md-12">
                            <br>
                            <a class="btn btn-primary" v-on:click.prevent="cancelCursoUc()">Cancelar</a>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "cursoUnidadeCurricular",
        props: ['cursoUc'],
        methods: {
            cancelCursoUc() {
                this.$emit('cancel-cursoUc')
            },
        }
    }
</script>

<style scoped>

</style>
&
