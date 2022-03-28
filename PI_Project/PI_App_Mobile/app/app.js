import Vue from "nativescript-vue";

import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
Vue.use(RadSideDrawer);

import Vuex from 'vuex';
Vue.use(Vuex);

import RadListView from 'nativescript-ui-listview/vue';
Vue.use(RadListView);

const httpModule = require("tns-core-modules/http");
const modalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;

require ("nativescript-local-notifications");
import { LocalNotifications } from "nativescript-local-notifications";

import { android , AndroidApplication } from 'tns-core-modules/application';
import { isAndroid } from 'tns-core-modules/platform';

const appSettings = require("tns-core-modules/application-settings");

const store = new Vuex.Store({
    state: {
        http: httpModule,
        modalPicker: modalPicker,
        notifications: LocalNotifications,
        android: android,
        androidApp: AndroidApplication,
        isAndroid: isAndroid,
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

import loginPage from "./components/loginPage";
import mainPage from "~/components/mainPage";

import initialPage from "./components/initialPage";
Vue.component('initial-page', initialPage);
import previousClassesPage from "./components/previousClassesPage";
Vue.component('previous-classes-page', previousClassesPage);
import scheduleTutoring from "./components/scheduleTutoring";
Vue.component('schedule-tutoring', scheduleTutoring);
import registerTutoring from "./components/registerTutoring";
Vue.component('register-tutoring', registerTutoring);
import listTutorials from "./components/listTutorials";
Vue.component('list-tutorials', listTutorials);
import editTutorial from "./components/editTutorial";
Vue.component('edit-tutorial', editTutorial);
import listArchivedTutorials from "./components/listArchivedTutorials";
Vue.component('list-archived-tutorials', listArchivedTutorials);
import previousClassificationsPage from "./components/previousClassificationsPage";
Vue.component('previous-classifications-page', previousClassificationsPage);

Vue.registerElement(
    'CheckBox',
    () => require('@nstudio/nativescript-checkbox').CheckBox,
    {
        model: {
            prop: 'checked',
            event: 'checkedChange'
        }
    }
);

Vue.registerElement(
    'DropDown',
    () => require('nativescript-drop-down/drop-down').DropDown
);

let firstPage;

new Vue({
    render: h => h('frame', [h(firstPage)]),
    store: store,
    created(){
        this.$store.commit('defineLogin', this.$store.state.appSettings.hasKey("id"));
        if(this.$store.getters.isLoginPermanent){
            this.$store.commit("defineUser", {id: this.$store.state.appSettings.getNumber("id"), nome: this.$store.state.appSettings.getString("nome"), numero: this.$store.state.appSettings.getNumber("numero")});
        }
        firstPage = this.$store.getters.isLoginPermanent ? mainPage : loginPage;
    }
}).$start();
