require('./bootstrap');

window.Vue = require('vue');
var $ = require('jquery');
window.jQuery = require('jquery');
window.$ = window.jQuery;
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

Vue.component('date-picker', DatePicker)
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

import XLSX from 'xlsx';
import moment from 'moment-timezone';

Vue.use(BootstrapVue);
import VueSocketIO from "vue-socket.io";

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://142.93.142.208:8080'
}));

// import Transfer from './jquery_transfer/jquery.transfer';
require('./jquery_transfer/jquery.transfer');
import Alunos from './components/Aluno/aluno';
import Professores from './components/Professor/professor';
import Aulas from './components/Aula/aula';
import AulasArquivadas from './components/Aula/arquivadas';
import UnidadesCurriculares from './components/Unidade Curricular/unidadeCurricular';
import Conteudo from './components/Conteudo/conteudo';
import Classificacao from './components/Classificacao/classificacao';
import Salas from './components/Sala/sala';
import Tutorias from './components/Tutoria/tutoria';
import TutoriasArquivadas from './components/Tutoria/arquivadas';
import Cursos from './components/Curso/curso';
import CriarAula from './components/Aula/criarAula';
import Temas from './components/Tema/tema';
import Dasboard from "./components/Dasboard/dasboard";
import Estatisticas from "./components/Classificacao/estatisticas";
import Perfil from "./components/Dasboard/perfil";
Vue.use(VueRouter);

import Paginate from 'vuejs-paginate';

Vue.component('paginate', Paginate);
import VueToastify from 'vue-toastify'

Vue.use(VueToastify, {
    position: "top-right"
});

const routes = [
    {path: '/', component: Dasboard},
    {path: '/alunos', component: Alunos},
    {path: '/professores', component: Professores},
    {path: '/aulas', component: Aulas},
    {path: '/aulas/arquivada', component: AulasArquivadas},
    {path: '/unidadesCurriculares', component: UnidadesCurriculares},
    {path: '/conteudos', component: Conteudo},
    {path: '/classificacoes', component: Classificacao},
    {path: '/classificacoes/:id', component: Estatisticas, name: 'estatisticas'},
    {path: '/salas', component: Salas},
    {path: '/tutorias', component: Tutorias},
    {path: '/tutorias/arquivadas', component: TutoriasArquivadas},
    {path: '/cursos', component: Cursos},
    {path: '/criar/aula', component: CriarAula},
    {path: '/temas', component: Temas},
    {path: '/perfil', component: Perfil},
];

const router = new VueRouter({
    routes
});


const app = new Vue({
    el: '#app',
    data: function () {
        return {
            user: null,
        }
    },
    router,
    methods: {
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
    },
    created() {
        axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
        axios.get("api/user/autenticado").then(response => {
            // this.$socket.emit('login', response.data);
            this.user = response.data.tipo;
        });
    },
});


