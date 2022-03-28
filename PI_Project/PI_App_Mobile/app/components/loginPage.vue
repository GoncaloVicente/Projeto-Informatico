<template>
    <Page actionBarHidden="true">
        <GridLayout rows="*" columns="*" height="100%" width="100%" horizontalAlignment="center" verticalAlignment="center">
            <StackLayout row="0" col="0" width="75%" verticalAlignment="center" horizontalAlignment="center">
                <Image src="~/others/icon.png" strech="none" width="90%" class="title"/>
                <TextField v-model="number" hint="Número de estudante" class="item" fontSize="15" keyboardType="number"/>
                <TextField v-model="password" hint="Senha" secure="true" class="item" fontSize="15"/>
                <check-box text="Manter sessão iniciada" :checked="isChecked" @checkedChange="isChecked = $event.value" class="item"/>
                <Button text="Iniciar sessão" @tap="login" fontSize="15"/>
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
    import {exit} from 'nativescript-exit';
    import mainPage from "./mainPage";

    export default {
        data:function(){
            return{
                number:"",
                password:"",
                isChecked:false
            }
        },
        methods:{
            login(){
                if(this.number.length < 1){
                    alert({
                        title: "Erro",
                        message: "Insira o número de estudante",
                        okButtonText: "OK"
                    });
                }else if(this.password.length < 1){
                    alert({
                        title: "Erro",
                        message: "Insira a senha",
                        okButtonText: "OK"
                    });
                }else{
                    this.$store.state.http.request({
                        url: "http://142.93.142.208/api/login",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({
                            username: this.number,
                            password: this.password
                        })
                    }).then((response) => {
                        if(response.statusCode == 404 || response.statusCode == 400){   //ERRO
                            alert({
                                title: "Erro",
                                message: response.content.toJSON().msg,
                                okButtonText: "OK"
                            });
                        }else if(response.statusCode == 200){                           //CORREU BEM
                            this.$store.commit('defineUser', response.content.toJSON());
                            if(this.isChecked){
                                this.$store.state.appSettings.setNumber("id", response.content.toJSON().id);
                                this.$store.state.appSettings.setString("nome", response.content.toJSON().nome);
                                this.$store.state.appSettings.setNumber("numero", response.content.toJSON().numero);
                            }
                            this.clearHook();
                            this.$navigateTo(mainPage);
                        }
                    }, (e) => {
                        console.log(e);
                    });
                }
            },
            onBackEvent(data) {
                data.cancel = true;
                exit();
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
        }
    };
</script>

<style scoped>
    .title{
        margin-bottom: 10%;
    }
    .item{
        margin: 1%;
    }
</style>
