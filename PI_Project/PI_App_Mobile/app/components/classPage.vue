<template>
    <Page actionBarHidden="true">
        <RadSideDrawer ref="drawerContent" drawerLocation="Left" gesturesEnabled="true">
            <StackLayout ~drawerContent>
                <StackLayout class="nt-drawer__header">
                    <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;" style="color:white"></Image>
                    <Label :text="name" class="header-elem"></Label>
                    <Label :text="email" class="header-elem"></Label>
                </StackLayout>

                <ScrollView class="nt-drawer__body">
                    <StackLayout>
                        <GridLayout v-for="content in contents" :key="content.id" columns="*" class="nt-drawer__list-item" :backgroundColor="selectedContent.nome === content.nome ? '#e0f5ff' : 'white'" :color="selectedContent.nome === content.nome ? '#0088c9' : 'black'" @tap="onNavigationItemTap(content)">
                            <Label :text="getContentClassification(content.id) + content.nome" :class="(checkClassification(content.id)) ? 'have_classification': ''" col="0"/>
                        </GridLayout>
                    </StackLayout>
                </ScrollView>
            </StackLayout>

            <Frame ~mainContent>
                <Page>
                    <ActionBar :title="course_unit" style="color:white" @tap="seeTitle">
                        <android v-if="this.$store.state.isAndroid">
                            <NavigationButton icon="res://menu" @tap="openMenu"/>
                            <ActionItem>
                                <Label text="Sair" fontSize="15" horizontalAlignment="right" style="font-weight: bold" @tap="exit"/>
                            </ActionItem>
                        </android>
                        <ios v-else>
                            <ActionItem icon="res://menu" ios.position="left" @tap="openMenu"/>
                            <ActionItem text="Sair" ios.position="right" @tap="exit"/>
                        </ios>
                    </ActionBar>

                    <GridLayout rows="*" columns="*" height="100%" width="100%" horizontalAlignment="center" verticalAlignment="center">
                        <StackLayout row="0" col="0" verticalAlignment="center" horizontalAlignment="center">
                            <ActivityIndicator :busy="busy" v-if="busy"/>
                            <Label v-if="busy" :text="busyText" horizontalAlignment="center"/>
                            <GridLayout columns="*,auto" rows="auto" horizontalAlignment="center">
                                <Label :text="selectedContent.nome" textAlignment="center" fontSize="35" col="0" row="0"/>
                                <Image src="~/others/info-icon.png" strech="none" width="8%" col="1" row="0" @tap="showInfo"/>
                            </GridLayout>

                            <Label text="Avalie a sua compreensão sobre este conteúdo" horizontalAlignment="center" style="margin-top: 5%"/>

                            <GridLayout columns="auto,auto,auto,auto,auto" rows="auto,auto" style="margin-top: 5%; margin-bottom: 15%">
                                <Image src="~/scale/1.png" strech="none" col="0" width="20%" row="0" @tap="onClassButtonTap(1)"/>
                                <Image src="~/scale/2.png" strech="none" col="1" width="20%" row="0" @tap="onClassButtonTap(2)"/>
                                <Image src="~/scale/3.png" strech="none" col="2" width="20%" row="0" @tap="onClassButtonTap(3)"/>
                                <Image src="~/scale/4.png" strech="none" col="3" width="20%" row="0" @tap="onClassButtonTap(4)"/>
                                <Image src="~/scale/5.png" strech="none" col="4" width="20%" row="0" @tap="onClassButtonTap(5)"/>
                                <Image src="~/others/1.png" strech="none" col="0" row="1" width="10%" horizontalAlignment="center" :visibility="selectedClass == 1 ? 'visible' : 'collapsed'"/>
                                <Image src="~/others/2.png" strech="none" col="1" row="1" width="10%" horizontalAlignment="center" :visibility="selectedClass == 2 ? 'visible' : 'collapsed'"/>
                                <Image src="~/others/3.png" strech="none" col="2" row="1" width="10%" horizontalAlignment="center" :visibility="selectedClass == 3 ? 'visible' : 'collapsed'"/>
                                <Image src="~/others/4.png" strech="none" col="3" row="1" width="10%" horizontalAlignment="center" :visibility="selectedClass == 4 ? 'visible' : 'collapsed'"/>
                                <Image src="~/others/5.png" strech="none" col="4" row="1" width="10%" horizontalAlignment="center" :visibility="selectedClass == 5 ? 'visible' : 'collapsed'"/>
                            </GridLayout>
                        </StackLayout>

                        <GridLayout columns="*,*" rows="auto" verticalAlignment="bottom" row="0" col="0">
                            <Image src="~/others/left-arrow.png" strech="none" width="15%" col="0" row="0"  verticalAlignment="bottom" horizontalAlignment="left" class="arrow-left" @tap="seePrevious" :visibility="arrowLeftVis"/>
                            <Image src="~/others/right-arrow.png" strech="none" width="15%" col="1" row="0" verticalAlignment="bottom" horizontalAlignment="right" class="arrow-right" @tap="seeNext" :visibility="arrowRightVis"/>
                        </GridLayout>
                    </GridLayout>
                </Page>
            </Frame>
        </RadSideDrawer>
    </Page>
