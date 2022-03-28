<template>
    <div class="row">
        <br>
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-body no-padding">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Cursos em que está inserido</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            v-for="prof in profCurso">
                            <td>{{ prof.curso_id }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <br>
                    <div class="form-group col-md-12">
                        <a class="btn btn-primary" v-on:click.prevent="cancelAula()">Cancelar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "detalhes",
        props: ['profCurso'],
        methods: {
            cancelAula() {
                this.$emit('cancel-professor')
            },
        }
    }
</script>

<style scoped>

</style>
