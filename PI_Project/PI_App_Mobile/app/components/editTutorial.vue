<template>
    <GridLayout rows="*" columns="*" height="100%" horizontalAlignment="center" verticalAlignment="center">
        <StackLayout row="0" col="0" width="90%" verticalAlignment="top" horizontalAlignment="center">
            <GridLayout columns="*" rows="auto,auto">
                <ActivityIndicator :busy="busy" v-if="busy" row="0" col="0"/>
                <Label v-if="busy" :text="busyText" horizontalAlignment="center" row="1" col="0"/>
            </GridLayout>
            <GridLayout columns="*" rows="auto,auto" style="margin-top: 2%">
                <Label text="Professor(a)" fontSize="15" row="0" col="0"/>
                <TextField v-model="tutorial.professor.nome" editable="false" fontSize="15" row="1" col="0"/>
            </GridLayout>
            <GridLayout columns="*" rows="auto,auto">
                <Label text="Data" fontSize="15" row="0" col="0"/>
                <TextField v-model="tutorial.data" hint="Data" editable="false" @tap="openDate()" fontSize="15" row="1" col="0"/>
            </GridLayout>
            <GridLayout columns="*" rows="auto,auto">
                <Label text="Hora de início" fontSize="15" row="0" col="0"/>
                <TextField v-model="tutorial.horaInicio" hint="Hora de início" @tap="openTime()" editable="false" fontSize="15" row="1" col="0"/>
            </GridLayout>
            <GridLayout columns="*" rows="auto,auto">
                <Label text="Assunto" fontSize="15" row="0" col="0"/>
                <TextField v-model="tutorial.assunto" hint="Assunto" editable="false" fontSize="15" row="1" col="0"/>
            </GridLayout>
            <GridLayout columns="*" rows="auto,auto">
                <Label text="Descrição" fontSize="15" row="0" col="0"/>
                <TextView v-model="tutorial.descricao" hint="Descrição" fontSize="15" row="1" col="0"/>
            </GridLayout>
            <GridLayout columns="*" rows="auto,auto">
                <Label text="Unidade Curricular" fontSize="15" row="0" col="0"/>
                <TextField v-model="tutorial.unidade_curricular.nome" hint="Unidade Curricular" editable="false" fontSize="15" row="1" col="0"/>
            </GridLayout>
        </StackLayout>

        <GridLayout columns="*,*" rows="auto" verticalAlignment="bottom" row="0" col="0">
            <Button text="Ver lista de pedidos" width="45%" fontSize="15" col="0" row="0" verticalAlignment="bottom" horizontalAlignment="left" @tap="chooseTutorial"/>
            <Button text="Editar Pedido" width="45%" fontSize="15" col="1" row="0" verticalAlignment="bottom" horizontalAlignment="right" @tap="editTutorial"/>
        </GridLayout>
    </GridLayout>
</template>

<script>
    export default {
        props: ['tutorial'],
        data:function(){
            return{
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
                        this.tutorial.data = (result.day < 10 ? "0"+result.day : result.day) + "-" + (result.month < 10 ? "0"+result.month : result.month) + "-" + result.year;

                        if(!this.checkValidTime()){
                            this.currentHour = "";
                            this.tutorial.horaInicio = "";
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
                            this.tutorial.horaInicio = (result.hour < 10 ? "0"+result.hour : result.hour) + (result.minute < 10 ? ":0" : ":") + result.minute;
                        }else{
                            this.currentHour = "";
                            this.tutorial.horaInicio = "";
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
            chooseTutorial(){
                this.$emit('backListTutorials');
            },
            editTutorial(){
                if(this.tutorial.data.length < 1){
                    alert({
                        title: "Erro",
                        message: "Selecione a data em que a tutoria vai decorrer",
                        okButtonText: "OK"
                    });
                }else if(this.tutorial.horaInicio.length < 1){
                    alert({
                        title: "Erro",
                        message: "Selecione a hora em que a tutoria vai decorrer",
                        okButtonText: "OK"
                    });
                }else if(!this.checkValidTime()) {
                    this.currentHour = "";
                    this.tutorial.horaInicio = "";
                    alert({
                        title: "Erro",
                        message: "Selecione uma data/hora superior à atual",
                        okButtonText: "OK"
                    });
                }else{
                    this.busyText = "A editar tutoria...";
                    this.busy = true;
                    this.$store.state.http.request({
                        url: "http://142.93.142.208/api/tutoria/"+this.tutorial.id+"/edit",
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({
                            data: this.currentDate.year + "-" + this.currentDate.month + "-" + this.currentDate.day,
                            horaInicio: this.tutorial.horaInicio,
                            descricao: this.tutorial.descricao
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
                                message: "Pedido de tutoria editado com sucesso",
                                okButtonText: "OK"
                            });
                            this.$emit('backListTutorials');
                        }
                    }, (e) => {
                        console.log(e);
                    });
                }
            },
            onBackEvent (data) {
                data.cancel = true;
                this.$emit('backListTutorials');
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
            let arrayDate = this.tutorial.data.split('-');
            let date = new Date(arrayDate[2],arrayDate[1]-1,arrayDate[0]);
            this.currentDate = {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear()
            };

            let arrayHour = this.tutorial.horaInicio.split(':');
            this.currentHour = {
                hour: arrayHour[0],
                minute: arrayHour[1]
            };
        }
    };
</script>

<style scoped>
</style>
