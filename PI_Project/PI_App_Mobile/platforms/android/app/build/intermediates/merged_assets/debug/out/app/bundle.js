require("./runtime.js");require("./vendor.js");module.exports =
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["bundle"],{

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/classPage.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mainPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/mainPage.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['class_id'],
  data: function () {
    return {
      name: this.$store.state.user.nome,
      email: this.$store.state.user.numero + "@my.ipleiria.pt",
      course_unit: "",
      teacher_name: "",
      contents: [],
      selectedContent: {},
      classifications: [],
      oldClass: [],
      class_cont: [],
      selectedClass: "",
      arrowRightVis: "visible",
      arrowLeftVis: "collapsed",
      idxSelectedContent: 0,
      busy: false,
      busyText: ""
    };
  },
  methods: {
    seeTitle() {
      alert({
        title: "Informação - Aula",
        message: "\nUnidade Curricular: " + this.course_unit + "\n\nProfessor(a): " + this.teacher_name,
        okButtonText: "Fechar"
      });
    },

    exit() {
      let vm = this;
      confirm({
        title: "Sair",
        message: "Tem a certeza que deseja sair da aula atual?",
        okButtonText: "Sim",
        cancelButtonText: "Não"
      }).then(function (result) {
        if (result) {
          vm.clearHook();
          vm.$navigateTo(_mainPage__WEBPACK_IMPORTED_MODULE_0__["default"]).catch(e => console.log(e));
        }
      });
    },

    openMenu() {
      this.$refs.drawerContent.showDrawer();
    },

    onNavigationItemTap(content) {
      this.idxSelectedContent = this.contents.indexOf(content);

      if (this.idxSelectedContent < 1) {
        this.arrowRightVis = "visible";
        this.arrowLeftVis = "collapsed";
      } else if (this.idxSelectedContent > this.contents.length - 2) {
        this.arrowRightVis = "collapsed";
        this.arrowLeftVis = "visible";
      } else {
        this.arrowRightVis = "visible";
        this.arrowLeftVis = "visible";
      }

      this.selectedContent = content;
      this.changeColorBtn(null);
      this.$refs.drawerContent.closeDrawer();
    },

    seeNext() {
      this.onNavigationItemTap(this.contents[this.idxSelectedContent + 1]);
    },

    seePrevious() {
      this.onNavigationItemTap(this.contents[this.idxSelectedContent - 1]);
    },

    onClassButtonTap(classification) {
      if (this.oldClass.length > 0) {
        if (classification == this.oldClass[0].classification && this.selectedContent.id == this.oldClass[0].content_id) {
          return;
        }
      }

      let vm = this;

      if (this.classifications.indexOf(this.selectedContent.id) < 0) {
        //STORE
        this.$store.state.http.request({
          url: "http://142.93.142.208/api/classificacao",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          content: JSON.stringify({
            valor: classification,
            conteudo_id: this.selectedContent.id,
            aluno_id: this.$store.state.user.id,
            aula_id: this.class_id
          })
        }).then(response => {
          if (response.statusCode == 404 || response.statusCode == 400) {
            //ERRO
            alert({
              title: "Erro",
              message: response.content.toJSON().msg,
              okButtonText: "OK"
            });

            if (response.content.toJSON().estado == 1) {
              vm.$navigateTo(_mainPage__WEBPACK_IMPORTED_MODULE_0__["default"]).catch(e => console.log(e));
            }
          } else if (response.statusCode == 200) {
            //CORREU BEM
            this.changeColorBtn(classification);
            this.classifications.push(this.selectedContent.id);
            this.oldClass[0] = {
              content_id: this.selectedContent.id,
              classification: classification
            };
          }
        }, e => {
          console.log(e);
        });
      } else {
        //UPDATE
        this.$store.state.http.request({
          url: "http://142.93.142.208/api/classificacao",
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          content: JSON.stringify({
            valor: classification,
            conteudo_id: this.selectedContent.id,
            aluno_id: this.$store.state.user.id,
            aula_id: this.class_id
          })
        }).then(response => {
          if (response.statusCode == 404 || response.statusCode == 400) {
            //ERRO
            alert({
              title: "Erro",
              message: response.content.toJSON().msg,
              okButtonText: "OK"
            });

            if (response.content.toJSON().estado == 1) {
              vm.$navigateTo(_mainPage__WEBPACK_IMPORTED_MODULE_0__["default"]).catch(e => console.log(e));
            }
          } else if (response.statusCode == 200) {
            //CORREU BEM
            this.oldClass[0] = {
              content_id: this.selectedContent.id,
              classification: classification
            };
            this.changeColorBtn(classification);
          }
        }, e => {
          console.log(e);
        });
      }
    },

    showInfo() {
      alert({
        title: "Informação - Conteúdo",
        message: "\nDesignação: " + this.selectedContent.nome + "\n\nTema: " + this.selectedContent.tema.nome + "\n\nTipo: " + this.selectedContent.tipo + "\n\nDescição: " + (this.selectedContent.descricao == null ? "Vazia" : this.selectedContent.descricao),
        okButtonText: "Fechar"
      });
    },

    changeColorBtn(newClass) {
      if (this.classifications.indexOf(this.selectedContent.id) < 0 && newClass == null) {
        this.selectedClass = "";
        return;
      }

      if (this.classifications.indexOf(this.selectedContent.id) < 0 && newClass != null) {
        this.class_cont.push({
          conteudo_id: this.selectedContent.id,
          valor: newClass
        });
        this.selectedClass = newClass;
        return;
      }

      let valor = 0;
      this.class_cont.forEach(item => {
        if (item.conteudo_id == this.selectedContent.id) {
          if (newClass == null) {
            valor = item.valor;
          } else {
            item.valor = newClass;
            valor = newClass;
          }
        }
      });
      this.selectedClass = valor;
    },

    getContentClassification(content_id) {
      if (this.classifications.indexOf(content_id) < 0) {
        return '';
      }

      let valor = 0;
      this.class_cont.forEach(item => {
        if (item.conteudo_id == content_id) {
          valor = item.valor;
        }
      });
      return '(' + valor + ') ';
    },

    checkClassification(content_id) {
      return this.classifications.indexOf(content_id) >= 0;
    },

    onBackEvent(data) {
      data.cancel = true;
      this.exit();
    },

    setHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.on(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    clearHook() {
      if (this.$store.state.isAndroid) {
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

  created() {
    this.busyText = "A carregar...";
    this.busy = true;
    this.$store.state.http.request({
      url: "http://142.93.142.208/api/aula/" + this.class_id,
      method: "GET"
    }).then(response => {
      this.course_unit = response.content.toJSON().unidade_curricular.nome;
      this.teacher_name = response.content.toJSON().professor.nome;
      this.$store.state.http.request({
        url: "http://142.93.142.208/api/aula/" + this.class_id + "/conteudos",
        method: "GET"
      }).then(response => {
        this.contents = response.content.toJSON();

        if (this.contents.length < 1) {
          alert({
            title: "Informação",
            message: "Esta aula não tem conteúdos",
            okButtonText: "OK"
          });
          this.$navigateTo(_mainPage__WEBPACK_IMPORTED_MODULE_0__["default"]);
        } else {
          this.selectedContent = this.contents[0];
          this.$store.state.http.request({
            url: "http://142.93.142.208/api/aula/" + this.class_id + "/aluno/" + this.$store.state.user.id + "/classificacoes",
            method: "GET"
          }).then(response => {
            this.busy = false;
            alert({
              title: "Escala de compreensão de um conteúdo",
              message: "1 - Muito baixa\n2 - Baixa\n3 - Média\n4 - Boa\n5 - Excelente",
              okButtonText: "OK"
            });
            this.class_cont = response.content.toJSON();
            response.content.toJSON().forEach(item => this.classifications.push(item.conteudo_id));
            this.changeColorBtn(null);
          }, e => {
            console.log(e);
          });
        }
      }, e => {
        console.log(e);
      });
    }, e => {
      console.log(e);
    });
  }

});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/editTutorial.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['tutorial'],
  data: function () {
    return {
      currentDate: "",
      currentHour: "",
      busy: false,
      busyText: ""
    };
  },
  methods: {
    checkValidTime() {
      let currentTime = new Date();

      if (this.currentDate.day == currentTime.getDate() && this.currentDate.month == currentTime.getMonth() + 1 && this.currentDate.year == currentTime.getFullYear()) {
        if (this.currentHour != "") {
          if (this.currentHour.hour == currentTime.getHours() && this.currentHour.minute <= currentTime.getMinutes()) {
            return false;
          } else if (this.currentHour.hour < currentTime.getHours()) {
            return false;
          }
        }
      }

      return true;
    },

    openDate() {
      let picker = new this.$store.state.modalPicker();
      picker.pickDate({
        title: "Selecione uma data",
        theme: "light",
        minDate: new Date(),
        startingDate: new Date(this.currentDate.length == 0 ? new Date() : this.currentDate.year + "-" + this.currentDate.month + "-" + this.currentDate.day)
      }).then(result => {
        if (result === undefined) {
          return;
        }

        this.currentDate = result;
        this.tutorial.data = (result.day < 10 ? "0" + result.day : result.day) + "-" + (result.month < 10 ? "0" + result.month : result.month) + "-" + result.year;

        if (!this.checkValidTime()) {
          this.currentHour = "";
          this.tutorial.horaInicio = "";
          alert({
            title: "Erro",
            message: "Selecione uma data/hora superior à atual",
            okButtonText: "OK"
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },

    openTime() {
      let picker = new this.$store.state.modalPicker();
      picker.pickTime({
        title: "Selecione uma hora",
        theme: "light"
      }).then(result => {
        if (result === undefined) {
          return;
        }

        this.currentHour = result;

        if (this.checkValidTime()) {
          this.tutorial.horaInicio = (result.hour < 10 ? "0" + result.hour : result.hour) + (result.minute < 10 ? ":0" : ":") + result.minute;
        } else {
          this.currentHour = "";
          this.tutorial.horaInicio = "";
          alert({
            title: "Erro",
            message: "Selecione uma data/hora superior à atual",
            okButtonText: "OK"
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },

    chooseTutorial() {
      this.$emit('backListTutorials');
    },

    editTutorial() {
      if (this.tutorial.data.length < 1) {
        alert({
          title: "Erro",
          message: "Selecione a data em que a tutoria vai decorrer",
          okButtonText: "OK"
        });
      } else if (this.tutorial.horaInicio.length < 1) {
        alert({
          title: "Erro",
          message: "Selecione a hora em que a tutoria vai decorrer",
          okButtonText: "OK"
        });
      } else if (!this.checkValidTime()) {
        this.currentHour = "";
        this.tutorial.horaInicio = "";
        alert({
          title: "Erro",
          message: "Selecione uma data/hora superior à atual",
          okButtonText: "OK"
        });
      } else {
        this.busyText = "A editar tutoria...";
        this.busy = true;
        this.$store.state.http.request({
          url: "http://142.93.142.208/api/tutoria/" + this.tutorial.id + "/edit",
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          content: JSON.stringify({
            data: this.currentDate.year + "-" + this.currentDate.month + "-" + this.currentDate.day,
            horaInicio: this.tutorial.horaInicio,
            descricao: this.tutorial.descricao
          })
        }).then(response => {
          this.busy = false;

          if (response.statusCode == 404 || response.statusCode == 400) {
            //ERRO
            alert({
              title: "Erro",
              message: response.content.toJSON().msg,
              okButtonText: "OK"
            });
          } else if (response.statusCode == 200) {
            //CORREU BEM
            alert({
              title: "Informação",
              message: "Pedido de tutoria editado com sucesso",
              okButtonText: "OK"
            });
            this.$emit('backListTutorials');
          }
        }, e => {
          console.log(e);
        });
      }
    },

    onBackEvent(data) {
      data.cancel = true;
      this.$emit('backListTutorials');
    },

    setHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.on(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    clearHook() {
      if (this.$store.state.isAndroid) {
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

  created() {
    let arrayDate = this.tutorial.data.split('-');
    let date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
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

});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/initialPage.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nativescript_exit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-exit/index.js");
/* harmony import */ var nativescript_exit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_exit__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function () {
    return {
      code: ""
    };
  },
  methods: {
    enter() {
      this.clearHook();
      this.$emit('class', this.code);
    },

    onBackEvent(data) {
      data.cancel = true;
      confirm({
        title: "Sair",
        message: "Tem a certeza que deseja sair da aplicação?",
        okButtonText: "Sim",
        cancelButtonText: "Não"
      }).then(function (result) {
        if (result) {
          Object(nativescript_exit__WEBPACK_IMPORTED_MODULE_0__["exit"])();
        }
      });
    },

    setHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.on(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    clearHook() {
      if (this.$store.state.isAndroid) {
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

});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/listArchivedTutorials.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function () {
    return {
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
      selected: {
        initial_date: "",
        final_date: ""
      },
      tutorials: [],
      numberPages: "",
      numberItemsPage: 10,
      page: 1,
      choices: ["Dia", "Intervalo"],
      request_choices: ['Aluno', 'Professor'],
      state_choices: ['Confirmado', 'Não confirmado'],
      filterBtnName: "Filtrar",
      filterVis: "collapsed",
      selectedIndex: 0,
      dateVis: "visible",
      intervalDateVis: "collapsed",
      clearDrop: {
        selected_request: null,
        selected_state: null
      },
      busy: false,
      busyText: ""
    };
  },
  methods: {
    filterTutorials() {
      this.filterVis = this.filterVis == "collapsed" ? "visible" : "collapsed";

      if (this.filterVis == "collapsed") {
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
      } else {
        this.filterBtnName = "Desativar Filtros";
      }
    },

    dropDownSelectedIndexChanged(event) {
      this.filter['initial_date'] = '';
      this.filter['final_date'] = '';
      this.selected['initial_date'] = '';
      this.selected['final_date'] = '';

      if (event.newIndex == 0) {
        this.intervalDateVis = "collapsed";
        this.dateVis = "visible";
      } else {
        this.dateVis = "collapsed";
        this.intervalDateVis = "visible";
      }

      this.selectedIndex = event.newIndex;
    },

    openDate(date) {
      let picker = new this.$store.state.modalPicker();
      picker.pickDate({
        title: "Selecione uma data",
        theme: "light",
        startingDate: new Date(this.selected[date].length == 0 ? new Date() : this.selected[date])
      }).then(result => {
        if (result === undefined) {
          return;
        }

        this.filter[date] = result.day + "-" + result.month + "-" + result.year;
        this.selected[date] = result.year + "-" + result.month + "-" + result.day;
      }).catch(error => {
        console.log(error);
      });
    },

    openTime() {
      let picker = new this.$store.state.modalPicker();
      picker.pickTime({
        title: "Selecione uma hora",
        theme: "light"
      }).then(result => {
        if (result === undefined) {
          return;
        }

        this.filter['hour'] = result.hour + ":" + result.minute;
      }).catch(error => {
        console.log(error);
      });
    },

    clear(filter) {
      this.filter[filter] = '';
      this.selected[filter] = '';
    },

    clearIndex(filter) {
      this.filter[filter] = '';
      this.clearDrop['selected_' + filter] = null;
    },

    changeRequest(event) {
      if (event.newIndex == null) {
        this.filter['request'] = '';
      } else {
        this.filter['request'] = event.newIndex == 0 ? 'a' : 'p';
        this.clearDrop['selected_request'] = event.newIndex;
      }
    },

    changeState(event) {
      if (event.newIndex == null) {
        this.filter['state'] = '';
      } else {
        this.filter['state'] = event.newIndex == 0 ? '1' : '0';
        this.clearDrop['selected_state'] = event.newIndex;
      }
    },

    changeSortingDate() {
      this.filter['teacherSorting'] = '';
      this.filter['stateSorting'] = '';
      this.filter['dateSorting'] = this.filter['dateSorting'] == 'desc' ? 'asc' : 'desc';
    },

    changeSortingTeacher() {
      this.filter['teacherSorting'] = this.filter['teacherSorting'] == 'asc' ? 'desc' : 'asc';
      this.filter['stateSorting'] = '';
      this.filter['dateSorting'] = '';
    },

    changeSortingState() {
      this.filter['stateSorting'] = this.filter['stateSorting'] == 'asc' ? 'desc' : 'asc';
      this.filter['teacherSorting'] = '';
      this.filter['dateSorting'] = '';
    },

    convertDate(date) {
      let arrayDate = date.split('-');
      return arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0];
    },

    getDayWeek(date) {
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

    onTutorialTap(event) {
      let vm = this;
      this.itemSelected = event.item.id;
      this.$refs.radlist_tutorials.nativeView.refresh();
      action({
        message: "Ações",
        cancelButtonText: "Fechar",
        actions: ["Informação do pedido", "Recuperar"]
      }).then(function (result) {
        if (result == "Informação do pedido") {
          vm.showInfoTutorial(event.item);
        } else if (result == "Recuperar") {
          vm.busyText = "A recuperar tutoria...";
          vm.busy = true;
          vm.$store.state.http.request({
            url: "http://142.93.142.208/api/tutoria/" + event.item.id + "/aluno/recuperar",
            method: "PATCH"
          }).then(response => {
            vm.busy = false;

            if (response.statusCode == 404) {
              //ERRO
              alert({
                title: "Erro",
                message: response.content.toJSON().msg,
                okButtonText: "OK"
              });
            } else if (response.statusCode == 200) {
              //CORREU BEM
              alert({
                title: "Informação",
                message: "Pedido de tutoria recuperado com sucesso",
                okButtonText: "OK"
              });
              let variables = 'uc=' + vm.filter.course_unit + '&dataI=' + vm.selected.initial_date + '&dataF=' + vm.selected.final_date + '&hora=' + vm.filter.hour + '&pedido=' + vm.filter.request + '&professor=' + vm.filter.teacher + '&assunto=' + vm.filter.subject + '&estado=' + vm.filter.state + '&dataS=' + vm.filter.dateSorting + '&professorS=' + vm.filter.teacherSorting + '&estadoS=' + vm.filter.stateSorting;
              vm.$store.state.http.request({
                url: "http://142.93.142.208/api/aluno/" + vm.$store.state.user.id + "/tutorias/arquivadas?page=1&" + variables,
                method: "GET"
              }).then(response => {
                vm.tutorials = response.content.toJSON().data;
                let offset = -vm.$refs.radlist_tutorials.nativeView.getScrollOffset();
                vm.$refs.radlist_tutorials.nativeView.scrollWithAmount(offset, false);
                vm.numberPages = Math.ceil(response.content.toJSON().total / vm.numberItemsPage);
                vm.page = 1;
                vm.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "Auto";
              }, e => {
                console.log(e);
              });
            }
          }, e => {
            console.log(e);
          });
        }
      });
    },

    showInfoTutorial(item) {
      alert({
        title: "Informação - Pedido de tutoria",
        message: "\nPedido efetuado pelo " + item.pedido.toLowerCase() + "\n\nData: " + item.data + "\n\nHora de início: " + item.horaInicio + "\n\nAssunto: " + item.assunto + "\n\nDescrição: " + (item.descricao == null ? "Vazia" : item.descricao) + "\n\nSala: " + (item.sala == null ? "Por definir" : item.sala.nome) + "\n\nProfessor(a): " + item.professor.nome + "\n\nUnidade Curricular: " + item.unidade_curricular.nome + "\n\nEstado: " + (item.estado == 1 ? "Confirmado" : "Não confirmado"),
        okButtonText: "Fechar"
      });
    },

    onLoadMoreItemsRequested() {
      if (this.page == this.numberPages) {
        this.$refs.radlist_tutorials.nativeView.notifyAppendItemsOnDemandFinished(0, false);
        this.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "None";
        return;
      }

      this.page++;
      let variables = 'page=' + this.page + '&uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&hora=' + this.filter.hour + '&pedido=' + this.filter.request + '&professor=' + this.filter.teacher + '&assunto=' + this.filter.subject + '&estado=' + this.filter.state + '&dataS=' + this.filter.dateSorting + '&professorS=' + this.filter.teacherSorting + '&estadoS=' + this.filter.stateSorting;
      this.$store.state.http.request({
        url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/tutorias/arquivadas?" + variables,
        method: "GET"
      }).then(response => {
        response.content.toJSON().data.forEach(item => {
          this.tutorials.push(item);
        });
        this.$refs.radlist_tutorials.nativeView.notifyAppendItemsOnDemandFinished(0, false);

        if (this.page == this.numberPages) {
          this.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "None";
        }
      }, e => {
        console.log(e);
      });
    },

    onBackEvent(data) {
      data.cancel = true;
      this.$emit('back');
    },

    setHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.on(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    clearHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.off(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    refreshTable() {
      this.itemSelected = 0;

      if (this.selectedIndex == 0) {
        this.selected.final_date = this.selected.initial_date;
      }

      let variables = 'uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&hora=' + this.filter.hour + '&pedido=' + this.filter.request + '&professor=' + this.filter.teacher + '&assunto=' + this.filter.subject + '&estado=' + this.filter.state + '&dataS=' + this.filter.dateSorting + '&professorS=' + this.filter.teacherSorting + '&estadoS=' + this.filter.stateSorting;
      this.$store.state.http.request({
        url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/tutorias/arquivadas?page=1&" + variables,
        method: "GET"
      }).then(response => {
        this.tutorials = response.content.toJSON().data;
        this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
        this.page = 1;
        this.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "Auto";
        this.$refs.radlist_tutorials.nativeView.notifyPullToRefreshFinished();
      }, e => {
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

  created() {
    if (this.$store.state.isAndroid) {
      this.busyText = "A carregar...";
      this.busy = true;
    }

    this.$store.state.http.request({
      url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/tutorias/arquivadas?page=1&dataS=desc&estadoS=asc",
      method: "GET"
    }).then(response => {
      this.busy = false;
      this.tutorials = response.content.toJSON().data;
      this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
      this.page = 1;

      if (this.tutorials.length < 1) {
        alert({
          title: "Informação",
          message: "Não tem nenhum pedido de tutoria arquivado",
          okButtonText: "OK"
        });
        this.$emit('back');
      }
    }, e => {
      console.log(e);
    });
  },

  watch: {
    filter: {
      deep: true,

      handler() {
        if (this.$store.state.isAndroid) {
          this.busyText = "A carregar...";
          this.busy = true;
        }

        this.itemSelected = 0;

        if (this.selectedIndex == 0) {
          this.selected.final_date = this.selected.initial_date;
        }

        let variables = 'uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&hora=' + this.filter.hour + '&pedido=' + this.filter.request + '&professor=' + this.filter.teacher + '&assunto=' + this.filter.subject + '&estado=' + this.filter.state + '&dataS=' + this.filter.dateSorting + '&professorS=' + this.filter.teacherSorting + '&estadoS=' + this.filter.stateSorting;
        this.$store.state.http.request({
          url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/tutorias/arquivadas?page=1&" + variables,
          method: "GET"
        }).then(response => {
          if (this.$store.state.isAndroid) {
            this.busy = false;
          }

          this.tutorials = response.content.toJSON().data;
          let offset = -this.$refs.radlist_tutorials.nativeView.getScrollOffset();
          this.$refs.radlist_tutorials.nativeView.scrollWithAmount(offset, false);
          this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
          this.page = 1;
          this.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "Auto";
        }, e => {
          console.log(e);
        });
      }

    }
  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/listTutorials.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['itemSelected'],
  data: function () {
    return {
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
      selected: {
        initial_date: "",
        final_date: ""
      },
      tutorials: [],
      numberPages: "",
      numberItemsPage: 10,
      page: 1,
      choices: ["Dia", "Intervalo"],
      request_choices: ['Aluno', 'Professor'],
      state_choices: ['Confirmado', 'Não confirmado'],
      filterBtnName: "Filtrar",
      filterVis: "collapsed",
      selectedIndex: 0,
      dateVis: "visible",
      intervalDateVis: "collapsed",
      clearDrop: {
        selected_request: null,
        selected_state: null
      },
      busy: false,
      busyText: ""
    };
  },
  methods: {
    filterTutorials() {
      this.filterVis = this.filterVis == "collapsed" ? "visible" : "collapsed";

      if (this.filterVis == "collapsed") {
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
      } else {
        this.filterBtnName = "Desativar Filtros";
      }
    },

    dropDownSelectedIndexChanged(event) {
      this.filter['initial_date'] = '';
      this.filter['final_date'] = '';
      this.selected['initial_date'] = '';
      this.selected['final_date'] = '';

      if (event.newIndex == 0) {
        this.intervalDateVis = "collapsed";
        this.dateVis = "visible";
      } else {
        this.dateVis = "collapsed";
        this.intervalDateVis = "visible";
      }

      this.selectedIndex = event.newIndex;
    },

    openDate(date) {
      let picker = new this.$store.state.modalPicker();
      picker.pickDate({
        title: "Selecione uma data",
        theme: "light",
        startingDate: new Date(this.selected[date].length == 0 ? new Date() : this.selected[date])
      }).then(result => {
        if (result === undefined) {
          return;
        }

        this.filter[date] = result.day + "-" + result.month + "-" + result.year;
        this.selected[date] = result.year + "-" + result.month + "-" + result.day;
      }).catch(error => {
        console.log(error);
      });
    },

    clear(filter) {
      this.filter[filter] = '';
      this.selected[filter] = '';
    },

    openTime() {
      let picker = new this.$store.state.modalPicker();
      picker.pickTime({
        title: "Selecione uma hora",
        theme: "light"
      }).then(result => {
        if (result === undefined) {
          return;
        }

        this.filter['hour'] = result.hour + ":" + result.minute;
      }).catch(error => {
        console.log(error);
      });
    },

    clearIndex(filter) {
      this.filter[filter] = '';
      this.clearDrop['selected_' + filter] = null;
    },

    changeRequest(event) {
      if (event.newIndex == null) {
        this.filter['request'] = '';
      } else {
        this.filter['request'] = event.newIndex == 0 ? 'a' : 'p';
        this.clearDrop['selected_request'] = event.newIndex;
      }
    },

    changeState(event) {
      if (event.newIndex == null) {
        this.filter['state'] = '';
      } else {
        this.filter['state'] = event.newIndex == 0 ? '1' : '0';
        this.clearDrop['selected_state'] = event.newIndex;
      }
    },

    changeSortingDate() {
      this.filter['teacherSorting'] = '';
      this.filter['stateSorting'] = '';
      this.filter['dateSorting'] = this.filter['dateSorting'] == 'desc' ? 'asc' : 'desc';
    },

    changeSortingTeacher() {
      this.filter['teacherSorting'] = this.filter['teacherSorting'] == 'asc' ? 'desc' : 'asc';
      this.filter['stateSorting'] = '';
      this.filter['dateSorting'] = '';
    },

    changeSortingState() {
      this.filter['stateSorting'] = this.filter['stateSorting'] == 'asc' ? 'desc' : 'asc';
      this.filter['teacherSorting'] = '';
      this.filter['dateSorting'] = '';
    },

    checkEdit(tutorial) {
      let tutorialDate = new Date(this.convertDate(tutorial.data) + "T" + tutorial.horaInicio);
      let currentDate = new Date();

      if (tutorialDate >= currentDate && tutorial.estado == 0) {
        return "Editar";
      }
    },

    checkState(tutorial) {
      let tutorialDate = new Date(this.convertDate(tutorial.data) + "T" + tutorial.horaInicio);
      let currentDate = new Date();

      if (tutorialDate >= currentDate && tutorial.estado == 0 && tutorial.pedido == "Professor") {
        return "Confirmar";
      } else if (tutorialDate >= currentDate && tutorial.estado == 1) {
        return "Retirar confirmação";
      }
    },

    checkArchive(tutorial) {
      let tutorialDate = new Date(this.convertDate(tutorial.data) + "T" + tutorial.horaInicio);
      let currentDate = new Date();

      if (tutorial.estado == 0 || tutorialDate < currentDate && tutorial.estado == 1) {
        return "Arquivar";
      }
    },

    onTutorialTap(event) {
      let array = [];
      let vm = this;
      this.itemSelected = event.item.id;
      this.$refs.radlist_tutorials.nativeView.refresh();
      array.push("Informação do pedido");

      if (this.checkEdit(event.item) != undefined) {
        array.push("Editar");
      }

      if (this.checkState(event.item) != undefined) {
        array.push(this.checkState(event.item));
      }

      if (this.checkArchive(event.item) != undefined) {
        array.push("Arquivar");
      }

      action({
        message: "Ações",
        cancelButtonText: "Fechar",
        actions: array
      }).then(function (result) {
        if (result == "Informação do pedido") {
          vm.showInfoTutorial(event.item);
        } else if (result == "Editar") {
          vm.$emit('editTutorial', event.item);
        } else if (result == "Confirmar") {
          vm.busyText = "A confirmar tutoria...";
          vm.busy = true;
          vm.$store.state.http.request({
            url: "http://142.93.142.208/api/tutoria/" + event.item.id + "/confirmar",
            method: "PATCH"
          }).then(response => {
            vm.busy = false;

            if (response.statusCode == 404) {
              //ERRO
              alert({
                title: "Erro",
                message: response.content.toJSON().msg,
                okButtonText: "OK"
              });
            } else if (response.statusCode == 200) {
              //CORREU BEM
              alert({
                title: "Informação",
                message: "Pedido de tutoria confirmado com sucesso",
                okButtonText: "OK"
              });
              let variables = 'uc=' + vm.filter.course_unit + '&dataI=' + vm.selected.initial_date + '&dataF=' + vm.selected.final_date + '&hora=' + vm.filter.hour + '&pedido=' + vm.filter.request + '&professor=' + vm.filter.teacher + '&assunto=' + vm.filter.subject + '&estado=' + vm.filter.state + '&dataS=' + vm.filter.dateSorting + '&professorS=' + vm.filter.teacherSorting + '&estadoS=' + vm.filter.stateSorting;
              vm.$store.state.http.request({
                url: "http://142.93.142.208/api/aluno/" + vm.$store.state.user.id + "/tutorias?page=1&" + variables,
                method: "GET"
              }).then(response => {
                vm.tutorials = response.content.toJSON().data;
                let offset = -vm.$refs.radlist_tutorials.nativeView.getScrollOffset();
                vm.$refs.radlist_tutorials.nativeView.scrollWithAmount(offset, false);
                vm.numberPages = Math.ceil(response.content.toJSON().total / vm.numberItemsPage);
                vm.page = 1;
                vm.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "Auto";
              }, e => {
                console.log(e);
              });
            }
          }, e => {
            console.log(e);
          });
        } else if (result == "Retirar confirmação") {
          vm.busyText = "A retirar confirmação da tutoria...";
          vm.busy = true;
          vm.$store.state.http.request({
            url: "http://142.93.142.208/api/tutoria/" + event.item.id + "/retirar",
            method: "PATCH"
          }).then(response => {
            vm.busy = false;

            if (response.statusCode == 404) {
              //ERRO
              alert({
                title: "Erro",
                message: response.content.toJSON().msg,
                okButtonText: "OK"
              });
            } else if (response.statusCode == 200) {
              //CORREU BEM
              alert({
                title: "Informação",
                message: "Confirmação retirada do pedido de tutoria com sucesso",
                okButtonText: "OK"
              });
              let variables = 'uc=' + vm.filter.course_unit + '&dataI=' + vm.selected.initial_date + '&dataF=' + vm.selected.final_date + '&hora=' + vm.filter.hour + '&pedido=' + vm.filter.request + '&professor=' + vm.filter.teacher + '&assunto=' + vm.filter.subject + '&estado=' + vm.filter.state + '&dataS=' + vm.filter.dateSorting + '&professorS=' + vm.filter.teacherSorting + '&estadoS=' + vm.filter.stateSorting;
              vm.$store.state.http.request({
                url: "http://142.93.142.208/api/aluno/" + vm.$store.state.user.id + "/tutorias?page=1&" + variables,
                method: "GET"
              }).then(response => {
                vm.tutorials = response.content.toJSON().data;
                let offset = -vm.$refs.radlist_tutorials.nativeView.getScrollOffset();
                vm.$refs.radlist_tutorials.nativeView.scrollWithAmount(offset, false);
                vm.numberPages = Math.ceil(response.content.toJSON().total / vm.numberItemsPage);
                vm.page = 1;
                vm.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "Auto";
              }, e => {
                console.log(e);
              });
            }
          }, e => {
            console.log(e);
          });
        } else if (result == "Arquivar") {
          vm.busyText = "A arquivar tutoria...";
          vm.busy = true;
          vm.$store.state.http.request({
            url: "http://142.93.142.208/api/tutoria/" + event.item.id + "/aluno/arquivar",
            method: "PATCH"
          }).then(response => {
            vm.busy = false;

            if (response.statusCode == 404) {
              //ERRO
              alert({
                title: "Erro",
                message: response.content.toJSON().msg,
                okButtonText: "OK"
              });
            } else if (response.statusCode == 200) {
              //CORREU BEM
              alert({
                title: "Informação",
                message: "Pedido de tutoria arquivado com sucesso",
                okButtonText: "OK"
              });
              let variables = 'uc=' + vm.filter.course_unit + '&dataI=' + vm.selected.initial_date + '&dataF=' + vm.selected.final_date + '&hora=' + vm.filter.hour + '&pedido=' + vm.filter.request + '&professor=' + vm.filter.teacher + '&assunto=' + vm.filter.subject + '&estado=' + vm.filter.state + '&dataS=' + vm.filter.dateSorting + '&professorS=' + vm.filter.teacherSorting + '&estadoS=' + vm.filter.stateSorting;
              vm.$store.state.http.request({
                url: "http://142.93.142.208/api/aluno/" + vm.$store.state.user.id + "/tutorias?page=1&" + variables,
                method: "GET"
              }).then(response => {
                vm.tutorials = response.content.toJSON().data;
                let offset = -vm.$refs.radlist_tutorials.nativeView.getScrollOffset();
                vm.$refs.radlist_tutorials.nativeView.scrollWithAmount(offset, false);
                vm.numberPages = Math.ceil(response.content.toJSON().total / vm.numberItemsPage);
                vm.page = 1;
                vm.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "Auto";
              }, e => {
                console.log(e);
              });
            }
          }, e => {
            console.log(e);
          });
        }
      });
    },

    convertDate(date) {
      let arrayDate = date.split('-');
      return arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0];
    },

    getDayWeek(date) {
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

    showInfoTutorial(item) {
      alert({
        title: "Informação - Pedido de tutoria",
        message: "\nPedido efetuado pelo " + item.pedido.toLowerCase() + "\n\nData: " + item.data + "\n\nHora de início: " + item.horaInicio + "\n\nAssunto: " + item.assunto + "\n\nDescrição: " + (item.descricao == null ? "Vazia" : item.descricao) + "\n\nSala: " + (item.sala == null ? "Por definir" : item.sala.nome) + "\n\nProfessor(a): " + item.professor.nome + "\n\nUnidade Curricular: " + item.unidade_curricular.nome + "\n\nEstado: " + (item.estado == 1 ? "Confirmado" : "Não confirmado"),
        okButtonText: "Fechar"
      });
    },

    onLoadMoreItemsRequested() {
      if (this.page == this.numberPages) {
        this.$refs.radlist_tutorials.nativeView.notifyAppendItemsOnDemandFinished(0, false);
        this.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "None";
        return;
      }

      this.page++;
      let variables = 'page=' + this.page + '&uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&hora=' + this.filter.hour + '&pedido=' + this.filter.request + '&professor=' + this.filter.teacher + '&assunto=' + this.filter.subject + '&estado=' + this.filter.state + '&dataS=' + this.filter.dateSorting + '&professorS=' + this.filter.teacherSorting + '&estadoS=' + this.filter.stateSorting;
      this.$store.state.http.request({
        url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/tutorias?" + variables,
        method: "GET"
      }).then(response => {
        response.content.toJSON().data.forEach(item => {
          this.tutorials.push(item);
        });
        this.$refs.radlist_tutorials.nativeView.notifyAppendItemsOnDemandFinished(0, false);

        if (this.page == this.numberPages) {
          this.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "None";
        }
      }, e => {
        console.log(e);
      });
    },

    onBackEvent(data) {
      data.cancel = true;
      this.$emit('back');
    },

    setHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.on(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    clearHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.off(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    refreshTable() {
      this.itemSelected = 0;

      if (this.selectedIndex == 0) {
        this.selected.final_date = this.selected.initial_date;
      }

      let variables = 'uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&hora=' + this.filter.hour + '&pedido=' + this.filter.request + '&professor=' + this.filter.teacher + '&assunto=' + this.filter.subject + '&estado=' + this.filter.state + '&dataS=' + this.filter.dateSorting + '&professorS=' + this.filter.teacherSorting + '&estadoS=' + this.filter.stateSorting;
      this.$store.state.http.request({
        url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/tutorias?page=1&" + variables,
        method: "GET"
      }).then(response => {
        this.tutorials = response.content.toJSON().data;
        this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
        this.page = 1;
        this.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "Auto";
        this.$refs.radlist_tutorials.nativeView.notifyPullToRefreshFinished();
      }, e => {
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

  created() {
    if (this.$store.state.isAndroid) {
      this.busyText = "A carregar...";
      this.busy = true;
    }

    this.$store.state.http.request({
      url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/tutorias?page=1&dataS=desc&estadoS=asc",
      method: "GET"
    }).then(response => {
      this.busy = false;
      this.tutorials = response.content.toJSON().data;
      this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
      this.page = 1;

      if (this.tutorials.length < 1) {
        alert({
          title: "Informação",
          message: "Não tem nenhum pedido de tutoria pendente",
          okButtonText: "OK"
        });
        this.$emit('back');
      }
    }, e => {
      console.log(e);
    });
  },

  watch: {
    filter: {
      deep: true,

      handler() {
        if (this.$store.state.isAndroid) {
          this.busyText = "A carregar...";
          this.busy = true;
        }

        this.itemSelected = 0;

        if (this.selectedIndex == 0) {
          this.selected.final_date = this.selected.initial_date;
        }

        let variables = 'uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&hora=' + this.filter.hour + '&pedido=' + this.filter.request + '&professor=' + this.filter.teacher + '&assunto=' + this.filter.subject + '&estado=' + this.filter.state + '&dataS=' + this.filter.dateSorting + '&professorS=' + this.filter.teacherSorting + '&estadoS=' + this.filter.stateSorting;
        this.$store.state.http.request({
          url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/tutorias?page=1&" + variables,
          method: "GET"
        }).then(response => {
          if (this.$store.state.isAndroid) {
            this.busy = false;
          }

          this.tutorials = response.content.toJSON().data;
          let offset = -this.$refs.radlist_tutorials.nativeView.getScrollOffset();
          this.$refs.radlist_tutorials.nativeView.scrollWithAmount(offset, false);
          this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
          this.page = 1;
          this.$refs.radlist_tutorials.nativeView.loadOnDemandMode = "Auto";
        }, e => {
          console.log(e);
        });
      }

    }
  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/loginPage.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nativescript_exit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-exit/index.js");
/* harmony import */ var nativescript_exit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_exit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mainPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/mainPage.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  data: function () {
    return {
      number: "",
      password: "",
      isChecked: false
    };
  },
  methods: {
    login() {
      if (this.number.length < 1) {
        alert({
          title: "Erro",
          message: "Insira o número de estudante",
          okButtonText: "OK"
        });
      } else if (this.password.length < 1) {
        alert({
          title: "Erro",
          message: "Insira a senha",
          okButtonText: "OK"
        });
      } else {
        this.$store.state.http.request({
          url: "http://142.93.142.208/api/login",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          content: JSON.stringify({
            username: this.number,
            password: this.password
          })
        }).then(response => {
          if (response.statusCode == 404 || response.statusCode == 400) {
            //ERRO
            alert({
              title: "Erro",
              message: response.content.toJSON().msg,
              okButtonText: "OK"
            });
          } else if (response.statusCode == 200) {
            //CORREU BEM
            this.$store.commit('defineUser', response.content.toJSON());

            if (this.isChecked) {
              this.$store.state.appSettings.setNumber("id", response.content.toJSON().id);
              this.$store.state.appSettings.setString("nome", response.content.toJSON().nome);
              this.$store.state.appSettings.setNumber("numero", response.content.toJSON().numero);
            }

            this.clearHook();
            this.$navigateTo(_mainPage__WEBPACK_IMPORTED_MODULE_1__["default"]);
          }
        }, e => {
          console.log(e);
        });
      }
    },

    onBackEvent(data) {
      data.cancel = true;
      Object(nativescript_exit__WEBPACK_IMPORTED_MODULE_0__["exit"])();
    },

    setHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.on(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    clearHook() {
      if (this.$store.state.isAndroid) {
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

});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/mainPage.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/classPage.vue");
/* harmony import */ var _loginPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/loginPage.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  data: function () {
    return {
      name: this.$store.state.user.nome,
      email: this.$store.state.user.numero + "@my.ipleiria.pt",
      title: "Página inicial",
      selectedPage: "initialPage",
      teacher: "",
      units: [],
      tName: "",
      tutorialEdit: "",
      classSelected: "",
      itemSelectedClass: 0,
      itemSelectedTutorial: 0
    };
  },
  methods: {
    openMenu() {
      this.$refs.drawer.showDrawer();
    },

    onNavigationItemTap(page, title) {
      this.itemSelectedClass = 0;
      this.itemSelectedTutorial = 0;
      this.selectedPage = page;
      this.title = title;
      this.$refs.drawer.closeDrawer();
    },

    enterClass(code) {
      if (code.trim().length < 1) {
        alert({
          title: "Erro",
          message: "Insira um código",
          okButtonText: "OK"
        });
      } else if (!/^\d+$/.test(code)) {
        alert({
          title: "Erro",
          message: "Insira um valor numérico",
          okButtonText: "OK"
        });
      } else {
        this.$store.state.http.request({
          url: "http://142.93.142.208/api/aula/registar",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          content: JSON.stringify({
            codigo_aula: code,
            aluno_id: this.$store.state.user.id
          })
        }).then(response => {
          if (response.statusCode == 404 || response.statusCode == 400) {
            //ERRO
            alert({
              title: "Erro",
              message: response.content.toJSON().msg,
              okButtonText: "OK"
            });
          } else if (response.statusCode == 200) {
            //CORREU BEM
            this.$navigateTo(_classPage__WEBPACK_IMPORTED_MODULE_0__["default"], {
              props: {
                class_id: response.content.toJSON().aula_id
              }
            }).catch(e => console.log(e));
          }
        }, e => {
          console.log(e);
        });
      }
    },

    enterRegisterTutoring(id, arr, name) {
      this.teacher = id;
      this.units = arr;
      this.tName = name;
      this.selectedPage = "registerTutoring";
      this.title = "Marcar tutoria";
    },

    goingBack() {
      this.selectedPage = "initialPage";
      this.title = "Página inicial";
    },

    seeTeachers() {
      this.selectedPage = "scheduleTutoring";
      this.title = "Marcar tutoria";
    },

    enterEditTutorial(tutorial) {
      this.tutorialEdit = tutorial;
      this.itemSelectedTutorial = tutorial.id;
      this.selectedPage = "editTutorial";
      this.title = "Editar pedido de tutoria";
    },

    seeListTutorials() {
      this.selectedPage = "listTutorials";
      this.title = "Pedidos de tutoria";
    },

    enterClassificationsPage(classSelected) {
      this.classSelected = classSelected;
      this.itemSelectedClass = classSelected.id;
      this.selectedPage = "previousClassificationsPage";
      this.title = "Classificações";
    },

    goingBackClasses() {
      this.selectedPage = "previousClassesPage";
      this.title = "Aulas anteriores";
    },

    convertDate(date) {
      let objDate = new Date(date);
      return (objDate.getDate() < 10 ? "0" + objDate.getDate() : objDate.getDate()) + "-" + (objDate.getMonth() + 1 < 10 ? "0" + (objDate.getMonth() + 1) : objDate.getMonth() + 1) + "-" + objDate.getFullYear();
    },

    seeClassInfo() {
      alert({
        title: "Informação - Aula",
        message: "\nData: " + this.convertDate(this.classSelected.data) + "\n\nUnidade Curricular: " + this.classSelected.unidade_curricular + "\n\nProfessor(a): " + this.classSelected.professor,
        okButtonText: "Fechar"
      });
    },

    logout() {
      let vm = this;
      confirm({
        title: "Terminar sessão",
        message: "Tem a certeza que deseja terminar a sessão atual?",
        okButtonText: "Sim",
        cancelButtonText: "Não"
      }).then(function (result) {
        if (result) {
          vm.$store.commit('destroyUser');
          vm.$store.state.appSettings.clear();
          vm.$navigateTo(_loginPage__WEBPACK_IMPORTED_MODULE_1__["default"]);
        } else {
          vm.$refs.drawer.closeDrawer();
        }
      });
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/previousClassesPage.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['itemSelected'],
  data: function () {
    return {
      filter: {
        initial_date: "",
        final_date: "",
        course_unit: "",
        school_year: "",
        semester: "",
        course_year: "",
        dateSorting: "desc",
        unitSorting: ""
      },
      selected: {
        initial_date: "",
        final_date: ""
      },
      classes: [],
      numberPages: "",
      numberItemsPage: 10,
      page: 1,
      fields: ['Data', 'Unidade'],
      filterVis: "collapsed",
      dateVis: "visible",
      intervalDateVis: "collapsed",
      choices: ["Dia", "Intervalo"],
      selectedIndex: 0,
      filterBtnName: "Filtrar",
      itemSelected: 0,
      school_year_list: [],
      semester_list: [1, 2],
      course_year_list: [],
      clearDrop: {
        selected_school_year: null,
        selected_semester: null,
        selected_course_year: null
      },
      busy: false,
      busyText: ""
    };
  },
  methods: {
    onClassTap(event) {
      this.page = 1;
      alert({
        title: "Informação - Aula",
        message: "\nData: " + this.convertDate(event.item.data) + "\n\nUnidade Curricular: " + event.item.unidade_curricular + "\n\nProfessor(a): " + event.item.professor + "\n\nAno Letivo: " + event.item.anoLetivo + "\n\nSemestre: " + event.item.semestre + "\n\nAno do Curso: " + event.item.anoCurso,
        okButtonText: "Fechar"
      });
      this.$emit('seeClassifications', event.item);
    },

    filterClasses() {
      this.filterVis = this.filterVis == "collapsed" ? "visible" : "collapsed";

      if (this.filterVis == "collapsed") {
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
      } else {
        this.filterBtnName = "Desativar Filtros";
      }
    },

    dropDownSelectedIndexChanged(event) {
      this.filter['initial_date'] = '';
      this.filter['final_date'] = '';
      this.selected['initial_date'] = '';
      this.selected['final_date'] = '';

      if (event.newIndex == 0) {
        this.intervalDateVis = "collapsed";
        this.dateVis = "visible";
      } else {
        this.dateVis = "collapsed";
        this.intervalDateVis = "visible";
      }

      this.selectedIndex = event.newIndex;
    },

    openDate(date) {
      let picker = new this.$store.state.modalPicker();
      picker.pickDate({
        title: "Selecione uma data",
        theme: "light",
        maxDate: new Date(),
        startingDate: new Date(this.selected[date].length == 0 ? new Date() : this.selected[date])
      }).then(result => {
        if (result === undefined) {
          return;
        }

        this.filter[date] = result.day + "-" + result.month + "-" + result.year;
        this.selected[date] = result.year + "-" + result.month + "-" + result.day;
      }).catch(error => {
        console.log(error);
      });
    },

    clear(filter) {
      this.filter[filter] = '';
      this.selected[filter] = '';
    },

    clearIndex(filter) {
      this.filter[filter] = '';
      this.clearDrop['selected_' + filter] = null;
    },

    changeShoolYear(event) {
      if (event.newIndex == null) {
        this.filter['school_year'] = '';
      } else {
        this.filter['school_year'] = this.school_year_list[event.newIndex];
        this.clearDrop['selected_school_year'] = event.newIndex;
      }
    },

    changeSemester(event) {
      if (event.newIndex == null) {
        this.filter['semester'] = '';
      } else {
        this.filter['semester'] = this.semester_list[event.newIndex];
        this.clearDrop['selected_semester'] = event.newIndex;
      }
    },

    changeCourseYear(event) {
      if (event.newIndex == null) {
        this.filter['course_year'] = '';
      } else {
        this.filter['course_year'] = this.course_year_list[event.newIndex];
        this.clearDrop['selected_course_year'] = event.newIndex;
      }
    },

    changeSortingDate() {
      this.filter['unitSorting'] = '';
      this.filter['dateSorting'] = this.filter['dateSorting'] == 'desc' ? 'asc' : 'desc';
    },

    changeSortingUnit() {
      this.filter['unitSorting'] = this.filter['unitSorting'] == 'asc' ? 'desc' : 'asc';
      this.filter['dateSorting'] = '';
    },

    convertDate(date) {
      let objDate = new Date(date);
      return (objDate.getDate() < 10 ? "0" + objDate.getDate() : objDate.getDate()) + "-" + (objDate.getMonth() + 1 < 10 ? "0" + (objDate.getMonth() + 1) : objDate.getMonth() + 1) + "-" + objDate.getFullYear();
    },

    onBackEvent(data) {
      data.cancel = true;
      this.$emit('back');
    },

    setHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.on(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    clearHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.off(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    onLoadMoreItemsRequested() {
      if (this.page == this.numberPages) {
        this.$refs.list_classes.nativeView.notifyAppendItemsOnDemandFinished(0, false);
        this.$refs.list_classes.nativeView.loadOnDemandMode = "None";
        return;
      }

      this.page++;
      let variables = 'page=' + this.page + '&uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&anoLetivo=' + this.filter.school_year + '&semestre=' + this.filter.semester + '&ano=' + this.filter.course_year + '&dataS=' + this.filter.dateSorting + '&ucS=' + this.filter.unitSorting;
      this.$store.state.http.request({
        url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/aulas/anteriores?" + variables,
        method: "GET"
      }).then(response => {
        response.content.toJSON().data.forEach(item => {
          this.classes.push(item);
        });
        this.$refs.list_classes.nativeView.notifyAppendItemsOnDemandFinished(0, false);

        if (this.page == this.numberPages) {
          this.$refs.list_classes.nativeView.loadOnDemandMode = "None";
        }
      }, e => {
        console.log(e);
      });
    },

    refreshTable() {
      this.itemSelected = 0;

      if (this.selectedIndex == 0) {
        this.selected.final_date = this.selected.initial_date;
      }

      let variables = 'uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&anoLetivo=' + this.filter.school_year + '&semestre=' + this.filter.semester + '&ano=' + this.filter.course_year + '&dataS=' + this.filter.dateSorting + '&ucS=' + this.filter.unitSorting;
      this.$store.state.http.request({
        url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/aulas/anteriores?page=1&" + variables,
        method: "GET"
      }).then(response => {
        this.classes = response.content.toJSON().data;
        this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
        this.page = 1;
        this.$refs.list_classes.nativeView.loadOnDemandMode = "Auto";
        this.$refs.list_classes.nativeView.notifyPullToRefreshFinished();
      }, e => {
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

  created() {
    if (this.$store.state.isAndroid) {
      this.busyText = "A carregar...";
      this.busy = true;
    }

    this.$store.state.http.request({
      url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/aulas/anteriores?page=1&dataS=desc",
      method: "GET"
    }).then(response => {
      this.busy = false;
      this.classes = response.content.toJSON().data;
      this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
      this.page = 1;

      if (this.classes.length < 1) {
        alert({
          title: "Informação",
          message: "Não participou em nenhuma aula que já tenha terminado",
          okButtonText: "OK"
        });
        this.$emit('back');
      } else {
        this.$store.state.http.request({
          url: "http://142.93.142.208/api/anosLetivos",
          method: "GET"
        }).then(response => {
          this.school_year_list = response.content.toJSON();
        }, e => {
          console.log(e);
        });
        this.$store.state.http.request({
          url: "http://142.93.142.208/api/anosCursos",
          method: "GET"
        }).then(response => {
          this.course_year_list = response.content.toJSON();
        }, e => {
          console.log(e);
        });
      }
    }, e => {
      console.log(e);
    });
  },

  watch: {
    filter: {
      deep: true,

      handler() {
        if (this.$store.state.isAndroid) {
          this.busyText = "A carregar...";
          this.busy = true;
        }

        this.itemSelected = 0;

        if (this.selectedIndex == 0) {
          this.selected.final_date = this.selected.initial_date;
        }

        let variables = 'uc=' + this.filter.course_unit + '&dataI=' + this.selected.initial_date + '&dataF=' + this.selected.final_date + '&anoLetivo=' + this.filter.school_year + '&semestre=' + this.filter.semester + '&ano=' + this.filter.course_year + '&dataS=' + this.filter.dateSorting + '&ucS=' + this.filter.unitSorting;
        this.$store.state.http.request({
          url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/aulas/anteriores?page=1&" + variables,
          method: "GET"
        }).then(response => {
          if (this.$store.state.isAndroid) {
            this.busy = false;
          }

          this.classes = response.content.toJSON().data;
          let offset = -this.$refs.list_classes.nativeView.getScrollOffset();
          this.$refs.list_classes.nativeView.scrollWithAmount(offset, false);
          this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
          this.page = 1;
          this.$refs.list_classes.nativeView.loadOnDemandMode = "Auto";
        }, e => {
          console.log(e);
        });
      }

    }
  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/previousClassificationsPage.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['classSelected'],
  data: function () {
    return {
      classifications: [],
      sortingClassifications: {
        contentSorting: "",
        classificationSorting: ""
      },
      itemSelected: 0,
      numberPages: "",
      numberItemsPage: 10,
      page: 1,
      busy: false,
      busyText: ""
    };
  },
  methods: {
    onClassificationTap(event) {
      this.itemSelected = event.item.id;
      this.$refs.list_classifications.nativeView.refresh();

      switch (event.item.tipo) {
        case 'expl':
          event.item.tipo = 'Exercício Prático-Laboratorial';
          break;

        case 'ext':
          event.item.tipo = 'Exercício Teórico';
          break;

        case 't':
          event.item.tipo = 'Teórico';
          break;

        case 'pl':
          event.item.tipo = 'Prático-Laboratorial';
          break;
      }

      alert({
        title: "Informação - Conteúdo",
        message: "\nConteúdo: " + event.item.conteudo + "\n\nTema: " + event.item.tema + "\n\nTipo: " + event.item.tipo + "\n\nDescição: " + (event.item.descricao == null ? "Vazia" : event.item.descricao) + "\n\nClassificação: " + (event.item.valor == null ? "N/D" : event.item.valor),
        okButtonText: "Fechar"
      });
    },

    changeSortingContent() {
      this.sortingClassifications['contentSorting'] = this.sortingClassifications['contentSorting'] == 'asc' ? 'desc' : 'asc';
      this.sortingClassifications['classificationSorting'] = '';
    },

    changeSortingClassification() {
      this.sortingClassifications['classificationSorting'] = this.sortingClassifications['classificationSorting'] == 'desc' ? 'asc' : 'desc';
      this.sortingClassifications['contentSorting'] = '';
    },

    chooseClass() {
      this.$emit('back');
    },

    onBackEvent(data) {
      data.cancel = true;
      this.$emit('back');
    },

    setHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.on(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    clearHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.off(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    onLoadMoreItemsRequested() {
      if (this.page == this.numberPages) {
        this.$refs.list_classifications.nativeView.notifyAppendItemsOnDemandFinished(0, false);
        this.$refs.list_classifications.nativeView.loadOnDemandMode = "None";
        return;
      }

      this.page++;
      let variables = 'page=' + this.page + '&conteudoS=' + this.sortingClassifications.contentSorting + '&classificacaoS=' + this.sortingClassifications.classificationSorting;
      this.$store.state.http.request({
        url: "http://142.93.142.208/api/aula/" + this.classSelected.id + "/aluno/" + this.$store.state.user.id + "/classificacoes/total?" + variables,
        method: "GET"
      }).then(response => {
        response.content.toJSON().data.forEach(item => {
          this.classifications.push(item);
        });
        this.$refs.list_classifications.nativeView.notifyAppendItemsOnDemandFinished(0, false);

        if (this.page == this.numberPages) {
          this.$refs.list_classifications.nativeView.loadOnDemandMode = "None";
        }
      }, e => {
        console.log(e);
      });
    },

    refreshTable() {
      let variables = 'conteudoS=' + this.sortingClassifications.contentSorting + '&classificacaoS=' + this.sortingClassifications.classificationSorting;
      this.$store.state.http.request({
        url: "http://142.93.142.208/api/aula/" + this.classSelected.id + "/aluno/" + this.$store.state.user.id + "/classificacoes/total?page=1&" + variables,
        method: "GET"
      }).then(response => {
        this.classifications = response.content.toJSON().data;
        this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
        this.page = 1;
        this.$refs.list_classifications.nativeView.loadOnDemandMode = "Auto";
        this.$refs.list_classifications.nativeView.notifyPullToRefreshFinished();
      }, e => {
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

  created() {
    if (this.$store.state.isAndroid) {
      this.busyText = "A carregar...";
      this.busy = true;
    }

    this.$store.state.http.request({
      url: "http://142.93.142.208/api/aula/" + this.classSelected.id + "/aluno/" + this.$store.state.user.id + "/classificacoes/total",
      method: "GET"
    }).then(response => {
      this.busy = false;
      this.classifications = response.content.toJSON().data;
      this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
      this.page = 1;

      if (this.classifications.length < 1) {
        alert({
          title: "Informação",
          message: "A aula não tem conteúdos associados",
          okButtonText: "OK"
        });
        this.$emit('back');
      }
    }, e => {
      console.log(e);
    });
  },

  watch: {
    sortingClassifications: {
      deep: true,

      handler() {
        let variables = 'conteudoS=' + this.sortingClassifications.contentSorting + '&classificacaoS=' + this.sortingClassifications.classificationSorting;
        this.$store.state.http.request({
          url: "http://142.93.142.208/api/aula/" + this.classSelected.id + "/aluno/" + this.$store.state.user.id + "/classificacoes/total?page=1&" + variables,
          method: "GET"
        }).then(response => {
          this.classifications = response.content.toJSON().data;
          let offset = -this.$refs.list_classifications.nativeView.getScrollOffset();
          this.$refs.list_classifications.nativeView.scrollWithAmount(offset, false);
          this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
          this.page = 1;
          this.$refs.list_classifications.nativeView.loadOnDemandMode = "Auto";
        }, e => {
          console.log(e);
        });
      }

    }
  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/registerTutoring.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['teacher_id', 'course_units', 'teacher_name'],
  data: function () {
    return {
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
    };
  },
  methods: {
    checkValidTime() {
      let currentTime = new Date();

      if (this.currentDate.day == currentTime.getDate() && this.currentDate.month == currentTime.getMonth() + 1 && this.currentDate.year == currentTime.getFullYear()) {
        if (this.currentHour != "") {
          if (this.currentHour.hour == currentTime.getHours() && this.currentHour.minute <= currentTime.getMinutes()) {
            return false;
          } else if (this.currentHour.hour < currentTime.getHours()) {
            return false;
          }
        }
      }

      return true;
    },

    openDate() {
      let picker = new this.$store.state.modalPicker();
      picker.pickDate({
        title: "Selecione uma data",
        theme: "light",
        minDate: new Date(),
        startingDate: new Date(this.currentDate.length == 0 ? new Date() : this.currentDate.year + "-" + this.currentDate.month + "-" + this.currentDate.day)
      }).then(result => {
        if (result === undefined) {
          return;
        }

        this.currentDate = result;
        this.date = (result.day < 10 ? "0" + result.day : result.day) + "-" + (result.month < 10 ? "0" + result.month : result.month) + "-" + result.year;

        if (!this.checkValidTime()) {
          this.currentHour = "";
          this.hour = "";
          alert({
            title: "Erro",
            message: "Selecione uma data/hora superior à atual",
            okButtonText: "OK"
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },

    openTime() {
      let picker = new this.$store.state.modalPicker();
      picker.pickTime({
        title: "Selecione uma hora",
        theme: "light"
      }).then(result => {
        if (result === undefined) {
          return;
        }

        this.currentHour = result;

        if (this.checkValidTime()) {
          this.hour = (result.hour < 10 ? "0" + result.hour : result.hour) + (result.minute < 10 ? ":0" : ":") + result.minute;
        } else {
          this.currentHour = "";
          this.hour = "";
          alert({
            title: "Erro",
            message: "Selecione uma data/hora superior à atual",
            okButtonText: "OK"
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },

    chooseTeacher() {
      this.$emit('backTeachers');
    },

    changeUnit(event) {
      this.course_unit_id = this.course_units[event.newIndex].id;
      this.course_unit_selected = this.course_units_name[event.newIndex];
    },

    register() {
      if (this.teacher_id < 1) {
        alert({
          title: "Erro",
          message: "Selecione um professor",
          okButtonText: "OK"
        });
      } else if (this.date.length < 1) {
        alert({
          title: "Erro",
          message: "Selecione a data em que a tutoria vai decorrer",
          okButtonText: "OK"
        });
      } else if (this.hour.length < 1) {
        alert({
          title: "Erro",
          message: "Selecione a hora em que a tutoria vai decorrer",
          okButtonText: "OK"
        });
      } else if (this.subject.length < 1) {
        alert({
          title: "Erro",
          message: "Insira o assunto da tutoria",
          okButtonText: "OK"
        });
      } else if (this.course_unit_selected.length < 1) {
        alert({
          title: "Erro",
          message: "Selecione a unidade curricular a que a tutoria vai estar associada",
          okButtonText: "OK"
        });
      } else if (!this.checkValidTime()) {
        this.currentHour = "";
        this.hour = "";
        alert({
          title: "Erro",
          message: "Selecione uma data/hora superior à atual",
          okButtonText: "OK"
        });
      } else {
        this.busyText = "A marcar tutoria...";
        this.busy = true;
        this.$store.state.http.request({
          url: "http://142.93.142.208/api/tutoria",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          content: JSON.stringify({
            professor_id: this.teacher_id,
            data: this.currentDate.year + "-" + this.currentDate.month + "-" + this.currentDate.day,
            hora: this.hour,
            assunto: this.subject,
            descricao: this.description,
            uc_id: this.course_unit_id,
            aluno_id: this.$store.state.user.id
          })
        }).then(response => {
          this.busy = false;

          if (response.statusCode == 404 || response.statusCode == 400) {
            //ERRO
            alert({
              title: "Erro",
              message: response.content.toJSON().msg,
              okButtonText: "OK"
            });
          } else if (response.statusCode == 200) {
            //CORREU BEM
            alert({
              title: "Informação",
              message: "Marcação da tutoria efetuada com sucesso",
              okButtonText: "OK"
            });
            this.$emit('backTeachers');
          }
        }, e => {
          console.log(e);
        });
      }
    },

    onBackEvent(data) {
      data.cancel = true;
      this.$emit('backTeachers');
    },

    setHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.on(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    clearHook() {
      if (this.$store.state.isAndroid) {
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

  created() {
    this.course_units.forEach(unit => this.course_units_name.push(unit.nome));
  }

});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/scheduleTutoring.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function () {
    return {
      teachers: [],
      numberPages: "",
      numberItemsPage: 10,
      page: 1,
      busy: false,
      busyText: ""
    };
  },
  methods: {
    onTeacherTap(event) {
      this.$emit('registerTutoring', event.item.professor_id, event.item.ucs, event.item.professor_nome);
    },

    onBackEvent(data) {
      data.cancel = true;
      this.$emit('back');
    },

    setHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.on(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    clearHook() {
      if (this.$store.state.isAndroid) {
        this.$store.state.android.off(this.$store.state.androidApp.activityBackPressedEvent, this.onBackEvent);
      }
    },

    onLoadMoreItemsRequested() {
      if (this.page == this.numberPages) {
        this.$refs.list_teachers.nativeView.notifyAppendItemsOnDemandFinished(0, false);
        this.$refs.list_teachers.nativeView.loadOnDemandMode = "None";
        return;
      }

      this.page++;
      this.$store.state.http.request({
        url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/professores?page=" + this.page,
        method: "GET"
      }).then(response => {
        response.content.toJSON().data.forEach(item => {
          this.teachers.push(item);
        });
        this.$refs.list_teachers.nativeView.notifyAppendItemsOnDemandFinished(0, false);

        if (this.page == this.numberPages) {
          this.$refs.list_teachers.nativeView.loadOnDemandMode = "None";
        }
      }, e => {
        console.log(e);
      });
    },

    refreshTable() {
      this.$store.state.http.request({
        url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/professores?page=1",
        method: "GET"
      }).then(response => {
        this.teachers = response.content.toJSON().data;
        this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
        this.page = 1;
        this.$refs.list_teachers.nativeView.loadOnDemandMode = "Auto";
        this.$refs.list_teachers.nativeView.notifyPullToRefreshFinished();
      }, e => {
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

  created() {
    if (this.$store.state.isAndroid) {
      this.busyText = "A carregar...";
      this.busy = true;
    }

    this.$store.state.http.request({
      url: "http://142.93.142.208/api/aluno/" + this.$store.state.user.id + "/professores?page=1",
      method: "GET"
    }).then(response => {
      this.busy = false;
      this.teachers = response.content.toJSON().data;
      this.numberPages = Math.ceil(response.content.toJSON().total / this.numberItemsPage);
      this.page = 1;

      if (this.teachers.length < 1) {
        alert({
          title: "Informação",
          message: "Não está incrito em nenhuma unidade curricular",
          okButtonText: "OK"
        });
        this.$emit('back');
      }
    }, e => {
      console.log(e);
    });
  }

});

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/classPage.vue?vue&type=style&index=0&id=4dab8408&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\n.header-elem[data-v-4dab8408]{\n    color: white;\n}\n.arrow-right[data-v-4dab8408]{\n    margin-right: 2%;\n    margin-bottom: 2%;\n}\n.arrow-left[data-v-4dab8408]{\n    margin-left: 2%;\n    margin-bottom: 2%;\n}\n.have_classification[data-v-4dab8408]{\n    font-weight: bold;\n}\n", ""]);


    const application = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
    __webpack_require__("../node_modules/@nativescript/core/ui/styling/style-scope.js");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (false) {}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/editTutorial.vue?vue&type=style&index=0&id=59b1ba43&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);


    const application = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
    __webpack_require__("../node_modules/@nativescript/core/ui/styling/style-scope.js");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (false) {}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/initialPage.vue?vue&type=style&index=0&id=df00b6f0&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);


    const application = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
    __webpack_require__("../node_modules/@nativescript/core/ui/styling/style-scope.js");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (false) {}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/listArchivedTutorials.vue?vue&type=style&index=0&id=7bf3352c&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\n.header[data-v-7bf3352c]{\n    font-weight: bold;\n}\nButton[data-v-7bf3352c]{\n    width: 35%;\n    margin-top: 1%;\n}\nDropDown[data-v-7bf3352c]{\n    margin-left: 5%;\n}\n.selected[data-v-7bf3352c]{\n    background-color: #123456;\n    color: white;\n}\n", ""]);


    const application = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
    __webpack_require__("../node_modules/@nativescript/core/ui/styling/style-scope.js");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (false) {}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/listTutorials.vue?vue&type=style&index=0&id=017c85a8&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\n.header[data-v-017c85a8]{\n    font-weight: bold;\n}\nButton[data-v-017c85a8]{\n    width: 35%;\n    margin-top: 1%;\n}\nDropDown[data-v-017c85a8]{\n    margin-left: 5%;\n}\n.selected[data-v-017c85a8]{\n    background-color: #123456;\n    color: white;\n}\n", ""]);


    const application = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
    __webpack_require__("../node_modules/@nativescript/core/ui/styling/style-scope.js");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (false) {}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/loginPage.vue?vue&type=style&index=0&id=600202ed&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\n.title[data-v-600202ed]{\n    margin-bottom: 10%;\n}\n.item[data-v-600202ed]{\n    margin: 1%;\n}\n", ""]);


    const application = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
    __webpack_require__("../node_modules/@nativescript/core/ui/styling/style-scope.js");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (false) {}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/mainPage.vue?vue&type=style&index=0&id=6ff81823&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\n.header-elem[data-v-6ff81823]{\n    color:white;\n}\n.center-item[data-v-6ff81823]{\n    vertical-align: center;\n    horiz-align: center;\n    width:85%;\n}\n", ""]);


    const application = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
    __webpack_require__("../node_modules/@nativescript/core/ui/styling/style-scope.js");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (false) {}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/previousClassesPage.vue?vue&type=style&index=0&id=1bc4f31a&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\n.list[data-v-1bc4f31a]{\n    margin-top: 2%;\n}\nButton[data-v-1bc4f31a]{\n    width: 35%;\n    margin-top: 1%;\n}\nDropDown[data-v-1bc4f31a]{\n    margin-left: 5%;\n}\n.selected[data-v-1bc4f31a]{\n    background-color: #123456;\n    color: white;\n}\n.header[data-v-1bc4f31a]{\n    font-weight: bold;\n}\n", ""]);


    const application = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
    __webpack_require__("../node_modules/@nativescript/core/ui/styling/style-scope.js");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (false) {}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/previousClassificationsPage.vue?vue&type=style&index=0&id=a506cacc&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\n.list[data-v-a506cacc]{\n    margin-top: 5%;\n}\n.selected[data-v-a506cacc]{\n    background-color: #123456;\n    color: white;\n}\n.header[data-v-a506cacc]{\n    font-weight: bold;\n}\n", ""]);


    const application = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
    __webpack_require__("../node_modules/@nativescript/core/ui/styling/style-scope.js");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (false) {}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/registerTutoring.vue?vue&type=style&index=0&id=3f471e6a&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);


    const application = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
    __webpack_require__("../node_modules/@nativescript/core/ui/styling/style-scope.js");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (false) {}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/scheduleTutoring.vue?vue&type=style&index=0&id=4037345e&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\n.name[data-v-4037345e]{\n    font-weight: bold;\n}\n", ""]);


    const application = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
    __webpack_require__("../node_modules/@nativescript/core/ui/styling/style-scope.js");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (false) {}


/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/classPage.vue?vue&type=template&id=4dab8408&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    { attrs: { actionBarHidden: "true" } },
    [
      _c(
        "RadSideDrawer",
        {
          ref: "drawerContent",
          attrs: { drawerLocation: "Left", gesturesEnabled: "true" }
        },
        [
          _c(
            "StackLayout",
            {
              directives: [
                {
                  name: "view",
                  rawName: "v-view:drawerContent",
                  arg: "drawerContent",
                  modifiers: {}
                }
              ]
            },
            [
              _c(
                "StackLayout",
                { staticClass: "nt-drawer__header" },
                [
                  _c("Image", {
                    staticClass: "nt-drawer__header-image fas t-36",
                    staticStyle: { color: "white" },
                    attrs: { "src.decode": "font://&#xf2bd;" }
                  }),
                  _c("Label", {
                    staticClass: "header-elem",
                    attrs: { text: _vm.name }
                  }),
                  _c("Label", {
                    staticClass: "header-elem",
                    attrs: { text: _vm.email }
                  })
                ],
                1
              ),
              _c(
                "ScrollView",
                { staticClass: "nt-drawer__body" },
                [
                  _c(
                    "StackLayout",
                    _vm._l(_vm.contents, function(content) {
                      return _c(
                        "GridLayout",
                        {
                          key: content.id,
                          staticClass: "nt-drawer__list-item",
                          attrs: {
                            columns: "*",
                            backgroundColor:
                              _vm.selectedContent.nome === content.nome
                                ? "#e0f5ff"
                                : "white",
                            color:
                              _vm.selectedContent.nome === content.nome
                                ? "#0088c9"
                                : "black"
                          },
                          on: {
                            tap: function($event) {
                              return _vm.onNavigationItemTap(content)
                            }
                          }
                        },
                        [
                          _c("Label", {
                            class: _vm.checkClassification(content.id)
                              ? "have_classification"
                              : "",
                            attrs: {
                              text:
                                _vm.getContentClassification(content.id) +
                                content.nome,
                              col: "0"
                            }
                          })
                        ],
                        1
                      )
                    }),
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _c(
            "Frame",
            {
              directives: [
                {
                  name: "view",
                  rawName: "v-view:mainContent",
                  arg: "mainContent",
                  modifiers: {}
                }
              ]
            },
            [
              _c(
                "Page",
                [
                  _c(
                    "ActionBar",
                    {
                      staticStyle: { color: "white" },
                      attrs: { title: _vm.course_unit },
                      on: { tap: _vm.seeTitle }
                    },
                    [
                      this.$store.state.isAndroid
                        ? _c(
                            "android",
                            [
                              _c("NavigationButton", {
                                attrs: { icon: "res://menu" },
                                on: { tap: _vm.openMenu }
                              }),
                              _c(
                                "ActionItem",
                                [
                                  _c("Label", {
                                    staticStyle: { fontWeight: "bold" },
                                    attrs: {
                                      text: "Sair",
                                      fontSize: "15",
                                      horizontalAlignment: "right"
                                    },
                                    on: { tap: _vm.exit }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        : _c(
                            "ios",
                            [
                              _c("ActionItem", {
                                attrs: {
                                  icon: "res://menu",
                                  "ios.position": "left"
                                },
                                on: { tap: _vm.openMenu }
                              }),
                              _c("ActionItem", {
                                attrs: {
                                  text: "Sair",
                                  "ios.position": "right"
                                },
                                on: { tap: _vm.exit }
                              })
                            ],
                            1
                          )
                    ],
                    1
                  ),
                  _c(
                    "GridLayout",
                    {
                      attrs: {
                        rows: "*",
                        columns: "*",
                        height: "100%",
                        width: "100%",
                        horizontalAlignment: "center",
                        verticalAlignment: "center"
                      }
                    },
                    [
                      _c(
                        "StackLayout",
                        {
                          attrs: {
                            row: "0",
                            col: "0",
                            verticalAlignment: "center",
                            horizontalAlignment: "center"
                          }
                        },
                        [
                          _vm.busy
                            ? _c("ActivityIndicator", {
                                attrs: { busy: _vm.busy }
                              })
                            : _vm._e(),
                          _vm.busy
                            ? _c("Label", {
                                attrs: {
                                  text: _vm.busyText,
                                  horizontalAlignment: "center"
                                }
                              })
                            : _vm._e(),
                          _c(
                            "GridLayout",
                            {
                              attrs: {
                                columns: "*,auto",
                                rows: "auto",
                                horizontalAlignment: "center"
                              }
                            },
                            [
                              _c("Label", {
                                attrs: {
                                  text: _vm.selectedContent.nome,
                                  textAlignment: "center",
                                  fontSize: "35",
                                  col: "0",
                                  row: "0"
                                }
                              }),
                              _c("Image", {
                                attrs: {
                                  src: "~/others/info-icon.png",
                                  strech: "none",
                                  width: "8%",
                                  col: "1",
                                  row: "0"
                                },
                                on: { tap: _vm.showInfo }
                              })
                            ],
                            1
                          ),
                          _c("Label", {
                            staticStyle: { marginTop: "5%" },
                            attrs: {
                              text:
                                "Avalie a sua compreensão sobre este conteúdo",
                              horizontalAlignment: "center"
                            }
                          }),
                          _c(
                            "GridLayout",
                            {
                              staticStyle: {
                                marginTop: "5%",
                                marginBottom: "15%"
                              },
                              attrs: {
                                columns: "auto,auto,auto,auto,auto",
                                rows: "auto,auto"
                              }
                            },
                            [
                              _c("Image", {
                                attrs: {
                                  src: "~/scale/1.png",
                                  strech: "none",
                                  col: "0",
                                  width: "20%",
                                  row: "0"
                                },
                                on: {
                                  tap: function($event) {
                                    return _vm.onClassButtonTap(1)
                                  }
                                }
                              }),
                              _c("Image", {
                                attrs: {
                                  src: "~/scale/2.png",
                                  strech: "none",
                                  col: "1",
                                  width: "20%",
                                  row: "0"
                                },
                                on: {
                                  tap: function($event) {
                                    return _vm.onClassButtonTap(2)
                                  }
                                }
                              }),
                              _c("Image", {
                                attrs: {
                                  src: "~/scale/3.png",
                                  strech: "none",
                                  col: "2",
                                  width: "20%",
                                  row: "0"
                                },
                                on: {
                                  tap: function($event) {
                                    return _vm.onClassButtonTap(3)
                                  }
                                }
                              }),
                              _c("Image", {
                                attrs: {
                                  src: "~/scale/4.png",
                                  strech: "none",
                                  col: "3",
                                  width: "20%",
                                  row: "0"
                                },
                                on: {
                                  tap: function($event) {
                                    return _vm.onClassButtonTap(4)
                                  }
                                }
                              }),
                              _c("Image", {
                                attrs: {
                                  src: "~/scale/5.png",
                                  strech: "none",
                                  col: "4",
                                  width: "20%",
                                  row: "0"
                                },
                                on: {
                                  tap: function($event) {
                                    return _vm.onClassButtonTap(5)
                                  }
                                }
                              }),
                              _c("Image", {
                                attrs: {
                                  src: "~/others/1.png",
                                  strech: "none",
                                  col: "0",
                                  row: "1",
                                  width: "10%",
                                  horizontalAlignment: "center",
                                  visibility:
                                    _vm.selectedClass == 1
                                      ? "visible"
                                      : "collapsed"
                                }
                              }),
                              _c("Image", {
                                attrs: {
                                  src: "~/others/2.png",
                                  strech: "none",
                                  col: "1",
                                  row: "1",
                                  width: "10%",
                                  horizontalAlignment: "center",
                                  visibility:
                                    _vm.selectedClass == 2
                                      ? "visible"
                                      : "collapsed"
                                }
                              }),
                              _c("Image", {
                                attrs: {
                                  src: "~/others/3.png",
                                  strech: "none",
                                  col: "2",
                                  row: "1",
                                  width: "10%",
                                  horizontalAlignment: "center",
                                  visibility:
                                    _vm.selectedClass == 3
                                      ? "visible"
                                      : "collapsed"
                                }
                              }),
                              _c("Image", {
                                attrs: {
                                  src: "~/others/4.png",
                                  strech: "none",
                                  col: "3",
                                  row: "1",
                                  width: "10%",
                                  horizontalAlignment: "center",
                                  visibility:
                                    _vm.selectedClass == 4
                                      ? "visible"
                                      : "collapsed"
                                }
                              }),
                              _c("Image", {
                                attrs: {
                                  src: "~/others/5.png",
                                  strech: "none",
                                  col: "4",
                                  row: "1",
                                  width: "10%",
                                  horizontalAlignment: "center",
                                  visibility:
                                    _vm.selectedClass == 5
                                      ? "visible"
                                      : "collapsed"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _c(
                        "GridLayout",
                        {
                          attrs: {
                            columns: "*,*",
                            rows: "auto",
                            verticalAlignment: "bottom",
                            row: "0",
                            col: "0"
                          }
                        },
                        [
                          _c("Image", {
                            staticClass: "arrow-left",
                            attrs: {
                              src: "~/others/left-arrow.png",
                              strech: "none",
                              width: "15%",
                              col: "0",
                              row: "0",
                              verticalAlignment: "bottom",
                              horizontalAlignment: "left",
                              visibility: _vm.arrowLeftVis
                            },
                            on: { tap: _vm.seePrevious }
                          }),
                          _c("Image", {
                            staticClass: "arrow-right",
                            attrs: {
                              src: "~/others/right-arrow.png",
                              strech: "none",
                              width: "15%",
                              col: "1",
                              row: "0",
                              verticalAlignment: "bottom",
                              horizontalAlignment: "right",
                              visibility: _vm.arrowRightVis
                            },
                            on: { tap: _vm.seeNext }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/editTutorial.vue?vue&type=template&id=59b1ba43&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "GridLayout",
    {
      attrs: {
        rows: "*",
        columns: "*",
        height: "100%",
        horizontalAlignment: "center",
        verticalAlignment: "center"
      }
    },
    [
      _c(
        "StackLayout",
        {
          attrs: {
            row: "0",
            col: "0",
            width: "90%",
            verticalAlignment: "top",
            horizontalAlignment: "center"
          }
        },
        [
          _c(
            "GridLayout",
            { attrs: { columns: "*", rows: "auto,auto" } },
            [
              _vm.busy
                ? _c("ActivityIndicator", {
                    attrs: { busy: _vm.busy, row: "0", col: "0" }
                  })
                : _vm._e(),
              _vm.busy
                ? _c("Label", {
                    attrs: {
                      text: _vm.busyText,
                      horizontalAlignment: "center",
                      row: "1",
                      col: "0"
                    }
                  })
                : _vm._e()
            ],
            1
          ),
          _c(
            "GridLayout",
            {
              staticStyle: { marginTop: "2%" },
              attrs: { columns: "*", rows: "auto,auto" }
            },
            [
              _c("Label", {
                attrs: {
                  text: "Professor(a)",
                  fontSize: "15",
                  row: "0",
                  col: "0"
                }
              }),
              _c("TextField", {
                attrs: {
                  editable: "false",
                  fontSize: "15",
                  row: "1",
                  col: "0",
                  text: _vm.tutorial.professor.nome
                },
                on: {
                  textChange: function($event) {
                    return _vm.$set(
                      _vm.tutorial.professor,
                      "nome",
                      $event.value
                    )
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            { attrs: { columns: "*", rows: "auto,auto" } },
            [
              _c("Label", {
                attrs: { text: "Data", fontSize: "15", row: "0", col: "0" }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Data",
                  editable: "false",
                  fontSize: "15",
                  row: "1",
                  col: "0",
                  text: _vm.tutorial.data
                },
                on: {
                  tap: function($event) {
                    return _vm.openDate()
                  },
                  textChange: function($event) {
                    return _vm.$set(_vm.tutorial, "data", $event.value)
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            { attrs: { columns: "*", rows: "auto,auto" } },
            [
              _c("Label", {
                attrs: {
                  text: "Hora de início",
                  fontSize: "15",
                  row: "0",
                  col: "0"
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Hora de início",
                  editable: "false",
                  fontSize: "15",
                  row: "1",
                  col: "0",
                  text: _vm.tutorial.horaInicio
                },
                on: {
                  tap: function($event) {
                    return _vm.openTime()
                  },
                  textChange: function($event) {
                    return _vm.$set(_vm.tutorial, "horaInicio", $event.value)
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            { attrs: { columns: "*", rows: "auto,auto" } },
            [
              _c("Label", {
                attrs: { text: "Assunto", fontSize: "15", row: "0", col: "0" }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Assunto",
                  editable: "false",
                  fontSize: "15",
                  row: "1",
                  col: "0",
                  text: _vm.tutorial.assunto
                },
                on: {
                  textChange: function($event) {
                    return _vm.$set(_vm.tutorial, "assunto", $event.value)
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            { attrs: { columns: "*", rows: "auto,auto" } },
            [
              _c("Label", {
                attrs: { text: "Descrição", fontSize: "15", row: "0", col: "0" }
              }),
              _c("TextView", {
                attrs: {
                  hint: "Descrição",
                  fontSize: "15",
                  row: "1",
                  col: "0",
                  text: _vm.tutorial.descricao
                },
                on: {
                  textChange: function($event) {
                    return _vm.$set(_vm.tutorial, "descricao", $event.value)
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            { attrs: { columns: "*", rows: "auto,auto" } },
            [
              _c("Label", {
                attrs: {
                  text: "Unidade Curricular",
                  fontSize: "15",
                  row: "0",
                  col: "0"
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Unidade Curricular",
                  editable: "false",
                  fontSize: "15",
                  row: "1",
                  col: "0",
                  text: _vm.tutorial.unidade_curricular.nome
                },
                on: {
                  textChange: function($event) {
                    return _vm.$set(
                      _vm.tutorial.unidade_curricular,
                      "nome",
                      $event.value
                    )
                  }
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _c(
        "GridLayout",
        {
          attrs: {
            columns: "*,*",
            rows: "auto",
            verticalAlignment: "bottom",
            row: "0",
            col: "0"
          }
        },
        [
          _c("Button", {
            attrs: {
              text: "Ver lista de pedidos",
              width: "45%",
              fontSize: "15",
              col: "0",
              row: "0",
              verticalAlignment: "bottom",
              horizontalAlignment: "left"
            },
            on: { tap: _vm.chooseTutorial }
          }),
          _c("Button", {
            attrs: {
              text: "Editar Pedido",
              width: "45%",
              fontSize: "15",
              col: "1",
              row: "0",
              verticalAlignment: "bottom",
              horizontalAlignment: "right"
            },
            on: { tap: _vm.editTutorial }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/initialPage.vue?vue&type=template&id=df00b6f0&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "StackLayout",
    [
      _c("Label", {
        attrs: {
          text: "Insira o código da aula",
          textAlignment: "center",
          fontSize: "15"
        }
      }),
      _c("TextField", {
        attrs: {
          hint: "Código",
          fontSize: "15",
          keyboardType: "number",
          text: _vm.code
        },
        on: {
          textChange: function($event) {
            _vm.code = $event.value
          }
        }
      }),
      _c("Button", {
        attrs: { text: "Entrar", fontSize: "15" },
        on: { tap: _vm.enter }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/listArchivedTutorials.vue?vue&type=template&id=7bf3352c&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "StackLayout",
    { staticStyle: { horizAlign: "center" } },
    [
      _c(
        "StackLayout",
        { attrs: { width: "85%" } },
        [
          _c("Button", {
            attrs: { text: _vm.filterBtnName },
            on: { tap: _vm.filterTutorials }
          }),
          _c(
            "GridLayout",
            {
              attrs: {
                columns: "*,auto,*,auto",
                rows: "auto,auto,auto",
                visibility: _vm.filterVis
              }
            },
            [
              _c("DropDown", {
                attrs: {
                  items: _vm.choices,
                  col: "0",
                  row: "0",
                  selectedIndex: _vm.selectedIndex
                },
                on: { selectedIndexChanged: _vm.dropDownSelectedIndexChanged }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Data",
                  col: "0",
                  row: "1",
                  visibility: _vm.dateVis,
                  editable: "false",
                  text: _vm.filter["initial_date"]
                },
                on: {
                  tap: function($event) {
                    return _vm.openDate("initial_date")
                  },
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "initial_date", $event.value)
                  }
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Data Inicial",
                  col: "0",
                  row: "1",
                  visibility: _vm.intervalDateVis,
                  editable: "false",
                  text: _vm.filter["initial_date"]
                },
                on: {
                  tap: function($event) {
                    return _vm.openDate("initial_date")
                  },
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "initial_date", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "1" },
                on: {
                  tap: function($event) {
                    return _vm.clear("initial_date")
                  }
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Data Final",
                  col: "2",
                  row: "1",
                  visibility: _vm.intervalDateVis,
                  editable: "false",
                  text: _vm.filter["final_date"]
                },
                on: {
                  tap: function($event) {
                    return _vm.openDate("final_date")
                  },
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "final_date", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: {
                  "text.decode": "&#xf12d;",
                  col: "3",
                  row: "1",
                  visibility: _vm.intervalDateVis
                },
                on: {
                  tap: function($event) {
                    return _vm.clear("final_date")
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            {
              attrs: {
                columns: "*,auto",
                rows: "auto,auto,auto,auto",
                visibility: _vm.filterVis
              }
            },
            [
              _c("TextField", {
                attrs: {
                  hint: "Hora de início",
                  col: "0",
                  row: "0",
                  editable: "false",
                  text: _vm.filter["hour"]
                },
                on: {
                  tap: function($event) {
                    return _vm.openTime()
                  },
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "hour", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "0" },
                on: {
                  tap: function($event) {
                    return _vm.clear("hour")
                  }
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Professor(a)",
                  col: "0",
                  row: "1",
                  text: _vm.filter["teacher"]
                },
                on: {
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "teacher", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "1" },
                on: {
                  tap: function($event) {
                    return _vm.clear("teacher")
                  }
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Assunto",
                  col: "0",
                  row: "2",
                  text: _vm.filter["subject"]
                },
                on: {
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "subject", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "2" },
                on: {
                  tap: function($event) {
                    return _vm.clear("subject")
                  }
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Unidade Curricular",
                  col: "0",
                  row: "3",
                  text: _vm.filter["course_unit"]
                },
                on: {
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "course_unit", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "3" },
                on: {
                  tap: function($event) {
                    return _vm.clear("course_unit")
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            {
              attrs: {
                columns: "*,auto,*,auto",
                rows: "auto",
                visibility: _vm.filterVis
              }
            },
            [
              _c("DropDown", {
                attrs: {
                  items: _vm.request_choices,
                  col: "0",
                  row: "0",
                  hint: "Pedido",
                  selectedIndex: _vm.clearDrop.selected_request
                },
                on: { selectedIndexChanged: _vm.changeRequest }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "0" },
                on: {
                  tap: function($event) {
                    return _vm.clearIndex("request")
                  }
                }
              }),
              _c("DropDown", {
                attrs: {
                  items: _vm.state_choices,
                  col: "2",
                  row: "0",
                  hint: "Estado",
                  selectedIndex: _vm.clearDrop.selected_state
                },
                on: { selectedIndexChanged: _vm.changeState }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "3", row: "0" },
                on: {
                  tap: function($event) {
                    return _vm.clearIndex("state")
                  }
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm.busy
        ? _c("ActivityIndicator", { attrs: { busy: _vm.busy } })
        : _vm._e(),
      _vm.busy
        ? _c("Label", {
            attrs: { text: _vm.busyText, horizontalAlignment: "center" }
          })
        : _vm._e(),
      _c(
        "RadListView",
        {
          ref: "radlist_tutorials",
          staticStyle: { marginTop: "2%" },
          attrs: {
            height: "100%",
            loadOnDemandMode: "Auto",
            loadOnDemandBufferSize: "2",
            pullToRefresh: "true",
            items: _vm.tutorials,
            "+alias": "tutorial"
          },
          on: {
            itemTap: _vm.onTutorialTap,
            loadMoreDataRequested: _vm.onLoadMoreItemsRequested,
            pullToRefreshInitiated: _vm.refreshTable
          }
        },
        [
          _c("v-template", {
            attrs: { name: "header" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var tutorial = ref.tutorial
                  var $index = ref.$index
                  var $even = ref.$even
                  var $odd = ref.$odd
                  return _c(
                    "StackLayout",
                    [
                      _c(
                        "GridLayout",
                        { attrs: { rows: "auto", columns: "*,*,*" } },
                        [
                          _c(
                            "GridLayout",
                            {
                              attrs: {
                                rows: "auto",
                                columns: "auto,auto",
                                row: "0",
                                col: "0",
                                horizontalAlignment: "center"
                              }
                            },
                            [
                              _c("Label", {
                                staticClass: "header",
                                attrs: {
                                  text: "Data/Hora",
                                  fontSize: "15",
                                  row: "0",
                                  col: "0"
                                },
                                on: { tap: _vm.changeSortingDate }
                              }),
                              _vm.filter["dateSorting"] == "desc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/desc.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _vm.filter["dateSorting"] == "asc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/asc.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _c("Image", {
                                    attrs: {
                                      src: "~/others/no_sorting.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                            ],
                            1
                          ),
                          _c(
                            "GridLayout",
                            {
                              attrs: {
                                rows: "auto",
                                columns: "auto,auto",
                                row: "0",
                                col: "1",
                                horizontalAlignment: "center"
                              }
                            },
                            [
                              _c("Label", {
                                staticClass: "header",
                                attrs: {
                                  text: "Professor(a)",
                                  fontSize: "15",
                                  row: "0",
                                  col: "0"
                                },
                                on: { tap: _vm.changeSortingTeacher }
                              }),
                              _vm.filter["teacherSorting"] == "desc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/desc.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _vm.filter["teacherSorting"] == "asc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/asc.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _c("Image", {
                                    attrs: {
                                      src: "~/others/no_sorting.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                            ],
                            1
                          ),
                          _c(
                            "GridLayout",
                            {
                              attrs: {
                                rows: "auto",
                                columns: "auto,auto",
                                row: "0",
                                col: "2",
                                horizontalAlignment: "center"
                              }
                            },
                            [
                              _c("Label", {
                                staticClass: "header",
                                attrs: {
                                  text: "Estado",
                                  fontSize: "15",
                                  row: "0",
                                  col: "0"
                                },
                                on: { tap: _vm.changeSortingState }
                              }),
                              _vm.filter["stateSorting"] == "desc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/desc.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _vm.filter["stateSorting"] == "asc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/asc.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _c("Image", {
                                    attrs: {
                                      src: "~/others/no_sorting.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                }
              }
            ])
          }),
          _c("v-template", {
            attrs: { name: "red", if: "tutorial.estado == 0" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var tutorial = ref.tutorial
                  var $index = ref.$index
                  var $even = ref.$even
                  var $odd = ref.$odd
                  return _c(
                    "StackLayout",
                    [
                      _c(
                        "StackLayout",
                        {
                          class:
                            tutorial.id == _vm.itemSelected ? "selected" : "",
                          attrs: { orientation: "horizontal" }
                        },
                        [
                          _c(
                            "StackLayout",
                            {
                              attrs: { orientation: "vertical", width: "30%" }
                            },
                            [
                              _c("Label", { attrs: { text: tutorial.data } }),
                              _c("Label", {
                                attrs: { text: _vm.getDayWeek(tutorial.data) }
                              }),
                              _c("Label", {
                                attrs: { text: tutorial.horaInicio }
                              })
                            ],
                            1
                          ),
                          _c("Label", {
                            attrs: {
                              text: tutorial.professor.nome,
                              width: "40%"
                            }
                          }),
                          _c("Label", {
                            staticStyle: { color: "red" },
                            attrs: { text: "Não confirmado" }
                          })
                        ],
                        1
                      ),
                      _c("StackLayout", { staticClass: "hr" })
                    ],
                    1
                  )
                }
              }
            ])
          }),
          _c("v-template", {
            attrs: { name: "green", if: "tutorial.estado == 1" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var tutorial = ref.tutorial
                  var $index = ref.$index
                  var $even = ref.$even
                  var $odd = ref.$odd
                  return _c(
                    "StackLayout",
                    [
                      _c(
                        "StackLayout",
                        {
                          class:
                            tutorial.id == _vm.itemSelected ? "selected" : "",
                          attrs: { orientation: "horizontal" }
                        },
                        [
                          _c(
                            "StackLayout",
                            {
                              attrs: { orientation: "vertical", width: "30%" }
                            },
                            [
                              _c("Label", { attrs: { text: tutorial.data } }),
                              _c("Label", {
                                attrs: { text: _vm.getDayWeek(tutorial.data) }
                              }),
                              _c("Label", {
                                attrs: { text: tutorial.horaInicio }
                              })
                            ],
                            1
                          ),
                          _c("Label", {
                            attrs: {
                              text: tutorial.professor.nome,
                              width: "40%"
                            }
                          }),
                          _c("Label", {
                            staticStyle: { color: "green" },
                            attrs: { text: "Confirmado" }
                          })
                        ],
                        1
                      ),
                      _c("StackLayout", { staticClass: "hr" })
                    ],
                    1
                  )
                }
              }
            ])
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/listTutorials.vue?vue&type=template&id=017c85a8&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "StackLayout",
    { staticStyle: { horizAlign: "center" } },
    [
      _c(
        "StackLayout",
        { attrs: { width: "85%" } },
        [
          _c("Button", {
            attrs: { text: _vm.filterBtnName },
            on: { tap: _vm.filterTutorials }
          }),
          _c(
            "GridLayout",
            {
              attrs: {
                columns: "*,auto,*,auto",
                rows: "auto,auto,auto",
                visibility: _vm.filterVis
              }
            },
            [
              _c("DropDown", {
                attrs: {
                  items: _vm.choices,
                  col: "0",
                  row: "0",
                  selectedIndex: _vm.selectedIndex
                },
                on: { selectedIndexChanged: _vm.dropDownSelectedIndexChanged }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Data",
                  col: "0",
                  row: "1",
                  visibility: _vm.dateVis,
                  editable: "false",
                  text: _vm.filter["initial_date"]
                },
                on: {
                  tap: function($event) {
                    return _vm.openDate("initial_date")
                  },
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "initial_date", $event.value)
                  }
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Data Inicial",
                  col: "0",
                  row: "1",
                  visibility: _vm.intervalDateVis,
                  editable: "false",
                  text: _vm.filter["initial_date"]
                },
                on: {
                  tap: function($event) {
                    return _vm.openDate("initial_date")
                  },
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "initial_date", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "1" },
                on: {
                  tap: function($event) {
                    return _vm.clear("initial_date")
                  }
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Data Final",
                  col: "2",
                  row: "1",
                  visibility: _vm.intervalDateVis,
                  editable: "false",
                  text: _vm.filter["final_date"]
                },
                on: {
                  tap: function($event) {
                    return _vm.openDate("final_date")
                  },
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "final_date", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: {
                  "text.decode": "&#xf12d;",
                  col: "3",
                  row: "1",
                  visibility: _vm.intervalDateVis
                },
                on: {
                  tap: function($event) {
                    return _vm.clear("final_date")
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            {
              attrs: {
                columns: "*,auto",
                rows: "auto,auto,auto,auto",
                visibility: _vm.filterVis
              }
            },
            [
              _c("TextField", {
                attrs: {
                  hint: "Hora de início",
                  col: "0",
                  row: "0",
                  editable: "false",
                  text: _vm.filter["hour"]
                },
                on: {
                  tap: function($event) {
                    return _vm.openTime()
                  },
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "hour", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "0" },
                on: {
                  tap: function($event) {
                    return _vm.clear("hour")
                  }
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Professor(a)",
                  col: "0",
                  row: "1",
                  text: _vm.filter["teacher"]
                },
                on: {
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "teacher", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "1" },
                on: {
                  tap: function($event) {
                    return _vm.clear("teacher")
                  }
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Assunto",
                  col: "0",
                  row: "2",
                  text: _vm.filter["subject"]
                },
                on: {
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "subject", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "2" },
                on: {
                  tap: function($event) {
                    return _vm.clear("subject")
                  }
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Unidade Curricular",
                  col: "0",
                  row: "3",
                  text: _vm.filter["course_unit"]
                },
                on: {
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "course_unit", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "3" },
                on: {
                  tap: function($event) {
                    return _vm.clear("course_unit")
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            {
              attrs: {
                columns: "*,auto,*,auto",
                rows: "auto",
                visibility: _vm.filterVis
              }
            },
            [
              _c("DropDown", {
                attrs: {
                  items: _vm.request_choices,
                  col: "0",
                  row: "0",
                  hint: "Pedido",
                  selectedIndex: _vm.clearDrop.selected_request
                },
                on: { selectedIndexChanged: _vm.changeRequest }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "0" },
                on: {
                  tap: function($event) {
                    return _vm.clearIndex("request")
                  }
                }
              }),
              _c("DropDown", {
                attrs: {
                  items: _vm.state_choices,
                  col: "2",
                  row: "0",
                  hint: "Estado",
                  selectedIndex: _vm.clearDrop.selected_state
                },
                on: { selectedIndexChanged: _vm.changeState }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "3", row: "0" },
                on: {
                  tap: function($event) {
                    return _vm.clearIndex("state")
                  }
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm.busy
        ? _c("ActivityIndicator", { attrs: { busy: _vm.busy } })
        : _vm._e(),
      _vm.busy
        ? _c("Label", {
            attrs: { text: _vm.busyText, horizontalAlignment: "center" }
          })
        : _vm._e(),
      _c(
        "RadListView",
        {
          ref: "radlist_tutorials",
          staticStyle: { marginTop: "2%" },
          attrs: {
            height: "100%",
            loadOnDemandMode: "Auto",
            loadOnDemandBufferSize: "2",
            pullToRefresh: "true",
            items: _vm.tutorials,
            "+alias": "tutorial"
          },
          on: {
            itemTap: _vm.onTutorialTap,
            loadMoreDataRequested: _vm.onLoadMoreItemsRequested,
            pullToRefreshInitiated: _vm.refreshTable
          }
        },
        [
          _c("v-template", {
            attrs: { name: "header" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var tutorial = ref.tutorial
                  var $index = ref.$index
                  var $even = ref.$even
                  var $odd = ref.$odd
                  return _c(
                    "StackLayout",
                    [
                      _c(
                        "GridLayout",
                        { attrs: { rows: "auto", columns: "*,*,*" } },
                        [
                          _c(
                            "GridLayout",
                            {
                              attrs: {
                                rows: "auto",
                                columns: "auto,auto",
                                row: "0",
                                col: "0",
                                horizontalAlignment: "center"
                              }
                            },
                            [
                              _c("Label", {
                                staticClass: "header",
                                attrs: {
                                  text: "Data/Hora",
                                  fontSize: "15",
                                  row: "0",
                                  col: "0"
                                },
                                on: { tap: _vm.changeSortingDate }
                              }),
                              _vm.filter["dateSorting"] == "desc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/desc.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _vm.filter["dateSorting"] == "asc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/asc.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _c("Image", {
                                    attrs: {
                                      src: "~/others/no_sorting.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                            ],
                            1
                          ),
                          _c(
                            "GridLayout",
                            {
                              attrs: {
                                rows: "auto",
                                columns: "auto,auto",
                                row: "0",
                                col: "1",
                                horizontalAlignment: "center"
                              }
                            },
                            [
                              _c("Label", {
                                staticClass: "header",
                                attrs: {
                                  text: "Professor(a)",
                                  fontSize: "15",
                                  row: "0",
                                  col: "0"
                                },
                                on: { tap: _vm.changeSortingTeacher }
                              }),
                              _vm.filter["teacherSorting"] == "desc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/desc.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _vm.filter["teacherSorting"] == "asc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/asc.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _c("Image", {
                                    attrs: {
                                      src: "~/others/no_sorting.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                            ],
                            1
                          ),
                          _c(
                            "GridLayout",
                            {
                              attrs: {
                                rows: "auto",
                                columns: "auto,auto",
                                row: "0",
                                col: "2",
                                horizontalAlignment: "center"
                              }
                            },
                            [
                              _c("Label", {
                                staticClass: "header",
                                attrs: {
                                  text: "Estado",
                                  fontSize: "15",
                                  row: "0",
                                  col: "0"
                                },
                                on: { tap: _vm.changeSortingState }
                              }),
                              _vm.filter["stateSorting"] == "desc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/desc.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _vm.filter["stateSorting"] == "asc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/asc.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _c("Image", {
                                    attrs: {
                                      src: "~/others/no_sorting.png",
                                      width: "8%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                }
              }
            ])
          }),
          _c("v-template", {
            attrs: { name: "red", if: "tutorial.estado == 0" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var tutorial = ref.tutorial
                  var $index = ref.$index
                  var $even = ref.$even
                  var $odd = ref.$odd
                  return _c(
                    "StackLayout",
                    [
                      _c(
                        "StackLayout",
                        {
                          class:
                            tutorial.id == _vm.itemSelected ? "selected" : "",
                          attrs: { orientation: "horizontal" }
                        },
                        [
                          _c(
                            "StackLayout",
                            {
                              attrs: { orientation: "vertical", width: "30%" }
                            },
                            [
                              _c("Label", { attrs: { text: tutorial.data } }),
                              _c("Label", {
                                attrs: { text: _vm.getDayWeek(tutorial.data) }
                              }),
                              _c("Label", {
                                attrs: { text: tutorial.horaInicio }
                              })
                            ],
                            1
                          ),
                          _c("Label", {
                            attrs: {
                              text: tutorial.professor.nome,
                              width: "40%"
                            }
                          }),
                          _c("Label", {
                            staticStyle: { color: "red" },
                            attrs: { text: "Não confirmado" }
                          })
                        ],
                        1
                      ),
                      _c("StackLayout", { staticClass: "hr" })
                    ],
                    1
                  )
                }
              }
            ])
          }),
          _c("v-template", {
            attrs: { name: "green", if: "tutorial.estado == 1" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var tutorial = ref.tutorial
                  var $index = ref.$index
                  var $even = ref.$even
                  var $odd = ref.$odd
                  return _c(
                    "StackLayout",
                    [
                      _c(
                        "StackLayout",
                        {
                          class:
                            tutorial.id == _vm.itemSelected ? "selected" : "",
                          attrs: { orientation: "horizontal" }
                        },
                        [
                          _c(
                            "StackLayout",
                            {
                              attrs: { orientation: "vertical", width: "30%" }
                            },
                            [
                              _c("Label", { attrs: { text: tutorial.data } }),
                              _c("Label", {
                                attrs: { text: _vm.getDayWeek(tutorial.data) }
                              }),
                              _c("Label", {
                                attrs: { text: tutorial.horaInicio }
                              })
                            ],
                            1
                          ),
                          _c("Label", {
                            attrs: {
                              text: tutorial.professor.nome,
                              width: "40%"
                            }
                          }),
                          _c("Label", {
                            staticStyle: { color: "green" },
                            attrs: { text: "Confirmado" }
                          })
                        ],
                        1
                      ),
                      _c("StackLayout", { staticClass: "hr" })
                    ],
                    1
                  )
                }
              }
            ])
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/loginPage.vue?vue&type=template&id=600202ed&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    { attrs: { actionBarHidden: "true" } },
    [
      _c(
        "GridLayout",
        {
          attrs: {
            rows: "*",
            columns: "*",
            height: "100%",
            width: "100%",
            horizontalAlignment: "center",
            verticalAlignment: "center"
          }
        },
        [
          _c(
            "StackLayout",
            {
              attrs: {
                row: "0",
                col: "0",
                width: "75%",
                verticalAlignment: "center",
                horizontalAlignment: "center"
              }
            },
            [
              _c("Image", {
                staticClass: "title",
                attrs: {
                  src: "~/others/icon.png",
                  strech: "none",
                  width: "90%"
                }
              }),
              _c("TextField", {
                staticClass: "item",
                attrs: {
                  hint: "Número de estudante",
                  fontSize: "15",
                  keyboardType: "number",
                  text: _vm.number
                },
                on: {
                  textChange: function($event) {
                    _vm.number = $event.value
                  }
                }
              }),
              _c("TextField", {
                staticClass: "item",
                attrs: {
                  hint: "Senha",
                  secure: "true",
                  fontSize: "15",
                  text: _vm.password
                },
                on: {
                  textChange: function($event) {
                    _vm.password = $event.value
                  }
                }
              }),
              _c("check-box", {
                staticClass: "item",
                attrs: {
                  text: "Manter sessão iniciada",
                  checked: _vm.isChecked
                },
                on: {
                  checkedChange: function($event) {
                    _vm.isChecked = $event.value
                  }
                }
              }),
              _c("Button", {
                attrs: { text: "Iniciar sessão", fontSize: "15" },
                on: { tap: _vm.login }
              })
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/mainPage.vue?vue&type=template&id=6ff81823&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    { attrs: { actionBarHidden: "true" } },
    [
      _c(
        "RadSideDrawer",
        {
          ref: "drawer",
          attrs: { drawerLocation: "Left", gesturesEnabled: "true" }
        },
        [
          _c(
            "StackLayout",
            {
              directives: [
                {
                  name: "view",
                  rawName: "v-view:drawerContent",
                  arg: "drawerContent",
                  modifiers: {}
                }
              ]
            },
            [
              _c(
                "StackLayout",
                { staticClass: "nt-drawer__header" },
                [
                  _c("Image", {
                    staticClass: "nt-drawer__header-image fas t-36",
                    staticStyle: { color: "white" },
                    attrs: { "src.decode": "font://&#xf2bd;" }
                  }),
                  _c("Label", {
                    staticClass: "header-elem",
                    attrs: { text: _vm.name }
                  }),
                  _c("Label", {
                    staticClass: "header-elem",
                    attrs: { text: _vm.email }
                  })
                ],
                1
              ),
              _c(
                "ScrollView",
                { staticClass: "nt-drawer__body" },
                [
                  _c(
                    "StackLayout",
                    [
                      _c(
                        "GridLayout",
                        {
                          staticClass: "nt-drawer__list-item",
                          attrs: {
                            columns: "auto,*",
                            backgroundColor:
                              _vm.selectedPage === "initialPage"
                                ? "#e0f5ff"
                                : "white",
                            color:
                              _vm.selectedPage === "initialPage"
                                ? "#0088c9"
                                : "black"
                          },
                          on: {
                            tap: function($event) {
                              return _vm.onNavigationItemTap(
                                "initialPage",
                                "Página inicial"
                              )
                            }
                          }
                        },
                        [
                          _c("Label", {
                            staticClass: "nt-icon fas",
                            attrs: { "text.decode": "&#xf015;", col: "0" }
                          }),
                          _c("Label", {
                            attrs: { text: "Página inicial", col: "1" }
                          })
                        ],
                        1
                      ),
                      _c(
                        "GridLayout",
                        {
                          class: "nt-drawer__list-item",
                          attrs: {
                            columns: "auto,*",
                            backgroundColor:
                              _vm.selectedPage === "previousClassesPage" ||
                              _vm.selectedPage === "previousClassificationsPage"
                                ? "#e0f5ff"
                                : "white",
                            color:
                              _vm.selectedPage === "previousClassesPage" ||
                              _vm.selectedPage === "previousClassificationsPage"
                                ? "#0088c9"
                                : "black"
                          },
                          on: {
                            tap: function($event) {
                              return _vm.onNavigationItemTap(
                                "previousClassesPage",
                                "Aulas anteriores"
                              )
                            }
                          }
                        },
                        [
                          _c("Label", {
                            staticClass: "nt-icon fas",
                            attrs: { "text.decode": "&#xf1da;", col: "0" }
                          }),
                          _c("Label", {
                            attrs: { text: "Aulas anteriores", col: "1" }
                          })
                        ],
                        1
                      ),
                      _c(
                        "GridLayout",
                        {
                          staticClass: "nt-drawer__list-item",
                          attrs: {
                            columns: "auto,*",
                            backgroundColor:
                              _vm.selectedPage === "scheduleTutoring" ||
                              _vm.selectedPage === "registerTutoring"
                                ? "#e0f5ff"
                                : "white",
                            color:
                              _vm.selectedPage === "scheduleTutoring" ||
                              _vm.selectedPage === "registerTutoring"
                                ? "#0088c9"
                                : "black"
                          },
                          on: {
                            tap: function($event) {
                              return _vm.onNavigationItemTap(
                                "scheduleTutoring",
                                "Marcar tutoria"
                              )
                            }
                          }
                        },
                        [
                          _c("Label", {
                            staticClass: "nt-icon fas",
                            attrs: { "text.decode": "&#xf271;", col: "0" }
                          }),
                          _c("Label", {
                            attrs: { text: "Marcar tutoria", col: "1" }
                          })
                        ],
                        1
                      ),
                      _c(
                        "GridLayout",
                        {
                          staticClass: "nt-drawer__list-item",
                          attrs: {
                            columns: "auto,*",
                            backgroundColor:
                              _vm.selectedPage === "listTutorials" ||
                              _vm.selectedPage === "editTutorial"
                                ? "#e0f5ff"
                                : "white",
                            color:
                              _vm.selectedPage === "listTutorials" ||
                              _vm.selectedPage === "editTutorial"
                                ? "#0088c9"
                                : "black"
                          },
                          on: {
                            tap: function($event) {
                              return _vm.onNavigationItemTap(
                                "listTutorials",
                                "Pedidos de tutoria"
                              )
                            }
                          }
                        },
                        [
                          _c("Label", {
                            staticClass: "nt-icon fas",
                            attrs: { "text.decode": "&#xf0ca;", col: "0" }
                          }),
                          _c("Label", {
                            attrs: { text: "Pedidos de tutoria", col: "1" }
                          })
                        ],
                        1
                      ),
                      _c(
                        "GridLayout",
                        {
                          staticClass: "nt-drawer__list-item",
                          attrs: {
                            columns: "auto,*",
                            backgroundColor:
                              _vm.selectedPage === "listArchivedTutorials"
                                ? "#e0f5ff"
                                : "white",
                            color:
                              _vm.selectedPage === "listArchivedTutorials"
                                ? "#0088c9"
                                : "black"
                          },
                          on: {
                            tap: function($event) {
                              return _vm.onNavigationItemTap(
                                "listArchivedTutorials",
                                "Pedidos de tutoria arquivados"
                              )
                            }
                          }
                        },
                        [
                          _c("Label", {
                            staticClass: "nt-icon fas",
                            attrs: { "text.decode": "&#xf187;", col: "0" }
                          }),
                          _c("Label", {
                            attrs: {
                              text: "Pedidos de tutoria arquivados",
                              col: "1"
                            }
                          })
                        ],
                        1
                      ),
                      _c("StackLayout", { staticClass: "hr" }),
                      _c(
                        "GridLayout",
                        {
                          staticClass: "nt-drawer__list-item",
                          attrs: { columns: "auto,*" },
                          on: { tap: _vm.logout }
                        },
                        [
                          _c("Label", {
                            staticClass: "nt-icon fas",
                            attrs: { "text.decode": "&#xf2f5;", col: "0" }
                          }),
                          _c("Label", {
                            attrs: { text: "Terminar sessão", col: "1" }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _c(
            "Frame",
            {
              directives: [
                {
                  name: "view",
                  rawName: "v-view:mainContent",
                  arg: "mainContent",
                  modifiers: {}
                }
              ]
            },
            [
              _c(
                "Page",
                [
                  _c(
                    "ActionBar",
                    {
                      staticStyle: { color: "white" },
                      attrs: { title: _vm.title }
                    },
                    [
                      this.$store.state.isAndroid
                        ? _c(
                            "android",
                            [
                              _c("NavigationButton", {
                                attrs: { icon: "res://menu" },
                                on: { tap: _vm.openMenu }
                              }),
                              _c(
                                "ActionItem",
                                [
                                  _vm.selectedPage ==
                                  "previousClassificationsPage"
                                    ? _c(
                                        "FlexboxLayout",
                                        { attrs: { alignContent: "flex-end" } },
                                        [
                                          _c("Image", {
                                            staticStyle: { marginRight: "3%" },
                                            attrs: {
                                              height: "55%",
                                              src:
                                                "~/others/info-icon-white.png",
                                              strech: "none"
                                            },
                                            on: { tap: _vm.seeClassInfo }
                                          })
                                        ],
                                        1
                                      )
                                    : _vm._e()
                                ],
                                1
                              )
                            ],
                            1
                          )
                        : _c(
                            "ios",
                            [
                              _c("ActionItem", {
                                attrs: {
                                  icon: "res://menu",
                                  "ios.position": "left"
                                },
                                on: { tap: _vm.openMenu }
                              }),
                              _c("ActionItem", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value:
                                      _vm.selectedPage ==
                                      "previousClassificationsPage",
                                    expression:
                                      "selectedPage=='previousClassificationsPage'"
                                  }
                                ],
                                attrs: {
                                  icon: "res://info",
                                  "ios.position": "right"
                                },
                                on: { tap: _vm.seeClassInfo }
                              })
                            ],
                            1
                          )
                    ],
                    1
                  ),
                  _vm.selectedPage == "initialPage"
                    ? _c(
                        "StackLayout",
                        { staticClass: "center-item" },
                        [_c("initial-page", { on: { class: _vm.enterClass } })],
                        1
                      )
                    : _vm.selectedPage == "previousClassesPage"
                    ? _c(
                        "StackLayout",
                        [
                          _c("previous-classes-page", {
                            attrs: { itemSelected: _vm.itemSelectedClass },
                            on: {
                              seeClassifications: _vm.enterClassificationsPage,
                              back: _vm.goingBack
                            }
                          })
                        ],
                        1
                      )
                    : _vm.selectedPage == "scheduleTutoring"
                    ? _c(
                        "StackLayout",
                        [
                          _c("schedule-tutoring", {
                            on: {
                              registerTutoring: _vm.enterRegisterTutoring,
                              back: _vm.goingBack
                            }
                          })
                        ],
                        1
                      )
                    : _vm.selectedPage == "registerTutoring"
                    ? _c(
                        "StackLayout",
                        [
                          _c("register-tutoring", {
                            attrs: {
                              teacher_id: _vm.teacher,
                              course_units: _vm.units,
                              teacher_name: _vm.tName
                            },
                            on: { backTeachers: _vm.seeTeachers }
                          })
                        ],
                        1
                      )
                    : _vm.selectedPage == "listTutorials"
                    ? _c(
                        "StackLayout",
                        [
                          _c("list-tutorials", {
                            attrs: { itemSelected: _vm.itemSelectedTutorial },
                            on: {
                              editTutorial: _vm.enterEditTutorial,
                              back: _vm.goingBack
                            }
                          })
                        ],
                        1
                      )
                    : _vm.selectedPage == "editTutorial"
                    ? _c(
                        "StackLayout",
                        [
                          _c("edit-tutorial", {
                            attrs: { tutorial: _vm.tutorialEdit },
                            on: { backListTutorials: _vm.seeListTutorials }
                          })
                        ],
                        1
                      )
                    : _vm.selectedPage == "listArchivedTutorials"
                    ? _c(
                        "StackLayout",
                        [
                          _c("list-archived-tutorials", {
                            on: { back: _vm.goingBack }
                          })
                        ],
                        1
                      )
                    : _vm.selectedPage == "previousClassificationsPage"
                    ? _c(
                        "StackLayout",
                        [
                          _c("previous-classifications-page", {
                            attrs: { classSelected: _vm.classSelected },
                            on: { back: _vm.goingBackClasses }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/previousClassesPage.vue?vue&type=template&id=1bc4f31a&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "StackLayout",
    { staticStyle: { horizAlign: "center" } },
    [
      _c(
        "StackLayout",
        { attrs: { width: "85%" } },
        [
          _c("Button", {
            attrs: { text: _vm.filterBtnName },
            on: { tap: _vm.filterClasses }
          }),
          _c(
            "GridLayout",
            {
              attrs: {
                columns: "*,auto,*,auto",
                rows: "auto,auto,auto",
                visibility: _vm.filterVis
              }
            },
            [
              _c("DropDown", {
                attrs: {
                  items: _vm.choices,
                  col: "0",
                  row: "0",
                  selectedIndex: _vm.selectedIndex
                },
                on: { selectedIndexChanged: _vm.dropDownSelectedIndexChanged }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Data",
                  col: "0",
                  row: "1",
                  visibility: _vm.dateVis,
                  editable: "false",
                  text: _vm.filter["initial_date"]
                },
                on: {
                  tap: function($event) {
                    return _vm.openDate("initial_date")
                  },
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "initial_date", $event.value)
                  }
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Data Inicial",
                  col: "0",
                  row: "1",
                  visibility: _vm.intervalDateVis,
                  editable: "false",
                  text: _vm.filter["initial_date"]
                },
                on: {
                  tap: function($event) {
                    return _vm.openDate("initial_date")
                  },
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "initial_date", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "1" },
                on: {
                  tap: function($event) {
                    return _vm.clear("initial_date")
                  }
                }
              }),
              _c("TextField", {
                attrs: {
                  hint: "Data Final",
                  col: "2",
                  row: "1",
                  visibility: _vm.intervalDateVis,
                  editable: "false",
                  text: _vm.filter["final_date"]
                },
                on: {
                  tap: function($event) {
                    return _vm.openDate("final_date")
                  },
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "final_date", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: {
                  "text.decode": "&#xf12d;",
                  col: "3",
                  row: "1",
                  visibility: _vm.intervalDateVis
                },
                on: {
                  tap: function($event) {
                    return _vm.clear("final_date")
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            {
              attrs: {
                columns: "*,auto",
                rows: "auto",
                visibility: _vm.filterVis
              }
            },
            [
              _c("TextField", {
                attrs: {
                  hint: "Unidade Curricular",
                  col: "0",
                  row: "0",
                  text: _vm.filter["course_unit"]
                },
                on: {
                  textChange: function($event) {
                    return _vm.$set(_vm.filter, "course_unit", $event.value)
                  }
                }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "0" },
                on: {
                  tap: function($event) {
                    return _vm.clear("course_unit")
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            {
              attrs: {
                columns: "*,auto,*,auto",
                rows: "auto,auto",
                visibility: _vm.filterVis
              }
            },
            [
              _c("DropDown", {
                attrs: {
                  items: _vm.school_year_list,
                  col: "0",
                  row: "0",
                  hint: "Ano Letivo",
                  selectedIndex: _vm.clearDrop.selected_school_year
                },
                on: { selectedIndexChanged: _vm.changeShoolYear }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "0" },
                on: {
                  tap: function($event) {
                    return _vm.clearIndex("school_year")
                  }
                }
              }),
              _c("DropDown", {
                attrs: {
                  items: _vm.semester_list,
                  col: "2",
                  row: "0",
                  hint: "Semestre",
                  selectedIndex: _vm.clearDrop.selected_semester
                },
                on: { selectedIndexChanged: _vm.changeSemester }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "3", row: "0" },
                on: {
                  tap: function($event) {
                    return _vm.clearIndex("semester")
                  }
                }
              }),
              _c("DropDown", {
                attrs: {
                  items: _vm.course_year_list,
                  col: "0",
                  row: "1",
                  hint: "Ano do Curso",
                  selectedIndex: _vm.clearDrop.selected_course_year
                },
                on: { selectedIndexChanged: _vm.changeCourseYear }
              }),
              _c("Label", {
                staticClass: "nt-icon fas",
                staticStyle: { verticalAlign: "bottom" },
                attrs: { "text.decode": "&#xf12d;", col: "1", row: "1" },
                on: {
                  tap: function($event) {
                    return _vm.clearIndex("course_year")
                  }
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm.busy
        ? _c("ActivityIndicator", { attrs: { busy: _vm.busy } })
        : _vm._e(),
      _vm.busy
        ? _c("Label", {
            attrs: { text: _vm.busyText, horizontalAlignment: "center" }
          })
        : _vm._e(),
      _c(
        "RadListView",
        {
          ref: "list_classes",
          staticClass: "list",
          attrs: {
            height: "100%",
            loadOnDemandMode: "Auto",
            loadOnDemandBufferSize: "2",
            pullToRefresh: "true",
            items: _vm.classes,
            "+alias": "item"
          },
          on: {
            itemTap: _vm.onClassTap,
            loadMoreDataRequested: _vm.onLoadMoreItemsRequested,
            pullToRefreshInitiated: _vm.refreshTable
          }
        },
        [
          _c("v-template", {
            attrs: { name: "header" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var item = ref.item
                  var $index = ref.$index
                  var $even = ref.$even
                  var $odd = ref.$odd
                  return _c(
                    "StackLayout",
                    [
                      _c(
                        "GridLayout",
                        { attrs: { rows: "auto", columns: "*,2*" } },
                        [
                          _c(
                            "GridLayout",
                            {
                              staticStyle: { marginLeft: "5%" },
                              attrs: {
                                rows: "auto",
                                columns: "auto,auto",
                                row: "0",
                                col: "0"
                              }
                            },
                            [
                              _c("Label", {
                                staticClass: "header",
                                attrs: {
                                  text: "Data",
                                  fontSize: "15",
                                  row: "0",
                                  col: "0"
                                },
                                on: { tap: _vm.changeSortingDate }
                              }),
                              _vm.filter["dateSorting"] == "desc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/desc.png",
                                      width: "9%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _vm.filter["dateSorting"] == "asc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/asc.png",
                                      width: "9%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _c("Image", {
                                    attrs: {
                                      src: "~/others/no_sorting.png",
                                      width: "9%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                            ],
                            1
                          ),
                          _c(
                            "GridLayout",
                            {
                              attrs: {
                                rows: "auto",
                                columns: "auto,auto",
                                row: "0",
                                col: "1"
                              }
                            },
                            [
                              _c("Label", {
                                staticClass: "header",
                                attrs: {
                                  text: "Unidade Curricular",
                                  fontSize: "15",
                                  row: "0",
                                  col: "0"
                                },
                                on: { tap: _vm.changeSortingUnit }
                              }),
                              _vm.filter["unitSorting"] == "desc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/desc.png",
                                      width: "4%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _vm.filter["unitSorting"] == "asc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/asc.png",
                                      width: "4%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _c("Image", {
                                    attrs: {
                                      src: "~/others/no_sorting.png",
                                      width: "4%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                }
              }
            ])
          }),
          _c("v-template", {
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var item = ref.item
                  var $index = ref.$index
                  var $even = ref.$even
                  var $odd = ref.$odd
                  return _c(
                    "StackLayout",
                    [
                      _c(
                        "StackLayout",
                        {
                          class: item.id == _vm.itemSelected ? "selected" : "",
                          attrs: { orientation: "horizontal" }
                        },
                        [
                          _c("Label", {
                            attrs: { text: _vm.convertDate(item.data) }
                          }),
                          _c("Label", {
                            attrs: { text: item.unidade_curricular }
                          })
                        ],
                        1
                      ),
                      _c("StackLayout", { staticClass: "hr" })
                    ],
                    1
                  )
                }
              }
            ])
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/previousClassificationsPage.vue?vue&type=template&id=a506cacc&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "StackLayout",
    { staticStyle: { horizAlign: "center" } },
    [
      _vm.busy
        ? _c("ActivityIndicator", { attrs: { busy: _vm.busy } })
        : _vm._e(),
      _vm.busy
        ? _c("Label", {
            attrs: { text: _vm.busyText, horizontalAlignment: "center" }
          })
        : _vm._e(),
      _c(
        "RadListView",
        {
          ref: "list_classifications",
          staticClass: "list",
          attrs: {
            height: "85%",
            loadOnDemandMode: "Auto",
            loadOnDemandBufferSize: "2",
            pullToRefresh: "true",
            items: _vm.classifications,
            "+alias": "classification"
          },
          on: {
            itemTap: _vm.onClassificationTap,
            loadMoreDataRequested: _vm.onLoadMoreItemsRequested,
            pullToRefreshInitiated: _vm.refreshTable
          }
        },
        [
          _c("v-template", {
            attrs: { name: "header" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var classification = ref.classification
                  var $index = ref.$index
                  var $even = ref.$even
                  var $odd = ref.$odd
                  return _c(
                    "StackLayout",
                    [
                      _c(
                        "GridLayout",
                        { attrs: { rows: "auto", columns: "*,*" } },
                        [
                          _c(
                            "GridLayout",
                            {
                              attrs: {
                                rows: "auto",
                                columns: "auto,auto",
                                row: "0",
                                col: "0",
                                horizontalAlignment: "center"
                              }
                            },
                            [
                              _c("Label", {
                                staticClass: "header",
                                attrs: {
                                  text: "Conteúdo",
                                  fontSize: "15",
                                  row: "0",
                                  col: "0"
                                },
                                on: { tap: _vm.changeSortingContent }
                              }),
                              _vm.sortingClassifications["contentSorting"] ==
                              "desc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/desc.png",
                                      width: "5%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _vm.sortingClassifications[
                                    "contentSorting"
                                  ] == "asc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/asc.png",
                                      width: "5%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _c("Image", {
                                    attrs: {
                                      src: "~/others/no_sorting.png",
                                      width: "5%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                            ],
                            1
                          ),
                          _c(
                            "GridLayout",
                            {
                              attrs: {
                                rows: "auto",
                                columns: "auto,auto",
                                row: "0",
                                col: "1",
                                horizontalAlignment: "center"
                              }
                            },
                            [
                              _c("Label", {
                                staticClass: "header",
                                attrs: {
                                  text: "Classificação",
                                  fontSize: "15",
                                  row: "0",
                                  col: "0"
                                },
                                on: { tap: _vm.changeSortingClassification }
                              }),
                              _vm.sortingClassifications[
                                "classificationSorting"
                              ] == "desc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/desc.png",
                                      width: "5%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _vm.sortingClassifications[
                                    "classificationSorting"
                                  ] == "asc"
                                ? _c("Image", {
                                    attrs: {
                                      src: "~/others/asc.png",
                                      width: "5%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                                : _c("Image", {
                                    attrs: {
                                      src: "~/others/no_sorting.png",
                                      width: "5%",
                                      row: "0",
                                      col: "1"
                                    }
                                  })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                }
              }
            ])
          }),
          _c("v-template", {
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var classification = ref.classification
                  var $index = ref.$index
                  var $even = ref.$even
                  var $odd = ref.$odd
                  return _c(
                    "StackLayout",
                    [
                      _c(
                        "StackLayout",
                        {
                          class:
                            classification.id == _vm.itemSelected
                              ? "selected"
                              : "",
                          attrs: { orientation: "horizontal" }
                        },
                        [
                          _c("Label", {
                            attrs: {
                              text: classification.conteudo,
                              width: "75%"
                            }
                          }),
                          _c("Label", {
                            attrs: {
                              text:
                                classification.valor == null
                                  ? "N/D"
                                  : classification.valor
                            }
                          })
                        ],
                        1
                      ),
                      _c("StackLayout", { staticClass: "hr" })
                    ],
                    1
                  )
                }
              }
            ])
          })
        ],
        1
      ),
      _c("Button", {
        attrs: {
          text: "Ver lista de aulas",
          width: "50%",
          fontSize: "15",
          verticalAlignment: "bottom",
          horizontalAlignment: "center"
        },
        on: { tap: _vm.chooseClass }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/registerTutoring.vue?vue&type=template&id=3f471e6a&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "GridLayout",
    {
      attrs: {
        rows: "*",
        columns: "*",
        height: "100%",
        horizontalAlignment: "center",
        verticalAlignment: "center"
      }
    },
    [
      _c(
        "StackLayout",
        {
          attrs: {
            row: "0",
            col: "0",
            width: "90%",
            verticalAlignment: "top",
            horizontalAlignment: "center"
          }
        },
        [
          _c(
            "GridLayout",
            { attrs: { columns: "*", rows: "auto,auto" } },
            [
              _vm.busy
                ? _c("ActivityIndicator", {
                    attrs: { busy: _vm.busy, row: "0", col: "0" }
                  })
                : _vm._e(),
              _vm.busy
                ? _c("Label", {
                    attrs: {
                      text: _vm.busyText,
                      horizontalAlignment: "center",
                      row: "1",
                      col: "0"
                    }
                  })
                : _vm._e()
            ],
            1
          ),
          _c("Label", {
            staticStyle: { color: "red", marginTop: "1%" },
            attrs: { text: "* Campos obrigatórios" }
          }),
          _c(
            "GridLayout",
            {
              staticStyle: { marginTop: "1%" },
              attrs: { columns: "*", rows: "auto,auto" }
            },
            [
              _c("Label", { attrs: { text: "Professor(a)", fontSize: "15" } }),
              _c("TextField", {
                attrs: {
                  editable: "false",
                  fontSize: "15",
                  row: "1",
                  col: "0",
                  text: _vm.teacher_name
                },
                on: {
                  textChange: function($event) {
                    _vm.teacher_name = $event.value
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            { attrs: { columns: "*", rows: "auto,auto" } },
            [
              _c(
                "StackLayout",
                { attrs: { orientation: "horizontal", row: "0", col: "0" } },
                [
                  _c("Label", { attrs: { text: "Data", fontSize: "15" } }),
                  _c("Label", {
                    staticStyle: { color: "red" },
                    attrs: { text: " *", fontSize: "15" }
                  })
                ],
                1
              ),
              _c("TextField", {
                attrs: {
                  hint: "Data",
                  editable: "false",
                  fontSize: "15",
                  row: "1",
                  col: "0",
                  text: _vm.date
                },
                on: {
                  tap: function($event) {
                    return _vm.openDate()
                  },
                  textChange: function($event) {
                    _vm.date = $event.value
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            { attrs: { columns: "*", rows: "auto,auto" } },
            [
              _c(
                "StackLayout",
                { attrs: { orientation: "horizontal", row: "0", col: "0" } },
                [
                  _c("Label", {
                    attrs: { text: "Hora de início", fontSize: "15" }
                  }),
                  _c("Label", {
                    staticStyle: { color: "red" },
                    attrs: { text: " *", fontSize: "15" }
                  })
                ],
                1
              ),
              _c("TextField", {
                attrs: {
                  hint: "Hora de início",
                  editable: "false",
                  fontSize: "15",
                  row: "1",
                  col: "0",
                  text: _vm.hour
                },
                on: {
                  tap: function($event) {
                    return _vm.openTime()
                  },
                  textChange: function($event) {
                    _vm.hour = $event.value
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            { attrs: { columns: "*", rows: "auto,auto" } },
            [
              _c(
                "StackLayout",
                { attrs: { orientation: "horizontal", row: "0", col: "0" } },
                [
                  _c("Label", { attrs: { text: "Assunto", fontSize: "15" } }),
                  _c("Label", {
                    staticStyle: { color: "red" },
                    attrs: { text: " *", fontSize: "15" }
                  })
                ],
                1
              ),
              _c("TextField", {
                attrs: {
                  hint: "Assunto",
                  fontSize: "15",
                  row: "1",
                  col: "0",
                  text: _vm.subject
                },
                on: {
                  textChange: function($event) {
                    _vm.subject = $event.value
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            { attrs: { columns: "*", rows: "auto,auto" } },
            [
              _c("Label", {
                attrs: { text: "Descrição", fontSize: "15", row: "0", col: "0" }
              }),
              _c("TextView", {
                attrs: {
                  hint: "Descrição",
                  fontSize: "15",
                  row: "1",
                  col: "0",
                  text: _vm.description
                },
                on: {
                  textChange: function($event) {
                    _vm.description = $event.value
                  }
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            { attrs: { columns: "*", rows: "auto,auto" } },
            [
              _c(
                "StackLayout",
                { attrs: { orientation: "horizontal", row: "0", col: "0" } },
                [
                  _c("Label", {
                    attrs: { text: "Unidade Curricular", fontSize: "15" }
                  }),
                  _c("Label", {
                    staticStyle: { color: "red" },
                    attrs: { text: " *", fontSize: "15" }
                  })
                ],
                1
              ),
              _c("DropDown", {
                staticStyle: {
                  fontSize: "15px",
                  marginTop: "2%",
                  marginLeft: "5%"
                },
                attrs: {
                  items: _vm.course_units_name,
                  hint: "Unidade Curricular",
                  horizontalAlignment: "left",
                  row: "1",
                  col: "0"
                },
                on: { selectedIndexChanged: _vm.changeUnit }
              })
            ],
            1
          )
        ],
        1
      ),
      _c(
        "GridLayout",
        {
          attrs: {
            columns: "*,*",
            rows: "auto",
            verticalAlignment: "bottom",
            row: "0",
            col: "0"
          }
        },
        [
          _c("Button", {
            attrs: {
              text: "Escolher outro professor",
              width: "45%",
              fontSize: "15",
              col: "0",
              row: "0",
              verticalAlignment: "bottom",
              horizontalAlignment: "left"
            },
            on: { tap: _vm.chooseTeacher }
          }),
          _c("Button", {
            attrs: {
              text: "Marcar Tutoria",
              width: "45%",
              fontSize: "15",
              col: "1",
              row: "0",
              verticalAlignment: "bottom",
              horizontalAlignment: "right"
            },
            on: { tap: _vm.register }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/scheduleTutoring.vue?vue&type=template&id=4037345e&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "StackLayout",
    [
      _c("Label", {
        staticStyle: { marginTop: "5%", marginBottom: "5%" },
        attrs: {
          text: "Selecione o professor(a) com que deseja marcar uma tutoria",
          horizontalAlignment: "center",
          fontSize: "13"
        }
      }),
      _vm.busy
        ? _c("ActivityIndicator", { attrs: { busy: _vm.busy } })
        : _vm._e(),
      _vm.busy
        ? _c("Label", {
            attrs: { text: _vm.busyText, horizontalAlignment: "center" }
          })
        : _vm._e(),
      _c(
        "RadListView",
        {
          ref: "list_teachers",
          attrs: {
            height: "100%",
            loadOnDemandMode: "Auto",
            loadOnDemandBufferSize: "2",
            pullToRefresh: "true",
            items: _vm.teachers,
            "+alias": "teacher"
          },
          on: {
            itemTap: _vm.onTeacherTap,
            loadMoreDataRequested: _vm.onLoadMoreItemsRequested,
            pullToRefreshInitiated: _vm.refreshTable
          }
        },
        [
          _c("v-template", {
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var teacher = ref.teacher
                  var $index = ref.$index
                  var $even = ref.$even
                  var $odd = ref.$odd
                  return _c(
                    "StackLayout",
                    { attrs: { orientation: "vertical" } },
                    [
                      _c("Label", {
                        staticClass: "name",
                        attrs: { text: teacher.professor_nome, fontSize: "15" }
                      }),
                      _vm._l(teacher.ucs, function(uc) {
                        return _c(
                          "StackLayout",
                          { key: uc.id, attrs: { orientation: "vertical" } },
                          [
                            _c("Label", { attrs: { text: uc.nome } }),
                            _c(
                              "StackLayout",
                              { attrs: { orientation: "horizontal" } },
                              [
                                _c("Label", { attrs: { text: uc.anoLetivo } }),
                                _c("Label", {
                                  attrs: { text: uc.semestre + "º Semestre" }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        )
                      }),
                      _c("StackLayout", { staticClass: "hr" })
                    ],
                    2
                  )
                }
              }
            ])
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./ sync ^\\.\\/app\\.(css|scss|less|sass)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.scss": "./app.scss"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|kt|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.js": "./app.js",
	"./app.scss": "./app.scss"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|kt|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$";

/***/ }),

/***/ "./app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-vue/dist/index.js");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nativescript_ui_sidedrawer_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-ui-sidedrawer/vue/index.js");
/* harmony import */ var nativescript_ui_sidedrawer_vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_sidedrawer_vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nativescript_ui_listview_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/nativescript-ui-listview/vue/index.js");
/* harmony import */ var nativescript_ui_listview_vue__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_listview_vue__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nativescript_local_notifications__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../node_modules/nativescript-local-notifications/local-notifications.js");
/* harmony import */ var nativescript_local_notifications__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nativescript_local_notifications__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tns_core_modules_application__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
/* harmony import */ var tns_core_modules_application__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_application__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../node_modules/@nativescript/core/platform/platform.js");
/* harmony import */ var tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_loginPage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./components/loginPage.vue");
/* harmony import */ var _components_mainPage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./components/mainPage.vue");
/* harmony import */ var _components_initialPage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./components/initialPage.vue");
/* harmony import */ var _components_previousClassesPage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./components/previousClassesPage.vue");
/* harmony import */ var _components_scheduleTutoring__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./components/scheduleTutoring.vue");
/* harmony import */ var _components_registerTutoring__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./components/registerTutoring.vue");
/* harmony import */ var _components_listTutorials__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./components/listTutorials.vue");
/* harmony import */ var _components_editTutorial__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./components/editTutorial.vue");
/* harmony import */ var _components_listArchivedTutorials__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./components/listArchivedTutorials.vue");
/* harmony import */ var _components_previousClassificationsPage__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./components/previousClassificationsPage.vue");

        let applicationCheckPlatform = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
        if (applicationCheckPlatform.android && !global["__snapshot"]) {
            __webpack_require__("../node_modules/@nativescript/core/ui/frame/frame.js");
__webpack_require__("../node_modules/@nativescript/core/ui/frame/activity.js");
        }

        
            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-regular.js")();
            
            
        if (false) {}
        
            const context = __webpack_require__("./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|kt|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$");
            global.registerWebpackModules(context);
            if (false) {}
            
        __webpack_require__("../node_modules/@nativescript/core/bundle-entry-points.js");
        

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(nativescript_ui_sidedrawer_vue__WEBPACK_IMPORTED_MODULE_1___default.a);

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vuex__WEBPACK_IMPORTED_MODULE_2__["default"]);

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(nativescript_ui_listview_vue__WEBPACK_IMPORTED_MODULE_3___default.a);

const httpModule = __webpack_require__("../node_modules/@nativescript/core/http/http.js");

const modalPicker = __webpack_require__("../node_modules/nativescript-modal-datetimepicker/modal-datetimepicker.js").ModalDatetimepicker;

__webpack_require__("../node_modules/nativescript-local-notifications/local-notifications.js");





const appSettings = __webpack_require__("../node_modules/@nativescript/core/application-settings/application-settings.js");

const store = new vuex__WEBPACK_IMPORTED_MODULE_2__["default"].Store({
  state: {
    http: httpModule,
    modalPicker: modalPicker,
    notifications: nativescript_local_notifications__WEBPACK_IMPORTED_MODULE_4__["LocalNotifications"],
    android: tns_core_modules_application__WEBPACK_IMPORTED_MODULE_5__["android"],
    androidApp: tns_core_modules_application__WEBPACK_IMPORTED_MODULE_5__["AndroidApplication"],
    isAndroid: tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_6__["isAndroid"],
    appSettings: appSettings,
    user: null,
    loginPermanent: null
  },
  mutations: {
    defineUser(state, user) {
      state.user = user;
    },

    destroyUser(state) {
      state.user = null;
    },

    defineLogin(state, loginPermanent) {
      state.loginPermanent = loginPermanent;
    }

  },
  getters: {
    isLoggedIn(state) {
      return state.user != null;
    },

    isLoginPermanent(state) {
      return state.loginPermanent;
    }

  }
});



nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('initial-page', _components_initialPage__WEBPACK_IMPORTED_MODULE_9__["default"]);

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('previous-classes-page', _components_previousClassesPage__WEBPACK_IMPORTED_MODULE_10__["default"]);

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('schedule-tutoring', _components_scheduleTutoring__WEBPACK_IMPORTED_MODULE_11__["default"]);

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('register-tutoring', _components_registerTutoring__WEBPACK_IMPORTED_MODULE_12__["default"]);

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('list-tutorials', _components_listTutorials__WEBPACK_IMPORTED_MODULE_13__["default"]);

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('edit-tutorial', _components_editTutorial__WEBPACK_IMPORTED_MODULE_14__["default"]);

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('list-archived-tutorials', _components_listArchivedTutorials__WEBPACK_IMPORTED_MODULE_15__["default"]);

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('previous-classifications-page', _components_previousClassificationsPage__WEBPACK_IMPORTED_MODULE_16__["default"]);
nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.registerElement('CheckBox', () => __webpack_require__("../node_modules/@nstudio/nativescript-checkbox/checkbox.js").CheckBox, {
  model: {
    prop: 'checked',
    event: 'checkedChange'
  }
});
nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.registerElement('DropDown', () => __webpack_require__("../node_modules/nativescript-drop-down/drop-down.js").DropDown);
let firstPage;
new nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  render: h => h('frame', [h(firstPage)]),
  store: store,

  created() {
    this.$store.commit('defineLogin', this.$store.state.appSettings.hasKey("id"));

    if (this.$store.getters.isLoginPermanent) {
      this.$store.commit("defineUser", {
        id: this.$store.state.appSettings.getNumber("id"),
        nome: this.$store.state.appSettings.getString("nome"),
        numero: this.$store.state.appSettings.getNumber("numero")
      });
    }

    firstPage = this.$store.getters.isLoginPermanent ? _components_mainPage__WEBPACK_IMPORTED_MODULE_8__["default"] : _components_loginPage__WEBPACK_IMPORTED_MODULE_7__["default"];
  }

}).$start();
    
        
        
    
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./app.scss":
/***/ (function(module, exports, __webpack_require__) {

module.exports = {"type":"stylesheet","stylesheet":{"rules":[{"type":"comment","comment":"!\n * NativeScript Theme __VERSION__ (https://nativescript.org)\n * Copyright 2016-2016 The Theme Authors\n * Copyright 2016-2019 Progress Software\n * Licensed under Apache 2.0 (https://github.com/NativeScript/theme/blob/master/LICENSE)\n "},{"type":"keyframes","name":"empty","keyframes":[]},{"type":"comment","comment":" Forms "},{"type":"comment","comment":"*\n * Color classes\n * The following creates this pattern:\n * .c-grey{color:#e0e0e0}.c-bg-grey{background-color:#e0e0e0}\n*"},{"type":"rule","selectors":[".c-black"],"declarations":[{"type":"declaration","property":"color","value":"#000"}]},{"type":"rule","selectors":[".c-bg-black"],"declarations":[{"type":"declaration","property":"background-color","value":"#000"}]},{"type":"rule","selectors":[".c-white"],"declarations":[{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":[".c-bg-white"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"rule","selectors":[".c-grey"],"declarations":[{"type":"declaration","property":"color","value":"#e0e0e0"}]},{"type":"rule","selectors":[".c-bg-grey"],"declarations":[{"type":"declaration","property":"background-color","value":"#e0e0e0"}]},{"type":"rule","selectors":[".c-grey-light"],"declarations":[{"type":"declaration","property":"color","value":"#bababa"}]},{"type":"rule","selectors":[".c-bg-grey-light"],"declarations":[{"type":"declaration","property":"background-color","value":"#bababa"}]},{"type":"rule","selectors":[".c-charcoal"],"declarations":[{"type":"declaration","property":"color","value":"#303030"}]},{"type":"rule","selectors":[".c-bg-charcoal"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"rule","selectors":[".c-transparent"],"declarations":[{"type":"declaration","property":"color","value":"transparent"}]},{"type":"rule","selectors":[".c-bg-transparent"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"}]},{"type":"rule","selectors":[".c-aqua"],"declarations":[{"type":"declaration","property":"color","value":"#00caab"}]},{"type":"rule","selectors":[".c-bg-aqua"],"declarations":[{"type":"declaration","property":"background-color","value":"#00caab"}]},{"type":"rule","selectors":[".c-blue"],"declarations":[{"type":"declaration","property":"color","value":"#3a53ff"}]},{"type":"rule","selectors":[".c-bg-blue"],"declarations":[{"type":"declaration","property":"background-color","value":"#3a53ff"}]},{"type":"rule","selectors":[".c-brown"],"declarations":[{"type":"declaration","property":"color","value":"#795548"}]},{"type":"rule","selectors":[".c-bg-brown"],"declarations":[{"type":"declaration","property":"background-color","value":"#795548"}]},{"type":"rule","selectors":[".c-forest"],"declarations":[{"type":"declaration","property":"color","value":"#006968"}]},{"type":"rule","selectors":[".c-bg-forest"],"declarations":[{"type":"declaration","property":"background-color","value":"#006968"}]},{"type":"rule","selectors":[".c-grey-dark"],"declarations":[{"type":"declaration","property":"color","value":"#5c687c"}]},{"type":"rule","selectors":[".c-bg-grey-dark"],"declarations":[{"type":"declaration","property":"background-color","value":"#5c687c"}]},{"type":"rule","selectors":[".c-purple"],"declarations":[{"type":"declaration","property":"color","value":"#8130ff"}]},{"type":"rule","selectors":[".c-bg-purple"],"declarations":[{"type":"declaration","property":"background-color","value":"#8130ff"}]},{"type":"rule","selectors":[".c-lemon"],"declarations":[{"type":"declaration","property":"color","value":"#ffea00"}]},{"type":"rule","selectors":[".c-bg-lemon"],"declarations":[{"type":"declaration","property":"background-color","value":"#ffea00"}]},{"type":"rule","selectors":[".c-lime"],"declarations":[{"type":"declaration","property":"color","value":"#aee406"}]},{"type":"rule","selectors":[".c-bg-lime"],"declarations":[{"type":"declaration","property":"background-color","value":"#aee406"}]},{"type":"rule","selectors":[".c-orange"],"declarations":[{"type":"declaration","property":"color","value":"#f57c00"}]},{"type":"rule","selectors":[".c-bg-orange"],"declarations":[{"type":"declaration","property":"background-color","value":"#f57c00"}]},{"type":"rule","selectors":[".c-ruby"],"declarations":[{"type":"declaration","property":"color","value":"#ff1744"}]},{"type":"rule","selectors":[".c-bg-ruby"],"declarations":[{"type":"declaration","property":"background-color","value":"#ff1744"}]},{"type":"rule","selectors":[".c-sky"],"declarations":[{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".c-bg-sky"],"declarations":[{"type":"declaration","property":"background-color","value":"#30bcff"}]},{"type":"rule","selectors":[".c-error"],"declarations":[{"type":"declaration","property":"color","value":"#d50000"}]},{"type":"rule","selectors":[".c-bg-error"],"declarations":[{"type":"declaration","property":"background-color","value":"#d50000"}]},{"type":"comment","comment":" Width/Height "},{"type":"rule","selectors":[".w-full"],"declarations":[{"type":"declaration","property":"width","value":"100%"}]},{"type":"rule","selectors":[".w-100"],"declarations":[{"type":"declaration","property":"width","value":"100"}]},{"type":"rule","selectors":[".h-full"],"declarations":[{"type":"declaration","property":"height","value":"100%"}]},{"type":"rule","selectors":[".h-100"],"declarations":[{"type":"declaration","property":"height","value":"100"}]},{"type":"comment","comment":"*\n * Margin and Padding\n * The following creates this pattern:\n * .m-0{margin:0}.m-t-0{margin-top:0}.m-r-0{margin-right:0}.m-b-0{margin-bottom:0}.m-l-0{margin-left:0}.m-x-0{margin-right:0;margin-left:0}.m-y-0{margin-top:0;margin-bottom:0}\n * Same for Padding (using the 'p' abbreviation)\n * From 0, 2, 5, 10, 15, 20, 25, 30\n*"},{"type":"rule","selectors":[".m-0"],"declarations":[{"type":"declaration","property":"margin","value":"0"}]},{"type":"rule","selectors":[".m-t-0"],"declarations":[{"type":"declaration","property":"margin-top","value":"0"}]},{"type":"rule","selectors":[".m-r-0"],"declarations":[{"type":"declaration","property":"margin-right","value":"0"}]},{"type":"rule","selectors":[".m-b-0"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"0"}]},{"type":"rule","selectors":[".m-l-0"],"declarations":[{"type":"declaration","property":"margin-left","value":"0"}]},{"type":"rule","selectors":[".m-x-0"],"declarations":[{"type":"declaration","property":"margin-right","value":"0"},{"type":"declaration","property":"margin-left","value":"0"}]},{"type":"rule","selectors":[".m-y-0"],"declarations":[{"type":"declaration","property":"margin-top","value":"0"},{"type":"declaration","property":"margin-bottom","value":"0"}]},{"type":"rule","selectors":[".m-2"],"declarations":[{"type":"declaration","property":"margin","value":"2"}]},{"type":"rule","selectors":[".m-t-2"],"declarations":[{"type":"declaration","property":"margin-top","value":"2"}]},{"type":"rule","selectors":[".m-r-2"],"declarations":[{"type":"declaration","property":"margin-right","value":"2"}]},{"type":"rule","selectors":[".m-b-2"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"2"}]},{"type":"rule","selectors":[".m-l-2"],"declarations":[{"type":"declaration","property":"margin-left","value":"2"}]},{"type":"rule","selectors":[".m-x-2"],"declarations":[{"type":"declaration","property":"margin-right","value":"2"},{"type":"declaration","property":"margin-left","value":"2"}]},{"type":"rule","selectors":[".m-y-2"],"declarations":[{"type":"declaration","property":"margin-top","value":"2"},{"type":"declaration","property":"margin-bottom","value":"2"}]},{"type":"rule","selectors":[".m-4"],"declarations":[{"type":"declaration","property":"margin","value":"4"}]},{"type":"rule","selectors":[".m-t-4"],"declarations":[{"type":"declaration","property":"margin-top","value":"4"}]},{"type":"rule","selectors":[".m-r-4"],"declarations":[{"type":"declaration","property":"margin-right","value":"4"}]},{"type":"rule","selectors":[".m-b-4"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"4"}]},{"type":"rule","selectors":[".m-l-4"],"declarations":[{"type":"declaration","property":"margin-left","value":"4"}]},{"type":"rule","selectors":[".m-x-4"],"declarations":[{"type":"declaration","property":"margin-right","value":"4"},{"type":"declaration","property":"margin-left","value":"4"}]},{"type":"rule","selectors":[".m-y-4"],"declarations":[{"type":"declaration","property":"margin-top","value":"4"},{"type":"declaration","property":"margin-bottom","value":"4"}]},{"type":"rule","selectors":[".m-5"],"declarations":[{"type":"declaration","property":"margin","value":"5"}]},{"type":"rule","selectors":[".m-t-5"],"declarations":[{"type":"declaration","property":"margin-top","value":"5"}]},{"type":"rule","selectors":[".m-r-5"],"declarations":[{"type":"declaration","property":"margin-right","value":"5"}]},{"type":"rule","selectors":[".m-b-5"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"5"}]},{"type":"rule","selectors":[".m-l-5"],"declarations":[{"type":"declaration","property":"margin-left","value":"5"}]},{"type":"rule","selectors":[".m-x-5"],"declarations":[{"type":"declaration","property":"margin-right","value":"5"},{"type":"declaration","property":"margin-left","value":"5"}]},{"type":"rule","selectors":[".m-y-5"],"declarations":[{"type":"declaration","property":"margin-top","value":"5"},{"type":"declaration","property":"margin-bottom","value":"5"}]},{"type":"rule","selectors":[".m-8"],"declarations":[{"type":"declaration","property":"margin","value":"8"}]},{"type":"rule","selectors":[".m-t-8"],"declarations":[{"type":"declaration","property":"margin-top","value":"8"}]},{"type":"rule","selectors":[".m-r-8"],"declarations":[{"type":"declaration","property":"margin-right","value":"8"}]},{"type":"rule","selectors":[".m-b-8"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"8"}]},{"type":"rule","selectors":[".m-l-8"],"declarations":[{"type":"declaration","property":"margin-left","value":"8"}]},{"type":"rule","selectors":[".m-x-8"],"declarations":[{"type":"declaration","property":"margin-right","value":"8"},{"type":"declaration","property":"margin-left","value":"8"}]},{"type":"rule","selectors":[".m-y-8"],"declarations":[{"type":"declaration","property":"margin-top","value":"8"},{"type":"declaration","property":"margin-bottom","value":"8"}]},{"type":"rule","selectors":[".m-10"],"declarations":[{"type":"declaration","property":"margin","value":"10"}]},{"type":"rule","selectors":[".m-t-10"],"declarations":[{"type":"declaration","property":"margin-top","value":"10"}]},{"type":"rule","selectors":[".m-r-10"],"declarations":[{"type":"declaration","property":"margin-right","value":"10"}]},{"type":"rule","selectors":[".m-b-10"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"10"}]},{"type":"rule","selectors":[".m-l-10"],"declarations":[{"type":"declaration","property":"margin-left","value":"10"}]},{"type":"rule","selectors":[".m-x-10"],"declarations":[{"type":"declaration","property":"margin-right","value":"10"},{"type":"declaration","property":"margin-left","value":"10"}]},{"type":"rule","selectors":[".m-y-10"],"declarations":[{"type":"declaration","property":"margin-top","value":"10"},{"type":"declaration","property":"margin-bottom","value":"10"}]},{"type":"rule","selectors":[".m-12"],"declarations":[{"type":"declaration","property":"margin","value":"12"}]},{"type":"rule","selectors":[".m-t-12"],"declarations":[{"type":"declaration","property":"margin-top","value":"12"}]},{"type":"rule","selectors":[".m-r-12"],"declarations":[{"type":"declaration","property":"margin-right","value":"12"}]},{"type":"rule","selectors":[".m-b-12"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"12"}]},{"type":"rule","selectors":[".m-l-12"],"declarations":[{"type":"declaration","property":"margin-left","value":"12"}]},{"type":"rule","selectors":[".m-x-12"],"declarations":[{"type":"declaration","property":"margin-right","value":"12"},{"type":"declaration","property":"margin-left","value":"12"}]},{"type":"rule","selectors":[".m-y-12"],"declarations":[{"type":"declaration","property":"margin-top","value":"12"},{"type":"declaration","property":"margin-bottom","value":"12"}]},{"type":"rule","selectors":[".m-15"],"declarations":[{"type":"declaration","property":"margin","value":"15"}]},{"type":"rule","selectors":[".m-t-15"],"declarations":[{"type":"declaration","property":"margin-top","value":"15"}]},{"type":"rule","selectors":[".m-r-15"],"declarations":[{"type":"declaration","property":"margin-right","value":"15"}]},{"type":"rule","selectors":[".m-b-15"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"15"}]},{"type":"rule","selectors":[".m-l-15"],"declarations":[{"type":"declaration","property":"margin-left","value":"15"}]},{"type":"rule","selectors":[".m-x-15"],"declarations":[{"type":"declaration","property":"margin-right","value":"15"},{"type":"declaration","property":"margin-left","value":"15"}]},{"type":"rule","selectors":[".m-y-15"],"declarations":[{"type":"declaration","property":"margin-top","value":"15"},{"type":"declaration","property":"margin-bottom","value":"15"}]},{"type":"rule","selectors":[".m-16"],"declarations":[{"type":"declaration","property":"margin","value":"16"}]},{"type":"rule","selectors":[".m-t-16"],"declarations":[{"type":"declaration","property":"margin-top","value":"16"}]},{"type":"rule","selectors":[".m-r-16"],"declarations":[{"type":"declaration","property":"margin-right","value":"16"}]},{"type":"rule","selectors":[".m-b-16"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"16"}]},{"type":"rule","selectors":[".m-l-16"],"declarations":[{"type":"declaration","property":"margin-left","value":"16"}]},{"type":"rule","selectors":[".m-x-16"],"declarations":[{"type":"declaration","property":"margin-right","value":"16"},{"type":"declaration","property":"margin-left","value":"16"}]},{"type":"rule","selectors":[".m-y-16"],"declarations":[{"type":"declaration","property":"margin-top","value":"16"},{"type":"declaration","property":"margin-bottom","value":"16"}]},{"type":"rule","selectors":[".m-20"],"declarations":[{"type":"declaration","property":"margin","value":"20"}]},{"type":"rule","selectors":[".m-t-20"],"declarations":[{"type":"declaration","property":"margin-top","value":"20"}]},{"type":"rule","selectors":[".m-r-20"],"declarations":[{"type":"declaration","property":"margin-right","value":"20"}]},{"type":"rule","selectors":[".m-b-20"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"20"}]},{"type":"rule","selectors":[".m-l-20"],"declarations":[{"type":"declaration","property":"margin-left","value":"20"}]},{"type":"rule","selectors":[".m-x-20"],"declarations":[{"type":"declaration","property":"margin-right","value":"20"},{"type":"declaration","property":"margin-left","value":"20"}]},{"type":"rule","selectors":[".m-y-20"],"declarations":[{"type":"declaration","property":"margin-top","value":"20"},{"type":"declaration","property":"margin-bottom","value":"20"}]},{"type":"rule","selectors":[".m-24"],"declarations":[{"type":"declaration","property":"margin","value":"24"}]},{"type":"rule","selectors":[".m-t-24"],"declarations":[{"type":"declaration","property":"margin-top","value":"24"}]},{"type":"rule","selectors":[".m-r-24"],"declarations":[{"type":"declaration","property":"margin-right","value":"24"}]},{"type":"rule","selectors":[".m-b-24"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"24"}]},{"type":"rule","selectors":[".m-l-24"],"declarations":[{"type":"declaration","property":"margin-left","value":"24"}]},{"type":"rule","selectors":[".m-x-24"],"declarations":[{"type":"declaration","property":"margin-right","value":"24"},{"type":"declaration","property":"margin-left","value":"24"}]},{"type":"rule","selectors":[".m-y-24"],"declarations":[{"type":"declaration","property":"margin-top","value":"24"},{"type":"declaration","property":"margin-bottom","value":"24"}]},{"type":"rule","selectors":[".m-25"],"declarations":[{"type":"declaration","property":"margin","value":"25"}]},{"type":"rule","selectors":[".m-t-25"],"declarations":[{"type":"declaration","property":"margin-top","value":"25"}]},{"type":"rule","selectors":[".m-r-25"],"declarations":[{"type":"declaration","property":"margin-right","value":"25"}]},{"type":"rule","selectors":[".m-b-25"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"25"}]},{"type":"rule","selectors":[".m-l-25"],"declarations":[{"type":"declaration","property":"margin-left","value":"25"}]},{"type":"rule","selectors":[".m-x-25"],"declarations":[{"type":"declaration","property":"margin-right","value":"25"},{"type":"declaration","property":"margin-left","value":"25"}]},{"type":"rule","selectors":[".m-y-25"],"declarations":[{"type":"declaration","property":"margin-top","value":"25"},{"type":"declaration","property":"margin-bottom","value":"25"}]},{"type":"rule","selectors":[".m-28"],"declarations":[{"type":"declaration","property":"margin","value":"28"}]},{"type":"rule","selectors":[".m-t-28"],"declarations":[{"type":"declaration","property":"margin-top","value":"28"}]},{"type":"rule","selectors":[".m-r-28"],"declarations":[{"type":"declaration","property":"margin-right","value":"28"}]},{"type":"rule","selectors":[".m-b-28"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"28"}]},{"type":"rule","selectors":[".m-l-28"],"declarations":[{"type":"declaration","property":"margin-left","value":"28"}]},{"type":"rule","selectors":[".m-x-28"],"declarations":[{"type":"declaration","property":"margin-right","value":"28"},{"type":"declaration","property":"margin-left","value":"28"}]},{"type":"rule","selectors":[".m-y-28"],"declarations":[{"type":"declaration","property":"margin-top","value":"28"},{"type":"declaration","property":"margin-bottom","value":"28"}]},{"type":"rule","selectors":[".m-30"],"declarations":[{"type":"declaration","property":"margin","value":"30"}]},{"type":"rule","selectors":[".m-t-30"],"declarations":[{"type":"declaration","property":"margin-top","value":"30"}]},{"type":"rule","selectors":[".m-r-30"],"declarations":[{"type":"declaration","property":"margin-right","value":"30"}]},{"type":"rule","selectors":[".m-b-30"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"30"}]},{"type":"rule","selectors":[".m-l-30"],"declarations":[{"type":"declaration","property":"margin-left","value":"30"}]},{"type":"rule","selectors":[".m-x-30"],"declarations":[{"type":"declaration","property":"margin-right","value":"30"},{"type":"declaration","property":"margin-left","value":"30"}]},{"type":"rule","selectors":[".m-y-30"],"declarations":[{"type":"declaration","property":"margin-top","value":"30"},{"type":"declaration","property":"margin-bottom","value":"30"}]},{"type":"rule","selectors":[".p-0"],"declarations":[{"type":"declaration","property":"padding","value":"0"}]},{"type":"rule","selectors":[".p-t-0"],"declarations":[{"type":"declaration","property":"padding-top","value":"0"}]},{"type":"rule","selectors":[".p-r-0"],"declarations":[{"type":"declaration","property":"padding-right","value":"0"}]},{"type":"rule","selectors":[".p-b-0"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"0"}]},{"type":"rule","selectors":[".p-l-0"],"declarations":[{"type":"declaration","property":"padding-left","value":"0"}]},{"type":"rule","selectors":[".p-x-0"],"declarations":[{"type":"declaration","property":"padding-right","value":"0"},{"type":"declaration","property":"padding-left","value":"0"}]},{"type":"rule","selectors":[".p-y-0"],"declarations":[{"type":"declaration","property":"padding-top","value":"0"},{"type":"declaration","property":"padding-bottom","value":"0"}]},{"type":"rule","selectors":[".p-2"],"declarations":[{"type":"declaration","property":"padding","value":"2"}]},{"type":"rule","selectors":[".p-t-2"],"declarations":[{"type":"declaration","property":"padding-top","value":"2"}]},{"type":"rule","selectors":[".p-r-2"],"declarations":[{"type":"declaration","property":"padding-right","value":"2"}]},{"type":"rule","selectors":[".p-b-2"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"2"}]},{"type":"rule","selectors":[".p-l-2"],"declarations":[{"type":"declaration","property":"padding-left","value":"2"}]},{"type":"rule","selectors":[".p-x-2"],"declarations":[{"type":"declaration","property":"padding-right","value":"2"},{"type":"declaration","property":"padding-left","value":"2"}]},{"type":"rule","selectors":[".p-y-2"],"declarations":[{"type":"declaration","property":"padding-top","value":"2"},{"type":"declaration","property":"padding-bottom","value":"2"}]},{"type":"rule","selectors":[".p-4"],"declarations":[{"type":"declaration","property":"padding","value":"4"}]},{"type":"rule","selectors":[".p-t-4"],"declarations":[{"type":"declaration","property":"padding-top","value":"4"}]},{"type":"rule","selectors":[".p-r-4"],"declarations":[{"type":"declaration","property":"padding-right","value":"4"}]},{"type":"rule","selectors":[".p-b-4"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"4"}]},{"type":"rule","selectors":[".p-l-4"],"declarations":[{"type":"declaration","property":"padding-left","value":"4"}]},{"type":"rule","selectors":[".p-x-4"],"declarations":[{"type":"declaration","property":"padding-right","value":"4"},{"type":"declaration","property":"padding-left","value":"4"}]},{"type":"rule","selectors":[".p-y-4"],"declarations":[{"type":"declaration","property":"padding-top","value":"4"},{"type":"declaration","property":"padding-bottom","value":"4"}]},{"type":"rule","selectors":[".p-5"],"declarations":[{"type":"declaration","property":"padding","value":"5"}]},{"type":"rule","selectors":[".p-t-5"],"declarations":[{"type":"declaration","property":"padding-top","value":"5"}]},{"type":"rule","selectors":[".p-r-5"],"declarations":[{"type":"declaration","property":"padding-right","value":"5"}]},{"type":"rule","selectors":[".p-b-5"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"5"}]},{"type":"rule","selectors":[".p-l-5"],"declarations":[{"type":"declaration","property":"padding-left","value":"5"}]},{"type":"rule","selectors":[".p-x-5"],"declarations":[{"type":"declaration","property":"padding-right","value":"5"},{"type":"declaration","property":"padding-left","value":"5"}]},{"type":"rule","selectors":[".p-y-5"],"declarations":[{"type":"declaration","property":"padding-top","value":"5"},{"type":"declaration","property":"padding-bottom","value":"5"}]},{"type":"rule","selectors":[".p-8"],"declarations":[{"type":"declaration","property":"padding","value":"8"}]},{"type":"rule","selectors":[".p-t-8"],"declarations":[{"type":"declaration","property":"padding-top","value":"8"}]},{"type":"rule","selectors":[".p-r-8"],"declarations":[{"type":"declaration","property":"padding-right","value":"8"}]},{"type":"rule","selectors":[".p-b-8"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"8"}]},{"type":"rule","selectors":[".p-l-8"],"declarations":[{"type":"declaration","property":"padding-left","value":"8"}]},{"type":"rule","selectors":[".p-x-8"],"declarations":[{"type":"declaration","property":"padding-right","value":"8"},{"type":"declaration","property":"padding-left","value":"8"}]},{"type":"rule","selectors":[".p-y-8"],"declarations":[{"type":"declaration","property":"padding-top","value":"8"},{"type":"declaration","property":"padding-bottom","value":"8"}]},{"type":"rule","selectors":[".p-10"],"declarations":[{"type":"declaration","property":"padding","value":"10"}]},{"type":"rule","selectors":[".p-t-10"],"declarations":[{"type":"declaration","property":"padding-top","value":"10"}]},{"type":"rule","selectors":[".p-r-10"],"declarations":[{"type":"declaration","property":"padding-right","value":"10"}]},{"type":"rule","selectors":[".p-b-10"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"10"}]},{"type":"rule","selectors":[".p-l-10"],"declarations":[{"type":"declaration","property":"padding-left","value":"10"}]},{"type":"rule","selectors":[".p-x-10"],"declarations":[{"type":"declaration","property":"padding-right","value":"10"},{"type":"declaration","property":"padding-left","value":"10"}]},{"type":"rule","selectors":[".p-y-10"],"declarations":[{"type":"declaration","property":"padding-top","value":"10"},{"type":"declaration","property":"padding-bottom","value":"10"}]},{"type":"rule","selectors":[".p-12"],"declarations":[{"type":"declaration","property":"padding","value":"12"}]},{"type":"rule","selectors":[".p-t-12"],"declarations":[{"type":"declaration","property":"padding-top","value":"12"}]},{"type":"rule","selectors":[".p-r-12"],"declarations":[{"type":"declaration","property":"padding-right","value":"12"}]},{"type":"rule","selectors":[".p-b-12"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"12"}]},{"type":"rule","selectors":[".p-l-12"],"declarations":[{"type":"declaration","property":"padding-left","value":"12"}]},{"type":"rule","selectors":[".p-x-12"],"declarations":[{"type":"declaration","property":"padding-right","value":"12"},{"type":"declaration","property":"padding-left","value":"12"}]},{"type":"rule","selectors":[".p-y-12"],"declarations":[{"type":"declaration","property":"padding-top","value":"12"},{"type":"declaration","property":"padding-bottom","value":"12"}]},{"type":"rule","selectors":[".p-15"],"declarations":[{"type":"declaration","property":"padding","value":"15"}]},{"type":"rule","selectors":[".p-t-15"],"declarations":[{"type":"declaration","property":"padding-top","value":"15"}]},{"type":"rule","selectors":[".p-r-15"],"declarations":[{"type":"declaration","property":"padding-right","value":"15"}]},{"type":"rule","selectors":[".p-b-15"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"15"}]},{"type":"rule","selectors":[".p-l-15"],"declarations":[{"type":"declaration","property":"padding-left","value":"15"}]},{"type":"rule","selectors":[".p-x-15"],"declarations":[{"type":"declaration","property":"padding-right","value":"15"},{"type":"declaration","property":"padding-left","value":"15"}]},{"type":"rule","selectors":[".p-y-15"],"declarations":[{"type":"declaration","property":"padding-top","value":"15"},{"type":"declaration","property":"padding-bottom","value":"15"}]},{"type":"rule","selectors":[".p-16"],"declarations":[{"type":"declaration","property":"padding","value":"16"}]},{"type":"rule","selectors":[".p-t-16"],"declarations":[{"type":"declaration","property":"padding-top","value":"16"}]},{"type":"rule","selectors":[".p-r-16"],"declarations":[{"type":"declaration","property":"padding-right","value":"16"}]},{"type":"rule","selectors":[".p-b-16"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"16"}]},{"type":"rule","selectors":[".p-l-16"],"declarations":[{"type":"declaration","property":"padding-left","value":"16"}]},{"type":"rule","selectors":[".p-x-16"],"declarations":[{"type":"declaration","property":"padding-right","value":"16"},{"type":"declaration","property":"padding-left","value":"16"}]},{"type":"rule","selectors":[".p-y-16"],"declarations":[{"type":"declaration","property":"padding-top","value":"16"},{"type":"declaration","property":"padding-bottom","value":"16"}]},{"type":"rule","selectors":[".p-20"],"declarations":[{"type":"declaration","property":"padding","value":"20"}]},{"type":"rule","selectors":[".p-t-20"],"declarations":[{"type":"declaration","property":"padding-top","value":"20"}]},{"type":"rule","selectors":[".p-r-20"],"declarations":[{"type":"declaration","property":"padding-right","value":"20"}]},{"type":"rule","selectors":[".p-b-20"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"20"}]},{"type":"rule","selectors":[".p-l-20"],"declarations":[{"type":"declaration","property":"padding-left","value":"20"}]},{"type":"rule","selectors":[".p-x-20"],"declarations":[{"type":"declaration","property":"padding-right","value":"20"},{"type":"declaration","property":"padding-left","value":"20"}]},{"type":"rule","selectors":[".p-y-20"],"declarations":[{"type":"declaration","property":"padding-top","value":"20"},{"type":"declaration","property":"padding-bottom","value":"20"}]},{"type":"rule","selectors":[".p-24"],"declarations":[{"type":"declaration","property":"padding","value":"24"}]},{"type":"rule","selectors":[".p-t-24"],"declarations":[{"type":"declaration","property":"padding-top","value":"24"}]},{"type":"rule","selectors":[".p-r-24"],"declarations":[{"type":"declaration","property":"padding-right","value":"24"}]},{"type":"rule","selectors":[".p-b-24"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"24"}]},{"type":"rule","selectors":[".p-l-24"],"declarations":[{"type":"declaration","property":"padding-left","value":"24"}]},{"type":"rule","selectors":[".p-x-24"],"declarations":[{"type":"declaration","property":"padding-right","value":"24"},{"type":"declaration","property":"padding-left","value":"24"}]},{"type":"rule","selectors":[".p-y-24"],"declarations":[{"type":"declaration","property":"padding-top","value":"24"},{"type":"declaration","property":"padding-bottom","value":"24"}]},{"type":"rule","selectors":[".p-25"],"declarations":[{"type":"declaration","property":"padding","value":"25"}]},{"type":"rule","selectors":[".p-t-25"],"declarations":[{"type":"declaration","property":"padding-top","value":"25"}]},{"type":"rule","selectors":[".p-r-25"],"declarations":[{"type":"declaration","property":"padding-right","value":"25"}]},{"type":"rule","selectors":[".p-b-25"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"25"}]},{"type":"rule","selectors":[".p-l-25"],"declarations":[{"type":"declaration","property":"padding-left","value":"25"}]},{"type":"rule","selectors":[".p-x-25"],"declarations":[{"type":"declaration","property":"padding-right","value":"25"},{"type":"declaration","property":"padding-left","value":"25"}]},{"type":"rule","selectors":[".p-y-25"],"declarations":[{"type":"declaration","property":"padding-top","value":"25"},{"type":"declaration","property":"padding-bottom","value":"25"}]},{"type":"rule","selectors":[".p-28"],"declarations":[{"type":"declaration","property":"padding","value":"28"}]},{"type":"rule","selectors":[".p-t-28"],"declarations":[{"type":"declaration","property":"padding-top","value":"28"}]},{"type":"rule","selectors":[".p-r-28"],"declarations":[{"type":"declaration","property":"padding-right","value":"28"}]},{"type":"rule","selectors":[".p-b-28"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"28"}]},{"type":"rule","selectors":[".p-l-28"],"declarations":[{"type":"declaration","property":"padding-left","value":"28"}]},{"type":"rule","selectors":[".p-x-28"],"declarations":[{"type":"declaration","property":"padding-right","value":"28"},{"type":"declaration","property":"padding-left","value":"28"}]},{"type":"rule","selectors":[".p-y-28"],"declarations":[{"type":"declaration","property":"padding-top","value":"28"},{"type":"declaration","property":"padding-bottom","value":"28"}]},{"type":"rule","selectors":[".p-30"],"declarations":[{"type":"declaration","property":"padding","value":"30"}]},{"type":"rule","selectors":[".p-t-30"],"declarations":[{"type":"declaration","property":"padding-top","value":"30"}]},{"type":"rule","selectors":[".p-r-30"],"declarations":[{"type":"declaration","property":"padding-right","value":"30"}]},{"type":"rule","selectors":[".p-b-30"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"30"}]},{"type":"rule","selectors":[".p-l-30"],"declarations":[{"type":"declaration","property":"padding-left","value":"30"}]},{"type":"rule","selectors":[".p-x-30"],"declarations":[{"type":"declaration","property":"padding-right","value":"30"},{"type":"declaration","property":"padding-left","value":"30"}]},{"type":"rule","selectors":[".p-y-30"],"declarations":[{"type":"declaration","property":"padding-top","value":"30"},{"type":"declaration","property":"padding-bottom","value":"30"}]},{"type":"comment","comment":" Alignment "},{"type":"rule","selectors":[".text-left"],"declarations":[{"type":"declaration","property":"text-align","value":"left"}]},{"type":"rule","selectors":[".text-right"],"declarations":[{"type":"declaration","property":"text-align","value":"right"}]},{"type":"rule","selectors":[".text-center"],"declarations":[{"type":"declaration","property":"text-align","value":"center"}]},{"type":"rule","selectors":[".text-lowercase"],"declarations":[{"type":"declaration","property":"text-transform","value":"lowercase"}]},{"type":"rule","selectors":[".text-uppercase"],"declarations":[{"type":"declaration","property":"text-transform","value":"uppercase"}]},{"type":"rule","selectors":[".text-capitalize"],"declarations":[{"type":"declaration","property":"text-transform","value":"capitalize"}]},{"type":"rule","selectors":[".font-weight-normal"],"declarations":[{"type":"declaration","property":"font-weight","value":"normal"}]},{"type":"rule","selectors":[".font-weight-bold"],"declarations":[{"type":"declaration","property":"font-weight","value":"bold"}]},{"type":"rule","selectors":[".font-italic"],"declarations":[{"type":"declaration","property":"font-style","value":"italic"}]},{"type":"comment","comment":"*\n * Font size\n * The following creates this pattern:\n * .t-10{font-size:10}\n * From 10, 12, 14, 15, 16, 17, 18, 19, 20\n*"},{"type":"rule","selectors":[".t-10"],"declarations":[{"type":"declaration","property":"font-size","value":"10"}]},{"type":"rule","selectors":[".t-12"],"declarations":[{"type":"declaration","property":"font-size","value":"12"}]},{"type":"rule","selectors":[".t-14"],"declarations":[{"type":"declaration","property":"font-size","value":"14"}]},{"type":"rule","selectors":[".t-15"],"declarations":[{"type":"declaration","property":"font-size","value":"15"}]},{"type":"rule","selectors":[".t-16"],"declarations":[{"type":"declaration","property":"font-size","value":"16"}]},{"type":"rule","selectors":[".t-17"],"declarations":[{"type":"declaration","property":"font-size","value":"17"}]},{"type":"rule","selectors":[".t-18"],"declarations":[{"type":"declaration","property":"font-size","value":"18"}]},{"type":"rule","selectors":[".t-19"],"declarations":[{"type":"declaration","property":"font-size","value":"19"}]},{"type":"rule","selectors":[".t-20"],"declarations":[{"type":"declaration","property":"font-size","value":"20"}]},{"type":"rule","selectors":[".t-25"],"declarations":[{"type":"declaration","property":"font-size","value":"25"}]},{"type":"rule","selectors":[".t-30"],"declarations":[{"type":"declaration","property":"font-size","value":"30"}]},{"type":"rule","selectors":[".t-36"],"declarations":[{"type":"declaration","property":"font-size","value":"36"}]},{"type":"rule","selectors":[".h1",".h2",".h3",".h4",".h5",".h6"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"4"},{"type":"declaration","property":"font-weight","value":"normal"},{"type":"declaration","property":"color","value":"#262626"}]},{"type":"rule","selectors":[".ns-dark .h1",".ns-dark .h2",".ns-dark .h3",".ns-dark .h4",".ns-dark .h5",".ns-dark .h6"],"declarations":[{"type":"declaration","property":"color","value":"white"}]},{"type":"rule","selectors":[".body",".body2",".footnote"],"declarations":[{"type":"declaration","property":"color","value":"black"},{"type":"declaration","property":"font-weight","value":"normal"}]},{"type":"rule","selectors":[".ns-dark .body",".ns-dark .body2",".ns-dark .footnote"],"declarations":[{"type":"declaration","property":"color","value":"#b3b3b3"}]},{"type":"rule","selectors":[".h1"],"declarations":[{"type":"declaration","property":"font-size","value":"32"}]},{"type":"rule","selectors":[".h2"],"declarations":[{"type":"declaration","property":"font-size","value":"22"}]},{"type":"rule","selectors":[".h3"],"declarations":[{"type":"declaration","property":"font-size","value":"15"}]},{"type":"rule","selectors":[".h4"],"declarations":[{"type":"declaration","property":"font-size","value":"12"}]},{"type":"rule","selectors":[".h5"],"declarations":[{"type":"declaration","property":"font-size","value":"11"}]},{"type":"rule","selectors":[".h6"],"declarations":[{"type":"declaration","property":"font-size","value":"10"}]},{"type":"rule","selectors":[".body"],"declarations":[{"type":"declaration","property":"font-size","value":"14"}]},{"type":"rule","selectors":[".body2"],"declarations":[{"type":"declaration","property":"font-size","value":"17"}]},{"type":"rule","selectors":[".footnote"],"declarations":[{"type":"declaration","property":"font-size","value":"13"}]},{"type":"rule","selectors":[".img-thumbnail"],"declarations":[{"type":"declaration","property":"border-radius","value":"0"}]},{"type":"rule","selectors":[".invisible"],"declarations":[{"type":"declaration","property":"visibility","value":"collapse"}]},{"type":"rule","selectors":[".pull-left"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"left"}]},{"type":"rule","selectors":[".pull-right"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"right"}]},{"type":"rule","selectors":[".m-x-auto"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"center"}]},{"type":"rule","selectors":[".m-y-auto"],"declarations":[{"type":"declaration","property":"vertical-align","value":"center"}]},{"type":"rule","selectors":[".ns-modal",".ns-root"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"},{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"font-family","value":"sans-serif"},{"type":"declaration","property":"font-size","value":"12"}]},{"type":"rule","selectors":[".ns-dark.ns-modal",".ns-dark.ns-root"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"},{"type":"declaration","property":"color","value":"white"}]},{"type":"rule","selectors":[".-hidden",".hidden"],"declarations":[{"type":"declaration","property":"visibility","value":"collapsed"}]},{"type":"rule","selectors":[".-rounded",".rounded"],"declarations":[{"type":"declaration","property":"border-radius","value":"4"}]},{"type":"rule","selectors":[".-circle"],"declarations":[{"type":"declaration","property":"border-radius","value":"50%"}]},{"type":"comment","comment":" Dividers "},{"type":"rule","selectors":[".hr"],"declarations":[{"type":"declaration","property":"height","value":"1"},{"type":"declaration","property":"width","value":"100%"},{"type":"declaration","property":"margin","value":"9 0 10"},{"type":"declaration","property":"border-width","value":"0 0 1"},{"type":"declaration","property":"border-style","value":"solid"}]},{"type":"rule","selectors":[".text-muted"],"declarations":[{"type":"declaration","property":"color","value":"#ace4ff"}]},{"type":"rule","selectors":[".ns-dark .text-muted"],"declarations":[{"type":"declaration","property":"color","value":"#446f83"}]},{"type":"rule","selectors":["Label > *","Label > * > *","Button > *","Button > * > *","TextField > *","TextField > * > *","TextView > *","TextView > * > *"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"}]},{"type":"rule","selectors":["ListView","RadListView"],"declarations":[{"type":"declaration","property":"min-height","value":"100"}]},{"type":"rule","selectors":["Image"],"declarations":[{"type":"declaration","property":"min-height","value":"20"}]},{"type":"rule","selectors":[".nt-icon"],"declarations":[{"type":"declaration","property":"font-size","value":"14"}]},{"type":"rule","selectors":["Button",".nt-button"],"declarations":[{"type":"declaration","property":"text-transform","value":"none"},{"type":"declaration","property":"border-color","value":"transparent"},{"type":"declaration","property":"min-width","value":"64"},{"type":"declaration","property":"height","value":"52"},{"type":"declaration","property":"padding","value":"0 5 0 5"},{"type":"declaration","property":"font-size","value":"14"},{"type":"declaration","property":"margin","value":"8 16 8 16"}]},{"type":"rule","selectors":[".ns-ios Button",".ns-ios .nt-button"],"declarations":[{"type":"declaration","property":"height","value":"40"},{"type":"declaration","property":"border-width","value":"0"}]},{"type":"rule","selectors":[".ns-android Button",".ns-android .nt-button"],"declarations":[{"type":"declaration","property":"margin","value":"4 12"}]},{"type":"rule","selectors":["Button.-outline",".nt-button.-outline"],"declarations":[{"type":"declaration","property":"height","value":"40"},{"type":"declaration","property":"border-width","value":"1"}]},{"type":"rule","selectors":[".ns-android Button.-outline",".ns-android .nt-button.-outline"],"declarations":[{"type":"declaration","property":"margin","value":"8 16"}]},{"type":"rule","selectors":["Button.-rounded-sm","Button.-rounded-lg",".nt-button.-rounded-sm",".nt-button.-rounded-lg"],"declarations":[{"type":"declaration","property":"height","value":"40"},{"type":"declaration","property":"border-radius","value":"4"}]},{"type":"rule","selectors":[".ns-android Button.-rounded-sm",".ns-android Button.-rounded-lg",".ns-android .nt-button.-rounded-sm",".ns-android .nt-button.-rounded-lg"],"declarations":[{"type":"declaration","property":"margin","value":"8 16"}]},{"type":"rule","selectors":["Button.-rounded-lg",".nt-button.-rounded-lg"],"declarations":[{"type":"declaration","property":"border-radius","value":"50%"}]},{"type":"rule","selectors":["Button[isEnabled=false]",".nt-button[isEnabled=false]"],"declarations":[{"type":"declaration","property":"opacity","value":"0.5"}]},{"type":"rule","selectors":["Button.-simple",".nt-button.-simple"],"declarations":[{"type":"declaration","property":"android-elevation","value":"0"},{"type":"declaration","property":"android-dynamic-elevation-offset","value":"0"}]},{"type":"rule","selectors":[".ns-root Button.-aqua",".ns-root .nt-button.-aqua"],"declarations":[{"type":"declaration","property":"border-color","value":"#00caab"},{"type":"declaration","property":"color","value":"#00caab"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-aqua",".ns-dark.ns-root .nt-button.-aqua"],"declarations":[{"type":"declaration","property":"border-color","value":"#00caab"},{"type":"declaration","property":"color","value":"#00caab"}]},{"type":"rule","selectors":[".ns-root Button.-aqua.-primary",".ns-root .nt-button.-aqua.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fdffff"},{"type":"declaration","property":"background-color","value":"#00caab"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-aqua.-primary",".ns-dark.ns-root .nt-button.-aqua.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fdffff"},{"type":"declaration","property":"background-color","value":"#00caab"}]},{"type":"rule","selectors":[".ns-root Button.-blue",".ns-root .nt-button.-blue"],"declarations":[{"type":"declaration","property":"border-color","value":"#3a53ff"},{"type":"declaration","property":"color","value":"#3a53ff"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-blue",".ns-dark.ns-root .nt-button.-blue"],"declarations":[{"type":"declaration","property":"border-color","value":"#3a53ff"},{"type":"declaration","property":"color","value":"#3a53ff"}]},{"type":"rule","selectors":[".ns-root Button.-blue.-primary",".ns-root .nt-button.-blue.-primary"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#3a53ff"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-blue.-primary",".ns-dark.ns-root .nt-button.-blue.-primary"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#3a53ff"}]},{"type":"rule","selectors":[".ns-root Button.-brown",".ns-root .nt-button.-brown"],"declarations":[{"type":"declaration","property":"border-color","value":"#795548"},{"type":"declaration","property":"color","value":"#795548"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-brown",".ns-dark.ns-root .nt-button.-brown"],"declarations":[{"type":"declaration","property":"border-color","value":"#795548"},{"type":"declaration","property":"color","value":"#795548"}]},{"type":"rule","selectors":[".ns-root Button.-brown.-primary",".ns-root .nt-button.-brown.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fbf9f8"},{"type":"declaration","property":"background-color","value":"#795548"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-brown.-primary",".ns-dark.ns-root .nt-button.-brown.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fbf9f8"},{"type":"declaration","property":"background-color","value":"#795548"}]},{"type":"rule","selectors":[".ns-root Button.-forest",".ns-root .nt-button.-forest"],"declarations":[{"type":"declaration","property":"border-color","value":"#006968"},{"type":"declaration","property":"color","value":"#006968"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-forest",".ns-dark.ns-root .nt-button.-forest"],"declarations":[{"type":"declaration","property":"border-color","value":"#006968"},{"type":"declaration","property":"color","value":"#006968"}]},{"type":"rule","selectors":[".ns-root Button.-forest.-primary",".ns-root .nt-button.-forest.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#9cfffe"},{"type":"declaration","property":"background-color","value":"#006968"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-forest.-primary",".ns-dark.ns-root .nt-button.-forest.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#9cfffe"},{"type":"declaration","property":"background-color","value":"#006968"}]},{"type":"rule","selectors":[".ns-root Button.-grey",".ns-root .nt-button.-grey"],"declarations":[{"type":"declaration","property":"border-color","value":"#5c687c"},{"type":"declaration","property":"color","value":"#5c687c"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-grey",".ns-dark.ns-root .nt-button.-grey"],"declarations":[{"type":"declaration","property":"border-color","value":"#5c687c"},{"type":"declaration","property":"color","value":"#5c687c"}]},{"type":"rule","selectors":[".ns-root Button.-grey.-primary",".ns-root .nt-button.-grey.-primary"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#5c687c"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-grey.-primary",".ns-dark.ns-root .nt-button.-grey.-primary"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#5c687c"}]},{"type":"rule","selectors":[".ns-root Button.-lemon",".ns-root .nt-button.-lemon"],"declarations":[{"type":"declaration","property":"border-color","value":"#ffea00"},{"type":"declaration","property":"color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-lemon",".ns-dark.ns-root .nt-button.-lemon"],"declarations":[{"type":"declaration","property":"border-color","value":"#ffea00"},{"type":"declaration","property":"color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-root Button.-lemon.-primary",".ns-root .nt-button.-lemon.-primary"],"declarations":[{"type":"declaration","property":"color","value":"black"},{"type":"declaration","property":"background-color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-lemon.-primary",".ns-dark.ns-root .nt-button.-lemon.-primary"],"declarations":[{"type":"declaration","property":"color","value":"black"},{"type":"declaration","property":"background-color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-root Button.-lime",".ns-root .nt-button.-lime"],"declarations":[{"type":"declaration","property":"border-color","value":"#aee406"},{"type":"declaration","property":"color","value":"#aee406"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-lime",".ns-dark.ns-root .nt-button.-lime"],"declarations":[{"type":"declaration","property":"border-color","value":"#aee406"},{"type":"declaration","property":"color","value":"#aee406"}]},{"type":"rule","selectors":[".ns-root Button.-lime.-primary",".ns-root .nt-button.-lime.-primary"],"declarations":[{"type":"declaration","property":"color","value":"black"},{"type":"declaration","property":"background-color","value":"#aee406"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-lime.-primary",".ns-dark.ns-root .nt-button.-lime.-primary"],"declarations":[{"type":"declaration","property":"color","value":"black"},{"type":"declaration","property":"background-color","value":"#aee406"}]},{"type":"rule","selectors":[".ns-root Button.-orange",".ns-root .nt-button.-orange"],"declarations":[{"type":"declaration","property":"border-color","value":"#f57c00"},{"type":"declaration","property":"color","value":"#f57c00"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-orange",".ns-dark.ns-root .nt-button.-orange"],"declarations":[{"type":"declaration","property":"border-color","value":"#f57c00"},{"type":"declaration","property":"color","value":"#f57c00"}]},{"type":"rule","selectors":[".ns-root Button.-orange.-primary",".ns-root .nt-button.-orange.-primary"],"declarations":[{"type":"declaration","property":"color","value":"black"},{"type":"declaration","property":"background-color","value":"#f57c00"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-orange.-primary",".ns-dark.ns-root .nt-button.-orange.-primary"],"declarations":[{"type":"declaration","property":"color","value":"black"},{"type":"declaration","property":"background-color","value":"#f57c00"}]},{"type":"rule","selectors":[".ns-root Button.-purple",".ns-root .nt-button.-purple"],"declarations":[{"type":"declaration","property":"border-color","value":"#8130ff"},{"type":"declaration","property":"color","value":"#8130ff"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-purple",".ns-dark.ns-root .nt-button.-purple"],"declarations":[{"type":"declaration","property":"border-color","value":"#8130ff"},{"type":"declaration","property":"color","value":"#8130ff"}]},{"type":"rule","selectors":[".ns-root Button.-purple.-primary",".ns-root .nt-button.-purple.-primary"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#8130ff"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-purple.-primary",".ns-dark.ns-root .nt-button.-purple.-primary"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#8130ff"}]},{"type":"rule","selectors":[".ns-root Button.-ruby",".ns-root .nt-button.-ruby"],"declarations":[{"type":"declaration","property":"border-color","value":"#ff1744"},{"type":"declaration","property":"color","value":"#ff1744"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-ruby",".ns-dark.ns-root .nt-button.-ruby"],"declarations":[{"type":"declaration","property":"border-color","value":"#ff1744"},{"type":"declaration","property":"color","value":"#ff1744"}]},{"type":"rule","selectors":[".ns-root Button.-ruby.-primary",".ns-root .nt-button.-ruby.-primary"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#ff1744"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-ruby.-primary",".ns-dark.ns-root .nt-button.-ruby.-primary"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#ff1744"}]},{"type":"rule","selectors":[".ns-root Button.-sky",".ns-root .nt-button.-sky"],"declarations":[{"type":"declaration","property":"border-color","value":"#30bcff"},{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-sky",".ns-dark.ns-root .nt-button.-sky"],"declarations":[{"type":"declaration","property":"border-color","value":"#30bcff"},{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-root Button.-sky.-primary",".ns-root .nt-button.-sky.-primary"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-sky.-primary",".ns-dark.ns-root .nt-button.-sky.-primary"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#30bcff"}]},{"type":"rule","selectors":["Frame",".nt-frame"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark Frame",".ns-dark .nt-frame"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"rule","selectors":["Page",".nt-page"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark Page",".ns-dark .nt-page"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"rule","selectors":["ActivityIndicator",".nt-activity-indicator"],"declarations":[{"type":"declaration","property":"width","value":"30"},{"type":"declaration","property":"height","value":"30"}]},{"type":"rule","selectors":["Slider",".nt-slider"],"declarations":[{"type":"declaration","property":"margin","value":"20 16"}]},{"type":"rule","selectors":[".ns-ios Slider",".ns-ios .nt-slider"],"declarations":[{"type":"declaration","property":"margin","value":"10 15"}]},{"type":"rule","selectors":["Slider[isEnabled=false]",".nt-slider[isEnabled=false]"],"declarations":[{"type":"declaration","property":"background-color","value":"#e0e0e0"},{"type":"declaration","property":"color","value":"#e0e0e0"}]},{"type":"rule","selectors":[".ns-android Switch",".ns-android .nt-switch"],"declarations":[{"type":"declaration","property":"margin","value":"14 16"}]},{"type":"rule","selectors":[".ns-android Switch[isEnabled=false]",".ns-android .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#e6e6e6"}]},{"type":"rule","selectors":[".ns-dark.ns-android Switch[isEnabled=false]",".ns-dark.ns-android .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#4a4a4a"}]},{"type":"rule","selectors":[".ns-ios Switch",".ns-ios .nt-switch"],"declarations":[{"type":"declaration","property":"margin","value":"8 15"}]},{"type":"rule","selectors":[".ns-ios Switch[isEnabled=false]",".ns-ios .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(48, 188, 255, 0.4)"}]},{"type":"rule","selectors":[".ns-dark.ns-ios Switch[isEnabled=false]",".ns-dark.ns-ios .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(99, 205, 255, 0.4)"}]},{"type":"rule","selectors":["TabView",".nt-tab-view"],"declarations":[{"type":"declaration","property":"tab-text-font-size","value":"14"},{"type":"declaration","property":"text-transform","value":"capitalize"}]},{"type":"rule","selectors":["BottomNavigation",".nt-bottom-navigation"],"declarations":[{"type":"declaration","property":"font-size","value":"10"}]},{"type":"rule","selectors":["ListView","RadListView",".nt-list-view"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"}]},{"type":"rule","selectors":["ListView StackLayout","RadListView StackLayout",".nt-list-view StackLayout"],"declarations":[{"type":"declaration","property":"padding","value":"8"}]},{"type":"rule","selectors":["ListView > *","RadListView > *",".nt-list-view > *"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"},{"type":"declaration","property":"padding","value":"8"},{"type":"declaration","property":"margin","value":"0"}]},{"type":"rule","selectors":["ListView > * Label","RadListView > * Label",".nt-list-view > * Label"],"declarations":[{"type":"declaration","property":"padding","value":"5"},{"type":"declaration","property":"vertical-align","value":"center"}]},{"type":"rule","selectors":["ListView .thumb","ListView .-thumb","RadListView .thumb","RadListView .-thumb",".nt-list-view .thumb",".nt-list-view .-thumb"],"declarations":[{"type":"declaration","property":"stretch","value":"fill"},{"type":"declaration","property":"width","value":"40"},{"type":"declaration","property":"height","value":"40"},{"type":"declaration","property":"min-height","value":"0"},{"type":"declaration","property":"margin-right","value":"16"}]},{"type":"rule","selectors":["ListView.-single-col-cards Image","RadListView.-single-col-cards Image",".nt-list-view.-single-col-cards Image"],"declarations":[{"type":"declaration","property":"width","value":"100%"},{"type":"declaration","property":"height","value":"200"}]},{"type":"rule","selectors":["ListView.-two-col-cards Image","RadListView.-two-col-cards Image",".nt-list-view.-two-col-cards Image"],"declarations":[{"type":"declaration","property":"height","value":"100"}]},{"type":"rule","selectors":[".ns-ios ListView.-two-col-cards > StackLayout",".ns-ios RadListView.-two-col-cards > StackLayout",".ns-ios .nt-list-view.-two-col-cards > StackLayout"],"declarations":[{"type":"declaration","property":"width","value":"50%"}]},{"type":"rule","selectors":[".ns-ios ListView.-two-col-cards > StackLayout Image",".ns-ios RadListView.-two-col-cards > StackLayout Image",".ns-ios .nt-list-view.-two-col-cards > StackLayout Image"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"left"},{"type":"declaration","property":"width","value":"100%"}]},{"type":"rule","selectors":["ListView.-two-lines-image Image","ListView.-single-line-image Image","RadListView.-two-lines-image Image","RadListView.-single-line-image Image",".nt-list-view.-two-lines-image Image",".nt-list-view.-single-line-image Image"],"declarations":[{"type":"declaration","property":"width","value":"60"},{"type":"declaration","property":"height","value":"60"},{"type":"declaration","property":"margin-right","value":"10"},{"type":"declaration","property":"margin-bottom","value":"0"}]},{"type":"rule","selectors":["ListView .-separator","RadListView .-separator",".nt-list-view .-separator"],"declarations":[{"type":"declaration","property":"border-bottom-width","value":"1"}]},{"type":"rule","selectors":["ListView .nt-list-view__delete","RadListView .nt-list-view__delete",".nt-list-view .nt-list-view__delete"],"declarations":[{"type":"declaration","property":"padding","value":"0 10"}]},{"type":"rule","selectors":[".ns-ios ListView .nt-list-view__delete",".ns-ios RadListView .nt-list-view__delete",".ns-ios .nt-list-view .nt-list-view__delete"],"declarations":[{"type":"declaration","property":"padding","value":"0 10 0 25"}]},{"type":"rule","selectors":["ListView .nt-list-view__delete > Label","RadListView .nt-list-view__delete > Label",".nt-list-view .nt-list-view__delete > Label"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"center"},{"type":"declaration","property":"vertical-align","value":"center"},{"type":"declaration","property":"text-transform","value":"capitalize"}]},{"type":"rule","selectors":["ListView .nt-icon","RadListView .nt-icon",".nt-list-view .nt-icon"],"declarations":[{"type":"declaration","property":"font-size","value":"16"},{"type":"declaration","property":"width","value":"56"},{"type":"declaration","property":"height","value":"100%"},{"type":"declaration","property":"text-align","value":"center"}]},{"type":"rule","selectors":["RadListView > StackLayout"],"declarations":[{"type":"declaration","property":"padding","value":"0"}]},{"type":"rule","selectors":["RadListView > * > *"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header",".nt-drawer .nt-drawer__header"],"declarations":[{"type":"declaration","property":"width","value":"100%"},{"type":"declaration","property":"vertical-align","value":"top"},{"type":"declaration","property":"padding","value":"35 0"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header Label",".nt-drawer .nt-drawer__header Label"],"declarations":[{"type":"declaration","property":"padding","value":"0"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header > Label",".nt-drawer .nt-drawer__header > Label"],"declarations":[{"type":"declaration","property":"font-size","value":"18"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header-image",".nt-drawer .nt-drawer__header-image"],"declarations":[{"type":"declaration","property":"height","value":"74"},{"type":"declaration","property":"width","value":"74"},{"type":"declaration","property":"border-radius","value":"50%"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header-footnote",".nt-drawer .nt-drawer__header-footnote"],"declarations":[{"type":"declaration","property":"opacity","value":".5"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header > Label","RadSideDrawer .nt-drawer__header-image",".nt-drawer .nt-drawer__header > Label",".nt-drawer .nt-drawer__header-image"],"declarations":[{"type":"declaration","property":"margin-left","value":"15"},{"type":"declaration","property":"margin-right","value":"15"},{"type":"declaration","property":"horizontal-align","value":"center"},{"type":"declaration","property":"text-align","value":"center"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header.-left > Label","RadSideDrawer .nt-drawer__header.-left .nt-drawer__header-image",".nt-drawer .nt-drawer__header.-left > Label",".nt-drawer .nt-drawer__header.-left .nt-drawer__header-image"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"left"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__list-item",".nt-drawer .nt-drawer__list-item"],"declarations":[{"type":"declaration","property":"padding-left","value":"15"},{"type":"declaration","property":"height","value":"48"},{"type":"declaration","property":"horizontal-align","value":"left"},{"type":"declaration","property":"width","value":"100%"},{"type":"declaration","property":"orientation","value":"horizontal"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__list-item Label",".nt-drawer .nt-drawer__list-item Label"],"declarations":[{"type":"declaration","property":"vertical-align","value":"center"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__list-item .nt-icon",".nt-drawer .nt-drawer__list-item .nt-icon"],"declarations":[{"type":"declaration","property":"font-size","value":"12"},{"type":"declaration","property":"width","value":"30"}]},{"type":"rule","selectors":["RadSideDrawer.ns-dark .nt-drawer__header",".nt-drawer.ns-dark .nt-drawer__header"],"declarations":[{"type":"declaration","property":"background-color","value":"#1e1e1e"}]},{"type":"rule","selectors":["RadSideDrawer.ns-dark .nt-drawer__header Label",".nt-drawer.ns-dark .nt-drawer__header Label"],"declarations":[{"type":"declaration","property":"color","value":"white"}]},{"type":"rule","selectors":["Form",".nt-form"],"declarations":[{"type":"declaration","property":"padding","value":"16 0 10"}]},{"type":"rule","selectors":["Form .-center",".nt-form .-center"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"center"}]},{"type":"rule","selectors":["Form .nt-form__or-separator",".nt-form .nt-form__or-separator"],"declarations":[{"type":"declaration","property":"margin","value":"20 0"}]},{"type":"rule","selectors":["Form .nt-form__logo",".nt-form .nt-form__logo"],"declarations":[{"type":"declaration","property":"margin","value":"20 0"},{"type":"declaration","property":"width","value":"50%"}]},{"type":"rule","selectors":["Form .nt-form__validation-message",".nt-form .nt-form__validation-message"],"declarations":[{"type":"declaration","property":"margin","value":"1 0 0"},{"type":"declaration","property":"padding","value":"0"},{"type":"declaration","property":"height","value":"19"}]},{"type":"rule","selectors":["Form .nt-form__footer",".nt-form .nt-form__footer"],"declarations":[{"type":"declaration","property":"padding","value":"0"},{"type":"declaration","property":"horizontal-align","value":"center"}]},{"type":"rule","selectors":["Form .nt-form__footer Button",".nt-form .nt-form__footer Button"],"declarations":[{"type":"declaration","property":"width","value":"50%"},{"type":"declaration","property":"margin","value":"5"}]},{"type":"comment","comment":" Form Validation styling "},{"type":"rule","selectors":["TextView.ng-valid","TextField.ng-valid","PickerField.ng-valid","DatePickerField.ng-valid","TimePickerField.ng-valid","RadAutoCompleteTextView.ng-valid"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"20"}]},{"type":"rule","selectors":["TextView.ng-invalid.ng-dirty","TextField.ng-invalid.ng-dirty","PickerField.ng-invalid.ng-dirty","DatePickerField.ng-invalid.ng-dirty","TimePickerField.ng-invalid.ng-dirty","RadAutoCompleteTextView.ng-invalid.ng-dirty"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"0"},{"type":"declaration","property":"border-color","value":"#d50000"}]},{"type":"comment","comment":" Form fields "},{"type":"rule","selectors":["TextView","TextField","PickerField","DatePickerField","TimePickerField","DateTimePickerFields","DataFormEditorCore","RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"border-width","value":"0 0 1"},{"type":"declaration","property":"border-radius","value":"0"},{"type":"declaration","property":"background-color","value":"transparent"},{"type":"declaration","property":"font-size","value":"12"},{"type":"declaration","property":"padding","value":"8 0 4"},{"type":"declaration","property":"margin","value":"5 16"}]},{"type":"rule","selectors":["TextView.-rounded-sm","TextView.-rounded-lg","TextView.-border","TextField.-rounded-sm","TextField.-rounded-lg","TextField.-border","PickerField.-rounded-sm","PickerField.-rounded-lg","PickerField.-border","DatePickerField.-rounded-sm","DatePickerField.-rounded-lg","DatePickerField.-border","TimePickerField.-rounded-sm","TimePickerField.-rounded-lg","TimePickerField.-border","DateTimePickerFields.-rounded-sm","DateTimePickerFields.-rounded-lg","DateTimePickerFields.-border","DataFormEditorCore.-rounded-sm","DataFormEditorCore.-rounded-lg","DataFormEditorCore.-border","RadAutoCompleteTextView.-rounded-sm","RadAutoCompleteTextView.-rounded-lg","RadAutoCompleteTextView.-border"],"declarations":[{"type":"declaration","property":"border-width","value":"1"},{"type":"declaration","property":"padding","value":"12 14"}]},{"type":"rule","selectors":["TextView.-rounded-sm","TextField.-rounded-sm","PickerField.-rounded-sm","DatePickerField.-rounded-sm","TimePickerField.-rounded-sm","DateTimePickerFields.-rounded-sm","DataFormEditorCore.-rounded-sm","RadAutoCompleteTextView.-rounded-sm"],"declarations":[{"type":"declaration","property":"border-radius","value":"4"}]},{"type":"rule","selectors":["TextView.-rounded-lg","TextField.-rounded-lg","PickerField.-rounded-lg","DatePickerField.-rounded-lg","TimePickerField.-rounded-lg","DateTimePickerFields.-rounded-lg","DataFormEditorCore.-rounded-lg","RadAutoCompleteTextView.-rounded-lg"],"declarations":[{"type":"declaration","property":"border-radius","value":"50%"}]},{"type":"rule","selectors":["TextView[isEnabled=false]","TextField[isEnabled=false]","PickerField[isEnabled=false]","DatePickerField[isEnabled=false]","TimePickerField[isEnabled=false]","DateTimePickerFields[isEnabled=false]","DataFormEditorCore[isEnabled=false]","RadAutoCompleteTextView[isEnabled=false]"],"declarations":[{"type":"declaration","property":"opacity","value":"0.5"}]},{"type":"rule","selectors":["TextView[editable=false]"],"declarations":[{"type":"declaration","property":"border-width","value":"0"}]},{"type":"rule","selectors":["Label","DataFormEditorLabel"],"declarations":[{"type":"declaration","property":"padding","value":"2 0"}]},{"type":"rule","selectors":["TextView"],"declarations":[{"type":"declaration","property":"min-height","value":"100"}]},{"type":"rule","selectors":["RadAutoCompleteTextView[displayMode=Tokens]"],"declarations":[{"type":"declaration","property":"padding","value":"4 0 8"}]},{"type":"rule","selectors":["RadAutoCompleteTextView Token"],"declarations":[{"type":"declaration","property":"border-radius","value":"50%"}]},{"type":"rule","selectors":[".ns-android TokenClearButton"],"declarations":[{"type":"declaration","property":"width","value":"18"},{"type":"declaration","property":"height","value":"18"},{"type":"declaration","property":"border-radius","value":"50%"},{"type":"declaration","property":"opacity","value":".6"}]},{"type":"comment","comment":" Date Picker "},{"type":"rule","selectors":["PickerField","DatePickerField","TimePickerField","DateTimePickerFields","DataFormEditorCore","RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"background-repeat","value":"no-repeat"},{"type":"declaration","property":"background-position","value":"right center"}]},{"type":"rule","selectors":[".ns-ios PickerField",".ns-ios\n  DatePickerField",".ns-ios\n  TimePickerField",".ns-ios\n  DateTimePickerFields",".ns-ios\n  DataFormEditorCore",".ns-ios\n  RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"background-size","value":"28 16"}]},{"type":"rule","selectors":["PropertyEditor[type='Date'] DataFormEditorCore","DatePickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAwBAMAAAB9IEC+AAAAD1BMVEVHcEwAAAAAAAAAAAAAAADTrAj/AAAABHRSTlMAwBAgU5DCQwAAAFdJREFUSMdjYCAVuLi4oDHop5RJxAUDOCpgVcroggUIYFXKgk2pMw6lChhudXHAoZSBVkrRw26EKcUC6Kt0NAoGkVIWaFSNKh25Sgd7QURCZURCFUcLAAC2I2hEECBYPgAAAABJRU5ErkJggg==\")"}]},{"type":"comment","comment":" Time Picker "},{"type":"rule","selectors":["PropertyEditor[type='Time'] DataFormEditorCore","TimePickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAwBAMAAAB9IEC+AAAALVBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACttl6nAAAADnRSTlMAYOBAwCAQ0FCAcPCwoEZwdhsAAAE2SURBVEjHY2AYLIB1Td27d89PBRBWyQhUCALPBQiq1HsHBY8IqGX1e/fuyWRjY0sQjd8N3e/eKSaAGGxC797twGs9UCWMDVSLzwly794mwNhs9949xK2SA8UgoBUNOJVGo5oj924rTqV+EEP53sGMfYLbU28ZkJUy3MPpMaZ3aqhKk94p4PS/AKpSRpxhUPeIAVUpg95zHJEKMwOhVO4d9sjlevcMXWneuwVYlfK8c0BXyvLuAI4AmICulPNdAValfO8M0JVyvHtArFJmqiqFACopbSBWKTsssBAAV2DBowABcEUBPGIRAFfEsmImOVzJBZ4IEQBXIoQnbaQc9JBAhoED3BkGlg3hAHc2hGVuhNYn1CgySCiISCjeSCk0SSiKIQX8DGPjTsIFPAnVBimVESlV3IABAKDkz5jHIcToAAAAAElFTkSuQmCC\")"}]},{"type":"comment","comment":" Date/Time Picker "},{"type":"rule","selectors":["DateTimePickerFields"],"declarations":[{"type":"declaration","property":"padding","value":"0"},{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAAAwBAMAAAB3UCypAAAALVBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACttl6nAAAADnRSTlMAQGDgwBAg0FCAcPCwoM9Ie+kAAAGcSURBVEjH5Ze/TsMwEMZD2pQWVRUZu0VijxASa8UTVJXYUXYWniDqilhgY+QBmBEjMw9RtTQlU79nICRyrDjxxYkdqYhviYe7X87/7s6WlQqAMDCgPwF15igpWhAOg9cQiD8DCtpHha7k9naYmcQeAZ1UQb/lzBmz2XoUdFFaU2ykc08WK3py3envNyCgVgPoA3CRLrhzBrybgdoJk40TqkdCxRMmg/rY5wfDWeHLBHRYCC4Je2kAeluMzcebAeg8C5S52Ij0oTb2RZeVbKsaQHu4LLpc47zBjdpI9t4rQm3Z/jeAhltxcrNYFzpgcXGoj0BzTU+wE11u8KIJHbOMyF36+NCE9vAouowk268OneBUdBlibR56dPDQTAcMXbaBZtZrCfSYHSmuEe40oeNyO6By+Glofk25VK4pDR2UE51KQqGheerjkqc+ZagvVg8iSStDWTnJRZQTZSgrfLmUCl8NlJVo/hOVEl0HbdVM1EFbtT110E4atG5ayUZNrzI0bc+fXfe+rj2v0E7zIdHJk6eTx5nluCUF1j/RDxQQPw3i9N+zAAAAAElFTkSuQmCC\")"}]},{"type":"rule","selectors":[".ns-ios DateTimePickerFields"],"declarations":[{"type":"declaration","property":"background-size","value":"56 16"}]},{"type":"rule","selectors":["DateTimePickerFields .input","DateTimePickerFields DatePickerField","DateTimePickerFields TimePickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"none"},{"type":"declaration","property":"border-width","value":"0"},{"type":"declaration","property":"margin","value":"0"}]},{"type":"rule","selectors":[".ns-dark DateTimePickerFields .input",".ns-dark\n    DateTimePickerFields DatePickerField",".ns-dark\n    DateTimePickerFields TimePickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"none"},{"type":"declaration","property":"background-color","value":"transparent"}]},{"type":"rule","selectors":["DateTimePickerFields TimePickerField"],"declarations":[{"type":"declaration","property":"margin-left","value":"-30"}]},{"type":"comment","comment":" Picker "},{"type":"rule","selectors":["PickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAwBAMAAAB9IEC+AAAAGFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAABoAtTLAAAAB3RSTlMAoPAw0BAgCEJU4wAAAEpJREFUSMdjYBgFgwUwChCtVLyQaEPLy4k1Nqm8nFhjmdWJN9Zo1NghZiwJSol3wKihA2ooCZk7hPj0x+pOdEHEEEJ88TYKBgoAAAC5JRg49rIWAAAAAElFTkSuQmCC\")"}]},{"type":"rule","selectors":["PickerPage.input"],"declarations":[{"type":"declaration","property":"padding","value":"0"},{"type":"declaration","property":"margin","value":"0"}]},{"type":"rule","selectors":["PickerPage ListView"],"declarations":[{"type":"declaration","property":"separator-color","value":"transparent"}]},{"type":"rule","selectors":["PickerPage ListView > *"],"declarations":[{"type":"declaration","property":"height","value":"48"},{"type":"declaration","property":"margin-top","value":"0"},{"type":"declaration","property":"padding","value":"10 12"},{"type":"declaration","property":"border-bottom-width","value":"1px"}]},{"type":"rule","selectors":[".ns-dark PickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAwBAMAAAB9IEC+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURUdwTP///////////////////////////x1LVb4AAAAHdFJOUwCg8DDQECAIQlTjAAAASklEQVRIx2NgGAWDBTAKEK1UvJBoQ8vLiTU2qbycWGOZ1Yk31mjU2CFmLAlKiXfAqKEDaigJmTuE+PTH6k50QcQQQnzxNgoGCgAAALklGDj2shYAAAAASUVORK5CYII=\")"}]},{"type":"rule","selectors":[".ns-dark DatePickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAwBAMAAAB9IEC+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAPUExURUdwTP///////////////xPgMRoAAAAEdFJOUwDAECBTkMJDAAAAV0lEQVRIx2NgIBW4uLigMeinlEnEBQM4KmBVyuiCBQhgVcqCTakzDqUKGG51ccChlIFWStHDboQpxQLoq3Q0CgaRUhZoVI0qHblKB3tBREJlREIVRwsAALYjaEQQIFg+AAAAAElFTkSuQmCC\")"}]},{"type":"rule","selectors":[".ns-dark TimePickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAwBAMAAAB9IEC+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURUdwTP///////////////////////////////////////////////////////81e3QIAAAAOdFJOUwBg4EDAIBDQUHDwsKCA4isvJAAAATZJREFUSMdjYBgsgHV23bt3z3cGEFbJCFQIAs8FCKrUewcFjwioZfV79+7JZWNjWxCN3w1d794pJoAYbELv3q3Aaz1QJYwNVIvPCXLv3iTA2Gzn3j3ErZIDxSCgFQ04lUahmiP3bilOpX4QQ/newYx9gttTbxiQlTKcw+kxpndqqEqT3ing9L8AqlJGnGFQ94gBVSmD3nMckQozA6FU7h32yOV89wxdad67CViVcr9zQFfK8m4DjgC4gK6U910BVqV87wzQlXK8e0CsUmaqKoUAKiltIFYpOyywEABXYMGjAAFwRQE8YhEAV8SyYiY5XMkFnggRAFcihCdtpBz0kECGgQPcGQaWDeEAdzaEZW6E1ifUKDJIKIhIKN5IKTRJKIohBfwNY+NewgU8CdUGKZURKVXcgAEAq1LPmF1qDewAAAAASUVORK5CYII=\")"}]},{"type":"rule","selectors":[".ns-dark DateTimePickerFields"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAAAwBAMAAAB3UCypAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURUdwTP///////////////////////////////////////////////////////81e3QIAAAAOdFJOUwBAYODAECDQUHDwsKCAaxMi1gAAAZxJREFUSMfll89Kw0AQxmPa1EppMQ9QCHgPIngtPkEpeJecPfkEoWdB8O5dPHr1JYrePLY2NZfyPYMxYbNkk51sshuo+F2yh5lfZv/NzFpWKgDCwID+BNSZo6RoQTgMnkIgfgsoaB8VupLb22FmEnsEdFIF/ZYzZ8xm61HQRWlNsZHOPVms6MN1p7/fgIBaDaD3wEW64M4Z8GIGaidMNk6oHgkVT5gM6mOfHwxnhS8T0GEhuCTspQHobTE2H88GoPMsUOZiI9KH2tgXXVayrWoA7eGy6HKN8wY3aiPZe68ItWX73wAabsXJzWJd6IDFxaE+As01PcFOdLnBoyZ0xDIid+njVRPaw7voMpZsvzp0glPRZYi1eejRwUMzHTB02QaaWa8l0GN2pLjGuNOEjsrtgMrhp6H5NeVSuaY0dFBOdCoJhYbmqY9LnvqUob5YPYgkrQxl5SQXUU6Uoazw5VIqfDVQVqL5T1RKdB20VTNRB23V9tRBO2nQumklGzW9ytC0Pf903Ye69rxCO82HRCdPnk4eZ5bjlhRY/0Q/Hn4/DfXSncYAAAAASUVORK5CYII=\")"}]},{"type":"rule","selectors":[".ns-dark PickerField",".ns-dark DatePickerField",".ns-dark TimePickerField",".ns-dark DateTimePickerFields",".ns-dark RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"class","value":"ns-dark"}]},{"type":"rule","selectors":["RadDataForm PropertyEditor"],"declarations":[{"type":"declaration","property":"padding","value":"5 0 0"}]},{"type":"rule","selectors":[".nt-input"],"declarations":[{"type":"declaration","property":"margin","value":"10 0"}]},{"type":"rule","selectors":["DataFormEditorLabel",".nt-input > Label"],"declarations":[{"type":"declaration","property":"font-size","value":"12"},{"type":"declaration","property":"color","value":"#bababa"}]},{"type":"rule","selectors":["DataFormEditorLabel",".nt-input > Label",".nt-input > TextView","> TextField","> PickerField","> DatePickerField","> TimePickerField","> DateTimePickerFields","> RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"margin","value":"0 16"}]},{"type":"rule","selectors":[".nt-input.-sides"],"declarations":[{"type":"declaration","property":"margin","value":"0 0 10"}]},{"type":"rule","selectors":[".nt-input.-sides > Label"],"declarations":[{"type":"declaration","property":"margin","value":"5 16"}]},{"type":"rule","selectors":[".nt-input > .nt-icon"],"declarations":[{"type":"declaration","property":"font-size","value":"16"},{"type":"declaration","property":"vertical-align","value":"center"},{"type":"declaration","property":"horizontal-align","value":"right"},{"type":"declaration","property":"margin","value":"-15 10 0 0"}]},{"type":"rule","selectors":["ActionBar",".nt-action-bar"],"declarations":[{"type":"declaration","property":"font-size","value":"14"}]},{"type":"rule","selectors":[".ns-ios ActionBar",".ns-ios .nt-action-bar"],"declarations":[{"type":"declaration","property":"margin-left","value":"20"},{"type":"declaration","property":"vertical-align","value":"stretch"},{"type":"declaration","property":"horizontal-align","value":"stretch"}]},{"type":"rule","selectors":[".ns-landscape.ns-ios ActionBar",".ns-landscape.ns-ios .nt-action-bar"],"declarations":[{"type":"declaration","property":"margin-left","value":"100"},{"type":"declaration","property":"padding","value":"0 5"}]},{"type":"rule","selectors":["ActionBar Label","ActionBar Button","ActionBar .nt-action-bar__item",".nt-action-bar Label",".nt-action-bar Button",".nt-action-bar .nt-action-bar__item"],"declarations":[{"type":"declaration","property":"android-elevation","value":"0"},{"type":"declaration","property":"font-size","value":"12"},{"type":"declaration","property":"padding","value":"12 10 12 0"},{"type":"declaration","property":"margin","value":"0"},{"type":"declaration","property":"min-width","value":"0"},{"type":"declaration","property":"width","value":"auto"},{"type":"declaration","property":"border-width","value":"0"},{"type":"declaration","property":"text-transform","value":"none"},{"type":"declaration","property":"font-weight","value":"normal"}]},{"type":"rule","selectors":["ActionBar Label:active","ActionBar Button:active","ActionBar .nt-action-bar__item:active",".nt-action-bar Label:active",".nt-action-bar Button:active",".nt-action-bar .nt-action-bar__item:active"],"declarations":[{"type":"declaration","property":"opacity","value":".7"}]},{"type":"rule","selectors":["ActionBar > Label",".nt-action-bar > Label"],"declarations":[{"type":"declaration","property":"font-weight","value":"bold"},{"type":"declaration","property":"font-size","value":"14"}]},{"type":"rule","selectors":[".ns-statusbar-transparent Page > ActionBar",".ns-statusbar-transparent Page > .nt-action-bar"],"declarations":[{"type":"declaration","property":"padding-top","value":"24"}]},{"type":"rule","selectors":[".ns-android__19.ns-statusbar-transparent Page > ActionBar",".ns-modal.ns-statusbar-transparent Page > ActionBar",".ns-android__19.ns-statusbar-transparent Page > .nt-action-bar",".ns-modal.ns-statusbar-transparent Page > .nt-action-bar"],"declarations":[{"type":"declaration","property":"padding-top","value":"0"}]},{"type":"rule","selectors":[".ns-android ActionBar Button",".ns-android ActionBar .nt-button",".ns-android .nt-action-bar Button",".ns-android .nt-action-bar .nt-button"],"declarations":[{"type":"declaration","property":"padding","value":"0 6"}]},{"type":"rule","selectors":[".ns-android ActionBar > Label",".ns-android .nt-action-bar > Label"],"declarations":[{"type":"declaration","property":"width","value":"100%"}]},{"type":"rule","selectors":["ActionBar > Label","ActionBar > GridLayout Label",".nt-action-bar > Label",".nt-action-bar > GridLayout Label"],"declarations":[{"type":"declaration","property":"font-size","value":"14"},{"type":"declaration","property":"vertical-align","value":"center"},{"type":"declaration","property":"text-align","value":"center"}]},{"type":"rule","selectors":["ActionBar > GridLayout",".nt-action-bar > GridLayout"],"declarations":[{"type":"declaration","property":"width","value":"100%"},{"type":"declaration","property":"height","value":"100%"}]},{"type":"rule","selectors":["ActionBar > GridLayout > StackLayout",".nt-action-bar > GridLayout > StackLayout"],"declarations":[{"type":"declaration","property":"padding","value":"0"},{"type":"declaration","property":"horizontal-align","value":"left"}]},{"type":"rule","selectors":["ActionBar > GridLayout Button",".nt-action-bar > GridLayout Button"],"declarations":[{"type":"declaration","property":"padding","value":"12 10"},{"type":"declaration","property":"horizontal-align","value":"left"}]},{"type":"rule","selectors":["ActionBar > GridLayout [col=\"2\"]",".nt-action-bar > GridLayout [col=\"2\"]"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"right"}]},{"type":"rule","selectors":[".ns-android ActionBar > GridLayout",".ns-android .nt-action-bar > GridLayout"],"declarations":[{"type":"declaration","property":"padding","value":"0 4"}]},{"type":"rule","selectors":[".ns-android ActionBar > GridLayout Button",".ns-android .nt-action-bar > GridLayout Button"],"declarations":[{"type":"declaration","property":"padding","value":"12 16"},{"type":"declaration","property":"margin","value":"0"}]},{"type":"comment","comment":"!\n * NativeScript Theme __VERSION__ (https://nativescript.org)\n * Copyright 2016-2016 The Theme Authors\n * Copyright 2016-2019 Progress Software\n * Licensed under Apache 2.0 (https://github.com/NativeScript/theme/blob/master/LICENSE)\n "},{"type":"keyframes","name":"empty","keyframes":[]},{"type":"comment","comment":" Forms "},{"type":"comment","comment":"*\n * Blue variable overrides\n *"},{"type":"rule","selectors":["Button",".nt-button"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"},{"type":"declaration","property":"color","value":"#004363"}]},{"type":"rule","selectors":[".ns-dark Button",".ns-dark .nt-button"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"},{"type":"declaration","property":"color","value":"white"}]},{"type":"rule","selectors":["Button:active","Button.-active",".nt-button:active",".nt-button.-active"],"declarations":[{"type":"declaration","property":"color","value":"#004363"}]},{"type":"rule","selectors":[".ns-dark Button:active",".ns-dark Button.-active",".ns-dark .nt-button:active",".ns-dark .nt-button.-active"],"declarations":[{"type":"declaration","property":"color","value":"white"}]},{"type":"rule","selectors":["Button.-outline",".nt-button.-outline"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"},{"type":"declaration","property":"border-color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark Button.-outline",".ns-dark .nt-button.-outline"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"},{"type":"declaration","property":"border-color","value":"#63cdff"}]},{"type":"keyframes","name":"-hightlight-light","keyframes":[{"type":"keyframe","values":["0%"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"keyframe","values":["100%"],"declarations":[{"type":"declaration","property":"background-color","value":"#f2f2f2"}]}]},{"type":"keyframes","name":"-hightlight-dark","keyframes":[{"type":"keyframe","values":["0%"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"keyframe","values":["100%"],"declarations":[{"type":"declaration","property":"background-color","value":"#232323"}]}]},{"type":"rule","selectors":["Button.-outline:active","Button.-outline.-active",".nt-button.-outline:active",".nt-button.-outline.-active"],"declarations":[{"type":"declaration","property":"animation","value":"-hightlight-light 0.3s ease-out forwards"},{"type":"declaration","property":"background-color","value":"#f2f2f2"}]},{"type":"rule","selectors":[".ns-dark Button.-outline:active",".ns-dark Button.-outline.-active",".ns-dark .nt-button.-outline:active",".ns-dark .nt-button.-outline.-active"],"declarations":[{"type":"declaration","property":"animation","value":"-hightlight-dark 0.3s ease-out forwards"},{"type":"declaration","property":"background-color","value":"#232323"}]},{"type":"rule","selectors":["Button.-primary",".nt-button.-primary"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#30bcff"},{"type":"declaration","property":"border-color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark Button.-primary",".ns-dark .nt-button.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#002030"},{"type":"declaration","property":"background-color","value":"#63cdff"},{"type":"declaration","property":"border-color","value":"#63cdff"}]},{"type":"rule","selectors":["Button.-primary:active","Button.-primary.-active",".nt-button.-primary:active",".nt-button.-primary.-active"],"declarations":[{"type":"declaration","property":"background-color","value":"#00aafc"}]},{"type":"rule","selectors":[".ns-dark Button.-primary:active",".ns-dark Button.-primary.-active",".ns-dark .nt-button.-primary:active",".ns-dark .nt-button.-primary.-active"],"declarations":[{"type":"declaration","property":"background-color","value":"#96ddff"}]},{"type":"rule","selectors":["ActivityIndicator",".nt-activity-indicator"],"declarations":[{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark ActivityIndicator",".ns-dark .nt-activity-indicator"],"declarations":[{"type":"declaration","property":"color","value":"#63cdff"}]},{"type":"rule","selectors":["SegmentedBar",".nt-segmented-bar"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background-color","value":"#fff"},{"type":"declaration","property":"selected-background-color","value":"#96ddff"}]},{"type":"rule","selectors":[".ns-dark SegmentedBar",".ns-dark .nt-segmented-bar"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#303030"},{"type":"declaration","property":"selected-background-color","value":"#00aafc"}]},{"type":"rule","selectors":[".ns-ios SegmentedBar",".ns-ios .nt-segmented-bar"],"declarations":[{"type":"declaration","property":"margin","value":"0 15"}]},{"type":"rule","selectors":["Progress",".nt-progress"],"declarations":[{"type":"declaration","property":"color","value":"#30bcff"},{"type":"declaration","property":"background-color","value":"rgba(48, 188, 255, 0.1)"}]},{"type":"rule","selectors":[".ns-dark Progress",".ns-dark .nt-progress"],"declarations":[{"type":"declaration","property":"color","value":"#63cdff"},{"type":"declaration","property":"background-color","value":"rgba(99, 205, 255, 0.1)"}]},{"type":"rule","selectors":["Slider",".nt-slider"],"declarations":[{"type":"declaration","property":"color","value":"#30bcff"},{"type":"declaration","property":"background-color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark Slider",".ns-dark .nt-slider"],"declarations":[{"type":"declaration","property":"color","value":"#63cdff"},{"type":"declaration","property":"background-color","value":"#63cdff"}]},{"type":"rule","selectors":["Slider[isEnabled=false]",".ns-android Slider[isEnabled=false]",".nt-slider[isEnabled=false]",".ns-android .nt-slider[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#e0e0e0"},{"type":"declaration","property":"background-color","value":"#e0e0e0"}]},{"type":"rule","selectors":["SearchBar",".nt-search-bar"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background-color","value":"#fff"},{"type":"declaration","property":"text-field-hint-color","value":"black"}]},{"type":"rule","selectors":[".ns-dark SearchBar",".ns-dark .nt-search-bar"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#303030"},{"type":"declaration","property":"text-field-hint-color","value":"#b3b3b3"}]},{"type":"rule","selectors":[".ns-android Switch",".ns-android .nt-switch"],"declarations":[{"type":"declaration","property":"color","value":"#cccccc"},{"type":"declaration","property":"background-color","value":"#cccccc"}]},{"type":"rule","selectors":[".ns-dark.ns-android Switch",".ns-dark.ns-android .nt-switch"],"declarations":[{"type":"declaration","property":"color","value":"#636363"},{"type":"declaration","property":"background-color","value":"#636363"}]},{"type":"rule","selectors":[".ns-android Switch[checked=true]",".ns-android .nt-switch[checked=true]"],"declarations":[{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark.ns-android Switch[checked=true]",".ns-dark.ns-android .nt-switch[checked=true]"],"declarations":[{"type":"declaration","property":"color","value":"#63cdff"}]},{"type":"rule","selectors":[".ns-android Switch[isEnabled=false]",".ns-android .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#e6e6e6"}]},{"type":"rule","selectors":[".ns-dark.ns-android Switch[isEnabled=false]",".ns-dark.ns-android .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#4a4a4a"}]},{"type":"rule","selectors":[".ns-ios Switch",".ns-ios .nt-switch"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#30bcff"},{"type":"declaration","property":"off-background-color","value":"#e6e6e6"}]},{"type":"rule","selectors":[".ns-dark.ns-ios Switch",".ns-dark.ns-ios .nt-switch"],"declarations":[{"type":"declaration","property":"color","value":"#303030"},{"type":"declaration","property":"background-color","value":"#63cdff"},{"type":"declaration","property":"off-background-color","value":"#4a4a4a"}]},{"type":"rule","selectors":[".ns-ios Switch[isEnabled=false]",".ns-ios .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(48, 188, 255, 0.4)"}]},{"type":"rule","selectors":[".ns-dark.ns-ios Switch[isEnabled=false]",".ns-dark.ns-ios .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(99, 205, 255, 0.4)"}]},{"type":"rule","selectors":["TabView",".nt-tab-view"],"declarations":[{"type":"declaration","property":"selected-tab-text-color","value":"#30bcff"},{"type":"declaration","property":"tab-background-color","value":"#fff"},{"type":"declaration","property":"tab-text-color","value":"#abd5e9"},{"type":"declaration","property":"android-selected-tab-highlight-color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark TabView",".ns-dark .nt-tab-view"],"declarations":[{"type":"declaration","property":"selected-tab-text-color","value":"#63cdff"},{"type":"declaration","property":"tab-background-color","value":"#303030"},{"type":"declaration","property":"tab-text-color","value":"#bbdae9"},{"type":"declaration","property":"android-selected-tab-highlight-color","value":"#63cdff"}]},{"type":"rule","selectors":["TabView.ns-dark",".nt-tab-view.ns-dark"],"declarations":[{"type":"declaration","property":"selected-tab-text-color","value":"#63cdff"},{"type":"declaration","property":"tab-background-color","value":"#303030"},{"type":"declaration","property":"tab-text-color","value":"#bbdae9"},{"type":"declaration","property":"android-selected-tab-highlight-color","value":"#63cdff"}]},{"type":"rule","selectors":["TabStrip",".nt-tab-strip"],"declarations":[{"type":"declaration","property":"highlight-color","value":"#30bcff"},{"type":"declaration","property":"background","value":"#f2f2f2"}]},{"type":"rule","selectors":[".ns-dark TabStrip",".ns-dark .nt-tab-strip"],"declarations":[{"type":"declaration","property":"highlight-color","value":"#63cdff"},{"type":"declaration","property":"background","value":"#3a3a3a"}]},{"type":"rule","selectors":["TabStripItem",".nt-tab-strip__item"],"declarations":[{"type":"declaration","property":"color","value":"#262626"}]},{"type":"rule","selectors":[".ns-dark TabStripItem",".ns-dark .nt-tab-strip__item"],"declarations":[{"type":"declaration","property":"color","value":"white"}]},{"type":"rule","selectors":["TabStripItem:active","TabStripItem:active Label",".nt-tab-strip__item:active",".nt-tab-strip__item:active Label"],"declarations":[{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark TabStripItem:active",".ns-dark TabStripItem:active Label",".ns-dark .nt-tab-strip__item:active",".ns-dark .nt-tab-strip__item:active Label"],"declarations":[{"type":"declaration","property":"color","value":"#63cdff"}]},{"type":"rule","selectors":["TabContentItem",".nt-tab-content__item"],"declarations":[{"type":"declaration","property":"background","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark TabContentItem",".ns-dark .nt-tab-content__item"],"declarations":[{"type":"declaration","property":"background","value":"#303030"}]},{"type":"rule","selectors":["ListView","RadListView",".nt-list-view"],"declarations":[{"type":"declaration","property":"item-selected-background-color","value":"rgba(48, 188, 255, 0.15)"},{"type":"declaration","property":"separator-color","value":"#cccccc"}]},{"type":"rule","selectors":[".ns-dark ListView",".ns-dark RadListView",".ns-dark .nt-list-view"],"declarations":[{"type":"declaration","property":"item-selected-background-color","value":"rgba(99, 205, 255, 0.15)"}]},{"type":"rule","selectors":["ListView > *.active","ListView > *:highlighted","RadListView > *.active","RadListView > *:highlighted",".nt-list-view > *.active",".nt-list-view > *:highlighted"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(48, 188, 255, 0.15)"}]},{"type":"rule","selectors":[".ns-dark ListView > *.active",".ns-dark ListView > *:highlighted",".ns-dark RadListView > *.active",".ns-dark RadListView > *:highlighted",".ns-dark .nt-list-view > *.active",".ns-dark .nt-list-view > *:highlighted"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(99, 205, 255, 0.15)"}]},{"type":"rule","selectors":["ListView .-separator","RadListView .-separator",".nt-list-view .-separator"],"declarations":[{"type":"declaration","property":"border-bottom-color","value":"#cccccc"}]},{"type":"rule","selectors":[".ns-dark ListView .-separator",".ns-dark RadListView .-separator",".ns-dark .nt-list-view .-separator"],"declarations":[{"type":"declaration","property":"border-bottom-color","value":"#636363"}]},{"type":"rule","selectors":[".ns-dark ListView",".ns-dark RadListView",".ns-dark .nt-list-view"],"declarations":[{"type":"declaration","property":"separator-color","value":"#636363"}]},{"type":"rule","selectors":["ListView .nt-list-view__delete","RadListView .nt-list-view__delete",".nt-list-view .nt-list-view__delete"],"declarations":[{"type":"declaration","property":"background-color","value":"#d50000"}]},{"type":"rule","selectors":["ListView .nt-list-view__delete > Label","RadListView .nt-list-view__delete > Label",".nt-list-view .nt-list-view__delete > Label"],"declarations":[{"type":"declaration","property":"color","value":"#262626"}]},{"type":"rule","selectors":[".ns-dark ListView .nt-list-view__delete > Label",".ns-dark RadListView .nt-list-view__delete > Label",".ns-dark .nt-list-view .nt-list-view__delete > Label"],"declarations":[{"type":"declaration","property":"color","value":"white"}]},{"type":"rule","selectors":["ListView .nt-icon","RadListView .nt-icon",".nt-list-view .nt-icon"],"declarations":[{"type":"declaration","property":"color","value":"#006698"}]},{"type":"rule","selectors":[".ns-dark ListView .nt-icon",".ns-dark RadListView .nt-icon",".ns-dark .nt-list-view .nt-icon"],"declarations":[{"type":"declaration","property":"color","value":"#63cdff"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header",".nt-drawer .nt-drawer__header"],"declarations":[{"type":"declaration","property":"background-color","value":"#213dff"}]},{"type":"rule","selectors":["RadSideDrawer > *","RadSideDrawer .nt-drawer__content",".nt-drawer > *",".nt-drawer .nt-drawer__content"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__list-item.-selected",".nt-drawer .nt-drawer__list-item.-selected"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(48, 188, 255, 0.15)"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__list-item.-selected Label",".nt-drawer .nt-drawer__list-item.-selected Label"],"declarations":[{"type":"declaration","property":"color","value":"#0088c9"}]},{"type":"rule","selectors":[".ns-dark RadSideDrawer .nt-drawer__header","RadSideDrawer.ns-dark .nt-drawer__header",".ns-dark .nt-drawer .nt-drawer__header",".nt-drawer.ns-dark .nt-drawer__header"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#1d37e3"}]},{"type":"rule","selectors":[".ns-dark RadSideDrawer > *",".ns-dark RadSideDrawer .nt-drawer__content","RadSideDrawer.ns-dark > *","RadSideDrawer.ns-dark .nt-drawer__content",".ns-dark .nt-drawer > *",".ns-dark .nt-drawer .nt-drawer__content",".nt-drawer.ns-dark > *",".nt-drawer.ns-dark .nt-drawer__content"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"rule","selectors":[".ns-dark RadSideDrawer .nt-drawer__list-item.-selected","RadSideDrawer.ns-dark .nt-drawer__list-item.-selected",".ns-dark .nt-drawer .nt-drawer__list-item.-selected",".nt-drawer.ns-dark .nt-drawer__list-item.-selected"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(99, 205, 255, 0.15)"}]},{"type":"rule","selectors":[".ns-dark RadSideDrawer .nt-drawer__list-item.-selected Label","RadSideDrawer.ns-dark .nt-drawer__list-item.-selected Label",".ns-dark .nt-drawer .nt-drawer__list-item.-selected Label",".nt-drawer.ns-dark .nt-drawer__list-item.-selected Label"],"declarations":[{"type":"declaration","property":"color","value":"#c9eeff"}]},{"type":"rule","selectors":["Form .nt-form__title",".nt-form .nt-form__title"],"declarations":[{"type":"declaration","property":"font-size","value":"14"}]},{"type":"rule","selectors":["Form .nt-form__link",".nt-form .nt-form__link"],"declarations":[{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark Form .nt-form__link",".ns-dark .nt-form .nt-form__link"],"declarations":[{"type":"declaration","property":"color","value":"#63cdff"}]},{"type":"rule","selectors":["Form .nt-form__validation-message",".nt-form .nt-form__validation-message"],"declarations":[{"type":"declaration","property":"color","value":"#d50000"}]},{"type":"rule","selectors":["Form[isEnabled=false] *",".nt-form[isEnabled=false] *"],"declarations":[{"type":"declaration","property":"opacity","value":"0.5"}]},{"type":"comment","comment":" Form fields "},{"type":"rule","selectors":["TextView","TextField","PickerField","DatePickerField","TimePickerField","DateTimePickerFields","DataFormEditorCore","RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"},{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"placeholder-color","value":"black"},{"type":"declaration","property":"border-color","value":"#c7c7c7"}]},{"type":"rule","selectors":[".ns-dark TextView",".ns-dark TextField",".ns-dark PickerField",".ns-dark DatePickerField",".ns-dark TimePickerField",".ns-dark DateTimePickerFields",".ns-dark DataFormEditorCore",".ns-dark RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"placeholder-color","value":"#b3b3b3"},{"type":"declaration","property":"border-color","value":"#fafafa"}]},{"type":"rule","selectors":["TextView:focus","TextField:focus","PickerField:focus","DatePickerField:focus","TimePickerField:focus","DateTimePickerFields:focus","DataFormEditorCore:focus","RadAutoCompleteTextView:focus"],"declarations":[{"type":"declaration","property":"border-color","value":"#0088c9"}]},{"type":"rule","selectors":[".ns-dark TextView:focus",".ns-dark TextField:focus",".ns-dark PickerField:focus",".ns-dark DatePickerField:focus",".ns-dark TimePickerField:focus",".ns-dark DateTimePickerFields:focus",".ns-dark DataFormEditorCore:focus",".ns-dark RadAutoCompleteTextView:focus"],"declarations":[{"type":"declaration","property":"border-color","value":"#c9eeff"}]},{"type":"rule","selectors":["TextView[isEnabled=false]","TextField[isEnabled=false]","PickerField[isEnabled=false]","DatePickerField[isEnabled=false]","TimePickerField[isEnabled=false]","DateTimePickerFields[isEnabled=false]","DataFormEditorCore[isEnabled=false]","RadAutoCompleteTextView[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#e0e0e0"},{"type":"declaration","property":"background-color","value":"#f2f2f2"}]},{"type":"rule","selectors":[".ns-dark TextView[isEnabled=false]",".ns-dark TextField[isEnabled=false]",".ns-dark PickerField[isEnabled=false]",".ns-dark DatePickerField[isEnabled=false]",".ns-dark TimePickerField[isEnabled=false]",".ns-dark DateTimePickerFields[isEnabled=false]",".ns-dark DataFormEditorCore[isEnabled=false]",".ns-dark RadAutoCompleteTextView[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#e0e0e0"},{"type":"declaration","property":"background-color","value":"#3d3d3d"}]},{"type":"rule","selectors":["PropertyEditor:focus DataFormEditorCore"],"declarations":[{"type":"declaration","property":"border-color","value":"#0088c9"}]},{"type":"rule","selectors":[".ns-dark PropertyEditor:focus DataFormEditorCore"],"declarations":[{"type":"declaration","property":"border-color","value":"#c9eeff"}]},{"type":"rule","selectors":["RadAutoCompleteTextView Token"],"declarations":[{"type":"declaration","property":"background-color","value":"#96ddff"}]},{"type":"rule","selectors":[".ns-dark RadAutoCompleteTextView Token"],"declarations":[{"type":"declaration","property":"background-color","value":"#00aafc"}]},{"type":"rule","selectors":["RadAutoCompleteTextView Token:selected"],"declarations":[{"type":"declaration","property":"background-color","value":"#63cdff"}]},{"type":"rule","selectors":[".ns-dark RadAutoCompleteTextView Token:selected"],"declarations":[{"type":"declaration","property":"background-color","value":"#30bcff"}]},{"type":"rule","selectors":["RadAutoCompleteTextView ClearButton"],"declarations":[{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark RadAutoCompleteTextView ClearButton"],"declarations":[{"type":"declaration","property":"color","value":"#63cdff"}]},{"type":"rule","selectors":["RadAutoCompleteTextView SuggestionView"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark RadAutoCompleteTextView SuggestionView"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"rule","selectors":["RadDataForm"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"placeholder-color","value":"black"}]},{"type":"rule","selectors":[".ns-dark RadDataForm"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"placeholder-color","value":"#b3b3b3"}]},{"type":"rule","selectors":["RadDataForm PropertyEditor"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark RadDataForm PropertyEditor"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"comment","comment":" NativeScript UI AutoComplete "},{"type":"rule","selectors":["PickerPage ListView"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark PickerPage ListView"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background","value":"#303030"}]},{"type":"rule","selectors":["PickerPage ListView > *"],"declarations":[{"type":"declaration","property":"border-bottom-color","value":"rgba(48, 188, 255, 0.4)"}]},{"type":"rule","selectors":[".ns-dark PickerPage ListView > *"],"declarations":[{"type":"declaration","property":"border-bottom-color","value":"rgba(99, 205, 255, 0.4)"}]},{"type":"rule","selectors":["PickerPage.ns-dark ListView",".ns-dark SuggestionView"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background","value":"#303030"}]},{"type":"comment","comment":" DateTime Picker "},{"type":"rule","selectors":[".date-time-picker"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background","value":"#fff"}]},{"type":"rule","selectors":[".date-time-picker.ns-dark"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background","value":"#303030"}]},{"type":"rule","selectors":[".date-time-picker-buttons"],"declarations":[{"type":"declaration","property":"color","value":"#004363"}]},{"type":"rule","selectors":[".date-time-picker-buttons.ns-dark"],"declarations":[{"type":"declaration","property":"color","value":"white"}]},{"type":"rule","selectors":[".ns-dark.date-time-picker-button-cancel"],"declarations":[{"type":"declaration","property":"background","value":"#303030"}]},{"type":"rule","selectors":[".date-time-picker-spinners"],"declarations":[{"type":"declaration","property":"color","value":"#006596"}]},{"type":"rule","selectors":[".date-time-picker-spinners.ns-dark"],"declarations":[{"type":"declaration","property":"color","value":"#fcfeff"}]},{"type":"rule","selectors":["DataFormEditorLabel",".nt-input > Label"],"declarations":[{"type":"declaration","property":"color","value":"#006596"}]},{"type":"rule","selectors":[".ns-dark DataFormEditorLabel",".ns-dark .nt-input > Label"],"declarations":[{"type":"declaration","property":"color","value":"#fcfeff"}]},{"type":"rule","selectors":["ActionBar",".nt-action-bar"],"declarations":[{"type":"declaration","property":"background-color","value":"#3a53ff"}]},{"type":"rule","selectors":[".ns-dark ActionBar",".ns-dark .nt-action-bar"],"declarations":[{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#344be6"}]},{"type":"rule","selectors":[".ns-dark ActionBar Label",".ns-dark ActionBar Button",".ns-dark ActionBar .nt-action-bar__item",".ns-dark .nt-action-bar Label",".ns-dark .nt-action-bar Button",".ns-dark .nt-action-bar .nt-action-bar__item"],"declarations":[{"type":"declaration","property":"color","value":"white"}]},{"type":"rule","selectors":[".ns-dark ActionBar Label:active",".ns-dark ActionBar Label.-active",".ns-dark ActionBar Button:active",".ns-dark ActionBar Button.-active",".ns-dark ActionBar .nt-action-bar__item:active",".ns-dark ActionBar .nt-action-bar__item.-active",".ns-dark .nt-action-bar Label:active",".ns-dark .nt-action-bar Label.-active",".ns-dark .nt-action-bar Button:active",".ns-dark .nt-action-bar Button.-active",".ns-dark .nt-action-bar .nt-action-bar__item:active",".ns-dark .nt-action-bar .nt-action-bar__item.-active"],"declarations":[{"type":"declaration","property":"color","value":"white"}]},{"type":"rule","selectors":[".ns-android ActionBar Button",".ns-android ActionBar .nt-button",".ns-android .nt-action-bar Button",".ns-android .nt-action-bar .nt-button"],"declarations":[{"type":"declaration","property":"background-color","value":"#3a53ff"}]},{"type":"rule","selectors":[".ns-dark.ns-android ActionBar Button",".ns-dark.ns-android ActionBar .nt-button",".ns-dark.ns-android .nt-action-bar Button",".ns-dark.ns-android .nt-action-bar .nt-button"],"declarations":[{"type":"declaration","property":"background-color","value":"#344be6"}]},{"type":"rule","selectors":[".text-primary"],"declarations":[{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark .text-primary"],"declarations":[{"type":"declaration","property":"color","value":"#63cdff"}]},{"type":"rule","selectors":[".text-danger"],"declarations":[{"type":"declaration","property":"color","value":"#d50000"}]},{"type":"rule","selectors":[".bg-primary"],"declarations":[{"type":"declaration","property":"color","value":"#30bcff"},{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark .bg-primary"],"declarations":[{"type":"declaration","property":"color","value":"#63cdff"}]},{"type":"rule","selectors":[".bg-danger"],"declarations":[{"type":"declaration","property":"background-color","value":"#d50000"},{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":[".img-rounded"],"declarations":[{"type":"declaration","property":"border-radius","value":"4"}]},{"type":"rule","selectors":[".img-circle"],"declarations":[{"type":"declaration","property":"border-radius","value":"50%"}]},{"type":"comment","comment":" Dividers "},{"type":"rule","selectors":[".hr"],"declarations":[{"type":"declaration","property":"border-color","value":"#d9d9d9"}]},{"type":"rule","selectors":[".ns-dark .hr"],"declarations":[{"type":"declaration","property":"border-color","value":"#4d4d4d"}]},{"type":"rule","selectors":[".hr-light"],"declarations":[{"type":"declaration","property":"border-color","value":"#96ddff"}]},{"type":"rule","selectors":[".ns-dark .hr-light"],"declarations":[{"type":"declaration","property":"border-color","value":"white"}]},{"type":"rule","selectors":[".hr-dark"],"declarations":[{"type":"declaration","property":"border-color","value":"#0088c9"}]},{"type":"rule","selectors":[".ns-dark .hr-dark"],"declarations":[{"type":"declaration","property":"border-color","value":"#c9eeff"}]},{"type":"rule","selectors":[".ns-root",".ns-modal"],"declarations":[{"type":"declaration","property":"--color-black","value":"#000"},{"type":"declaration","property":"--color-white","value":"#fff"},{"type":"declaration","property":"--color-grey","value":"#e0e0e0"},{"type":"declaration","property":"--color-grey-light","value":"#bababa"},{"type":"declaration","property":"--color-charcoal","value":"#303030"},{"type":"declaration","property":"--color-transparent","value":"transparent"},{"type":"declaration","property":"--color-aqua","value":"#00caab"},{"type":"declaration","property":"--color-blue","value":"#3a53ff"},{"type":"declaration","property":"--color-brown","value":"#795548"},{"type":"declaration","property":"--color-forest","value":"#006968"},{"type":"declaration","property":"--color-grey-dark","value":"#5c687c"},{"type":"declaration","property":"--color-purple","value":"#8130ff"},{"type":"declaration","property":"--color-lemon","value":"#ffea00"},{"type":"declaration","property":"--color-lime","value":"#aee406"},{"type":"declaration","property":"--color-orange","value":"#f57c00"},{"type":"declaration","property":"--color-ruby","value":"#ff1744"},{"type":"declaration","property":"--color-sky","value":"#30bcff"},{"type":"declaration","property":"--color-error","value":"#d50000"},{"type":"declaration","property":"--const-font-size","value":"12"},{"type":"declaration","property":"--const-background-alt-10","value":"#c0ebff"},{"type":"declaration","property":"--const-btn-color-secondary","value":"#01a0ec"},{"type":"declaration","property":"--const-btn-color-disabled","value":"#a4a4a4"},{"type":"declaration","property":"--const-btn-font-size","value":"14"},{"type":"declaration","property":"--const-btn-min-width","value":"64"},{"type":"declaration","property":"--const-btn-height","value":"52"},{"type":"declaration","property":"--const-btn-padding-x","value":"5"},{"type":"declaration","property":"--const-btn-padding-y","value":"0"},{"type":"declaration","property":"--const-btn-margin-x","value":"16"},{"type":"declaration","property":"--const-btn-margin-y","value":"8"},{"type":"declaration","property":"--const-btn-radius","value":"0"},{"type":"declaration","property":"--const-headings-margin-bottom","value":"4"},{"type":"declaration","property":"--const-headings-font-weight","value":"normal"},{"type":"declaration","property":"--const-border-width","value":"1"},{"type":"declaration","property":"--const-border-radius","value":""},{"type":"declaration","property":"--const-border-radius-sm","value":"4"},{"type":"declaration","property":"--const-border-radius-lg","value":"50%"},{"type":"declaration","property":"--const-icon-font-size","value":"12"},{"type":"declaration","property":"--const-icon-font-size-lg","value":"16"},{"type":"declaration","property":"--const-disabled-opacity","value":"0.5"},{"type":"declaration","property":"--light-primary","value":"#262626"},{"type":"declaration","property":"--light-background","value":"#fff"},{"type":"declaration","property":"--light-secondary","value":"black"},{"type":"declaration","property":"--light-accent","value":"#30bcff"},{"type":"declaration","property":"--light-complementary","value":"#3a53ff"},{"type":"declaration","property":"--light-complementary-color","value":""},{"type":"declaration","property":"--light-btn-color","value":"#262626"},{"type":"declaration","property":"--light-border-color","value":"#30bcff"},{"type":"declaration","property":"--light-background-alt-5","value":"#f2f2f2"},{"type":"declaration","property":"--light-background-alt-10","value":"#e6e6e6"},{"type":"declaration","property":"--light-background-alt-20","value":"#cccccc"},{"type":"declaration","property":"--light-disabled","value":"#ace4ff"},{"type":"declaration","property":"--light-text-color","value":"#262626"},{"type":"declaration","property":"--light-headings-color","value":"#262626"},{"type":"declaration","property":"--light-tab-text-color","value":"#abd5e9"},{"type":"declaration","property":"--light-accent-dark","value":"#0088c9"},{"type":"declaration","property":"--light-accent-light","value":"#96ddff"},{"type":"declaration","property":"--light-accent-transparent","value":"rgba(48, 188, 255, 0.8)"},{"type":"declaration","property":"--light-primary-accent","value":"rgba(48, 188, 255, 0.4)"},{"type":"declaration","property":"--light-background-accent","value":"rgba(48, 188, 255, 0.1)"},{"type":"declaration","property":"--light-background-dark-accent","value":"rgba(48, 188, 255, 0.15)"},{"type":"declaration","property":"--light-item-active-color","value":"#676767"},{"type":"declaration","property":"--light-item-active-background","value":"rgba(48, 188, 255, 0.15)"},{"type":"declaration","property":"--light-complementary-dark","value":"#213dff"},{"type":"declaration","property":"--light-item-active-icon-color","value":"#676767"},{"type":"declaration","property":"--light-btn-color-inverse","value":"white"},{"type":"declaration","property":"--light-btn-color-secondary","value":"#0d0d0d"},{"type":"declaration","property":"--dark-primary","value":"white"},{"type":"declaration","property":"--dark-background","value":"#303030"},{"type":"declaration","property":"--dark-secondary","value":"#b3b3b3"},{"type":"declaration","property":"--dark-accent","value":"#63cdff"},{"type":"declaration","property":"--dark-complementary","value":"#344be6"},{"type":"declaration","property":"--dark-btn-color","value":"#fff"},{"type":"declaration","property":"--dark-border-color","value":"#63cdff"},{"type":"declaration","property":"--dark-background-alt-5","value":"#3d3d3d"},{"type":"declaration","property":"--dark-background-alt-10","value":"#4a4a4a"},{"type":"declaration","property":"--dark-background-alt-20","value":"#636363"},{"type":"declaration","property":"--dark-disabled","value":"#446f83"},{"type":"declaration","property":"--dark-text-color","value":"white"},{"type":"declaration","property":"--dark-headings-color","value":"white"},{"type":"declaration","property":"--dark-tab-text-color","value":"#bbdae9"},{"type":"declaration","property":"--dark-accent-dark","value":"#c9eeff"},{"type":"declaration","property":"--dark-accent-light","value":"white"},{"type":"declaration","property":"--dark-accent-transparent","value":"rgba(99, 205, 255, 0.8)"},{"type":"declaration","property":"--dark-primary-accent","value":"rgba(99, 205, 255, 0.4)"},{"type":"declaration","property":"--dark-background-accent","value":"rgba(99, 205, 255, 0.1)"},{"type":"declaration","property":"--dark-background-dark-accent","value":"rgba(99, 205, 255, 0.15)"},{"type":"declaration","property":"--dark-item-active-color","value":"#c1c1c1"},{"type":"declaration","property":"--dark-item-active-background","value":"rgba(99, 205, 255, 0.15)"},{"type":"declaration","property":"--dark-complementary-color","value":"white"},{"type":"declaration","property":"--dark-complementary-dark","value":"#1d37e3"},{"type":"declaration","property":"--dark-item-active-icon-color","value":"#c1c1c1"},{"type":"declaration","property":"--dark-btn-color-inverse","value":"#002030"},{"type":"declaration","property":"--dark-btn-color-secondary","value":"#e6e6e6"}]},{"type":"rule","selectors":[".fab"],"declarations":[{"type":"declaration","property":"font-family","value":"\"Font Awesome 5 Brands\", \"fa-brands-400\""},{"type":"declaration","property":"font-weight","value":"400"}]},{"type":"rule","selectors":[".fas"],"declarations":[{"type":"declaration","property":"font-family","value":"\"Font Awesome 5 Free\", \"fa-solid-900\""},{"type":"declaration","property":"font-weight","value":"900"}]},{"type":"rule","selectors":[".far"],"declarations":[{"type":"declaration","property":"font-family","value":"\"Font Awesome 5 Free\", \"fa-regular-400\""},{"type":"declaration","property":"font-weight","value":"400"}]}],"parsingErrors":[]}};;
    if (false) {}


/***/ }),

/***/ "./components/classPage.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classPage_vue_vue_type_template_id_4dab8408_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/classPage.vue?vue&type=template&id=4dab8408&scoped=true&");
/* harmony import */ var _classPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/classPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _classPage_vue_vue_type_style_index_0_id_4dab8408_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/classPage.vue?vue&type=style&index=0&id=4dab8408&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _classPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _classPage_vue_vue_type_template_id_4dab8408_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _classPage_vue_vue_type_template_id_4dab8408_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4dab8408",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/classPage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/classPage.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_classPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/classPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_classPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/classPage.vue?vue&type=style&index=0&id=4dab8408&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_classPage_vue_vue_type_style_index_0_id_4dab8408_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/classPage.vue?vue&type=style&index=0&id=4dab8408&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_classPage_vue_vue_type_style_index_0_id_4dab8408_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_classPage_vue_vue_type_style_index_0_id_4dab8408_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_classPage_vue_vue_type_style_index_0_id_4dab8408_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_classPage_vue_vue_type_style_index_0_id_4dab8408_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_classPage_vue_vue_type_style_index_0_id_4dab8408_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/classPage.vue?vue&type=template&id=4dab8408&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_classPage_vue_vue_type_template_id_4dab8408_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/classPage.vue?vue&type=template&id=4dab8408&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_classPage_vue_vue_type_template_id_4dab8408_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_classPage_vue_vue_type_template_id_4dab8408_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/editTutorial.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editTutorial_vue_vue_type_template_id_59b1ba43_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/editTutorial.vue?vue&type=template&id=59b1ba43&scoped=true&");
/* harmony import */ var _editTutorial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/editTutorial.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _editTutorial_vue_vue_type_style_index_0_id_59b1ba43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/editTutorial.vue?vue&type=style&index=0&id=59b1ba43&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _editTutorial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _editTutorial_vue_vue_type_template_id_59b1ba43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _editTutorial_vue_vue_type_template_id_59b1ba43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "59b1ba43",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/editTutorial.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/editTutorial.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_editTutorial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/editTutorial.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_editTutorial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/editTutorial.vue?vue&type=style&index=0&id=59b1ba43&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_editTutorial_vue_vue_type_style_index_0_id_59b1ba43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/editTutorial.vue?vue&type=style&index=0&id=59b1ba43&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_editTutorial_vue_vue_type_style_index_0_id_59b1ba43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_editTutorial_vue_vue_type_style_index_0_id_59b1ba43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_editTutorial_vue_vue_type_style_index_0_id_59b1ba43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_editTutorial_vue_vue_type_style_index_0_id_59b1ba43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_editTutorial_vue_vue_type_style_index_0_id_59b1ba43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/editTutorial.vue?vue&type=template&id=59b1ba43&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_editTutorial_vue_vue_type_template_id_59b1ba43_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/editTutorial.vue?vue&type=template&id=59b1ba43&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_editTutorial_vue_vue_type_template_id_59b1ba43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_editTutorial_vue_vue_type_template_id_59b1ba43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/initialPage.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _initialPage_vue_vue_type_template_id_df00b6f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/initialPage.vue?vue&type=template&id=df00b6f0&scoped=true&");
/* harmony import */ var _initialPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/initialPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _initialPage_vue_vue_type_style_index_0_id_df00b6f0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/initialPage.vue?vue&type=style&index=0&id=df00b6f0&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _initialPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _initialPage_vue_vue_type_template_id_df00b6f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _initialPage_vue_vue_type_template_id_df00b6f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "df00b6f0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/initialPage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/initialPage.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_initialPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/initialPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_initialPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/initialPage.vue?vue&type=style&index=0&id=df00b6f0&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_initialPage_vue_vue_type_style_index_0_id_df00b6f0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/initialPage.vue?vue&type=style&index=0&id=df00b6f0&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_initialPage_vue_vue_type_style_index_0_id_df00b6f0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_initialPage_vue_vue_type_style_index_0_id_df00b6f0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_initialPage_vue_vue_type_style_index_0_id_df00b6f0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_initialPage_vue_vue_type_style_index_0_id_df00b6f0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_initialPage_vue_vue_type_style_index_0_id_df00b6f0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/initialPage.vue?vue&type=template&id=df00b6f0&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_initialPage_vue_vue_type_template_id_df00b6f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/initialPage.vue?vue&type=template&id=df00b6f0&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_initialPage_vue_vue_type_template_id_df00b6f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_initialPage_vue_vue_type_template_id_df00b6f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/listArchivedTutorials.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _listArchivedTutorials_vue_vue_type_template_id_7bf3352c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/listArchivedTutorials.vue?vue&type=template&id=7bf3352c&scoped=true&");
/* harmony import */ var _listArchivedTutorials_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/listArchivedTutorials.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _listArchivedTutorials_vue_vue_type_style_index_0_id_7bf3352c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/listArchivedTutorials.vue?vue&type=style&index=0&id=7bf3352c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _listArchivedTutorials_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _listArchivedTutorials_vue_vue_type_template_id_7bf3352c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _listArchivedTutorials_vue_vue_type_template_id_7bf3352c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7bf3352c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/listArchivedTutorials.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/listArchivedTutorials.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listArchivedTutorials_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/listArchivedTutorials.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listArchivedTutorials_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/listArchivedTutorials.vue?vue&type=style&index=0&id=7bf3352c&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listArchivedTutorials_vue_vue_type_style_index_0_id_7bf3352c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/listArchivedTutorials.vue?vue&type=style&index=0&id=7bf3352c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listArchivedTutorials_vue_vue_type_style_index_0_id_7bf3352c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listArchivedTutorials_vue_vue_type_style_index_0_id_7bf3352c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listArchivedTutorials_vue_vue_type_style_index_0_id_7bf3352c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listArchivedTutorials_vue_vue_type_style_index_0_id_7bf3352c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listArchivedTutorials_vue_vue_type_style_index_0_id_7bf3352c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/listArchivedTutorials.vue?vue&type=template&id=7bf3352c&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_listArchivedTutorials_vue_vue_type_template_id_7bf3352c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/listArchivedTutorials.vue?vue&type=template&id=7bf3352c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_listArchivedTutorials_vue_vue_type_template_id_7bf3352c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_listArchivedTutorials_vue_vue_type_template_id_7bf3352c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/listTutorials.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _listTutorials_vue_vue_type_template_id_017c85a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/listTutorials.vue?vue&type=template&id=017c85a8&scoped=true&");
/* harmony import */ var _listTutorials_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/listTutorials.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _listTutorials_vue_vue_type_style_index_0_id_017c85a8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/listTutorials.vue?vue&type=style&index=0&id=017c85a8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _listTutorials_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _listTutorials_vue_vue_type_template_id_017c85a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _listTutorials_vue_vue_type_template_id_017c85a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "017c85a8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/listTutorials.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/listTutorials.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listTutorials_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/listTutorials.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listTutorials_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/listTutorials.vue?vue&type=style&index=0&id=017c85a8&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listTutorials_vue_vue_type_style_index_0_id_017c85a8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/listTutorials.vue?vue&type=style&index=0&id=017c85a8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listTutorials_vue_vue_type_style_index_0_id_017c85a8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listTutorials_vue_vue_type_style_index_0_id_017c85a8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listTutorials_vue_vue_type_style_index_0_id_017c85a8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listTutorials_vue_vue_type_style_index_0_id_017c85a8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_listTutorials_vue_vue_type_style_index_0_id_017c85a8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/listTutorials.vue?vue&type=template&id=017c85a8&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_listTutorials_vue_vue_type_template_id_017c85a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/listTutorials.vue?vue&type=template&id=017c85a8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_listTutorials_vue_vue_type_template_id_017c85a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_listTutorials_vue_vue_type_template_id_017c85a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/loginPage.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loginPage_vue_vue_type_template_id_600202ed_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/loginPage.vue?vue&type=template&id=600202ed&scoped=true&");
/* harmony import */ var _loginPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/loginPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _loginPage_vue_vue_type_style_index_0_id_600202ed_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/loginPage.vue?vue&type=style&index=0&id=600202ed&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _loginPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _loginPage_vue_vue_type_template_id_600202ed_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _loginPage_vue_vue_type_template_id_600202ed_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "600202ed",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/loginPage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/loginPage.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loginPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/loginPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loginPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/loginPage.vue?vue&type=style&index=0&id=600202ed&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loginPage_vue_vue_type_style_index_0_id_600202ed_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/loginPage.vue?vue&type=style&index=0&id=600202ed&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loginPage_vue_vue_type_style_index_0_id_600202ed_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loginPage_vue_vue_type_style_index_0_id_600202ed_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loginPage_vue_vue_type_style_index_0_id_600202ed_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loginPage_vue_vue_type_style_index_0_id_600202ed_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loginPage_vue_vue_type_style_index_0_id_600202ed_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/loginPage.vue?vue&type=template&id=600202ed&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_loginPage_vue_vue_type_template_id_600202ed_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/loginPage.vue?vue&type=template&id=600202ed&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_loginPage_vue_vue_type_template_id_600202ed_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_loginPage_vue_vue_type_template_id_600202ed_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/mainPage.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mainPage_vue_vue_type_template_id_6ff81823_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/mainPage.vue?vue&type=template&id=6ff81823&scoped=true&");
/* harmony import */ var _mainPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/mainPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _mainPage_vue_vue_type_style_index_0_id_6ff81823_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/mainPage.vue?vue&type=style&index=0&id=6ff81823&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _mainPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _mainPage_vue_vue_type_template_id_6ff81823_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _mainPage_vue_vue_type_template_id_6ff81823_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6ff81823",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/mainPage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/mainPage.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mainPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/mainPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mainPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/mainPage.vue?vue&type=style&index=0&id=6ff81823&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mainPage_vue_vue_type_style_index_0_id_6ff81823_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/mainPage.vue?vue&type=style&index=0&id=6ff81823&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mainPage_vue_vue_type_style_index_0_id_6ff81823_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mainPage_vue_vue_type_style_index_0_id_6ff81823_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mainPage_vue_vue_type_style_index_0_id_6ff81823_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mainPage_vue_vue_type_style_index_0_id_6ff81823_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mainPage_vue_vue_type_style_index_0_id_6ff81823_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/mainPage.vue?vue&type=template&id=6ff81823&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_mainPage_vue_vue_type_template_id_6ff81823_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/mainPage.vue?vue&type=template&id=6ff81823&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_mainPage_vue_vue_type_template_id_6ff81823_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_mainPage_vue_vue_type_template_id_6ff81823_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/previousClassesPage.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _previousClassesPage_vue_vue_type_template_id_1bc4f31a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/previousClassesPage.vue?vue&type=template&id=1bc4f31a&scoped=true&");
/* harmony import */ var _previousClassesPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/previousClassesPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _previousClassesPage_vue_vue_type_style_index_0_id_1bc4f31a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/previousClassesPage.vue?vue&type=style&index=0&id=1bc4f31a&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _previousClassesPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _previousClassesPage_vue_vue_type_template_id_1bc4f31a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _previousClassesPage_vue_vue_type_template_id_1bc4f31a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1bc4f31a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/previousClassesPage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/previousClassesPage.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassesPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/previousClassesPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassesPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/previousClassesPage.vue?vue&type=style&index=0&id=1bc4f31a&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassesPage_vue_vue_type_style_index_0_id_1bc4f31a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/previousClassesPage.vue?vue&type=style&index=0&id=1bc4f31a&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassesPage_vue_vue_type_style_index_0_id_1bc4f31a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassesPage_vue_vue_type_style_index_0_id_1bc4f31a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassesPage_vue_vue_type_style_index_0_id_1bc4f31a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassesPage_vue_vue_type_style_index_0_id_1bc4f31a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassesPage_vue_vue_type_style_index_0_id_1bc4f31a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/previousClassesPage.vue?vue&type=template&id=1bc4f31a&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassesPage_vue_vue_type_template_id_1bc4f31a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/previousClassesPage.vue?vue&type=template&id=1bc4f31a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassesPage_vue_vue_type_template_id_1bc4f31a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassesPage_vue_vue_type_template_id_1bc4f31a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/previousClassificationsPage.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _previousClassificationsPage_vue_vue_type_template_id_a506cacc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/previousClassificationsPage.vue?vue&type=template&id=a506cacc&scoped=true&");
/* harmony import */ var _previousClassificationsPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/previousClassificationsPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _previousClassificationsPage_vue_vue_type_style_index_0_id_a506cacc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/previousClassificationsPage.vue?vue&type=style&index=0&id=a506cacc&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _previousClassificationsPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _previousClassificationsPage_vue_vue_type_template_id_a506cacc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _previousClassificationsPage_vue_vue_type_template_id_a506cacc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "a506cacc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/previousClassificationsPage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/previousClassificationsPage.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassificationsPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/previousClassificationsPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassificationsPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/previousClassificationsPage.vue?vue&type=style&index=0&id=a506cacc&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassificationsPage_vue_vue_type_style_index_0_id_a506cacc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/previousClassificationsPage.vue?vue&type=style&index=0&id=a506cacc&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassificationsPage_vue_vue_type_style_index_0_id_a506cacc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassificationsPage_vue_vue_type_style_index_0_id_a506cacc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassificationsPage_vue_vue_type_style_index_0_id_a506cacc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassificationsPage_vue_vue_type_style_index_0_id_a506cacc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassificationsPage_vue_vue_type_style_index_0_id_a506cacc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/previousClassificationsPage.vue?vue&type=template&id=a506cacc&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassificationsPage_vue_vue_type_template_id_a506cacc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/previousClassificationsPage.vue?vue&type=template&id=a506cacc&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassificationsPage_vue_vue_type_template_id_a506cacc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_previousClassificationsPage_vue_vue_type_template_id_a506cacc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/registerTutoring.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _registerTutoring_vue_vue_type_template_id_3f471e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/registerTutoring.vue?vue&type=template&id=3f471e6a&scoped=true&");
/* harmony import */ var _registerTutoring_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/registerTutoring.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _registerTutoring_vue_vue_type_style_index_0_id_3f471e6a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/registerTutoring.vue?vue&type=style&index=0&id=3f471e6a&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _registerTutoring_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _registerTutoring_vue_vue_type_template_id_3f471e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _registerTutoring_vue_vue_type_template_id_3f471e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3f471e6a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/registerTutoring.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/registerTutoring.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_registerTutoring_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/registerTutoring.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_registerTutoring_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/registerTutoring.vue?vue&type=style&index=0&id=3f471e6a&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_registerTutoring_vue_vue_type_style_index_0_id_3f471e6a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/registerTutoring.vue?vue&type=style&index=0&id=3f471e6a&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_registerTutoring_vue_vue_type_style_index_0_id_3f471e6a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_registerTutoring_vue_vue_type_style_index_0_id_3f471e6a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_registerTutoring_vue_vue_type_style_index_0_id_3f471e6a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_registerTutoring_vue_vue_type_style_index_0_id_3f471e6a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_registerTutoring_vue_vue_type_style_index_0_id_3f471e6a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/registerTutoring.vue?vue&type=template&id=3f471e6a&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registerTutoring_vue_vue_type_template_id_3f471e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/registerTutoring.vue?vue&type=template&id=3f471e6a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registerTutoring_vue_vue_type_template_id_3f471e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registerTutoring_vue_vue_type_template_id_3f471e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/scheduleTutoring.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scheduleTutoring_vue_vue_type_template_id_4037345e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/scheduleTutoring.vue?vue&type=template&id=4037345e&scoped=true&");
/* harmony import */ var _scheduleTutoring_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/scheduleTutoring.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _scheduleTutoring_vue_vue_type_style_index_0_id_4037345e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/scheduleTutoring.vue?vue&type=style&index=0&id=4037345e&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _scheduleTutoring_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _scheduleTutoring_vue_vue_type_template_id_4037345e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _scheduleTutoring_vue_vue_type_template_id_4037345e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4037345e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/scheduleTutoring.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/scheduleTutoring.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_scheduleTutoring_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/scheduleTutoring.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_scheduleTutoring_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/scheduleTutoring.vue?vue&type=style&index=0&id=4037345e&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_scheduleTutoring_vue_vue_type_style_index_0_id_4037345e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/scheduleTutoring.vue?vue&type=style&index=0&id=4037345e&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_scheduleTutoring_vue_vue_type_style_index_0_id_4037345e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_scheduleTutoring_vue_vue_type_style_index_0_id_4037345e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_scheduleTutoring_vue_vue_type_style_index_0_id_4037345e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_scheduleTutoring_vue_vue_type_style_index_0_id_4037345e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_scheduleTutoring_vue_vue_type_style_index_0_id_4037345e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/scheduleTutoring.vue?vue&type=template&id=4037345e&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_scheduleTutoring_vue_vue_type_template_id_4037345e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/scheduleTutoring.vue?vue&type=template&id=4037345e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_scheduleTutoring_vue_vue_type_template_id_4037345e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_scheduleTutoring_vue_vue_type_template_id_4037345e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = {"main":"app.js","android":{"v8Flags":"--expose_gc","markingMode":"none"}};

/***/ })

},[["./app.js","runtime","vendor"]]]);