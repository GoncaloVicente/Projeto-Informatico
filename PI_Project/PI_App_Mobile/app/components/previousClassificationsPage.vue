<template>
    <StackLayout style="horiz-align: center">
        <ActivityIndicator :busy="busy" v-if="busy"/>
        <Label v-if="busy" :text="busyText" horizontalAlignment="center"/>
        <RadListView ref="list_classifications" for="classification in classifications" @itemTap="onClassificationTap" class="list" height="85%"
                     loadOnDemandMode="Auto" @loadMoreDataRequested="onLoadMoreItemsRequested" loadOnDemandBufferSize="2"
                     pullToRefresh="true" @pullToRefreshInitiated="refreshTable">
            <v-template name="header">
                <StackLayout>
                    <GridLayout rows="auto" columns="*,*">
                        <GridLayout rows="auto" columns="auto,auto" row="0" col="0" horizontalAlignment="center">
                            <Label text="Conteúdo" class="header" fontSize="15" row="0" col="0" @tap="changeSortingContent"/>
                            <Image v-if="sortingClassifications['contentSorting'] == 'desc'" src="~/others/desc.png" width="5%" row="0" col="1"/>
                            <Image v-else-if="sortingClassifications['contentSorting'] == 'asc'" src="~/others/asc.png" width="5%"  row="0" col="1"/>
                            <Image v-else src="~/others/no_sorting.png" width="5%" row="0" col="1"/>
                        </GridLayout>
                        <GridLayout rows="auto" columns="auto,auto" row="0" col="1" horizontalAlignment="center">
                            <Label text="Classificação" class="header" fontSize="15" row="0" col="0" @tap="changeSortingClassification"/>
                            <Image v-if="sortingClassifications['classificationSorting'] == 'desc'" src="~/others/desc.png" width="5%" row="0" col="1"/>
                            <Image v-else-if="sortingClassifications['classificationSorting'] == 'asc'" src="~/others/asc.png" width="5%"  row="0" col="1"/>
                            <Image v-else src="~/others/no_sorting.png" width="5%" row="0" col="1"/>
                        </GridLayout>
                    </GridLayout>
                </StackLayout>
            </v-template>
            <v-template>
                <StackLayout>
                    <StackLayout orientation="horizontal" :class="classification.id == itemSelected ? 'selected' : ''">
                        <Label :text="classification.conteudo" width="75%"/>
                        <Label :text="(classification.valor == null ? 'N/D' : classification.valor)"/>
                    </StackLayout>
                    <StackLayout class="hr"></StackLayout>
                </StackLayout>
            </v-template>
        </RadListView>

        <Button text="Ver lista de aulas" width="50%" fontSize="15" verticalAlignment="bottom" horizontalAlignment="center" @tap="chooseClass"/>
    </StackLayout>
</template>

