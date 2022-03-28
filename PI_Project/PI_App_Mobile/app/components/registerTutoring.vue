<template>
    <GridLayout rows="*" columns="*" height="100%" horizontalAlignment="center" verticalAlignment="center">
        <StackLayout row="0" col="0" width="90%" verticalAlignment="top" horizontalAlignment="center">
            <GridLayout columns="*" rows="auto,auto">
                <ActivityIndicator :busy="busy" v-if="busy" row="0" col="0"/>
                <Label v-if="busy" :text="busyText" horizontalAlignment="center" row="1" col="0"/>
            </GridLayout>
            <Label text="* Campos obrigatórios" style="color: red; margin-top: 1%"/>
            <GridLayout columns="*" rows="auto,auto" style="margin-top: 1%">
                <Label text="Professor(a)" fontSize="15"/>
                <TextField v-model="teacher_name" editable="false" fontSize="15" row="1" col="0"/>
            </GridLayout>
            <GridLayout columns="*" rows="auto,auto">
                <StackLayout orientation="horizontal" row="0" col="0">
                    <Label text="Data" fontSize="15"/>
                    <Label text=" *" fontSize="15" style="color: red"/>
                </StackLayout>
                <TextField v-model="date" hint="Data" editable="false" @tap="openDate()" fontSize="15" row="1" col="0"/>
            </GridLayout>
            <GridLayout columns="*" rows="auto,auto">
                <StackLayout orientation="horizontal" row="0" col="0">
                    <Label text="Hora de início" fontSize="15"/>
                    <Label text=" *" fontSize="15" style="color: red"/>
                </StackLayout>
                <TextField v-model="hour" hint="Hora de início" editable="false" @tap="openTime()" fontSize="15" row="1" col="0"/>
            </GridLayout>
            <GridLayout columns="*" rows="auto,auto">
                <StackLayout orientation="horizontal" row="0" col="0">
                    <Label text="Assunto" fontSize="15"/>
                    <Label text=" *" fontSize="15" style="color: red"/>
                </StackLayout>
                <TextField v-model="subject" hint="Assunto" fontSize="15" row="1" col="0"/>
            </GridLayout>
            <GridLayout columns="*" rows="auto,auto">
                <Label text="Descrição" fontSize="15" row="0" col="0"/>
                <TextView v-model="description" hint="Descrição" fontSize="15" row="1" col="0"/>
            </GridLayout>
            <GridLayout columns="*" rows="auto,auto">
                <StackLayout orientation="horizontal" row="0" col="0">
                    <Label text="Unidade Curricular" fontSize="15"/>
                    <Label text=" *" fontSize="15" style="color: red"/>
                </StackLayout>
                <DropDown :items="course_units_name" hint="Unidade Curricular" style="font-size: 15px; margin-top: 2%; margin-left: 5%"
                          horizontalAlignment="left" @selectedIndexChanged="changeUnit" row="1" col="0"/>
            </GridLayout>
        </StackLayout>

        <GridLayout columns="*,*" rows="auto" verticalAlignment="bottom" row="0" col="0">
            <Button text="Escolher outro professor" width="45%" fontSize="15" col="0" row="0" verticalAlignment="bottom" horizontalAlignment="left" @tap="chooseTeacher"/>
            <Button text="Marcar Tutoria" width="45%" fontSize="15" col="1" row="0" verticalAlignment="bottom" horizontalAlignment="right" @tap="register"/>
        </GridLayout>
    </GridLayout>
</template>

