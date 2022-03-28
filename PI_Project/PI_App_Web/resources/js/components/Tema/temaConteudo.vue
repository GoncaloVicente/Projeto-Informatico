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
                                <th>Conteúdos associados ao tema</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="tema in temaConteudo">
                                <td>{{ tema.nome }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="form-group col-md-12">
                            <br>
                            <a class="btn btn-primary" v-on:click.prevent="cancelTemaConteudo()">Cancelar</a>
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
        name: "temaConteudo",
        props: ['temaConteudo'],
        methods: {
            cancelTemaConteudo() {
                this.$emit('cancel-TemaConteudo')
            },
        }
    }
</script>

<style scoped>

</style>
