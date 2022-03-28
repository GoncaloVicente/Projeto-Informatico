<template>
    <div class="row">
        <div class="jumbotron col-md-12" style="background-color: rgb(48,117,173);">
            <h1 style="text-align: center"><span style="color: white; ">{{title}}</span></h1>
        </div>
        <div>
            <br>
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-body no-padding">
                        <div class="col-md-12">
                            <br>
                            <label>Nome</label>
                            <input type="text" class="search-input form-control"
                                   placeholder="Nome do professor"
                                   v-model="user.nome" disabled>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Email</label>
                            <input type="text" class="search-input form-control"
                                   placeholder="Nome do professor"
                                   v-model="user.email" disabled>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <label>Gabinete</label>
                            <vue-select @class="form-control" name="sala" label="nome" :filterable="true"
                                        :options="salas"
                                        @search="fetchSalas" placeholder="Sala da tutoria" v-model="user.gabinete"
                                        style="background-color: #fff">
                                <span slot="no-options">Não existem opções compatíveis!</span>
                            </vue-select>
                            <br>
                        </div>
                        <div class="form-group col-md-12">
                            <a class="btn btn-primary" v-on:click.prevent="save()">Guardar</a>
                            <a class="btn btn-light" v-on:click.prevent="cancel()">Cancelar</a>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
            <div v-if="selectCursos" class="col-md-6"  id="cursosSelect">
                <div class="box box-primary">
                    <div class="box-body no-padding">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>Cursos em que está inserido</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="curso in cursos">
                                <td>{{ curso.curso_id }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <p></p>
                        <div class="form-group col-md-12">
                            <a class="btn btn-primary" v-on:click.prevent="cancelCursos()">Cancelar</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="selectUCs" class="col-md-6" id="ucsSelect">
                <div class="box box-primary">
                    <div class="box-body no-padding">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>Unidades Curriculares que leciona</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="uc in ucs">
                                <td>{{ uc.uC_id }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <p></p>
                        <div class="form-group col-md-12">
                            <a class="btn btn-primary" v-on:click.prevent="cancelUCs()">Cancelar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vueSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    export default {
        components: {
            vueSelect,
        },
        name: "perfil",
        data: function () {
            return {
                title: "Perfil",
                user: [],
                salas: [],
                userAux: [],
                ucs: [],
                cursos: [],
                selectCursos: true,
                selectUCs: true,
            }
        },
        methods: {
            getUser: function () {
                axios.get("api/user").then(response => {
                    this.user = response.data;
                    this.userAux = Object.assign({}, response.data);
                }).catch(function (error) {
                    if (error.response) {
                        window.location = '/unauthorized';
                    }
                });            },
            getUCs: function () {
                axios.get("api/user/uc").then(response => {
                    this.ucs = response.data.data;
                });
            },
            getCursos: function () {
                axios.get("api/user/cursos").then(response => {
                    this.cursos = response.data.data;
                });
            },
            cancelUCs: function(){
                this.selectUCs = false;
                var element = document.getElementById("cursosSelect");
                console.log(element)
                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
            },
            cancelCursos: function(){
                this.selectCursos = false;
                var element = document.getElementById("ucsSelect");

                if (element != null) {
                    element.setAttribute('class', 'col-md-12');
                }
            },
            save: function () {
                axios.put('api/perfil/' + this.user.idProf, this.user)
                    .then(response => {
                        this.getUser();
                        this.$vToastify.success("Perfil editado!", "Sucesso!");
                    }).catch(error => {
                    this.$vToastify.error("Edições de perfil!", "Erro!");
                });
            },
            cancel: function () {
                this.user = this.userAux;
            },
            getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            },
            fetchSalas(search, loading) {
                let self = this;
                loading(true);
                if (search) {
                    axios.get('/api/salas/' + search)
                        .then(function (response) {
                            self.salas = response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                        .finally(function () {
                            loading(false);
                        });
                }
                loading(false);
            },
        },
        mounted() {
            axios.defaults.headers.common['Apitoken'] = this.getCookie('api_token');
            this.getUser();
            this.getUCs();
            this.getCursos();
        },
    }
</script>

<style scoped>

</style>
