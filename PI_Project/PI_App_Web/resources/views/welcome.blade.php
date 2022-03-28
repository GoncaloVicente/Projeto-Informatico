<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>SmartFeedback</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="/adminlte/bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/adminlte/bower_components/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="/adminlte/bower_components/Ionicons/css/ionicons.min.css">
    <link rel="stylesheet" href="/adminlte/dist/css/skins/_all-skins.min.css">
    <link rel="stylesheet" href="/adminlte/bower_components/morris.js/morris.css">
    <link rel="stylesheet" href="/adminlte/bower_components/jvectormap/jquery-jvectormap.css">
    <link rel="stylesheet" href="/adminlte/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
    <link rel="stylesheet" href="/adminlte/bower_components/bootstrap-daterangepicker/daterangepicker.css">
    <link rel="stylesheet" href="/adminlte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">
    <link rel="stylesheet" href="/adminlte/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" href="/adminlte/dist/css/AdminLTE.min.css">
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <link rel="stylesheet" href="/adminlte/bower_components/font-awesome/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
          integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
          integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
</head>
<body class="hold-transition skin-blue sidebar-mini" onload="urlAtual()">
<div id="app" class="wrapper">
    <header class="main-header">
        <a href="#" class="logo">
            <span class="logo-mini"><img src="/storage/sf.png" class="rounded-circle" height=25px widht=25px/></span>
            <span class="logo-lg"><b>SmartFeedback</b></span>
        </a>
        <nav class="navbar navbar-static-top">
            <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <span class="hidden-xs">{{ Auth::user()->name }}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="user-header" style="min-height: 200px;">
                                <img src="/storage/user.png" class="img-circle" alt="User Image">
                                <p>{{ Auth::user()->name }}</p>
                                <p>{{ Auth::user()->email }}</p>
                            </li>
                            <li class="user-footer">
                                @if (Auth::user()->tipoUser == 'p')
                                <div class="pull-left">
                                    <router-link to="/perfil" class="btn btn-default btn-flat">Perfil</router-link>
                                </div>
                                @endif
                                <div class="pull-right">
                                    <a class="btn btn-default btn-flat" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                document.getElementById('logout-form').submit();">
                                        {{ __('Sair') }}
                                    </a>
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                          style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <div>
        <aside class="main-sidebar">
            <section class="sidebar">
                <ul class="sidebar-menu" data-widget="tree">
                    <li class="header">Menu Principal</li>
                    @if (Auth::user()->tipoUser == 'p')
                        <li id="dasboard" name="active">
                            <router-link to="/" onclick="changeClass('dasboard')">
                                <i class="glyphicon glyphicon-dashboard"></i>
                                <span> Dasboard</span></router-link>
                        </li>
                    @endif
                    <li id="alunos" name="active">
                        <router-link to="/alunos" onclick="changeClass('alunos')"><i class="fas fa-users"></i>
                            <span>Alunos</span></router-link>
                    </li>
                    @if (Auth::user()->tipoUser == 'o')
                        <li id="professores" name="active">
                            <router-link to="/professores" onclick="changeClass('professores')"><i
                                    class="fas fa-user-tie"></i>
                                <span>Professores</span></router-link>
                        </li>
                    @endif
                    @if (Auth::user()->tipoUser == 'p')
                        <li class="treeview">
                            <a href="#">
                                <i class="fas fa-book"></i> <span>Aula</span>
                                <span class="pull-right-container">
                              <i class="fa fa-angle-left pull-right"></i>
                            </span>
                            </a>
                            <ul class="treeview-menu">
                                <li id="aulas" name="active">
                                    <router-link to="/aulas" onclick="changeClass('aulas')">
                                        <svg class="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                        <span> Lista</span><span class="pull-right-container"></span>
                                    </router-link>
                                </li>
                                <li id="aula" name="active">
                                    <router-link to="/criar/aula" onclick="changeClass('aula')">
                                        <svg class="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                        <span> Criar</span></router-link>
                                </li>
                                <li id="arquivada" name="active">
                                    <router-link to="/aulas/arquivada" onclick="changeClass('arquivada')">
                                        <svg class="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                        <span> Arquivadas</span></router-link>
                                </li>
                            </ul>
                        </li>
                    @endif
                    <li id="unidadesCurriculares" name="active" class="treeview menu-open">
                        <router-link to="/unidadesCurriculares" onclick="changeClass('unidadesCurriculares')"><i
                                class="fas fa-swatchbook"></i>
                            <span>Unidades Curriculares</span></router-link>
                    </li>
                    @if (Auth::user()->tipoUser == 'p')
                        <li id="temas" name="active">
                            <router-link to="/temas" onclick="changeClass('temas')"><i class="fas fa-bookmark"></i>
                                <span>Temas</span></router-link>
                        </li>
                    @endif
                    @if (Auth::user()->tipoUser == 'p')
                        <li id="conteudos" name="active">
                            <router-link to="/conteudos" onclick="changeClass('conteudos')"><i
                                    class="fas fa-bookmark"></i>
                                <span>Conteúdos</span></router-link>
                        </li>
                    @endif
                    @if (Auth::user()->tipoUser == 'p')
                        <li id="classificacoes" name="active">
                            <router-link to="/classificacoes" onclick="changeClass('classificacoes')"><i
                                    class="fas fa-list-ol"></i>
                                <span>Classificações</span></router-link>
                        </li>
                    @endif
                    @if (Auth::user()->tipoUser == 'o')
                        <li id="salas" name="active">
                            <router-link to="/salas" onclick="changeClass('salas')"><i class="fas fa-chair"></i>
                                <span>Salas</span></router-link>
                        </li>
                    @endif
                    @if (Auth::user()->tipoUser == 'p')
                        <li class="treeview">
                            <a href="#">
                                <i class="fas fa-chalkboard-teacher"></i> <span>Tutorias</span>
                                <span class="pull-right-container">
                              <i class="fa fa-angle-left pull-right"></i>
                            </span>
                            </a>
                            <ul class="treeview-menu">
                                <li id="tutorias" name="active">
                                    <router-link to="/tutorias" onclick="changeClass('tutorias')">
                                        <svg class="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                        <span> Lista</span><span class="pull-right-container"></span>
                                    </router-link>
                                </li>
                                <li id="arquivadas" name="active">
                                    <router-link to="/tutorias/arquivadas" onclick="changeClass('arquivadas')">
                                        <svg class="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                        <span> Arquivadas</span></router-link>
                                </li>
                            </ul>
                        </li>
                    @endif
                    @if (Auth::user()->tipoUser == 'o')
                        <li id="cursos" name="active">
                            <router-link to="/cursos" onclick="changeClass('cursos')"><i
                                    class="fas fa-graduation-cap"></i>
                                <span>Cursos</span></router-link>
                        </li>
                    @endif
                </ul>
            </section>
        </aside>
        <div class="content-wrapper">
            <section class="content">
                <router-view></router-view>
            </section>
        </div>
    </div>
    <footer class="main-footer">
        <div class="pull-right hidden-xs">
            <b>Version</b> 0.0.1 Alpha
        </div>
        <strong>Copyright &copy; 2020.</strong> All rights
        reserved.
    </footer>
