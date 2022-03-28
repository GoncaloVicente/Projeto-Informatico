<template>
    <StackLayout>
        <Label text="Insira o código da aula" textAlignment="center" fontSize="15"/>
        <TextField v-model="code" hint="Código" fontSize="15" keyboardType="number"/>
        <Button text="Entrar" @tap="enter" fontSize="15"/>
    </StackLayout>
</template>

<script>
    import {exit} from 'nativescript-exit';

    export default {
        data:function(){
            return{
                code: ""
            }
        },
        methods:{
            enter(){
                this.clearHook();
                this.$emit('class',this.code);
            },
            onBackEvent(data) {
                data.cancel = true;
                confirm({
                    title: "Sair",
                    message: "Tem a certeza que deseja sair da aplicação?",
                    okButtonText: "Sim",
                    cancelButtonText: "Não"
                }).then(function (result) {
                    if(result){
                        exit();
                    }
                });
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
</style>
