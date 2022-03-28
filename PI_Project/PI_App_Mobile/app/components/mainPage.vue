<template>
    <Page actionBarHidden="true">
        <RadSideDrawer ref="drawer" drawerLocation="Left" gesturesEnabled="true">
            <StackLayout ~drawerContent>
                <StackLayout class="nt-drawer__header">
                    <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;" style="color:white"></Image>
                    <Label :text="name" class="header-elem"></Label>
                    <Label :text="email" class="header-elem"></Label>
                </StackLayout>

                <ScrollView class="nt-drawer__body">
                    <StackLayout>
                        <GridLayout columns="auto,*" :backgroundColor="selectedPage === 'initialPage' ? '#e0f5ff' : 'white'" :color="selectedPage === 'initialPage' ? '#0088c9' : 'black'" class="nt-drawer__list-item" @tap="onNavigationItemTap('initialPage', 'Página inicial')">
                            <Label text.decode="&#xf015;" class="nt-icon fas" col="0"></Label>
                            <Label text="Página inicial" col="1"></Label>
                        </GridLayout>

                        <GridLayout columns="auto,*" :backgroundColor="selectedPage === 'previousClassesPage' || selectedPage === 'previousClassificationsPage' ? '#e0f5ff' : 'white'" :color="selectedPage === 'previousClassesPage' || selectedPage === 'previousClassificationsPage' ? '#0088c9' : 'black'" :class="'nt-drawer__list-item'" @tap="onNavigationItemTap('previousClassesPage', 'Aulas anteriores')">
                            <Label text.decode="&#xf1da;" class="nt-icon fas" col="0"></Label>
                            <Label text="Aulas anteriores" col="1"></Label>
                        </GridLayout>

                        <GridLayout columns="auto,*" :backgroundColor="selectedPage === 'scheduleTutoring' || selectedPage === 'registerTutoring' ? '#e0f5ff' : 'white'" :color="selectedPage === 'scheduleTutoring' || selectedPage === 'registerTutoring' ? '#0088c9' : 'black'" class="nt-drawer__list-item" @tap="onNavigationItemTap('scheduleTutoring', 'Marcar tutoria')">
                            <Label text.decode="&#xf271;" class="nt-icon fas" col="0"></Label>
                            <Label text="Marcar tutoria" col="1"></Label>
                        </GridLayout>

                        <GridLayout columns="auto,*" :backgroundColor="selectedPage === 'listTutorials' || selectedPage === 'editTutorial' ? '#e0f5ff' : 'white'" :color="selectedPage === 'listTutorials' || selectedPage === 'editTutorial' ? '#0088c9' : 'black'" class="nt-drawer__list-item" @tap="onNavigationItemTap('listTutorials', 'Pedidos de tutoria')">
                            <Label text.decode="&#xf0ca;" class="nt-icon fas" col="0"></Label>
                            <Label text="Pedidos de tutoria" col="1"></Label>
                        </GridLayout>

                        <GridLayout columns="auto,*" :backgroundColor="selectedPage === 'listArchivedTutorials' ? '#e0f5ff' : 'white'" :color="selectedPage === 'listArchivedTutorials' ? '#0088c9' : 'black'" class="nt-drawer__list-item" @tap="onNavigationItemTap('listArchivedTutorials', 'Pedidos de tutoria arquivados')">
                            <Label text.decode="&#xf187;" class="nt-icon fas" col="0"></Label>
                            <Label text="Pedidos de tutoria arquivados" col="1"></Label>
                        </GridLayout>

                        <StackLayout class="hr"></StackLayout>

                        <GridLayout columns="auto,*" class="nt-drawer__list-item" @tap="logout">
                            <Label text.decode="&#xf2f5;" class="nt-icon fas" col="0"></Label>
                            <Label text="Terminar sessão" col="1"></Label>
                        </GridLayout>
                    </StackLayout>
                </ScrollView>
            </StackLayout>

            <Frame ~mainContent>
                <Page>
                    <ActionBar :title="title" style="color:white">
                        <android v-if="this.$store.state.isAndroid">
                            <NavigationButton icon="res://menu" @tap="openMenu"/>
                            <ActionItem>
                                <FlexboxLayout alignContent="flex-end" v-if="selectedPage=='previousClassificationsPage'">
                                    <Image height="55%" style="margin-right: 3%" src="~/others/info-icon-white.png" strech="none" @tap="seeClassInfo"/>
                                </FlexboxLayout>
                            </ActionItem>
                        </android>
                        <ios v-else>
                            <ActionItem icon="res://menu" ios.position="left" @tap="openMenu"/>
                            <ActionItem v-show="selectedPage=='previousClassificationsPage'" icon="res://info" ios.position="right" @tap="seeClassInfo"/>
                        </ios>
                    </ActionBar>

                    <StackLayout v-if="selectedPage=='initialPage'" class="center-item">
                        <initial-page v-on:class="enterClass"/>
                    </StackLayout>

                    <StackLayout v-else-if="selectedPage=='previousClassesPage'">
                        <previous-classes-page :itemSelected="itemSelectedClass" v-on:seeClassifications="enterClassificationsPage" v-on:back="goingBack"/>
                    </StackLayout>

                    <StackLayout v-else-if="selectedPage=='scheduleTutoring'">
                        <schedule-tutoring v-on:registerTutoring="enterRegisterTutoring" v-on:back="goingBack"/>
                    </StackLayout>

                    <StackLayout v-else-if="selectedPage=='registerTutoring'">
                        <register-tutoring :teacher_id="teacher" :course_units="units" :teacher_name="tName" v-on:backTeachers="seeTeachers"/>
                    </StackLayout>

                    <StackLayout v-else-if="selectedPage=='listTutorials'">
                        <list-tutorials :itemSelected="itemSelectedTutorial" v-on:editTutorial="enterEditTutorial" v-on:back="goingBack"/>
                    </StackLayout>

                    <StackLayout v-else-if="selectedPage=='editTutorial'">
                        <edit-tutorial :tutorial="tutorialEdit" v-on:backListTutorials="seeListTutorials"/>
                    </StackLayout>

                    <StackLayout v-else-if="selectedPage=='listArchivedTutorials'">
                        <list-archived-tutorials v-on:back="goingBack"/>
                    </StackLayout>

                    <StackLayout v-else-if="selectedPage=='previousClassificationsPage'">
                            <previous-classifications-page :classSelected="classSelected" v-on:back="goingBackClasses"/>
                    </StackLayout>
                </Page>
            </Frame>
        </RadSideDrawer>
    </Page>
