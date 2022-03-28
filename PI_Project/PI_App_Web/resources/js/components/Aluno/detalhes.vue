<template>
    <div class="row">
        <br>
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-body no-padding">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Unidades Curriculares Inscritas</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            v-for="aluno in alunoUc">
                            <td>{{ aluno.uC_id }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <br>
                    <div class="form-group col-md-12">
                        <a class="btn btn-primary" v-on:click.prevent="cancelAluno()">Cancelar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "detalhes",
        props: ['alunoUc'],
        methods: {
            cancelAluno() {
                this.$emit('cancel-aluno')
            },
        }
    }
</script>

<style scoped>

</style>