</div>


<script src="/adminlte/bower_components/jquery/dist/jquery.min.js"></script>
<script src="/adminlte/bower_components/jquery-ui/jquery-ui.min.js"></script>
<script>
    $.widget.bridge('uibutton', $.ui.button);
</script>
<script src="/adminlte/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="/adminlte/bower_components/raphael/raphael.min.js"/>
<script src="/adminlte/bower_components/morris.js/morris.min.js"></script>
<script src="/adminlte/bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
<script src="/adminlte/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="/adminlte/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<script src="/adminlte/bower_components/jquery-knob/dist/jquery.knob.min.js"></script>
<script src="/adminlte/bower_components/moment/min/moment.min.js"></script>
<script src="/adminlte/bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<script src="/adminlte/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<script src="/adminlte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<script src="/adminlte/bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<script src="/adminlte/bower_components/fastclick/lib/fastclick.js"></script>
<script src="/adminlte/dist/js/adminlte.min.js"></script>
<script src="js/vue.js"></script>
</body>
<script>
    function changeClass(active) {
        var name = [];
        name = document.getElementsByName('active');
        if (name != null) {
            for (i = 0; i < name.length; i++) {
                name[i].setAttribute('class', 'disable');
            }
        }
        var element = document.getElementById(active);
        if (element != null) {

            $('.treeview').removeClass('active');
            element.setAttribute('class', 'active');
            if (element.closest("ul") != undefined) {
                $($(element.closest("ul")).parent()[0]).removeClass('active');
                $($(element.closest("ul")).parent()[0]).addClass('active');
            }
        }
    }

    function urlAtual() {
        var name = [];
        name = document.getElementsByName('active');
        if (name != null) {
            for (i = 0; i < name.length; i++) {
                name[i].setAttribute('class', 'disable');
            }
        }
        var url = [];
        url = window.location.href.split("/");
        var id = 0;
        id = (url.length) - 1;

        if (!url[id]) {
            var idDas = 'dasboard';
            var element = document.getElementById(idDas);
        } else {
            var element = document.getElementById(url[id]);
        }
        if (element != null) {
            element.setAttribute('class', 'active');
            if (element.closest("ul") != undefined) {
                $($(element.closest("ul")).parent()[0]).removeClass('active');
                $($(element.closest("ul")).parent()[0]).addClass('active');
                $($(element.closest("ul")).parent()[0]).addClass('menu-open');
            }
        }

        url = window.location.href.split("/");
        if (url[id] / 1 == url[id] && url[id] != 0) {
            var idDas = 'classificacoes';
            var element = document.getElementById(idDas);
            element.setAttribute('class', 'active');
        }
    }
</script>
</html>
