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
                                <th>Conteúdos associados à aula</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="aula in aulaConteudo">
                                <td>{{ aula.nome }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="form-group col-md-12">
                            <br>
                            <a  class="btn btn-primary" v-on:click.prevent="cancelAulaConteudo()">Cancelar</a>
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
        name: "aulaComConteudo",
        props: ['aulaConteudo'],
        methods: {
            cancelAulaConteudo() {
                this.$emit('cancel-aulaConteudo')
            },
        }
    }
</script>

<style scoped>

</style>
&