</template>

<script>
    import classPage from "./classPage";
    import loginPage from "./loginPage";

    export default {
        data:function(){
            return{
                name: this.$store.state.user.nome,
                email: this.$store.state.user.numero + "@my.ipleiria.pt",
                title: "Página inicial",
                selectedPage: "initialPage",
                teacher: "",
                units: [],
                tName: "",
                tutorialEdit: "",
                classSelected: "",
                itemSelectedClass: 0,
                itemSelectedTutorial: 0
            }
        },
        methods:{
            openMenu(){
                this.$refs.drawer.showDrawer();
            },
            onNavigationItemTap(page,title){
                this.itemSelectedClass = 0;
                this.itemSelectedTutorial = 0;
                this.selectedPage = page;
                this.title = title;
                this.$refs.drawer.closeDrawer();
            },
            enterClass(code){
                if(code.trim().length < 1) {
                    alert({
                        title: "Erro",
                        message: "Insira um código",
                        okButtonText: "OK"
                    });
                }else if(!(/^\d+$/.test(code))){
                    alert({
                        title: "Erro",
                        message: "Insira um valor numérico",
                        okButtonText: "OK"
                    });
                }else{
                    this.$store.state.http.request({
                        url: "http://142.93.142.208/api/aula/registar",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({
                            codigo_aula: code,
                            aluno_id: this.$store.state.user.id
                        })
                    }).then((response) => {
                        if(response.statusCode == 404 || response.statusCode == 400){   //ERRO
                            alert({
                                title: "Erro",
                                message: response.content.toJSON().msg,
                                okButtonText: "OK"
                            });
                        }else if(response.statusCode == 200){                           //CORREU BEM
                            this.$navigateTo(classPage,{
                                props: {
                                    class_id: response.content.toJSON().aula_id,
                                }
                            }).catch(e=>console.log(e));
                        }
                    }, (e) => {
                        console.log(e);
                    });
                }
            },
            enterRegisterTutoring(id,arr,name){
                this.teacher = id;
                this.units = arr;
                this.tName = name;
                this.selectedPage = "registerTutoring";
                this.title = "Marcar tutoria";
            },
            goingBack(){
                this.selectedPage = "initialPage";
                this.title = "Página inicial";
            },
            seeTeachers(){
                this.selectedPage = "scheduleTutoring";
                this.title = "Marcar tutoria";
            },
            enterEditTutorial(tutorial){
                this.tutorialEdit = tutorial;
                this.itemSelectedTutorial = tutorial.id;
                this.selectedPage = "editTutorial";
                this.title = "Editar pedido de tutoria";
            },
            seeListTutorials(){
                this.selectedPage = "listTutorials";
                this.title = "Pedidos de tutoria";
            },
            enterClassificationsPage(classSelected){
                this.classSelected = classSelected;
                this.itemSelectedClass = classSelected.id;
                this.selectedPage = "previousClassificationsPage";
                this.title = "Classificações";
            },
            goingBackClasses(){
                this.selectedPage = "previousClassesPage";
                this.title = "Aulas anteriores";
            },
            convertDate(date){
                let objDate = new Date(date);
                return (objDate.getDate() < 10 ? "0"+objDate.getDate() : objDate.getDate()) + "-" + ((objDate.getMonth() + 1) < 10 ? "0"+(objDate.getMonth() + 1) : (objDate.getMonth() + 1)) + "-" + objDate.getFullYear();
            },
            seeClassInfo(){
                alert({
                    title: "Informação - Aula",
                    message: "\nData: "+this.convertDate(this.classSelected.data)+"\n\nUnidade Curricular: "+this.classSelected.unidade_curricular+"\n\nProfessor(a): "+this.classSelected.professor,
                    okButtonText: "Fechar"
                });
            },
            logout(){
                let vm = this;
                confirm({
                    title: "Terminar sessão",
                    message: "Tem a certeza que deseja terminar a sessão atual?",
                    okButtonText: "Sim",
                    cancelButtonText: "Não"
                }).then(function (result) {
                    if(result){
                        vm.$store.commit('destroyUser');
                        vm.$store.state.appSettings.clear();
                        vm.$navigateTo(loginPage);
                    }else{
                        vm.$refs.drawer.closeDrawer();
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .header-elem{
        color:white;
    }

    .center-item{
        vertical-align: center;
        horiz-align: center;
        width:85%;
    }
</style>
