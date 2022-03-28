<template>
    <StackLayout style="horiz-align: center">
        <StackLayout width="85%">
            <Button :text="filterBtnName" @tap="filterTutorials"/>
            <GridLayout columns="*,auto,*,auto" rows="auto,auto,auto" :visibility="filterVis">
                <DropDown :items="choices" col="0" row="0" :selectedIndex="selectedIndex" @selectedIndexChanged="dropDownSelectedIndexChanged"/>
                <TextField v-model="filter['initial_date']" hint="Data" col="0" row="1"
                           :visibility="dateVis" editable="false" @tap="openDate('initial_date')"/>
                <TextField v-model="filter['initial_date']" hint="Data Inicial" col="0" row="1"
                           :visibility="intervalDateVis" editable="false" @tap="openDate('initial_date')"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="1" row="1"
                       style="vertical-align: bottom" @tap="clear('initial_date')"/>
                <TextField v-model="filter['final_date']" hint="Data Final" col="2" row="1"
                           :visibility="intervalDateVis" editable="false" @tap="openDate('final_date')"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="3" row="1"
                       :visibility="intervalDateVis" @tap="clear('final_date')" style="vertical-align: bottom"/>
            </GridLayout>
            <GridLayout columns="*,auto" rows="auto,auto,auto,auto" :visibility="filterVis">
                <TextField hint="Hora de início" col="0" row="0" editable="false" v-model="filter['hour']" @tap="openTime()"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="1" row="0"
                       style="vertical-align: bottom" @tap="clear('hour')"/>
                <TextField hint="Professor(a)" col="0" row="1" v-model="filter['teacher']"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="1" row="1"
                       style="vertical-align: bottom" @tap="clear('teacher')"/>
                <TextField hint="Assunto" col="0" row="2" v-model="filter['subject']"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="1" row="2"
                       style="vertical-align: bottom" @tap="clear('subject')"/>
                <TextField hint="Unidade Curricular" col="0" row="3" v-model="filter['course_unit']"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="1" row="3"
                       style="vertical-align: bottom" @tap="clear('course_unit')"/>
            </GridLayout>
            <GridLayout columns="*,auto,*,auto" rows="auto" :visibility="filterVis">
                <DropDown :items="request_choices" col="0" row="0" hint="Pedido" @selectedIndexChanged="changeRequest"
                          :selectedIndex="clearDrop.selected_request"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="1" row="0"
                       style="vertical-align: bottom" @tap="clearIndex('request')"/>
                <DropDown :items="state_choices" col="2" row="0" hint="Estado" @selectedIndexChanged="changeState"
                          :selectedIndex="clearDrop.selected_state"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="3" row="0"
                       style="vertical-align: bottom" @tap="clearIndex('state')"/>
            </GridLayout>
        </StackLayout>

        <ActivityIndicator :busy="busy" v-if="busy"/>
        <Label v-if="busy" :text="busyText" horizontalAlignment="center"/>

        <RadListView ref="radlist_tutorials" for="tutorial in tutorials" height="100%" style="margin-top: 2%" @itemTap="onTutorialTap"
                     loadOnDemandMode="Auto" @loadMoreDataRequested="onLoadMoreItemsRequested" loadOnDemandBufferSize="2"
                     pullToRefresh="true" @pullToRefreshInitiated="refreshTable">
            <v-template name="header">
                <StackLayout>
                    <GridLayout rows="auto" columns="*,*,*">
                        <GridLayout rows="auto" columns="auto,auto" row="0" col="0" horizontalAlignment="center">
                            <Label text="Data/Hora" class="header" fontSize="15" row="0" col="0" @tap="changeSortingDate"/>
                            <Image v-if="filter['dateSorting'] == 'desc'" src="~/others/desc.png" width="8%" row="0" col="1"/>
                            <Image v-else-if="filter['dateSorting'] == 'asc'" src="~/others/asc.png" width="8%"  row="0" col="1"/>
                            <Image v-else src="~/others/no_sorting.png" width="8%" row="0" col="1"/>
                        </GridLayout>
                        <GridLayout rows="auto" columns="auto,auto" row="0" col="1" horizontalAlignment="center">
                            <Label text="Professor(a)" class="header" fontSize="15" row="0" col="0" @tap="changeSortingTeacher"/>
                            <Image v-if="filter['teacherSorting'] == 'desc'" src="~/others/desc.png" width="8%" row="0" col="1"/>
                            <Image v-else-if="filter['teacherSorting'] == 'asc'" src="~/others/asc.png" width="8%"  row="0" col="1"/>
                            <Image v-else src="~/others/no_sorting.png" width="8%" row="0" col="1"/>
                        </GridLayout>
                        <GridLayout rows="auto" columns="auto,auto" row="0" col="2" horizontalAlignment="center">
                            <Label text="Estado" class="header" fontSize="15" row="0" col="0" @tap="changeSortingState"/>
                            <Image v-if="filter['stateSorting'] == 'desc'" src="~/others/desc.png" width="8%" row="0" col="1"/>
                            <Image v-else-if="filter['stateSorting'] == 'asc'" src="~/others/asc.png" width="8%"  row="0" col="1"/>
                            <Image v-else src="~/others/no_sorting.png" width="8%" row="0" col="1"/>
                        </GridLayout>
                    </GridLayout>
                </StackLayout>
            </v-template>
            <v-template name="red" if="tutorial.estado == 0">
                <StackLayout>
                    <StackLayout orientation="horizontal" :class="tutorial.id == itemSelected ? 'selected' : ''">
                        <StackLayout orientation="vertical" width="30%">
                            <Label :text="tutorial.data"/>
                            <Label :text="getDayWeek(tutorial.data)"/>
                            <Label :text="tutorial.horaInicio"/>
                        </StackLayout>
                        <Label :text="tutorial.professor.nome" width="40%"/>
                        <Label text="Não confirmado" style="color: red"/>
                    </StackLayout>
                    <StackLayout class="hr"></StackLayout>
                </StackLayout>
            </v-template>

            <v-template name="green" if="tutorial.estado == 1">
                <StackLayout>
                    <StackLayout orientation="horizontal" :class="tutorial.id == itemSelected ? 'selected' : ''">
                        <StackLayout orientation="vertical" width="30%">
                            <Label :text="tutorial.data"/>
                            <Label :text="getDayWeek(tutorial.data)"/>
                            <Label :text="tutorial.horaInicio"/>
                        </StackLayout>
                        <Label :text="tutorial.professor.nome" width="40%"/>
                        <Label text="Confirmado" style="color: green"/>
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
                itemSelected: 0,
                filter: {
                    initial_date: "",
                    final_date: "",
                    hour: "",
                    teacher: "",
                    subject: "",
                    request: "",
                    state: "",
                    course_unit: "",
                    dateSorting: "desc",
                    teacherSorting: "",
                    stateSorting: "asc"
                },
                selected:{
                    initial_date: "",
                    final_date: ""
                },
                tutorials: [],
                numberPages: "",
                numberItemsPage: 10,
                page: 1,
                choices: ["Dia","Intervalo"],
                request_choices: ['Aluno','Professor'],
                state_choices: ['Confirmado', 'Não confirmado'],
                filterBtnName: "Filtrar",
                filterVis: "collapsed",
                selectedIndex: 0,
                dateVis: "visible",
                intervalDateVis: "collapsed",
                clearDrop:{
                    selected_request: null,
                    selected_state: null
                },
                busy: false,
                busyText: ""
            }
        },
        methods:{
            filterTutorials(){
                this.filterVis = (this.filterVis == "collapsed" ? "visible" : "collapsed");
                if(this.filterVis == "collapsed"){
                    this.filter['initial_date'] = '';
                    this.filter['final_date'] = '';
                    this.filter['hour'] = '';
                    this.selected['initial_date'] = '';
                    this.selected['final_date'] = '';
                    this.filter['teacher'] = '';
                    this.filter['subject'] = '';
                    this.filter['course_unit'] = '';
                    this.clearDrop['selected_request'] = null;
                    this.filter['request'] = '';
                    this.clearDrop['selected_state'] = null;
                    this.filter['state'] = '';
                    this.filterBtnName = "Filtrar";
                }else{
                    this.filterBtnName = "Desativar Filtros"
                }
            },
            dropDownSelectedIndexChanged(event){
                this.filter['initial_date'] = '';
                this.filter['final_date'] = '';
                this.selected['initial_date'] = '';
                this.selected['final_date'] = '';
                if(event.newIndex == 0){
                    this.intervalDateVis = "collapsed";
                    this.dateVis = "visible";
                }else{
                    this.dateVis = "collapsed";
                    this.intervalDateVis = "visible";
                }
                this.selectedIndex = event.newIndex;
            },
            openDate(date){
                let picker = new this.$store.state.modalPicker();

                picker.pickDate({
                    title: "Selecione uma data",
                    theme: "light",
                    startingDate: new Date((this.selected[date].length == 0 ? new Date() : this.selected[date]))
                })
                    .then(result => {
                        if(result === undefined){
                            return;
                        }
                        this.filter[date] = result.day + "-" + result.month + "-" + result.year;
                        this.selected[date] = result.year + "-" + result.month + "-" + result.day;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            openTime(){
                let picker = new this.$store.state.modalPicker();

                picker.pickTime({
                    title: "Selecione uma hora",
                    theme: "light"
                })
                    .then(result => {
                        if(result === undefined){
                            return;
                        }
                        this.filter['hour'] = result.hour + ":" + result.minute;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            clear(filter){
                this.filter[filter] = '';
                this.selected[filter] = '';
            },
            clearIndex(filter){
                this.filter[filter] = '';
                this.clearDrop['selected_'+filter] = null;
            },
            changeRequest(event){
                if(event.newIndex == null){
                    this.filter['request'] = '';
                }else{
                    this.filter['request'] = event.newIndex == 0 ? 'a' : 'p';
                    this.clearDrop['selected_request'] = event.newIndex;
                }
            },
            changeState(event){
                if(event.newIndex == null){
                    this.filter['state'] = '';
                }else{
                    this.filter['state'] = event.newIndex == 0 ? '1' : '0';
                    this.clearDrop['selected_state'] = event.newIndex;
                }
            },
            changeSortingDate(){
                this.filter['teacherSorting'] = '';
                this.filter['stateSorting'] = '';
                this.filter['dateSorting'] = this.filter['dateSorting'] == 'desc' ? 'asc' : 'desc';
            },
            changeSortingTeacher(){
                this.filter['teacherSorting'] = this.filter['teacherSorting'] == 'asc' ? 'desc' : 'asc';
                this.filter['stateSorting'] = '';
                this.filter['dateSorting'] = '';
            },
            changeSortingState(){
                this.filter['stateSorting'] = this.filter['stateSorting'] == 'asc' ? 'desc' : 'asc';
                this.filter['teacherSorting'] = '';
                this.filter['dateSorting'] = '';
            },
            convertDate(date){
                let arrayDate = date.split('-');
                return arrayDate[2] + "-" + arrayDate[1]  + "-" + arrayDate[0];
            },
            getDayWeek(date){
                let objDate = new Date(this.convertDate(date));
                switch (objDate.getDay()) {
                    case 0:
                        return "Domingo";
                    case 1:
                        return "Segunda-feira";
                    case 2:
                        return "Terça-feira";
                    case 3:
                        return "Quarta-feira";
                    case 4:
                        return "Quinta-feira";
                    case 5:
                        return "Sexta-feira";
                    case 6:
                        return "Sábado";
                }
            },
            onTutorialTap(event){
                let vm = this;

                this.itemSelected = event.item.id;

                this.$refs.radlist_tutorials.nativeView.refresh();

                action({
                    message: "Ações",
                    cancelButtonText: "Fechar",
                    actions: ["Informação do pedido","Recuperar"]
                }).then(function (result) {
                    if(result == "Informação do pedido"){
                        vm.showInfoTutorial(event.item);
                    }else if(result == "Recuperar"){
                        vm.busyText = "A recuperar tutoria...";
                        vm.busy = true;
                        vm.$store.state.http.request({
                            url: "http://142.93.142.208/api/tutoria/"+event.item.id+"/aluno/recuperar",
                            method: "PATCH"
                        }).then((response) => {
                            vm.busy = false;
                            if(response.statusCode == 404){   //ERRO
                                alert({
                                    title: "Erro",
                                    message: response.content.toJSON().msg,
                                    okButtonText: "OK"
                                });
                            }else if(response.statusCode == 200){    //CORREU BEM
                                alert({
                                    title: "Informação",
                                    message: "Pedido de tutoria recuperado com sucesso",
                                    okButtonText: "OK"
                                });

                                let variables = 'uc=' + vm.filter.course_unit + '&dataI=' + vm.selected.initial_date + '&dataF=' + vm.selected.final_date + '&hora=' + vm.filter.hour + '&pedido=' + vm.filter.request + '&professor=' + vm.filter.teacher + '&assunto=' + vm.filter.subject + '&estado=' + vm.filter.state + '&dataS=' + vm.filter.dateSorting + '&professorS=' + vm.filter.teacherSorting + '&estadoS=' + vm.filter.stateSorting;

                                vm.$store.state.http.request({
                                    url: "http://142.93.142.208/api/aluno/"+vm.$store.state.user.id+"/tutorias/arquivadas?page=1&" + variables,
                                    method: "GET"
                                }).then((response) => {
                                    vm.tutorials = response.content.toJSON().data;

                                    let offset = -vm.$refs.radlist_tutorials.nativeView.getScrollOffset();
                                    vm.$refs.radlist_tutorials.nativeView.scrollWithAmount(offset,false);

                                    vm.numberPages = Math.ceil((response.content.toJSON().total/vm.numberItemsPage));
                                    vm.page = 1;
                                    vm.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "Auto";
                                }, (e) => {
                                    console.log(e);
                                });
                            }

                        }, (e) => {
                            console.log(e);
                        });
                    }
                });
            },
            showInfoTutorial(item){
                alert({
                    title: "Informação - Pedido de tutoria",
                    message: "\nPedido efetuado pelo "+item.pedido.toLowerCase()+"\n\nData: "+item.data+"\n\nHora de início: "+item.horaInicio+"\n\nAssunto: "+item.assunto+"\n\nDescrição: "+(item.descricao == null ? "Vazia" : item.descricao)+"\n\nSala: "+(item.sala == null ? "Por definir" : item.sala.nome)+"\n\nProfessor(a): "+item.professor.nome+"\n\nUnidade Curricular: "+item.unidade_curricular.nome+"\n\nEstado: "+(item.estado == 1 ? "Confirmado" : "Não confirmado"),
                    okButtonText: "Fechar"
                });
            },
            onLoadMoreItemsRequested(){
                if(this.page == this.numberPages){
                    this.$refs.radlist_tutorials.nativeView.notifyAppendItemsOnDemandFinished(0, false);
                    this.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "None";
                    return;
                }

                this.page++;

                let variables = 'page=' + this.page + '&uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&hora=' + this.filter.hour + '&pedido=' + this.filter.request + '&professor=' + this.filter.teacher + '&assunto=' + this.filter.subject + '&estado=' + this.filter.state + '&dataS=' + this.filter.dateSorting + '&professorS=' + this.filter.teacherSorting + '&estadoS=' + this.filter.stateSorting;

                this.$store.state.http.request({
                    url: "http://142.93.142.208/api/aluno/"+this.$store.state.user.id+"/tutorias/arquivadas?" + variables,
                    method: "GET"
                }).then((response) => {
                    response.content.toJSON().data.forEach(item => {
                        this.tutorials.push(item);
                    });

                    this.$refs.radlist_tutorials.nativeView.notifyAppendItemsOnDemandFinished(0, false);

                    if(this.page == this.numberPages){
                        this.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "None";
                    }
                }, (e) => {
                    console.log(e);
                });
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
            refreshTable(){
                this.itemSelected = 0;

                if (this.selectedIndex == 0) {
                    this.selected.final_date = this.selected.initial_date;
                }

                let variables = 'uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&hora=' + this.filter.hour + '&pedido=' + this.filter.request + '&professor=' + this.filter.teacher + '&assunto=' + this.filter.subject + '&estado=' + this.filter.state + '&dataS=' + this.filter.dateSorting + '&professorS=' + this.filter.teacherSorting + '&estadoS=' + this.filter.stateSorting;

                this.$store.state.http.request({
                    url: "http://142.93.142.208/api/aluno/"+this.$store.state.user.id+"/tutorias/arquivadas?page=1&" + variables,
                    method: "GET"
                }).then((response) => {
                    this.tutorials = response.content.toJSON().data;

                    this.numberPages = Math.ceil((response.content.toJSON().total/this.numberItemsPage));
                    this.page = 1;
                    this.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "Auto";
                    this.$refs.radlist_tutorials.nativeView.notifyPullToRefreshFinished();
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
                url: "http://142.93.142.208/api/aluno/"+this.$store.state.user.id+"/tutorias/arquivadas?page=1&dataS=desc&estadoS=asc",
                method: "GET"
            }).then((response) => {
                this.busy = false;
                this.tutorials = response.content.toJSON().data;
                this.numberPages = Math.ceil((response.content.toJSON().total/this.numberItemsPage));
                this.page = 1;

                if(this.tutorials.length < 1){
                    alert({
                        title: "Informação",
                        message: "Não tem nenhum pedido de tutoria arquivado",
                        okButtonText: "OK"
                    });

                    this.$emit('back');
                }
            }, (e) => {
                console.log(e);
            });
        },
        watch: {
            filter: {
                deep: true,
                handler() {
                    if(this.$store.state.isAndroid){
                        this.busyText = "A carregar...";
                        this.busy = true;
                    }

                    this.itemSelected = 0;

                    if (this.selectedIndex == 0) {
                        this.selected.final_date = this.selected.initial_date;
                    }

                    let variables = 'uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&hora=' + this.filter.hour + '&pedido=' + this.filter.request + '&professor=' + this.filter.teacher + '&assunto=' + this.filter.subject + '&estado=' + this.filter.state + '&dataS=' + this.filter.dateSorting + '&professorS=' + this.filter.teacherSorting + '&estadoS=' + this.filter.stateSorting;

                    this.$store.state.http.request({
                        url: "http://142.93.142.208/api/aluno/"+this.$store.state.user.id+"/tutorias/arquivadas?page=1&" + variables,
                        method: "GET"
                    }).then((response) => {
                        if(this.$store.state.isAndroid){
                            this.busy = false;
                        }
                        this.tutorials = response.content.toJSON().data;

                        let offset = -this.$refs.radlist_tutorials.nativeView.getScrollOffset();
                        this.$refs.radlist_tutorials.nativeView.scrollWithAmount(offset,false);

                        this.numberPages = Math.ceil((response.content.toJSON().total/this.numberItemsPage));
                        this.page = 1;
                        this.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "Auto";
                    }, (e) => {
                        console.log(e);
                    });
                }
            }
        }
    };
</script>

<style scoped>
    .header{
        font-weight: bold;
    }
    Button{
        width: 35%;
        margin-top: 1%;
    }
    DropDown{
        margin-left: 5%;
    }
    .selected{
        background-color: #123456;
        color: white;
    }
</style>