<script>
    export default {
        props: ['teacher_id','course_units','teacher_name'],
        data:function(){
            return{
                date: "",
                hour: "",
                subject: "",
                description: "",
                course_units_name: [],
                course_unit_selected: "",
                course_unit_id: "",
                currentDate: "",
                currentHour: "",
                busy: false,
                busyText: ""
            }
        },
        methods:{
            checkValidTime(){
                let currentTime = new Date();

                if(this.currentDate.day == currentTime.getDate() && this.currentDate.month == (currentTime.getMonth()+1) && this.currentDate.year == currentTime.getFullYear()){
                    if(this.currentHour != ""){
                        if(this.currentHour.hour == currentTime.getHours() && this.currentHour.minute <= currentTime.getMinutes()){

                            return false;

                        }else if(this.currentHour.hour < currentTime.getHours()){

                            return false;

                        }
                    }
                }

                return true;
            },
            openDate(){
                let picker = new this.$store.state.modalPicker();

                picker.pickDate({
                    title: "Selecione uma data",
                    theme: "light",
                    minDate: new Date(),
                    startingDate: new Date((this.currentDate.length == 0 ? new Date() : this.currentDate.year + "-" + this.currentDate.month + "-" + this.currentDate.day))
                })
                    .then(result => {
                        if(result === undefined){
                            return;
                        }
                        this.currentDate = result;
                        this.date = (result.day < 10 ? "0"+result.day : result.day) + "-" + (result.month < 10 ? "0"+result.month : result.month) + "-" + result.year;


                        if(!this.checkValidTime()){
                            this.currentHour = "";
                            this.hour = "";
                            alert({
                                title: "Erro",
                                message: "Selecione uma data/hora superior à atual",
                                okButtonText: "OK"
                            });
                        }
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
                        this.currentHour = result;

                        if(this.checkValidTime()) {
                            this.hour = (result.hour < 10 ? "0"+result.hour : result.hour) + (result.minute < 10 ? ":0" : ":") + result.minute;
                        }else{
                            this.currentHour = "";
                            this.hour = "";
                            alert({
                                title: "Erro",
                                message: "Selecione uma data/hora superior à atual",
                                okButtonText: "OK"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            chooseTeacher(){
                this.$emit('backTeachers');
            },
            changeUnit(event){
                this.course_unit_id = this.course_units[event.newIndex].id;
                this.course_unit_selected = this.course_units_name[event.newIndex];
            },
            register(){
                if(this.teacher_id < 1){
                    alert({
                        title: "Erro",
                        message: "Selecione um professor",
                        okButtonText: "OK"
                    });
                }else if(this.date.length < 1){
                    alert({
                        title: "Erro",
                        message: "Selecione a data em que a tutoria vai decorrer",
                        okButtonText: "OK"
                    });
                }else if(this.hour.length < 1){
                    alert({
                        title: "Erro",
                        message: "Selecione a hora em que a tutoria vai decorrer",
                        okButtonText: "OK"
                    });
                }else if(this.subject.length < 1){
                    alert({
                        title: "Erro",
                        message: "Insira o assunto da tutoria",
                        okButtonText: "OK"
                    });
                }else if(this.course_unit_selected.length < 1) {
                    alert({
                        title: "Erro",
                        message: "Selecione a unidade curricular a que a tutoria vai estar associada",
                        okButtonText: "OK"
                    });
                }else if(!this.checkValidTime()){
                    this.currentHour = "";
                    this.hour = "";
                    alert({
                        title: "Erro",
                        message: "Selecione uma data/hora superior à atual",
                        okButtonText: "OK"
                    });
                }else{
                    this.busyText = "A marcar tutoria...";
                    this.busy = true;
                    this.$store.state.http.request({
                        url: "http://142.93.142.208/api/tutoria",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({
                            professor_id: this.teacher_id,
                            data: this.currentDate.year + "-" + this.currentDate.month + "-" + this.currentDate.day,
                            hora: this.hour,
                            assunto: this.subject,
                            descricao: this.description,
                            uc_id: this.course_unit_id,
                            aluno_id: this.$store.state.user.id
                        })
                    }).then((response) => {
                        this.busy = false;
                        if(response.statusCode == 404 || response.statusCode == 400){   //ERRO
                            alert({
                                title: "Erro",
                                message: response.content.toJSON().msg,
                                okButtonText: "OK"
                            });
                        }else if(response.statusCode == 200){                           //CORREU BEM
                            alert({
                                title: "Informação",
                                message: "Marcação da tutoria efetuada com sucesso",
                                okButtonText: "OK"
                            });
                            this.$emit('backTeachers');
                        }
                    }, (e) => {
                        console.log(e);
                    });
                }
            },
            onBackEvent (data) {
                data.cancel = true;
                this.$emit('backTeachers');
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
            this.course_units.forEach(unit => this.course_units_name.push(unit.nome));
        }
    };
</script>

<style scoped>
</style>
