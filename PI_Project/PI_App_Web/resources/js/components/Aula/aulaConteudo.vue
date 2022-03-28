<template>
    <div class="row">
        <div class="col-xs-12" hidden>
            <div class="box box-default">
                <div class="box-header with-border">
                    <h3 class="box-title">Modal Examples</h3>
                </div>
                <div class="box-body">
                    <button type="button" id="modal" class="btn btn-default" data-toggle="modal" data-target="#modal-default">
                        Launch Default Modal
                    </button>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modal-default">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Adicionar conteúdo</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-2">

                            </div>
                            <div class="col-md-8" style="margin-left: 50px;">
                                <div class="transfer1">

                                </div>
                            </div>
                            <div class="col-md-2">

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-on:click.prevent="saveAulaConteudo()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DualListBox from "dual-listbox-vue";
    import "dual-listbox-vue/dist/dual-listbox.css";
    export default {
        name: "aulaConteudo",
        components: {
            DualListBox,
        },
        props: ['temas', 'conteudosAssociados'],
        data: function () {
            return {
                destination: this.conteudosAssociados,
                source: this.temas,
                transferInstance: null,
            };
        },
        methods: {
            onChangeList: function ({source, destination}) {
                this.source = source;
                this.destination = destination;
            },
            saveAulaConteudo() {
                let selectedItens = this.transferInstance.getSelectedItems();
                this.$emit('save-aulaConteudo', selectedItens);
            },
            buildJqueryTransfer(){
                let settings3 = {
                    "groupDataArray": this.temas,
                    "groupItemName": "nome",
                    "groupArrayName": "conteudos",
                    "itemName": "nome",
                    "valueName": "id",
                    "tabNameText": "Temas e Conteúdos",
                    "rightTabNameText": "Conteúdos selecionados",
                    "searchPlaceholderText": "Procurar ...",
                    "callable": function (items) {
                    }
                };
                this.transferInstance = $(".transfer1").transfer(settings3);
            },
        },
        watch: {
            temas: function (val) {
                this.source = val;
                $( ".transfer1" ).empty();
                this.buildJqueryTransfer();
            },
            conteudosAssociados: function (val) {
                this.destination = val;
            }
        }
    };
</script>

<style scoped>

</style>
