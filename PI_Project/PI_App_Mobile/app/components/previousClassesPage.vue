<template>
    <StackLayout style="horiz-align: center">
        <StackLayout width="85%">
            <Button :text="filterBtnName" @tap="filterClasses"/>
            <GridLayout columns="*,auto,*,auto" rows="auto,auto,auto" :visibility="filterVis">
                <DropDown :items="choices" @selectedIndexChanged="dropDownSelectedIndexChanged" col="0" row="0"
                          :selectedIndex="selectedIndex"/>
                <TextField v-model="filter['initial_date']" hint="Data" col="0" row="1"
                           :visibility="dateVis" editable="false" @tap="openDate('initial_date')"/>
                <TextField v-model="filter['initial_date']" hint="Data Inicial" col="0" row="1"
                           :visibility="intervalDateVis" editable="false" @tap="openDate('initial_date')"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="1" row="1"
                       style="vertical-align: bottom" @tap="clear('initial_date')"/>
                <TextField v-model="filter['final_date']" hint="Data Final" col="2" row="1"
                           :visibility="intervalDateVis" editable="false" @tap="openDate('final_date')"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="3" row="1"
                       style="vertical-align: bottom" @tap="clear('final_date')" :visibility="intervalDateVis"/>
            </GridLayout>
            <GridLayout columns="*,auto" rows="auto" :visibility="filterVis">
                <TextField v-model="filter['course_unit']" hint="Unidade Curricular" col="0" row="0"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="1" row="0"
                       style="vertical-align: bottom" @tap="clear('course_unit')"/>
            </GridLayout>
            <GridLayout columns="*,auto,*,auto" rows="auto,auto" :visibility="filterVis">
                <DropDown :items="school_year_list" @selectedIndexChanged="changeShoolYear" col="0" row="0" hint="Ano Letivo" :selectedIndex="clearDrop.selected_school_year"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="1" row="0"
                       style="vertical-align: bottom" @tap="clearIndex('school_year')"/>
                <DropDown :items="semester_list" @selectedIndexChanged="changeSemester" col="2" row="0" hint="Semestre" :selectedIndex="clearDrop.selected_semester"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="3" row="0"
                       style="vertical-align: bottom" @tap="clearIndex('semester')"/>
                <DropDown :items="course_year_list" @selectedIndexChanged="changeCourseYear" col="0" row="1" hint="Ano do Curso" :selectedIndex="clearDrop.selected_course_year"/>
                <Label text.decode="&#xf12d;" class="nt-icon fas" col="1" row="1"
                       style="vertical-align: bottom" @tap="clearIndex('course_year')"/>
            </GridLayout>
        </StackLayout>

        <ActivityIndicator :busy="busy" v-if="busy"/>
        <Label v-if="busy" :text="busyText" horizontalAlignment="center"/>

        <RadListView ref="list_classes" for="item in classes" class="list" height="100%" @itemTap="onClassTap"
                     loadOnDemandMode="Auto" @loadMoreDataRequested="onLoadMoreItemsRequested" loadOnDemandBufferSize="2"
                     pullToRefresh="true" @pullToRefreshInitiated="refreshTable">
            <v-template name="header">
                <StackLayout>
                    <GridLayout rows="auto" columns="*,2*">
                        <GridLayout rows="auto" columns="auto,auto" row="0" col="0" style="margin-left: 5%">
                            <Label text="Data" class="header" fontSize="15" row="0" col="0" @tap="changeSortingDate"/>
                            <Image v-if="filter['dateSorting'] == 'desc'" src="~/others/desc.png" width="9%" row="0" col="1"/>
                            <Image v-else-if="filter['dateSorting'] == 'asc'" src="~/others/asc.png" width="9%"  row="0" col="1"/>
                            <Image v-else src="~/others/no_sorting.png" width="9%" row="0" col="1"/>
                        </GridLayout>
                        <GridLayout rows="auto" columns="auto,auto" row="0" col="1">
                            <Label text="Unidade Curricular" class="header" fontSize="15" row="0" col="0" @tap="changeSortingUnit"/>
                            <Image v-if="filter['unitSorting'] == 'desc'" src="~/others/desc.png" width="4%" row="0" col="1"/>
                            <Image v-else-if="filter['unitSorting'] == 'asc'" src="~/others/asc.png" width="4%"  row="0" col="1"/>
                            <Image v-else src="~/others/no_sorting.png" width="4%" row="0" col="1"/>
                        </GridLayout>
                    </GridLayout>
                </StackLayout>
            </v-template>

            <v-template>
                <StackLayout>
                    <StackLayout orientation="horizontal" :class="item.id == itemSelected ? 'selected' : ''">
                        <Label :text="convertDate(item.data)"/>
                        <Label :text="item.unidade_curricular"/>
                    </StackLayout>
                    <StackLayout class="hr"/>
                </StackLayout>
            </v-template>
        </RadListView>
    </StackLayout>
