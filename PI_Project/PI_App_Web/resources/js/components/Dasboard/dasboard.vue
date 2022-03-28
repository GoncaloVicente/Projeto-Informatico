<template>
    <div class="row">
        <div class="col-md-12">

            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-aqua"><i class="fa fa-graduation-cap"
                                                               style="margin: 20px;"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">Cursos</span>
                            <span class="info-box-number">{{this.cursos}}</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-red"><i class="fas fa-swatchbook"
                                                              style="margin: 20px;"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">Unidades Curriculares</span>
                            <span class="info-box-number">{{this.uCs}}</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-green"><i class="fas fa-bookmark"
                                                                style="margin: 20px;"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">Temas</span>
                            <span class="info-box-number">{{this.temas}}</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-green"><i class="fas fa-bookmark"
                                                                style="margin: 20px;"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">Conteúdos</span>
                            <span class="info-box-number">{{this.conteudos}}</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="info-box">
                <span class="info-box-icon bg-green"><i class="fas fa-chalkboard-teacher"
                                                        style="margin: 20px;"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">Tutorias marcadas</span>
                            <span class="info-box-number">{{this.tutMarcadas}}</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="info-box">
                <span class="info-box-icon bg-green"><i class="fas fa-chalkboard-teacher"
                                                        style="margin: 20px;"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">Tutorias pendentes</span>
                            <span class="info-box-number">{{this.tutPendentes}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Aulas por mês</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <bar-chart :id="'1'" :data="aulasPorMes"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Aulas por Unidade Curricular no último mês</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <pie-chart :id="'2'" :data="aulasPorUCMes"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Tutorias por mês</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <bar-chart :id="'3'" :data="tutoriasPorMes"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Tutorias por Unidade Curricular no último mês</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <pie-chart :id="'4'" :data="tutoriasPorUCMes"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BarChart from "./BarChart.vue";
    import PieChart from "./PieChart.vue";

    export default {
        components: {
            'bar-chart': BarChart,
            'pie-chart': PieChart,
        },
        name: "dasboard",
        data: function () {
            return {
                cursos: 0,
                uCs: 0,
                temas: 0,
                conteudos: 0,
                tutMarcadas: 0,
                tutPendentes: 0,
                aulasPorMes: 0,
                tutoriasPorMes: 0,
                aulasPorUCMes: 0,
                tutoriasPorUCMes: 0,
            }
        },
        methods: {
            getAllCursos: function () {
                axios.get("api/cursos/all").then(response => {
                    this.cursos = response.data;
                }).catch(function (error) {
                    if (error.response) {
                        window.location = '/unauthorized';
                    }
                });
            },
            getAllUCs: function () {
                axios.get("api/ucs/all").then(response => {
                    this.uCs = response.data;
                }).catch(function (error) {
                    if (error.response) {
                        window.location = '/unauthorized';
                    }
                });
            },
            getAllTemas: function () {
                axios.get("api/temas/all").then(response => {
                    this.temas = response.data;
                }).catch(function (error) {
                    if (error.response) {
                        window.location = '/unauthorized';
                    }
                });
            },
            getAllConteudos: function () {
                axios.get("api/conteudos/all").then(response => {
                    this.conteudos = response.data;
                }).catch(function (error) {
                    if (error.response) {
                        window.location = '/unauthorized';
                    }
                });
            },
            getAllTutoriasMarcadas: function () {
                axios.get("api/tutorias/marcadas/all").then(response => {
                    this.tutMarcadas = response.data;
                }).catch(function (error) {
                    if (error.response) {
                        window.location = '/unauthorized';
                    }
                });
            },
            getAllTutoriasPendentes: function () {
                axios.get("api/tutorias/pendentes/all").then(response => {
                    this.tutPendentes = response.data;
                }).catch(function (error) {
                    if (error.response) {
                        window.location = '/unauthorized';
                    }
                });
            },
            getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            }
        },
        mounted() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.getAllCursos();
            this.getAllUCs();
            this.getAllTemas();
            this.getAllConteudos();
            this.getAllTutoriasMarcadas();
            this.getAllTutoriasPendentes();
        },
        async created() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.aulasPorMes = (await axios.get('/api/aulas/mes')).data;
            this.tutoriasPorMes = (await axios.get('/api/tutorias/mes')).data;
            this.aulasPorUCMes = (await axios.get('/api/aulas/uc/mes')).data;
            this.tutoriasPorUCMes = (await axios.get('/api/tutorias/uc/mes')).data;
        }
    }
</script>

<style scoped>

</style>