<script>
    export default {
        props: ['classSelected'],
        data:function(){
            return{
                classifications: [],
                sortingClassifications:{
                    contentSorting: "",
                    classificationSorting:""
                },
                itemSelected: 0,
                numberPages: "",
                numberItemsPage: 10,
                page: 1,
                busy: false,
                busyText: ""
            }
        },
        methods:{
            onClassificationTap(event){
                this.itemSelected = event.item.id;

                this.$refs.list_classifications.nativeView.refresh();

                switch(event.item.tipo){
                    case 'expl':
                        event.item.tipo = 'Exercício Prático-Laboratorial';
                        break;
                    case 'ext':
                        event.item.tipo = 'Exercício Teórico';
                        break;
                    case 't':
                        event.item.tipo = 'Teórico';
                        break;
                    case 'pl':
                        event.item.tipo = 'Prático-Laboratorial';
                        break;
                }

                alert({
                    title: "Informação - Conteúdo",
                    message: "\nConteúdo: "+event.item.conteudo+"\n\nTema: "+event.item.tema+"\n\nTipo: "+event.item.tipo+"\n\nDescição: "+(event.item.descricao == null ? "Vazia" : event.item.descricao)+"\n\nClassificação: "+(event.item.valor == null ? "N/D" : event.item.valor),
                    okButtonText: "Fechar"
                });
            },
            changeSortingContent(){
                this.sortingClassifications['contentSorting'] = this.sortingClassifications['contentSorting'] == 'asc' ? 'desc' : 'asc';
                this.sortingClassifications['classificationSorting'] = '';
            },
            changeSortingClassification(){
                this.sortingClassifications['classificationSorting'] = this.sortingClassifications['classificationSorting'] == 'desc' ? 'asc' : 'desc';
                this.sortingClassifications['contentSorting'] = '';
            },
            chooseClass(){
                this.$emit('back');
            },
            onBackEvent (data) {
                data.cancel = true;
                this.$emit('back');
            },
            setHook(){
                if(this.$store.state.isAndroid){
                    this.$store.state.android.on(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
                }
            },
            clearHook(){
                if(this.$store.state.isAndroid){
                    this.$store.state.android.off(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
                }
            },
            onLoadMoreItemsRequested(){
                if(this.page == this.numberPages){
                    this.$refs.list_classifications.nativeView.notifyAppendItemsOnDemandFinished(0, false);
                    this.$refs.list_classifications.nativeView.loadOnDemandMode = "None";
                    return;
                }

                this.page++;

                let variables = 'page=' + this.page + '&conteudoS=' + this.sortingClassifications.contentSorting + '&classificacaoS=' + this.sortingClassifications.classificationSorting;

                this.$store.state.http.request({
                    url: "http://142.93.142.208/api/aula/"+this.classSelected.id+"/aluno/"+this.$store.state.user.id+"/classificacoes/total?" + variables,
                    method: "GET"
                }).then((response) => {
                    response.content.toJSON().data.forEach(item => {
                        this.classifications.push(item);
                    });

                    this.$refs.list_classifications.nativeView.notifyAppendItemsOnDemandFinished(0, false);

                    if(this.page == this.numberPages){
                        this.$refs.list_classifications.nativeView.loadOnDemandMode = "None";
                    }
                }, (e) => {
                    console.log(e);
                });
            },
            refreshTable(){
                let variables = 'conteudoS=' + this.sortingClassifications.contentSorting + '&classificacaoS=' + this.sortingClassifications.classificationSorting;

                this.$store.state.http.request({
                    url: "http://142.93.142.208/api/aula/"+this.classSelected.id+"/aluno/"+this.$store.state.user.id+"/classificacoes/total?page=1&" + variables,
                    method: "GET"
                }).then((response) => {
                    this.classifications = response.content.toJSON().data;

                    this.numberPages = Math.ceil((response.content.toJSON().total/this.numberItemsPage));
                    this.page = 1;
                    this.$refs.list_classifications.nativeView.loadOnDemandMode = "Auto";
                    this.$refs.list_classifications.nativeView.notifyPullToRefreshFinished();
                }, (e) => {
                    console.log(e);
                });
            }
        },
        mounted() {
            this.setHook();
        },
        beforeDestroy() {
            this.clearHook();
        },
        created(){
            if(this.$store.state.isAndroid){
                this.busyText = "A carregar...";
                this.busy = true;
            }
            this.$store.state.http.request({
                url: "http://142.93.142.208/api/aula/"+this.classSelected.id+"/aluno/"+this.$store.state.user.id+"/classificacoes/total",
                method: "GET"
            }).then((response) => {
                this.busy = false;
                this.classifications = response.content.toJSON().data;
                this.numberPages = Math.ceil((response.content.toJSON().total/this.numberItemsPage));
                this.page = 1;

                if(this.classifications.length < 1){
                    alert({
                        title: "Informação",
                        message: "A aula não tem conteúdos associados",
                        okButtonText: "OK"
                    });

                    this.$emit('back');
                }
            }, (e) => {
                console.log(e);
            });
        },
        watch: {
            sortingClassifications: {
                deep: true,
                handler() {
                    let variables = 'conteudoS=' + this.sortingClassifications.contentSorting + '&classificacaoS=' + this.sortingClassifications.classificationSorting;

                    this.$store.state.http.request({
                        url: "http://142.93.142.208/api/aula/"+this.classSelected.id+"/aluno/"+this.$store.state.user.id+"/classificacoes/total?page=1&" + variables,
                        method: "GET"
                    }).then((response) => {
                        this.classifications = response.content.toJSON().data;

                        let offset = -this.$refs.list_classifications.nativeView.getScrollOffset();
                        this.$refs.list_classifications.nativeView.scrollWithAmount(offset,false);

                        this.numberPages = Math.ceil((response.content.toJSON().total/this.numberItemsPage));
                        this.page = 1;
                        this.$refs.list_classifications.nativeView.loadOnDemandMode = "Auto";
                    }, (e) => {
                        console.log(e);
                    });
                }
            }
        }
    };
</script>

<style scoped>
    .list{
        margin-top: 5%;
    }
    .selected{
        background-color: #123456;
        color: white;
    }
    .header{
        font-weight: bold;
    }
</style>
