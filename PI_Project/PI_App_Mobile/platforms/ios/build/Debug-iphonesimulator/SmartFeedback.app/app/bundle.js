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

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
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
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/classPage.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/editTutorial.vue?vue&type=style&index=0&id=59b1ba43&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
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
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/editTutorial.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/initialPage.vue?vue&type=style&index=0&id=df00b6f0&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
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
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/initialPage.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/listArchivedTutorials.vue?vue&type=style&index=0&id=7bf3352c&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
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
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/listArchivedTutorials.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/listTutorials.vue?vue&type=style&index=0&id=017c85a8&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
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
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/listTutorials.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/loginPage.vue?vue&type=style&index=0&id=600202ed&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
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
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/loginPage.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/mainPage.vue?vue&type=style&index=0&id=6ff81823&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
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
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/mainPage.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/previousClassesPage.vue?vue&type=style&index=0&id=1bc4f31a&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
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
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/previousClassesPage.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/previousClassificationsPage.vue?vue&type=style&index=0&id=a506cacc&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
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
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/previousClassificationsPage.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/registerTutoring.vue?vue&type=style&index=0&id=3f471e6a&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
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
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/registerTutoring.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/scheduleTutoring.vue?vue&type=style&index=0&id=4037345e&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
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
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/scheduleTutoring.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

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

            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-regular.js")();
            
            
        if (true) {
            const hmrUpdate = __webpack_require__("../node_modules/nativescript-dev-webpack/hmr/index.js").hmrUpdate;
            global.__coreModulesLiveSync = global.__onLiveSync;

            global.__onLiveSync = function () {
                // handle hot updated on LiveSync
                hmrUpdate();
            };

            global.hmrRefresh = function({ type, path } = {}) {
                // the hot updates are applied, ask the modules to apply the changes
                setTimeout(() => {
                    global.__coreModulesLiveSync({ type, path });
                });
            };

            // handle hot updated on initial app start
            hmrUpdate();
        }
        
            const context = __webpack_require__("./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|kt|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$");
            global.registerWebpackModules(context);
            if (true) {
                module.hot.accept(context.id, () => { 
                    console.log("HMR: Accept module '" + context.id + "' from '" + module.i + "'"); 
                });
            }
            
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
/***/ (function(module, exports) {

throw new Error("Module build failed (from ../node_modules/sass-loader/lib/loader.js):\nError: Missing binding /Users/smartfeedback/Documents/SmartFeedback/node_modules/node-sass/vendor/darwin-x64-72/binding.node\nNode Sass could not find a binding for your current environment: OS X 64-bit with Node.js 12.x\n\nFound bindings for the following environments:\n  - Windows 64-bit with Node.js 12.x\n\nThis usually happens because your environment has changed since running `npm install`.\nRun `npm rebuild node-sass` to download the binding for your current environment.\n    at module.exports (/Users/smartfeedback/Documents/SmartFeedback/node_modules/node-sass/lib/binding.js:15:13)\n    at Object.<anonymous> (/Users/smartfeedback/Documents/SmartFeedback/node_modules/node-sass/lib/index.js:14:35)\n    at Module._compile (/Users/smartfeedback/Documents/SmartFeedback/node_modules/v8-compile-cache/v8-compile-cache.js:194:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)\n    at Module.load (internal/modules/cjs/loader.js:986:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:879:14)\n    at Module.require (internal/modules/cjs/loader.js:1026:19)\n    at require (/Users/smartfeedback/Documents/SmartFeedback/node_modules/v8-compile-cache/v8-compile-cache.js:161:20)\n    at Object.sassLoader (/Users/smartfeedback/Documents/SmartFeedback/node_modules/sass-loader/lib/loader.js:46:72)");

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
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('4dab8408', component.options)
    } else {
      api.reload('4dab8408', component.options)
    }
    module.hot.accept("./components/classPage.vue?vue&type=template&id=4dab8408&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _classPage_vue_vue_type_template_id_4dab8408_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/classPage.vue?vue&type=template&id=4dab8408&scoped=true&");
(function () {
      api.rerender('4dab8408', {
        render: _classPage_vue_vue_type_template_id_4dab8408_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _classPage_vue_vue_type_template_id_4dab8408_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
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
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('59b1ba43', component.options)
    } else {
      api.reload('59b1ba43', component.options)
    }
    module.hot.accept("./components/editTutorial.vue?vue&type=template&id=59b1ba43&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _editTutorial_vue_vue_type_template_id_59b1ba43_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/editTutorial.vue?vue&type=template&id=59b1ba43&scoped=true&");
(function () {
      api.rerender('59b1ba43', {
        render: _editTutorial_vue_vue_type_template_id_59b1ba43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _editTutorial_vue_vue_type_template_id_59b1ba43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
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
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('df00b6f0', component.options)
    } else {
      api.reload('df00b6f0', component.options)
    }
    module.hot.accept("./components/initialPage.vue?vue&type=template&id=df00b6f0&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _initialPage_vue_vue_type_template_id_df00b6f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/initialPage.vue?vue&type=template&id=df00b6f0&scoped=true&");
(function () {
      api.rerender('df00b6f0', {
        render: _initialPage_vue_vue_type_template_id_df00b6f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _initialPage_vue_vue_type_template_id_df00b6f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
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
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('7bf3352c', component.options)
    } else {
      api.reload('7bf3352c', component.options)
    }
    module.hot.accept("./components/listArchivedTutorials.vue?vue&type=template&id=7bf3352c&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _listArchivedTutorials_vue_vue_type_template_id_7bf3352c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/listArchivedTutorials.vue?vue&type=template&id=7bf3352c&scoped=true&");
(function () {
      api.rerender('7bf3352c', {
        render: _listArchivedTutorials_vue_vue_type_template_id_7bf3352c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _listArchivedTutorials_vue_vue_type_template_id_7bf3352c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
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
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('017c85a8', component.options)
    } else {
      api.reload('017c85a8', component.options)
    }
    module.hot.accept("./components/listTutorials.vue?vue&type=template&id=017c85a8&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _listTutorials_vue_vue_type_template_id_017c85a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/listTutorials.vue?vue&type=template&id=017c85a8&scoped=true&");
(function () {
      api.rerender('017c85a8', {
        render: _listTutorials_vue_vue_type_template_id_017c85a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _listTutorials_vue_vue_type_template_id_017c85a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
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
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('600202ed', component.options)
    } else {
      api.reload('600202ed', component.options)
    }
    module.hot.accept("./components/loginPage.vue?vue&type=template&id=600202ed&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _loginPage_vue_vue_type_template_id_600202ed_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/loginPage.vue?vue&type=template&id=600202ed&scoped=true&");
(function () {
      api.rerender('600202ed', {
        render: _loginPage_vue_vue_type_template_id_600202ed_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _loginPage_vue_vue_type_template_id_600202ed_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
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
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('6ff81823', component.options)
    } else {
      api.reload('6ff81823', component.options)
    }
    module.hot.accept("./components/mainPage.vue?vue&type=template&id=6ff81823&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _mainPage_vue_vue_type_template_id_6ff81823_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/mainPage.vue?vue&type=template&id=6ff81823&scoped=true&");
(function () {
      api.rerender('6ff81823', {
        render: _mainPage_vue_vue_type_template_id_6ff81823_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _mainPage_vue_vue_type_template_id_6ff81823_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
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
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('1bc4f31a', component.options)
    } else {
      api.reload('1bc4f31a', component.options)
    }
    module.hot.accept("./components/previousClassesPage.vue?vue&type=template&id=1bc4f31a&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _previousClassesPage_vue_vue_type_template_id_1bc4f31a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/previousClassesPage.vue?vue&type=template&id=1bc4f31a&scoped=true&");
(function () {
      api.rerender('1bc4f31a', {
        render: _previousClassesPage_vue_vue_type_template_id_1bc4f31a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _previousClassesPage_vue_vue_type_template_id_1bc4f31a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
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
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('a506cacc', component.options)
    } else {
      api.reload('a506cacc', component.options)
    }
    module.hot.accept("./components/previousClassificationsPage.vue?vue&type=template&id=a506cacc&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _previousClassificationsPage_vue_vue_type_template_id_a506cacc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/previousClassificationsPage.vue?vue&type=template&id=a506cacc&scoped=true&");
(function () {
      api.rerender('a506cacc', {
        render: _previousClassificationsPage_vue_vue_type_template_id_a506cacc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _previousClassificationsPage_vue_vue_type_template_id_a506cacc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
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
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('3f471e6a', component.options)
    } else {
      api.reload('3f471e6a', component.options)
    }
    module.hot.accept("./components/registerTutoring.vue?vue&type=template&id=3f471e6a&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _registerTutoring_vue_vue_type_template_id_3f471e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/registerTutoring.vue?vue&type=template&id=3f471e6a&scoped=true&");
(function () {
      api.rerender('3f471e6a', {
        render: _registerTutoring_vue_vue_type_template_id_3f471e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _registerTutoring_vue_vue_type_template_id_3f471e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
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
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('4037345e', component.options)
    } else {
      api.reload('4037345e', component.options)
    }
    module.hot.accept("./components/scheduleTutoring.vue?vue&type=template&id=4037345e&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _scheduleTutoring_vue_vue_type_template_id_4037345e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/scheduleTutoring.vue?vue&type=template&id=4037345e&scoped=true&");
(function () {
      api.rerender('4037345e', {
        render: _scheduleTutoring_vue_vue_type_template_id_4037345e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _scheduleTutoring_vue_vue_type_template_id_4037345e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9jbGFzc1BhZ2UudnVlIiwid2VicGFjazovLy9jb21wb25lbnRzL2VkaXRUdXRvcmlhbC52dWUiLCJ3ZWJwYWNrOi8vL2NvbXBvbmVudHMvaW5pdGlhbFBhZ2UudnVlIiwid2VicGFjazovLy9jb21wb25lbnRzL2xpc3RBcmNoaXZlZFR1dG9yaWFscy52dWUiLCJ3ZWJwYWNrOi8vL2NvbXBvbmVudHMvbGlzdFR1dG9yaWFscy52dWUiLCJ3ZWJwYWNrOi8vL2NvbXBvbmVudHMvbG9naW5QYWdlLnZ1ZSIsIndlYnBhY2s6Ly8vY29tcG9uZW50cy9tYWluUGFnZS52dWUiLCJ3ZWJwYWNrOi8vL2NvbXBvbmVudHMvcHJldmlvdXNDbGFzc2VzUGFnZS52dWUiLCJ3ZWJwYWNrOi8vL2NvbXBvbmVudHMvcHJldmlvdXNDbGFzc2lmaWNhdGlvbnNQYWdlLnZ1ZSIsIndlYnBhY2s6Ly8vY29tcG9uZW50cy9yZWdpc3RlclR1dG9yaW5nLnZ1ZSIsIndlYnBhY2s6Ly8vY29tcG9uZW50cy9zY2hlZHVsZVR1dG9yaW5nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2NsYXNzUGFnZS52dWU/NDMxZCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2VkaXRUdXRvcmlhbC52dWU/ODA0ZiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2luaXRpYWxQYWdlLnZ1ZT9hMDNkIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbGlzdEFyY2hpdmVkVHV0b3JpYWxzLnZ1ZT9iYTc5Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbGlzdFR1dG9yaWFscy52dWU/OGVkOSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2xvZ2luUGFnZS52dWU/ZDYwYiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21haW5QYWdlLnZ1ZT8xMzNjIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvcHJldmlvdXNDbGFzc2VzUGFnZS52dWU/OWJjMCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3ByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZS52dWU/OTgzNiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3JlZ2lzdGVyVHV0b3JpbmcudnVlPzljMGEiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zY2hlZHVsZVR1dG9yaW5nLnZ1ZT9hZjUzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvY2xhc3NQYWdlLnZ1ZT8wMzk2Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvZWRpdFR1dG9yaWFsLnZ1ZT8xMDUwIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvaW5pdGlhbFBhZ2UudnVlP2JmMzYiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9saXN0QXJjaGl2ZWRUdXRvcmlhbHMudnVlPzgwZTIiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9saXN0VHV0b3JpYWxzLnZ1ZT9lMzM3Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbG9naW5QYWdlLnZ1ZT9jYjkzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbWFpblBhZ2UudnVlPzJmZDgiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9wcmV2aW91c0NsYXNzZXNQYWdlLnZ1ZT8yMjk5Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvcHJldmlvdXNDbGFzc2lmaWNhdGlvbnNQYWdlLnZ1ZT83ZTZmIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvcmVnaXN0ZXJUdXRvcmluZy52dWU/NTMwMSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NjaGVkdWxlVHV0b3JpbmcudnVlPzZlYzAiLCJ3ZWJwYWNrOi8vLy4gc3luYyBub25yZWN1cnNpdmUgXlxcLlxcL2FwcFxcLihjc3N8c2Nzc3xsZXNzfHNhc3MpJCIsIndlYnBhY2s6Ly8vXFxiX1tcXHctXSpcXC4pc2NzcykkIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2NsYXNzUGFnZS52dWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9jbGFzc1BhZ2UudnVlPzhmODIiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9jbGFzc1BhZ2UudnVlP2U0NjQiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9jbGFzc1BhZ2UudnVlPzI5M2EiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9lZGl0VHV0b3JpYWwudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvZWRpdFR1dG9yaWFsLnZ1ZT9lYmFlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvZWRpdFR1dG9yaWFsLnZ1ZT83ODU5Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvZWRpdFR1dG9yaWFsLnZ1ZT84ZjgyIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvaW5pdGlhbFBhZ2UudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvaW5pdGlhbFBhZ2UudnVlPzEyNjciLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9pbml0aWFsUGFnZS52dWU/NjIzNyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2luaXRpYWxQYWdlLnZ1ZT9mODZlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbGlzdEFyY2hpdmVkVHV0b3JpYWxzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2xpc3RBcmNoaXZlZFR1dG9yaWFscy52dWU/NzJlNiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2xpc3RBcmNoaXZlZFR1dG9yaWFscy52dWU/NDM5YSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2xpc3RBcmNoaXZlZFR1dG9yaWFscy52dWU/NGM1YSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2xpc3RUdXRvcmlhbHMudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbGlzdFR1dG9yaWFscy52dWU/YzEwNyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2xpc3RUdXRvcmlhbHMudnVlP2UyNTIiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9saXN0VHV0b3JpYWxzLnZ1ZT8wNTRlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbG9naW5QYWdlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2xvZ2luUGFnZS52dWU/NmNmZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2xvZ2luUGFnZS52dWU/NDA4YiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2xvZ2luUGFnZS52dWU/ZTQxZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21haW5QYWdlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21haW5QYWdlLnZ1ZT83ZWY1Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbWFpblBhZ2UudnVlPzQwYjQiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tYWluUGFnZS52dWU/MWQwMiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3ByZXZpb3VzQ2xhc3Nlc1BhZ2UudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvcHJldmlvdXNDbGFzc2VzUGFnZS52dWU/MjdmMCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3ByZXZpb3VzQ2xhc3Nlc1BhZ2UudnVlP2M4NjMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9wcmV2aW91c0NsYXNzZXNQYWdlLnZ1ZT9hZTkxIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvcHJldmlvdXNDbGFzc2lmaWNhdGlvbnNQYWdlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3ByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZS52dWU/NTYwNyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3ByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZS52dWU/NDk4NyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3ByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZS52dWU/MDE1MyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3JlZ2lzdGVyVHV0b3JpbmcudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvcmVnaXN0ZXJUdXRvcmluZy52dWU/ZTY4ZiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3JlZ2lzdGVyVHV0b3JpbmcudnVlPzQyMjIiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9yZWdpc3RlclR1dG9yaW5nLnZ1ZT81MDc3Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2NoZWR1bGVUdXRvcmluZy52dWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zY2hlZHVsZVR1dG9yaW5nLnZ1ZT80ZWRjIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2NoZWR1bGVUdXRvcmluZy52dWU/OTU2MSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NjaGVkdWxlVHV0b3JpbmcudnVlPzI2OWYiXSwibmFtZXMiOlsiUmFkU2lkZURyYXdlciIsIlZ1ZSIsInVzZSIsIlZ1ZXgiLCJSYWRMaXN0VmlldyIsImh0dHBNb2R1bGUiLCJyZXF1aXJlIiwibW9kYWxQaWNrZXIiLCJMb2NhbE5vdGlmaWNhdGlvbnMiLCJhbmRyb2lkIiwiQW5kcm9pZEFwcGxpY2F0aW9uIiwiaXNBbmRyb2lkIiwiYXBwU2V0dGluZ3MiLCJzdG9yZSIsIlN0b3JlIiwic3RhdGUiLCJodHRwIiwibm90aWZpY2F0aW9ucyIsImFuZHJvaWRBcHAiLCJ1c2VyIiwibG9naW5QZXJtYW5lbnQiLCJtdXRhdGlvbnMiLCJkZWZpbmVVc2VyIiwiZGVzdHJveVVzZXIiLCJkZWZpbmVMb2dpbiIsImlzTG9naW5QZXJtYW5lbnQiLCJsb2dpblBhZ2UiLCJtYWluUGFnZSIsImluaXRpYWxQYWdlIiwiY29tcG9uZW50IiwicHJldmlvdXNDbGFzc2VzUGFnZSIsInNjaGVkdWxlVHV0b3JpbmciLCJyZWdpc3RlclR1dG9yaW5nIiwibGlzdFR1dG9yaWFscyIsImxpc3RBcmNoaXZlZFR1dG9yaWFscyIsInJlZ2lzdGVyRWxlbWVudCIsIm1vZGVsIiwiZXZlbnQiLCJmaXJzdFBhZ2UiLCJyZW5kZXIiLCJoIiwibm9tZSIsIiRzdG9yZSIsIiRzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHlCQUF5QjtBQUM3RCwyQkFBMkI7QUFDM0I7QUFDQSxvQ0FBb0M7QUFDcEMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHlCQUF5QjtBQUM3RCwyQkFBMkI7QUFDM0I7QUFDQSxvQ0FBb0M7QUFDcEMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHlCQUF5QjtBQUM3RCwyQkFBMkI7QUFDM0I7QUFDQSxvQ0FBb0M7QUFDcEMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MseUJBQXlCO0FBQzdELDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxvQkFBb0I7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msb0JBQW9CO0FBQ3RELCtCQUErQjtBQUMvQix5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHlCQUF5QjtBQUM3RCwyQkFBMkI7QUFDM0I7QUFDQSxvQ0FBb0M7QUFDcEMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsaUJBQWlCO0FBQ3JELDhCQUE4QjtBQUM5QixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLHFCQUFxQjtBQUM3RCxxQ0FBcUM7QUFDckMsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFNBQVMsMkJBQTJCLEVBQUU7QUFDL0U7QUFDQTtBQUNBLDBEQUEwRCxvQkFBb0I7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QyxpREFBaUQ7QUFDakQsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMscUNBQXFDO0FBQ3JDLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMscUNBQXFDO0FBQ3JDLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsNkJBQTZCO0FBQ3RELDZDQUE2QyxNQUFNLHdCQUF3QixFQUFFO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHNDQUFzQztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLGlDQUFpQztBQUNqQywyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyx5Q0FBeUM7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyw2QkFBNkI7QUFDakUsaUNBQWlDO0FBQ2pDLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLG1DQUFtQztBQUN2RSxpQ0FBaUM7QUFDakMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdmRBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssZUFBZSx1QkFBdUIsRUFBRTtBQUM3QztBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsZUFBZSxFQUFFO0FBQ25DO0FBQ0E7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDLGlCQUFpQjtBQUNqQixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixxQkFBcUI7QUFDckIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSw4QkFBOEIsMEJBQTBCO0FBQ3hELHdCQUF3Qix5QkFBeUIsdUJBQXVCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLDhCQUE4QiwwQkFBMEI7QUFDeEQ7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSw4QkFBOEIsMEJBQTBCO0FBQ3hELHdCQUF3Qix5QkFBeUIsdUJBQXVCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLHFCQUFxQjtBQUNyQixlQUFlO0FBQ2Y7QUFDQTtBQUNBLDhCQUE4QiwwQkFBMEI7QUFDeEQsd0JBQXdCLHlCQUF5Qix1QkFBdUI7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixxQkFBcUI7QUFDckIsZUFBZTtBQUNmO0FBQ0E7QUFDQSw4QkFBOEIsMEJBQTBCO0FBQ3hELHdCQUF3Qix5QkFBeUIsdUJBQXVCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIscUJBQXFCO0FBQ3JCLGVBQWU7QUFDZjtBQUNBO0FBQ0EsOEJBQThCLDBCQUEwQjtBQUN4RCx3QkFBd0IseUJBQXlCLHVCQUF1QjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFNBQVMsaUJBQWlCLEVBQUU7QUFDL0Q7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFNBQVMsZ0NBQWdDLEVBQUU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsbUJBQW1CO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLHFDQUFxQztBQUNyQywrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLHFDQUFxQztBQUNyQywrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQyx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLG9DQUFvQztBQUNwQywyQkFBMkI7QUFDM0I7QUFDQSxvQ0FBb0M7QUFDcEMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxvQkFBb0I7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzdhQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLGVBQWUsdUJBQXVCLEVBQUU7QUFDN0M7QUFDQTtBQUNBLG1DQUFtQyxTQUFTLGlCQUFpQixFQUFFO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixTQUFTLCtCQUErQixFQUFFO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyxxQ0FBcUM7QUFDckMsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLHFDQUFxQztBQUNyQywrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLG9CQUFvQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsYUFBYTtBQUNiLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM3T0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxrQ0FBa0MsRUFBRTtBQUMxRDtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGdDQUFnQztBQUMxRCxvQkFBb0I7QUFDcEIsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixrQkFBa0I7QUFDOUMsc0JBQXNCO0FBQ3RCLGFBQWE7QUFDYjtBQUNBLDJCQUEyQixTQUFTLHVDQUF1QyxFQUFFO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxrQ0FBa0MsRUFBRTtBQUMxRDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUyxnREFBZ0QsRUFBRTtBQUM1RTtBQUNBLCtCQUErQixTQUFTLCtCQUErQixFQUFFO0FBQ3pFO0FBQ0Esa0NBQWtDLGVBQWU7QUFDakQsNEJBQTRCO0FBQzVCLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTLGtDQUFrQyxFQUFFO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLGdEQUFnRCxFQUFFO0FBQzVFO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsbUJBQW1CO0FBQ25CO0FBQ0Esa0NBQWtDLGVBQWU7QUFDakQsNEJBQTRCO0FBQzVCLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTLGtDQUFrQyxFQUFFO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLGdEQUFnRCxFQUFFO0FBQzVFO0FBQ0EsK0JBQStCLFNBQVMsa0NBQWtDLEVBQUU7QUFDNUU7QUFDQSxrQ0FBa0MsZUFBZTtBQUNqRCw0QkFBNEI7QUFDNUIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxrQ0FBa0MsRUFBRTtBQUMxRDtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsa0NBQWtDLEVBQUU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsZ0RBQWdELEVBQUU7QUFDNUU7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QixtQkFBbUI7QUFDbkI7QUFDQSxrQ0FBa0MsZUFBZTtBQUNqRCw0QkFBNEI7QUFDNUIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLHFCQUFxQjtBQUNyQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsaUJBQWlCO0FBQ2pCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsaUJBQWlCO0FBQ2pCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2U0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixzQ0FBc0M7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLG1DQUFtQyxTQUFTLGlCQUFpQixFQUFFO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVMsMEJBQTBCLEVBQUU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIscUJBQXFCLDBCQUEwQixFQUFFO0FBQzVFO0FBQ0EseUNBQXlDLFNBQVMsZ0JBQWdCLEVBQUU7QUFDcEU7QUFDQTtBQUNBLCtCQUErQixTQUFTLDRCQUE0QixFQUFFO0FBQ3RFO0FBQ0EsNkNBQTZDLFNBQVMscUJBQXFCLEVBQUU7QUFDN0U7QUFDQSwwQ0FBMEM7QUFDMUMsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2Qix5Q0FBeUMsb0JBQW9CO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2hHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUU7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUo7Ozs7Ozs7O0FDeEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUEsT0FBT0EseUJBQVA7QUFDQUMsR0FBRyxDQUFDQyxHQUFKLENBQVFGLElBQVI7QUFFQSxPQUFPRyxJQUFQO0FBQ0FGLEdBQUcsQ0FBQ0MsR0FBSixDQUFRQyxJQUFSO0FBRUEsT0FBT0MsV0FBUCxNQUF3QixpRkFBeEI7QUFDQUgsR0FBRyxDQUFDQyxHQUFKLENBQVFFLFdBQVI7O0FBRUEsTUFBTUMsVUFBVSxHQUFHQyxPQUFPLENBQUMsb0JBQTNCOztBQUNBLE1BQU1DLFdBQVcsR0FBR0QsT0FBTyxDQUEzQjs7QUFFQTs7QUFDQSxTQUFTRSxrQkFBVCxRQUFtQyxrQ0FBbkM7QUFFQSxTQUFTQyxPQUFULEVBQW1CQyxnQkFBbkI7QUFDQSxTQUFTQyxTQUFULFFBQTBCLDJCQUExQjs7QUFFQSxNQUFNQyxRQUFOOztBQUVBLE1BQU1DLEtBQUssR0FBRyxJQUFJVixJQUFJLENBQUNXLEtBQVQsQ0FBZTtBQUN6QkMsT0FBSyxFQUFFO0FBQ0hDLFFBQUksQ0FERDtBQUVIVCxRQUZHO0FBR0hVLGlCQUFhLEVBQUVULGtLQUhaO0FBSUhDLFdBQU8sRUFBRUEsT0FKTjtBQUtIUyxjQUFVLEVBQUVSLE9BTFQ7QUFNSEMsYUFBUyxFQUFFQSxTQU5SO0FBT0hDLGVBQVcsRUFBRUEsV0FQVjtBQVFITyxRQUFJLEVBQUUsSUFSSDtBQVNIQyxhQUFnQjtBQVRiLEdBRGtCO0FBWXpCQywyQkFBVztBQUNQQyxRQUF3QjtBQUNwQjtBQUNILHlEQUhNOztBQUlQQywwR0FBbUI7QUFDZjtBQUNILHlEQU5NOztBQU9QQyxlQUFXLENBQUNULHNCQUFPSyxrREFBZ0I7QUFDL0I7QUFDSDs7QUFUTSxtQkFaYztBQXVCaEI7QUFDYTtBQUNkO0FBRkM7O0FBSUxLLG9CQUFnQixvQkFBUTtBQUNwQjtBQUNIOztBQU5JO0FBdkJnQixDQUFmLENBQWQ7QUFpQ0EsT0FBT0MsU0FBUCxzRkFBc0IsQ0FBdEI7QUFDQSxPQUFPQywwRUFBUDtBQUVBLE9BQU9DLHdGQUFpQixDQUF4QjtBQUNBM0IsR0FBRyxDQUFDNEIsU0FBSixDQUFjLHFFQUFkO0FBQ0EsT0FBT0MsbUJBQVA7QUFDQTdCLEdBQUcsQ0FBQzRCLFNBQUosQ0FBYyxDQUFkO0FBQ0EsT0FBT0UsZ0JBQVA7QUFDQTlCLEdBQUcsQ0FBSDtBQUNBLE9BQU8rQixPQUFQO0FBQ0EvQixHQUFHLENBQUM0QixTQUFKLENBQWMsZUFBZDtBQUNBLE9BQU9JLGFBQVA7QUFDQWhDLEdBQUcsQ0FBQzRCLEVBQUo7QUFDQTtBQUNBNUIsR0FBRyxDQUFDNEIsU0FBSixDQUFjLFVBQWQ7QUFDQSxPQUFPSyxpQkFBUDtBQUNBakMsR0FBRyxDQUFDNEIsRUFBSjtBQUNBO0FBQ0E1QixHQUFHLENBQUM0QixTQUFKLENBQWMsMEJBQWQ7QUFFQTVCLEdBQUcsQ0FBQ2tDLGVBQUosQ0FDSSxVQURKLEVBRUksTUFBTTdCLE1BQ047QUFDSThCLEtBQU87QUFBQTtBQUVIQyxJQUFPO0FBRko7QUFEWCxDQUhKO0FBV0FwQyxHQUFHLENBQUNrQyxlQUFKLENBQ0ksVUFESjtBQUtBLElBQUlHLEVBQUo7QUFFUTtBQUNKQyxRQUFNLEVBQUVDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLE9BQUQsRUFBVSxDQUFDQSxDQUFDLENBRHRCO0FBRUozQixPQUFLLEVBQUVBLEtBRkg7O0FBR0s7QUFDTDs7QUFDd0M7QUFDSDtBQUFBO0FBQW9ENEIsZ0VBQUksRUFBRSxLQUFLQyxNQUFMLENBQVkzQixtRUFBTUgsRUFBNUU7QUFBbUg7QUFBbkgsMkRBQWpDO0FBQ0g7O0FBQ0Q7QUFDSDs7QUFURyx1REFVTCtCLE1BVkg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFvRztBQUN2QztBQUNMO0FBQ3FDOzs7QUFHN0Y7QUFDMEY7QUFDMUYsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsK0VBQU07QUFDUixFQUFFLGdHQUFNO0FBQ1IsRUFBRSx5R0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksSUFBVTtBQUNkLFlBQVksbUJBQU8sQ0FBQyxrREFBNEY7QUFDaEgsY0FBYyxtQkFBTyxDQUFDLGdEQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxzQkFBc0IsdUVBQTRELEVBQUU7QUFBQTtBQUNwRjtBQUNBLGdCQUFnQixnR0FBTTtBQUN0Qix5QkFBeUIseUdBQWU7QUFDeEMsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDZSxnRjs7Ozs7Ozs7QUN2Q2Y7QUFBQTtBQUFBLHdDQUF5SyxDQUFnQiw2T0FBRyxFQUFDLEM7Ozs7Ozs7O0FDQTdMO0FBQUE7QUFBQTtBQUFBO0FBQTZZLENBQWdCLDRiQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBamE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXVHO0FBQ3ZDO0FBQ0w7QUFDcUM7OztBQUdoRztBQUMwRjtBQUMxRixnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSxrRkFBTTtBQUNSLEVBQUUsbUdBQU07QUFDUixFQUFFLDRHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxJQUFVO0FBQ2QsWUFBWSxtQkFBTyxDQUFDLGtEQUE0RjtBQUNoSCxjQUFjLG1CQUFPLENBQUMsZ0RBQUs7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHNCQUFzQiwwRUFBK0QsRUFBRTtBQUFBO0FBQ3ZGO0FBQ0EsZ0JBQWdCLG1HQUFNO0FBQ3RCLHlCQUF5Qiw0R0FBZTtBQUN4QyxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNlLGdGOzs7Ozs7OztBQ3ZDZjtBQUFBO0FBQUEsd0NBQTRLLENBQWdCLGdQQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBaE07QUFBQTtBQUFBO0FBQUE7QUFBZ1osQ0FBZ0IsK2JBQUcsRUFBQyxDOzs7Ozs7OztBQ0FwYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBc0c7QUFDdkM7QUFDTDtBQUNxQzs7O0FBRy9GO0FBQzBGO0FBQzFGLGdCQUFnQiwyR0FBVTtBQUMxQixFQUFFLGlGQUFNO0FBQ1IsRUFBRSxrR0FBTTtBQUNSLEVBQUUsMkdBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLElBQVU7QUFDZCxZQUFZLG1CQUFPLENBQUMsa0RBQTRGO0FBQ2hILGNBQWMsbUJBQU8sQ0FBQyxnREFBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esc0JBQXNCLHlFQUE4RCxFQUFFO0FBQUE7QUFDdEY7QUFDQSxnQkFBZ0Isa0dBQU07QUFDdEIseUJBQXlCLDJHQUFlO0FBQ3hDLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ2UsZ0Y7Ozs7Ozs7O0FDdkNmO0FBQUE7QUFBQSx3Q0FBMkssQ0FBZ0IsK09BQUcsRUFBQyxDOzs7Ozs7OztBQ0EvTDtBQUFBO0FBQUE7QUFBQTtBQUErWSxDQUFnQiw4YkFBRyxFQUFDLEM7Ozs7Ozs7O0FDQW5hO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFnSDtBQUN2QztBQUNMO0FBQ3FDOzs7QUFHekc7QUFDMEY7QUFDMUYsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsMkZBQU07QUFDUixFQUFFLDRHQUFNO0FBQ1IsRUFBRSxxSEFBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksSUFBVTtBQUNkLFlBQVksbUJBQU8sQ0FBQyxrREFBNEY7QUFDaEgsY0FBYyxtQkFBTyxDQUFDLGdEQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxzQkFBc0IsbUZBQXdFLEVBQUU7QUFBQTtBQUNoRztBQUNBLGdCQUFnQiw0R0FBTTtBQUN0Qix5QkFBeUIscUhBQWU7QUFDeEMsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDZSxnRjs7Ozs7Ozs7QUN2Q2Y7QUFBQTtBQUFBLHdDQUFxTCxDQUFnQix5UEFBRyxFQUFDLEM7Ozs7Ozs7O0FDQXpNO0FBQUE7QUFBQTtBQUFBO0FBQXlaLENBQWdCLHdjQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBN2E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXdHO0FBQ3ZDO0FBQ0w7QUFDcUM7OztBQUdqRztBQUMwRjtBQUMxRixnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSxtRkFBTTtBQUNSLEVBQUUsb0dBQU07QUFDUixFQUFFLDZHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxJQUFVO0FBQ2QsWUFBWSxtQkFBTyxDQUFDLGtEQUE0RjtBQUNoSCxjQUFjLG1CQUFPLENBQUMsZ0RBQUs7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHNCQUFzQiwyRUFBZ0UsRUFBRTtBQUFBO0FBQ3hGO0FBQ0EsZ0JBQWdCLG9HQUFNO0FBQ3RCLHlCQUF5Qiw2R0FBZTtBQUN4QyxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNlLGdGOzs7Ozs7OztBQ3ZDZjtBQUFBO0FBQUEsd0NBQTZLLENBQWdCLGlQQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBak07QUFBQTtBQUFBO0FBQUE7QUFBaVosQ0FBZ0IsZ2NBQUcsRUFBQyxDOzs7Ozs7OztBQ0FyYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0c7QUFDdkM7QUFDTDtBQUNxQzs7O0FBRzdGO0FBQzBGO0FBQzFGLGdCQUFnQiwyR0FBVTtBQUMxQixFQUFFLCtFQUFNO0FBQ1IsRUFBRSxnR0FBTTtBQUNSLEVBQUUseUdBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLElBQVU7QUFDZCxZQUFZLG1CQUFPLENBQUMsa0RBQTRGO0FBQ2hILGNBQWMsbUJBQU8sQ0FBQyxnREFBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esc0JBQXNCLHVFQUE0RCxFQUFFO0FBQUE7QUFDcEY7QUFDQSxnQkFBZ0IsZ0dBQU07QUFDdEIseUJBQXlCLHlHQUFlO0FBQ3hDLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ2UsZ0Y7Ozs7Ozs7O0FDdkNmO0FBQUE7QUFBQSx3Q0FBeUssQ0FBZ0IsNk9BQUcsRUFBQyxDOzs7Ozs7OztBQ0E3TDtBQUFBO0FBQUE7QUFBQTtBQUE2WSxDQUFnQiw0YkFBRyxFQUFDLEM7Ozs7Ozs7O0FDQWphO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFtRztBQUN2QztBQUNMO0FBQ3FDOzs7QUFHNUY7QUFDMEY7QUFDMUYsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsOEVBQU07QUFDUixFQUFFLCtGQUFNO0FBQ1IsRUFBRSx3R0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksSUFBVTtBQUNkLFlBQVksbUJBQU8sQ0FBQyxrREFBNEY7QUFDaEgsY0FBYyxtQkFBTyxDQUFDLGdEQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxzQkFBc0Isc0VBQTJELEVBQUU7QUFBQTtBQUNuRjtBQUNBLGdCQUFnQiwrRkFBTTtBQUN0Qix5QkFBeUIsd0dBQWU7QUFDeEMsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDZSxnRjs7Ozs7Ozs7QUN2Q2Y7QUFBQTtBQUFBLHdDQUF3SyxDQUFnQiw0T0FBRyxFQUFDLEM7Ozs7Ozs7O0FDQTVMO0FBQUE7QUFBQTtBQUFBO0FBQTRZLENBQWdCLDJiQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBaGE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThHO0FBQ3ZDO0FBQ0w7QUFDcUM7OztBQUd2RztBQUMwRjtBQUMxRixnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSx5RkFBTTtBQUNSLEVBQUUsMEdBQU07QUFDUixFQUFFLG1IQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxJQUFVO0FBQ2QsWUFBWSxtQkFBTyxDQUFDLGtEQUE0RjtBQUNoSCxjQUFjLG1CQUFPLENBQUMsZ0RBQUs7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHNCQUFzQixpRkFBc0UsRUFBRTtBQUFBO0FBQzlGO0FBQ0EsZ0JBQWdCLDBHQUFNO0FBQ3RCLHlCQUF5QixtSEFBZTtBQUN4QyxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNlLGdGOzs7Ozs7OztBQ3ZDZjtBQUFBO0FBQUEsd0NBQW1MLENBQWdCLHVQQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBdk07QUFBQTtBQUFBO0FBQUE7QUFBdVosQ0FBZ0Isc2NBQUcsRUFBQyxDOzs7Ozs7OztBQ0EzYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBc0g7QUFDdkM7QUFDTDtBQUNxQzs7O0FBRy9HO0FBQzBGO0FBQzFGLGdCQUFnQiwyR0FBVTtBQUMxQixFQUFFLGlHQUFNO0FBQ1IsRUFBRSxrSEFBTTtBQUNSLEVBQUUsMkhBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLElBQVU7QUFDZCxZQUFZLG1CQUFPLENBQUMsa0RBQTRGO0FBQ2hILGNBQWMsbUJBQU8sQ0FBQyxnREFBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esc0JBQXNCLHlGQUE4RSxFQUFFO0FBQUE7QUFDdEc7QUFDQSxnQkFBZ0Isa0hBQU07QUFDdEIseUJBQXlCLDJIQUFlO0FBQ3hDLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ2UsZ0Y7Ozs7Ozs7O0FDdkNmO0FBQUE7QUFBQSx3Q0FBMkwsQ0FBZ0IsK1BBQUcsRUFBQyxDOzs7Ozs7OztBQ0EvTTtBQUFBO0FBQUE7QUFBQTtBQUErWixDQUFnQiw4Y0FBRyxFQUFDLEM7Ozs7Ozs7O0FDQW5iO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEyRztBQUN2QztBQUNMO0FBQ3FDOzs7QUFHcEc7QUFDMEY7QUFDMUYsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsc0ZBQU07QUFDUixFQUFFLHVHQUFNO0FBQ1IsRUFBRSxnSEFBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksSUFBVTtBQUNkLFlBQVksbUJBQU8sQ0FBQyxrREFBNEY7QUFDaEgsY0FBYyxtQkFBTyxDQUFDLGdEQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxzQkFBc0IsOEVBQW1FLEVBQUU7QUFBQTtBQUMzRjtBQUNBLGdCQUFnQix1R0FBTTtBQUN0Qix5QkFBeUIsZ0hBQWU7QUFDeEMsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDZSxnRjs7Ozs7Ozs7QUN2Q2Y7QUFBQTtBQUFBLHdDQUFnTCxDQUFnQixvUEFBRyxFQUFDLEM7Ozs7Ozs7O0FDQXBNO0FBQUE7QUFBQTtBQUFBO0FBQW9aLENBQWdCLG1jQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBeGE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTJHO0FBQ3ZDO0FBQ0w7QUFDcUM7OztBQUdwRztBQUMwRjtBQUMxRixnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSxzRkFBTTtBQUNSLEVBQUUsdUdBQU07QUFDUixFQUFFLGdIQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxJQUFVO0FBQ2QsWUFBWSxtQkFBTyxDQUFDLGtEQUE0RjtBQUNoSCxjQUFjLG1CQUFPLENBQUMsZ0RBQUs7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHNCQUFzQiw4RUFBbUUsRUFBRTtBQUFBO0FBQzNGO0FBQ0EsZ0JBQWdCLHVHQUFNO0FBQ3RCLHlCQUF5QixnSEFBZTtBQUN4QyxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNlLGdGOzs7Ozs7OztBQ3ZDZjtBQUFBO0FBQUEsd0NBQWdMLENBQWdCLG9QQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBcE07QUFBQTtBQUFBO0FBQUE7QUFBb1osQ0FBZ0IsbWNBQUcsRUFBQyxDOzs7Ozs7OztBQ0F4YTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICAgIDxQYWdlIGFjdGlvbkJhckhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPFJhZFNpZGVEcmF3ZXIgcmVmPVwiZHJhd2VyQ29udGVudFwiIGRyYXdlckxvY2F0aW9uPVwiTGVmdFwiIGdlc3R1cmVzRW5hYmxlZD1cInRydWVcIj5cbiAgICAgICAgICAgIDxTdGFja0xheW91dCB+ZHJhd2VyQ29udGVudD5cbiAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgY2xhc3M9XCJudC1kcmF3ZXJfX2hlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8SW1hZ2UgY2xhc3M9XCJudC1kcmF3ZXJfX2hlYWRlci1pbWFnZSBmYXMgdC0zNlwiIHNyYy5kZWNvZGU9XCJmb250Oi8vJiN4ZjJiZDtcIiBzdHlsZT1cImNvbG9yOndoaXRlXCI+PC9JbWFnZT5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwibmFtZVwiIGNsYXNzPVwiaGVhZGVyLWVsZW1cIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8TGFiZWwgOnRleHQ9XCJlbWFpbFwiIGNsYXNzPVwiaGVhZGVyLWVsZW1cIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICA8U2Nyb2xsVmlldyBjbGFzcz1cIm50LWRyYXdlcl9fYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZExheW91dCB2LWZvcj1cImNvbnRlbnQgaW4gY29udGVudHNcIiA6a2V5PVwiY29udGVudC5pZFwiIGNvbHVtbnM9XCIqXCIgY2xhc3M9XCJudC1kcmF3ZXJfX2xpc3QtaXRlbVwiIDpiYWNrZ3JvdW5kQ29sb3I9XCJzZWxlY3RlZENvbnRlbnQubm9tZSA9PT0gY29udGVudC5ub21lID8gJyNlMGY1ZmYnIDogJ3doaXRlJ1wiIDpjb2xvcj1cInNlbGVjdGVkQ29udGVudC5ub21lID09PSBjb250ZW50Lm5vbWUgPyAnIzAwODhjOScgOiAnYmxhY2snXCIgQHRhcD1cIm9uTmF2aWdhdGlvbkl0ZW1UYXAoY29udGVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgOnRleHQ9XCJnZXRDb250ZW50Q2xhc3NpZmljYXRpb24oY29udGVudC5pZCkgKyBjb250ZW50Lm5vbWVcIiA6Y2xhc3M9XCIoY2hlY2tDbGFzc2lmaWNhdGlvbihjb250ZW50LmlkKSkgPyAnaGF2ZV9jbGFzc2lmaWNhdGlvbic6ICcnXCIgY29sPVwiMFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgICAgICA8RnJhbWUgfm1haW5Db250ZW50PlxuICAgICAgICAgICAgICAgIDxQYWdlPlxuICAgICAgICAgICAgICAgICAgICA8QWN0aW9uQmFyIDp0aXRsZT1cImNvdXJzZV91bml0XCIgc3R5bGU9XCJjb2xvcjp3aGl0ZVwiIEB0YXA9XCJzZWVUaXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGFuZHJvaWQgdi1pZj1cInRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZpZ2F0aW9uQnV0dG9uIGljb249XCJyZXM6Ly9tZW51XCIgQHRhcD1cIm9wZW5NZW51XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBY3Rpb25JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIlNhaXJcIiBmb250U2l6ZT1cIjE1XCIgaG9yaXpvbnRhbEFsaWdubWVudD1cInJpZ2h0XCIgc3R5bGU9XCJmb250LXdlaWdodDogYm9sZFwiIEB0YXA9XCJleGl0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQWN0aW9uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYW5kcm9pZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb3Mgdi1lbHNlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBY3Rpb25JdGVtIGljb249XCJyZXM6Ly9tZW51XCIgaW9zLnBvc2l0aW9uPVwibGVmdFwiIEB0YXA9XCJvcGVuTWVudVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWN0aW9uSXRlbSB0ZXh0PVwiU2FpclwiIGlvcy5wb3NpdGlvbj1cInJpZ2h0XCIgQHRhcD1cImV4aXRcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2lvcz5cbiAgICAgICAgICAgICAgICAgICAgPC9BY3Rpb25CYXI+XG5cbiAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgcm93cz1cIipcIiBjb2x1bW5zPVwiKlwiIGhlaWdodD1cIjEwMCVcIiB3aWR0aD1cIjEwMCVcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCByb3c9XCIwXCIgY29sPVwiMFwiIHZlcnRpY2FsQWxpZ25tZW50PVwiY2VudGVyXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBY3Rpdml0eUluZGljYXRvciA6YnVzeT1cImJ1c3lcIiB2LWlmPVwiYnVzeVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdi1pZj1cImJ1c3lcIiA6dGV4dD1cImJ1c3lUZXh0XCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKixhdXRvXCIgcm93cz1cImF1dG9cIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cInNlbGVjdGVkQ29udGVudC5ub21lXCIgdGV4dEFsaWdubWVudD1cImNlbnRlclwiIGZvbnRTaXplPVwiMzVcIiBjb2w9XCIwXCIgcm93PVwiMFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHNyYz1cIn4vb3RoZXJzL2luZm8taWNvbi5wbmdcIiBzdHJlY2g9XCJub25lXCIgd2lkdGg9XCI4JVwiIGNvbD1cIjFcIiByb3c9XCIwXCIgQHRhcD1cInNob3dJbmZvXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0PVwiQXZhbGllIGEgc3VhIGNvbXByZWVuc8OjbyBzb2JyZSBlc3RlIGNvbnRlw7pkb1wiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIiBzdHlsZT1cIm1hcmdpbi10b3A6IDUlXCIvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgY29sdW1ucz1cImF1dG8sYXV0byxhdXRvLGF1dG8sYXV0b1wiIHJvd3M9XCJhdXRvLGF1dG9cIiBzdHlsZT1cIm1hcmdpbi10b3A6IDUlOyBtYXJnaW4tYm90dG9tOiAxNSVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHNyYz1cIn4vc2NhbGUvMS5wbmdcIiBzdHJlY2g9XCJub25lXCIgY29sPVwiMFwiIHdpZHRoPVwiMjAlXCIgcm93PVwiMFwiIEB0YXA9XCJvbkNsYXNzQnV0dG9uVGFwKDEpXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugc3JjPVwifi9zY2FsZS8yLnBuZ1wiIHN0cmVjaD1cIm5vbmVcIiBjb2w9XCIxXCIgd2lkdGg9XCIyMCVcIiByb3c9XCIwXCIgQHRhcD1cIm9uQ2xhc3NCdXR0b25UYXAoMilcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9XCJ+L3NjYWxlLzMucG5nXCIgc3RyZWNoPVwibm9uZVwiIGNvbD1cIjJcIiB3aWR0aD1cIjIwJVwiIHJvdz1cIjBcIiBAdGFwPVwib25DbGFzc0J1dHRvblRhcCgzKVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHNyYz1cIn4vc2NhbGUvNC5wbmdcIiBzdHJlY2g9XCJub25lXCIgY29sPVwiM1wiIHdpZHRoPVwiMjAlXCIgcm93PVwiMFwiIEB0YXA9XCJvbkNsYXNzQnV0dG9uVGFwKDQpXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugc3JjPVwifi9zY2FsZS81LnBuZ1wiIHN0cmVjaD1cIm5vbmVcIiBjb2w9XCI0XCIgd2lkdGg9XCIyMCVcIiByb3c9XCIwXCIgQHRhcD1cIm9uQ2xhc3NCdXR0b25UYXAoNSlcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9XCJ+L290aGVycy8xLnBuZ1wiIHN0cmVjaD1cIm5vbmVcIiBjb2w9XCIwXCIgcm93PVwiMVwiIHdpZHRoPVwiMTAlXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIDp2aXNpYmlsaXR5PVwic2VsZWN0ZWRDbGFzcyA9PSAxID8gJ3Zpc2libGUnIDogJ2NvbGxhcHNlZCdcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9XCJ+L290aGVycy8yLnBuZ1wiIHN0cmVjaD1cIm5vbmVcIiBjb2w9XCIxXCIgcm93PVwiMVwiIHdpZHRoPVwiMTAlXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIDp2aXNpYmlsaXR5PVwic2VsZWN0ZWRDbGFzcyA9PSAyID8gJ3Zpc2libGUnIDogJ2NvbGxhcHNlZCdcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9XCJ+L290aGVycy8zLnBuZ1wiIHN0cmVjaD1cIm5vbmVcIiBjb2w9XCIyXCIgcm93PVwiMVwiIHdpZHRoPVwiMTAlXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIDp2aXNpYmlsaXR5PVwic2VsZWN0ZWRDbGFzcyA9PSAzID8gJ3Zpc2libGUnIDogJ2NvbGxhcHNlZCdcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9XCJ+L290aGVycy80LnBuZ1wiIHN0cmVjaD1cIm5vbmVcIiBjb2w9XCIzXCIgcm93PVwiMVwiIHdpZHRoPVwiMTAlXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIDp2aXNpYmlsaXR5PVwic2VsZWN0ZWRDbGFzcyA9PSA0ID8gJ3Zpc2libGUnIDogJ2NvbGxhcHNlZCdcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9XCJ+L290aGVycy81LnBuZ1wiIHN0cmVjaD1cIm5vbmVcIiBjb2w9XCI0XCIgcm93PVwiMVwiIHdpZHRoPVwiMTAlXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIDp2aXNpYmlsaXR5PVwic2VsZWN0ZWRDbGFzcyA9PSA1ID8gJ3Zpc2libGUnIDogJ2NvbGxhcHNlZCdcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgY29sdW1ucz1cIiosKlwiIHJvd3M9XCJhdXRvXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJib3R0b21cIiByb3c9XCIwXCIgY29sPVwiMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9XCJ+L290aGVycy9sZWZ0LWFycm93LnBuZ1wiIHN0cmVjaD1cIm5vbmVcIiB3aWR0aD1cIjE1JVwiIGNvbD1cIjBcIiByb3c9XCIwXCIgIHZlcnRpY2FsQWxpZ25tZW50PVwiYm90dG9tXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImxlZnRcIiBjbGFzcz1cImFycm93LWxlZnRcIiBAdGFwPVwic2VlUHJldmlvdXNcIiA6dmlzaWJpbGl0eT1cImFycm93TGVmdFZpc1wiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugc3JjPVwifi9vdGhlcnMvcmlnaHQtYXJyb3cucG5nXCIgc3RyZWNoPVwibm9uZVwiIHdpZHRoPVwiMTUlXCIgY29sPVwiMVwiIHJvdz1cIjBcIiB2ZXJ0aWNhbEFsaWdubWVudD1cImJvdHRvbVwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJyaWdodFwiIGNsYXNzPVwiYXJyb3ctcmlnaHRcIiBAdGFwPVwic2VlTmV4dFwiIDp2aXNpYmlsaXR5PVwiYXJyb3dSaWdodFZpc1wiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICAgICAgICAgIDwvUGFnZT5cbiAgICAgICAgICAgIDwvRnJhbWU+XG4gICAgICAgIDwvUmFkU2lkZURyYXdlcj5cbiAgICA8L1BhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBtYWluUGFnZSBmcm9tIFwiLi9tYWluUGFnZVwiO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczogWydjbGFzc19pZCddLFxuICAgICAgICBkYXRhOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm57XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy4kc3RvcmUuc3RhdGUudXNlci5ub21lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiB0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLm51bWVybyArIFwiQG15LmlwbGVpcmlhLnB0XCIsXG4gICAgICAgICAgICAgICAgY291cnNlX3VuaXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgdGVhY2hlcl9uYW1lOiBcIlwiLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvbnRlbnQ6IHt9LFxuICAgICAgICAgICAgICAgIGNsYXNzaWZpY2F0aW9uczogW10sXG4gICAgICAgICAgICAgICAgb2xkQ2xhc3M6IFtdLFxuICAgICAgICAgICAgICAgIGNsYXNzX2NvbnQ6IFtdLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2xhc3M6IFwiXCIsXG4gICAgICAgICAgICAgICAgYXJyb3dSaWdodFZpczogXCJ2aXNpYmxlXCIsXG4gICAgICAgICAgICAgICAgYXJyb3dMZWZ0VmlzOiBcImNvbGxhcHNlZFwiLFxuICAgICAgICAgICAgICAgIGlkeFNlbGVjdGVkQ29udGVudDogMCxcbiAgICAgICAgICAgICAgICBidXN5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBidXN5VGV4dDogXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOntcbiAgICAgICAgICAgIHNlZVRpdGxlKCl7XG4gICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmZvcm1hw6fDo28gLSBBdWxhXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiXFxuVW5pZGFkZSBDdXJyaWN1bGFyOiBcIit0aGlzLmNvdXJzZV91bml0K1wiXFxuXFxuUHJvZmVzc29yKGEpOiBcIit0aGlzLnRlYWNoZXJfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkZlY2hhclwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXhpdCgpe1xuICAgICAgICAgICAgICAgIGxldCB2bSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNhaXJcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUZW0gYSBjZXJ0ZXphIHF1ZSBkZXNlamEgc2FpciBkYSBhdWxhIGF0dWFsP1wiLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiU2ltXCIsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTsOjb1wiXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5jbGVhckhvb2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLiRuYXZpZ2F0ZVRvKG1haW5QYWdlKS5jYXRjaChlPT5jb25zb2xlLmxvZyhlKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcGVuTWVudSgpe1xuICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMuZHJhd2VyQ29udGVudC5zaG93RHJhd2VyKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25OYXZpZ2F0aW9uSXRlbVRhcChjb250ZW50KXtcbiAgICAgICAgICAgICAgICB0aGlzLmlkeFNlbGVjdGVkQ29udGVudCA9IHRoaXMuY29udGVudHMuaW5kZXhPZihjb250ZW50KTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlkeFNlbGVjdGVkQ29udGVudCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycm93UmlnaHRWaXMgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJvd0xlZnRWaXMgPSBcImNvbGxhcHNlZFwiO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaWR4U2VsZWN0ZWRDb250ZW50ID4gKHRoaXMuY29udGVudHMubGVuZ3RoLTIpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJvd1JpZ2h0VmlzID0gXCJjb2xsYXBzZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJvd0xlZnRWaXMgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJvd1JpZ2h0VmlzID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyb3dMZWZ0VmlzID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQ29sb3JCdG4obnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5kcmF3ZXJDb250ZW50LmNsb3NlRHJhd2VyKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VlTmV4dCgpe1xuICAgICAgICAgICAgICAgIHRoaXMub25OYXZpZ2F0aW9uSXRlbVRhcCh0aGlzLmNvbnRlbnRzW3RoaXMuaWR4U2VsZWN0ZWRDb250ZW50KzFdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWVQcmV2aW91cygpe1xuICAgICAgICAgICAgICAgIHRoaXMub25OYXZpZ2F0aW9uSXRlbVRhcCh0aGlzLmNvbnRlbnRzW3RoaXMuaWR4U2VsZWN0ZWRDb250ZW50LTFdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNsYXNzQnV0dG9uVGFwKGNsYXNzaWZpY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2xkQ2xhc3MubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc2lmaWNhdGlvbiA9PSB0aGlzLm9sZENsYXNzWzBdLmNsYXNzaWZpY2F0aW9uICYmIHRoaXMuc2VsZWN0ZWRDb250ZW50LmlkID09IHRoaXMub2xkQ2xhc3NbMF0uY29udGVudF9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHZtID0gdGhpcztcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2xhc3NpZmljYXRpb25zLmluZGV4T2YodGhpcy5zZWxlY3RlZENvbnRlbnQuaWQpIDwgMCl7ICAvL1NUT1JFXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovLzE0Mi45My4xNDIuMjA4L2FwaS9jbGFzc2lmaWNhY2FvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbG9yOiBjbGFzc2lmaWNhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXVkb19pZDogdGhpcy5zZWxlY3RlZENvbnRlbnQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx1bm9faWQ6IHRoaXMuJHN0b3JlLnN0YXRlLnVzZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVsYV9pZDogdGhpcy5jbGFzc19pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gNDA0IHx8IHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gNDAwKXsgICAvL0VSUk9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuY29udGVudC50b0pTT04oKS5tc2csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5jb250ZW50LnRvSlNPTigpLmVzdGFkbyA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uJG5hdmlnYXRlVG8obWFpblBhZ2UpLmNhdGNoKGU9PmNvbnNvbGUubG9nKGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09IDIwMCl7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DT1JSRVUgQkVNXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VDb2xvckJ0bihjbGFzc2lmaWNhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc2lmaWNhdGlvbnMucHVzaCh0aGlzLnNlbGVjdGVkQ29udGVudC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbGRDbGFzc1swXSA9IHtjb250ZW50X2lkOnRoaXMuc2VsZWN0ZWRDb250ZW50LmlkLGNsYXNzaWZpY2F0aW9uOmNsYXNzaWZpY2F0aW9ufTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9VUERBVEVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTQyLjkzLjE0Mi4yMDgvYXBpL2NsYXNzaWZpY2FjYW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxvcjogY2xhc3NpZmljYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV1ZG9faWQ6IHRoaXMuc2VsZWN0ZWRDb250ZW50LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdW5vX2lkOiB0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1bGFfaWQ6IHRoaXMuY2xhc3NfaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09IDQwNCB8fCByZXNwb25zZS5zdGF0dXNDb2RlID09IDQwMCl7ICAgLy9FUlJPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkubXNnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuY29udGVudC50b0pTT04oKS5lc3RhZG8gPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLiRuYXZpZ2F0ZVRvKG1haW5QYWdlKS5jYXRjaChlPT5jb25zb2xlLmxvZyhlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSAyMDApeyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ09SUkVVIEJFTVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub2xkQ2xhc3NbMF0gPSB7Y29udGVudF9pZDp0aGlzLnNlbGVjdGVkQ29udGVudC5pZCxjbGFzc2lmaWNhdGlvbjpjbGFzc2lmaWNhdGlvbn07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VDb2xvckJ0bihjbGFzc2lmaWNhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dJbmZvKCl7XG4gICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmZvcm1hw6fDo28gLSBDb250ZcO6ZG9cIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJcXG5EZXNpZ25hw6fDo286IFwiK3RoaXMuc2VsZWN0ZWRDb250ZW50Lm5vbWUrXCJcXG5cXG5UZW1hOiBcIit0aGlzLnNlbGVjdGVkQ29udGVudC50ZW1hLm5vbWUrXCJcXG5cXG5UaXBvOiBcIit0aGlzLnNlbGVjdGVkQ29udGVudC50aXBvK1wiXFxuXFxuRGVzY2nDp8OjbzogXCIrICh0aGlzLnNlbGVjdGVkQ29udGVudC5kZXNjcmljYW8gPT0gbnVsbCA/IFwiVmF6aWFcIiA6IHRoaXMuc2VsZWN0ZWRDb250ZW50LmRlc2NyaWNhbyksXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJGZWNoYXJcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZUNvbG9yQnRuKG5ld0NsYXNzKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNsYXNzaWZpY2F0aW9ucy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRDb250ZW50LmlkKSA8IDAgJiYgbmV3Q2xhc3M9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2xhc3MgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jbGFzc2lmaWNhdGlvbnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkQ29udGVudC5pZCkgPCAwICYmIG5ld0NsYXNzIT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc19jb250LnB1c2goe2NvbnRldWRvX2lkOiB0aGlzLnNlbGVjdGVkQ29udGVudC5pZCwgdmFsb3I6IG5ld0NsYXNzfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDbGFzcyA9IG5ld0NsYXNzO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHZhbG9yID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzX2NvbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5jb250ZXVkb19pZCA9PSB0aGlzLnNlbGVjdGVkQ29udGVudC5pZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXdDbGFzcyA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxvciA9IGl0ZW0udmFsb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbG9yID0gbmV3Q2xhc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsb3IgPSBuZXdDbGFzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENsYXNzID0gdmFsb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q29udGVudENsYXNzaWZpY2F0aW9uKGNvbnRlbnRfaWQpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2xhc3NpZmljYXRpb25zLmluZGV4T2YoY29udGVudF9pZCkgPCAwKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCB2YWxvciA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc19jb250LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0uY29udGV1ZG9faWQgPT0gY29udGVudF9pZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxvciA9IGl0ZW0udmFsb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAnKCcgKyB2YWxvciArICcpICc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hlY2tDbGFzc2lmaWNhdGlvbihjb250ZW50X2lkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbGFzc2lmaWNhdGlvbnMuaW5kZXhPZihjb250ZW50X2lkKSA+PSAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQmFja0V2ZW50IChkYXRhKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5jYW5jZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhpdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEhvb2soKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLiRzdG9yZS5zdGF0ZS5pc0FuZHJvaWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5hbmRyb2lkLm9uKHRoaXMuJHN0b3JlLnN0YXRlLmFuZHJvaWRBcHAuYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLm9uQmFja0V2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJIb29rKCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy4kc3RvcmUuc3RhdGUuaXNBbmRyb2lkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZC5vZmYodGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZEFwcC5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMub25CYWNrRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SG9vaygpO1xuICAgICAgICB9LFxuICAgICAgICBiZWZvcmVEZXN0cm95KCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckhvb2soKTtcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlZCgpe1xuICAgICAgICAgICAgdGhpcy5idXN5VGV4dCA9IFwiQSBjYXJyZWdhci4uLlwiO1xuICAgICAgICAgICAgdGhpcy5idXN5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvYXVsYS9cIit0aGlzLmNsYXNzX2lkLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIlxuICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZV91bml0ID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKS51bmlkYWRlX2N1cnJpY3VsYXIubm9tZTtcbiAgICAgICAgICAgICAgICB0aGlzLnRlYWNoZXJfbmFtZSA9IHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkucHJvZmVzc29yLm5vbWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovLzE0Mi45My4xNDIuMjA4L2FwaS9hdWxhL1wiK3RoaXMuY2xhc3NfaWQrXCIvY29udGV1ZG9zXCIsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIlxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudHMgPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpO1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNvbnRlbnRzLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkluZm9ybWHDp8Ojb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRXN0YSBhdWxhIG7Do28gdGVtIGNvbnRlw7pkb3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRlVG8obWFpblBhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb250ZW50ID0gdGhpcy5jb250ZW50c1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvYXVsYS9cIit0aGlzLmNsYXNzX2lkK1wiL2FsdW5vL1wiK3RoaXMuJHN0b3JlLnN0YXRlLnVzZXIuaWQrXCIvY2xhc3NpZmljYWNvZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFc2NhbGEgZGUgY29tcHJlZW5zw6NvIGRlIHVtIGNvbnRlw7pkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIjEgLSBNdWl0byBiYWl4YVxcbjIgLSBCYWl4YVxcbjMgLSBNw6lkaWFcXG40IC0gQm9hXFxuNSAtIEV4Y2VsZW50ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NfY29udCA9IHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29udGVudC50b0pTT04oKS5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5jbGFzc2lmaWNhdGlvbnMucHVzaChpdGVtLmNvbnRldWRvX2lkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VDb2xvckJ0bihudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4gICAgLmhlYWRlci1lbGVte1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgfVxuXG4gICAgLmFycm93LXJpZ2h0e1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDIlO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAyJTtcbiAgICB9XG5cbiAgICAuYXJyb3ctbGVmdHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDIlO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAyJTtcbiAgICB9XG5cbiAgICAuaGF2ZV9jbGFzc2lmaWNhdGlvbntcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8R3JpZExheW91dCByb3dzPVwiKlwiIGNvbHVtbnM9XCIqXCIgaGVpZ2h0PVwiMTAwJVwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIiB2ZXJ0aWNhbEFsaWdubWVudD1cImNlbnRlclwiPlxuICAgICAgICA8U3RhY2tMYXlvdXQgcm93PVwiMFwiIGNvbD1cIjBcIiB3aWR0aD1cIjkwJVwiIHZlcnRpY2FsQWxpZ25tZW50PVwidG9wXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiPlxuICAgICAgICAgICAgPEdyaWRMYXlvdXQgY29sdW1ucz1cIipcIiByb3dzPVwiYXV0byxhdXRvXCI+XG4gICAgICAgICAgICAgICAgPEFjdGl2aXR5SW5kaWNhdG9yIDpidXN5PVwiYnVzeVwiIHYtaWY9XCJidXN5XCIgcm93PVwiMFwiIGNvbD1cIjBcIi8+XG4gICAgICAgICAgICAgICAgPExhYmVsIHYtaWY9XCJidXN5XCIgOnRleHQ9XCJidXN5VGV4dFwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIiByb3c9XCIxXCIgY29sPVwiMFwiLz5cbiAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqXCIgcm93cz1cImF1dG8sYXV0b1wiIHN0eWxlPVwibWFyZ2luLXRvcDogMiVcIj5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIlByb2Zlc3NvcihhKVwiIGZvbnRTaXplPVwiMTVcIiByb3c9XCIwXCIgY29sPVwiMFwiLz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHYtbW9kZWw9XCJ0dXRvcmlhbC5wcm9mZXNzb3Iubm9tZVwiIGVkaXRhYmxlPVwiZmFsc2VcIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMVwiIGNvbD1cIjBcIi8+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKlwiIHJvd3M9XCJhdXRvLGF1dG9cIj5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIkRhdGFcIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMFwiIGNvbD1cIjBcIi8+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCB2LW1vZGVsPVwidHV0b3JpYWwuZGF0YVwiIGhpbnQ9XCJEYXRhXCIgZWRpdGFibGU9XCJmYWxzZVwiIEB0YXA9XCJvcGVuRGF0ZSgpXCIgZm9udFNpemU9XCIxNVwiIHJvdz1cIjFcIiBjb2w9XCIwXCIvPlxuICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICAgICAgPEdyaWRMYXlvdXQgY29sdW1ucz1cIipcIiByb3dzPVwiYXV0byxhdXRvXCI+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJIb3JhIGRlIGluw61jaW9cIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMFwiIGNvbD1cIjBcIi8+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCB2LW1vZGVsPVwidHV0b3JpYWwuaG9yYUluaWNpb1wiIGhpbnQ9XCJIb3JhIGRlIGluw61jaW9cIiBAdGFwPVwib3BlblRpbWUoKVwiIGVkaXRhYmxlPVwiZmFsc2VcIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMVwiIGNvbD1cIjBcIi8+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKlwiIHJvd3M9XCJhdXRvLGF1dG9cIj5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIkFzc3VudG9cIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMFwiIGNvbD1cIjBcIi8+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCB2LW1vZGVsPVwidHV0b3JpYWwuYXNzdW50b1wiIGhpbnQ9XCJBc3N1bnRvXCIgZWRpdGFibGU9XCJmYWxzZVwiIGZvbnRTaXplPVwiMTVcIiByb3c9XCIxXCIgY29sPVwiMFwiLz5cbiAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqXCIgcm93cz1cImF1dG8sYXV0b1wiPlxuICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0PVwiRGVzY3Jpw6fDo29cIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMFwiIGNvbD1cIjBcIi8+XG4gICAgICAgICAgICAgICAgPFRleHRWaWV3IHYtbW9kZWw9XCJ0dXRvcmlhbC5kZXNjcmljYW9cIiBoaW50PVwiRGVzY3Jpw6fDo29cIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMVwiIGNvbD1cIjBcIi8+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKlwiIHJvd3M9XCJhdXRvLGF1dG9cIj5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIlVuaWRhZGUgQ3VycmljdWxhclwiIGZvbnRTaXplPVwiMTVcIiByb3c9XCIwXCIgY29sPVwiMFwiLz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHYtbW9kZWw9XCJ0dXRvcmlhbC51bmlkYWRlX2N1cnJpY3VsYXIubm9tZVwiIGhpbnQ9XCJVbmlkYWRlIEN1cnJpY3VsYXJcIiBlZGl0YWJsZT1cImZhbHNlXCIgZm9udFNpemU9XCIxNVwiIHJvdz1cIjFcIiBjb2w9XCIwXCIvPlxuICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqLCpcIiByb3dzPVwiYXV0b1wiIHZlcnRpY2FsQWxpZ25tZW50PVwiYm90dG9tXCIgcm93PVwiMFwiIGNvbD1cIjBcIj5cbiAgICAgICAgICAgIDxCdXR0b24gdGV4dD1cIlZlciBsaXN0YSBkZSBwZWRpZG9zXCIgd2lkdGg9XCI0NSVcIiBmb250U2l6ZT1cIjE1XCIgY29sPVwiMFwiIHJvdz1cIjBcIiB2ZXJ0aWNhbEFsaWdubWVudD1cImJvdHRvbVwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJsZWZ0XCIgQHRhcD1cImNob29zZVR1dG9yaWFsXCIvPlxuICAgICAgICAgICAgPEJ1dHRvbiB0ZXh0PVwiRWRpdGFyIFBlZGlkb1wiIHdpZHRoPVwiNDUlXCIgZm9udFNpemU9XCIxNVwiIGNvbD1cIjFcIiByb3c9XCIwXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJib3R0b21cIiBob3Jpem9udGFsQWxpZ25tZW50PVwicmlnaHRcIiBAdGFwPVwiZWRpdFR1dG9yaWFsXCIvPlxuICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgPC9HcmlkTGF5b3V0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOiBbJ3R1dG9yaWFsJ10sXG4gICAgICAgIGRhdGE6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZTogXCJcIixcbiAgICAgICAgICAgICAgICBjdXJyZW50SG91cjogXCJcIixcbiAgICAgICAgICAgICAgICBidXN5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBidXN5VGV4dDogXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOntcbiAgICAgICAgICAgIGNoZWNrVmFsaWRUaW1lKCl7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudERhdGUuZGF5ID09IGN1cnJlbnRUaW1lLmdldERhdGUoKSAmJiB0aGlzLmN1cnJlbnREYXRlLm1vbnRoID09IChjdXJyZW50VGltZS5nZXRNb250aCgpKzEpICYmIHRoaXMuY3VycmVudERhdGUueWVhciA9PSBjdXJyZW50VGltZS5nZXRGdWxsWWVhcigpKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50SG91ciAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudEhvdXIuaG91ciA9PSBjdXJyZW50VGltZS5nZXRIb3VycygpICYmIHRoaXMuY3VycmVudEhvdXIubWludXRlIDw9IGN1cnJlbnRUaW1lLmdldE1pbnV0ZXMoKSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuY3VycmVudEhvdXIuaG91ciA8IGN1cnJlbnRUaW1lLmdldEhvdXJzKCkpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcGVuRGF0ZSgpe1xuICAgICAgICAgICAgICAgIGxldCBwaWNrZXIgPSBuZXcgdGhpcy4kc3RvcmUuc3RhdGUubW9kYWxQaWNrZXIoKTtcblxuICAgICAgICAgICAgICAgIHBpY2tlci5waWNrRGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNlbGVjaW9uZSB1bWEgZGF0YVwiLFxuICAgICAgICAgICAgICAgICAgICB0aGVtZTogXCJsaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgICBzdGFydGluZ0RhdGU6IG5ldyBEYXRlKCh0aGlzLmN1cnJlbnREYXRlLmxlbmd0aCA9PSAwID8gbmV3IERhdGUoKSA6IHRoaXMuY3VycmVudERhdGUueWVhciArIFwiLVwiICsgdGhpcy5jdXJyZW50RGF0ZS5tb250aCArIFwiLVwiICsgdGhpcy5jdXJyZW50RGF0ZS5kYXkpKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWwuZGF0YSA9IChyZXN1bHQuZGF5IDwgMTAgPyBcIjBcIityZXN1bHQuZGF5IDogcmVzdWx0LmRheSkgKyBcIi1cIiArIChyZXN1bHQubW9udGggPCAxMCA/IFwiMFwiK3Jlc3VsdC5tb250aCA6IHJlc3VsdC5tb250aCkgKyBcIi1cIiArIHJlc3VsdC55ZWFyO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5jaGVja1ZhbGlkVGltZSgpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR1dG9yaWFsLmhvcmFJbmljaW8gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlNlbGVjaW9uZSB1bWEgZGF0YS9ob3JhIHN1cGVyaW9yIMOgIGF0dWFsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW5UaW1lKCl7XG4gICAgICAgICAgICAgICAgbGV0IHBpY2tlciA9IG5ldyB0aGlzLiRzdG9yZS5zdGF0ZS5tb2RhbFBpY2tlcigpO1xuXG4gICAgICAgICAgICAgICAgcGlja2VyLnBpY2tUaW1lKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU2VsZWNpb25lIHVtYSBob3JhXCIsXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lOiBcImxpZ2h0XCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0ID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hlY2tWYWxpZFRpbWUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWwuaG9yYUluaWNpbyA9IChyZXN1bHQuaG91ciA8IDEwID8gXCIwXCIrcmVzdWx0LmhvdXIgOiByZXN1bHQuaG91cikgKyAocmVzdWx0Lm1pbnV0ZSA8IDEwID8gXCI6MFwiIDogXCI6XCIpICsgcmVzdWx0Lm1pbnV0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWwuaG9yYUluaWNpbyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2VsZWNpb25lIHVtYSBkYXRhL2hvcmEgc3VwZXJpb3Igw6AgYXR1YWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hvb3NlVHV0b3JpYWwoKXtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdiYWNrTGlzdFR1dG9yaWFscycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVkaXRUdXRvcmlhbCgpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMudHV0b3JpYWwuZGF0YS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJTZWxlY2lvbmUgYSBkYXRhIGVtIHF1ZSBhIHR1dG9yaWEgdmFpIGRlY29ycmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLnR1dG9yaWFsLmhvcmFJbmljaW8ubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2VsZWNpb25lIGEgaG9yYSBlbSBxdWUgYSB0dXRvcmlhIHZhaSBkZWNvcnJlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoIXRoaXMuY2hlY2tWYWxpZFRpbWUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50dXRvcmlhbC5ob3JhSW5pY2lvID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJTZWxlY2lvbmUgdW1hIGRhdGEvaG9yYSBzdXBlcmlvciDDoCBhdHVhbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzeVRleHQgPSBcIkEgZWRpdGFyIHR1dG9yaWEuLi5cIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXN5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTQyLjkzLjE0Mi4yMDgvYXBpL3R1dG9yaWEvXCIrdGhpcy50dXRvcmlhbC5pZCtcIi9lZGl0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5jdXJyZW50RGF0ZS55ZWFyICsgXCItXCIgKyB0aGlzLmN1cnJlbnREYXRlLm1vbnRoICsgXCItXCIgKyB0aGlzLmN1cnJlbnREYXRlLmRheSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3JhSW5pY2lvOiB0aGlzLnR1dG9yaWFsLmhvcmFJbmljaW8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpY2FvOiB0aGlzLnR1dG9yaWFsLmRlc2NyaWNhb1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSA0MDQgfHwgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSA0MDApeyAgIC8vRVJST1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLm1zZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gMjAwKXsgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NPUlJFVSBCRU1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkluZm9ybWHDp8Ojb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlBlZGlkbyBkZSB0dXRvcmlhIGVkaXRhZG8gY29tIHN1Y2Vzc29cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdiYWNrTGlzdFR1dG9yaWFscycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkJhY2tFdmVudCAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGRhdGEuY2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdiYWNrTGlzdFR1dG9yaWFscycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEhvb2soKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLiRzdG9yZS5zdGF0ZS5pc0FuZHJvaWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5hbmRyb2lkLm9uKHRoaXMuJHN0b3JlLnN0YXRlLmFuZHJvaWRBcHAuYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLm9uQmFja0V2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJIb29rKCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy4kc3RvcmUuc3RhdGUuaXNBbmRyb2lkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZC5vZmYodGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZEFwcC5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMub25CYWNrRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SG9vaygpO1xuICAgICAgICB9LFxuICAgICAgICBiZWZvcmVEZXN0cm95KCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckhvb2soKTtcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlZCgpe1xuICAgICAgICAgICAgbGV0IGFycmF5RGF0ZSA9IHRoaXMudHV0b3JpYWwuZGF0YS5zcGxpdCgnLScpO1xuICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShhcnJheURhdGVbMl0sYXJyYXlEYXRlWzFdLTEsYXJyYXlEYXRlWzBdKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGUgPSB7XG4gICAgICAgICAgICAgICAgZGF5OiBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICBtb250aDogZGF0ZS5nZXRNb250aCgpICsgMSxcbiAgICAgICAgICAgICAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxldCBhcnJheUhvdXIgPSB0aGlzLnR1dG9yaWFsLmhvcmFJbmljaW8uc3BsaXQoJzonKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSB7XG4gICAgICAgICAgICAgICAgaG91cjogYXJyYXlIb3VyWzBdLFxuICAgICAgICAgICAgICAgIG1pbnV0ZTogYXJyYXlIb3VyWzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICAgIDxMYWJlbCB0ZXh0PVwiSW5zaXJhIG8gY8OzZGlnbyBkYSBhdWxhXCIgdGV4dEFsaWdubWVudD1cImNlbnRlclwiIGZvbnRTaXplPVwiMTVcIi8+XG4gICAgICAgIDxUZXh0RmllbGQgdi1tb2RlbD1cImNvZGVcIiBoaW50PVwiQ8OzZGlnb1wiIGZvbnRTaXplPVwiMTVcIiBrZXlib2FyZFR5cGU9XCJudW1iZXJcIi8+XG4gICAgICAgIDxCdXR0b24gdGV4dD1cIkVudHJhclwiIEB0YXA9XCJlbnRlclwiIGZvbnRTaXplPVwiMTVcIi8+XG4gICAgPC9TdGFja0xheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHtleGl0fSBmcm9tICduYXRpdmVzY3JpcHQtZXhpdCc7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGRhdGE6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgICBjb2RlOiBcIlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6e1xuICAgICAgICAgICAgZW50ZXIoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFySG9vaygpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NsYXNzJyx0aGlzLmNvZGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQmFja0V2ZW50KGRhdGEpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNhaXJcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUZW0gYSBjZXJ0ZXphIHF1ZSBkZXNlamEgc2FpciBkYSBhcGxpY2HDp8Ojbz9cIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlNpbVwiLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIk7Do29cIlxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhpdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SG9vaygpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmFuZHJvaWQub24odGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZEFwcC5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMub25CYWNrRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhckhvb2soKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLiRzdG9yZS5zdGF0ZS5pc0FuZHJvaWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5hbmRyb2lkLm9mZih0aGlzLiRzdG9yZS5zdGF0ZS5hbmRyb2lkQXBwLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5vbkJhY2tFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgdGhpcy5zZXRIb29rKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFySG9vaygpO1xuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8U3RhY2tMYXlvdXQgc3R5bGU9XCJob3Jpei1hbGlnbjogY2VudGVyXCI+XG4gICAgICAgIDxTdGFja0xheW91dCB3aWR0aD1cIjg1JVwiPlxuICAgICAgICAgICAgPEJ1dHRvbiA6dGV4dD1cImZpbHRlckJ0bk5hbWVcIiBAdGFwPVwiZmlsdGVyVHV0b3JpYWxzXCIvPlxuICAgICAgICAgICAgPEdyaWRMYXlvdXQgY29sdW1ucz1cIiosYXV0bywqLGF1dG9cIiByb3dzPVwiYXV0byxhdXRvLGF1dG9cIiA6dmlzaWJpbGl0eT1cImZpbHRlclZpc1wiPlxuICAgICAgICAgICAgICAgIDxEcm9wRG93biA6aXRlbXM9XCJjaG9pY2VzXCIgY29sPVwiMFwiIHJvdz1cIjBcIiA6c2VsZWN0ZWRJbmRleD1cInNlbGVjdGVkSW5kZXhcIiBAc2VsZWN0ZWRJbmRleENoYW5nZWQ9XCJkcm9wRG93blNlbGVjdGVkSW5kZXhDaGFuZ2VkXCIvPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgdi1tb2RlbD1cImZpbHRlclsnaW5pdGlhbF9kYXRlJ11cIiBoaW50PVwiRGF0YVwiIGNvbD1cIjBcIiByb3c9XCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDp2aXNpYmlsaXR5PVwiZGF0ZVZpc1wiIGVkaXRhYmxlPVwiZmFsc2VcIiBAdGFwPVwib3BlbkRhdGUoJ2luaXRpYWxfZGF0ZScpXCIvPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgdi1tb2RlbD1cImZpbHRlclsnaW5pdGlhbF9kYXRlJ11cIiBoaW50PVwiRGF0YSBJbmljaWFsXCIgY29sPVwiMFwiIHJvdz1cIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgOnZpc2liaWxpdHk9XCJpbnRlcnZhbERhdGVWaXNcIiBlZGl0YWJsZT1cImZhbHNlXCIgQHRhcD1cIm9wZW5EYXRlKCdpbml0aWFsX2RhdGUnKVwiLz5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dC5kZWNvZGU9XCImI3hmMTJkO1wiIGNsYXNzPVwibnQtaWNvbiBmYXNcIiBjb2w9XCIxXCIgcm93PVwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidmVydGljYWwtYWxpZ246IGJvdHRvbVwiIEB0YXA9XCJjbGVhcignaW5pdGlhbF9kYXRlJylcIi8+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCB2LW1vZGVsPVwiZmlsdGVyWydmaW5hbF9kYXRlJ11cIiBoaW50PVwiRGF0YSBGaW5hbFwiIGNvbD1cIjJcIiByb3c9XCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDp2aXNpYmlsaXR5PVwiaW50ZXJ2YWxEYXRlVmlzXCIgZWRpdGFibGU9XCJmYWxzZVwiIEB0YXA9XCJvcGVuRGF0ZSgnZmluYWxfZGF0ZScpXCIvPlxuICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0LmRlY29kZT1cIiYjeGYxMmQ7XCIgY2xhc3M9XCJudC1pY29uIGZhc1wiIGNvbD1cIjNcIiByb3c9XCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgOnZpc2liaWxpdHk9XCJpbnRlcnZhbERhdGVWaXNcIiBAdGFwPVwiY2xlYXIoJ2ZpbmFsX2RhdGUnKVwiIHN0eWxlPVwidmVydGljYWwtYWxpZ246IGJvdHRvbVwiLz5cbiAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqLGF1dG9cIiByb3dzPVwiYXV0byxhdXRvLGF1dG8sYXV0b1wiIDp2aXNpYmlsaXR5PVwiZmlsdGVyVmlzXCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCBoaW50PVwiSG9yYSBkZSBpbsOtY2lvXCIgY29sPVwiMFwiIHJvdz1cIjBcIiBlZGl0YWJsZT1cImZhbHNlXCIgdi1tb2RlbD1cImZpbHRlclsnaG91ciddXCIgQHRhcD1cIm9wZW5UaW1lKClcIi8+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHQuZGVjb2RlPVwiJiN4ZjEyZDtcIiBjbGFzcz1cIm50LWljb24gZmFzXCIgY29sPVwiMVwiIHJvdz1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInZlcnRpY2FsLWFsaWduOiBib3R0b21cIiBAdGFwPVwiY2xlYXIoJ2hvdXInKVwiLz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIGhpbnQ9XCJQcm9mZXNzb3IoYSlcIiBjb2w9XCIwXCIgcm93PVwiMVwiIHYtbW9kZWw9XCJmaWx0ZXJbJ3RlYWNoZXInXVwiLz5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dC5kZWNvZGU9XCImI3hmMTJkO1wiIGNsYXNzPVwibnQtaWNvbiBmYXNcIiBjb2w9XCIxXCIgcm93PVwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidmVydGljYWwtYWxpZ246IGJvdHRvbVwiIEB0YXA9XCJjbGVhcigndGVhY2hlcicpXCIvPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgaGludD1cIkFzc3VudG9cIiBjb2w9XCIwXCIgcm93PVwiMlwiIHYtbW9kZWw9XCJmaWx0ZXJbJ3N1YmplY3QnXVwiLz5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dC5kZWNvZGU9XCImI3hmMTJkO1wiIGNsYXNzPVwibnQtaWNvbiBmYXNcIiBjb2w9XCIxXCIgcm93PVwiMlwiXG4gICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidmVydGljYWwtYWxpZ246IGJvdHRvbVwiIEB0YXA9XCJjbGVhcignc3ViamVjdCcpXCIvPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgaGludD1cIlVuaWRhZGUgQ3VycmljdWxhclwiIGNvbD1cIjBcIiByb3c9XCIzXCIgdi1tb2RlbD1cImZpbHRlclsnY291cnNlX3VuaXQnXVwiLz5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dC5kZWNvZGU9XCImI3hmMTJkO1wiIGNsYXNzPVwibnQtaWNvbiBmYXNcIiBjb2w9XCIxXCIgcm93PVwiM1wiXG4gICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidmVydGljYWwtYWxpZ246IGJvdHRvbVwiIEB0YXA9XCJjbGVhcignY291cnNlX3VuaXQnKVwiLz5cbiAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqLGF1dG8sKixhdXRvXCIgcm93cz1cImF1dG9cIiA6dmlzaWJpbGl0eT1cImZpbHRlclZpc1wiPlxuICAgICAgICAgICAgICAgIDxEcm9wRG93biA6aXRlbXM9XCJyZXF1ZXN0X2Nob2ljZXNcIiBjb2w9XCIwXCIgcm93PVwiMFwiIGhpbnQ9XCJQZWRpZG9cIiBAc2VsZWN0ZWRJbmRleENoYW5nZWQ9XCJjaGFuZ2VSZXF1ZXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOnNlbGVjdGVkSW5kZXg9XCJjbGVhckRyb3Auc2VsZWN0ZWRfcmVxdWVzdFwiLz5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dC5kZWNvZGU9XCImI3hmMTJkO1wiIGNsYXNzPVwibnQtaWNvbiBmYXNcIiBjb2w9XCIxXCIgcm93PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidmVydGljYWwtYWxpZ246IGJvdHRvbVwiIEB0YXA9XCJjbGVhckluZGV4KCdyZXF1ZXN0JylcIi8+XG4gICAgICAgICAgICAgICAgPERyb3BEb3duIDppdGVtcz1cInN0YXRlX2Nob2ljZXNcIiBjb2w9XCIyXCIgcm93PVwiMFwiIGhpbnQ9XCJFc3RhZG9cIiBAc2VsZWN0ZWRJbmRleENoYW5nZWQ9XCJjaGFuZ2VTdGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDpzZWxlY3RlZEluZGV4PVwiY2xlYXJEcm9wLnNlbGVjdGVkX3N0YXRlXCIvPlxuICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0LmRlY29kZT1cIiYjeGYxMmQ7XCIgY2xhc3M9XCJudC1pY29uIGZhc1wiIGNvbD1cIjNcIiByb3c9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ2ZXJ0aWNhbC1hbGlnbjogYm90dG9tXCIgQHRhcD1cImNsZWFySW5kZXgoJ3N0YXRlJylcIi8+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgIDwvU3RhY2tMYXlvdXQ+XG5cbiAgICAgICAgPEFjdGl2aXR5SW5kaWNhdG9yIDpidXN5PVwiYnVzeVwiIHYtaWY9XCJidXN5XCIvPlxuICAgICAgICA8TGFiZWwgdi1pZj1cImJ1c3lcIiA6dGV4dD1cImJ1c3lUZXh0XCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiLz5cblxuICAgICAgICA8UmFkTGlzdFZpZXcgcmVmPVwicmFkbGlzdF90dXRvcmlhbHNcIiBmb3I9XCJ0dXRvcmlhbCBpbiB0dXRvcmlhbHNcIiBoZWlnaHQ9XCIxMDAlXCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAyJVwiIEBpdGVtVGFwPVwib25UdXRvcmlhbFRhcFwiXG4gICAgICAgICAgICAgICAgICAgICBsb2FkT25EZW1hbmRNb2RlPVwiQXV0b1wiIEBsb2FkTW9yZURhdGFSZXF1ZXN0ZWQ9XCJvbkxvYWRNb3JlSXRlbXNSZXF1ZXN0ZWRcIiBsb2FkT25EZW1hbmRCdWZmZXJTaXplPVwiMlwiXG4gICAgICAgICAgICAgICAgICAgICBwdWxsVG9SZWZyZXNoPVwidHJ1ZVwiIEBwdWxsVG9SZWZyZXNoSW5pdGlhdGVkPVwicmVmcmVzaFRhYmxlXCI+XG4gICAgICAgICAgICA8di10ZW1wbGF0ZSBuYW1lPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICA8R3JpZExheW91dCByb3dzPVwiYXV0b1wiIGNvbHVtbnM9XCIqLCosKlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgcm93cz1cImF1dG9cIiBjb2x1bW5zPVwiYXV0byxhdXRvXCIgcm93PVwiMFwiIGNvbD1cIjBcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJEYXRhL0hvcmFcIiBjbGFzcz1cImhlYWRlclwiIGZvbnRTaXplPVwiMTVcIiByb3c9XCIwXCIgY29sPVwiMFwiIEB0YXA9XCJjaGFuZ2VTb3J0aW5nRGF0ZVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugdi1pZj1cImZpbHRlclsnZGF0ZVNvcnRpbmcnXSA9PSAnZGVzYydcIiBzcmM9XCJ+L290aGVycy9kZXNjLnBuZ1wiIHdpZHRoPVwiOCVcIiByb3c9XCIwXCIgY29sPVwiMVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugdi1lbHNlLWlmPVwiZmlsdGVyWydkYXRlU29ydGluZyddID09ICdhc2MnXCIgc3JjPVwifi9vdGhlcnMvYXNjLnBuZ1wiIHdpZHRoPVwiOCVcIiAgcm93PVwiMFwiIGNvbD1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtZWxzZSBzcmM9XCJ+L290aGVycy9ub19zb3J0aW5nLnBuZ1wiIHdpZHRoPVwiOCVcIiByb3c9XCIwXCIgY29sPVwiMVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxHcmlkTGF5b3V0IHJvd3M9XCJhdXRvXCIgY29sdW1ucz1cImF1dG8sYXV0b1wiIHJvdz1cIjBcIiBjb2w9XCIxXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0PVwiUHJvZmVzc29yKGEpXCIgY2xhc3M9XCJoZWFkZXJcIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMFwiIGNvbD1cIjBcIiBAdGFwPVwiY2hhbmdlU29ydGluZ1RlYWNoZXJcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtaWY9XCJmaWx0ZXJbJ3RlYWNoZXJTb3J0aW5nJ10gPT0gJ2Rlc2MnXCIgc3JjPVwifi9vdGhlcnMvZGVzYy5wbmdcIiB3aWR0aD1cIjglXCIgcm93PVwiMFwiIGNvbD1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtZWxzZS1pZj1cImZpbHRlclsndGVhY2hlclNvcnRpbmcnXSA9PSAnYXNjJ1wiIHNyYz1cIn4vb3RoZXJzL2FzYy5wbmdcIiB3aWR0aD1cIjglXCIgIHJvdz1cIjBcIiBjb2w9XCIxXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSB2LWVsc2Ugc3JjPVwifi9vdGhlcnMvbm9fc29ydGluZy5wbmdcIiB3aWR0aD1cIjglXCIgcm93PVwiMFwiIGNvbD1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZExheW91dCByb3dzPVwiYXV0b1wiIGNvbHVtbnM9XCJhdXRvLGF1dG9cIiByb3c9XCIwXCIgY29sPVwiMlwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIkVzdGFkb1wiIGNsYXNzPVwiaGVhZGVyXCIgZm9udFNpemU9XCIxNVwiIHJvdz1cIjBcIiBjb2w9XCIwXCIgQHRhcD1cImNoYW5nZVNvcnRpbmdTdGF0ZVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugdi1pZj1cImZpbHRlclsnc3RhdGVTb3J0aW5nJ10gPT0gJ2Rlc2MnXCIgc3JjPVwifi9vdGhlcnMvZGVzYy5wbmdcIiB3aWR0aD1cIjglXCIgcm93PVwiMFwiIGNvbD1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtZWxzZS1pZj1cImZpbHRlclsnc3RhdGVTb3J0aW5nJ10gPT0gJ2FzYydcIiBzcmM9XCJ+L290aGVycy9hc2MucG5nXCIgd2lkdGg9XCI4JVwiICByb3c9XCIwXCIgY29sPVwiMVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugdi1lbHNlIHNyYz1cIn4vb3RoZXJzL25vX3NvcnRpbmcucG5nXCIgd2lkdGg9XCI4JVwiIHJvdz1cIjBcIiBjb2w9XCIxXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgIDwvdi10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDx2LXRlbXBsYXRlIG5hbWU9XCJyZWRcIiBpZj1cInR1dG9yaWFsLmVzdGFkbyA9PSAwXCI+XG4gICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCIgOmNsYXNzPVwidHV0b3JpYWwuaWQgPT0gaXRlbVNlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIHdpZHRoPVwiMzAlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwidHV0b3JpYWwuZGF0YVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgOnRleHQ9XCJnZXREYXlXZWVrKHR1dG9yaWFsLmRhdGEpXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cInR1dG9yaWFsLmhvcmFJbmljaW9cIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwidHV0b3JpYWwucHJvZmVzc29yLm5vbWVcIiB3aWR0aD1cIjQwJVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0PVwiTsOjbyBjb25maXJtYWRvXCIgc3R5bGU9XCJjb2xvcjogcmVkXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgY2xhc3M9XCJoclwiPjwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgIDwvdi10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPHYtdGVtcGxhdGUgbmFtZT1cImdyZWVuXCIgaWY9XCJ0dXRvcmlhbC5lc3RhZG8gPT0gMVwiPlxuICAgICAgICAgICAgICAgIDxTdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIDpjbGFzcz1cInR1dG9yaWFsLmlkID09IGl0ZW1TZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IG9yaWVudGF0aW9uPVwidmVydGljYWxcIiB3aWR0aD1cIjMwJVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cInR1dG9yaWFsLmRhdGFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiZ2V0RGF5V2Vlayh0dXRvcmlhbC5kYXRhKVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgOnRleHQ9XCJ0dXRvcmlhbC5ob3JhSW5pY2lvXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cInR1dG9yaWFsLnByb2Zlc3Nvci5ub21lXCIgd2lkdGg9XCI0MCVcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIkNvbmZpcm1hZG9cIiBzdHlsZT1cImNvbG9yOiBncmVlblwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwiaHJcIj48L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICA8L3YtdGVtcGxhdGU+XG4gICAgICAgIDwvUmFkTGlzdFZpZXc+XG4gICAgPC9TdGFja0xheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm57XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdGVkOiAwLFxuICAgICAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsX2RhdGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpbmFsX2RhdGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGhvdXI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VfdW5pdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVNvcnRpbmc6IFwiZGVzY1wiLFxuICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyU29ydGluZzogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVTb3J0aW5nOiBcImFzY1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDp7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxfZGF0ZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZmluYWxfZGF0ZTogXCJcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdHV0b3JpYWxzOiBbXSxcbiAgICAgICAgICAgICAgICBudW1iZXJQYWdlczogXCJcIixcbiAgICAgICAgICAgICAgICBudW1iZXJJdGVtc1BhZ2U6IDEwLFxuICAgICAgICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgY2hvaWNlczogW1wiRGlhXCIsXCJJbnRlcnZhbG9cIl0sXG4gICAgICAgICAgICAgICAgcmVxdWVzdF9jaG9pY2VzOiBbJ0FsdW5vJywnUHJvZmVzc29yJ10sXG4gICAgICAgICAgICAgICAgc3RhdGVfY2hvaWNlczogWydDb25maXJtYWRvJywgJ07Do28gY29uZmlybWFkbyddLFxuICAgICAgICAgICAgICAgIGZpbHRlckJ0bk5hbWU6IFwiRmlsdHJhclwiLFxuICAgICAgICAgICAgICAgIGZpbHRlclZpczogXCJjb2xsYXBzZWRcIixcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIGRhdGVWaXM6IFwidmlzaWJsZVwiLFxuICAgICAgICAgICAgICAgIGludGVydmFsRGF0ZVZpczogXCJjb2xsYXBzZWRcIixcbiAgICAgICAgICAgICAgICBjbGVhckRyb3A6e1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZF9yZXF1ZXN0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZF9zdGF0ZTogbnVsbFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnVzeTogZmFsc2UsXG4gICAgICAgICAgICAgICAgYnVzeVRleHQ6IFwiXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBmaWx0ZXJUdXRvcmlhbHMoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclZpcyA9ICh0aGlzLmZpbHRlclZpcyA9PSBcImNvbGxhcHNlZFwiID8gXCJ2aXNpYmxlXCIgOiBcImNvbGxhcHNlZFwiKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmZpbHRlclZpcyA9PSBcImNvbGxhcHNlZFwiKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2luaXRpYWxfZGF0ZSddID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWydmaW5hbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2hvdXInXSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkWydpbml0aWFsX2RhdGUnXSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkWydmaW5hbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3RlYWNoZXInXSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnc3ViamVjdCddID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWydjb3Vyc2VfdW5pdCddID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJEcm9wWydzZWxlY3RlZF9yZXF1ZXN0J10gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsncmVxdWVzdCddID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJEcm9wWydzZWxlY3RlZF9zdGF0ZSddID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3N0YXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJCdG5OYW1lID0gXCJGaWx0cmFyXCI7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnRuTmFtZSA9IFwiRGVzYXRpdmFyIEZpbHRyb3NcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcm9wRG93blNlbGVjdGVkSW5kZXhDaGFuZ2VkKGV2ZW50KXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnaW5pdGlhbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnZmluYWxfZGF0ZSddID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFsnaW5pdGlhbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkWydmaW5hbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICBpZihldmVudC5uZXdJbmRleCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbERhdGVWaXMgPSBcImNvbGxhcHNlZFwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVWaXMgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVmlzID0gXCJjb2xsYXBzZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbERhdGVWaXMgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gZXZlbnQubmV3SW5kZXg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbkRhdGUoZGF0ZSl7XG4gICAgICAgICAgICAgICAgbGV0IHBpY2tlciA9IG5ldyB0aGlzLiRzdG9yZS5zdGF0ZS5tb2RhbFBpY2tlcigpO1xuXG4gICAgICAgICAgICAgICAgcGlja2VyLnBpY2tEYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU2VsZWNpb25lIHVtYSBkYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lOiBcImxpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0aW5nRGF0ZTogbmV3IERhdGUoKHRoaXMuc2VsZWN0ZWRbZGF0ZV0ubGVuZ3RoID09IDAgPyBuZXcgRGF0ZSgpIDogdGhpcy5zZWxlY3RlZFtkYXRlXSkpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcltkYXRlXSA9IHJlc3VsdC5kYXkgKyBcIi1cIiArIHJlc3VsdC5tb250aCArIFwiLVwiICsgcmVzdWx0LnllYXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkW2RhdGVdID0gcmVzdWx0LnllYXIgKyBcIi1cIiArIHJlc3VsdC5tb250aCArIFwiLVwiICsgcmVzdWx0LmRheTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlblRpbWUoKXtcbiAgICAgICAgICAgICAgICBsZXQgcGlja2VyID0gbmV3IHRoaXMuJHN0b3JlLnN0YXRlLm1vZGFsUGlja2VyKCk7XG5cbiAgICAgICAgICAgICAgICBwaWNrZXIucGlja1RpbWUoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTZWxlY2lvbmUgdW1hIGhvcmFcIixcbiAgICAgICAgICAgICAgICAgICAgdGhlbWU6IFwibGlnaHRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2hvdXInXSA9IHJlc3VsdC5ob3VyICsgXCI6XCIgKyByZXN1bHQubWludXRlO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhcihmaWx0ZXIpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyW2ZpbHRlcl0gPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkW2ZpbHRlcl0gPSAnJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhckluZGV4KGZpbHRlcil7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbZmlsdGVyXSA9ICcnO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJEcm9wWydzZWxlY3RlZF8nK2ZpbHRlcl0gPSBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVJlcXVlc3QoZXZlbnQpe1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50Lm5ld0luZGV4ID09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsncmVxdWVzdCddID0gJyc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWydyZXF1ZXN0J10gPSBldmVudC5uZXdJbmRleCA9PSAwID8gJ2EnIDogJ3AnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRHJvcFsnc2VsZWN0ZWRfcmVxdWVzdCddID0gZXZlbnQubmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVN0YXRlKGV2ZW50KXtcbiAgICAgICAgICAgICAgICBpZihldmVudC5uZXdJbmRleCA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3N0YXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3N0YXRlJ10gPSBldmVudC5uZXdJbmRleCA9PSAwID8gJzEnIDogJzAnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRHJvcFsnc2VsZWN0ZWRfc3RhdGUnXSA9IGV2ZW50Lm5ld0luZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFuZ2VTb3J0aW5nRGF0ZSgpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWyd0ZWFjaGVyU29ydGluZyddID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3N0YXRlU29ydGluZyddID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2RhdGVTb3J0aW5nJ10gPSB0aGlzLmZpbHRlclsnZGF0ZVNvcnRpbmcnXSA9PSAnZGVzYycgPyAnYXNjJyA6ICdkZXNjJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFuZ2VTb3J0aW5nVGVhY2hlcigpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWyd0ZWFjaGVyU29ydGluZyddID0gdGhpcy5maWx0ZXJbJ3RlYWNoZXJTb3J0aW5nJ10gPT0gJ2FzYycgPyAnZGVzYycgOiAnYXNjJztcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnc3RhdGVTb3J0aW5nJ10gPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnZGF0ZVNvcnRpbmcnXSA9ICcnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVNvcnRpbmdTdGF0ZSgpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWydzdGF0ZVNvcnRpbmcnXSA9IHRoaXMuZmlsdGVyWydzdGF0ZVNvcnRpbmcnXSA9PSAnYXNjJyA/ICdkZXNjJyA6ICdhc2MnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWyd0ZWFjaGVyU29ydGluZyddID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2RhdGVTb3J0aW5nJ10gPSAnJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb252ZXJ0RGF0ZShkYXRlKXtcbiAgICAgICAgICAgICAgICBsZXQgYXJyYXlEYXRlID0gZGF0ZS5zcGxpdCgnLScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheURhdGVbMl0gKyBcIi1cIiArIGFycmF5RGF0ZVsxXSAgKyBcIi1cIiArIGFycmF5RGF0ZVswXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXREYXlXZWVrKGRhdGUpe1xuICAgICAgICAgICAgICAgIGxldCBvYmpEYXRlID0gbmV3IERhdGUodGhpcy5jb252ZXJ0RGF0ZShkYXRlKSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmpEYXRlLmdldERheSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkRvbWluZ29cIjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiU2VndW5kYS1mZWlyYVwiO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJUZXLDp2EtZmVpcmFcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiUXVhcnRhLWZlaXJhXCI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlF1aW50YS1mZWlyYVwiO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJTZXh0YS1mZWlyYVwiO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJTw6FiYWRvXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVHV0b3JpYWxUYXAoZXZlbnQpe1xuICAgICAgICAgICAgICAgIGxldCB2bSA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1TZWxlY3RlZCA9IGV2ZW50Lml0ZW0uaWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnJhZGxpc3RfdHV0b3JpYWxzLm5hdGl2ZVZpZXcucmVmcmVzaCgpO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJBw6fDtWVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiRmVjaGFyXCIsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IFtcIkluZm9ybWHDp8OjbyBkbyBwZWRpZG9cIixcIlJlY3VwZXJhclwiXVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQgPT0gXCJJbmZvcm1hw6fDo28gZG8gcGVkaWRvXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0uc2hvd0luZm9UdXRvcmlhbChldmVudC5pdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzdWx0ID09IFwiUmVjdXBlcmFyXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0uYnVzeVRleHQgPSBcIkEgcmVjdXBlcmFyIHR1dG9yaWEuLi5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmJ1c3kgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0uJHN0b3JlLnN0YXRlLmh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvdHV0b3JpYS9cIitldmVudC5pdGVtLmlkK1wiL2FsdW5vL3JlY3VwZXJhclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLmJ1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09IDQwNCl7ICAgLy9FUlJPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkubXNnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSAyMDApeyAgICAvL0NPUlJFVSBCRU1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSW5mb3JtYcOnw6NvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlBlZGlkbyBkZSB0dXRvcmlhIHJlY3VwZXJhZG8gY29tIHN1Y2Vzc29cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJpYWJsZXMgPSAndWM9JyArIHZtLmZpbHRlci5jb3Vyc2VfdW5pdCArICcmZGF0YUk9JyArIHZtLnNlbGVjdGVkLmluaXRpYWxfZGF0ZSArICcmZGF0YUY9JyArIHZtLnNlbGVjdGVkLmZpbmFsX2RhdGUgKyAnJmhvcmE9JyArIHZtLmZpbHRlci5ob3VyICsgJyZwZWRpZG89JyArIHZtLmZpbHRlci5yZXF1ZXN0ICsgJyZwcm9mZXNzb3I9JyArIHZtLmZpbHRlci50ZWFjaGVyICsgJyZhc3N1bnRvPScgKyB2bS5maWx0ZXIuc3ViamVjdCArICcmZXN0YWRvPScgKyB2bS5maWx0ZXIuc3RhdGUgKyAnJmRhdGFTPScgKyB2bS5maWx0ZXIuZGF0ZVNvcnRpbmcgKyAnJnByb2Zlc3NvclM9JyArIHZtLmZpbHRlci50ZWFjaGVyU29ydGluZyArICcmZXN0YWRvUz0nICsgdm0uZmlsdGVyLnN0YXRlU29ydGluZztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS4kc3RvcmUuc3RhdGUuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTQyLjkzLjE0Mi4yMDgvYXBpL2FsdW5vL1wiK3ZtLiRzdG9yZS5zdGF0ZS51c2VyLmlkK1wiL3R1dG9yaWFzL2FycXVpdmFkYXM/cGFnZT0xJlwiICsgdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS50dXRvcmlhbHMgPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSAtdm0uJHJlZnMucmFkbGlzdF90dXRvcmlhbHMubmF0aXZlVmlldy5nZXRTY3JvbGxPZmZzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLiRyZWZzLnJhZGxpc3RfdHV0b3JpYWxzLm5hdGl2ZVZpZXcuc2Nyb2xsV2l0aEFtb3VudChvZmZzZXQsZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5udW1iZXJQYWdlcyA9IE1hdGguY2VpbCgocmVzcG9uc2UuY29udGVudC50b0pTT04oKS50b3RhbC92bS5udW1iZXJJdGVtc1BhZ2UpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uJHJlZnMucmFkbGlzdF90dXRvcmlhbHMubmF0aXZlVmlldy5sb2FkT25EZW1hbmRNb2RlID0gXCJBdXRvXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93SW5mb1R1dG9yaWFsKGl0ZW0pe1xuICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSW5mb3JtYcOnw6NvIC0gUGVkaWRvIGRlIHR1dG9yaWFcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJcXG5QZWRpZG8gZWZldHVhZG8gcGVsbyBcIitpdGVtLnBlZGlkby50b0xvd2VyQ2FzZSgpK1wiXFxuXFxuRGF0YTogXCIraXRlbS5kYXRhK1wiXFxuXFxuSG9yYSBkZSBpbsOtY2lvOiBcIitpdGVtLmhvcmFJbmljaW8rXCJcXG5cXG5Bc3N1bnRvOiBcIitpdGVtLmFzc3VudG8rXCJcXG5cXG5EZXNjcmnDp8OjbzogXCIrKGl0ZW0uZGVzY3JpY2FvID09IG51bGwgPyBcIlZhemlhXCIgOiBpdGVtLmRlc2NyaWNhbykrXCJcXG5cXG5TYWxhOiBcIisoaXRlbS5zYWxhID09IG51bGwgPyBcIlBvciBkZWZpbmlyXCIgOiBpdGVtLnNhbGEubm9tZSkrXCJcXG5cXG5Qcm9mZXNzb3IoYSk6IFwiK2l0ZW0ucHJvZmVzc29yLm5vbWUrXCJcXG5cXG5VbmlkYWRlIEN1cnJpY3VsYXI6IFwiK2l0ZW0udW5pZGFkZV9jdXJyaWN1bGFyLm5vbWUrXCJcXG5cXG5Fc3RhZG86IFwiKyhpdGVtLmVzdGFkbyA9PSAxID8gXCJDb25maXJtYWRvXCIgOiBcIk7Do28gY29uZmlybWFkb1wiKSxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkZlY2hhclwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Mb2FkTW9yZUl0ZW1zUmVxdWVzdGVkKCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYWdlID09IHRoaXMubnVtYmVyUGFnZXMpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnJhZGxpc3RfdHV0b3JpYWxzLm5hdGl2ZVZpZXcubm90aWZ5QXBwZW5kSXRlbXNPbkRlbWFuZEZpbmlzaGVkKDAsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5yYWRsaXN0X3R1dG9yaWFscy5uYXRpdmVWaWV3LmxvYWRPbkRlbWFuZE1vZGUgPSBcIk5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucGFnZSsrO1xuXG4gICAgICAgICAgICAgICAgbGV0IHZhcmlhYmxlcyA9ICdwYWdlPScgKyB0aGlzLnBhZ2UgKyAnJnVjPScgKyB0aGlzLmZpbHRlci5jb3Vyc2VfdW5pdCArICcmZGF0YUk9JyArIHRoaXMuc2VsZWN0ZWQuaW5pdGlhbF9kYXRlICsgJyZkYXRhRj0nICsgdGhpcy5zZWxlY3RlZC5maW5hbF9kYXRlICsgJyZob3JhPScgKyB0aGlzLmZpbHRlci5ob3VyICsgJyZwZWRpZG89JyArIHRoaXMuZmlsdGVyLnJlcXVlc3QgKyAnJnByb2Zlc3Nvcj0nICsgdGhpcy5maWx0ZXIudGVhY2hlciArICcmYXNzdW50bz0nICsgdGhpcy5maWx0ZXIuc3ViamVjdCArICcmZXN0YWRvPScgKyB0aGlzLmZpbHRlci5zdGF0ZSArICcmZGF0YVM9JyArIHRoaXMuZmlsdGVyLmRhdGVTb3J0aW5nICsgJyZwcm9mZXNzb3JTPScgKyB0aGlzLmZpbHRlci50ZWFjaGVyU29ydGluZyArICcmZXN0YWRvUz0nICsgdGhpcy5maWx0ZXIuc3RhdGVTb3J0aW5nO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvYWx1bm8vXCIrdGhpcy4kc3RvcmUuc3RhdGUudXNlci5pZCtcIi90dXRvcmlhcy9hcnF1aXZhZGFzP1wiICsgdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLmRhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWxzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMucmFkbGlzdF90dXRvcmlhbHMubmF0aXZlVmlldy5ub3RpZnlBcHBlbmRJdGVtc09uRGVtYW5kRmluaXNoZWQoMCwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMucGFnZSA9PSB0aGlzLm51bWJlclBhZ2VzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMucmFkbGlzdF90dXRvcmlhbHMubmF0aXZlVmlldy5sb2FkT25EZW1hbmRNb2RlID0gXCJOb25lXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkJhY2tFdmVudCAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGRhdGEuY2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdiYWNrJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SG9vaygpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmFuZHJvaWQub24odGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZEFwcC5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMub25CYWNrRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhckhvb2soKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLiRzdG9yZS5zdGF0ZS5pc0FuZHJvaWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5hbmRyb2lkLm9mZih0aGlzLiRzdG9yZS5zdGF0ZS5hbmRyb2lkQXBwLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5vbkJhY2tFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZnJlc2hUYWJsZSgpe1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVNlbGVjdGVkID0gMDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLmZpbmFsX2RhdGUgPSB0aGlzLnNlbGVjdGVkLmluaXRpYWxfZGF0ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFyaWFibGVzID0gJ3VjPScgKyB0aGlzLmZpbHRlci5jb3Vyc2VfdW5pdCArICcmZGF0YUk9JyArIHRoaXMuc2VsZWN0ZWQuaW5pdGlhbF9kYXRlICsgJyZkYXRhRj0nICsgdGhpcy5zZWxlY3RlZC5maW5hbF9kYXRlICsgJyZob3JhPScgKyB0aGlzLmZpbHRlci5ob3VyICsgJyZwZWRpZG89JyArIHRoaXMuZmlsdGVyLnJlcXVlc3QgKyAnJnByb2Zlc3Nvcj0nICsgdGhpcy5maWx0ZXIudGVhY2hlciArICcmYXNzdW50bz0nICsgdGhpcy5maWx0ZXIuc3ViamVjdCArICcmZXN0YWRvPScgKyB0aGlzLmZpbHRlci5zdGF0ZSArICcmZGF0YVM9JyArIHRoaXMuZmlsdGVyLmRhdGVTb3J0aW5nICsgJyZwcm9mZXNzb3JTPScgKyB0aGlzLmZpbHRlci50ZWFjaGVyU29ydGluZyArICcmZXN0YWRvUz0nICsgdGhpcy5maWx0ZXIuc3RhdGVTb3J0aW5nO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvYWx1bm8vXCIrdGhpcy4kc3RvcmUuc3RhdGUudXNlci5pZCtcIi90dXRvcmlhcy9hcnF1aXZhZGFzP3BhZ2U9MSZcIiArIHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50dXRvcmlhbHMgPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1iZXJQYWdlcyA9IE1hdGguY2VpbCgocmVzcG9uc2UuY29udGVudC50b0pTT04oKS50b3RhbC90aGlzLm51bWJlckl0ZW1zUGFnZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnJhZGxpc3RfdHV0b3JpYWxzLm5hdGl2ZVZpZXcubG9hZE9uRGVtYW5kTW9kZSA9IFwiQXV0b1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnJhZGxpc3RfdHV0b3JpYWxzLm5hdGl2ZVZpZXcubm90aWZ5UHVsbFRvUmVmcmVzaEZpbmlzaGVkKCk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLnNldEhvb2soKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJIb29rKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZWQoKXtcbiAgICAgICAgICAgIGlmKHRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5idXN5VGV4dCA9IFwiQSBjYXJyZWdhci4uLlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTQyLjkzLjE0Mi4yMDgvYXBpL2FsdW5vL1wiK3RoaXMuJHN0b3JlLnN0YXRlLnVzZXIuaWQrXCIvdHV0b3JpYXMvYXJxdWl2YWRhcz9wYWdlPTEmZGF0YVM9ZGVzYyZlc3RhZG9TPWFzY1wiLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIlxuICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnR1dG9yaWFscyA9IHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkuZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLm51bWJlclBhZ2VzID0gTWF0aC5jZWlsKChyZXNwb25zZS5jb250ZW50LnRvSlNPTigpLnRvdGFsL3RoaXMubnVtYmVySXRlbXNQYWdlKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gMTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMudHV0b3JpYWxzLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmZvcm1hw6fDo29cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTsOjbyB0ZW0gbmVuaHVtIHBlZGlkbyBkZSB0dXRvcmlhIGFycXVpdmFkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnYmFjaycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICAgIGRlZXA6IHRydWUsXG4gICAgICAgICAgICAgICAgaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy4kc3RvcmUuc3RhdGUuaXNBbmRyb2lkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzeVRleHQgPSBcIkEgY2FycmVnYXIuLi5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1TZWxlY3RlZCA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLmZpbmFsX2RhdGUgPSB0aGlzLnNlbGVjdGVkLmluaXRpYWxfZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YXJpYWJsZXMgPSAndWM9JyArIHRoaXMuZmlsdGVyLmNvdXJzZV91bml0ICsgJyZkYXRhST0nICsgdGhpcy5zZWxlY3RlZC5pbml0aWFsX2RhdGUgKyAnJmRhdGFGPScgKyB0aGlzLnNlbGVjdGVkLmZpbmFsX2RhdGUgKyAnJmhvcmE9JyArIHRoaXMuZmlsdGVyLmhvdXIgKyAnJnBlZGlkbz0nICsgdGhpcy5maWx0ZXIucmVxdWVzdCArICcmcHJvZmVzc29yPScgKyB0aGlzLmZpbHRlci50ZWFjaGVyICsgJyZhc3N1bnRvPScgKyB0aGlzLmZpbHRlci5zdWJqZWN0ICsgJyZlc3RhZG89JyArIHRoaXMuZmlsdGVyLnN0YXRlICsgJyZkYXRhUz0nICsgdGhpcy5maWx0ZXIuZGF0ZVNvcnRpbmcgKyAnJnByb2Zlc3NvclM9JyArIHRoaXMuZmlsdGVyLnRlYWNoZXJTb3J0aW5nICsgJyZlc3RhZG9TPScgKyB0aGlzLmZpbHRlci5zdGF0ZVNvcnRpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTQyLjkzLjE0Mi4yMDgvYXBpL2FsdW5vL1wiK3RoaXMuJHN0b3JlLnN0YXRlLnVzZXIuaWQrXCIvdHV0b3JpYXMvYXJxdWl2YWRhcz9wYWdlPTEmXCIgKyB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR1dG9yaWFscyA9IHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldCA9IC10aGlzLiRyZWZzLnJhZGxpc3RfdHV0b3JpYWxzLm5hdGl2ZVZpZXcuZ2V0U2Nyb2xsT2Zmc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnJhZGxpc3RfdHV0b3JpYWxzLm5hdGl2ZVZpZXcuc2Nyb2xsV2l0aEFtb3VudChvZmZzZXQsZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm51bWJlclBhZ2VzID0gTWF0aC5jZWlsKChyZXNwb25zZS5jb250ZW50LnRvSlNPTigpLnRvdGFsL3RoaXMubnVtYmVySXRlbXNQYWdlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5yYWRsaXN0X3R1dG9yaWFscy5uYXRpdmVWaWV3LmxvYWRPbkRlbWFuZE1vZGUgPSBcIkF1dG9cIjtcbiAgICAgICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4gICAgLmhlYWRlcntcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuICAgIEJ1dHRvbntcbiAgICAgICAgd2lkdGg6IDM1JTtcbiAgICAgICAgbWFyZ2luLXRvcDogMSU7XG4gICAgfVxuICAgIERyb3BEb3due1xuICAgICAgICBtYXJnaW4tbGVmdDogNSU7XG4gICAgfVxuICAgIC5zZWxlY3RlZHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzEyMzQ1NjtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgIH1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gICAgPFN0YWNrTGF5b3V0IHN0eWxlPVwiaG9yaXotYWxpZ246IGNlbnRlclwiPlxuICAgICAgICA8U3RhY2tMYXlvdXQgd2lkdGg9XCI4NSVcIj5cbiAgICAgICAgICAgIDxCdXR0b24gOnRleHQ9XCJmaWx0ZXJCdG5OYW1lXCIgQHRhcD1cImZpbHRlclR1dG9yaWFsc1wiLz5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqLGF1dG8sKixhdXRvXCIgcm93cz1cImF1dG8sYXV0byxhdXRvXCIgOnZpc2liaWxpdHk9XCJmaWx0ZXJWaXNcIj5cbiAgICAgICAgICAgICAgICA8RHJvcERvd24gOml0ZW1zPVwiY2hvaWNlc1wiIGNvbD1cIjBcIiByb3c9XCIwXCIgOnNlbGVjdGVkSW5kZXg9XCJzZWxlY3RlZEluZGV4XCIgQHNlbGVjdGVkSW5kZXhDaGFuZ2VkPVwiZHJvcERvd25TZWxlY3RlZEluZGV4Q2hhbmdlZFwiLz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHYtbW9kZWw9XCJmaWx0ZXJbJ2luaXRpYWxfZGF0ZSddXCIgaGludD1cIkRhdGFcIiBjb2w9XCIwXCIgcm93PVwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA6dmlzaWJpbGl0eT1cImRhdGVWaXNcIiBlZGl0YWJsZT1cImZhbHNlXCIgQHRhcD1cIm9wZW5EYXRlKCdpbml0aWFsX2RhdGUnKVwiLz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHYtbW9kZWw9XCJmaWx0ZXJbJ2luaXRpYWxfZGF0ZSddXCIgaGludD1cIkRhdGEgSW5pY2lhbFwiIGNvbD1cIjBcIiByb3c9XCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDp2aXNpYmlsaXR5PVwiaW50ZXJ2YWxEYXRlVmlzXCIgZWRpdGFibGU9XCJmYWxzZVwiIEB0YXA9XCJvcGVuRGF0ZSgnaW5pdGlhbF9kYXRlJylcIi8+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHQuZGVjb2RlPVwiJiN4ZjEyZDtcIiBjbGFzcz1cIm50LWljb24gZmFzXCIgY29sPVwiMVwiIHJvdz1cIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInZlcnRpY2FsLWFsaWduOiBib3R0b21cIiBAdGFwPVwiY2xlYXIoJ2luaXRpYWxfZGF0ZScpXCIvPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgdi1tb2RlbD1cImZpbHRlclsnZmluYWxfZGF0ZSddXCIgaGludD1cIkRhdGEgRmluYWxcIiBjb2w9XCIyXCIgcm93PVwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA6dmlzaWJpbGl0eT1cImludGVydmFsRGF0ZVZpc1wiIGVkaXRhYmxlPVwiZmFsc2VcIiBAdGFwPVwib3BlbkRhdGUoJ2ZpbmFsX2RhdGUnKVwiLz5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dC5kZWNvZGU9XCImI3hmMTJkO1wiIGNsYXNzPVwibnQtaWNvbiBmYXNcIiBjb2w9XCIzXCIgcm93PVwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgIDp2aXNpYmlsaXR5PVwiaW50ZXJ2YWxEYXRlVmlzXCIgQHRhcD1cImNsZWFyKCdmaW5hbF9kYXRlJylcIiBzdHlsZT1cInZlcnRpY2FsLWFsaWduOiBib3R0b21cIi8+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKixhdXRvXCIgcm93cz1cImF1dG8sYXV0byxhdXRvLGF1dG9cIiA6dmlzaWJpbGl0eT1cImZpbHRlclZpc1wiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgaGludD1cIkhvcmEgZGUgaW7DrWNpb1wiIGNvbD1cIjBcIiByb3c9XCIwXCIgZWRpdGFibGU9XCJmYWxzZVwiIHYtbW9kZWw9XCJmaWx0ZXJbJ2hvdXInXVwiIEB0YXA9XCJvcGVuVGltZSgpXCIvPlxuICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0LmRlY29kZT1cIiYjeGYxMmQ7XCIgY2xhc3M9XCJudC1pY29uIGZhc1wiIGNvbD1cIjFcIiByb3c9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ2ZXJ0aWNhbC1hbGlnbjogYm90dG9tXCIgQHRhcD1cImNsZWFyKCdob3VyJylcIi8+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCBoaW50PVwiUHJvZmVzc29yKGEpXCIgY29sPVwiMFwiIHJvdz1cIjFcIiB2LW1vZGVsPVwiZmlsdGVyWyd0ZWFjaGVyJ11cIi8+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHQuZGVjb2RlPVwiJiN4ZjEyZDtcIiBjbGFzcz1cIm50LWljb24gZmFzXCIgY29sPVwiMVwiIHJvdz1cIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInZlcnRpY2FsLWFsaWduOiBib3R0b21cIiBAdGFwPVwiY2xlYXIoJ3RlYWNoZXInKVwiLz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIGhpbnQ9XCJBc3N1bnRvXCIgY29sPVwiMFwiIHJvdz1cIjJcIiB2LW1vZGVsPVwiZmlsdGVyWydzdWJqZWN0J11cIi8+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHQuZGVjb2RlPVwiJiN4ZjEyZDtcIiBjbGFzcz1cIm50LWljb24gZmFzXCIgY29sPVwiMVwiIHJvdz1cIjJcIlxuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInZlcnRpY2FsLWFsaWduOiBib3R0b21cIiBAdGFwPVwiY2xlYXIoJ3N1YmplY3QnKVwiLz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIGhpbnQ9XCJVbmlkYWRlIEN1cnJpY3VsYXJcIiBjb2w9XCIwXCIgcm93PVwiM1wiIHYtbW9kZWw9XCJmaWx0ZXJbJ2NvdXJzZV91bml0J11cIi8+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHQuZGVjb2RlPVwiJiN4ZjEyZDtcIiBjbGFzcz1cIm50LWljb24gZmFzXCIgY29sPVwiMVwiIHJvdz1cIjNcIlxuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInZlcnRpY2FsLWFsaWduOiBib3R0b21cIiBAdGFwPVwiY2xlYXIoJ2NvdXJzZV91bml0JylcIi8+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKixhdXRvLCosYXV0b1wiIHJvd3M9XCJhdXRvXCIgOnZpc2liaWxpdHk9XCJmaWx0ZXJWaXNcIj5cbiAgICAgICAgICAgICAgICA8RHJvcERvd24gOml0ZW1zPVwicmVxdWVzdF9jaG9pY2VzXCIgY29sPVwiMFwiIHJvdz1cIjBcIiBoaW50PVwiUGVkaWRvXCIgQHNlbGVjdGVkSW5kZXhDaGFuZ2VkPVwiY2hhbmdlUmVxdWVzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDpzZWxlY3RlZEluZGV4PVwiY2xlYXJEcm9wLnNlbGVjdGVkX3JlcXVlc3RcIi8+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHQuZGVjb2RlPVwiJiN4ZjEyZDtcIiBjbGFzcz1cIm50LWljb24gZmFzXCIgY29sPVwiMVwiIHJvdz1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInZlcnRpY2FsLWFsaWduOiBib3R0b21cIiBAdGFwPVwiY2xlYXJJbmRleCgncmVxdWVzdCcpXCIvPlxuICAgICAgICAgICAgICAgIDxEcm9wRG93biA6aXRlbXM9XCJzdGF0ZV9jaG9pY2VzXCIgY29sPVwiMlwiIHJvdz1cIjBcIiBoaW50PVwiRXN0YWRvXCIgQHNlbGVjdGVkSW5kZXhDaGFuZ2VkPVwiY2hhbmdlU3RhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA6c2VsZWN0ZWRJbmRleD1cImNsZWFyRHJvcC5zZWxlY3RlZF9zdGF0ZVwiLz5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dC5kZWNvZGU9XCImI3hmMTJkO1wiIGNsYXNzPVwibnQtaWNvbiBmYXNcIiBjb2w9XCIzXCIgcm93PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidmVydGljYWwtYWxpZ246IGJvdHRvbVwiIEB0YXA9XCJjbGVhckluZGV4KCdzdGF0ZScpXCIvPlxuICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgIDxBY3Rpdml0eUluZGljYXRvciA6YnVzeT1cImJ1c3lcIiB2LWlmPVwiYnVzeVwiLz5cbiAgICAgICAgPExhYmVsIHYtaWY9XCJidXN5XCIgOnRleHQ9XCJidXN5VGV4dFwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIi8+XG5cbiAgICAgICAgPFJhZExpc3RWaWV3IHJlZj1cInJhZGxpc3RfdHV0b3JpYWxzXCIgZm9yPVwidHV0b3JpYWwgaW4gdHV0b3JpYWxzXCIgaGVpZ2h0PVwiMTAwJVwiIHN0eWxlPVwibWFyZ2luLXRvcDogMiVcIiBAaXRlbVRhcD1cIm9uVHV0b3JpYWxUYXBcIlxuICAgICAgICAgICAgICAgICAgICAgbG9hZE9uRGVtYW5kTW9kZT1cIkF1dG9cIiBAbG9hZE1vcmVEYXRhUmVxdWVzdGVkPVwib25Mb2FkTW9yZUl0ZW1zUmVxdWVzdGVkXCIgbG9hZE9uRGVtYW5kQnVmZmVyU2l6ZT1cIjJcIlxuICAgICAgICAgICAgICAgICAgICAgcHVsbFRvUmVmcmVzaD1cInRydWVcIiBAcHVsbFRvUmVmcmVzaEluaXRpYXRlZD1cInJlZnJlc2hUYWJsZVwiPlxuICAgICAgICAgICAgPHYtdGVtcGxhdGUgbmFtZT1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxTdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgcm93cz1cImF1dG9cIiBjb2x1bW5zPVwiKiwqLCpcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxHcmlkTGF5b3V0IHJvd3M9XCJhdXRvXCIgY29sdW1ucz1cImF1dG8sYXV0b1wiIHJvdz1cIjBcIiBjb2w9XCIwXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0PVwiRGF0YS9Ib3JhXCIgY2xhc3M9XCJoZWFkZXJcIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMFwiIGNvbD1cIjBcIiBAdGFwPVwiY2hhbmdlU29ydGluZ0RhdGVcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtaWY9XCJmaWx0ZXJbJ2RhdGVTb3J0aW5nJ10gPT0gJ2Rlc2MnXCIgc3JjPVwifi9vdGhlcnMvZGVzYy5wbmdcIiB3aWR0aD1cIjglXCIgcm93PVwiMFwiIGNvbD1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtZWxzZS1pZj1cImZpbHRlclsnZGF0ZVNvcnRpbmcnXSA9PSAnYXNjJ1wiIHNyYz1cIn4vb3RoZXJzL2FzYy5wbmdcIiB3aWR0aD1cIjglXCIgIHJvdz1cIjBcIiBjb2w9XCIxXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSB2LWVsc2Ugc3JjPVwifi9vdGhlcnMvbm9fc29ydGluZy5wbmdcIiB3aWR0aD1cIjglXCIgcm93PVwiMFwiIGNvbD1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZExheW91dCByb3dzPVwiYXV0b1wiIGNvbHVtbnM9XCJhdXRvLGF1dG9cIiByb3c9XCIwXCIgY29sPVwiMVwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIlByb2Zlc3NvcihhKVwiIGNsYXNzPVwiaGVhZGVyXCIgZm9udFNpemU9XCIxNVwiIHJvdz1cIjBcIiBjb2w9XCIwXCIgQHRhcD1cImNoYW5nZVNvcnRpbmdUZWFjaGVyXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSB2LWlmPVwiZmlsdGVyWyd0ZWFjaGVyU29ydGluZyddID09ICdkZXNjJ1wiIHNyYz1cIn4vb3RoZXJzL2Rlc2MucG5nXCIgd2lkdGg9XCI4JVwiIHJvdz1cIjBcIiBjb2w9XCIxXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSB2LWVsc2UtaWY9XCJmaWx0ZXJbJ3RlYWNoZXJTb3J0aW5nJ10gPT0gJ2FzYydcIiBzcmM9XCJ+L290aGVycy9hc2MucG5nXCIgd2lkdGg9XCI4JVwiICByb3c9XCIwXCIgY29sPVwiMVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugdi1lbHNlIHNyYz1cIn4vb3RoZXJzL25vX3NvcnRpbmcucG5nXCIgd2lkdGg9XCI4JVwiIHJvdz1cIjBcIiBjb2w9XCIxXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgcm93cz1cImF1dG9cIiBjb2x1bW5zPVwiYXV0byxhdXRvXCIgcm93PVwiMFwiIGNvbD1cIjJcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJFc3RhZG9cIiBjbGFzcz1cImhlYWRlclwiIGZvbnRTaXplPVwiMTVcIiByb3c9XCIwXCIgY29sPVwiMFwiIEB0YXA9XCJjaGFuZ2VTb3J0aW5nU3RhdGVcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtaWY9XCJmaWx0ZXJbJ3N0YXRlU29ydGluZyddID09ICdkZXNjJ1wiIHNyYz1cIn4vb3RoZXJzL2Rlc2MucG5nXCIgd2lkdGg9XCI4JVwiIHJvdz1cIjBcIiBjb2w9XCIxXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSB2LWVsc2UtaWY9XCJmaWx0ZXJbJ3N0YXRlU29ydGluZyddID09ICdhc2MnXCIgc3JjPVwifi9vdGhlcnMvYXNjLnBuZ1wiIHdpZHRoPVwiOCVcIiAgcm93PVwiMFwiIGNvbD1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtZWxzZSBzcmM9XCJ+L290aGVycy9ub19zb3J0aW5nLnBuZ1wiIHdpZHRoPVwiOCVcIiByb3c9XCIwXCIgY29sPVwiMVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICA8L3YtdGVtcGxhdGU+XG4gICAgICAgICAgICA8di10ZW1wbGF0ZSBuYW1lPVwicmVkXCIgaWY9XCJ0dXRvcmlhbC5lc3RhZG8gPT0gMFwiPlxuICAgICAgICAgICAgICAgIDxTdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIDpjbGFzcz1cInR1dG9yaWFsLmlkID09IGl0ZW1TZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IG9yaWVudGF0aW9uPVwidmVydGljYWxcIiB3aWR0aD1cIjMwJVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cInR1dG9yaWFsLmRhdGFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiZ2V0RGF5V2Vlayh0dXRvcmlhbC5kYXRhKVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgOnRleHQ9XCJ0dXRvcmlhbC5ob3JhSW5pY2lvXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cInR1dG9yaWFsLnByb2Zlc3Nvci5ub21lXCIgd2lkdGg9XCI0MCVcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIk7Do28gY29uZmlybWFkb1wiIHN0eWxlPVwiY29sb3I6IHJlZFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwiaHJcIj48L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICA8L3YtdGVtcGxhdGU+XG5cbiAgICAgICAgICAgIDx2LXRlbXBsYXRlIG5hbWU9XCJncmVlblwiIGlmPVwidHV0b3JpYWwuZXN0YWRvID09IDFcIj5cbiAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiA6Y2xhc3M9XCJ0dXRvcmlhbC5pZCA9PSBpdGVtU2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJydcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgd2lkdGg9XCIzMCVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgOnRleHQ9XCJ0dXRvcmlhbC5kYXRhXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cImdldERheVdlZWsodHV0b3JpYWwuZGF0YSlcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwidHV0b3JpYWwuaG9yYUluaWNpb1wiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgOnRleHQ9XCJ0dXRvcmlhbC5wcm9mZXNzb3Iubm9tZVwiIHdpZHRoPVwiNDAlXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJDb25maXJtYWRvXCIgc3R5bGU9XCJjb2xvcjogZ3JlZW5cIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBjbGFzcz1cImhyXCI+PC9TdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgPC92LXRlbXBsYXRlPlxuICAgICAgICA8L1JhZExpc3RWaWV3PlxuICAgIDwvU3RhY2tMYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6IFsnaXRlbVNlbGVjdGVkJ10sXG4gICAgICAgIGRhdGE6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbF9kYXRlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBmaW5hbF9kYXRlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBob3VyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OlwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VfdW5pdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVNvcnRpbmc6IFwiZGVzY1wiLFxuICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyU29ydGluZzogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVTb3J0aW5nOiBcImFzY1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDp7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxfZGF0ZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZmluYWxfZGF0ZTogXCJcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdHV0b3JpYWxzOiBbXSxcbiAgICAgICAgICAgICAgICBudW1iZXJQYWdlczogXCJcIixcbiAgICAgICAgICAgICAgICBudW1iZXJJdGVtc1BhZ2U6IDEwLFxuICAgICAgICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgY2hvaWNlczogW1wiRGlhXCIsXCJJbnRlcnZhbG9cIl0sXG4gICAgICAgICAgICAgICAgcmVxdWVzdF9jaG9pY2VzOiBbJ0FsdW5vJywnUHJvZmVzc29yJ10sXG4gICAgICAgICAgICAgICAgc3RhdGVfY2hvaWNlczogWydDb25maXJtYWRvJywgJ07Do28gY29uZmlybWFkbyddLFxuICAgICAgICAgICAgICAgIGZpbHRlckJ0bk5hbWU6IFwiRmlsdHJhclwiLFxuICAgICAgICAgICAgICAgIGZpbHRlclZpczogXCJjb2xsYXBzZWRcIixcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIGRhdGVWaXM6IFwidmlzaWJsZVwiLFxuICAgICAgICAgICAgICAgIGludGVydmFsRGF0ZVZpczogXCJjb2xsYXBzZWRcIixcbiAgICAgICAgICAgICAgICBjbGVhckRyb3A6e1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZF9yZXF1ZXN0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZF9zdGF0ZTogbnVsbFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnVzeTogZmFsc2UsXG4gICAgICAgICAgICAgICAgYnVzeVRleHQ6IFwiXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBmaWx0ZXJUdXRvcmlhbHMoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclZpcyA9ICh0aGlzLmZpbHRlclZpcyA9PSBcImNvbGxhcHNlZFwiID8gXCJ2aXNpYmxlXCIgOiBcImNvbGxhcHNlZFwiKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmZpbHRlclZpcyA9PSBcImNvbGxhcHNlZFwiKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2luaXRpYWxfZGF0ZSddID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWydmaW5hbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2hvdXInXSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkWydpbml0aWFsX2RhdGUnXSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkWydmaW5hbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3RlYWNoZXInXSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnc3ViamVjdCddID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWydjb3Vyc2VfdW5pdCddID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJEcm9wWydzZWxlY3RlZF9yZXF1ZXN0J10gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsncmVxdWVzdCddID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJEcm9wWydzZWxlY3RlZF9zdGF0ZSddID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3N0YXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJCdG5OYW1lID0gXCJGaWx0cmFyXCI7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnRuTmFtZSA9IFwiRGVzYXRpdmFyIEZpbHRyb3NcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcm9wRG93blNlbGVjdGVkSW5kZXhDaGFuZ2VkKGV2ZW50KXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnaW5pdGlhbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnZmluYWxfZGF0ZSddID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFsnaW5pdGlhbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkWydmaW5hbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICBpZihldmVudC5uZXdJbmRleCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbERhdGVWaXMgPSBcImNvbGxhcHNlZFwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVWaXMgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVmlzID0gXCJjb2xsYXBzZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbERhdGVWaXMgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gZXZlbnQubmV3SW5kZXg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbkRhdGUoZGF0ZSl7XG4gICAgICAgICAgICAgICAgbGV0IHBpY2tlciA9IG5ldyB0aGlzLiRzdG9yZS5zdGF0ZS5tb2RhbFBpY2tlcigpO1xuXG4gICAgICAgICAgICAgICAgcGlja2VyLnBpY2tEYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU2VsZWNpb25lIHVtYSBkYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lOiBcImxpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0aW5nRGF0ZTogbmV3IERhdGUoKHRoaXMuc2VsZWN0ZWRbZGF0ZV0ubGVuZ3RoID09IDAgPyBuZXcgRGF0ZSgpIDogdGhpcy5zZWxlY3RlZFtkYXRlXSkpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcltkYXRlXSA9IHJlc3VsdC5kYXkgKyBcIi1cIiArIHJlc3VsdC5tb250aCArIFwiLVwiICsgcmVzdWx0LnllYXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkW2RhdGVdID0gcmVzdWx0LnllYXIgKyBcIi1cIiArIHJlc3VsdC5tb250aCArIFwiLVwiICsgcmVzdWx0LmRheTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXIoZmlsdGVyKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcltmaWx0ZXJdID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFtmaWx0ZXJdID0gJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlblRpbWUoKXtcbiAgICAgICAgICAgICAgICBsZXQgcGlja2VyID0gbmV3IHRoaXMuJHN0b3JlLnN0YXRlLm1vZGFsUGlja2VyKCk7XG5cbiAgICAgICAgICAgICAgICBwaWNrZXIucGlja1RpbWUoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTZWxlY2lvbmUgdW1hIGhvcmFcIixcbiAgICAgICAgICAgICAgICAgICAgdGhlbWU6IFwibGlnaHRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2hvdXInXSA9IHJlc3VsdC5ob3VyICsgXCI6XCIgKyByZXN1bHQubWludXRlO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhckluZGV4KGZpbHRlcil7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbZmlsdGVyXSA9ICcnO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJEcm9wWydzZWxlY3RlZF8nK2ZpbHRlcl0gPSBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVJlcXVlc3QoZXZlbnQpe1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50Lm5ld0luZGV4ID09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsncmVxdWVzdCddID0gJyc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWydyZXF1ZXN0J10gPSBldmVudC5uZXdJbmRleCA9PSAwID8gJ2EnIDogJ3AnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRHJvcFsnc2VsZWN0ZWRfcmVxdWVzdCddID0gZXZlbnQubmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVN0YXRlKGV2ZW50KXtcbiAgICAgICAgICAgICAgICBpZihldmVudC5uZXdJbmRleCA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3N0YXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3N0YXRlJ10gPSBldmVudC5uZXdJbmRleCA9PSAwID8gJzEnIDogJzAnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRHJvcFsnc2VsZWN0ZWRfc3RhdGUnXSA9IGV2ZW50Lm5ld0luZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFuZ2VTb3J0aW5nRGF0ZSgpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWyd0ZWFjaGVyU29ydGluZyddID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3N0YXRlU29ydGluZyddID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2RhdGVTb3J0aW5nJ10gPSB0aGlzLmZpbHRlclsnZGF0ZVNvcnRpbmcnXSA9PSAnZGVzYycgPyAnYXNjJyA6ICdkZXNjJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFuZ2VTb3J0aW5nVGVhY2hlcigpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWyd0ZWFjaGVyU29ydGluZyddID0gdGhpcy5maWx0ZXJbJ3RlYWNoZXJTb3J0aW5nJ10gPT0gJ2FzYycgPyAnZGVzYycgOiAnYXNjJztcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnc3RhdGVTb3J0aW5nJ10gPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnZGF0ZVNvcnRpbmcnXSA9ICcnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVNvcnRpbmdTdGF0ZSgpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWydzdGF0ZVNvcnRpbmcnXSA9IHRoaXMuZmlsdGVyWydzdGF0ZVNvcnRpbmcnXSA9PSAnYXNjJyA/ICdkZXNjJyA6ICdhc2MnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWyd0ZWFjaGVyU29ydGluZyddID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2RhdGVTb3J0aW5nJ10gPSAnJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGVja0VkaXQodHV0b3JpYWwpe1xuICAgICAgICAgICAgICAgIGxldCB0dXRvcmlhbERhdGUgPSBuZXcgRGF0ZSh0aGlzLmNvbnZlcnREYXRlKHR1dG9yaWFsLmRhdGEpK1wiVFwiK3R1dG9yaWFsLmhvcmFJbmljaW8pO1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgICAgICAgICBpZih0dXRvcmlhbERhdGUgPj0gY3VycmVudERhdGUgJiYgdHV0b3JpYWwuZXN0YWRvID09IDApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJFZGl0YXJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hlY2tTdGF0ZSh0dXRvcmlhbCl7XG4gICAgICAgICAgICAgICAgbGV0IHR1dG9yaWFsRGF0ZSA9IG5ldyBEYXRlKHRoaXMuY29udmVydERhdGUodHV0b3JpYWwuZGF0YSkrXCJUXCIrdHV0b3JpYWwuaG9yYUluaWNpbyk7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgICAgIGlmKHR1dG9yaWFsRGF0ZSA+PSBjdXJyZW50RGF0ZSAmJiB0dXRvcmlhbC5lc3RhZG8gPT0gMCAmJiB0dXRvcmlhbC5wZWRpZG89PVwiUHJvZmVzc29yXCIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJDb25maXJtYXJcIjtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0dXRvcmlhbERhdGUgPj0gY3VycmVudERhdGUgJiYgdHV0b3JpYWwuZXN0YWRvID09IDEpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJSZXRpcmFyIGNvbmZpcm1hw6fDo29cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hlY2tBcmNoaXZlKHR1dG9yaWFsKXtcbiAgICAgICAgICAgICAgICBsZXQgdHV0b3JpYWxEYXRlID0gbmV3IERhdGUodGhpcy5jb252ZXJ0RGF0ZSh0dXRvcmlhbC5kYXRhKStcIlRcIit0dXRvcmlhbC5ob3JhSW5pY2lvKTtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYodHV0b3JpYWwuZXN0YWRvID09IDAgfHwgKHR1dG9yaWFsRGF0ZSA8IGN1cnJlbnREYXRlICYmIHR1dG9yaWFsLmVzdGFkbyA9PSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkFycXVpdmFyXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVHV0b3JpYWxUYXAoZXZlbnQpe1xuICAgICAgICAgICAgICAgIGxldCBhcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCB2bSA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1TZWxlY3RlZCA9IGV2ZW50Lml0ZW0uaWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnJhZGxpc3RfdHV0b3JpYWxzLm5hdGl2ZVZpZXcucmVmcmVzaCgpO1xuXG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaChcIkluZm9ybWHDp8OjbyBkbyBwZWRpZG9cIik7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jaGVja0VkaXQoZXZlbnQuaXRlbSkgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcIkVkaXRhclwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jaGVja1N0YXRlKGV2ZW50Lml0ZW0pICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2godGhpcy5jaGVja1N0YXRlKGV2ZW50Lml0ZW0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jaGVja0FyY2hpdmUoZXZlbnQuaXRlbSkgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcIkFycXVpdmFyXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGFjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQcOnw7Vlc1wiLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkZlY2hhclwiLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zOiBhcnJheVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQgPT0gXCJJbmZvcm1hw6fDo28gZG8gcGVkaWRvXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0uc2hvd0luZm9UdXRvcmlhbChldmVudC5pdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzdWx0ID09IFwiRWRpdGFyXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0uJGVtaXQoJ2VkaXRUdXRvcmlhbCcsZXZlbnQuaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3VsdCA9PSBcIkNvbmZpcm1hclwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmJ1c3lUZXh0ID0gXCJBIGNvbmZpcm1hciB0dXRvcmlhLi4uXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5idXN5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTQyLjkzLjE0Mi4yMDgvYXBpL3R1dG9yaWEvXCIrZXZlbnQuaXRlbS5pZCtcIi9jb25maXJtYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSA0MDQpeyAgIC8vRVJST1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLm1zZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gMjAwKSB7ICAgIC8vQ09SUkVVIEJFTVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmZvcm1hw6fDo29cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUGVkaWRvIGRlIHR1dG9yaWEgY29uZmlybWFkbyBjb20gc3VjZXNzb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhcmlhYmxlcyA9ICd1Yz0nICsgdm0uZmlsdGVyLmNvdXJzZV91bml0ICsgJyZkYXRhST0nICsgdm0uc2VsZWN0ZWQuaW5pdGlhbF9kYXRlICsgJyZkYXRhRj0nICsgdm0uc2VsZWN0ZWQuZmluYWxfZGF0ZSArICcmaG9yYT0nICsgdm0uZmlsdGVyLmhvdXIgKyAnJnBlZGlkbz0nICsgdm0uZmlsdGVyLnJlcXVlc3QgKyAnJnByb2Zlc3Nvcj0nICsgdm0uZmlsdGVyLnRlYWNoZXIgKyAnJmFzc3VudG89JyArIHZtLmZpbHRlci5zdWJqZWN0ICsgJyZlc3RhZG89JyArIHZtLmZpbHRlci5zdGF0ZSArICcmZGF0YVM9JyArIHZtLmZpbHRlci5kYXRlU29ydGluZyArICcmcHJvZmVzc29yUz0nICsgdm0uZmlsdGVyLnRlYWNoZXJTb3J0aW5nICsgJyZlc3RhZG9TPScgKyB2bS5maWx0ZXIuc3RhdGVTb3J0aW5nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvYWx1bm8vXCIrdm0uJHN0b3JlLnN0YXRlLnVzZXIuaWQrXCIvdHV0b3JpYXM/cGFnZT0xJlwiICsgdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS50dXRvcmlhbHMgPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSAtdm0uJHJlZnMucmFkbGlzdF90dXRvcmlhbHMubmF0aXZlVmlldy5nZXRTY3JvbGxPZmZzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLiRyZWZzLnJhZGxpc3RfdHV0b3JpYWxzLm5hdGl2ZVZpZXcuc2Nyb2xsV2l0aEFtb3VudChvZmZzZXQsZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5udW1iZXJQYWdlcyA9IE1hdGguY2VpbCgocmVzcG9uc2UuY29udGVudC50b0pTT04oKS50b3RhbCAvIHZtLm51bWJlckl0ZW1zUGFnZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0ucGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS4kcmVmcy5yYWRsaXN0X3R1dG9yaWFscy5uYXRpdmVWaWV3LmxvYWRPbkRlbWFuZE1vZGUgPSBcIkF1dG9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzdWx0ID09IFwiUmV0aXJhciBjb25maXJtYcOnw6NvXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0uYnVzeVRleHQgPSBcIkEgcmV0aXJhciBjb25maXJtYcOnw6NvIGRhIHR1dG9yaWEuLi5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmJ1c3kgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0uJHN0b3JlLnN0YXRlLmh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvdHV0b3JpYS9cIitldmVudC5pdGVtLmlkK1wiL3JldGlyYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSA0MDQpeyAgIC8vRVJST1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLm1zZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gMjAwKSB7ICAgIC8vQ09SUkVVIEJFTVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmZvcm1hw6fDo29cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQ29uZmlybWHDp8OjbyByZXRpcmFkYSBkbyBwZWRpZG8gZGUgdHV0b3JpYSBjb20gc3VjZXNzb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhcmlhYmxlcyA9ICd1Yz0nICsgdm0uZmlsdGVyLmNvdXJzZV91bml0ICsgJyZkYXRhST0nICsgdm0uc2VsZWN0ZWQuaW5pdGlhbF9kYXRlICsgJyZkYXRhRj0nICsgdm0uc2VsZWN0ZWQuZmluYWxfZGF0ZSArICcmaG9yYT0nICsgdm0uZmlsdGVyLmhvdXIgKyAnJnBlZGlkbz0nICsgdm0uZmlsdGVyLnJlcXVlc3QgKyAnJnByb2Zlc3Nvcj0nICsgdm0uZmlsdGVyLnRlYWNoZXIgKyAnJmFzc3VudG89JyArIHZtLmZpbHRlci5zdWJqZWN0ICsgJyZlc3RhZG89JyArIHZtLmZpbHRlci5zdGF0ZSArICcmZGF0YVM9JyArIHZtLmZpbHRlci5kYXRlU29ydGluZyArICcmcHJvZmVzc29yUz0nICsgdm0uZmlsdGVyLnRlYWNoZXJTb3J0aW5nICsgJyZlc3RhZG9TPScgKyB2bS5maWx0ZXIuc3RhdGVTb3J0aW5nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvYWx1bm8vXCIrdm0uJHN0b3JlLnN0YXRlLnVzZXIuaWQrXCIvdHV0b3JpYXM/cGFnZT0xJlwiICsgdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS50dXRvcmlhbHMgPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSAtdm0uJHJlZnMucmFkbGlzdF90dXRvcmlhbHMubmF0aXZlVmlldy5nZXRTY3JvbGxPZmZzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLiRyZWZzLnJhZGxpc3RfdHV0b3JpYWxzLm5hdGl2ZVZpZXcuc2Nyb2xsV2l0aEFtb3VudChvZmZzZXQsZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5udW1iZXJQYWdlcyA9IE1hdGguY2VpbCgocmVzcG9uc2UuY29udGVudC50b0pTT04oKS50b3RhbCAvIHZtLm51bWJlckl0ZW1zUGFnZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0ucGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS4kcmVmcy5yYWRsaXN0X3R1dG9yaWFscy5uYXRpdmVWaWV3LmxvYWRPbkRlbWFuZE1vZGUgPSBcIkF1dG9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzdWx0ID09IFwiQXJxdWl2YXJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5idXN5VGV4dCA9IFwiQSBhcnF1aXZhciB0dXRvcmlhLi4uXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5idXN5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTQyLjkzLjE0Mi4yMDgvYXBpL3R1dG9yaWEvXCIrZXZlbnQuaXRlbS5pZCtcIi9hbHVuby9hcnF1aXZhclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLmJ1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09IDQwNCl7ICAgLy9FUlJPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkubXNnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSAyMDApeyAgICAvL0NPUlJFVSBCRU1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSW5mb3JtYcOnw6NvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlBlZGlkbyBkZSB0dXRvcmlhIGFycXVpdmFkbyBjb20gc3VjZXNzb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhcmlhYmxlcyA9ICd1Yz0nICsgdm0uZmlsdGVyLmNvdXJzZV91bml0ICsgJyZkYXRhST0nICsgdm0uc2VsZWN0ZWQuaW5pdGlhbF9kYXRlICsgJyZkYXRhRj0nICsgdm0uc2VsZWN0ZWQuZmluYWxfZGF0ZSArICcmaG9yYT0nICsgdm0uZmlsdGVyLmhvdXIgKyAnJnBlZGlkbz0nICsgdm0uZmlsdGVyLnJlcXVlc3QgKyAnJnByb2Zlc3Nvcj0nICsgdm0uZmlsdGVyLnRlYWNoZXIgKyAnJmFzc3VudG89JyArIHZtLmZpbHRlci5zdWJqZWN0ICsgJyZlc3RhZG89JyArIHZtLmZpbHRlci5zdGF0ZSArICcmZGF0YVM9JyArIHZtLmZpbHRlci5kYXRlU29ydGluZyArICcmcHJvZmVzc29yUz0nICsgdm0uZmlsdGVyLnRlYWNoZXJTb3J0aW5nICsgJyZlc3RhZG9TPScgKyB2bS5maWx0ZXIuc3RhdGVTb3J0aW5nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvYWx1bm8vXCIrdm0uJHN0b3JlLnN0YXRlLnVzZXIuaWQrXCIvdHV0b3JpYXM/cGFnZT0xJlwiICsgdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS50dXRvcmlhbHMgPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSAtdm0uJHJlZnMucmFkbGlzdF90dXRvcmlhbHMubmF0aXZlVmlldy5nZXRTY3JvbGxPZmZzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLiRyZWZzLnJhZGxpc3RfdHV0b3JpYWxzLm5hdGl2ZVZpZXcuc2Nyb2xsV2l0aEFtb3VudChvZmZzZXQsZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5udW1iZXJQYWdlcyA9IE1hdGguY2VpbCgocmVzcG9uc2UuY29udGVudC50b0pTT04oKS50b3RhbC92bS5udW1iZXJJdGVtc1BhZ2UpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uJHJlZnMucmFkbGlzdF90dXRvcmlhbHMubmF0aXZlVmlldy5sb2FkT25EZW1hbmRNb2RlID0gXCJBdXRvXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb252ZXJ0RGF0ZShkYXRlKXtcbiAgICAgICAgICAgICAgICBsZXQgYXJyYXlEYXRlID0gZGF0ZS5zcGxpdCgnLScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheURhdGVbMl0gKyBcIi1cIiArIGFycmF5RGF0ZVsxXSAgKyBcIi1cIiArIGFycmF5RGF0ZVswXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXREYXlXZWVrKGRhdGUpe1xuICAgICAgICAgICAgICAgIGxldCBvYmpEYXRlID0gbmV3IERhdGUodGhpcy5jb252ZXJ0RGF0ZShkYXRlKSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmpEYXRlLmdldERheSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkRvbWluZ29cIjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiU2VndW5kYS1mZWlyYVwiO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJUZXLDp2EtZmVpcmFcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiUXVhcnRhLWZlaXJhXCI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlF1aW50YS1mZWlyYVwiO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJTZXh0YS1mZWlyYVwiO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJTw6FiYWRvXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dJbmZvVHV0b3JpYWwoaXRlbSl7XG4gICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmZvcm1hw6fDo28gLSBQZWRpZG8gZGUgdHV0b3JpYVwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlxcblBlZGlkbyBlZmV0dWFkbyBwZWxvIFwiK2l0ZW0ucGVkaWRvLnRvTG93ZXJDYXNlKCkrXCJcXG5cXG5EYXRhOiBcIitpdGVtLmRhdGErXCJcXG5cXG5Ib3JhIGRlIGluw61jaW86IFwiK2l0ZW0uaG9yYUluaWNpbytcIlxcblxcbkFzc3VudG86IFwiK2l0ZW0uYXNzdW50bytcIlxcblxcbkRlc2NyacOnw6NvOiBcIisoaXRlbS5kZXNjcmljYW8gPT0gbnVsbCA/IFwiVmF6aWFcIiA6IGl0ZW0uZGVzY3JpY2FvKStcIlxcblxcblNhbGE6IFwiKyhpdGVtLnNhbGEgPT0gbnVsbCA/IFwiUG9yIGRlZmluaXJcIiA6IGl0ZW0uc2FsYS5ub21lKStcIlxcblxcblByb2Zlc3NvcihhKTogXCIraXRlbS5wcm9mZXNzb3Iubm9tZStcIlxcblxcblVuaWRhZGUgQ3VycmljdWxhcjogXCIraXRlbS51bmlkYWRlX2N1cnJpY3VsYXIubm9tZStcIlxcblxcbkVzdGFkbzogXCIrKGl0ZW0uZXN0YWRvID09IDEgPyBcIkNvbmZpcm1hZG9cIiA6IFwiTsOjbyBjb25maXJtYWRvXCIpLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiRmVjaGFyXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkxvYWRNb3JlSXRlbXNSZXF1ZXN0ZWQoKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhZ2UgPT0gdGhpcy5udW1iZXJQYWdlcyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMucmFkbGlzdF90dXRvcmlhbHMubmF0aXZlVmlldy5ub3RpZnlBcHBlbmRJdGVtc09uRGVtYW5kRmluaXNoZWQoMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnJhZGxpc3RfdHV0b3JpYWxzLm5hdGl2ZVZpZXcubG9hZE9uRGVtYW5kTW9kZSA9IFwiTm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlKys7XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFyaWFibGVzID0gJ3BhZ2U9JyArIHRoaXMucGFnZSArICcmdWM9JyArIHRoaXMuZmlsdGVyLmNvdXJzZV91bml0ICsgJyZkYXRhST0nICsgdGhpcy5zZWxlY3RlZC5pbml0aWFsX2RhdGUgKyAnJmRhdGFGPScgKyB0aGlzLnNlbGVjdGVkLmZpbmFsX2RhdGUgKyAnJmhvcmE9JyArIHRoaXMuZmlsdGVyLmhvdXIgKyAnJnBlZGlkbz0nICsgdGhpcy5maWx0ZXIucmVxdWVzdCArICcmcHJvZmVzc29yPScgKyB0aGlzLmZpbHRlci50ZWFjaGVyICsgJyZhc3N1bnRvPScgKyB0aGlzLmZpbHRlci5zdWJqZWN0ICsgJyZlc3RhZG89JyArIHRoaXMuZmlsdGVyLnN0YXRlICsgJyZkYXRhUz0nICsgdGhpcy5maWx0ZXIuZGF0ZVNvcnRpbmcgKyAnJnByb2Zlc3NvclM9JyArIHRoaXMuZmlsdGVyLnRlYWNoZXJTb3J0aW5nICsgJyZlc3RhZG9TPScgKyB0aGlzLmZpbHRlci5zdGF0ZVNvcnRpbmc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovLzE0Mi45My4xNDIuMjA4L2FwaS9hbHVuby9cIit0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLmlkK1wiL3R1dG9yaWFzP1wiICsgdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLmRhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWxzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMucmFkbGlzdF90dXRvcmlhbHMubmF0aXZlVmlldy5ub3RpZnlBcHBlbmRJdGVtc09uRGVtYW5kRmluaXNoZWQoMCwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMucGFnZSA9PSB0aGlzLm51bWJlclBhZ2VzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMucmFkbGlzdF90dXRvcmlhbHMubmF0aXZlVmlldy5sb2FkT25EZW1hbmRNb2RlID0gXCJOb25lXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkJhY2tFdmVudCAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGRhdGEuY2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdiYWNrJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SG9vaygpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmFuZHJvaWQub24odGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZEFwcC5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMub25CYWNrRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhckhvb2soKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLiRzdG9yZS5zdGF0ZS5pc0FuZHJvaWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5hbmRyb2lkLm9mZih0aGlzLiRzdG9yZS5zdGF0ZS5hbmRyb2lkQXBwLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5vbkJhY2tFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZnJlc2hUYWJsZSgpe1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVNlbGVjdGVkID0gMDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLmZpbmFsX2RhdGUgPSB0aGlzLnNlbGVjdGVkLmluaXRpYWxfZGF0ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFyaWFibGVzID0gJ3VjPScgKyB0aGlzLmZpbHRlci5jb3Vyc2VfdW5pdCArICcmZGF0YUk9JyArIHRoaXMuc2VsZWN0ZWQuaW5pdGlhbF9kYXRlICsgJyZkYXRhRj0nICsgdGhpcy5zZWxlY3RlZC5maW5hbF9kYXRlICsgJyZob3JhPScgKyB0aGlzLmZpbHRlci5ob3VyICsgJyZwZWRpZG89JyArIHRoaXMuZmlsdGVyLnJlcXVlc3QgKyAnJnByb2Zlc3Nvcj0nICsgdGhpcy5maWx0ZXIudGVhY2hlciArICcmYXNzdW50bz0nICsgdGhpcy5maWx0ZXIuc3ViamVjdCArICcmZXN0YWRvPScgKyB0aGlzLmZpbHRlci5zdGF0ZSArICcmZGF0YVM9JyArIHRoaXMuZmlsdGVyLmRhdGVTb3J0aW5nICsgJyZwcm9mZXNzb3JTPScgKyB0aGlzLmZpbHRlci50ZWFjaGVyU29ydGluZyArICcmZXN0YWRvUz0nICsgdGhpcy5maWx0ZXIuc3RhdGVTb3J0aW5nO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvYWx1bm8vXCIrdGhpcy4kc3RvcmUuc3RhdGUudXNlci5pZCtcIi90dXRvcmlhcz9wYWdlPTEmXCIgKyB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIlxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWxzID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyUGFnZXMgPSBNYXRoLmNlaWwoKHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkudG90YWwvdGhpcy5udW1iZXJJdGVtc1BhZ2UpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5yYWRsaXN0X3R1dG9yaWFscy5uYXRpdmVWaWV3LmxvYWRPbkRlbWFuZE1vZGUgPSBcIkF1dG9cIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5yYWRsaXN0X3R1dG9yaWFscy5uYXRpdmVWaWV3Lm5vdGlmeVB1bGxUb1JlZnJlc2hGaW5pc2hlZCgpO1xuICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgdGhpcy5zZXRIb29rKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFySG9vaygpO1xuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVkKCl7XG4gICAgICAgICAgICBpZih0aGlzLiRzdG9yZS5zdGF0ZS5pc0FuZHJvaWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuYnVzeVRleHQgPSBcIkEgY2FycmVnYXIuLi5cIjtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c3kgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovLzE0Mi45My4xNDIuMjA4L2FwaS9hbHVuby9cIit0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLmlkK1wiL3R1dG9yaWFzP3BhZ2U9MSZkYXRhUz1kZXNjJmVzdGFkb1M9YXNjXCIsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWxzID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKS5kYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyUGFnZXMgPSBNYXRoLmNlaWwoKHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkudG90YWwvdGhpcy5udW1iZXJJdGVtc1BhZ2UpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuXG4gICAgICAgICAgICAgICAgaWYodGhpcy50dXRvcmlhbHMubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkluZm9ybWHDp8Ojb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJOw6NvIHRlbSBuZW5odW0gcGVkaWRvIGRlIHR1dG9yaWEgcGVuZGVudGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2JhY2snKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICBkZWVwOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c3lUZXh0ID0gXCJBIGNhcnJlZ2FyLi4uXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c3kgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtU2VsZWN0ZWQgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5maW5hbF9kYXRlID0gdGhpcy5zZWxlY3RlZC5pbml0aWFsX2RhdGU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFyaWFibGVzID0gJ3VjPScgKyB0aGlzLmZpbHRlci5jb3Vyc2VfdW5pdCArICcmZGF0YUk9JyArIHRoaXMuc2VsZWN0ZWQuaW5pdGlhbF9kYXRlICsgJyZkYXRhRj0nICsgdGhpcy5zZWxlY3RlZC5maW5hbF9kYXRlICsgJyZob3JhPScgKyB0aGlzLmZpbHRlci5ob3VyICsgJyZwZWRpZG89JyArIHRoaXMuZmlsdGVyLnJlcXVlc3QgKyAnJnByb2Zlc3Nvcj0nICsgdGhpcy5maWx0ZXIudGVhY2hlciArICcmYXNzdW50bz0nICsgdGhpcy5maWx0ZXIuc3ViamVjdCArICcmZXN0YWRvPScgKyB0aGlzLmZpbHRlci5zdGF0ZSArICcmZGF0YVM9JyArIHRoaXMuZmlsdGVyLmRhdGVTb3J0aW5nICsgJyZwcm9mZXNzb3JTPScgKyB0aGlzLmZpbHRlci50ZWFjaGVyU29ydGluZyArICcmZXN0YWRvUz0nICsgdGhpcy5maWx0ZXIuc3RhdGVTb3J0aW5nO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovLzE0Mi45My4xNDIuMjA4L2FwaS9hbHVuby9cIit0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLmlkK1wiL3R1dG9yaWFzP3BhZ2U9MSZcIiArIHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIlxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy4kc3RvcmUuc3RhdGUuaXNBbmRyb2lkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWxzID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gLXRoaXMuJHJlZnMucmFkbGlzdF90dXRvcmlhbHMubmF0aXZlVmlldy5nZXRTY3JvbGxPZmZzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMucmFkbGlzdF90dXRvcmlhbHMubmF0aXZlVmlldy5zY3JvbGxXaXRoQW1vdW50KG9mZnNldCxmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyUGFnZXMgPSBNYXRoLmNlaWwoKHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkudG90YWwvdGhpcy5udW1iZXJJdGVtc1BhZ2UpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnJhZGxpc3RfdHV0b3JpYWxzLm5hdGl2ZVZpZXcubG9hZE9uRGVtYW5kTW9kZSA9IFwiQXV0b1wiO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbiAgICAuaGVhZGVye1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG4gICAgQnV0dG9ue1xuICAgICAgICB3aWR0aDogMzUlO1xuICAgICAgICBtYXJnaW4tdG9wOiAxJTtcbiAgICB9XG4gICAgRHJvcERvd257XG4gICAgICAgIG1hcmdpbi1sZWZ0OiA1JTtcbiAgICB9XG4gICAgLnNlbGVjdGVke1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTIzNDU2O1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgfVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8UGFnZSBhY3Rpb25CYXJIaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIDxHcmlkTGF5b3V0IHJvd3M9XCIqXCIgY29sdW1ucz1cIipcIiBoZWlnaHQ9XCIxMDAlXCIgd2lkdGg9XCIxMDAlXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIHZlcnRpY2FsQWxpZ25tZW50PVwiY2VudGVyXCI+XG4gICAgICAgICAgICA8U3RhY2tMYXlvdXQgcm93PVwiMFwiIGNvbD1cIjBcIiB3aWR0aD1cIjc1JVwiIHZlcnRpY2FsQWxpZ25tZW50PVwiY2VudGVyXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9XCJ+L290aGVycy9pY29uLnBuZ1wiIHN0cmVjaD1cIm5vbmVcIiB3aWR0aD1cIjkwJVwiIGNsYXNzPVwidGl0bGVcIi8+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCB2LW1vZGVsPVwibnVtYmVyXCIgaGludD1cIk7Dum1lcm8gZGUgZXN0dWRhbnRlXCIgY2xhc3M9XCJpdGVtXCIgZm9udFNpemU9XCIxNVwiIGtleWJvYXJkVHlwZT1cIm51bWJlclwiLz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHYtbW9kZWw9XCJwYXNzd29yZFwiIGhpbnQ9XCJTZW5oYVwiIHNlY3VyZT1cInRydWVcIiBjbGFzcz1cIml0ZW1cIiBmb250U2l6ZT1cIjE1XCIvPlxuICAgICAgICAgICAgICAgIDxjaGVjay1ib3ggdGV4dD1cIk1hbnRlciBzZXNzw6NvIGluaWNpYWRhXCIgOmNoZWNrZWQ9XCJpc0NoZWNrZWRcIiBAY2hlY2tlZENoYW5nZT1cImlzQ2hlY2tlZCA9ICRldmVudC52YWx1ZVwiIGNsYXNzPVwiaXRlbVwiLz5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIHRleHQ9XCJJbmljaWFyIHNlc3PDo29cIiBAdGFwPVwibG9naW5cIiBmb250U2l6ZT1cIjE1XCIvPlxuICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgIDwvUGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHtleGl0fSBmcm9tICduYXRpdmVzY3JpcHQtZXhpdCc7XG4gICAgaW1wb3J0IG1haW5QYWdlIGZyb20gXCIuL21haW5QYWdlXCI7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGRhdGE6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgICBudW1iZXI6XCJcIixcbiAgICAgICAgICAgICAgICBwYXNzd29yZDpcIlwiLFxuICAgICAgICAgICAgICAgIGlzQ2hlY2tlZDpmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOntcbiAgICAgICAgICAgIGxvZ2luKCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5udW1iZXIubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW5zaXJhIG8gbsO6bWVybyBkZSBlc3R1ZGFudGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMucGFzc3dvcmQubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW5zaXJhIGEgc2VuaGFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvbG9naW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IHRoaXMubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSA0MDQgfHwgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSA0MDApeyAgIC8vRVJST1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLm1zZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gMjAwKXsgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NPUlJFVSBCRU1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2RlZmluZVVzZXInLCByZXNwb25zZS5jb250ZW50LnRvSlNPTigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzQ2hlY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmFwcFNldHRpbmdzLnNldE51bWJlcihcImlkXCIsIHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5hcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJub21lXCIsIHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkubm9tZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmFwcFNldHRpbmdzLnNldE51bWJlcihcIm51bWVyb1wiLCByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLm51bWVybyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJIb29rKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGVUbyhtYWluUGFnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQmFja0V2ZW50KGRhdGEpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZXhpdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEhvb2soKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLiRzdG9yZS5zdGF0ZS5pc0FuZHJvaWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5hbmRyb2lkLm9uKHRoaXMuJHN0b3JlLnN0YXRlLmFuZHJvaWRBcHAuYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLm9uQmFja0V2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJIb29rKCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy4kc3RvcmUuc3RhdGUuaXNBbmRyb2lkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZC5vZmYodGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZEFwcC5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMub25CYWNrRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SG9vaygpO1xuICAgICAgICB9LFxuICAgICAgICBiZWZvcmVEZXN0cm95KCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckhvb2soKTtcbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbiAgICAudGl0bGV7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwJTtcbiAgICB9XG4gICAgLml0ZW17XG4gICAgICAgIG1hcmdpbjogMSU7XG4gICAgfVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8UGFnZSBhY3Rpb25CYXJIaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIDxSYWRTaWRlRHJhd2VyIHJlZj1cImRyYXdlclwiIGRyYXdlckxvY2F0aW9uPVwiTGVmdFwiIGdlc3R1cmVzRW5hYmxlZD1cInRydWVcIj5cbiAgICAgICAgICAgIDxTdGFja0xheW91dCB+ZHJhd2VyQ29udGVudD5cbiAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgY2xhc3M9XCJudC1kcmF3ZXJfX2hlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8SW1hZ2UgY2xhc3M9XCJudC1kcmF3ZXJfX2hlYWRlci1pbWFnZSBmYXMgdC0zNlwiIHNyYy5kZWNvZGU9XCJmb250Oi8vJiN4ZjJiZDtcIiBzdHlsZT1cImNvbG9yOndoaXRlXCI+PC9JbWFnZT5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwibmFtZVwiIGNsYXNzPVwiaGVhZGVyLWVsZW1cIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8TGFiZWwgOnRleHQ9XCJlbWFpbFwiIGNsYXNzPVwiaGVhZGVyLWVsZW1cIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICA8U2Nyb2xsVmlldyBjbGFzcz1cIm50LWRyYXdlcl9fYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiYXV0bywqXCIgOmJhY2tncm91bmRDb2xvcj1cInNlbGVjdGVkUGFnZSA9PT0gJ2luaXRpYWxQYWdlJyA/ICcjZTBmNWZmJyA6ICd3aGl0ZSdcIiA6Y29sb3I9XCJzZWxlY3RlZFBhZ2UgPT09ICdpbml0aWFsUGFnZScgPyAnIzAwODhjOScgOiAnYmxhY2snXCIgY2xhc3M9XCJudC1kcmF3ZXJfX2xpc3QtaXRlbVwiIEB0YXA9XCJvbk5hdmlnYXRpb25JdGVtVGFwKCdpbml0aWFsUGFnZScsICdQw6FnaW5hIGluaWNpYWwnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0LmRlY29kZT1cIiYjeGYwMTU7XCIgY2xhc3M9XCJudC1pY29uIGZhc1wiIGNvbD1cIjBcIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0PVwiUMOhZ2luYSBpbmljaWFsXCIgY29sPVwiMVwiPjwvTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCJhdXRvLCpcIiA6YmFja2dyb3VuZENvbG9yPVwic2VsZWN0ZWRQYWdlID09PSAncHJldmlvdXNDbGFzc2VzUGFnZScgfHwgc2VsZWN0ZWRQYWdlID09PSAncHJldmlvdXNDbGFzc2lmaWNhdGlvbnNQYWdlJyA/ICcjZTBmNWZmJyA6ICd3aGl0ZSdcIiA6Y29sb3I9XCJzZWxlY3RlZFBhZ2UgPT09ICdwcmV2aW91c0NsYXNzZXNQYWdlJyB8fCBzZWxlY3RlZFBhZ2UgPT09ICdwcmV2aW91c0NsYXNzaWZpY2F0aW9uc1BhZ2UnID8gJyMwMDg4YzknIDogJ2JsYWNrJ1wiIDpjbGFzcz1cIidudC1kcmF3ZXJfX2xpc3QtaXRlbSdcIiBAdGFwPVwib25OYXZpZ2F0aW9uSXRlbVRhcCgncHJldmlvdXNDbGFzc2VzUGFnZScsICdBdWxhcyBhbnRlcmlvcmVzJylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dC5kZWNvZGU9XCImI3hmMWRhO1wiIGNsYXNzPVwibnQtaWNvbiBmYXNcIiBjb2w9XCIwXCI+PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIkF1bGFzIGFudGVyaW9yZXNcIiBjb2w9XCIxXCI+PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgY29sdW1ucz1cImF1dG8sKlwiIDpiYWNrZ3JvdW5kQ29sb3I9XCJzZWxlY3RlZFBhZ2UgPT09ICdzY2hlZHVsZVR1dG9yaW5nJyB8fCBzZWxlY3RlZFBhZ2UgPT09ICdyZWdpc3RlclR1dG9yaW5nJyA/ICcjZTBmNWZmJyA6ICd3aGl0ZSdcIiA6Y29sb3I9XCJzZWxlY3RlZFBhZ2UgPT09ICdzY2hlZHVsZVR1dG9yaW5nJyB8fCBzZWxlY3RlZFBhZ2UgPT09ICdyZWdpc3RlclR1dG9yaW5nJyA/ICcjMDA4OGM5JyA6ICdibGFjaydcIiBjbGFzcz1cIm50LWRyYXdlcl9fbGlzdC1pdGVtXCIgQHRhcD1cIm9uTmF2aWdhdGlvbkl0ZW1UYXAoJ3NjaGVkdWxlVHV0b3JpbmcnLCAnTWFyY2FyIHR1dG9yaWEnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0LmRlY29kZT1cIiYjeGYyNzE7XCIgY2xhc3M9XCJudC1pY29uIGZhc1wiIGNvbD1cIjBcIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0PVwiTWFyY2FyIHR1dG9yaWFcIiBjb2w9XCIxXCI+PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgY29sdW1ucz1cImF1dG8sKlwiIDpiYWNrZ3JvdW5kQ29sb3I9XCJzZWxlY3RlZFBhZ2UgPT09ICdsaXN0VHV0b3JpYWxzJyB8fCBzZWxlY3RlZFBhZ2UgPT09ICdlZGl0VHV0b3JpYWwnID8gJyNlMGY1ZmYnIDogJ3doaXRlJ1wiIDpjb2xvcj1cInNlbGVjdGVkUGFnZSA9PT0gJ2xpc3RUdXRvcmlhbHMnIHx8IHNlbGVjdGVkUGFnZSA9PT0gJ2VkaXRUdXRvcmlhbCcgPyAnIzAwODhjOScgOiAnYmxhY2snXCIgY2xhc3M9XCJudC1kcmF3ZXJfX2xpc3QtaXRlbVwiIEB0YXA9XCJvbk5hdmlnYXRpb25JdGVtVGFwKCdsaXN0VHV0b3JpYWxzJywgJ1BlZGlkb3MgZGUgdHV0b3JpYScpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIHRleHQuZGVjb2RlPVwiJiN4ZjBjYTtcIiBjbGFzcz1cIm50LWljb24gZmFzXCIgY29sPVwiMFwiPjwvTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJQZWRpZG9zIGRlIHR1dG9yaWFcIiBjb2w9XCIxXCI+PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgY29sdW1ucz1cImF1dG8sKlwiIDpiYWNrZ3JvdW5kQ29sb3I9XCJzZWxlY3RlZFBhZ2UgPT09ICdsaXN0QXJjaGl2ZWRUdXRvcmlhbHMnID8gJyNlMGY1ZmYnIDogJ3doaXRlJ1wiIDpjb2xvcj1cInNlbGVjdGVkUGFnZSA9PT0gJ2xpc3RBcmNoaXZlZFR1dG9yaWFscycgPyAnIzAwODhjOScgOiAnYmxhY2snXCIgY2xhc3M9XCJudC1kcmF3ZXJfX2xpc3QtaXRlbVwiIEB0YXA9XCJvbk5hdmlnYXRpb25JdGVtVGFwKCdsaXN0QXJjaGl2ZWRUdXRvcmlhbHMnLCAnUGVkaWRvcyBkZSB0dXRvcmlhIGFycXVpdmFkb3MnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0LmRlY29kZT1cIiYjeGYxODc7XCIgY2xhc3M9XCJudC1pY29uIGZhc1wiIGNvbD1cIjBcIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0PVwiUGVkaWRvcyBkZSB0dXRvcmlhIGFycXVpdmFkb3NcIiBjb2w9XCIxXCI+PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwiaHJcIj48L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiYXV0bywqXCIgY2xhc3M9XCJudC1kcmF3ZXJfX2xpc3QtaXRlbVwiIEB0YXA9XCJsb2dvdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dC5kZWNvZGU9XCImI3hmMmY1O1wiIGNsYXNzPVwibnQtaWNvbiBmYXNcIiBjb2w9XCIwXCI+PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIlRlcm1pbmFyIHNlc3PDo29cIiBjb2w9XCIxXCI+PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgICAgICA8RnJhbWUgfm1haW5Db250ZW50PlxuICAgICAgICAgICAgICAgIDxQYWdlPlxuICAgICAgICAgICAgICAgICAgICA8QWN0aW9uQmFyIDp0aXRsZT1cInRpdGxlXCIgc3R5bGU9XCJjb2xvcjp3aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGFuZHJvaWQgdi1pZj1cInRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZpZ2F0aW9uQnV0dG9uIGljb249XCJyZXM6Ly9tZW51XCIgQHRhcD1cIm9wZW5NZW51XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBY3Rpb25JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmxleGJveExheW91dCBhbGlnbkNvbnRlbnQ9XCJmbGV4LWVuZFwiIHYtaWY9XCJzZWxlY3RlZFBhZ2U9PSdwcmV2aW91c0NsYXNzaWZpY2F0aW9uc1BhZ2UnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2UgaGVpZ2h0PVwiNTUlXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDMlXCIgc3JjPVwifi9vdGhlcnMvaW5mby1pY29uLXdoaXRlLnBuZ1wiIHN0cmVjaD1cIm5vbmVcIiBAdGFwPVwic2VlQ2xhc3NJbmZvXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0ZsZXhib3hMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BY3Rpb25JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hbmRyb2lkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlvcyB2LWVsc2U+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFjdGlvbkl0ZW0gaWNvbj1cInJlczovL21lbnVcIiBpb3MucG9zaXRpb249XCJsZWZ0XCIgQHRhcD1cIm9wZW5NZW51XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBY3Rpb25JdGVtIHYtc2hvdz1cInNlbGVjdGVkUGFnZT09J3ByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZSdcIiBpY29uPVwicmVzOi8vaW5mb1wiIGlvcy5wb3NpdGlvbj1cInJpZ2h0XCIgQHRhcD1cInNlZUNsYXNzSW5mb1wiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaW9zPlxuICAgICAgICAgICAgICAgICAgICA8L0FjdGlvbkJhcj5cblxuICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgdi1pZj1cInNlbGVjdGVkUGFnZT09J2luaXRpYWxQYWdlJ1wiIGNsYXNzPVwiY2VudGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbml0aWFsLXBhZ2Ugdi1vbjpjbGFzcz1cImVudGVyQ2xhc3NcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IHYtZWxzZS1pZj1cInNlbGVjdGVkUGFnZT09J3ByZXZpb3VzQ2xhc3Nlc1BhZ2UnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cHJldmlvdXMtY2xhc3Nlcy1wYWdlIDppdGVtU2VsZWN0ZWQ9XCJpdGVtU2VsZWN0ZWRDbGFzc1wiIHYtb246c2VlQ2xhc3NpZmljYXRpb25zPVwiZW50ZXJDbGFzc2lmaWNhdGlvbnNQYWdlXCIgdi1vbjpiYWNrPVwiZ29pbmdCYWNrXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCB2LWVsc2UtaWY9XCJzZWxlY3RlZFBhZ2U9PSdzY2hlZHVsZVR1dG9yaW5nJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNjaGVkdWxlLXR1dG9yaW5nIHYtb246cmVnaXN0ZXJUdXRvcmluZz1cImVudGVyUmVnaXN0ZXJUdXRvcmluZ1wiIHYtb246YmFjaz1cImdvaW5nQmFja1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cblxuICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgdi1lbHNlLWlmPVwic2VsZWN0ZWRQYWdlPT0ncmVnaXN0ZXJUdXRvcmluZydcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxyZWdpc3Rlci10dXRvcmluZyA6dGVhY2hlcl9pZD1cInRlYWNoZXJcIiA6Y291cnNlX3VuaXRzPVwidW5pdHNcIiA6dGVhY2hlcl9uYW1lPVwidE5hbWVcIiB2LW9uOmJhY2tUZWFjaGVycz1cInNlZVRlYWNoZXJzXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCB2LWVsc2UtaWY9XCJzZWxlY3RlZFBhZ2U9PSdsaXN0VHV0b3JpYWxzJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpc3QtdHV0b3JpYWxzIDppdGVtU2VsZWN0ZWQ9XCJpdGVtU2VsZWN0ZWRUdXRvcmlhbFwiIHYtb246ZWRpdFR1dG9yaWFsPVwiZW50ZXJFZGl0VHV0b3JpYWxcIiB2LW9uOmJhY2s9XCJnb2luZ0JhY2tcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IHYtZWxzZS1pZj1cInNlbGVjdGVkUGFnZT09J2VkaXRUdXRvcmlhbCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxlZGl0LXR1dG9yaWFsIDp0dXRvcmlhbD1cInR1dG9yaWFsRWRpdFwiIHYtb246YmFja0xpc3RUdXRvcmlhbHM9XCJzZWVMaXN0VHV0b3JpYWxzXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCB2LWVsc2UtaWY9XCJzZWxlY3RlZFBhZ2U9PSdsaXN0QXJjaGl2ZWRUdXRvcmlhbHMnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGlzdC1hcmNoaXZlZC10dXRvcmlhbHMgdi1vbjpiYWNrPVwiZ29pbmdCYWNrXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCB2LWVsc2UtaWY9XCJzZWxlY3RlZFBhZ2U9PSdwcmV2aW91c0NsYXNzaWZpY2F0aW9uc1BhZ2UnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHByZXZpb3VzLWNsYXNzaWZpY2F0aW9ucy1wYWdlIDpjbGFzc1NlbGVjdGVkPVwiY2xhc3NTZWxlY3RlZFwiIHYtb246YmFjaz1cImdvaW5nQmFja0NsYXNzZXNcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgPC9QYWdlPlxuICAgICAgICAgICAgPC9GcmFtZT5cbiAgICAgICAgPC9SYWRTaWRlRHJhd2VyPlxuICAgIDwvUGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IGNsYXNzUGFnZSBmcm9tIFwiLi9jbGFzc1BhZ2VcIjtcbiAgICBpbXBvcnQgbG9naW5QYWdlIGZyb20gXCIuL2xvZ2luUGFnZVwiO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm57XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy4kc3RvcmUuc3RhdGUudXNlci5ub21lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiB0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLm51bWVybyArIFwiQG15LmlwbGVpcmlhLnB0XCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiUMOhZ2luYSBpbmljaWFsXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQYWdlOiBcImluaXRpYWxQYWdlXCIsXG4gICAgICAgICAgICAgICAgdGVhY2hlcjogXCJcIixcbiAgICAgICAgICAgICAgICB1bml0czogW10sXG4gICAgICAgICAgICAgICAgdE5hbWU6IFwiXCIsXG4gICAgICAgICAgICAgICAgdHV0b3JpYWxFZGl0OiBcIlwiLFxuICAgICAgICAgICAgICAgIGNsYXNzU2VsZWN0ZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdGVkQ2xhc3M6IDAsXG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdGVkVHV0b3JpYWw6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBvcGVuTWVudSgpe1xuICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbk5hdmlnYXRpb25JdGVtVGFwKHBhZ2UsdGl0bGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVNlbGVjdGVkQ2xhc3MgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVNlbGVjdGVkVHV0b3JpYWwgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlID0gcGFnZTtcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnRlckNsYXNzKGNvZGUpe1xuICAgICAgICAgICAgICAgIGlmKGNvZGUudHJpbSgpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJJbnNpcmEgdW0gY8OzZGlnb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoISgvXlxcZCskLy50ZXN0KGNvZGUpKSl7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW5zaXJhIHVtIHZhbG9yIG51bcOpcmljb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovLzE0Mi45My4xNDIuMjA4L2FwaS9hdWxhL3JlZ2lzdGFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGlnb19hdWxhOiBjb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdW5vX2lkOiB0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSA0MDQgfHwgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSA0MDApeyAgIC8vRVJST1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLm1zZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gMjAwKXsgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NPUlJFVSBCRU1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZVRvKGNsYXNzUGFnZSx7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc19pZDogcmVzcG9uc2UuY29udGVudC50b0pTT04oKS5hdWxhX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZT0+Y29uc29sZS5sb2coZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnRlclJlZ2lzdGVyVHV0b3JpbmcoaWQsYXJyLG5hbWUpe1xuICAgICAgICAgICAgICAgIHRoaXMudGVhY2hlciA9IGlkO1xuICAgICAgICAgICAgICAgIHRoaXMudW5pdHMgPSBhcnI7XG4gICAgICAgICAgICAgICAgdGhpcy50TmFtZSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBhZ2UgPSBcInJlZ2lzdGVyVHV0b3JpbmdcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJNYXJjYXIgdHV0b3JpYVwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdvaW5nQmFjaygpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlID0gXCJpbml0aWFsUGFnZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIlDDoWdpbmEgaW5pY2lhbFwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlZVRlYWNoZXJzKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBhZ2UgPSBcInNjaGVkdWxlVHV0b3JpbmdcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJNYXJjYXIgdHV0b3JpYVwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudGVyRWRpdFR1dG9yaWFsKHR1dG9yaWFsKXtcbiAgICAgICAgICAgICAgICB0aGlzLnR1dG9yaWFsRWRpdCA9IHR1dG9yaWFsO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVNlbGVjdGVkVHV0b3JpYWwgPSB0dXRvcmlhbC5pZDtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGFnZSA9IFwiZWRpdFR1dG9yaWFsXCI7XG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiRWRpdGFyIHBlZGlkbyBkZSB0dXRvcmlhXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VlTGlzdFR1dG9yaWFscygpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlID0gXCJsaXN0VHV0b3JpYWxzXCI7XG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiUGVkaWRvcyBkZSB0dXRvcmlhXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW50ZXJDbGFzc2lmaWNhdGlvbnNQYWdlKGNsYXNzU2VsZWN0ZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NTZWxlY3RlZCA9IGNsYXNzU2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtU2VsZWN0ZWRDbGFzcyA9IGNsYXNzU2VsZWN0ZWQuaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBhZ2UgPSBcInByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIkNsYXNzaWZpY2HDp8O1ZXNcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnb2luZ0JhY2tDbGFzc2VzKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBhZ2UgPSBcInByZXZpb3VzQ2xhc3Nlc1BhZ2VcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJBdWxhcyBhbnRlcmlvcmVzXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udmVydERhdGUoZGF0ZSl7XG4gICAgICAgICAgICAgICAgbGV0IG9iakRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG9iakRhdGUuZ2V0RGF0ZSgpIDwgMTAgPyBcIjBcIitvYmpEYXRlLmdldERhdGUoKSA6IG9iakRhdGUuZ2V0RGF0ZSgpKSArIFwiLVwiICsgKChvYmpEYXRlLmdldE1vbnRoKCkgKyAxKSA8IDEwID8gXCIwXCIrKG9iakRhdGUuZ2V0TW9udGgoKSArIDEpIDogKG9iakRhdGUuZ2V0TW9udGgoKSArIDEpKSArIFwiLVwiICsgb2JqRGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlZUNsYXNzSW5mbygpe1xuICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSW5mb3JtYcOnw6NvIC0gQXVsYVwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlxcbkRhdGE6IFwiK3RoaXMuY29udmVydERhdGUodGhpcy5jbGFzc1NlbGVjdGVkLmRhdGEpK1wiXFxuXFxuVW5pZGFkZSBDdXJyaWN1bGFyOiBcIit0aGlzLmNsYXNzU2VsZWN0ZWQudW5pZGFkZV9jdXJyaWN1bGFyK1wiXFxuXFxuUHJvZmVzc29yKGEpOiBcIit0aGlzLmNsYXNzU2VsZWN0ZWQucHJvZmVzc29yLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiRmVjaGFyXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsb2dvdXQoKXtcbiAgICAgICAgICAgICAgICBsZXQgdm0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGNvbmZpcm0oe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJUZXJtaW5hciBzZXNzw6NvXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGVtIGEgY2VydGV6YSBxdWUgZGVzZWphIHRlcm1pbmFyIGEgc2Vzc8OjbyBhdHVhbD9cIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlNpbVwiLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIk7Do29cIlxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0uJHN0b3JlLmNvbW1pdCgnZGVzdHJveVVzZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLiRzdG9yZS5zdGF0ZS5hcHBTZXR0aW5ncy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0uJG5hdmlnYXRlVG8obG9naW5QYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS4kcmVmcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuICAgIC5oZWFkZXItZWxlbXtcbiAgICAgICAgY29sb3I6d2hpdGU7XG4gICAgfVxuXG4gICAgLmNlbnRlci1pdGVte1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyO1xuICAgICAgICBob3Jpei1hbGlnbjogY2VudGVyO1xuICAgICAgICB3aWR0aDo4NSU7XG4gICAgfVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8U3RhY2tMYXlvdXQgc3R5bGU9XCJob3Jpei1hbGlnbjogY2VudGVyXCI+XG4gICAgICAgIDxTdGFja0xheW91dCB3aWR0aD1cIjg1JVwiPlxuICAgICAgICAgICAgPEJ1dHRvbiA6dGV4dD1cImZpbHRlckJ0bk5hbWVcIiBAdGFwPVwiZmlsdGVyQ2xhc3Nlc1wiLz5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqLGF1dG8sKixhdXRvXCIgcm93cz1cImF1dG8sYXV0byxhdXRvXCIgOnZpc2liaWxpdHk9XCJmaWx0ZXJWaXNcIj5cbiAgICAgICAgICAgICAgICA8RHJvcERvd24gOml0ZW1zPVwiY2hvaWNlc1wiIEBzZWxlY3RlZEluZGV4Q2hhbmdlZD1cImRyb3BEb3duU2VsZWN0ZWRJbmRleENoYW5nZWRcIiBjb2w9XCIwXCIgcm93PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDpzZWxlY3RlZEluZGV4PVwic2VsZWN0ZWRJbmRleFwiLz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHYtbW9kZWw9XCJmaWx0ZXJbJ2luaXRpYWxfZGF0ZSddXCIgaGludD1cIkRhdGFcIiBjb2w9XCIwXCIgcm93PVwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA6dmlzaWJpbGl0eT1cImRhdGVWaXNcIiBlZGl0YWJsZT1cImZhbHNlXCIgQHRhcD1cIm9wZW5EYXRlKCdpbml0aWFsX2RhdGUnKVwiLz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHYtbW9kZWw9XCJmaWx0ZXJbJ2luaXRpYWxfZGF0ZSddXCIgaGludD1cIkRhdGEgSW5pY2lhbFwiIGNvbD1cIjBcIiByb3c9XCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDp2aXNpYmlsaXR5PVwiaW50ZXJ2YWxEYXRlVmlzXCIgZWRpdGFibGU9XCJmYWxzZVwiIEB0YXA9XCJvcGVuRGF0ZSgnaW5pdGlhbF9kYXRlJylcIi8+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHQuZGVjb2RlPVwiJiN4ZjEyZDtcIiBjbGFzcz1cIm50LWljb24gZmFzXCIgY29sPVwiMVwiIHJvdz1cIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInZlcnRpY2FsLWFsaWduOiBib3R0b21cIiBAdGFwPVwiY2xlYXIoJ2luaXRpYWxfZGF0ZScpXCIvPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgdi1tb2RlbD1cImZpbHRlclsnZmluYWxfZGF0ZSddXCIgaGludD1cIkRhdGEgRmluYWxcIiBjb2w9XCIyXCIgcm93PVwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA6dmlzaWJpbGl0eT1cImludGVydmFsRGF0ZVZpc1wiIGVkaXRhYmxlPVwiZmFsc2VcIiBAdGFwPVwib3BlbkRhdGUoJ2ZpbmFsX2RhdGUnKVwiLz5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dC5kZWNvZGU9XCImI3hmMTJkO1wiIGNsYXNzPVwibnQtaWNvbiBmYXNcIiBjb2w9XCIzXCIgcm93PVwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidmVydGljYWwtYWxpZ246IGJvdHRvbVwiIEB0YXA9XCJjbGVhcignZmluYWxfZGF0ZScpXCIgOnZpc2liaWxpdHk9XCJpbnRlcnZhbERhdGVWaXNcIi8+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKixhdXRvXCIgcm93cz1cImF1dG9cIiA6dmlzaWJpbGl0eT1cImZpbHRlclZpc1wiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgdi1tb2RlbD1cImZpbHRlclsnY291cnNlX3VuaXQnXVwiIGhpbnQ9XCJVbmlkYWRlIEN1cnJpY3VsYXJcIiBjb2w9XCIwXCIgcm93PVwiMFwiLz5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dC5kZWNvZGU9XCImI3hmMTJkO1wiIGNsYXNzPVwibnQtaWNvbiBmYXNcIiBjb2w9XCIxXCIgcm93PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidmVydGljYWwtYWxpZ246IGJvdHRvbVwiIEB0YXA9XCJjbGVhcignY291cnNlX3VuaXQnKVwiLz5cbiAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqLGF1dG8sKixhdXRvXCIgcm93cz1cImF1dG8sYXV0b1wiIDp2aXNpYmlsaXR5PVwiZmlsdGVyVmlzXCI+XG4gICAgICAgICAgICAgICAgPERyb3BEb3duIDppdGVtcz1cInNjaG9vbF95ZWFyX2xpc3RcIiBAc2VsZWN0ZWRJbmRleENoYW5nZWQ9XCJjaGFuZ2VTaG9vbFllYXJcIiBjb2w9XCIwXCIgcm93PVwiMFwiIGhpbnQ9XCJBbm8gTGV0aXZvXCIgOnNlbGVjdGVkSW5kZXg9XCJjbGVhckRyb3Auc2VsZWN0ZWRfc2Nob29sX3llYXJcIi8+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHQuZGVjb2RlPVwiJiN4ZjEyZDtcIiBjbGFzcz1cIm50LWljb24gZmFzXCIgY29sPVwiMVwiIHJvdz1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInZlcnRpY2FsLWFsaWduOiBib3R0b21cIiBAdGFwPVwiY2xlYXJJbmRleCgnc2Nob29sX3llYXInKVwiLz5cbiAgICAgICAgICAgICAgICA8RHJvcERvd24gOml0ZW1zPVwic2VtZXN0ZXJfbGlzdFwiIEBzZWxlY3RlZEluZGV4Q2hhbmdlZD1cImNoYW5nZVNlbWVzdGVyXCIgY29sPVwiMlwiIHJvdz1cIjBcIiBoaW50PVwiU2VtZXN0cmVcIiA6c2VsZWN0ZWRJbmRleD1cImNsZWFyRHJvcC5zZWxlY3RlZF9zZW1lc3RlclwiLz5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dC5kZWNvZGU9XCImI3hmMTJkO1wiIGNsYXNzPVwibnQtaWNvbiBmYXNcIiBjb2w9XCIzXCIgcm93PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidmVydGljYWwtYWxpZ246IGJvdHRvbVwiIEB0YXA9XCJjbGVhckluZGV4KCdzZW1lc3RlcicpXCIvPlxuICAgICAgICAgICAgICAgIDxEcm9wRG93biA6aXRlbXM9XCJjb3Vyc2VfeWVhcl9saXN0XCIgQHNlbGVjdGVkSW5kZXhDaGFuZ2VkPVwiY2hhbmdlQ291cnNlWWVhclwiIGNvbD1cIjBcIiByb3c9XCIxXCIgaGludD1cIkFubyBkbyBDdXJzb1wiIDpzZWxlY3RlZEluZGV4PVwiY2xlYXJEcm9wLnNlbGVjdGVkX2NvdXJzZV95ZWFyXCIvPlxuICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0LmRlY29kZT1cIiYjeGYxMmQ7XCIgY2xhc3M9XCJudC1pY29uIGZhc1wiIGNvbD1cIjFcIiByb3c9XCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ2ZXJ0aWNhbC1hbGlnbjogYm90dG9tXCIgQHRhcD1cImNsZWFySW5kZXgoJ2NvdXJzZV95ZWFyJylcIi8+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgIDwvU3RhY2tMYXlvdXQ+XG5cbiAgICAgICAgPEFjdGl2aXR5SW5kaWNhdG9yIDpidXN5PVwiYnVzeVwiIHYtaWY9XCJidXN5XCIvPlxuICAgICAgICA8TGFiZWwgdi1pZj1cImJ1c3lcIiA6dGV4dD1cImJ1c3lUZXh0XCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiLz5cblxuICAgICAgICA8UmFkTGlzdFZpZXcgcmVmPVwibGlzdF9jbGFzc2VzXCIgZm9yPVwiaXRlbSBpbiBjbGFzc2VzXCIgY2xhc3M9XCJsaXN0XCIgaGVpZ2h0PVwiMTAwJVwiIEBpdGVtVGFwPVwib25DbGFzc1RhcFwiXG4gICAgICAgICAgICAgICAgICAgICBsb2FkT25EZW1hbmRNb2RlPVwiQXV0b1wiIEBsb2FkTW9yZURhdGFSZXF1ZXN0ZWQ9XCJvbkxvYWRNb3JlSXRlbXNSZXF1ZXN0ZWRcIiBsb2FkT25EZW1hbmRCdWZmZXJTaXplPVwiMlwiXG4gICAgICAgICAgICAgICAgICAgICBwdWxsVG9SZWZyZXNoPVwidHJ1ZVwiIEBwdWxsVG9SZWZyZXNoSW5pdGlhdGVkPVwicmVmcmVzaFRhYmxlXCI+XG4gICAgICAgICAgICA8di10ZW1wbGF0ZSBuYW1lPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICA8R3JpZExheW91dCByb3dzPVwiYXV0b1wiIGNvbHVtbnM9XCIqLDIqXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZExheW91dCByb3dzPVwiYXV0b1wiIGNvbHVtbnM9XCJhdXRvLGF1dG9cIiByb3c9XCIwXCIgY29sPVwiMFwiIHN0eWxlPVwibWFyZ2luLWxlZnQ6IDUlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJEYXRhXCIgY2xhc3M9XCJoZWFkZXJcIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMFwiIGNvbD1cIjBcIiBAdGFwPVwiY2hhbmdlU29ydGluZ0RhdGVcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtaWY9XCJmaWx0ZXJbJ2RhdGVTb3J0aW5nJ10gPT0gJ2Rlc2MnXCIgc3JjPVwifi9vdGhlcnMvZGVzYy5wbmdcIiB3aWR0aD1cIjklXCIgcm93PVwiMFwiIGNvbD1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtZWxzZS1pZj1cImZpbHRlclsnZGF0ZVNvcnRpbmcnXSA9PSAnYXNjJ1wiIHNyYz1cIn4vb3RoZXJzL2FzYy5wbmdcIiB3aWR0aD1cIjklXCIgIHJvdz1cIjBcIiBjb2w9XCIxXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSB2LWVsc2Ugc3JjPVwifi9vdGhlcnMvbm9fc29ydGluZy5wbmdcIiB3aWR0aD1cIjklXCIgcm93PVwiMFwiIGNvbD1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZExheW91dCByb3dzPVwiYXV0b1wiIGNvbHVtbnM9XCJhdXRvLGF1dG9cIiByb3c9XCIwXCIgY29sPVwiMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0PVwiVW5pZGFkZSBDdXJyaWN1bGFyXCIgY2xhc3M9XCJoZWFkZXJcIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMFwiIGNvbD1cIjBcIiBAdGFwPVwiY2hhbmdlU29ydGluZ1VuaXRcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtaWY9XCJmaWx0ZXJbJ3VuaXRTb3J0aW5nJ10gPT0gJ2Rlc2MnXCIgc3JjPVwifi9vdGhlcnMvZGVzYy5wbmdcIiB3aWR0aD1cIjQlXCIgcm93PVwiMFwiIGNvbD1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtZWxzZS1pZj1cImZpbHRlclsndW5pdFNvcnRpbmcnXSA9PSAnYXNjJ1wiIHNyYz1cIn4vb3RoZXJzL2FzYy5wbmdcIiB3aWR0aD1cIjQlXCIgIHJvdz1cIjBcIiBjb2w9XCIxXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSB2LWVsc2Ugc3JjPVwifi9vdGhlcnMvbm9fc29ydGluZy5wbmdcIiB3aWR0aD1cIjQlXCIgcm93PVwiMFwiIGNvbD1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgPC92LXRlbXBsYXRlPlxuXG4gICAgICAgICAgICA8di10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiA6Y2xhc3M9XCJpdGVtLmlkID09IGl0ZW1TZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiY29udmVydERhdGUoaXRlbS5kYXRhKVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cIml0ZW0udW5pZGFkZV9jdXJyaWN1bGFyXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgY2xhc3M9XCJoclwiLz5cbiAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgPC92LXRlbXBsYXRlPlxuICAgICAgICA8L1JhZExpc3RWaWV3PlxuICAgIDwvU3RhY2tMYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6IFsnaXRlbVNlbGVjdGVkJ10sXG4gICAgICAgIGRhdGE6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbF9kYXRlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBmaW5hbF9kYXRlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VfdW5pdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nob29sX3llYXI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHNlbWVzdGVyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VfeWVhcjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRlU29ydGluZzogXCJkZXNjXCIsXG4gICAgICAgICAgICAgICAgICAgIHVuaXRTb3J0aW5nOiBcIlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDp7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxfZGF0ZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZmluYWxfZGF0ZTogXCJcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xhc3NlczogW10sXG4gICAgICAgICAgICAgICAgbnVtYmVyUGFnZXM6IFwiXCIsXG4gICAgICAgICAgICAgICAgbnVtYmVySXRlbXNQYWdlOiAxMCxcbiAgICAgICAgICAgICAgICBwYWdlOiAxLFxuICAgICAgICAgICAgICAgIGZpZWxkczogWydEYXRhJywnVW5pZGFkZSddLFxuICAgICAgICAgICAgICAgIGZpbHRlclZpczogXCJjb2xsYXBzZWRcIixcbiAgICAgICAgICAgICAgICBkYXRlVmlzOiBcInZpc2libGVcIixcbiAgICAgICAgICAgICAgICBpbnRlcnZhbERhdGVWaXM6IFwiY29sbGFwc2VkXCIsXG4gICAgICAgICAgICAgICAgY2hvaWNlczogW1wiRGlhXCIsXCJJbnRlcnZhbG9cIl0sXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJbmRleDogMCxcbiAgICAgICAgICAgICAgICBmaWx0ZXJCdG5OYW1lOiBcIkZpbHRyYXJcIixcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0ZWQ6IDAsXG4gICAgICAgICAgICAgICAgc2Nob29sX3llYXJfbGlzdDogW10sXG4gICAgICAgICAgICAgICAgc2VtZXN0ZXJfbGlzdDogWzEsMl0sXG4gICAgICAgICAgICAgICAgY291cnNlX3llYXJfbGlzdDogW10sXG4gICAgICAgICAgICAgICAgY2xlYXJEcm9wOntcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRfc2Nob29sX3llYXI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkX3NlbWVzdGVyOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZF9jb3Vyc2VfeWVhcjogbnVsbFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnVzeTogZmFsc2UsXG4gICAgICAgICAgICAgICAgYnVzeVRleHQ6IFwiXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBvbkNsYXNzVGFwKGV2ZW50KXtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuXG4gICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmZvcm1hw6fDo28gLSBBdWxhXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiXFxuRGF0YTogXCIrdGhpcy5jb252ZXJ0RGF0ZShldmVudC5pdGVtLmRhdGEpK1wiXFxuXFxuVW5pZGFkZSBDdXJyaWN1bGFyOiBcIitldmVudC5pdGVtLnVuaWRhZGVfY3VycmljdWxhcitcIlxcblxcblByb2Zlc3NvcihhKTogXCIrZXZlbnQuaXRlbS5wcm9mZXNzb3IrXCJcXG5cXG5Bbm8gTGV0aXZvOiBcIitldmVudC5pdGVtLmFub0xldGl2bytcIlxcblxcblNlbWVzdHJlOiBcIitldmVudC5pdGVtLnNlbWVzdHJlK1wiXFxuXFxuQW5vIGRvIEN1cnNvOiBcIitldmVudC5pdGVtLmFub0N1cnNvLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiRmVjaGFyXCJcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3NlZUNsYXNzaWZpY2F0aW9ucycsZXZlbnQuaXRlbSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlsdGVyQ2xhc3Nlcygpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyVmlzID0gKHRoaXMuZmlsdGVyVmlzID09IFwiY29sbGFwc2VkXCIgPyBcInZpc2libGVcIiA6IFwiY29sbGFwc2VkXCIpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZmlsdGVyVmlzID09IFwiY29sbGFwc2VkXCIpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnaW5pdGlhbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2ZpbmFsX2RhdGUnXSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkWydpbml0aWFsX2RhdGUnXSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkWydmaW5hbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2NvdXJzZV91bml0J10gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3NjaG9vbF95ZWFyJ10gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckRyb3BbJ3NlbGVjdGVkX3NjaG9vbF95ZWFyJ10gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnc2VtZXN0ZXInXSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRHJvcFsnc2VsZWN0ZWRfc2VtZXN0ZXInXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWydjb3Vyc2VfeWVhciddID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJEcm9wWydzZWxlY3RlZF9jb3Vyc2VfeWVhciddID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJCdG5OYW1lID0gXCJGaWx0cmFyXCI7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnRuTmFtZSA9IFwiRGVzYXRpdmFyIEZpbHRyb3NcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcm9wRG93blNlbGVjdGVkSW5kZXhDaGFuZ2VkKGV2ZW50KXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnaW5pdGlhbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnZmluYWxfZGF0ZSddID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFsnaW5pdGlhbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkWydmaW5hbF9kYXRlJ10gPSAnJztcbiAgICAgICAgICAgICAgICBpZihldmVudC5uZXdJbmRleCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbERhdGVWaXMgPSBcImNvbGxhcHNlZFwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVWaXMgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVmlzID0gXCJjb2xsYXBzZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbERhdGVWaXMgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gZXZlbnQubmV3SW5kZXg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbkRhdGUoZGF0ZSl7XG4gICAgICAgICAgICAgICAgbGV0IHBpY2tlciA9IG5ldyB0aGlzLiRzdG9yZS5zdGF0ZS5tb2RhbFBpY2tlcigpO1xuXG4gICAgICAgICAgICAgICAgcGlja2VyLnBpY2tEYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU2VsZWNpb25lIHVtYSBkYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lOiBcImxpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgIG1heERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0aW5nRGF0ZTogbmV3IERhdGUoKHRoaXMuc2VsZWN0ZWRbZGF0ZV0ubGVuZ3RoID09IDAgPyBuZXcgRGF0ZSgpIDogdGhpcy5zZWxlY3RlZFtkYXRlXSkpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcltkYXRlXSA9IHJlc3VsdC5kYXkgKyBcIi1cIiArIHJlc3VsdC5tb250aCArIFwiLVwiICsgcmVzdWx0LnllYXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkW2RhdGVdID0gcmVzdWx0LnllYXIgKyBcIi1cIiArIHJlc3VsdC5tb250aCArIFwiLVwiICsgcmVzdWx0LmRheTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXIoZmlsdGVyKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcltmaWx0ZXJdID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFtmaWx0ZXJdID0gJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJJbmRleChmaWx0ZXIpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyW2ZpbHRlcl0gPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRHJvcFsnc2VsZWN0ZWRfJytmaWx0ZXJdID0gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFuZ2VTaG9vbFllYXIoZXZlbnQpe1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50Lm5ld0luZGV4ID09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnc2Nob29sX3llYXInXSA9ICcnO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnc2Nob29sX3llYXInXSA9IHRoaXMuc2Nob29sX3llYXJfbGlzdFtldmVudC5uZXdJbmRleF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJEcm9wWydzZWxlY3RlZF9zY2hvb2xfeWVhciddID0gZXZlbnQubmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVNlbWVzdGVyKGV2ZW50KXtcbiAgICAgICAgICAgICAgICBpZihldmVudC5uZXdJbmRleCA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3NlbWVzdGVyJ10gPSAnJztcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWydzZW1lc3RlciddID0gdGhpcy5zZW1lc3Rlcl9saXN0W2V2ZW50Lm5ld0luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckRyb3BbJ3NlbGVjdGVkX3NlbWVzdGVyJ10gPSBldmVudC5uZXdJbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlQ291cnNlWWVhcihldmVudCl7XG4gICAgICAgICAgICAgICAgaWYoZXZlbnQubmV3SW5kZXggPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWydjb3Vyc2VfeWVhciddID0gJyc7XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnY291cnNlX3llYXInXSA9IHRoaXMuY291cnNlX3llYXJfbGlzdFtldmVudC5uZXdJbmRleF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJEcm9wWydzZWxlY3RlZF9jb3Vyc2VfeWVhciddID0gZXZlbnQubmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVNvcnRpbmdEYXRlKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3VuaXRTb3J0aW5nJ10gPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclsnZGF0ZVNvcnRpbmcnXSA9IHRoaXMuZmlsdGVyWydkYXRlU29ydGluZyddID09ICdkZXNjJyA/ICdhc2MnIDogJ2Rlc2MnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVNvcnRpbmdVbml0KCl7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3VuaXRTb3J0aW5nJ10gPSB0aGlzLmZpbHRlclsndW5pdFNvcnRpbmcnXSA9PSAnYXNjJyA/ICdkZXNjJyA6ICdhc2MnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyWydkYXRlU29ydGluZyddID0gJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udmVydERhdGUoZGF0ZSl7XG4gICAgICAgICAgICAgICAgbGV0IG9iakRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG9iakRhdGUuZ2V0RGF0ZSgpIDwgMTAgPyBcIjBcIitvYmpEYXRlLmdldERhdGUoKSA6IG9iakRhdGUuZ2V0RGF0ZSgpKSArIFwiLVwiICsgKChvYmpEYXRlLmdldE1vbnRoKCkgKyAxKSA8IDEwID8gXCIwXCIrKG9iakRhdGUuZ2V0TW9udGgoKSArIDEpIDogKG9iakRhdGUuZ2V0TW9udGgoKSArIDEpKSArIFwiLVwiICsgb2JqRGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQmFja0V2ZW50IChkYXRhKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5jYW5jZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2JhY2snKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRIb29rKCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy4kc3RvcmUuc3RhdGUuaXNBbmRyb2lkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZC5vbih0aGlzLiRzdG9yZS5zdGF0ZS5hbmRyb2lkQXBwLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5vbkJhY2tFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFySG9vaygpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmFuZHJvaWQub2ZmKHRoaXMuJHN0b3JlLnN0YXRlLmFuZHJvaWRBcHAuYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLm9uQmFja0V2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Mb2FkTW9yZUl0ZW1zUmVxdWVzdGVkKCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYWdlID09IHRoaXMubnVtYmVyUGFnZXMpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmxpc3RfY2xhc3Nlcy5uYXRpdmVWaWV3Lm5vdGlmeUFwcGVuZEl0ZW1zT25EZW1hbmRGaW5pc2hlZCgwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMubGlzdF9jbGFzc2VzLm5hdGl2ZVZpZXcubG9hZE9uRGVtYW5kTW9kZSA9IFwiTm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlKys7XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFyaWFibGVzID0gJ3BhZ2U9JyArIHRoaXMucGFnZSArICcmdWM9JyArIHRoaXMuZmlsdGVyLmNvdXJzZV91bml0ICsgJyZkYXRhST0nICsgdGhpcy5zZWxlY3RlZC5pbml0aWFsX2RhdGUgKyAnJmRhdGFGPScgKyB0aGlzLnNlbGVjdGVkLmZpbmFsX2RhdGUgKyAnJmFub0xldGl2bz0nICsgdGhpcy5maWx0ZXIuc2Nob29sX3llYXIgKyAnJnNlbWVzdHJlPScgKyB0aGlzLmZpbHRlci5zZW1lc3RlciArICcmYW5vPScgKyB0aGlzLmZpbHRlci5jb3Vyc2VfeWVhciArICcmZGF0YVM9JyArIHRoaXMuZmlsdGVyLmRhdGVTb3J0aW5nICsgJyZ1Y1M9JyArIHRoaXMuZmlsdGVyLnVuaXRTb3J0aW5nO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvYWx1bm8vXCIrdGhpcy4kc3RvcmUuc3RhdGUudXNlci5pZCtcIi9hdWxhcy9hbnRlcmlvcmVzP1wiICsgdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLmRhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3Nlcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmxpc3RfY2xhc3Nlcy5uYXRpdmVWaWV3Lm5vdGlmeUFwcGVuZEl0ZW1zT25EZW1hbmRGaW5pc2hlZCgwLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5wYWdlID09IHRoaXMubnVtYmVyUGFnZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5saXN0X2NsYXNzZXMubmF0aXZlVmlldy5sb2FkT25EZW1hbmRNb2RlID0gXCJOb25lXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWZyZXNoVGFibGUoKXtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1TZWxlY3RlZCA9IDA7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkSW5kZXggPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuZmluYWxfZGF0ZSA9IHRoaXMuc2VsZWN0ZWQuaW5pdGlhbF9kYXRlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCB2YXJpYWJsZXMgPSAndWM9JyArIHRoaXMuZmlsdGVyLmNvdXJzZV91bml0ICsgJyZkYXRhST0nICsgdGhpcy5zZWxlY3RlZC5pbml0aWFsX2RhdGUgKyAnJmRhdGFGPScgKyB0aGlzLnNlbGVjdGVkLmZpbmFsX2RhdGUgKyAnJmFub0xldGl2bz0nICsgdGhpcy5maWx0ZXIuc2Nob29sX3llYXIgKyAnJnNlbWVzdHJlPScgKyB0aGlzLmZpbHRlci5zZW1lc3RlciArICcmYW5vPScgKyB0aGlzLmZpbHRlci5jb3Vyc2VfeWVhciArICcmZGF0YVM9JyArIHRoaXMuZmlsdGVyLmRhdGVTb3J0aW5nICsgJyZ1Y1M9JyArIHRoaXMuZmlsdGVyLnVuaXRTb3J0aW5nO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvYWx1bm8vXCIrdGhpcy4kc3RvcmUuc3RhdGUudXNlci5pZCtcIi9hdWxhcy9hbnRlcmlvcmVzP3BhZ2U9MSZcIiArIHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc2VzID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyUGFnZXMgPSBNYXRoLmNlaWwoKHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkudG90YWwvdGhpcy5udW1iZXJJdGVtc1BhZ2UpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5saXN0X2NsYXNzZXMubmF0aXZlVmlldy5sb2FkT25EZW1hbmRNb2RlID0gXCJBdXRvXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMubGlzdF9jbGFzc2VzLm5hdGl2ZVZpZXcubm90aWZ5UHVsbFRvUmVmcmVzaEZpbmlzaGVkKCk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLnNldEhvb2soKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJIb29rKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZWQoKXtcbiAgICAgICAgICAgIGlmKHRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5idXN5VGV4dCA9IFwiQSBjYXJyZWdhci4uLlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTQyLjkzLjE0Mi4yMDgvYXBpL2FsdW5vL1wiK3RoaXMuJHN0b3JlLnN0YXRlLnVzZXIuaWQrXCIvYXVsYXMvYW50ZXJpb3Jlcz9wYWdlPTEmZGF0YVM9ZGVzY1wiLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIlxuICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzZXMgPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLmRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJQYWdlcyA9IE1hdGguY2VpbCgocmVzcG9uc2UuY29udGVudC50b0pTT04oKS50b3RhbC90aGlzLm51bWJlckl0ZW1zUGFnZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZSA9IDE7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLmNsYXNzZXMubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkluZm9ybWHDp8Ojb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJOw6NvIHBhcnRpY2lwb3UgZW0gbmVuaHVtYSBhdWxhIHF1ZSBqw6EgdGVuaGEgdGVybWluYWRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdiYWNrJyk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovLzE0Mi45My4xNDIuMjA4L2FwaS9hbm9zTGV0aXZvc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaG9vbF95ZWFyX2xpc3QgPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovLzE0Mi45My4xNDIuMjA4L2FwaS9hbm9zQ3Vyc29zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291cnNlX3llYXJfbGlzdCA9IHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgICAgICAgZGVlcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLiRzdG9yZS5zdGF0ZS5pc0FuZHJvaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXN5VGV4dCA9IFwiQSBjYXJyZWdhci4uLlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXN5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVNlbGVjdGVkID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkSW5kZXggPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLmZpbmFsX2RhdGUgPSB0aGlzLnNlbGVjdGVkLmluaXRpYWxfZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YXJpYWJsZXMgPSAndWM9JyArIHRoaXMuZmlsdGVyLmNvdXJzZV91bml0ICsgJyZkYXRhST0nICsgdGhpcy5zZWxlY3RlZC5pbml0aWFsX2RhdGUgKyAnJmRhdGFGPScgKyB0aGlzLnNlbGVjdGVkLmZpbmFsX2RhdGUgKyAnJmFub0xldGl2bz0nICsgdGhpcy5maWx0ZXIuc2Nob29sX3llYXIgKyAnJnNlbWVzdHJlPScgKyB0aGlzLmZpbHRlci5zZW1lc3RlciArICcmYW5vPScgKyB0aGlzLmZpbHRlci5jb3Vyc2VfeWVhciArICcmZGF0YVM9JyArIHRoaXMuZmlsdGVyLmRhdGVTb3J0aW5nICsgJyZ1Y1M9JyArIHRoaXMuZmlsdGVyLnVuaXRTb3J0aW5nO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovLzE0Mi45My4xNDIuMjA4L2FwaS9hbHVuby9cIit0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLmlkK1wiL2F1bGFzL2FudGVyaW9yZXM/cGFnZT0xJlwiICsgdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLiRzdG9yZS5zdGF0ZS5pc0FuZHJvaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc2VzID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gLXRoaXMuJHJlZnMubGlzdF9jbGFzc2VzLm5hdGl2ZVZpZXcuZ2V0U2Nyb2xsT2Zmc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmxpc3RfY2xhc3Nlcy5uYXRpdmVWaWV3LnNjcm9sbFdpdGhBbW91bnQob2Zmc2V0LGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1iZXJQYWdlcyA9IE1hdGguY2VpbCgocmVzcG9uc2UuY29udGVudC50b0pTT04oKS50b3RhbC90aGlzLm51bWJlckl0ZW1zUGFnZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMubGlzdF9jbGFzc2VzLm5hdGl2ZVZpZXcubG9hZE9uRGVtYW5kTW9kZSA9IFwiQXV0b1wiO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbiAgICAubGlzdHtcbiAgICAgICAgbWFyZ2luLXRvcDogMiU7XG4gICAgfVxuICAgIEJ1dHRvbntcbiAgICAgICAgd2lkdGg6IDM1JTtcbiAgICAgICAgbWFyZ2luLXRvcDogMSU7XG4gICAgfVxuICAgIERyb3BEb3due1xuICAgICAgICBtYXJnaW4tbGVmdDogNSU7XG4gICAgfVxuICAgIC5zZWxlY3RlZHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzEyMzQ1NjtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgIH1cbiAgICAuaGVhZGVye1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICAgIDxTdGFja0xheW91dCBzdHlsZT1cImhvcml6LWFsaWduOiBjZW50ZXJcIj5cbiAgICAgICAgPEFjdGl2aXR5SW5kaWNhdG9yIDpidXN5PVwiYnVzeVwiIHYtaWY9XCJidXN5XCIvPlxuICAgICAgICA8TGFiZWwgdi1pZj1cImJ1c3lcIiA6dGV4dD1cImJ1c3lUZXh0XCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiLz5cbiAgICAgICAgPFJhZExpc3RWaWV3IHJlZj1cImxpc3RfY2xhc3NpZmljYXRpb25zXCIgZm9yPVwiY2xhc3NpZmljYXRpb24gaW4gY2xhc3NpZmljYXRpb25zXCIgQGl0ZW1UYXA9XCJvbkNsYXNzaWZpY2F0aW9uVGFwXCIgY2xhc3M9XCJsaXN0XCIgaGVpZ2h0PVwiODUlXCJcbiAgICAgICAgICAgICAgICAgICAgIGxvYWRPbkRlbWFuZE1vZGU9XCJBdXRvXCIgQGxvYWRNb3JlRGF0YVJlcXVlc3RlZD1cIm9uTG9hZE1vcmVJdGVtc1JlcXVlc3RlZFwiIGxvYWRPbkRlbWFuZEJ1ZmZlclNpemU9XCIyXCJcbiAgICAgICAgICAgICAgICAgICAgIHB1bGxUb1JlZnJlc2g9XCJ0cnVlXCIgQHB1bGxUb1JlZnJlc2hJbml0aWF0ZWQ9XCJyZWZyZXNoVGFibGVcIj5cbiAgICAgICAgICAgIDx2LXRlbXBsYXRlIG5hbWU9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDxHcmlkTGF5b3V0IHJvd3M9XCJhdXRvXCIgY29sdW1ucz1cIiosKlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgcm93cz1cImF1dG9cIiBjb2x1bW5zPVwiYXV0byxhdXRvXCIgcm93PVwiMFwiIGNvbD1cIjBcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJDb250ZcO6ZG9cIiBjbGFzcz1cImhlYWRlclwiIGZvbnRTaXplPVwiMTVcIiByb3c9XCIwXCIgY29sPVwiMFwiIEB0YXA9XCJjaGFuZ2VTb3J0aW5nQ29udGVudFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugdi1pZj1cInNvcnRpbmdDbGFzc2lmaWNhdGlvbnNbJ2NvbnRlbnRTb3J0aW5nJ10gPT0gJ2Rlc2MnXCIgc3JjPVwifi9vdGhlcnMvZGVzYy5wbmdcIiB3aWR0aD1cIjUlXCIgcm93PVwiMFwiIGNvbD1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtZWxzZS1pZj1cInNvcnRpbmdDbGFzc2lmaWNhdGlvbnNbJ2NvbnRlbnRTb3J0aW5nJ10gPT0gJ2FzYydcIiBzcmM9XCJ+L290aGVycy9hc2MucG5nXCIgd2lkdGg9XCI1JVwiICByb3c9XCIwXCIgY29sPVwiMVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugdi1lbHNlIHNyYz1cIn4vb3RoZXJzL25vX3NvcnRpbmcucG5nXCIgd2lkdGg9XCI1JVwiIHJvdz1cIjBcIiBjb2w9XCIxXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgcm93cz1cImF1dG9cIiBjb2x1bW5zPVwiYXV0byxhdXRvXCIgcm93PVwiMFwiIGNvbD1cIjFcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJDbGFzc2lmaWNhw6fDo29cIiBjbGFzcz1cImhlYWRlclwiIGZvbnRTaXplPVwiMTVcIiByb3c9XCIwXCIgY29sPVwiMFwiIEB0YXA9XCJjaGFuZ2VTb3J0aW5nQ2xhc3NpZmljYXRpb25cIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHYtaWY9XCJzb3J0aW5nQ2xhc3NpZmljYXRpb25zWydjbGFzc2lmaWNhdGlvblNvcnRpbmcnXSA9PSAnZGVzYydcIiBzcmM9XCJ+L290aGVycy9kZXNjLnBuZ1wiIHdpZHRoPVwiNSVcIiByb3c9XCIwXCIgY29sPVwiMVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugdi1lbHNlLWlmPVwic29ydGluZ0NsYXNzaWZpY2F0aW9uc1snY2xhc3NpZmljYXRpb25Tb3J0aW5nJ10gPT0gJ2FzYydcIiBzcmM9XCJ+L290aGVycy9hc2MucG5nXCIgd2lkdGg9XCI1JVwiICByb3c9XCIwXCIgY29sPVwiMVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugdi1lbHNlIHNyYz1cIn4vb3RoZXJzL25vX3NvcnRpbmcucG5nXCIgd2lkdGg9XCI1JVwiIHJvdz1cIjBcIiBjb2w9XCIxXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgIDwvdi10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDx2LXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDxTdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIDpjbGFzcz1cImNsYXNzaWZpY2F0aW9uLmlkID09IGl0ZW1TZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiY2xhc3NpZmljYXRpb24uY29udGV1ZG9cIiB3aWR0aD1cIjc1JVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cIihjbGFzc2lmaWNhdGlvbi52YWxvciA9PSBudWxsID8gJ04vRCcgOiBjbGFzc2lmaWNhdGlvbi52YWxvcilcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBjbGFzcz1cImhyXCI+PC9TdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgPC92LXRlbXBsYXRlPlxuICAgICAgICA8L1JhZExpc3RWaWV3PlxuXG4gICAgICAgIDxCdXR0b24gdGV4dD1cIlZlciBsaXN0YSBkZSBhdWxhc1wiIHdpZHRoPVwiNTAlXCIgZm9udFNpemU9XCIxNVwiIHZlcnRpY2FsQWxpZ25tZW50PVwiYm90dG9tXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIEB0YXA9XCJjaG9vc2VDbGFzc1wiLz5cbiAgICA8L1N0YWNrTGF5b3V0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOiBbJ2NsYXNzU2VsZWN0ZWQnXSxcbiAgICAgICAgZGF0YTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJue1xuICAgICAgICAgICAgICAgIGNsYXNzaWZpY2F0aW9uczogW10sXG4gICAgICAgICAgICAgICAgc29ydGluZ0NsYXNzaWZpY2F0aW9uczp7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRTb3J0aW5nOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc2lmaWNhdGlvblNvcnRpbmc6XCJcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdGVkOiAwLFxuICAgICAgICAgICAgICAgIG51bWJlclBhZ2VzOiBcIlwiLFxuICAgICAgICAgICAgICAgIG51bWJlckl0ZW1zUGFnZTogMTAsXG4gICAgICAgICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgICAgICAgICBidXN5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBidXN5VGV4dDogXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOntcbiAgICAgICAgICAgIG9uQ2xhc3NpZmljYXRpb25UYXAoZXZlbnQpe1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVNlbGVjdGVkID0gZXZlbnQuaXRlbS5pZDtcblxuICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMubGlzdF9jbGFzc2lmaWNhdGlvbnMubmF0aXZlVmlldy5yZWZyZXNoKCk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2goZXZlbnQuaXRlbS50aXBvKXtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZXhwbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5pdGVtLnRpcG8gPSAnRXhlcmPDrWNpbyBQcsOhdGljby1MYWJvcmF0b3JpYWwnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2V4dCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5pdGVtLnRpcG8gPSAnRXhlcmPDrWNpbyBUZcOzcmljbyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5pdGVtLnRpcG8gPSAnVGXDs3JpY28nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50Lml0ZW0udGlwbyA9ICdQcsOhdGljby1MYWJvcmF0b3JpYWwnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmZvcm1hw6fDo28gLSBDb250ZcO6ZG9cIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJcXG5Db250ZcO6ZG86IFwiK2V2ZW50Lml0ZW0uY29udGV1ZG8rXCJcXG5cXG5UZW1hOiBcIitldmVudC5pdGVtLnRlbWErXCJcXG5cXG5UaXBvOiBcIitldmVudC5pdGVtLnRpcG8rXCJcXG5cXG5EZXNjacOnw6NvOiBcIisoZXZlbnQuaXRlbS5kZXNjcmljYW8gPT0gbnVsbCA/IFwiVmF6aWFcIiA6IGV2ZW50Lml0ZW0uZGVzY3JpY2FvKStcIlxcblxcbkNsYXNzaWZpY2HDp8OjbzogXCIrKGV2ZW50Lml0ZW0udmFsb3IgPT0gbnVsbCA/IFwiTi9EXCIgOiBldmVudC5pdGVtLnZhbG9yKSxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkZlY2hhclwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlU29ydGluZ0NvbnRlbnQoKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRpbmdDbGFzc2lmaWNhdGlvbnNbJ2NvbnRlbnRTb3J0aW5nJ10gPSB0aGlzLnNvcnRpbmdDbGFzc2lmaWNhdGlvbnNbJ2NvbnRlbnRTb3J0aW5nJ10gPT0gJ2FzYycgPyAnZGVzYycgOiAnYXNjJztcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRpbmdDbGFzc2lmaWNhdGlvbnNbJ2NsYXNzaWZpY2F0aW9uU29ydGluZyddID0gJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlU29ydGluZ0NsYXNzaWZpY2F0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0aW5nQ2xhc3NpZmljYXRpb25zWydjbGFzc2lmaWNhdGlvblNvcnRpbmcnXSA9IHRoaXMuc29ydGluZ0NsYXNzaWZpY2F0aW9uc1snY2xhc3NpZmljYXRpb25Tb3J0aW5nJ10gPT0gJ2Rlc2MnID8gJ2FzYycgOiAnZGVzYyc7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0aW5nQ2xhc3NpZmljYXRpb25zWydjb250ZW50U29ydGluZyddID0gJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hvb3NlQ2xhc3MoKXtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdiYWNrJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25CYWNrRXZlbnQgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnYmFjaycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEhvb2soKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLiRzdG9yZS5zdGF0ZS5pc0FuZHJvaWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5hbmRyb2lkLm9uKHRoaXMuJHN0b3JlLnN0YXRlLmFuZHJvaWRBcHAuYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLm9uQmFja0V2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJIb29rKCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy4kc3RvcmUuc3RhdGUuaXNBbmRyb2lkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZC5vZmYodGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZEFwcC5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMub25CYWNrRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkxvYWRNb3JlSXRlbXNSZXF1ZXN0ZWQoKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhZ2UgPT0gdGhpcy5udW1iZXJQYWdlcyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMubGlzdF9jbGFzc2lmaWNhdGlvbnMubmF0aXZlVmlldy5ub3RpZnlBcHBlbmRJdGVtc09uRGVtYW5kRmluaXNoZWQoMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmxpc3RfY2xhc3NpZmljYXRpb25zLm5hdGl2ZVZpZXcubG9hZE9uRGVtYW5kTW9kZSA9IFwiTm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlKys7XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFyaWFibGVzID0gJ3BhZ2U9JyArIHRoaXMucGFnZSArICcmY29udGV1ZG9TPScgKyB0aGlzLnNvcnRpbmdDbGFzc2lmaWNhdGlvbnMuY29udGVudFNvcnRpbmcgKyAnJmNsYXNzaWZpY2FjYW9TPScgKyB0aGlzLnNvcnRpbmdDbGFzc2lmaWNhdGlvbnMuY2xhc3NpZmljYXRpb25Tb3J0aW5nO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvYXVsYS9cIit0aGlzLmNsYXNzU2VsZWN0ZWQuaWQrXCIvYWx1bm8vXCIrdGhpcy4kc3RvcmUuc3RhdGUudXNlci5pZCtcIi9jbGFzc2lmaWNhY29lcy90b3RhbD9cIiArIHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29udGVudC50b0pTT04oKS5kYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzaWZpY2F0aW9ucy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmxpc3RfY2xhc3NpZmljYXRpb25zLm5hdGl2ZVZpZXcubm90aWZ5QXBwZW5kSXRlbXNPbkRlbWFuZEZpbmlzaGVkKDAsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnBhZ2UgPT0gdGhpcy5udW1iZXJQYWdlcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmxpc3RfY2xhc3NpZmljYXRpb25zLm5hdGl2ZVZpZXcubG9hZE9uRGVtYW5kTW9kZSA9IFwiTm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVmcmVzaFRhYmxlKCl7XG4gICAgICAgICAgICAgICAgbGV0IHZhcmlhYmxlcyA9ICdjb250ZXVkb1M9JyArIHRoaXMuc29ydGluZ0NsYXNzaWZpY2F0aW9ucy5jb250ZW50U29ydGluZyArICcmY2xhc3NpZmljYWNhb1M9JyArIHRoaXMuc29ydGluZ0NsYXNzaWZpY2F0aW9ucy5jbGFzc2lmaWNhdGlvblNvcnRpbmc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovLzE0Mi45My4xNDIuMjA4L2FwaS9hdWxhL1wiK3RoaXMuY2xhc3NTZWxlY3RlZC5pZCtcIi9hbHVuby9cIit0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLmlkK1wiL2NsYXNzaWZpY2Fjb2VzL3RvdGFsP3BhZ2U9MSZcIiArIHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc2lmaWNhdGlvbnMgPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1iZXJQYWdlcyA9IE1hdGguY2VpbCgocmVzcG9uc2UuY29udGVudC50b0pTT04oKS50b3RhbC90aGlzLm51bWJlckl0ZW1zUGFnZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmxpc3RfY2xhc3NpZmljYXRpb25zLm5hdGl2ZVZpZXcubG9hZE9uRGVtYW5kTW9kZSA9IFwiQXV0b1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmxpc3RfY2xhc3NpZmljYXRpb25zLm5hdGl2ZVZpZXcubm90aWZ5UHVsbFRvUmVmcmVzaEZpbmlzaGVkKCk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLnNldEhvb2soKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJIb29rKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZWQoKXtcbiAgICAgICAgICAgIGlmKHRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5idXN5VGV4dCA9IFwiQSBjYXJyZWdhci4uLlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTQyLjkzLjE0Mi4yMDgvYXBpL2F1bGEvXCIrdGhpcy5jbGFzc1NlbGVjdGVkLmlkK1wiL2FsdW5vL1wiK3RoaXMuJHN0b3JlLnN0YXRlLnVzZXIuaWQrXCIvY2xhc3NpZmljYWNvZXMvdG90YWxcIixcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCJcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc2lmaWNhdGlvbnMgPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLmRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJQYWdlcyA9IE1hdGguY2VpbCgocmVzcG9uc2UuY29udGVudC50b0pTT04oKS50b3RhbC90aGlzLm51bWJlckl0ZW1zUGFnZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZSA9IDE7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLmNsYXNzaWZpY2F0aW9ucy5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSW5mb3JtYcOnw6NvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkEgYXVsYSBuw6NvIHRlbSBjb250ZcO6ZG9zIGFzc29jaWFkb3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2JhY2snKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICBzb3J0aW5nQ2xhc3NpZmljYXRpb25zOiB7XG4gICAgICAgICAgICAgICAgZGVlcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFyaWFibGVzID0gJ2NvbnRldWRvUz0nICsgdGhpcy5zb3J0aW5nQ2xhc3NpZmljYXRpb25zLmNvbnRlbnRTb3J0aW5nICsgJyZjbGFzc2lmaWNhY2FvUz0nICsgdGhpcy5zb3J0aW5nQ2xhc3NpZmljYXRpb25zLmNsYXNzaWZpY2F0aW9uU29ydGluZztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvYXVsYS9cIit0aGlzLmNsYXNzU2VsZWN0ZWQuaWQrXCIvYWx1bm8vXCIrdGhpcy4kc3RvcmUuc3RhdGUudXNlci5pZCtcIi9jbGFzc2lmaWNhY29lcy90b3RhbD9wYWdlPTEmXCIgKyB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NpZmljYXRpb25zID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gLXRoaXMuJHJlZnMubGlzdF9jbGFzc2lmaWNhdGlvbnMubmF0aXZlVmlldy5nZXRTY3JvbGxPZmZzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMubGlzdF9jbGFzc2lmaWNhdGlvbnMubmF0aXZlVmlldy5zY3JvbGxXaXRoQW1vdW50KG9mZnNldCxmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyUGFnZXMgPSBNYXRoLmNlaWwoKHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkudG90YWwvdGhpcy5udW1iZXJJdGVtc1BhZ2UpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmxpc3RfY2xhc3NpZmljYXRpb25zLm5hdGl2ZVZpZXcubG9hZE9uRGVtYW5kTW9kZSA9IFwiQXV0b1wiO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbiAgICAubGlzdHtcbiAgICAgICAgbWFyZ2luLXRvcDogNSU7XG4gICAgfVxuICAgIC5zZWxlY3RlZHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzEyMzQ1NjtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgIH1cbiAgICAuaGVhZGVye1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICAgIDxHcmlkTGF5b3V0IHJvd3M9XCIqXCIgY29sdW1ucz1cIipcIiBoZWlnaHQ9XCIxMDAlXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIHZlcnRpY2FsQWxpZ25tZW50PVwiY2VudGVyXCI+XG4gICAgICAgIDxTdGFja0xheW91dCByb3c9XCIwXCIgY29sPVwiMFwiIHdpZHRoPVwiOTAlXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJ0b3BcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCI+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKlwiIHJvd3M9XCJhdXRvLGF1dG9cIj5cbiAgICAgICAgICAgICAgICA8QWN0aXZpdHlJbmRpY2F0b3IgOmJ1c3k9XCJidXN5XCIgdi1pZj1cImJ1c3lcIiByb3c9XCIwXCIgY29sPVwiMFwiLz5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdi1pZj1cImJ1c3lcIiA6dGV4dD1cImJ1c3lUZXh0XCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIHJvdz1cIjFcIiBjb2w9XCIwXCIvPlxuICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICAgICAgPExhYmVsIHRleHQ9XCIqIENhbXBvcyBvYnJpZ2F0w7NyaW9zXCIgc3R5bGU9XCJjb2xvcjogcmVkOyBtYXJnaW4tdG9wOiAxJVwiLz5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqXCIgcm93cz1cImF1dG8sYXV0b1wiIHN0eWxlPVwibWFyZ2luLXRvcDogMSVcIj5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIlByb2Zlc3NvcihhKVwiIGZvbnRTaXplPVwiMTVcIi8+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCB2LW1vZGVsPVwidGVhY2hlcl9uYW1lXCIgZWRpdGFibGU9XCJmYWxzZVwiIGZvbnRTaXplPVwiMTVcIiByb3c9XCIxXCIgY29sPVwiMFwiLz5cbiAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqXCIgcm93cz1cImF1dG8sYXV0b1wiPlxuICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiByb3c9XCIwXCIgY29sPVwiMFwiPlxuICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIkRhdGFcIiBmb250U2l6ZT1cIjE1XCIvPlxuICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIiAqXCIgZm9udFNpemU9XCIxNVwiIHN0eWxlPVwiY29sb3I6IHJlZFwiLz5cbiAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgdi1tb2RlbD1cImRhdGVcIiBoaW50PVwiRGF0YVwiIGVkaXRhYmxlPVwiZmFsc2VcIiBAdGFwPVwib3BlbkRhdGUoKVwiIGZvbnRTaXplPVwiMTVcIiByb3c9XCIxXCIgY29sPVwiMFwiLz5cbiAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqXCIgcm93cz1cImF1dG8sYXV0b1wiPlxuICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiByb3c9XCIwXCIgY29sPVwiMFwiPlxuICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIkhvcmEgZGUgaW7DrWNpb1wiIGZvbnRTaXplPVwiMTVcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0PVwiICpcIiBmb250U2l6ZT1cIjE1XCIgc3R5bGU9XCJjb2xvcjogcmVkXCIvPlxuICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCB2LW1vZGVsPVwiaG91clwiIGhpbnQ9XCJIb3JhIGRlIGluw61jaW9cIiBlZGl0YWJsZT1cImZhbHNlXCIgQHRhcD1cIm9wZW5UaW1lKClcIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMVwiIGNvbD1cIjBcIi8+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKlwiIHJvd3M9XCJhdXRvLGF1dG9cIj5cbiAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCIgcm93PVwiMFwiIGNvbD1cIjBcIj5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJBc3N1bnRvXCIgZm9udFNpemU9XCIxNVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCIgKlwiIGZvbnRTaXplPVwiMTVcIiBzdHlsZT1cImNvbG9yOiByZWRcIi8+XG4gICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHYtbW9kZWw9XCJzdWJqZWN0XCIgaGludD1cIkFzc3VudG9cIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMVwiIGNvbD1cIjBcIi8+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKlwiIHJvd3M9XCJhdXRvLGF1dG9cIj5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIkRlc2NyacOnw6NvXCIgZm9udFNpemU9XCIxNVwiIHJvdz1cIjBcIiBjb2w9XCIwXCIvPlxuICAgICAgICAgICAgICAgIDxUZXh0VmlldyB2LW1vZGVsPVwiZGVzY3JpcHRpb25cIiBoaW50PVwiRGVzY3Jpw6fDo29cIiBmb250U2l6ZT1cIjE1XCIgcm93PVwiMVwiIGNvbD1cIjBcIi8+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKlwiIHJvd3M9XCJhdXRvLGF1dG9cIj5cbiAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCIgcm93PVwiMFwiIGNvbD1cIjBcIj5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJVbmlkYWRlIEN1cnJpY3VsYXJcIiBmb250U2l6ZT1cIjE1XCIvPlxuICAgICAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIiAqXCIgZm9udFNpemU9XCIxNVwiIHN0eWxlPVwiY29sb3I6IHJlZFwiLz5cbiAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgIDxEcm9wRG93biA6aXRlbXM9XCJjb3Vyc2VfdW5pdHNfbmFtZVwiIGhpbnQ9XCJVbmlkYWRlIEN1cnJpY3VsYXJcIiBzdHlsZT1cImZvbnQtc2l6ZTogMTVweDsgbWFyZ2luLXRvcDogMiU7IG1hcmdpbi1sZWZ0OiA1JVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ9XCJsZWZ0XCIgQHNlbGVjdGVkSW5kZXhDaGFuZ2VkPVwiY2hhbmdlVW5pdFwiIHJvdz1cIjFcIiBjb2w9XCIwXCIvPlxuICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqLCpcIiByb3dzPVwiYXV0b1wiIHZlcnRpY2FsQWxpZ25tZW50PVwiYm90dG9tXCIgcm93PVwiMFwiIGNvbD1cIjBcIj5cbiAgICAgICAgICAgIDxCdXR0b24gdGV4dD1cIkVzY29saGVyIG91dHJvIHByb2Zlc3NvclwiIHdpZHRoPVwiNDUlXCIgZm9udFNpemU9XCIxNVwiIGNvbD1cIjBcIiByb3c9XCIwXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJib3R0b21cIiBob3Jpem9udGFsQWxpZ25tZW50PVwibGVmdFwiIEB0YXA9XCJjaG9vc2VUZWFjaGVyXCIvPlxuICAgICAgICAgICAgPEJ1dHRvbiB0ZXh0PVwiTWFyY2FyIFR1dG9yaWFcIiB3aWR0aD1cIjQ1JVwiIGZvbnRTaXplPVwiMTVcIiBjb2w9XCIxXCIgcm93PVwiMFwiIHZlcnRpY2FsQWxpZ25tZW50PVwiYm90dG9tXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cInJpZ2h0XCIgQHRhcD1cInJlZ2lzdGVyXCIvPlxuICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgPC9HcmlkTGF5b3V0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOiBbJ3RlYWNoZXJfaWQnLCdjb3Vyc2VfdW5pdHMnLCd0ZWFjaGVyX25hbWUnXSxcbiAgICAgICAgZGF0YTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJue1xuICAgICAgICAgICAgICAgIGRhdGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgaG91cjogXCJcIixcbiAgICAgICAgICAgICAgICBzdWJqZWN0OiBcIlwiLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgICAgIGNvdXJzZV91bml0c19uYW1lOiBbXSxcbiAgICAgICAgICAgICAgICBjb3Vyc2VfdW5pdF9zZWxlY3RlZDogXCJcIixcbiAgICAgICAgICAgICAgICBjb3Vyc2VfdW5pdF9pZDogXCJcIixcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZTogXCJcIixcbiAgICAgICAgICAgICAgICBjdXJyZW50SG91cjogXCJcIixcbiAgICAgICAgICAgICAgICBidXN5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBidXN5VGV4dDogXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOntcbiAgICAgICAgICAgIGNoZWNrVmFsaWRUaW1lKCl7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudERhdGUuZGF5ID09IGN1cnJlbnRUaW1lLmdldERhdGUoKSAmJiB0aGlzLmN1cnJlbnREYXRlLm1vbnRoID09IChjdXJyZW50VGltZS5nZXRNb250aCgpKzEpICYmIHRoaXMuY3VycmVudERhdGUueWVhciA9PSBjdXJyZW50VGltZS5nZXRGdWxsWWVhcigpKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50SG91ciAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudEhvdXIuaG91ciA9PSBjdXJyZW50VGltZS5nZXRIb3VycygpICYmIHRoaXMuY3VycmVudEhvdXIubWludXRlIDw9IGN1cnJlbnRUaW1lLmdldE1pbnV0ZXMoKSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuY3VycmVudEhvdXIuaG91ciA8IGN1cnJlbnRUaW1lLmdldEhvdXJzKCkpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcGVuRGF0ZSgpe1xuICAgICAgICAgICAgICAgIGxldCBwaWNrZXIgPSBuZXcgdGhpcy4kc3RvcmUuc3RhdGUubW9kYWxQaWNrZXIoKTtcblxuICAgICAgICAgICAgICAgIHBpY2tlci5waWNrRGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNlbGVjaW9uZSB1bWEgZGF0YVwiLFxuICAgICAgICAgICAgICAgICAgICB0aGVtZTogXCJsaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgICBzdGFydGluZ0RhdGU6IG5ldyBEYXRlKCh0aGlzLmN1cnJlbnREYXRlLmxlbmd0aCA9PSAwID8gbmV3IERhdGUoKSA6IHRoaXMuY3VycmVudERhdGUueWVhciArIFwiLVwiICsgdGhpcy5jdXJyZW50RGF0ZS5tb250aCArIFwiLVwiICsgdGhpcy5jdXJyZW50RGF0ZS5kYXkpKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IChyZXN1bHQuZGF5IDwgMTAgPyBcIjBcIityZXN1bHQuZGF5IDogcmVzdWx0LmRheSkgKyBcIi1cIiArIChyZXN1bHQubW9udGggPCAxMCA/IFwiMFwiK3Jlc3VsdC5tb250aCA6IHJlc3VsdC5tb250aCkgKyBcIi1cIiArIHJlc3VsdC55ZWFyO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLmNoZWNrVmFsaWRUaW1lKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG91ciA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2VsZWNpb25lIHVtYSBkYXRhL2hvcmEgc3VwZXJpb3Igw6AgYXR1YWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlblRpbWUoKXtcbiAgICAgICAgICAgICAgICBsZXQgcGlja2VyID0gbmV3IHRoaXMuJHN0b3JlLnN0YXRlLm1vZGFsUGlja2VyKCk7XG5cbiAgICAgICAgICAgICAgICBwaWNrZXIucGlja1RpbWUoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTZWxlY2lvbmUgdW1hIGhvcmFcIixcbiAgICAgICAgICAgICAgICAgICAgdGhlbWU6IFwibGlnaHRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jaGVja1ZhbGlkVGltZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3VyID0gKHJlc3VsdC5ob3VyIDwgMTAgPyBcIjBcIityZXN1bHQuaG91ciA6IHJlc3VsdC5ob3VyKSArIChyZXN1bHQubWludXRlIDwgMTAgPyBcIjowXCIgOiBcIjpcIikgKyByZXN1bHQubWludXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3VyID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJTZWxlY2lvbmUgdW1hIGRhdGEvaG9yYSBzdXBlcmlvciDDoCBhdHVhbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaG9vc2VUZWFjaGVyKCl7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnYmFja1RlYWNoZXJzJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlVW5pdChldmVudCl7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VfdW5pdF9pZCA9IHRoaXMuY291cnNlX3VuaXRzW2V2ZW50Lm5ld0luZGV4XS5pZDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZV91bml0X3NlbGVjdGVkID0gdGhpcy5jb3Vyc2VfdW5pdHNfbmFtZVtldmVudC5uZXdJbmRleF07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVnaXN0ZXIoKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRlYWNoZXJfaWQgPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJTZWxlY2lvbmUgdW0gcHJvZmVzc29yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmRhdGUubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2VsZWNpb25lIGEgZGF0YSBlbSBxdWUgYSB0dXRvcmlhIHZhaSBkZWNvcnJlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5ob3VyLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlNlbGVjaW9uZSBhIGhvcmEgZW0gcXVlIGEgdHV0b3JpYSB2YWkgZGVjb3JyZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuc3ViamVjdC5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJJbnNpcmEgbyBhc3N1bnRvIGRhIHR1dG9yaWFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuY291cnNlX3VuaXRfc2VsZWN0ZWQubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlNlbGVjaW9uZSBhIHVuaWRhZGUgY3VycmljdWxhciBhIHF1ZSBhIHR1dG9yaWEgdmFpIGVzdGFyIGFzc29jaWFkYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoIXRoaXMuY2hlY2tWYWxpZFRpbWUoKSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvdXIgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlNlbGVjaW9uZSB1bWEgZGF0YS9ob3JhIHN1cGVyaW9yIMOgIGF0dWFsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXN5VGV4dCA9IFwiQSBtYXJjYXIgdHV0b3JpYS4uLlwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c3kgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvdHV0b3JpYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9mZXNzb3JfaWQ6IHRoaXMudGVhY2hlcl9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmN1cnJlbnREYXRlLnllYXIgKyBcIi1cIiArIHRoaXMuY3VycmVudERhdGUubW9udGggKyBcIi1cIiArIHRoaXMuY3VycmVudERhdGUuZGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvcmE6IHRoaXMuaG91cixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3N1bnRvOiB0aGlzLnN1YmplY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpY2FvOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjX2lkOiB0aGlzLmNvdXJzZV91bml0X2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdW5vX2lkOiB0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09IDQwNCB8fCByZXNwb25zZS5zdGF0dXNDb2RlID09IDQwMCl7ICAgLy9FUlJPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkubXNnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSAyMDApeyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ09SUkVVIEJFTVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSW5mb3JtYcOnw6NvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTWFyY2HDp8OjbyBkYSB0dXRvcmlhIGVmZXR1YWRhIGNvbSBzdWNlc3NvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnYmFja1RlYWNoZXJzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQmFja0V2ZW50IChkYXRhKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5jYW5jZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2JhY2tUZWFjaGVycycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEhvb2soKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLiRzdG9yZS5zdGF0ZS5pc0FuZHJvaWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5hbmRyb2lkLm9uKHRoaXMuJHN0b3JlLnN0YXRlLmFuZHJvaWRBcHAuYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLm9uQmFja0V2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJIb29rKCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy4kc3RvcmUuc3RhdGUuaXNBbmRyb2lkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZC5vZmYodGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZEFwcC5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMub25CYWNrRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SG9vaygpO1xuICAgICAgICB9LFxuICAgICAgICBiZWZvcmVEZXN0cm95KCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckhvb2soKTtcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlZCgpe1xuICAgICAgICAgICAgdGhpcy5jb3Vyc2VfdW5pdHMuZm9yRWFjaCh1bml0ID0+IHRoaXMuY291cnNlX3VuaXRzX25hbWUucHVzaCh1bml0Lm5vbWUpKTtcbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gICAgPFN0YWNrTGF5b3V0PlxuICAgICAgICA8TGFiZWwgdGV4dD1cIlNlbGVjaW9uZSBvIHByb2Zlc3NvcihhKSBjb20gcXVlIGRlc2VqYSBtYXJjYXIgdW1hIHR1dG9yaWFcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCIgZm9udFNpemU9XCIxM1wiIHN0eWxlPVwibWFyZ2luLXRvcDogNSU7IG1hcmdpbi1ib3R0b206IDUlXCIvPlxuICAgICAgICA8QWN0aXZpdHlJbmRpY2F0b3IgOmJ1c3k9XCJidXN5XCIgdi1pZj1cImJ1c3lcIi8+XG4gICAgICAgIDxMYWJlbCB2LWlmPVwiYnVzeVwiIDp0ZXh0PVwiYnVzeVRleHRcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCIvPlxuICAgICAgICA8UmFkTGlzdFZpZXcgcmVmPVwibGlzdF90ZWFjaGVyc1wiIGZvcj1cInRlYWNoZXIgaW4gdGVhY2hlcnNcIiBoZWlnaHQ9XCIxMDAlXCIgQGl0ZW1UYXA9XCJvblRlYWNoZXJUYXBcIlxuICAgICAgICAgICAgICAgICAgICAgbG9hZE9uRGVtYW5kTW9kZT1cIkF1dG9cIiBAbG9hZE1vcmVEYXRhUmVxdWVzdGVkPVwib25Mb2FkTW9yZUl0ZW1zUmVxdWVzdGVkXCIgbG9hZE9uRGVtYW5kQnVmZmVyU2l6ZT1cIjJcIlxuICAgICAgICAgICAgICAgICAgICAgcHVsbFRvUmVmcmVzaD1cInRydWVcIiBAcHVsbFRvUmVmcmVzaEluaXRpYXRlZD1cInJlZnJlc2hUYWJsZVwiPlxuICAgICAgICAgICAgPHYtdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IG9yaWVudGF0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwidGVhY2hlci5wcm9mZXNzb3Jfbm9tZVwiIGNsYXNzPVwibmFtZVwiIGZvbnRTaXplPVwiMTVcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgIHYtZm9yPVwidWMgaW4gdGVhY2hlci51Y3NcIiA6a2V5PVwidWMuaWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cInVjLm5vbWVcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwidWMuYW5vTGV0aXZvXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cInVjLnNlbWVzdHJlICsgJ8K6IFNlbWVzdHJlJ1wiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBjbGFzcz1cImhyXCI+PC9TdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgPC92LXRlbXBsYXRlPlxuICAgICAgICA8L1JhZExpc3RWaWV3PlxuICAgIDwvU3RhY2tMYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJue1xuICAgICAgICAgICAgICAgIHRlYWNoZXJzOiBbXSxcbiAgICAgICAgICAgICAgICBudW1iZXJQYWdlczogXCJcIixcbiAgICAgICAgICAgICAgICBudW1iZXJJdGVtc1BhZ2U6IDEwLFxuICAgICAgICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgYnVzeTogZmFsc2UsXG4gICAgICAgICAgICAgICAgYnVzeVRleHQ6IFwiXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBvblRlYWNoZXJUYXAoZXZlbnQpe1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3JlZ2lzdGVyVHV0b3JpbmcnLGV2ZW50Lml0ZW0ucHJvZmVzc29yX2lkLGV2ZW50Lml0ZW0udWNzLGV2ZW50Lml0ZW0ucHJvZmVzc29yX25vbWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQmFja0V2ZW50IChkYXRhKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5jYW5jZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2JhY2snKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRIb29rKCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy4kc3RvcmUuc3RhdGUuaXNBbmRyb2lkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuYW5kcm9pZC5vbih0aGlzLiRzdG9yZS5zdGF0ZS5hbmRyb2lkQXBwLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5vbkJhY2tFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFySG9vaygpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmFuZHJvaWQub2ZmKHRoaXMuJHN0b3JlLnN0YXRlLmFuZHJvaWRBcHAuYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLm9uQmFja0V2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Mb2FkTW9yZUl0ZW1zUmVxdWVzdGVkKCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYWdlID09IHRoaXMubnVtYmVyUGFnZXMpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmxpc3RfdGVhY2hlcnMubmF0aXZlVmlldy5ub3RpZnlBcHBlbmRJdGVtc09uRGVtYW5kRmluaXNoZWQoMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmxpc3RfdGVhY2hlcnMubmF0aXZlVmlldy5sb2FkT25EZW1hbmRNb2RlID0gXCJOb25lXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UrKztcblxuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTQyLjkzLjE0Mi4yMDgvYXBpL2FsdW5vL1wiK3RoaXMuJHN0b3JlLnN0YXRlLnVzZXIuaWQrXCIvcHJvZmVzc29yZXM/cGFnZT1cIiArIHRoaXMucGFnZSxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29udGVudC50b0pTT04oKS5kYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlYWNoZXJzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMubGlzdF90ZWFjaGVycy5uYXRpdmVWaWV3Lm5vdGlmeUFwcGVuZEl0ZW1zT25EZW1hbmRGaW5pc2hlZCgwLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5wYWdlID09IHRoaXMubnVtYmVyUGFnZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5saXN0X3RlYWNoZXJzLm5hdGl2ZVZpZXcubG9hZE9uRGVtYW5kTW9kZSA9IFwiTm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVmcmVzaFRhYmxlKCl7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xNDIuOTMuMTQyLjIwOC9hcGkvYWx1bm8vXCIrdGhpcy4kc3RvcmUuc3RhdGUudXNlci5pZCtcIi9wcm9mZXNzb3Jlcz9wYWdlPTFcIixcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWFjaGVycyA9IHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1iZXJQYWdlcyA9IE1hdGguY2VpbCgocmVzcG9uc2UuY29udGVudC50b0pTT04oKS50b3RhbC90aGlzLm51bWJlckl0ZW1zUGFnZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMubGlzdF90ZWFjaGVycy5uYXRpdmVWaWV3LmxvYWRPbkRlbWFuZE1vZGUgPSBcIkF1dG9cIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5saXN0X3RlYWNoZXJzLm5hdGl2ZVZpZXcubm90aWZ5UHVsbFRvUmVmcmVzaEZpbmlzaGVkKCk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLnNldEhvb2soKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJIb29rKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZWQoKXtcbiAgICAgICAgICAgIGlmKHRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5idXN5VGV4dCA9IFwiQSBjYXJyZWdhci4uLlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5zdGF0ZS5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTQyLjkzLjE0Mi4yMDgvYXBpL2FsdW5vL1wiK3RoaXMuJHN0b3JlLnN0YXRlLnVzZXIuaWQrXCIvcHJvZmVzc29yZXM/cGFnZT0xXCIsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudGVhY2hlcnMgPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpLmRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJQYWdlcyA9IE1hdGguY2VpbCgocmVzcG9uc2UuY29udGVudC50b0pTT04oKS50b3RhbC90aGlzLm51bWJlckl0ZW1zUGFnZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZSA9IDE7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLnRlYWNoZXJzLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmZvcm1hw6fDo29cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTsOjbyBlc3TDoSBpbmNyaXRvIGVtIG5lbmh1bWEgdW5pZGFkZSBjdXJyaWN1bGFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdiYWNrJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuICAgIC5uYW1le1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG48L3N0eWxlPlxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uaGVhZGVyLWVsZW1bZGF0YS12LTRkYWI4NDA4XXtcXG4gICAgY29sb3I6IHdoaXRlO1xcbn1cXG4uYXJyb3ctcmlnaHRbZGF0YS12LTRkYWI4NDA4XXtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyJTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMiU7XFxufVxcbi5hcnJvdy1sZWZ0W2RhdGEtdi00ZGFiODQwOF17XFxuICAgIG1hcmdpbi1sZWZ0OiAyJTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMiU7XFxufVxcbi5oYXZlX2NsYXNzaWZpY2F0aW9uW2RhdGEtdi00ZGFiODQwOF17XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG5cbiAgICBjb25zdCBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCIpO1xuICAgIHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7XG5cbiAgICBpZiAodHlwZW9mIGV4cG9ydHMuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGV4cG9ydHMuZm9yRWFjaChjc3NFeHBvcnQgPT4ge1xuICAgICAgICAgICAgaWYgKGNzc0V4cG9ydC5sZW5ndGggPiAxICYmIGNzc0V4cG9ydFsxXSkge1xuICAgICAgICAgICAgICAgIC8vIGFwcGx5aW5nIHRoZSBzZWNvbmQgaXRlbSBvZiB0aGUgZXhwb3J0IGFzIGl0IGNvbnRhaW5zIHRoZSBjc3MgY29udGVudHNcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbi5hZGRDc3MoY3NzRXhwb3J0WzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuO1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2NvbXBvbmVudHMvY2xhc3NQYWdlLnZ1ZScgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIl0pO1xuXG5cbiAgICBjb25zdCBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCIpO1xuICAgIHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7XG5cbiAgICBpZiAodHlwZW9mIGV4cG9ydHMuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGV4cG9ydHMuZm9yRWFjaChjc3NFeHBvcnQgPT4ge1xuICAgICAgICAgICAgaWYgKGNzc0V4cG9ydC5sZW5ndGggPiAxICYmIGNzc0V4cG9ydFsxXSkge1xuICAgICAgICAgICAgICAgIC8vIGFwcGx5aW5nIHRoZSBzZWNvbmQgaXRlbSBvZiB0aGUgZXhwb3J0IGFzIGl0IGNvbnRhaW5zIHRoZSBjc3MgY29udGVudHNcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbi5hZGRDc3MoY3NzRXhwb3J0WzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuO1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2NvbXBvbmVudHMvZWRpdFR1dG9yaWFsLnZ1ZScgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIl0pO1xuXG5cbiAgICBjb25zdCBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCIpO1xuICAgIHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7XG5cbiAgICBpZiAodHlwZW9mIGV4cG9ydHMuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGV4cG9ydHMuZm9yRWFjaChjc3NFeHBvcnQgPT4ge1xuICAgICAgICAgICAgaWYgKGNzc0V4cG9ydC5sZW5ndGggPiAxICYmIGNzc0V4cG9ydFsxXSkge1xuICAgICAgICAgICAgICAgIC8vIGFwcGx5aW5nIHRoZSBzZWNvbmQgaXRlbSBvZiB0aGUgZXhwb3J0IGFzIGl0IGNvbnRhaW5zIHRoZSBjc3MgY29udGVudHNcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbi5hZGRDc3MoY3NzRXhwb3J0WzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuO1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2NvbXBvbmVudHMvaW5pdGlhbFBhZ2UudnVlJyB9KTtcbiAgICAgICAgfSlcbiAgICB9XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5oZWFkZXJbZGF0YS12LTdiZjMzNTJjXXtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbkJ1dHRvbltkYXRhLXYtN2JmMzM1MmNde1xcbiAgICB3aWR0aDogMzUlO1xcbiAgICBtYXJnaW4tdG9wOiAxJTtcXG59XFxuRHJvcERvd25bZGF0YS12LTdiZjMzNTJjXXtcXG4gICAgbWFyZ2luLWxlZnQ6IDUlO1xcbn1cXG4uc2VsZWN0ZWRbZGF0YS12LTdiZjMzNTJjXXtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzEyMzQ1NjtcXG4gICAgY29sb3I6IHdoaXRlO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG5cbiAgICBjb25zdCBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCIpO1xuICAgIHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7XG5cbiAgICBpZiAodHlwZW9mIGV4cG9ydHMuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGV4cG9ydHMuZm9yRWFjaChjc3NFeHBvcnQgPT4ge1xuICAgICAgICAgICAgaWYgKGNzc0V4cG9ydC5sZW5ndGggPiAxICYmIGNzc0V4cG9ydFsxXSkge1xuICAgICAgICAgICAgICAgIC8vIGFwcGx5aW5nIHRoZSBzZWNvbmQgaXRlbSBvZiB0aGUgZXhwb3J0IGFzIGl0IGNvbnRhaW5zIHRoZSBjc3MgY29udGVudHNcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbi5hZGRDc3MoY3NzRXhwb3J0WzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuO1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2NvbXBvbmVudHMvbGlzdEFyY2hpdmVkVHV0b3JpYWxzLnZ1ZScgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uaGVhZGVyW2RhdGEtdi0wMTdjODVhOF17XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5CdXR0b25bZGF0YS12LTAxN2M4NWE4XXtcXG4gICAgd2lkdGg6IDM1JTtcXG4gICAgbWFyZ2luLXRvcDogMSU7XFxufVxcbkRyb3BEb3duW2RhdGEtdi0wMTdjODVhOF17XFxuICAgIG1hcmdpbi1sZWZ0OiA1JTtcXG59XFxuLnNlbGVjdGVkW2RhdGEtdi0wMTdjODVhOF17XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxMjM0NTY7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG59XFxuXCIsIFwiXCJdKTtcblxuXG4gICAgY29uc3QgYXBwbGljYXRpb24gPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiKTtcbiAgICByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zdHlsaW5nL3N0eWxlLXNjb3BlXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBleHBvcnRzLmZvckVhY2ggPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBleHBvcnRzLmZvckVhY2goY3NzRXhwb3J0ID0+IHtcbiAgICAgICAgICAgIGlmIChjc3NFeHBvcnQubGVuZ3RoID4gMSAmJiBjc3NFeHBvcnRbMV0pIHtcbiAgICAgICAgICAgICAgICAvLyBhcHBseWluZyB0aGUgc2Vjb25kIGl0ZW0gb2YgdGhlIGV4cG9ydCBhcyBpdCBjb250YWlucyB0aGUgY3NzIGNvbnRlbnRzXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb24uYWRkQ3NzKGNzc0V4cG9ydFsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbjtcbiAgICBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuICAgICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoKCkgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmhtclJlZnJlc2goeyB0eXBlOiAnc3R5bGUnLCBwYXRoOiAnLi9jb21wb25lbnRzL2xpc3RUdXRvcmlhbHMudnVlJyB9KTtcbiAgICAgICAgfSlcbiAgICB9XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi50aXRsZVtkYXRhLXYtNjAwMjAyZWRde1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMCU7XFxufVxcbi5pdGVtW2RhdGEtdi02MDAyMDJlZF17XFxuICAgIG1hcmdpbjogMSU7XFxufVxcblwiLCBcIlwiXSk7XG5cblxuICAgIGNvbnN0IGFwcGxpY2F0aW9uID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIik7XG4gICAgcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc3R5bGluZy9zdHlsZS1zY29wZVwiKTtcblxuICAgIGlmICh0eXBlb2YgZXhwb3J0cy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZXhwb3J0cy5mb3JFYWNoKGNzc0V4cG9ydCA9PiB7XG4gICAgICAgICAgICBpZiAoY3NzRXhwb3J0Lmxlbmd0aCA+IDEgJiYgY3NzRXhwb3J0WzFdKSB7XG4gICAgICAgICAgICAgICAgLy8gYXBwbHlpbmcgdGhlIHNlY29uZCBpdGVtIG9mIHRoZSBleHBvcnQgYXMgaXQgY29udGFpbnMgdGhlIGNzcyBjb250ZW50c1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLmFkZENzcyhjc3NFeHBvcnRbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG47XG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5obXJSZWZyZXNoKHsgdHlwZTogJ3N0eWxlJywgcGF0aDogJy4vY29tcG9uZW50cy9sb2dpblBhZ2UudnVlJyB9KTtcbiAgICAgICAgfSlcbiAgICB9XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5oZWFkZXItZWxlbVtkYXRhLXYtNmZmODE4MjNde1xcbiAgICBjb2xvcjp3aGl0ZTtcXG59XFxuLmNlbnRlci1pdGVtW2RhdGEtdi02ZmY4MTgyM117XFxuICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XFxuICAgIGhvcml6LWFsaWduOiBjZW50ZXI7XFxuICAgIHdpZHRoOjg1JTtcXG59XFxuXCIsIFwiXCJdKTtcblxuXG4gICAgY29uc3QgYXBwbGljYXRpb24gPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiKTtcbiAgICByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zdHlsaW5nL3N0eWxlLXNjb3BlXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBleHBvcnRzLmZvckVhY2ggPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBleHBvcnRzLmZvckVhY2goY3NzRXhwb3J0ID0+IHtcbiAgICAgICAgICAgIGlmIChjc3NFeHBvcnQubGVuZ3RoID4gMSAmJiBjc3NFeHBvcnRbMV0pIHtcbiAgICAgICAgICAgICAgICAvLyBhcHBseWluZyB0aGUgc2Vjb25kIGl0ZW0gb2YgdGhlIGV4cG9ydCBhcyBpdCBjb250YWlucyB0aGUgY3NzIGNvbnRlbnRzXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb24uYWRkQ3NzKGNzc0V4cG9ydFsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbjtcbiAgICBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuICAgICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoKCkgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmhtclJlZnJlc2goeyB0eXBlOiAnc3R5bGUnLCBwYXRoOiAnLi9jb21wb25lbnRzL21haW5QYWdlLnZ1ZScgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4ubGlzdFtkYXRhLXYtMWJjNGYzMWFde1xcbiAgICBtYXJnaW4tdG9wOiAyJTtcXG59XFxuQnV0dG9uW2RhdGEtdi0xYmM0ZjMxYV17XFxuICAgIHdpZHRoOiAzNSU7XFxuICAgIG1hcmdpbi10b3A6IDElO1xcbn1cXG5Ecm9wRG93bltkYXRhLXYtMWJjNGYzMWFde1xcbiAgICBtYXJnaW4tbGVmdDogNSU7XFxufVxcbi5zZWxlY3RlZFtkYXRhLXYtMWJjNGYzMWFde1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTIzNDU2O1xcbiAgICBjb2xvcjogd2hpdGU7XFxufVxcbi5oZWFkZXJbZGF0YS12LTFiYzRmMzFhXXtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblwiLCBcIlwiXSk7XG5cblxuICAgIGNvbnN0IGFwcGxpY2F0aW9uID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIik7XG4gICAgcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc3R5bGluZy9zdHlsZS1zY29wZVwiKTtcblxuICAgIGlmICh0eXBlb2YgZXhwb3J0cy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZXhwb3J0cy5mb3JFYWNoKGNzc0V4cG9ydCA9PiB7XG4gICAgICAgICAgICBpZiAoY3NzRXhwb3J0Lmxlbmd0aCA+IDEgJiYgY3NzRXhwb3J0WzFdKSB7XG4gICAgICAgICAgICAgICAgLy8gYXBwbHlpbmcgdGhlIHNlY29uZCBpdGVtIG9mIHRoZSBleHBvcnQgYXMgaXQgY29udGFpbnMgdGhlIGNzcyBjb250ZW50c1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLmFkZENzcyhjc3NFeHBvcnRbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG47XG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5obXJSZWZyZXNoKHsgdHlwZTogJ3N0eWxlJywgcGF0aDogJy4vY29tcG9uZW50cy9wcmV2aW91c0NsYXNzZXNQYWdlLnZ1ZScgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4ubGlzdFtkYXRhLXYtYTUwNmNhY2Nde1xcbiAgICBtYXJnaW4tdG9wOiA1JTtcXG59XFxuLnNlbGVjdGVkW2RhdGEtdi1hNTA2Y2FjY117XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxMjM0NTY7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG59XFxuLmhlYWRlcltkYXRhLXYtYTUwNmNhY2Nde1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXCIsIFwiXCJdKTtcblxuXG4gICAgY29uc3QgYXBwbGljYXRpb24gPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiKTtcbiAgICByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zdHlsaW5nL3N0eWxlLXNjb3BlXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBleHBvcnRzLmZvckVhY2ggPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBleHBvcnRzLmZvckVhY2goY3NzRXhwb3J0ID0+IHtcbiAgICAgICAgICAgIGlmIChjc3NFeHBvcnQubGVuZ3RoID4gMSAmJiBjc3NFeHBvcnRbMV0pIHtcbiAgICAgICAgICAgICAgICAvLyBhcHBseWluZyB0aGUgc2Vjb25kIGl0ZW0gb2YgdGhlIGV4cG9ydCBhcyBpdCBjb250YWlucyB0aGUgY3NzIGNvbnRlbnRzXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb24uYWRkQ3NzKGNzc0V4cG9ydFsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbjtcbiAgICBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuICAgICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoKCkgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmhtclJlZnJlc2goeyB0eXBlOiAnc3R5bGUnLCBwYXRoOiAnLi9jb21wb25lbnRzL3ByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZS52dWUnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCJdKTtcblxuXG4gICAgY29uc3QgYXBwbGljYXRpb24gPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiKTtcbiAgICByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zdHlsaW5nL3N0eWxlLXNjb3BlXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBleHBvcnRzLmZvckVhY2ggPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBleHBvcnRzLmZvckVhY2goY3NzRXhwb3J0ID0+IHtcbiAgICAgICAgICAgIGlmIChjc3NFeHBvcnQubGVuZ3RoID4gMSAmJiBjc3NFeHBvcnRbMV0pIHtcbiAgICAgICAgICAgICAgICAvLyBhcHBseWluZyB0aGUgc2Vjb25kIGl0ZW0gb2YgdGhlIGV4cG9ydCBhcyBpdCBjb250YWlucyB0aGUgY3NzIGNvbnRlbnRzXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb24uYWRkQ3NzKGNzc0V4cG9ydFsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbjtcbiAgICBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuICAgICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoKCkgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmhtclJlZnJlc2goeyB0eXBlOiAnc3R5bGUnLCBwYXRoOiAnLi9jb21wb25lbnRzL3JlZ2lzdGVyVHV0b3JpbmcudnVlJyB9KTtcbiAgICAgICAgfSlcbiAgICB9XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5uYW1lW2RhdGEtdi00MDM3MzQ1ZV17XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG5cbiAgICBjb25zdCBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCIpO1xuICAgIHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7XG5cbiAgICBpZiAodHlwZW9mIGV4cG9ydHMuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGV4cG9ydHMuZm9yRWFjaChjc3NFeHBvcnQgPT4ge1xuICAgICAgICAgICAgaWYgKGNzc0V4cG9ydC5sZW5ndGggPiAxICYmIGNzc0V4cG9ydFsxXSkge1xuICAgICAgICAgICAgICAgIC8vIGFwcGx5aW5nIHRoZSBzZWNvbmQgaXRlbSBvZiB0aGUgZXhwb3J0IGFzIGl0IGNvbnRhaW5zIHRoZSBjc3MgY29udGVudHNcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbi5hZGRDc3MoY3NzRXhwb3J0WzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuO1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2NvbXBvbmVudHMvc2NoZWR1bGVUdXRvcmluZy52dWUnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJQYWdlXCIsXG4gICAgeyBhdHRyczogeyBhY3Rpb25CYXJIaWRkZW46IFwidHJ1ZVwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJSYWRTaWRlRHJhd2VyXCIsXG4gICAgICAgIHtcbiAgICAgICAgICByZWY6IFwiZHJhd2VyQ29udGVudFwiLFxuICAgICAgICAgIGF0dHJzOiB7IGRyYXdlckxvY2F0aW9uOiBcIkxlZnRcIiwgZ2VzdHVyZXNFbmFibGVkOiBcInRydWVcIiB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmlld1wiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZpZXc6ZHJhd2VyQ29udGVudFwiLFxuICAgICAgICAgICAgICAgICAgYXJnOiBcImRyYXdlckNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgIG1vZGlmaWVyczoge31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm50LWRyYXdlcl9faGVhZGVyXCIgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibnQtZHJhd2VyX19oZWFkZXItaW1hZ2UgZmFzIHQtMzZcIixcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgY29sb3I6IFwid2hpdGVcIiB9LFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBcInNyYy5kZWNvZGVcIjogXCJmb250Oi8vJiN4ZjJiZDtcIiB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJoZWFkZXItZWxlbVwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBfdm0ubmFtZSB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJoZWFkZXItZWxlbVwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBfdm0uZW1haWwgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJTY3JvbGxWaWV3XCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJudC1kcmF3ZXJfX2JvZHlcIiB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0uY29udGVudHMsIGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBjb250ZW50LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJudC1kcmF3ZXJfX2xpc3QtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFwiKlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZWxlY3RlZENvbnRlbnQubm9tZSA9PT0gY29udGVudC5ub21lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCIjZTBmNWZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIndoaXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2VsZWN0ZWRDb250ZW50Lm5vbWUgPT09IGNvbnRlbnQubm9tZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiIzAwODhjOVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub25OYXZpZ2F0aW9uSXRlbVRhcChjb250ZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IF92bS5jaGVja0NsYXNzaWZpY2F0aW9uKGNvbnRlbnQuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiaGF2ZV9jbGFzc2lmaWNhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5nZXRDb250ZW50Q2xhc3NpZmljYXRpb24oY29udGVudC5pZCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50Lm5vbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiRnJhbWVcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmlld1wiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZpZXc6bWFpbkNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgIGFyZzogXCJtYWluQ29udGVudFwiLFxuICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzOiB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJQYWdlXCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiQWN0aW9uQmFyXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBjb2xvcjogXCJ3aGl0ZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGl0bGU6IF92bS5jb3Vyc2VfdW5pdCB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IHRhcDogX3ZtLnNlZVRpdGxlIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFuZHJvaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIk5hdmlnYXRpb25CdXR0b25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBpY29uOiBcInJlczovL21lbnVcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyB0YXA6IF92bS5vcGVuTWVudSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFjdGlvbkl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgZm9udFdlaWdodDogXCJib2xkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU2FpclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcInJpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyB0YXA6IF92bS5leGl0IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpb3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkFjdGlvbkl0ZW1cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwicmVzOi8vbWVudVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW9zLnBvc2l0aW9uXCI6IFwibGVmdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IHRhcDogX3ZtLm9wZW5NZW51IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJBY3Rpb25JdGVtXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlNhaXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlvcy5wb3NpdGlvblwiOiBcInJpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgdGFwOiBfdm0uZXhpdCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogXCIqXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBcIipcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ6IFwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uYnVzeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJBY3Rpdml0eUluZGljYXRvclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGJ1c3k6IF92bS5idXN5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmJ1c3lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS5idXN5VGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcImNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogXCIqLGF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS5zZWxlY3RlZENvbnRlbnQubm9tZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjM1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzL2luZm8taWNvbi5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlY2g6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjglXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IHRhcDogX3ZtLnNob3dJbmZvIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IG1hcmdpblRvcDogXCI1JVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXZhbGllIGEgc3VhIGNvbXByZWVuc8OjbyBzb2JyZSBlc3RlIGNvbnRlw7pkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogXCI1JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMTUlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBcImF1dG8sYXV0byxhdXRvLGF1dG8sYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBcImF1dG8sYXV0b1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9zY2FsZS8xLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVjaDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIyMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub25DbGFzc0J1dHRvblRhcCgxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9zY2FsZS8yLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVjaDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIyMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub25DbGFzc0J1dHRvblRhcCgyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9zY2FsZS8zLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVjaDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIyMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub25DbGFzc0J1dHRvblRhcCgzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9zY2FsZS80LnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVjaDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIyMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub25DbGFzc0J1dHRvblRhcCg0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9zY2FsZS81LnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVjaDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIyMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub25DbGFzc0J1dHRvblRhcCg1KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9vdGhlcnMvMS5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlY2g6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIxMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2VsZWN0ZWRDbGFzcyA9PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJ2aXNpYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImNvbGxhcHNlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzLzIucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWNoOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTAlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdGVkQ2xhc3MgPT0gMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwidmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJjb2xsYXBzZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCJ+L290aGVycy8zLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVjaDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwJVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZWxlY3RlZENsYXNzID09IDNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcInZpc2libGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiY29sbGFwc2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9vdGhlcnMvNC5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlY2g6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIxMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2VsZWN0ZWRDbGFzcyA9PSA0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJ2aXNpYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImNvbGxhcHNlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzLzUucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWNoOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiNFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTAlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdGVkQ2xhc3MgPT0gNVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwidmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJjb2xsYXBzZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBcIiosKlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcImJvdHRvbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhcnJvdy1sZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCJ+L290aGVycy9sZWZ0LWFycm93LnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWNoOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjE1JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudDogXCJib3R0b21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogX3ZtLmFycm93TGVmdFZpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgdGFwOiBfdm0uc2VlUHJldmlvdXMgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYXJyb3ctcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzL3JpZ2h0LWFycm93LnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWNoOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjE1JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudDogXCJib3R0b21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwicmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IF92bS5hcnJvd1JpZ2h0VmlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyB0YXA6IF92bS5zZWVOZXh0IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiR3JpZExheW91dFwiLFxuICAgIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIHJvd3M6IFwiKlwiLFxuICAgICAgICBjb2x1bW5zOiBcIipcIixcbiAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ6IFwiY2VudGVyXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICB3aWR0aDogXCI5MCVcIixcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcInRvcFwiLFxuICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IGNvbHVtbnM6IFwiKlwiLCByb3dzOiBcImF1dG8sYXV0b1wiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX3ZtLmJ1c3lcbiAgICAgICAgICAgICAgICA/IF9jKFwiQWN0aXZpdHlJbmRpY2F0b3JcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBidXN5OiBfdm0uYnVzeSwgcm93OiBcIjBcIiwgY29sOiBcIjBcIiB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgIF92bS5idXN5XG4gICAgICAgICAgICAgICAgPyBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0uYnVzeVRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgbWFyZ2luVG9wOiBcIjIlXCIgfSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgY29sdW1uczogXCIqXCIsIHJvd3M6IFwiYXV0byxhdXRvXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwiUHJvZmVzc29yKGEpXCIsXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxNVwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGVkaXRhYmxlOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxNVwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjFcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0udHV0b3JpYWwucHJvZmVzc29yLm5vbWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kc2V0KFxuICAgICAgICAgICAgICAgICAgICAgIF92bS50dXRvcmlhbC5wcm9mZXNzb3IsXG4gICAgICAgICAgICAgICAgICAgICAgXCJub21lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sdW1uczogXCIqXCIsIHJvd3M6IFwiYXV0byxhdXRvXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBcIkRhdGFcIiwgZm9udFNpemU6IFwiMTVcIiwgcm93OiBcIjBcIiwgY29sOiBcIjBcIiB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiRGF0YVwiLFxuICAgICAgICAgICAgICAgICAgZWRpdGFibGU6IFwiZmFsc2VcIixcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE1XCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS50dXRvcmlhbC5kYXRhXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5vcGVuRGF0ZSgpXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgdGV4dENoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHNldChfdm0udHV0b3JpYWwsIFwiZGF0YVwiLCAkZXZlbnQudmFsdWUpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IGNvbHVtbnM6IFwiKlwiLCByb3dzOiBcImF1dG8sYXV0b1wiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwiSG9yYSBkZSBpbsOtY2lvXCIsXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxNVwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiSG9yYSBkZSBpbsOtY2lvXCIsXG4gICAgICAgICAgICAgICAgICBlZGl0YWJsZTogXCJmYWxzZVwiLFxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTVcIixcbiAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLnR1dG9yaWFsLmhvcmFJbmljaW9cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm9wZW5UaW1lKClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kc2V0KF92bS50dXRvcmlhbCwgXCJob3JhSW5pY2lvXCIsICRldmVudC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sdW1uczogXCIqXCIsIHJvd3M6IFwiYXV0byxhdXRvXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBcIkFzc3VudG9cIiwgZm9udFNpemU6IFwiMTVcIiwgcm93OiBcIjBcIiwgY29sOiBcIjBcIiB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiQXNzdW50b1wiLFxuICAgICAgICAgICAgICAgICAgZWRpdGFibGU6IFwiZmFsc2VcIixcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE1XCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS50dXRvcmlhbC5hc3N1bnRvXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGV4dENoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHNldChfdm0udHV0b3JpYWwsIFwiYXNzdW50b1wiLCAkZXZlbnQudmFsdWUpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IGNvbHVtbnM6IFwiKlwiLCByb3dzOiBcImF1dG8sYXV0b1wiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogXCJEZXNjcmnDp8Ojb1wiLCBmb250U2l6ZTogXCIxNVwiLCByb3c6IFwiMFwiLCBjb2w6IFwiMFwiIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiVGV4dFZpZXdcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBoaW50OiBcIkRlc2NyacOnw6NvXCIsXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxNVwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjFcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0udHV0b3JpYWwuZGVzY3JpY2FvXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGV4dENoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHNldChfdm0udHV0b3JpYWwsIFwiZGVzY3JpY2FvXCIsICRldmVudC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sdW1uczogXCIqXCIsIHJvd3M6IFwiYXV0byxhdXRvXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgdGV4dDogXCJVbmlkYWRlIEN1cnJpY3VsYXJcIixcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE1XCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiVGV4dEZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaGludDogXCJVbmlkYWRlIEN1cnJpY3VsYXJcIixcbiAgICAgICAgICAgICAgICAgIGVkaXRhYmxlOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxNVwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjFcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0udHV0b3JpYWwudW5pZGFkZV9jdXJyaWN1bGFyLm5vbWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kc2V0KFxuICAgICAgICAgICAgICAgICAgICAgIF92bS50dXRvcmlhbC51bmlkYWRlX2N1cnJpY3VsYXIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJub21lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF9jKFxuICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAge1xuICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICBjb2x1bW5zOiBcIiosKlwiLFxuICAgICAgICAgICAgcm93czogXCJhdXRvXCIsXG4gICAgICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudDogXCJib3R0b21cIixcbiAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICBjb2w6IFwiMFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJCdXR0b25cIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgdGV4dDogXCJWZXIgbGlzdGEgZGUgcGVkaWRvc1wiLFxuICAgICAgICAgICAgICB3aWR0aDogXCI0NSVcIixcbiAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTVcIixcbiAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ6IFwiYm90dG9tXCIsXG4gICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwibGVmdFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb246IHsgdGFwOiBfdm0uY2hvb3NlVHV0b3JpYWwgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF9jKFwiQnV0dG9uXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiRWRpdGFyIFBlZGlkb1wiLFxuICAgICAgICAgICAgICB3aWR0aDogXCI0NSVcIixcbiAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTVcIixcbiAgICAgICAgICAgICAgY29sOiBcIjFcIixcbiAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ6IFwiYm90dG9tXCIsXG4gICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwicmlnaHRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uOiB7IHRhcDogX3ZtLmVkaXRUdXRvcmlhbCB9XG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgW1xuICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgdGV4dDogXCJJbnNpcmEgbyBjw7NkaWdvIGRhIGF1bGFcIixcbiAgICAgICAgICB0ZXh0QWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgIGZvbnRTaXplOiBcIjE1XCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgaGludDogXCJDw7NkaWdvXCIsXG4gICAgICAgICAgZm9udFNpemU6IFwiMTVcIixcbiAgICAgICAgICBrZXlib2FyZFR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgdGV4dDogX3ZtLmNvZGVcbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgIF92bS5jb2RlID0gJGV2ZW50LnZhbHVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIF9jKFwiQnV0dG9uXCIsIHtcbiAgICAgICAgYXR0cnM6IHsgdGV4dDogXCJFbnRyYXJcIiwgZm9udFNpemU6IFwiMTVcIiB9LFxuICAgICAgICBvbjogeyB0YXA6IF92bS5lbnRlciB9XG4gICAgICB9KVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgeyBzdGF0aWNTdHlsZTogeyBob3JpekFsaWduOiBcImNlbnRlclwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHdpZHRoOiBcIjg1JVwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiQnV0dG9uXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IF92bS5maWx0ZXJCdG5OYW1lIH0sXG4gICAgICAgICAgICBvbjogeyB0YXA6IF92bS5maWx0ZXJUdXRvcmlhbHMgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogXCIqLGF1dG8sKixhdXRvXCIsXG4gICAgICAgICAgICAgICAgcm93czogXCJhdXRvLGF1dG8sYXV0b1wiLFxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IF92bS5maWx0ZXJWaXNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJEcm9wRG93blwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBfdm0uY2hvaWNlcyxcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJbmRleDogX3ZtLnNlbGVjdGVkSW5kZXhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7IHNlbGVjdGVkSW5kZXhDaGFuZ2VkOiBfdm0uZHJvcERvd25TZWxlY3RlZEluZGV4Q2hhbmdlZCB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiRGF0YVwiLFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBfdm0uZGF0ZVZpcyxcbiAgICAgICAgICAgICAgICAgIGVkaXRhYmxlOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0uZmlsdGVyW1wiaW5pdGlhbF9kYXRlXCJdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5vcGVuRGF0ZShcImluaXRpYWxfZGF0ZVwiKVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHRleHRDaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLiRzZXQoX3ZtLmZpbHRlciwgXCJpbml0aWFsX2RhdGVcIiwgJGV2ZW50LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiVGV4dEZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaGludDogXCJEYXRhIEluaWNpYWxcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogX3ZtLmludGVydmFsRGF0ZVZpcyxcbiAgICAgICAgICAgICAgICAgIGVkaXRhYmxlOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0uZmlsdGVyW1wiaW5pdGlhbF9kYXRlXCJdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5vcGVuRGF0ZShcImluaXRpYWxfZGF0ZVwiKVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHRleHRDaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLiRzZXQoX3ZtLmZpbHRlciwgXCJpbml0aWFsX2RhdGVcIiwgJGV2ZW50LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWljb24gZmFzXCIsXG4gICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgdmVydGljYWxBbGlnbjogXCJib3R0b21cIiB9LFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwidGV4dC5kZWNvZGVcIjogXCImI3hmMTJkO1wiLCBjb2w6IFwiMVwiLCByb3c6IFwiMVwiIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uY2xlYXIoXCJpbml0aWFsX2RhdGVcIilcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiRGF0YSBGaW5hbFwiLFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjJcIixcbiAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBfdm0uaW50ZXJ2YWxEYXRlVmlzLFxuICAgICAgICAgICAgICAgICAgZWRpdGFibGU6IFwiZmFsc2VcIixcbiAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS5maWx0ZXJbXCJmaW5hbF9kYXRlXCJdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5vcGVuRGF0ZShcImZpbmFsX2RhdGVcIilcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kc2V0KF92bS5maWx0ZXIsIFwiZmluYWxfZGF0ZVwiLCAkZXZlbnQudmFsdWUpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibnQtaWNvbiBmYXNcIixcbiAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB2ZXJ0aWNhbEFsaWduOiBcImJvdHRvbVwiIH0sXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIFwidGV4dC5kZWNvZGVcIjogXCImI3hmMTJkO1wiLFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjNcIixcbiAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBfdm0uaW50ZXJ2YWxEYXRlVmlzXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5jbGVhcihcImZpbmFsX2RhdGVcIilcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBcIiosYXV0b1wiLFxuICAgICAgICAgICAgICAgIHJvd3M6IFwiYXV0byxhdXRvLGF1dG8sYXV0b1wiLFxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IF92bS5maWx0ZXJWaXNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJUZXh0RmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBoaW50OiBcIkhvcmEgZGUgaW7DrWNpb1wiLFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICBlZGl0YWJsZTogXCJmYWxzZVwiLFxuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLmZpbHRlcltcImhvdXJcIl1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm9wZW5UaW1lKClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kc2V0KF92bS5maWx0ZXIsIFwiaG91clwiLCAkZXZlbnQudmFsdWUpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibnQtaWNvbiBmYXNcIixcbiAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB2ZXJ0aWNhbEFsaWduOiBcImJvdHRvbVwiIH0sXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJ0ZXh0LmRlY29kZVwiOiBcIiYjeGYxMmQ7XCIsIGNvbDogXCIxXCIsIHJvdzogXCIwXCIgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5jbGVhcihcImhvdXJcIilcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiUHJvZmVzc29yKGEpXCIsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjFcIixcbiAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS5maWx0ZXJbXCJ0ZWFjaGVyXCJdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGV4dENoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHNldChfdm0uZmlsdGVyLCBcInRlYWNoZXJcIiwgJGV2ZW50LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWljb24gZmFzXCIsXG4gICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgdmVydGljYWxBbGlnbjogXCJib3R0b21cIiB9LFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwidGV4dC5kZWNvZGVcIjogXCImI3hmMTJkO1wiLCBjb2w6IFwiMVwiLCByb3c6IFwiMVwiIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uY2xlYXIoXCJ0ZWFjaGVyXCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJUZXh0RmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBoaW50OiBcIkFzc3VudG9cIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMlwiLFxuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLmZpbHRlcltcInN1YmplY3RcIl1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kc2V0KF92bS5maWx0ZXIsIFwic3ViamVjdFwiLCAkZXZlbnQudmFsdWUpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibnQtaWNvbiBmYXNcIixcbiAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB2ZXJ0aWNhbEFsaWduOiBcImJvdHRvbVwiIH0sXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJ0ZXh0LmRlY29kZVwiOiBcIiYjeGYxMmQ7XCIsIGNvbDogXCIxXCIsIHJvdzogXCIyXCIgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5jbGVhcihcInN1YmplY3RcIilcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiVW5pZGFkZSBDdXJyaWN1bGFyXCIsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjNcIixcbiAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS5maWx0ZXJbXCJjb3Vyc2VfdW5pdFwiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRleHRDaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLiRzZXQoX3ZtLmZpbHRlciwgXCJjb3Vyc2VfdW5pdFwiLCAkZXZlbnQudmFsdWUpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibnQtaWNvbiBmYXNcIixcbiAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB2ZXJ0aWNhbEFsaWduOiBcImJvdHRvbVwiIH0sXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJ0ZXh0LmRlY29kZVwiOiBcIiYjeGYxMmQ7XCIsIGNvbDogXCIxXCIsIHJvdzogXCIzXCIgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5jbGVhcihcImNvdXJzZV91bml0XCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogXCIqLGF1dG8sKixhdXRvXCIsXG4gICAgICAgICAgICAgICAgcm93czogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogX3ZtLmZpbHRlclZpc1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcIkRyb3BEb3duXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaXRlbXM6IF92bS5yZXF1ZXN0X2Nob2ljZXMsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiUGVkaWRvXCIsXG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4OiBfdm0uY2xlYXJEcm9wLnNlbGVjdGVkX3JlcXVlc3RcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7IHNlbGVjdGVkSW5kZXhDaGFuZ2VkOiBfdm0uY2hhbmdlUmVxdWVzdCB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJudC1pY29uIGZhc1wiLFxuICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHZlcnRpY2FsQWxpZ246IFwiYm90dG9tXCIgfSxcbiAgICAgICAgICAgICAgICBhdHRyczogeyBcInRleHQuZGVjb2RlXCI6IFwiJiN4ZjEyZDtcIiwgY29sOiBcIjFcIiwgcm93OiBcIjBcIiB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmNsZWFySW5kZXgoXCJyZXF1ZXN0XCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJEcm9wRG93blwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBfdm0uc3RhdGVfY2hvaWNlcyxcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIyXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgaGludDogXCJFc3RhZG9cIixcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5kZXg6IF92bS5jbGVhckRyb3Auc2VsZWN0ZWRfc3RhdGVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7IHNlbGVjdGVkSW5kZXhDaGFuZ2VkOiBfdm0uY2hhbmdlU3RhdGUgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibnQtaWNvbiBmYXNcIixcbiAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB2ZXJ0aWNhbEFsaWduOiBcImJvdHRvbVwiIH0sXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJ0ZXh0LmRlY29kZVwiOiBcIiYjeGYxMmQ7XCIsIGNvbDogXCIzXCIsIHJvdzogXCIwXCIgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5jbGVhckluZGV4KFwic3RhdGVcIilcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5idXN5XG4gICAgICAgID8gX2MoXCJBY3Rpdml0eUluZGljYXRvclwiLCB7IGF0dHJzOiB7IGJ1c3k6IF92bS5idXN5IH0gfSlcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5idXN5XG4gICAgICAgID8gX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBfdm0uYnVzeVRleHQsIGhvcml6b250YWxBbGlnbm1lbnQ6IFwiY2VudGVyXCIgfVxuICAgICAgICAgIH0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfYyhcbiAgICAgICAgXCJSYWRMaXN0Vmlld1wiLFxuICAgICAgICB7XG4gICAgICAgICAgcmVmOiBcInJhZGxpc3RfdHV0b3JpYWxzXCIsXG4gICAgICAgICAgc3RhdGljU3R5bGU6IHsgbWFyZ2luVG9wOiBcIjIlXCIgfSxcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgICAgIGxvYWRPbkRlbWFuZE1vZGU6IFwiQXV0b1wiLFxuICAgICAgICAgICAgbG9hZE9uRGVtYW5kQnVmZmVyU2l6ZTogXCIyXCIsXG4gICAgICAgICAgICBwdWxsVG9SZWZyZXNoOiBcInRydWVcIixcbiAgICAgICAgICAgIGl0ZW1zOiBfdm0udHV0b3JpYWxzLFxuICAgICAgICAgICAgXCIrYWxpYXNcIjogXCJ0dXRvcmlhbFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgaXRlbVRhcDogX3ZtLm9uVHV0b3JpYWxUYXAsXG4gICAgICAgICAgICBsb2FkTW9yZURhdGFSZXF1ZXN0ZWQ6IF92bS5vbkxvYWRNb3JlSXRlbXNSZXF1ZXN0ZWQsXG4gICAgICAgICAgICBwdWxsVG9SZWZyZXNoSW5pdGlhdGVkOiBfdm0ucmVmcmVzaFRhYmxlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ2LXRlbXBsYXRlXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IG5hbWU6IFwiaGVhZGVyXCIgfSxcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdHV0b3JpYWwgPSByZWYudHV0b3JpYWxcbiAgICAgICAgICAgICAgICAgIHZhciAkaW5kZXggPSByZWYuJGluZGV4XG4gICAgICAgICAgICAgICAgICB2YXIgJGV2ZW4gPSByZWYuJGV2ZW5cbiAgICAgICAgICAgICAgICAgIHZhciAkb2RkID0gcmVmLiRvZGRcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93czogXCJhdXRvXCIsIGNvbHVtbnM6IFwiKiwqLCpcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBcImF1dG8sYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcImNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEYXRhL0hvcmFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyB0YXA6IF92bS5jaGFuZ2VTb3J0aW5nRGF0ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5maWx0ZXJbXCJkYXRlU29ydGluZ1wiXSA9PSBcImRlc2NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzL2Rlc2MucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjglXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5maWx0ZXJbXCJkYXRlU29ydGluZ1wiXSA9PSBcImFzY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9vdGhlcnMvYXNjLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI4JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCJ+L290aGVycy9ub19zb3J0aW5nLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI4JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFwiYXV0byxhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlByb2Zlc3NvcihhKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IHRhcDogX3ZtLmNoYW5nZVNvcnRpbmdUZWFjaGVyIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmZpbHRlcltcInRlYWNoZXJTb3J0aW5nXCJdID09IFwiZGVzY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9vdGhlcnMvZGVzYy5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiOCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLmZpbHRlcltcInRlYWNoZXJTb3J0aW5nXCJdID09IFwiYXNjXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCJ+L290aGVycy9hc2MucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjglXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzL25vX3NvcnRpbmcucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjglXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogXCJhdXRvLGF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRXN0YWRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgdGFwOiBfdm0uY2hhbmdlU29ydGluZ1N0YXRlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmZpbHRlcltcInN0YXRlU29ydGluZ1wiXSA9PSBcImRlc2NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzL2Rlc2MucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjglXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5maWx0ZXJbXCJzdGF0ZVNvcnRpbmdcIl0gPT0gXCJhc2NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzL2FzYy5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiOCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9vdGhlcnMvbm9fc29ydGluZy5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiOCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF9jKFwidi10ZW1wbGF0ZVwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyBuYW1lOiBcInJlZFwiLCBpZjogXCJ0dXRvcmlhbC5lc3RhZG8gPT0gMFwiIH0sXG4gICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgdmFyIHR1dG9yaWFsID0gcmVmLnR1dG9yaWFsXG4gICAgICAgICAgICAgICAgICB2YXIgJGluZGV4ID0gcmVmLiRpbmRleFxuICAgICAgICAgICAgICAgICAgdmFyICRldmVuID0gcmVmLiRldmVuXG4gICAgICAgICAgICAgICAgICB2YXIgJG9kZCA9IHJlZi4kb2RkXG4gICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmlhbC5pZCA9PSBfdm0uaXRlbVNlbGVjdGVkID8gXCJzZWxlY3RlZFwiIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgb3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBvcmllbnRhdGlvbjogXCJ2ZXJ0aWNhbFwiLCB3aWR0aDogXCIzMCVcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHsgYXR0cnM6IHsgdGV4dDogdHV0b3JpYWwuZGF0YSB9IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IF92bS5nZXREYXlXZWVrKHR1dG9yaWFsLmRhdGEpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IHR1dG9yaWFsLmhvcmFJbmljaW8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHR1dG9yaWFsLnByb2Zlc3Nvci5ub21lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNDAlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBjb2xvcjogXCJyZWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IFwiTsOjbyBjb25maXJtYWRvXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiU3RhY2tMYXlvdXRcIiwgeyBzdGF0aWNDbGFzczogXCJoclwiIH0pXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgfSksXG4gICAgICAgICAgX2MoXCJ2LXRlbXBsYXRlXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IG5hbWU6IFwiZ3JlZW5cIiwgaWY6IFwidHV0b3JpYWwuZXN0YWRvID09IDFcIiB9LFxuICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0dXRvcmlhbCA9IHJlZi50dXRvcmlhbFxuICAgICAgICAgICAgICAgICAgdmFyICRpbmRleCA9IHJlZi4kaW5kZXhcbiAgICAgICAgICAgICAgICAgIHZhciAkZXZlbiA9IHJlZi4kZXZlblxuICAgICAgICAgICAgICAgICAgdmFyICRvZGQgPSByZWYuJG9kZFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JpYWwuaWQgPT0gX3ZtLml0ZW1TZWxlY3RlZCA/IFwic2VsZWN0ZWRcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgb3JpZW50YXRpb246IFwidmVydGljYWxcIiwgd2lkdGg6IFwiMzAlXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7IGF0dHJzOiB7IHRleHQ6IHR1dG9yaWFsLmRhdGEgfSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBfdm0uZ2V0RGF5V2Vlayh0dXRvcmlhbC5kYXRhKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiB0dXRvcmlhbC5ob3JhSW5pY2lvIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0dXRvcmlhbC5wcm9mZXNzb3Iubm9tZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjQwJVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgY29sb3I6IFwiZ3JlZW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IFwiQ29uZmlybWFkb1wiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcIlN0YWNrTGF5b3V0XCIsIHsgc3RhdGljQ2xhc3M6IFwiaHJcIiB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdKVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJTdGFja0xheW91dFwiLFxuICAgIHsgc3RhdGljU3R5bGU6IHsgaG9yaXpBbGlnbjogXCJjZW50ZXJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyB3aWR0aDogXCI4NSVcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcIkJ1dHRvblwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBfdm0uZmlsdGVyQnRuTmFtZSB9LFxuICAgICAgICAgICAgb246IHsgdGFwOiBfdm0uZmlsdGVyVHV0b3JpYWxzIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFwiKixhdXRvLCosYXV0b1wiLFxuICAgICAgICAgICAgICAgIHJvd3M6IFwiYXV0byxhdXRvLGF1dG9cIixcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBfdm0uZmlsdGVyVmlzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiRHJvcERvd25cIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBpdGVtczogX3ZtLmNob2ljZXMsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5kZXg6IF92bS5zZWxlY3RlZEluZGV4XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjogeyBzZWxlY3RlZEluZGV4Q2hhbmdlZDogX3ZtLmRyb3BEb3duU2VsZWN0ZWRJbmRleENoYW5nZWQgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJUZXh0RmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBoaW50OiBcIkRhdGFcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogX3ZtLmRhdGVWaXMsXG4gICAgICAgICAgICAgICAgICBlZGl0YWJsZTogXCJmYWxzZVwiLFxuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLmZpbHRlcltcImluaXRpYWxfZGF0ZVwiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub3BlbkRhdGUoXCJpbml0aWFsX2RhdGVcIilcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kc2V0KF92bS5maWx0ZXIsIFwiaW5pdGlhbF9kYXRlXCIsICRldmVudC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiRGF0YSBJbmljaWFsXCIsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjFcIixcbiAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IF92bS5pbnRlcnZhbERhdGVWaXMsXG4gICAgICAgICAgICAgICAgICBlZGl0YWJsZTogXCJmYWxzZVwiLFxuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLmZpbHRlcltcImluaXRpYWxfZGF0ZVwiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub3BlbkRhdGUoXCJpbml0aWFsX2RhdGVcIilcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kc2V0KF92bS5maWx0ZXIsIFwiaW5pdGlhbF9kYXRlXCIsICRldmVudC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJudC1pY29uIGZhc1wiLFxuICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHZlcnRpY2FsQWxpZ246IFwiYm90dG9tXCIgfSxcbiAgICAgICAgICAgICAgICBhdHRyczogeyBcInRleHQuZGVjb2RlXCI6IFwiJiN4ZjEyZDtcIiwgY29sOiBcIjFcIiwgcm93OiBcIjFcIiB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmNsZWFyKFwiaW5pdGlhbF9kYXRlXCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJUZXh0RmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBoaW50OiBcIkRhdGEgRmluYWxcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIyXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogX3ZtLmludGVydmFsRGF0ZVZpcyxcbiAgICAgICAgICAgICAgICAgIGVkaXRhYmxlOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0uZmlsdGVyW1wiZmluYWxfZGF0ZVwiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub3BlbkRhdGUoXCJmaW5hbF9kYXRlXCIpXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgdGV4dENoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHNldChfdm0uZmlsdGVyLCBcImZpbmFsX2RhdGVcIiwgJGV2ZW50LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWljb24gZmFzXCIsXG4gICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgdmVydGljYWxBbGlnbjogXCJib3R0b21cIiB9LFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBcInRleHQuZGVjb2RlXCI6IFwiJiN4ZjEyZDtcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIzXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogX3ZtLmludGVydmFsRGF0ZVZpc1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uY2xlYXIoXCJmaW5hbF9kYXRlXCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogXCIqLGF1dG9cIixcbiAgICAgICAgICAgICAgICByb3dzOiBcImF1dG8sYXV0byxhdXRvLGF1dG9cIixcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBfdm0uZmlsdGVyVmlzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiVGV4dEZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaGludDogXCJIb3JhIGRlIGluw61jaW9cIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgZWRpdGFibGU6IFwiZmFsc2VcIixcbiAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS5maWx0ZXJbXCJob3VyXCJdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5vcGVuVGltZSgpXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgdGV4dENoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHNldChfdm0uZmlsdGVyLCBcImhvdXJcIiwgJGV2ZW50LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWljb24gZmFzXCIsXG4gICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgdmVydGljYWxBbGlnbjogXCJib3R0b21cIiB9LFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwidGV4dC5kZWNvZGVcIjogXCImI3hmMTJkO1wiLCBjb2w6IFwiMVwiLCByb3c6IFwiMFwiIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uY2xlYXIoXCJob3VyXCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJUZXh0RmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBoaW50OiBcIlByb2Zlc3NvcihhKVwiLFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0uZmlsdGVyW1widGVhY2hlclwiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRleHRDaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLiRzZXQoX3ZtLmZpbHRlciwgXCJ0ZWFjaGVyXCIsICRldmVudC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJudC1pY29uIGZhc1wiLFxuICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHZlcnRpY2FsQWxpZ246IFwiYm90dG9tXCIgfSxcbiAgICAgICAgICAgICAgICBhdHRyczogeyBcInRleHQuZGVjb2RlXCI6IFwiJiN4ZjEyZDtcIiwgY29sOiBcIjFcIiwgcm93OiBcIjFcIiB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmNsZWFyKFwidGVhY2hlclwiKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiVGV4dEZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaGludDogXCJBc3N1bnRvXCIsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjJcIixcbiAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS5maWx0ZXJbXCJzdWJqZWN0XCJdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGV4dENoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHNldChfdm0uZmlsdGVyLCBcInN1YmplY3RcIiwgJGV2ZW50LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWljb24gZmFzXCIsXG4gICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgdmVydGljYWxBbGlnbjogXCJib3R0b21cIiB9LFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwidGV4dC5kZWNvZGVcIjogXCImI3hmMTJkO1wiLCBjb2w6IFwiMVwiLCByb3c6IFwiMlwiIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uY2xlYXIoXCJzdWJqZWN0XCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJUZXh0RmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBoaW50OiBcIlVuaWRhZGUgQ3VycmljdWxhclwiLFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIHJvdzogXCIzXCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0uZmlsdGVyW1wiY291cnNlX3VuaXRcIl1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kc2V0KF92bS5maWx0ZXIsIFwiY291cnNlX3VuaXRcIiwgJGV2ZW50LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWljb24gZmFzXCIsXG4gICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgdmVydGljYWxBbGlnbjogXCJib3R0b21cIiB9LFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwidGV4dC5kZWNvZGVcIjogXCImI3hmMTJkO1wiLCBjb2w6IFwiMVwiLCByb3c6IFwiM1wiIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uY2xlYXIoXCJjb3Vyc2VfdW5pdFwiKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFwiKixhdXRvLCosYXV0b1wiLFxuICAgICAgICAgICAgICAgIHJvd3M6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IF92bS5maWx0ZXJWaXNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJEcm9wRG93blwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBfdm0ucmVxdWVzdF9jaG9pY2VzLFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICBoaW50OiBcIlBlZGlkb1wiLFxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJbmRleDogX3ZtLmNsZWFyRHJvcC5zZWxlY3RlZF9yZXF1ZXN0XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjogeyBzZWxlY3RlZEluZGV4Q2hhbmdlZDogX3ZtLmNoYW5nZVJlcXVlc3QgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibnQtaWNvbiBmYXNcIixcbiAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB2ZXJ0aWNhbEFsaWduOiBcImJvdHRvbVwiIH0sXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJ0ZXh0LmRlY29kZVwiOiBcIiYjeGYxMmQ7XCIsIGNvbDogXCIxXCIsIHJvdzogXCIwXCIgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5jbGVhckluZGV4KFwicmVxdWVzdFwiKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiRHJvcERvd25cIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBpdGVtczogX3ZtLnN0YXRlX2Nob2ljZXMsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMlwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiRXN0YWRvXCIsXG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4OiBfdm0uY2xlYXJEcm9wLnNlbGVjdGVkX3N0YXRlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjogeyBzZWxlY3RlZEluZGV4Q2hhbmdlZDogX3ZtLmNoYW5nZVN0YXRlIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWljb24gZmFzXCIsXG4gICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgdmVydGljYWxBbGlnbjogXCJib3R0b21cIiB9LFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwidGV4dC5kZWNvZGVcIjogXCImI3hmMTJkO1wiLCBjb2w6IFwiM1wiLCByb3c6IFwiMFwiIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uY2xlYXJJbmRleChcInN0YXRlXCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uYnVzeVxuICAgICAgICA/IF9jKFwiQWN0aXZpdHlJbmRpY2F0b3JcIiwgeyBhdHRyczogeyBidXN5OiBfdm0uYnVzeSB9IH0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uYnVzeVxuICAgICAgICA/IF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogX3ZtLmJ1c3lUZXh0LCBob3Jpem9udGFsQWxpZ25tZW50OiBcImNlbnRlclwiIH1cbiAgICAgICAgICB9KVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX2MoXG4gICAgICAgIFwiUmFkTGlzdFZpZXdcIixcbiAgICAgICAge1xuICAgICAgICAgIHJlZjogXCJyYWRsaXN0X3R1dG9yaWFsc1wiLFxuICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IG1hcmdpblRvcDogXCIyJVwiIH0sXG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICAgICAgICBsb2FkT25EZW1hbmRNb2RlOiBcIkF1dG9cIixcbiAgICAgICAgICAgIGxvYWRPbkRlbWFuZEJ1ZmZlclNpemU6IFwiMlwiLFxuICAgICAgICAgICAgcHVsbFRvUmVmcmVzaDogXCJ0cnVlXCIsXG4gICAgICAgICAgICBpdGVtczogX3ZtLnR1dG9yaWFscyxcbiAgICAgICAgICAgIFwiK2FsaWFzXCI6IFwidHV0b3JpYWxcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIGl0ZW1UYXA6IF92bS5vblR1dG9yaWFsVGFwLFxuICAgICAgICAgICAgbG9hZE1vcmVEYXRhUmVxdWVzdGVkOiBfdm0ub25Mb2FkTW9yZUl0ZW1zUmVxdWVzdGVkLFxuICAgICAgICAgICAgcHVsbFRvUmVmcmVzaEluaXRpYXRlZDogX3ZtLnJlZnJlc2hUYWJsZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwidi10ZW1wbGF0ZVwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyBuYW1lOiBcImhlYWRlclwiIH0sXG4gICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgdmFyIHR1dG9yaWFsID0gcmVmLnR1dG9yaWFsXG4gICAgICAgICAgICAgICAgICB2YXIgJGluZGV4ID0gcmVmLiRpbmRleFxuICAgICAgICAgICAgICAgICAgdmFyICRldmVuID0gcmVmLiRldmVuXG4gICAgICAgICAgICAgICAgICB2YXIgJG9kZCA9IHJlZi4kb2RkXG4gICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvd3M6IFwiYXV0b1wiLCBjb2x1bW5zOiBcIiosKiwqXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogXCJhdXRvLGF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGF0YS9Ib3JhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgdGFwOiBfdm0uY2hhbmdlU29ydGluZ0RhdGUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZmlsdGVyW1wiZGF0ZVNvcnRpbmdcIl0gPT0gXCJkZXNjXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCJ+L290aGVycy9kZXNjLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI4JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uZmlsdGVyW1wiZGF0ZVNvcnRpbmdcIl0gPT0gXCJhc2NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzL2FzYy5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiOCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9vdGhlcnMvbm9fc29ydGluZy5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiOCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBcImF1dG8sYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcImNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJQcm9mZXNzb3IoYSlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyB0YXA6IF92bS5jaGFuZ2VTb3J0aW5nVGVhY2hlciB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5maWx0ZXJbXCJ0ZWFjaGVyU29ydGluZ1wiXSA9PSBcImRlc2NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzL2Rlc2MucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjglXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5maWx0ZXJbXCJ0ZWFjaGVyU29ydGluZ1wiXSA9PSBcImFzY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9vdGhlcnMvYXNjLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI4JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCJ+L290aGVycy9ub19zb3J0aW5nLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI4JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFwiYXV0byxhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkVzdGFkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IHRhcDogX3ZtLmNoYW5nZVNvcnRpbmdTdGF0ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5maWx0ZXJbXCJzdGF0ZVNvcnRpbmdcIl0gPT0gXCJkZXNjXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCJ+L290aGVycy9kZXNjLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI4JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uZmlsdGVyW1wic3RhdGVTb3J0aW5nXCJdID09IFwiYXNjXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCJ+L290aGVycy9hc2MucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjglXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzL25vX3NvcnRpbmcucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjglXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfYyhcInYtdGVtcGxhdGVcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgbmFtZTogXCJyZWRcIiwgaWY6IFwidHV0b3JpYWwuZXN0YWRvID09IDBcIiB9LFxuICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0dXRvcmlhbCA9IHJlZi50dXRvcmlhbFxuICAgICAgICAgICAgICAgICAgdmFyICRpbmRleCA9IHJlZi4kaW5kZXhcbiAgICAgICAgICAgICAgICAgIHZhciAkZXZlbiA9IHJlZi4kZXZlblxuICAgICAgICAgICAgICAgICAgdmFyICRvZGQgPSByZWYuJG9kZFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JpYWwuaWQgPT0gX3ZtLml0ZW1TZWxlY3RlZCA/IFwic2VsZWN0ZWRcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgb3JpZW50YXRpb246IFwidmVydGljYWxcIiwgd2lkdGg6IFwiMzAlXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7IGF0dHJzOiB7IHRleHQ6IHR1dG9yaWFsLmRhdGEgfSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBfdm0uZ2V0RGF5V2Vlayh0dXRvcmlhbC5kYXRhKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiB0dXRvcmlhbC5ob3JhSW5pY2lvIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0dXRvcmlhbC5wcm9mZXNzb3Iubm9tZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjQwJVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgY29sb3I6IFwicmVkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBcIk7Do28gY29uZmlybWFkb1wiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcIlN0YWNrTGF5b3V0XCIsIHsgc3RhdGljQ2xhc3M6IFwiaHJcIiB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF9jKFwidi10ZW1wbGF0ZVwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyBuYW1lOiBcImdyZWVuXCIsIGlmOiBcInR1dG9yaWFsLmVzdGFkbyA9PSAxXCIgfSxcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdHV0b3JpYWwgPSByZWYudHV0b3JpYWxcbiAgICAgICAgICAgICAgICAgIHZhciAkaW5kZXggPSByZWYuJGluZGV4XG4gICAgICAgICAgICAgICAgICB2YXIgJGV2ZW4gPSByZWYuJGV2ZW5cbiAgICAgICAgICAgICAgICAgIHZhciAkb2RkID0gcmVmLiRvZGRcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1dG9yaWFsLmlkID09IF92bS5pdGVtU2VsZWN0ZWQgPyBcInNlbGVjdGVkXCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IG9yaWVudGF0aW9uOiBcInZlcnRpY2FsXCIsIHdpZHRoOiBcIjMwJVwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwgeyBhdHRyczogeyB0ZXh0OiB0dXRvcmlhbC5kYXRhIH0gfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogX3ZtLmdldERheVdlZWsodHV0b3JpYWwuZGF0YSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogdHV0b3JpYWwuaG9yYUluaWNpbyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdHV0b3JpYWwucHJvZmVzc29yLm5vbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI0MCVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGNvbG9yOiBcImdyZWVuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBcIkNvbmZpcm1hZG9cIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJTdGFja0xheW91dFwiLCB7IHN0YXRpY0NsYXNzOiBcImhyXCIgfSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiUGFnZVwiLFxuICAgIHsgYXR0cnM6IHsgYWN0aW9uQmFySGlkZGVuOiBcInRydWVcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICB7XG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIHJvd3M6IFwiKlwiLFxuICAgICAgICAgICAgY29sdW1uczogXCIqXCIsXG4gICAgICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcImNlbnRlclwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBcIjc1JVwiLFxuICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwiY2VudGVyXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGl0bGVcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzL2ljb24ucG5nXCIsXG4gICAgICAgICAgICAgICAgICBzdHJlY2g6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiOTAlXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaXRlbVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBoaW50OiBcIk7Dum1lcm8gZGUgZXN0dWRhbnRlXCIsXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxNVwiLFxuICAgICAgICAgICAgICAgICAga2V5Ym9hcmRUeXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLm51bWJlclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRleHRDaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdm0ubnVtYmVyID0gJGV2ZW50LnZhbHVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJUZXh0RmllbGRcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIml0ZW1cIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaGludDogXCJTZW5oYVwiLFxuICAgICAgICAgICAgICAgICAgc2VjdXJlOiBcInRydWVcIixcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE1XCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0ucGFzc3dvcmRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLnBhc3N3b3JkID0gJGV2ZW50LnZhbHVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJjaGVjay1ib3hcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIml0ZW1cIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgdGV4dDogXCJNYW50ZXIgc2Vzc8OjbyBpbmljaWFkYVwiLFxuICAgICAgICAgICAgICAgICAgY2hlY2tlZDogX3ZtLmlzQ2hlY2tlZFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWRDaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdm0uaXNDaGVja2VkID0gJGV2ZW50LnZhbHVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJCdXR0b25cIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IFwiSW5pY2lhciBzZXNzw6NvXCIsIGZvbnRTaXplOiBcIjE1XCIgfSxcbiAgICAgICAgICAgICAgICBvbjogeyB0YXA6IF92bS5sb2dpbiB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIlBhZ2VcIixcbiAgICB7IGF0dHJzOiB7IGFjdGlvbkJhckhpZGRlbjogXCJ0cnVlXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcIlJhZFNpZGVEcmF3ZXJcIixcbiAgICAgICAge1xuICAgICAgICAgIHJlZjogXCJkcmF3ZXJcIixcbiAgICAgICAgICBhdHRyczogeyBkcmF3ZXJMb2NhdGlvbjogXCJMZWZ0XCIsIGdlc3R1cmVzRW5hYmxlZDogXCJ0cnVlXCIgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcInZpZXdcIixcbiAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12aWV3OmRyYXdlckNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgIGFyZzogXCJkcmF3ZXJDb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICBtb2RpZmllcnM6IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJudC1kcmF3ZXJfX2hlYWRlclwiIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWRyYXdlcl9faGVhZGVyLWltYWdlIGZhcyB0LTM2XCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGNvbG9yOiBcIndoaXRlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJzcmMuZGVjb2RlXCI6IFwiZm9udDovLyYjeGYyYmQ7XCIgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGVyLWVsZW1cIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogX3ZtLm5hbWUgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGVyLWVsZW1cIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogX3ZtLmVtYWlsIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiU2Nyb2xsVmlld1wiLFxuICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibnQtZHJhd2VyX19ib2R5XCIgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibnQtZHJhd2VyX19saXN0LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBcImF1dG8sKlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZWxlY3RlZFBhZ2UgPT09IFwiaW5pdGlhbFBhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiI2UwZjVmZlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdGVkUGFnZSA9PT0gXCJpbml0aWFsUGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCIjMDA4OGM5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5vbk5hdmlnYXRpb25JdGVtVGFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluaXRpYWxQYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUMOhZ2luYSBpbmljaWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWljb24gZmFzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJ0ZXh0LmRlY29kZVwiOiBcIiYjeGYwMTU7XCIsIGNvbDogXCIwXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogXCJQw6FnaW5hIGluaWNpYWxcIiwgY29sOiBcIjFcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFwibnQtZHJhd2VyX19saXN0LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBcImF1dG8sKlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZWxlY3RlZFBhZ2UgPT09IFwicHJldmlvdXNDbGFzc2VzUGFnZVwiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2VsZWN0ZWRQYWdlID09PSBcInByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCIjZTBmNWZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIndoaXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2VsZWN0ZWRQYWdlID09PSBcInByZXZpb3VzQ2xhc3Nlc1BhZ2VcIiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdGVkUGFnZSA9PT0gXCJwcmV2aW91c0NsYXNzaWZpY2F0aW9uc1BhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiIzAwODhjOVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub25OYXZpZ2F0aW9uSXRlbVRhcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2aW91c0NsYXNzZXNQYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXVsYXMgYW50ZXJpb3Jlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJudC1pY29uIGZhc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwidGV4dC5kZWNvZGVcIjogXCImI3hmMWRhO1wiLCBjb2w6IFwiMFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IFwiQXVsYXMgYW50ZXJpb3Jlc1wiLCBjb2w6IFwiMVwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJudC1kcmF3ZXJfX2xpc3QtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFwiYXV0bywqXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdGVkUGFnZSA9PT0gXCJzY2hlZHVsZVR1dG9yaW5nXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZWxlY3RlZFBhZ2UgPT09IFwicmVnaXN0ZXJUdXRvcmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCIjZTBmNWZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIndoaXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2VsZWN0ZWRQYWdlID09PSBcInNjaGVkdWxlVHV0b3JpbmdcIiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdGVkUGFnZSA9PT0gXCJyZWdpc3RlclR1dG9yaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiMwMDg4YzlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm9uTmF2aWdhdGlvbkl0ZW1UYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2NoZWR1bGVUdXRvcmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk1hcmNhciB0dXRvcmlhXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWljb24gZmFzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJ0ZXh0LmRlY29kZVwiOiBcIiYjeGYyNzE7XCIsIGNvbDogXCIwXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogXCJNYXJjYXIgdHV0b3JpYVwiLCBjb2w6IFwiMVwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJudC1kcmF3ZXJfX2xpc3QtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFwiYXV0bywqXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdGVkUGFnZSA9PT0gXCJsaXN0VHV0b3JpYWxzXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZWxlY3RlZFBhZ2UgPT09IFwiZWRpdFR1dG9yaWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiNlMGY1ZmZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZWxlY3RlZFBhZ2UgPT09IFwibGlzdFR1dG9yaWFsc1wiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2VsZWN0ZWRQYWdlID09PSBcImVkaXRUdXRvcmlhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCIjMDA4OGM5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5vbk5hdmlnYXRpb25JdGVtVGFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpc3RUdXRvcmlhbHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQZWRpZG9zIGRlIHR1dG9yaWFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibnQtaWNvbiBmYXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBcInRleHQuZGVjb2RlXCI6IFwiJiN4ZjBjYTtcIiwgY29sOiBcIjBcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBcIlBlZGlkb3MgZGUgdHV0b3JpYVwiLCBjb2w6IFwiMVwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJudC1kcmF3ZXJfX2xpc3QtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFwiYXV0bywqXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdGVkUGFnZSA9PT0gXCJsaXN0QXJjaGl2ZWRUdXRvcmlhbHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiI2UwZjVmZlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdGVkUGFnZSA9PT0gXCJsaXN0QXJjaGl2ZWRUdXRvcmlhbHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiIzAwODhjOVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub25OYXZpZ2F0aW9uSXRlbVRhcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaXN0QXJjaGl2ZWRUdXRvcmlhbHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQZWRpZG9zIGRlIHR1dG9yaWEgYXJxdWl2YWRvc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJudC1pY29uIGZhc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwidGV4dC5kZWNvZGVcIjogXCImI3hmMTg3O1wiLCBjb2w6IFwiMFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlBlZGlkb3MgZGUgdHV0b3JpYSBhcnF1aXZhZG9zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiU3RhY2tMYXlvdXRcIiwgeyBzdGF0aWNDbGFzczogXCJoclwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWRyYXdlcl9fbGlzdC1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbHVtbnM6IFwiYXV0bywqXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgdGFwOiBfdm0ubG9nb3V0IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWljb24gZmFzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJ0ZXh0LmRlY29kZVwiOiBcIiYjeGYyZjU7XCIsIGNvbDogXCIwXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogXCJUZXJtaW5hciBzZXNzw6NvXCIsIGNvbDogXCIxXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJGcmFtZVwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2aWV3XCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmlldzptYWluQ29udGVudFwiLFxuICAgICAgICAgICAgICAgICAgYXJnOiBcIm1haW5Db250ZW50XCIsXG4gICAgICAgICAgICAgICAgICBtb2RpZmllcnM6IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcIlBhZ2VcIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJBY3Rpb25CYXJcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGNvbG9yOiBcIndoaXRlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0aXRsZTogX3ZtLnRpdGxlIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmlzQW5kcm9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFuZHJvaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIk5hdmlnYXRpb25CdXR0b25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBpY29uOiBcInJlczovL21lbnVcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyB0YXA6IF92bS5vcGVuTWVudSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFjdGlvbkl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZWxlY3RlZFBhZ2UgPT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRmxleGJveExheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgYWxpZ25Db250ZW50OiBcImZsZXgtZW5kXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBtYXJnaW5SaWdodDogXCIzJVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjU1JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwifi9vdGhlcnMvaW5mby1pY29uLXdoaXRlLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVjaDogXCJub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgdGFwOiBfdm0uc2VlQ2xhc3NJbmZvIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW9zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJBY3Rpb25JdGVtXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcInJlczovL21lbnVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlvcy5wb3NpdGlvblwiOiBcImxlZnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyB0YXA6IF92bS5vcGVuTWVudSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiQWN0aW9uSXRlbVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1zaG93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdGVkUGFnZSA9PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZFBhZ2U9PSdwcmV2aW91c0NsYXNzaWZpY2F0aW9uc1BhZ2UnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJyZXM6Ly9pbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpb3MucG9zaXRpb25cIjogXCJyaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IHRhcDogX3ZtLnNlZUNsYXNzSW5mbyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfdm0uc2VsZWN0ZWRQYWdlID09IFwiaW5pdGlhbFBhZ2VcIlxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjZW50ZXItaXRlbVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJpbml0aWFsLXBhZ2VcIiwgeyBvbjogeyBjbGFzczogX3ZtLmVudGVyQ2xhc3MgfSB9KV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5zZWxlY3RlZFBhZ2UgPT0gXCJwcmV2aW91c0NsYXNzZXNQYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwcmV2aW91cy1jbGFzc2VzLXBhZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGl0ZW1TZWxlY3RlZDogX3ZtLml0ZW1TZWxlY3RlZENsYXNzIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZUNsYXNzaWZpY2F0aW9uczogX3ZtLmVudGVyQ2xhc3NpZmljYXRpb25zUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2s6IF92bS5nb2luZ0JhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uc2VsZWN0ZWRQYWdlID09IFwic2NoZWR1bGVUdXRvcmluZ1wiXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic2NoZWR1bGUtdHV0b3JpbmdcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RlclR1dG9yaW5nOiBfdm0uZW50ZXJSZWdpc3RlclR1dG9yaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFjazogX3ZtLmdvaW5nQmFja1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5zZWxlY3RlZFBhZ2UgPT0gXCJyZWdpc3RlclR1dG9yaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJyZWdpc3Rlci10dXRvcmluZ1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlYWNoZXJfaWQ6IF92bS50ZWFjaGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291cnNlX3VuaXRzOiBfdm0udW5pdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyX25hbWU6IF92bS50TmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgYmFja1RlYWNoZXJzOiBfdm0uc2VlVGVhY2hlcnMgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLnNlbGVjdGVkUGFnZSA9PSBcImxpc3RUdXRvcmlhbHNcIlxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImxpc3QtdHV0b3JpYWxzXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBpdGVtU2VsZWN0ZWQ6IF92bS5pdGVtU2VsZWN0ZWRUdXRvcmlhbCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0VHV0b3JpYWw6IF92bS5lbnRlckVkaXRUdXRvcmlhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2s6IF92bS5nb2luZ0JhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uc2VsZWN0ZWRQYWdlID09IFwiZWRpdFR1dG9yaWFsXCJcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJlZGl0LXR1dG9yaWFsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0dXRvcmlhbDogX3ZtLnR1dG9yaWFsRWRpdCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGJhY2tMaXN0VHV0b3JpYWxzOiBfdm0uc2VlTGlzdFR1dG9yaWFscyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uc2VsZWN0ZWRQYWdlID09IFwibGlzdEFyY2hpdmVkVHV0b3JpYWxzXCJcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJsaXN0LWFyY2hpdmVkLXR1dG9yaWFsc1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgYmFjazogX3ZtLmdvaW5nQmFjayB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uc2VsZWN0ZWRQYWdlID09IFwicHJldmlvdXNDbGFzc2lmaWNhdGlvbnNQYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwcmV2aW91cy1jbGFzc2lmaWNhdGlvbnMtcGFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgY2xhc3NTZWxlY3RlZDogX3ZtLmNsYXNzU2VsZWN0ZWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyBiYWNrOiBfdm0uZ29pbmdCYWNrQ2xhc3NlcyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgeyBzdGF0aWNTdHlsZTogeyBob3JpekFsaWduOiBcImNlbnRlclwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHdpZHRoOiBcIjg1JVwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiQnV0dG9uXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IF92bS5maWx0ZXJCdG5OYW1lIH0sXG4gICAgICAgICAgICBvbjogeyB0YXA6IF92bS5maWx0ZXJDbGFzc2VzIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFwiKixhdXRvLCosYXV0b1wiLFxuICAgICAgICAgICAgICAgIHJvd3M6IFwiYXV0byxhdXRvLGF1dG9cIixcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBfdm0uZmlsdGVyVmlzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiRHJvcERvd25cIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBpdGVtczogX3ZtLmNob2ljZXMsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5kZXg6IF92bS5zZWxlY3RlZEluZGV4XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjogeyBzZWxlY3RlZEluZGV4Q2hhbmdlZDogX3ZtLmRyb3BEb3duU2VsZWN0ZWRJbmRleENoYW5nZWQgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJUZXh0RmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBoaW50OiBcIkRhdGFcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogX3ZtLmRhdGVWaXMsXG4gICAgICAgICAgICAgICAgICBlZGl0YWJsZTogXCJmYWxzZVwiLFxuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLmZpbHRlcltcImluaXRpYWxfZGF0ZVwiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub3BlbkRhdGUoXCJpbml0aWFsX2RhdGVcIilcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kc2V0KF92bS5maWx0ZXIsIFwiaW5pdGlhbF9kYXRlXCIsICRldmVudC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiRGF0YSBJbmljaWFsXCIsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjFcIixcbiAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IF92bS5pbnRlcnZhbERhdGVWaXMsXG4gICAgICAgICAgICAgICAgICBlZGl0YWJsZTogXCJmYWxzZVwiLFxuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLmZpbHRlcltcImluaXRpYWxfZGF0ZVwiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub3BlbkRhdGUoXCJpbml0aWFsX2RhdGVcIilcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kc2V0KF92bS5maWx0ZXIsIFwiaW5pdGlhbF9kYXRlXCIsICRldmVudC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJudC1pY29uIGZhc1wiLFxuICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHZlcnRpY2FsQWxpZ246IFwiYm90dG9tXCIgfSxcbiAgICAgICAgICAgICAgICBhdHRyczogeyBcInRleHQuZGVjb2RlXCI6IFwiJiN4ZjEyZDtcIiwgY29sOiBcIjFcIiwgcm93OiBcIjFcIiB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmNsZWFyKFwiaW5pdGlhbF9kYXRlXCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJUZXh0RmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBoaW50OiBcIkRhdGEgRmluYWxcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIyXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogX3ZtLmludGVydmFsRGF0ZVZpcyxcbiAgICAgICAgICAgICAgICAgIGVkaXRhYmxlOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0uZmlsdGVyW1wiZmluYWxfZGF0ZVwiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub3BlbkRhdGUoXCJmaW5hbF9kYXRlXCIpXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgdGV4dENoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHNldChfdm0uZmlsdGVyLCBcImZpbmFsX2RhdGVcIiwgJGV2ZW50LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWljb24gZmFzXCIsXG4gICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgdmVydGljYWxBbGlnbjogXCJib3R0b21cIiB9LFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBcInRleHQuZGVjb2RlXCI6IFwiJiN4ZjEyZDtcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIzXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogX3ZtLmludGVydmFsRGF0ZVZpc1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uY2xlYXIoXCJmaW5hbF9kYXRlXCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogXCIqLGF1dG9cIixcbiAgICAgICAgICAgICAgICByb3dzOiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBfdm0uZmlsdGVyVmlzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiVGV4dEZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaGludDogXCJVbmlkYWRlIEN1cnJpY3VsYXJcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLmZpbHRlcltcImNvdXJzZV91bml0XCJdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGV4dENoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHNldChfdm0uZmlsdGVyLCBcImNvdXJzZV91bml0XCIsICRldmVudC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJudC1pY29uIGZhc1wiLFxuICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHZlcnRpY2FsQWxpZ246IFwiYm90dG9tXCIgfSxcbiAgICAgICAgICAgICAgICBhdHRyczogeyBcInRleHQuZGVjb2RlXCI6IFwiJiN4ZjEyZDtcIiwgY29sOiBcIjFcIiwgcm93OiBcIjBcIiB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmNsZWFyKFwiY291cnNlX3VuaXRcIilcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBcIiosYXV0bywqLGF1dG9cIixcbiAgICAgICAgICAgICAgICByb3dzOiBcImF1dG8sYXV0b1wiLFxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IF92bS5maWx0ZXJWaXNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJEcm9wRG93blwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBfdm0uc2Nob29sX3llYXJfbGlzdCxcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgaGludDogXCJBbm8gTGV0aXZvXCIsXG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4OiBfdm0uY2xlYXJEcm9wLnNlbGVjdGVkX3NjaG9vbF95ZWFyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjogeyBzZWxlY3RlZEluZGV4Q2hhbmdlZDogX3ZtLmNoYW5nZVNob29sWWVhciB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJudC1pY29uIGZhc1wiLFxuICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHZlcnRpY2FsQWxpZ246IFwiYm90dG9tXCIgfSxcbiAgICAgICAgICAgICAgICBhdHRyczogeyBcInRleHQuZGVjb2RlXCI6IFwiJiN4ZjEyZDtcIiwgY29sOiBcIjFcIiwgcm93OiBcIjBcIiB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmNsZWFySW5kZXgoXCJzY2hvb2xfeWVhclwiKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiRHJvcERvd25cIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBpdGVtczogX3ZtLnNlbWVzdGVyX2xpc3QsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMlwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiU2VtZXN0cmVcIixcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5kZXg6IF92bS5jbGVhckRyb3Auc2VsZWN0ZWRfc2VtZXN0ZXJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7IHNlbGVjdGVkSW5kZXhDaGFuZ2VkOiBfdm0uY2hhbmdlU2VtZXN0ZXIgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibnQtaWNvbiBmYXNcIixcbiAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB2ZXJ0aWNhbEFsaWduOiBcImJvdHRvbVwiIH0sXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJ0ZXh0LmRlY29kZVwiOiBcIiYjeGYxMmQ7XCIsIGNvbDogXCIzXCIsIHJvdzogXCIwXCIgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5jbGVhckluZGV4KFwic2VtZXN0ZXJcIilcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkRyb3BEb3duXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaXRlbXM6IF92bS5jb3Vyc2VfeWVhcl9saXN0LFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICBoaW50OiBcIkFubyBkbyBDdXJzb1wiLFxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJbmRleDogX3ZtLmNsZWFyRHJvcC5zZWxlY3RlZF9jb3Vyc2VfeWVhclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHsgc2VsZWN0ZWRJbmRleENoYW5nZWQ6IF92bS5jaGFuZ2VDb3Vyc2VZZWFyIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm50LWljb24gZmFzXCIsXG4gICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgdmVydGljYWxBbGlnbjogXCJib3R0b21cIiB9LFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwidGV4dC5kZWNvZGVcIjogXCImI3hmMTJkO1wiLCBjb2w6IFwiMVwiLCByb3c6IFwiMVwiIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uY2xlYXJJbmRleChcImNvdXJzZV95ZWFyXCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uYnVzeVxuICAgICAgICA/IF9jKFwiQWN0aXZpdHlJbmRpY2F0b3JcIiwgeyBhdHRyczogeyBidXN5OiBfdm0uYnVzeSB9IH0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uYnVzeVxuICAgICAgICA/IF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogX3ZtLmJ1c3lUZXh0LCBob3Jpem9udGFsQWxpZ25tZW50OiBcImNlbnRlclwiIH1cbiAgICAgICAgICB9KVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX2MoXG4gICAgICAgIFwiUmFkTGlzdFZpZXdcIixcbiAgICAgICAge1xuICAgICAgICAgIHJlZjogXCJsaXN0X2NsYXNzZXNcIixcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0XCIsXG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICAgICAgICBsb2FkT25EZW1hbmRNb2RlOiBcIkF1dG9cIixcbiAgICAgICAgICAgIGxvYWRPbkRlbWFuZEJ1ZmZlclNpemU6IFwiMlwiLFxuICAgICAgICAgICAgcHVsbFRvUmVmcmVzaDogXCJ0cnVlXCIsXG4gICAgICAgICAgICBpdGVtczogX3ZtLmNsYXNzZXMsXG4gICAgICAgICAgICBcIithbGlhc1wiOiBcIml0ZW1cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIGl0ZW1UYXA6IF92bS5vbkNsYXNzVGFwLFxuICAgICAgICAgICAgbG9hZE1vcmVEYXRhUmVxdWVzdGVkOiBfdm0ub25Mb2FkTW9yZUl0ZW1zUmVxdWVzdGVkLFxuICAgICAgICAgICAgcHVsbFRvUmVmcmVzaEluaXRpYXRlZDogX3ZtLnJlZnJlc2hUYWJsZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwidi10ZW1wbGF0ZVwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyBuYW1lOiBcImhlYWRlclwiIH0sXG4gICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSByZWYuaXRlbVxuICAgICAgICAgICAgICAgICAgdmFyICRpbmRleCA9IHJlZi4kaW5kZXhcbiAgICAgICAgICAgICAgICAgIHZhciAkZXZlbiA9IHJlZi4kZXZlblxuICAgICAgICAgICAgICAgICAgdmFyICRvZGQgPSByZWYuJG9kZFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3dzOiBcImF1dG9cIiwgY29sdW1uczogXCIqLDIqXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBtYXJnaW5MZWZ0OiBcIjUlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBcImF1dG8sYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJEYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgdGFwOiBfdm0uY2hhbmdlU29ydGluZ0RhdGUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZmlsdGVyW1wiZGF0ZVNvcnRpbmdcIl0gPT0gXCJkZXNjXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCJ+L290aGVycy9kZXNjLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI5JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uZmlsdGVyW1wiZGF0ZVNvcnRpbmdcIl0gPT0gXCJhc2NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzL2FzYy5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiOSVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9vdGhlcnMvbm9fc29ydGluZy5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiOSVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBcImF1dG8sYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJVbmlkYWRlIEN1cnJpY3VsYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyB0YXA6IF92bS5jaGFuZ2VTb3J0aW5nVW5pdCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5maWx0ZXJbXCJ1bml0U29ydGluZ1wiXSA9PSBcImRlc2NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzL2Rlc2MucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjQlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5maWx0ZXJbXCJ1bml0U29ydGluZ1wiXSA9PSBcImFzY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9vdGhlcnMvYXNjLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI0JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCJ+L290aGVycy9ub19zb3J0aW5nLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI0JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgfSksXG4gICAgICAgICAgX2MoXCJ2LXRlbXBsYXRlXCIsIHtcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlZi5pdGVtXG4gICAgICAgICAgICAgICAgICB2YXIgJGluZGV4ID0gcmVmLiRpbmRleFxuICAgICAgICAgICAgICAgICAgdmFyICRldmVuID0gcmVmLiRldmVuXG4gICAgICAgICAgICAgICAgICB2YXIgJG9kZCA9IHJlZi4kb2RkXG4gICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogaXRlbS5pZCA9PSBfdm0uaXRlbVNlbGVjdGVkID8gXCJzZWxlY3RlZFwiIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgb3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IF92bS5jb252ZXJ0RGF0ZShpdGVtLmRhdGEpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IGl0ZW0udW5pZGFkZV9jdXJyaWN1bGFyIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcIlN0YWNrTGF5b3V0XCIsIHsgc3RhdGljQ2xhc3M6IFwiaHJcIiB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdKVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJTdGFja0xheW91dFwiLFxuICAgIHsgc3RhdGljU3R5bGU6IHsgaG9yaXpBbGlnbjogXCJjZW50ZXJcIiB9IH0sXG4gICAgW1xuICAgICAgX3ZtLmJ1c3lcbiAgICAgICAgPyBfYyhcIkFjdGl2aXR5SW5kaWNhdG9yXCIsIHsgYXR0cnM6IHsgYnVzeTogX3ZtLmJ1c3kgfSB9KVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLmJ1c3lcbiAgICAgICAgPyBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IF92bS5idXN5VGV4dCwgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIiB9XG4gICAgICAgICAgfSlcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF9jKFxuICAgICAgICBcIlJhZExpc3RWaWV3XCIsXG4gICAgICAgIHtcbiAgICAgICAgICByZWY6IFwibGlzdF9jbGFzc2lmaWNhdGlvbnNcIixcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0XCIsXG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIGhlaWdodDogXCI4NSVcIixcbiAgICAgICAgICAgIGxvYWRPbkRlbWFuZE1vZGU6IFwiQXV0b1wiLFxuICAgICAgICAgICAgbG9hZE9uRGVtYW5kQnVmZmVyU2l6ZTogXCIyXCIsXG4gICAgICAgICAgICBwdWxsVG9SZWZyZXNoOiBcInRydWVcIixcbiAgICAgICAgICAgIGl0ZW1zOiBfdm0uY2xhc3NpZmljYXRpb25zLFxuICAgICAgICAgICAgXCIrYWxpYXNcIjogXCJjbGFzc2lmaWNhdGlvblwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgaXRlbVRhcDogX3ZtLm9uQ2xhc3NpZmljYXRpb25UYXAsXG4gICAgICAgICAgICBsb2FkTW9yZURhdGFSZXF1ZXN0ZWQ6IF92bS5vbkxvYWRNb3JlSXRlbXNSZXF1ZXN0ZWQsXG4gICAgICAgICAgICBwdWxsVG9SZWZyZXNoSW5pdGlhdGVkOiBfdm0ucmVmcmVzaFRhYmxlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ2LXRlbXBsYXRlXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IG5hbWU6IFwiaGVhZGVyXCIgfSxcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgY2xhc3NpZmljYXRpb24gPSByZWYuY2xhc3NpZmljYXRpb25cbiAgICAgICAgICAgICAgICAgIHZhciAkaW5kZXggPSByZWYuJGluZGV4XG4gICAgICAgICAgICAgICAgICB2YXIgJGV2ZW4gPSByZWYuJGV2ZW5cbiAgICAgICAgICAgICAgICAgIHZhciAkb2RkID0gcmVmLiRvZGRcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93czogXCJhdXRvXCIsIGNvbHVtbnM6IFwiKiwqXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogXCJhdXRvLGF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQ29udGXDumRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgdGFwOiBfdm0uY2hhbmdlU29ydGluZ0NvbnRlbnQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc29ydGluZ0NsYXNzaWZpY2F0aW9uc1tcImNvbnRlbnRTb3J0aW5nXCJdID09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIn4vb3RoZXJzL2Rlc2MucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjUlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5zb3J0aW5nQ2xhc3NpZmljYXRpb25zW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb250ZW50U29ydGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSA9PSBcImFzY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9vdGhlcnMvYXNjLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI1JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCJ+L290aGVycy9ub19zb3J0aW5nLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI1JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFwiYXV0byxhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkNsYXNzaWZpY2HDp8Ojb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IHRhcDogX3ZtLmNoYW5nZVNvcnRpbmdDbGFzc2lmaWNhdGlvbiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zb3J0aW5nQ2xhc3NpZmljYXRpb25zW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzaWZpY2F0aW9uU29ydGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdID09IFwiZGVzY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9vdGhlcnMvZGVzYy5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNSVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLnNvcnRpbmdDbGFzc2lmaWNhdGlvbnNbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzaWZpY2F0aW9uU29ydGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSA9PSBcImFzY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwifi9vdGhlcnMvYXNjLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI1JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCJ+L290aGVycy9ub19zb3J0aW5nLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI1JVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgfSksXG4gICAgICAgICAgX2MoXCJ2LXRlbXBsYXRlXCIsIHtcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgY2xhc3NpZmljYXRpb24gPSByZWYuY2xhc3NpZmljYXRpb25cbiAgICAgICAgICAgICAgICAgIHZhciAkaW5kZXggPSByZWYuJGluZGV4XG4gICAgICAgICAgICAgICAgICB2YXIgJGV2ZW4gPSByZWYuJGV2ZW5cbiAgICAgICAgICAgICAgICAgIHZhciAkb2RkID0gcmVmLiRvZGRcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzaWZpY2F0aW9uLmlkID09IF92bS5pdGVtU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJzZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogY2xhc3NpZmljYXRpb24uY29udGV1ZG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI3NSVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2lmaWNhdGlvbi52YWxvciA9PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIk4vRFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjbGFzc2lmaWNhdGlvbi52YWxvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcIlN0YWNrTGF5b3V0XCIsIHsgc3RhdGljQ2xhc3M6IFwiaHJcIiB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdKVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfYyhcIkJ1dHRvblwiLCB7XG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgdGV4dDogXCJWZXIgbGlzdGEgZGUgYXVsYXNcIixcbiAgICAgICAgICB3aWR0aDogXCI1MCVcIixcbiAgICAgICAgICBmb250U2l6ZTogXCIxNVwiLFxuICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcImJvdHRvbVwiLFxuICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwiY2VudGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgb246IHsgdGFwOiBfdm0uY2hvb3NlQ2xhc3MgfVxuICAgICAgfSlcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJHcmlkTGF5b3V0XCIsXG4gICAge1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgcm93czogXCIqXCIsXG4gICAgICAgIGNvbHVtbnM6IFwiKlwiLFxuICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudDogXCJjZW50ZXJcIlxuICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAge1xuICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgIHdpZHRoOiBcIjkwJVwiLFxuICAgICAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ6IFwidG9wXCIsXG4gICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcImNlbnRlclwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sdW1uczogXCIqXCIsIHJvd3M6IFwiYXV0byxhdXRvXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfdm0uYnVzeVxuICAgICAgICAgICAgICAgID8gX2MoXCJBY3Rpdml0eUluZGljYXRvclwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGJ1c3k6IF92bS5idXN5LCByb3c6IFwiMFwiLCBjb2w6IFwiMFwiIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgX3ZtLmJ1c3lcbiAgICAgICAgICAgICAgICA/IF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS5idXN5VGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGNvbG9yOiBcInJlZFwiLCBtYXJnaW5Ub3A6IFwiMSVcIiB9LFxuICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogXCIqIENhbXBvcyBvYnJpZ2F0w7NyaW9zXCIgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IG1hcmdpblRvcDogXCIxJVwiIH0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7IGNvbHVtbnM6IFwiKlwiLCByb3dzOiBcImF1dG8sYXV0b1wiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwgeyBhdHRyczogeyB0ZXh0OiBcIlByb2Zlc3NvcihhKVwiLCBmb250U2l6ZTogXCIxNVwiIH0gfSksXG4gICAgICAgICAgICAgIF9jKFwiVGV4dEZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgZWRpdGFibGU6IFwiZmFsc2VcIixcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE1XCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS50ZWFjaGVyX25hbWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLnRlYWNoZXJfbmFtZSA9ICRldmVudC52YWx1ZVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyBjb2x1bW5zOiBcIipcIiwgcm93czogXCJhdXRvLGF1dG9cIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIiwgcm93OiBcIjBcIiwgY29sOiBcIjBcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7IGF0dHJzOiB7IHRleHQ6IFwiRGF0YVwiLCBmb250U2l6ZTogXCIxNVwiIH0gfSksXG4gICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgY29sb3I6IFwicmVkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogXCIgKlwiLCBmb250U2l6ZTogXCIxNVwiIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF9jKFwiVGV4dEZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaGludDogXCJEYXRhXCIsXG4gICAgICAgICAgICAgICAgICBlZGl0YWJsZTogXCJmYWxzZVwiLFxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTVcIixcbiAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLmRhdGVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm9wZW5EYXRlKClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmRhdGUgPSAkZXZlbnQudmFsdWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sdW1uczogXCIqXCIsIHJvd3M6IFwiYXV0byxhdXRvXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyBvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIsIHJvdzogXCIwXCIsIGNvbDogXCIwXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBcIkhvcmEgZGUgaW7DrWNpb1wiLCBmb250U2l6ZTogXCIxNVwiIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGNvbG9yOiBcInJlZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IFwiICpcIiwgZm9udFNpemU6IFwiMTVcIiB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiSG9yYSBkZSBpbsOtY2lvXCIsXG4gICAgICAgICAgICAgICAgICBlZGl0YWJsZTogXCJmYWxzZVwiLFxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTVcIixcbiAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLmhvdXJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm9wZW5UaW1lKClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmhvdXIgPSAkZXZlbnQudmFsdWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sdW1uczogXCIqXCIsIHJvd3M6IFwiYXV0byxhdXRvXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyBvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIsIHJvdzogXCIwXCIsIGNvbDogXCIwXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwgeyBhdHRyczogeyB0ZXh0OiBcIkFzc3VudG9cIiwgZm9udFNpemU6IFwiMTVcIiB9IH0pLFxuICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGNvbG9yOiBcInJlZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IFwiICpcIiwgZm9udFNpemU6IFwiMTVcIiB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiQXNzdW50b1wiLFxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTVcIixcbiAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLnN1YmplY3RcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLnN1YmplY3QgPSAkZXZlbnQudmFsdWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sdW1uczogXCIqXCIsIHJvd3M6IFwiYXV0byxhdXRvXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBcIkRlc2NyacOnw6NvXCIsIGZvbnRTaXplOiBcIjE1XCIsIHJvdzogXCIwXCIsIGNvbDogXCIwXCIgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJUZXh0Vmlld1wiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiRGVzY3Jpw6fDo29cIixcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE1XCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS5kZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHRleHRDaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdm0uZGVzY3JpcHRpb24gPSAkZXZlbnQudmFsdWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sdW1uczogXCIqXCIsIHJvd3M6IFwiYXV0byxhdXRvXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyBvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIsIHJvdzogXCIwXCIsIGNvbDogXCIwXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBcIlVuaWRhZGUgQ3VycmljdWxhclwiLCBmb250U2l6ZTogXCIxNVwiIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGNvbG9yOiBcInJlZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IFwiICpcIiwgZm9udFNpemU6IFwiMTVcIiB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfYyhcIkRyb3BEb3duXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZToge1xuICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTVweFwiLFxuICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjIlXCIsXG4gICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiBcIjUlXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBpdGVtczogX3ZtLmNvdXJzZV91bml0c19uYW1lLFxuICAgICAgICAgICAgICAgICAgaGludDogXCJVbmlkYWRlIEN1cnJpY3VsYXJcIixcbiAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjFcIixcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7IHNlbGVjdGVkSW5kZXhDaGFuZ2VkOiBfdm0uY2hhbmdlVW5pdCB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF9jKFxuICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAge1xuICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICBjb2x1bW5zOiBcIiosKlwiLFxuICAgICAgICAgICAgcm93czogXCJhdXRvXCIsXG4gICAgICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudDogXCJib3R0b21cIixcbiAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICBjb2w6IFwiMFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJCdXR0b25cIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgdGV4dDogXCJFc2NvbGhlciBvdXRybyBwcm9mZXNzb3JcIixcbiAgICAgICAgICAgICAgd2lkdGg6IFwiNDUlXCIsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE1XCIsXG4gICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcImJvdHRvbVwiLFxuICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcImxlZnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uOiB7IHRhcDogX3ZtLmNob29zZVRlYWNoZXIgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF9jKFwiQnV0dG9uXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiTWFyY2FyIFR1dG9yaWFcIixcbiAgICAgICAgICAgICAgd2lkdGg6IFwiNDUlXCIsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiBcIjE1XCIsXG4gICAgICAgICAgICAgIGNvbDogXCIxXCIsXG4gICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcImJvdHRvbVwiLFxuICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcInJpZ2h0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjogeyB0YXA6IF92bS5yZWdpc3RlciB9XG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgW1xuICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgIHN0YXRpY1N0eWxlOiB7IG1hcmdpblRvcDogXCI1JVwiLCBtYXJnaW5Cb3R0b206IFwiNSVcIiB9LFxuICAgICAgICBhdHRyczoge1xuICAgICAgICAgIHRleHQ6IFwiU2VsZWNpb25lIG8gcHJvZmVzc29yKGEpIGNvbSBxdWUgZGVzZWphIG1hcmNhciB1bWEgdHV0b3JpYVwiLFxuICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgZm9udFNpemU6IFwiMTNcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIF92bS5idXN5XG4gICAgICAgID8gX2MoXCJBY3Rpdml0eUluZGljYXRvclwiLCB7IGF0dHJzOiB7IGJ1c3k6IF92bS5idXN5IH0gfSlcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5idXN5XG4gICAgICAgID8gX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBfdm0uYnVzeVRleHQsIGhvcml6b250YWxBbGlnbm1lbnQ6IFwiY2VudGVyXCIgfVxuICAgICAgICAgIH0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfYyhcbiAgICAgICAgXCJSYWRMaXN0Vmlld1wiLFxuICAgICAgICB7XG4gICAgICAgICAgcmVmOiBcImxpc3RfdGVhY2hlcnNcIixcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgICAgIGxvYWRPbkRlbWFuZE1vZGU6IFwiQXV0b1wiLFxuICAgICAgICAgICAgbG9hZE9uRGVtYW5kQnVmZmVyU2l6ZTogXCIyXCIsXG4gICAgICAgICAgICBwdWxsVG9SZWZyZXNoOiBcInRydWVcIixcbiAgICAgICAgICAgIGl0ZW1zOiBfdm0udGVhY2hlcnMsXG4gICAgICAgICAgICBcIithbGlhc1wiOiBcInRlYWNoZXJcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIGl0ZW1UYXA6IF92bS5vblRlYWNoZXJUYXAsXG4gICAgICAgICAgICBsb2FkTW9yZURhdGFSZXF1ZXN0ZWQ6IF92bS5vbkxvYWRNb3JlSXRlbXNSZXF1ZXN0ZWQsXG4gICAgICAgICAgICBwdWxsVG9SZWZyZXNoSW5pdGlhdGVkOiBfdm0ucmVmcmVzaFRhYmxlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ2LXRlbXBsYXRlXCIsIHtcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdGVhY2hlciA9IHJlZi50ZWFjaGVyXG4gICAgICAgICAgICAgICAgICB2YXIgJGluZGV4ID0gcmVmLiRpbmRleFxuICAgICAgICAgICAgICAgICAgdmFyICRldmVuID0gcmVmLiRldmVuXG4gICAgICAgICAgICAgICAgICB2YXIgJG9kZCA9IHJlZi4kb2RkXG4gICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBvcmllbnRhdGlvbjogXCJ2ZXJ0aWNhbFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogdGVhY2hlci5wcm9mZXNzb3Jfbm9tZSwgZm9udFNpemU6IFwiMTVcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKHRlYWNoZXIudWNzLCBmdW5jdGlvbih1Yykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiB1Yy5pZCwgYXR0cnM6IHsgb3JpZW50YXRpb246IFwidmVydGljYWxcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHsgYXR0cnM6IHsgdGV4dDogdWMubm9tZSB9IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHsgYXR0cnM6IHsgdGV4dDogdWMuYW5vTGV0aXZvIH0gfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IHVjLnNlbWVzdHJlICsgXCLCuiBTZW1lc3RyZVwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJTdGFja0xheW91dFwiLCB7IHN0YXRpY0NsYXNzOiBcImhyXCIgfSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLnNjc3NcIjogXCIuL2FwcC5zY3NzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIHsgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIGlkO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi8gc3luYyBeXFxcXC5cXFxcL2FwcFxcXFwuKGNzc3xzY3NzfGxlc3N8c2FzcykkXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC5qc1wiOiBcIi4vYXBwLmpzXCIsXG5cdFwiLi9hcHAuc2Nzc1wiOiBcIi4vYXBwLnNjc3NcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgeyAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gaWQ7XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLyBzeW5jIHJlY3Vyc2l2ZSAoPzwhXFxcXGJBcHBfUmVzb3VyY2VzXFxcXGIuKikoPzwhXFxcXC5cXFxcL1xcXFxidGVzdHNcXFxcYlxcXFwvLio/KVxcXFwuKHhtbHxjc3N8anN8a3R8KD88IVxcXFwuZFxcXFwuKXRzfCg/PCFcXFxcYl9bXFxcXHctXSpcXFxcLilzY3NzKSRcIjsiLCJpbXBvcnQgVnVlIGZyb20gXCJuYXRpdmVzY3JpcHQtdnVlXCI7XG5cbmltcG9ydCBSYWRTaWRlRHJhd2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci92dWVcIjtcblZ1ZS51c2UoUmFkU2lkZURyYXdlcik7XG5cbmltcG9ydCBWdWV4IGZyb20gJ3Z1ZXgnO1xuVnVlLnVzZShWdWV4KTtcblxuaW1wb3J0IFJhZExpc3RWaWV3IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1saXN0dmlldy92dWUnO1xuVnVlLnVzZShSYWRMaXN0Vmlldyk7XG5cbmNvbnN0IGh0dHBNb2R1bGUgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9odHRwXCIpO1xuY29uc3QgbW9kYWxQaWNrZXIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCIpLk1vZGFsRGF0ZXRpbWVwaWNrZXI7XG5cbnJlcXVpcmUgKFwibmF0aXZlc2NyaXB0LWxvY2FsLW5vdGlmaWNhdGlvbnNcIik7XG5pbXBvcnQgeyBMb2NhbE5vdGlmaWNhdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2FsLW5vdGlmaWNhdGlvbnNcIjtcblxuaW1wb3J0IHsgYW5kcm9pZCAsIEFuZHJvaWRBcHBsaWNhdGlvbiB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybSc7XG5cbmNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFZ1ZXguU3RvcmUoe1xuICAgIHN0YXRlOiB7XG4gICAgICAgIGh0dHA6IGh0dHBNb2R1bGUsXG4gICAgICAgIG1vZGFsUGlja2VyOiBtb2RhbFBpY2tlcixcbiAgICAgICAgbm90aWZpY2F0aW9uczogTG9jYWxOb3RpZmljYXRpb25zLFxuICAgICAgICBhbmRyb2lkOiBhbmRyb2lkLFxuICAgICAgICBhbmRyb2lkQXBwOiBBbmRyb2lkQXBwbGljYXRpb24sXG4gICAgICAgIGlzQW5kcm9pZDogaXNBbmRyb2lkLFxuICAgICAgICBhcHBTZXR0aW5nczogYXBwU2V0dGluZ3MsXG4gICAgICAgIHVzZXI6IG51bGwsXG4gICAgICAgIGxvZ2luUGVybWFuZW50OiBudWxsXG4gICAgfSxcbiAgICBtdXRhdGlvbnM6IHtcbiAgICAgICAgZGVmaW5lVXNlcihzdGF0ZSwgdXNlcikge1xuICAgICAgICAgICAgc3RhdGUudXNlciA9IHVzZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3lVc2VyKHN0YXRlKSB7XG4gICAgICAgICAgICBzdGF0ZS51c2VyID0gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgZGVmaW5lTG9naW4oc3RhdGUsIGxvZ2luUGVybWFuZW50KSB7XG4gICAgICAgICAgICBzdGF0ZS5sb2dpblBlcm1hbmVudCA9IGxvZ2luUGVybWFuZW50O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXR0ZXJzOiB7XG4gICAgICAgIGlzTG9nZ2VkSW4oc3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS51c2VyICE9IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGlzTG9naW5QZXJtYW5lbnQoc3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5sb2dpblBlcm1hbmVudDtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5pbXBvcnQgbG9naW5QYWdlIGZyb20gXCIuL2NvbXBvbmVudHMvbG9naW5QYWdlXCI7XG5pbXBvcnQgbWFpblBhZ2UgZnJvbSBcIn4vY29tcG9uZW50cy9tYWluUGFnZVwiO1xuXG5pbXBvcnQgaW5pdGlhbFBhZ2UgZnJvbSBcIi4vY29tcG9uZW50cy9pbml0aWFsUGFnZVwiO1xuVnVlLmNvbXBvbmVudCgnaW5pdGlhbC1wYWdlJywgaW5pdGlhbFBhZ2UpO1xuaW1wb3J0IHByZXZpb3VzQ2xhc3Nlc1BhZ2UgZnJvbSBcIi4vY29tcG9uZW50cy9wcmV2aW91c0NsYXNzZXNQYWdlXCI7XG5WdWUuY29tcG9uZW50KCdwcmV2aW91cy1jbGFzc2VzLXBhZ2UnLCBwcmV2aW91c0NsYXNzZXNQYWdlKTtcbmltcG9ydCBzY2hlZHVsZVR1dG9yaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvc2NoZWR1bGVUdXRvcmluZ1wiO1xuVnVlLmNvbXBvbmVudCgnc2NoZWR1bGUtdHV0b3JpbmcnLCBzY2hlZHVsZVR1dG9yaW5nKTtcbmltcG9ydCByZWdpc3RlclR1dG9yaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvcmVnaXN0ZXJUdXRvcmluZ1wiO1xuVnVlLmNvbXBvbmVudCgncmVnaXN0ZXItdHV0b3JpbmcnLCByZWdpc3RlclR1dG9yaW5nKTtcbmltcG9ydCBsaXN0VHV0b3JpYWxzIGZyb20gXCIuL2NvbXBvbmVudHMvbGlzdFR1dG9yaWFsc1wiO1xuVnVlLmNvbXBvbmVudCgnbGlzdC10dXRvcmlhbHMnLCBsaXN0VHV0b3JpYWxzKTtcbmltcG9ydCBlZGl0VHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy9lZGl0VHV0b3JpYWxcIjtcblZ1ZS5jb21wb25lbnQoJ2VkaXQtdHV0b3JpYWwnLCBlZGl0VHV0b3JpYWwpO1xuaW1wb3J0IGxpc3RBcmNoaXZlZFR1dG9yaWFscyBmcm9tIFwiLi9jb21wb25lbnRzL2xpc3RBcmNoaXZlZFR1dG9yaWFsc1wiO1xuVnVlLmNvbXBvbmVudCgnbGlzdC1hcmNoaXZlZC10dXRvcmlhbHMnLCBsaXN0QXJjaGl2ZWRUdXRvcmlhbHMpO1xuaW1wb3J0IHByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZSBmcm9tIFwiLi9jb21wb25lbnRzL3ByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZVwiO1xuVnVlLmNvbXBvbmVudCgncHJldmlvdXMtY2xhc3NpZmljYXRpb25zLXBhZ2UnLCBwcmV2aW91c0NsYXNzaWZpY2F0aW9uc1BhZ2UpO1xuXG5WdWUucmVnaXN0ZXJFbGVtZW50KFxuICAgICdDaGVja0JveCcsXG4gICAgKCkgPT4gcmVxdWlyZSgnQG5zdHVkaW8vbmF0aXZlc2NyaXB0LWNoZWNrYm94JykuQ2hlY2tCb3gsXG4gICAge1xuICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgcHJvcDogJ2NoZWNrZWQnLFxuICAgICAgICAgICAgZXZlbnQ6ICdjaGVja2VkQ2hhbmdlJ1xuICAgICAgICB9XG4gICAgfVxuKTtcblxuVnVlLnJlZ2lzdGVyRWxlbWVudChcbiAgICAnRHJvcERvd24nLFxuICAgICgpID0+IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1kcm9wLWRvd24vZHJvcC1kb3duJykuRHJvcERvd25cbik7XG5cbmxldCBmaXJzdFBhZ2U7XG5cbm5ldyBWdWUoe1xuICAgIHJlbmRlcjogaCA9PiBoKCdmcmFtZScsIFtoKGZpcnN0UGFnZSldKSxcbiAgICBzdG9yZTogc3RvcmUsXG4gICAgY3JlYXRlZCgpe1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2RlZmluZUxvZ2luJywgdGhpcy4kc3RvcmUuc3RhdGUuYXBwU2V0dGluZ3MuaGFzS2V5KFwiaWRcIikpO1xuICAgICAgICBpZih0aGlzLiRzdG9yZS5nZXR0ZXJzLmlzTG9naW5QZXJtYW5lbnQpe1xuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KFwiZGVmaW5lVXNlclwiLCB7aWQ6IHRoaXMuJHN0b3JlLnN0YXRlLmFwcFNldHRpbmdzLmdldE51bWJlcihcImlkXCIpLCBub21lOiB0aGlzLiRzdG9yZS5zdGF0ZS5hcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJub21lXCIpLCBudW1lcm86IHRoaXMuJHN0b3JlLnN0YXRlLmFwcFNldHRpbmdzLmdldE51bWJlcihcIm51bWVyb1wiKX0pO1xuICAgICAgICB9XG4gICAgICAgIGZpcnN0UGFnZSA9IHRoaXMuJHN0b3JlLmdldHRlcnMuaXNMb2dpblBlcm1hbmVudCA/IG1haW5QYWdlIDogbG9naW5QYWdlO1xuICAgIH1cbn0pLiRzdGFydCgpO1xuIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9jbGFzc1BhZ2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRkYWI4NDA4JnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL2NsYXNzUGFnZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL2NsYXNzUGFnZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vY2xhc3NQYWdlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTRkYWI4NDA4JnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI0ZGFiODQwOFwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9zbWFydGZlZWRiYWNrL0RvY3VtZW50cy9TbWFydEZlZWRiYWNrL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc0ZGFiODQwOCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc0ZGFiODQwOCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vY2xhc3NQYWdlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00ZGFiODQwOCZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc0ZGFiODQwOCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiY29tcG9uZW50cy9jbGFzc1BhZ2UudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2NsYXNzUGFnZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9jbGFzc1BhZ2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL3N0eWxlLWhvdC1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9hcHBseS1jc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTMtMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9jbGFzc1BhZ2UudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NGRhYjg0MDgmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vY2xhc3NQYWdlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTRkYWI4NDA4JnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2NsYXNzUGFnZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGRhYjg0MDgmc2NvcGVkPXRydWUmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL2VkaXRUdXRvcmlhbC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTliMWJhNDMmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vZWRpdFR1dG9yaWFsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vZWRpdFR1dG9yaWFsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9lZGl0VHV0b3JpYWwudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NTliMWJhNDMmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjU5YjFiYTQzXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3NtYXJ0ZmVlZGJhY2svRG9jdW1lbnRzL1NtYXJ0RmVlZGJhY2svbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzU5YjFiYTQzJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzU5YjFiYTQzJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9lZGl0VHV0b3JpYWwudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTU5YjFiYTQzJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzU5YjFiYTQzJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL2VkaXRUdXRvcmlhbC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vZWRpdFR1dG9yaWFsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2VkaXRUdXRvcmlhbC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMy0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2VkaXRUdXRvcmlhbC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD01OWIxYmE0MyZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL3N0eWxlLWhvdC1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9hcHBseS1jc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTMtMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9lZGl0VHV0b3JpYWwudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NTliMWJhNDMmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vZWRpdFR1dG9yaWFsLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01OWIxYmE0MyZzY29wZWQ9dHJ1ZSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vaW5pdGlhbFBhZ2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWRmMDBiNmYwJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL2luaXRpYWxQYWdlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vaW5pdGlhbFBhZ2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL2luaXRpYWxQYWdlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWRmMDBiNmYwJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCJkZjAwYjZmMFwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9zbWFydGZlZWRiYWNrL0RvY3VtZW50cy9TbWFydEZlZWRiYWNrL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCdkZjAwYjZmMCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCdkZjAwYjZmMCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vaW5pdGlhbFBhZ2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWRmMDBiNmYwJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJ2RmMDBiNmYwJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL2luaXRpYWxQYWdlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9pbml0aWFsUGFnZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9pbml0aWFsUGFnZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMy0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2luaXRpYWxQYWdlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWRmMDBiNmYwJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMy0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2luaXRpYWxQYWdlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWRmMDBiNmYwJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2luaXRpYWxQYWdlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1kZjAwYjZmMCZzY29wZWQ9dHJ1ZSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vbGlzdEFyY2hpdmVkVHV0b3JpYWxzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03YmYzMzUyYyZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9saXN0QXJjaGl2ZWRUdXRvcmlhbHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9saXN0QXJjaGl2ZWRUdXRvcmlhbHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL2xpc3RBcmNoaXZlZFR1dG9yaWFscy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD03YmYzMzUyYyZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiN2JmMzM1MmNcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvc21hcnRmZWVkYmFjay9Eb2N1bWVudHMvU21hcnRGZWVkYmFjay9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnN2JmMzM1MmMnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnN2JmMzM1MmMnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL2xpc3RBcmNoaXZlZFR1dG9yaWFscy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2JmMzM1MmMmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignN2JmMzM1MmMnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvbGlzdEFyY2hpdmVkVHV0b3JpYWxzLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9saXN0QXJjaGl2ZWRUdXRvcmlhbHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbGlzdEFyY2hpdmVkVHV0b3JpYWxzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbGlzdEFyY2hpdmVkVHV0b3JpYWxzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTdiZjMzNTJjJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMy0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2xpc3RBcmNoaXZlZFR1dG9yaWFscy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD03YmYzMzUyYyZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9saXN0QXJjaGl2ZWRUdXRvcmlhbHMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdiZjMzNTJjJnNjb3BlZD10cnVlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9saXN0VHV0b3JpYWxzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wMTdjODVhOCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9saXN0VHV0b3JpYWxzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vbGlzdFR1dG9yaWFscy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vbGlzdFR1dG9yaWFscy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wMTdjODVhOCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMDE3Yzg1YThcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvc21hcnRmZWVkYmFjay9Eb2N1bWVudHMvU21hcnRGZWVkYmFjay9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMDE3Yzg1YTgnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMDE3Yzg1YTgnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL2xpc3RUdXRvcmlhbHMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTAxN2M4NWE4JnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzAxN2M4NWE4Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL2xpc3RUdXRvcmlhbHMudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2xpc3RUdXRvcmlhbHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbGlzdFR1dG9yaWFscy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMy0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2xpc3RUdXRvcmlhbHMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MDE3Yzg1YTgmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbGlzdFR1dG9yaWFscy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wMTdjODVhOCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9saXN0VHV0b3JpYWxzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wMTdjODVhOCZzY29wZWQ9dHJ1ZSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vbG9naW5QYWdlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD02MDAyMDJlZCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9sb2dpblBhZ2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9sb2dpblBhZ2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL2xvZ2luUGFnZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD02MDAyMDJlZCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNjAwMjAyZWRcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvc21hcnRmZWVkYmFjay9Eb2N1bWVudHMvU21hcnRGZWVkYmFjay9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNjAwMjAyZWQnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNjAwMjAyZWQnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL2xvZ2luUGFnZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NjAwMjAyZWQmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNjAwMjAyZWQnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvbG9naW5QYWdlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9sb2dpblBhZ2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbG9naW5QYWdlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbG9naW5QYWdlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTYwMDIwMmVkJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMy0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2xvZ2luUGFnZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD02MDAyMDJlZCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9sb2dpblBhZ2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTYwMDIwMmVkJnNjb3BlZD10cnVlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9tYWluUGFnZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NmZmODE4MjMmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vbWFpblBhZ2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9tYWluUGFnZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vbWFpblBhZ2UudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NmZmODE4MjMmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjZmZjgxODIzXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3NtYXJ0ZmVlZGJhY2svRG9jdW1lbnRzL1NtYXJ0RmVlZGJhY2svbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzZmZjgxODIzJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzZmZjgxODIzJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9tYWluUGFnZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NmZmODE4MjMmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNmZmODE4MjMnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvbWFpblBhZ2UudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL21haW5QYWdlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL21haW5QYWdlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbWFpblBhZ2UudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NmZmODE4MjMmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbWFpblBhZ2UudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NmZmODE4MjMmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbWFpblBhZ2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTZmZjgxODIzJnNjb3BlZD10cnVlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9wcmV2aW91c0NsYXNzZXNQYWdlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xYmM0ZjMxYSZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9wcmV2aW91c0NsYXNzZXNQYWdlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vcHJldmlvdXNDbGFzc2VzUGFnZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vcHJldmlvdXNDbGFzc2VzUGFnZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0xYmM0ZjMxYSZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMWJjNGYzMWFcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvc21hcnRmZWVkYmFjay9Eb2N1bWVudHMvU21hcnRGZWVkYmFjay9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMWJjNGYzMWEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMWJjNGYzMWEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL3ByZXZpb3VzQ2xhc3Nlc1BhZ2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTFiYzRmMzFhJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzFiYzRmMzFhJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL3ByZXZpb3VzQ2xhc3Nlc1BhZ2UudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3ByZXZpb3VzQ2xhc3Nlc1BhZ2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcHJldmlvdXNDbGFzc2VzUGFnZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMy0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3ByZXZpb3VzQ2xhc3Nlc1BhZ2UudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MWJjNGYzMWEmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcHJldmlvdXNDbGFzc2VzUGFnZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0xYmM0ZjMxYSZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9wcmV2aW91c0NsYXNzZXNQYWdlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xYmM0ZjMxYSZzY29wZWQ9dHJ1ZSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vcHJldmlvdXNDbGFzc2lmaWNhdGlvbnNQYWdlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1hNTA2Y2FjYyZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9wcmV2aW91c0NsYXNzaWZpY2F0aW9uc1BhZ2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9wcmV2aW91c0NsYXNzaWZpY2F0aW9uc1BhZ2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL3ByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1hNTA2Y2FjYyZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiYTUwNmNhY2NcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvc21hcnRmZWVkYmFjay9Eb2N1bWVudHMvU21hcnRGZWVkYmFjay9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnYTUwNmNhY2MnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnYTUwNmNhY2MnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL3ByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YTUwNmNhY2Mmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignYTUwNmNhY2MnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvcHJldmlvdXNDbGFzc2lmaWNhdGlvbnNQYWdlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9wcmV2aW91c0NsYXNzaWZpY2F0aW9uc1BhZ2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcHJldmlvdXNDbGFzc2lmaWNhdGlvbnNQYWdlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcHJldmlvdXNDbGFzc2lmaWNhdGlvbnNQYWdlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWE1MDZjYWNjJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMy0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3ByZXZpb3VzQ2xhc3NpZmljYXRpb25zUGFnZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1hNTA2Y2FjYyZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9wcmV2aW91c0NsYXNzaWZpY2F0aW9uc1BhZ2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWE1MDZjYWNjJnNjb3BlZD10cnVlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9yZWdpc3RlclR1dG9yaW5nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZjQ3MWU2YSZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9yZWdpc3RlclR1dG9yaW5nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vcmVnaXN0ZXJUdXRvcmluZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vcmVnaXN0ZXJUdXRvcmluZy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0zZjQ3MWU2YSZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiM2Y0NzFlNmFcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvc21hcnRmZWVkYmFjay9Eb2N1bWVudHMvU21hcnRGZWVkYmFjay9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnM2Y0NzFlNmEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnM2Y0NzFlNmEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL3JlZ2lzdGVyVHV0b3JpbmcudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNmNDcxZTZhJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzNmNDcxZTZhJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL3JlZ2lzdGVyVHV0b3JpbmcudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3JlZ2lzdGVyVHV0b3JpbmcudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcmVnaXN0ZXJUdXRvcmluZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMy0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3JlZ2lzdGVyVHV0b3JpbmcudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9M2Y0NzFlNmEmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcmVnaXN0ZXJUdXRvcmluZy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0zZjQ3MWU2YSZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9yZWdpc3RlclR1dG9yaW5nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZjQ3MWU2YSZzY29wZWQ9dHJ1ZSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vc2NoZWR1bGVUdXRvcmluZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDAzNzM0NWUmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vc2NoZWR1bGVUdXRvcmluZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL3NjaGVkdWxlVHV0b3JpbmcudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL3NjaGVkdWxlVHV0b3JpbmcudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDAzNzM0NWUmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjQwMzczNDVlXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3NtYXJ0ZmVlZGJhY2svRG9jdW1lbnRzL1NtYXJ0RmVlZGJhY2svbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzQwMzczNDVlJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzQwMzczNDVlJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9zY2hlZHVsZVR1dG9yaW5nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00MDM3MzQ1ZSZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc0MDM3MzQ1ZScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiY29tcG9uZW50cy9zY2hlZHVsZVR1dG9yaW5nLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9zY2hlZHVsZVR1dG9yaW5nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3NjaGVkdWxlVHV0b3JpbmcudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL3N0eWxlLWhvdC1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9hcHBseS1jc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTMtMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9zY2hlZHVsZVR1dG9yaW5nLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQwMzczNDVlJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMy0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3NjaGVkdWxlVHV0b3JpbmcudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDAzNzM0NWUmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vc2NoZWR1bGVUdXRvcmluZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDAzNzM0NWUmc2NvcGVkPXRydWUmXCIiXSwic291cmNlUm9vdCI6IiJ9