</template>

<script>
    import mainPage from "./mainPage";

    export default {
        props: ['class_id'],
        data:function(){
            return{
                name: this.$store.state.user.nome,
                email: this.$store.state.user.numero + "@my.ipleiria.pt",
                course_unit: "",
                teacher_name: "",
                contents: [],
                selectedContent: {},
                classifications: [],
                oldClass: [],
                class_cont: [],
                selectedClass: "",
                arrowRightVis: "visible",
                arrowLeftVis: "collapsed",
                idxSelectedContent: 0,
                busy: false,
                busyText: ""
            }
        },
        methods:{
            seeTitle(){
                alert({
                    title: "Informação - Aula",
                    message: "\nUnidade Curricular: "+this.course_unit+"\n\nProfessor(a): "+this.teacher_name,
                    okButtonText: "Fechar"
                });
            },
            exit(){
                let vm = this;
                confirm({
                    title: "Sair",
                    message: "Tem a certeza que deseja sair da aula atual?",
                    okButtonText: "Sim",
                    cancelButtonText: "Não"
                }).then(function (result) {
                    if(result){
                        vm.clearHook();
                        vm.$navigateTo(mainPage).catch(e=>console.log(e));
                    }
                });
            },
            openMenu(){
                this.$refs.drawerContent.showDrawer();
            },
            onNavigationItemTap(content){
                this.idxSelectedContent = this.contents.indexOf(content);
                if(this.idxSelectedContent < 1){
                    this.arrowRightVis = "visible";
                    this.arrowLeftVis = "collapsed";
                }else if(this.idxSelectedContent > (this.contents.length-2)){
                    this.arrowRightVis = "collapsed";
                    this.arrowLeftVis = "visible";
                }else{
                    this.arrowRightVis = "visible";
                    this.arrowLeftVis = "visible";
                }

                this.selectedContent = content;
                this.changeColorBtn(null);
                this.$refs.drawerContent.closeDrawer();
            },
            seeNext(){
                this.onNavigationItemTap(this.contents[this.idxSelectedContent+1]);
            },
            seePrevious(){
                this.onNavigationItemTap(this.contents[this.idxSelectedContent-1]);
            },
            onClassButtonTap(classification) {
                if (this.oldClass.length > 0){
                    if (classification == this.oldClass[0].classification && this.selectedContent.id == this.oldClass[0].content_id) {
                        return;
                    }
                }

                let vm = this;

                if(this.classifications.indexOf(this.selectedContent.id) < 0){  //STORE
                    this.$store.state.http.request({
                        url: "http://142.93.142.208/api/classificacao",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({
                            valor: classification,
                            conteudo_id: this.selectedContent.id,
                            aluno_id: this.$store.state.user.id,
                            aula_id: this.class_id
                        })
                    }).then((response) => {
                        if(response.statusCode == 404 || response.statusCode == 400){   //ERRO
                            alert({
                                title: "Erro",
                                message: response.content.toJSON().msg,
                                okButtonText: "OK"
                            });

                            if(response.content.toJSON().estado == 1){
                                vm.$navigateTo(mainPage).catch(e=>console.log(e));
                            }
                        }else if(response.statusCode == 200){                           //CORREU BEM
                            this.changeColorBtn(classification);
                            this.classifications.push(this.selectedContent.id);
                            this.oldClass[0] = {content_id:this.selectedContent.id,classification:classification};
                        }
                    }, (e) => {
                        console.log(e);
                    });
                }else{                                                          //UPDATE
                    this.$store.state.http.request({
                        url: "http://142.93.142.208/api/classificacao",
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({
                            valor: classification,
                            conteudo_id: this.selectedContent.id,
                            aluno_id: this.$store.state.user.id,
                            aula_id: this.class_id
                        })
                    }).then((response) => {
                        if(response.statusCode == 404 || response.statusCode == 400){   //ERRO
                            alert({
                                title: "Erro",
                                message: response.content.toJSON().msg,
                                okButtonText: "OK"
                            });

                            if(response.content.toJSON().estado == 1){
                                vm.$navigateTo(mainPage).catch(e=>console.log(e));
                            }
                        }else if(response.statusCode == 200){                           //CORREU BEM
                            this.oldClass[0] = {content_id:this.selectedContent.id,classification:classification};
                            this.changeColorBtn(classification);
                        }
                    }, (e) => {
                        console.log(e);
                    });
                }
            },
            showInfo(){
                alert({
                    title: "Informação - Conteúdo",
                    message: "\nDesignação: "+this.selectedContent.nome+"\n\nTema: "+this.selectedContent.tema.nome+"\n\nTipo: "+this.selectedContent.tipo+"\n\nDescição: "+ (this.selectedContent.descricao == null ? "Vazia" : this.selectedContent.descricao),
                    okButtonText: "Fechar"
                });
            },
            changeColorBtn(newClass){
                if(this.classifications.indexOf(this.selectedContent.id) < 0 && newClass==null){
                    this.selectedClass = "";
                    return;
                }

                if(this.classifications.indexOf(this.selectedContent.id) < 0 && newClass!=null){
                    this.class_cont.push({conteudo_id: this.selectedContent.id, valor: newClass});
                    this.selectedClass = newClass;
                    return;
                }

                let valor = 0;
                this.class_cont.forEach(item => {
                    if(item.conteudo_id == this.selectedContent.id){
                        if(newClass == null){
                            valor = item.valor;
                        }else{
                            item.valor = newClass;
                            valor = newClass;
                        }
                    }
                });

                this.selectedClass = valor;
            },
            getContentClassification(content_id){
                if(this.classifications.indexOf(content_id) < 0){
                    return '';
                }

                let valor = 0;
                this.class_cont.forEach(item => {
                    if(item.conteudo_id == content_id){
                        valor = item.valor;
                    }
                });

                return '(' + valor + ') ';
            },
            checkClassification(content_id){
                return this.classifications.indexOf(content_id) >= 0;
            },
            onBackEvent (data) {
                data.cancel = true;
                this.exit();
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
            }
        },
        mounted() {
            this.setHook();
        },
        beforeDestroy() {
            this.clearHook();
        },
        created(){
            this.busyText = "A carregar...";
            this.busy = true;
            this.$store.state.http.request({
                url: "http://142.93.142.208/api/aula/"+this.class_id,
                method: "GET"
            }).then((response) => {
                this.course_unit = response.content.toJSON().unidade_curricular.nome;
                this.teacher_name = response.content.toJSON().professor.nome;

                this.$store.state.http.request({
                    url: "http://142.93.142.208/api/aula/"+this.class_id+"/conteudos",
                    method: "GET"
                }).then((response) => {
                    this.contents = response.content.toJSON();
                    if(this.contents.length < 1){
                        alert({
                            title: "Informação",
                            message: "Esta aula não tem conteúdos",
                            okButtonText: "OK"
                        });

                        this.$navigateTo(mainPage);
                    }else{
                        this.selectedContent = this.contents[0];
                        this.$store.state.http.request({
                            url: "http://142.93.142.208/api/aula/"+this.class_id+"/aluno/"+this.$store.state.user.id+"/classificacoes",
                            method: "GET"
                        }).then((response) => {
                            this.busy = false;
                            alert({
                                title: "Escala de compreensão de um conteúdo",
                                message: "1 - Muito baixa\n2 - Baixa\n3 - Média\n4 - Boa\n5 - Excelente",
                                okButtonText: "OK"
                            });
                            this.class_cont = response.content.toJSON();
                            response.content.toJSON().forEach(item => this.classifications.push(item.conteudo_id));
                            this.changeColorBtn(null);
                        }, (e) => {
                            console.log(e);
                        });
                    }
                }, (e) => {
                    console.log(e);
                });

            }, (e) => {
                console.log(e);
            });
        }
    };
</script>

<style scoped>
    .header-elem{
        color: white;
    }

    .arrow-right{
        margin-right: 2%;
        margin-bottom: 2%;
    }

    .arrow-left{
        margin-left: 2%;
        margin-bottom: 2%;
    }

    .have_classification{
        font-weight: bold;
    }
</style>