</template>

<script>
    export default {
        props: ['itemSelected'],
        data:function(){
            return{
                filter: {
                    initial_date: "",
                    final_date: "",
                    course_unit: "",
                    school_year: "",
                    semester: "",
                    course_year:"",
                    dateSorting: "desc",
                    unitSorting: ""
                },
                selected:{
                    initial_date: "",
                    final_date: ""
                },
                classes: [],
                numberPages: "",
                numberItemsPage: 10,
                page: 1,
                fields: ['Data','Unidade'],
                filterVis: "collapsed",
                dateVis: "visible",
                intervalDateVis: "collapsed",
                choices: ["Dia","Intervalo"],
                selectedIndex: 0,
                filterBtnName: "Filtrar",
                itemSelected: 0,
                school_year_list: [],
                semester_list: [1,2],
                course_year_list: [],
                clearDrop:{
                    selected_school_year: null,
                    selected_semester: null,
                    selected_course_year: null
                },
                busy: false,
                busyText: ""
            }
        },
        methods:{
            onClassTap(event){
                this.page = 1;

                alert({
                    title: "Informação - Aula",
                    message: "\nData: "+this.convertDate(event.item.data)+"\n\nUnidade Curricular: "+event.item.unidade_curricular+"\n\nProfessor(a): "+event.item.professor+"\n\nAno Letivo: "+event.item.anoLetivo+"\n\nSemestre: "+event.item.semestre+"\n\nAno do Curso: "+event.item.anoCurso,
                    okButtonText: "Fechar"
                });

                this.$emit('seeClassifications',event.item);
            },
            filterClasses(){
                this.filterVis = (this.filterVis == "collapsed" ? "visible" : "collapsed");
                if(this.filterVis == "collapsed"){
                    this.filter['initial_date'] = '';
                    this.filter['final_date'] = '';
                    this.selected['initial_date'] = '';
                    this.selected['final_date'] = '';
                    this.filter['course_unit'] = '';
                    this.filter['school_year'] = '';
                    this.clearDrop['selected_school_year'] = null;
                    this.filter['semester'] = '';
                    this.clearDrop['selected_semester'] = null;
                    this.filter['course_year'] = '';
                    this.clearDrop['selected_course_year'] = null;
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
                    maxDate: new Date(),
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
            clear(filter){
                this.filter[filter] = '';
                this.selected[filter] = '';
            },
            clearIndex(filter){
                this.filter[filter] = '';
                this.clearDrop['selected_'+filter] = null;
            },
            changeShoolYear(event){
                if(event.newIndex == null){
                    this.filter['school_year'] = '';
                }else{
                    this.filter['school_year'] = this.school_year_list[event.newIndex];
                    this.clearDrop['selected_school_year'] = event.newIndex;
                }
            },
            changeSemester(event){
                if(event.newIndex == null){
                    this.filter['semester'] = '';
                }else {
                    this.filter['semester'] = this.semester_list[event.newIndex];
                    this.clearDrop['selected_semester'] = event.newIndex;
                }
            },
            changeCourseYear(event){
                if(event.newIndex == null){
                    this.filter['course_year'] = '';
                }else {
                    this.filter['course_year'] = this.course_year_list[event.newIndex];
                    this.clearDrop['selected_course_year'] = event.newIndex;
                }
            },
            changeSortingDate(){
                this.filter['unitSorting'] = '';
                this.filter['dateSorting'] = this.filter['dateSorting'] == 'desc' ? 'asc' : 'desc';
            },
            changeSortingUnit(){
                this.filter['unitSorting'] = this.filter['unitSorting'] == 'asc' ? 'desc' : 'asc';
                this.filter['dateSorting'] = '';
            },
            convertDate(date){
                let objDate = new Date(date);
                return (objDate.getDate() < 10 ? "0"+objDate.getDate() : objDate.getDate()) + "-" + ((objDate.getMonth() + 1) < 10 ? "0"+(objDate.getMonth() + 1) : (objDate.getMonth() + 1)) + "-" + objDate.getFullYear();
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
                    this.$refs.list_classes.nativeView.notifyAppendItemsOnDemandFinished(0, false);
                    this.$refs.list_classes.nativeView.loadOnDemandMode = "None";
                    return;
                }

                this.page++;

                let variables = 'page=' + this.page + '&uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&anoLetivo=' + this.filter.school_year + '&semestre=' + this.filter.semester + '&ano=' + this.filter.course_year + '&dataS=' + this.filter.dateSorting + '&ucS=' + this.filter.unitSorting;

                this.$store.state.http.request({
                    url: "http://142.93.142.208/api/aluno/"+this.$store.state.user.id+"/aulas/anteriores?" + variables,
                    method: "GET"
                }).then((response) => {
                    response.content.toJSON().data.forEach(item => {
                        this.classes.push(item);
                    });

                    this.$refs.list_classes.nativeView.notifyAppendItemsOnDemandFinished(0, false);

                    if(this.page == this.numberPages){
                        this.$refs.list_classes.nativeView.loadOnDemandMode = "None";
                    }
                }, (e) => {
                    console.log(e);
                });
            },
            refreshTable(){
                this.itemSelected = 0;

                if(this.selectedIndex == 0){
                    this.selected.final_date = this.selected.initial_date;
                }

                let variables = 'uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&anoLetivo=' + this.filter.school_year + '&semestre=' + this.filter.semester + '&ano=' + this.filter.course_year + '&dataS=' + this.filter.dateSorting + '&ucS=' + this.filter.unitSorting;

                this.$store.state.http.request({
                    url: "http://142.93.142.208/api/aluno/"+this.$store.state.user.id+"/aulas/anteriores?page=1&" + variables,
                    method: "GET"
                }).then((response) => {
                    this.classes = response.content.toJSON().data;

                    this.numberPages = Math.ceil((response.content.toJSON().total/this.numberItemsPage));
                    this.page = 1;
                    this.$refs.list_classes.nativeView.loadOnDemandMode = "Auto";
                    this.$refs.list_classes.nativeView.notifyPullToRefreshFinished();
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
                url: "http://142.93.142.208/api/aluno/"+this.$store.state.user.id+"/aulas/anteriores?page=1&dataS=desc",
                method: "GET"
            }).then((response) => {
                this.busy = false;
                this.classes = response.content.toJSON().data;
                this.numberPages = Math.ceil((response.content.toJSON().total/this.numberItemsPage));
                this.page = 1;

                if(this.classes.length < 1){
                    alert({
                        title: "Informação",
                        message: "Não participou em nenhuma aula que já tenha terminado",
                        okButtonText: "OK"
                    });

                    this.$emit('back');
                }else{
                    this.$store.state.http.request({
                        url: "http://142.93.142.208/api/anosLetivos",
                        method: "GET"
                    }).then((response) => {
                        this.school_year_list = response.content.toJSON();
                    }, (e) => {
                        console.log(e);
                    });

                    this.$store.state.http.request({
                        url: "http://142.93.142.208/api/anosCursos",
                        method: "GET"
                    }).then((response) => {
                        this.course_year_list = response.content.toJSON();
                    }, (e) => {
                        console.log(e);
                    });
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

                    if(this.selectedIndex == 0){
                        this.selected.final_date = this.selected.initial_date;
                    }

                    let variables = 'uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&anoLetivo=' + this.filter.school_year + '&semestre=' + this.filter.semester + '&ano=' + this.filter.course_year + '&dataS=' + this.filter.dateSorting + '&ucS=' + this.filter.unitSorting;

                    this.$store.state.http.request({
                        url: "http://142.93.142.208/api/aluno/"+this.$store.state.user.id+"/aulas/anteriores?page=1&" + variables,
                        method: "GET"
                    }).then((response) => {
                        if(this.$store.state.isAndroid){
                            this.busy = false;
                        }
                        this.classes = response.content.toJSON().data;

                        let offset = -this.$refs.list_classes.nativeView.getScrollOffset();
                        this.$refs.list_classes.nativeView.scrollWithAmount(offset,false);

                        this.numberPages = Math.ceil((response.content.toJSON().total/this.numberItemsPage));
                        this.page = 1;
                        this.$refs.list_classes.nativeView.loadOnDemandMode = "Auto";
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
        margin-top: 2%;
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
    .header{
        font-weight: bold;
    }
</style>
