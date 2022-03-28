<template>
    <div class="row">
        <div class="modal fade" id="modal-default1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Adicionar conteúdo</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row" style="margin-left: 0px !important; margin-right: 0px !important;">
                            <div class="col-md-1"></div>
                            <div class="col-md-8" style="margin-left:25px;">
                                <div class="transfer">

                                </div>
                            </div>
                            <div class="col-md-3"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-on:click.prevent="saveAulaConteudo()">Guardar
                        </button>
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
        name: "adicionarAulaConteudo",
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
                this.$emit('save-aulaconteudo', selectedItens);
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
                this.transferInstance = $(".transfer").transfer(settings3);
            },
        },
        watch: {
            temas: function (val) {
                this.source = val;
                $( ".transfer" ).empty();
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
