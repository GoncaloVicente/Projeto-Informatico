<template>
    <StackLayout>
        <Label text="Selecione o professor(a) com que deseja marcar uma tutoria" horizontalAlignment="center" fontSize="13" style="margin-top: 5%; margin-bottom: 5%"/>
        <ActivityIndicator :busy="busy" v-if="busy"/>
        <Label v-if="busy" :text="busyText" horizontalAlignment="center"/>
        <RadListView ref="list_teachers" for="teacher in teachers" height="100%" @itemTap="onTeacherTap"
                     loadOnDemandMode="Auto" @loadMoreDataRequested="onLoadMoreItemsRequested" loadOnDemandBufferSize="2"
                     pullToRefresh="true" @pullToRefreshInitiated="refreshTable">
            <v-template>
                <StackLayout orientation="vertical">
                    <Label :text="teacher.professor_nome" class="name" fontSize="15"/>
                    <StackLayout orientation="vertical"  v-for="uc in teacher.ucs" :key="uc.id">
                        <Label :text="uc.nome"/>
                        <StackLayout orientation="horizontal">
                            <Label :text="uc.anoLetivo"/>
                            <Label :text="uc.semestre + 'º Semestre'"/>
                        </StackLayout>
                    </StackLayout>
                    <StackLayout class="hr"></StackLayout>
                </StackLayout>
            </v-template>
        </RadListView>
    </StackLayout>
</template>

<script>
    export default {
        data:function(){
            return{
                teachers: [],
                numberPages: "",
                numberItemsPage: 10,
                page: 1,
                busy: false,
                busyText: ""
            }
        },
        methods:{
            onTeacherTap(event){
                this.$emit('registerTutoring',event.item.professor_id,event.item.ucs,event.item.professor_nome);
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
                    this.$refs.list_teachers.nativeView.notifyAppendItemsOnDemandFinished(0, false);
                    this.$refs.list_teachers.nativeView.loadOnDemandMode = "None";
                    return;
                }

                this.page++;

                this.$store.state.http.request({
                    url: "http://142.93.142.208/api/aluno/"+this.$store.state.user.id+"/professores?page=" + this.page,
                    method: "GET"
                }).then((response) => {
                    response.content.toJSON().data.forEach(item => {
                        this.teachers.push(item);
                    });

                    this.$refs.list_teachers.nativeView.notifyAppendItemsOnDemandFinished(0, false);

                    if(this.page == this.numberPages){
                        this.$refs.list_teachers.nativeView.loadOnDemandMode = "None";
                    }
                }, (e) => {
                    console.log(e);
                });
            },
            refreshTable(){
                this.$store.state.http.request({
                    url: "http://142.93.142.208/api/aluno/"+this.$store.state.user.id+"/professores?page=1",
                    method: "GET"
                }).then((response) => {
                    this.teachers = response.content.toJSON().data;
                    this.numberPages = Math.ceil((response.content.toJSON().total/this.numberItemsPage));
                    this.page = 1;

                    this.$refs.list_teachers.nativeView.loadOnDemandMode = "Auto";
                    this.$refs.list_teachers.nativeView.notifyPullToRefreshFinished();
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
                url: "http://142.93.142.208/api/aluno/"+this.$store.state.user.id+"/professores?page=1",
                method: "GET"
            }).then((response) => {
                this.busy = false;
                this.teachers = response.content.toJSON().data;
                this.numberPages = Math.ceil((response.content.toJSON().total/this.numberItemsPage));
                this.page = 1;

                if(this.teachers.length < 1){
                    alert({
                        title: "Informação",
                        message: "Não está incrito em nenhuma unidade curricular",
                        okButtonText: "OK"
                    });

                    this.$emit('back');
                }
            }, (e) => {
                console.log(e);
            });
        }
    };
</script>

<style scoped>
    .name{
        font-weight: bold;
    }
</style>
