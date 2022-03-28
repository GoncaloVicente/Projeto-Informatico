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
                                <th>Professores da Unidade Curricular</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="uc in uCProfessor">
                                <td>{{ uc.professor_id }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="form-group col-md-12">
                            <br>
                            <a class="btn btn-primary" v-on:click.prevent="cancelUCProf()">Cancelar</a>
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
        name: "unidadeCurricularProfessor",
        props: ['uCProfessor'],
        methods: {
            cancelUCProf() {
                this.$emit('cancel-ucProf')
            },
        }
    }
</script>

<style scoped>

</style>
