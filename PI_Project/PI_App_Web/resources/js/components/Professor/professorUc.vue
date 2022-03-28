<template>
    <div class="row">
        <br>
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-body no-padding">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Unidades curriculares que leciona</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            v-for="prof in profUC">
                            <td>{{ prof.uC_id }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <br>
                    <div class="form-group col-md-12">
                        <a class="btn btn-primary" v-on:click.prevent="cancelProfUC()">Cancelar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "professorUc",
        props: ['profUC'],
        methods: {
            cancelProfUC() {
                this.$emit('cancel-professorUC')
            },
        }
    }
</script>

<style scoped>

</style>
