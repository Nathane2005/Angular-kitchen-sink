var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require("reflect-metadata");
require('twbs/bootstrap/css/bootstrap.css!');
require('./styles/style.css!');
var browser_1 = require('angular2/platform/browser');
var http_1 = require("angular2/http");
var App1_1 = require('../src/comps/app1/App1');
var App2_1 = require('../src/comps/app2/App2');
var App3_1 = require('../src/comps/app3/App3');
var core_1 = require('angular2/core');
var EntryPanel_1 = require('../src/comps/entry/EntryPanel');
var AppManager_1 = require('../src/comps/appmanager/AppManager');
var CommBroker_1 = require('../src/services/CommBroker');
var Filemenu_1 = require("../src/comps/filemenu/Filemenu");
var FilemenuItem_1 = require("../src/comps/filemenu/FilemenuItem");
var Logo_1 = require("./comps/logo/Logo");
var Footer_1 = require("./comps/footer/Footer");
var Conts_1 = require("../src/Conts");
var StyleService_1 = require("./styles/StyleService");
var router_1 = require('angular2/router');
var router_2 = require('angular2/router');
var angular2_redux_util_1 = require("angular2-redux-util");
var Lib_1 = require("./Lib");
var Observable_1 = require("rxjs/Observable");
require('rxjs/add/operator/map');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/observable/fromEvent');
var parts_reducer_1 = require("./comps/app3/starwars/reducers/parts-reducer");
var cart_reducer_1 = require("./comps/app3/starwars/reducers/cart-reducer");
var films_reducer_1 = require("./comps/app3/starwars/reducers/films-reducer");
var users_reducer_1 = require("./comps/app3/starwars/reducers/users-reducer");
var NotifyReducer_1 = require("./reducers/NotifyReducer");
var AppdbReducer_1 = require("./reducers/AppdbReducer");
var TodoReducer_1 = require("./comps/app1/todos/reducers/TodoReducer");
var AppdbAction_1 = require("./actions/AppdbAction");
var Welcome_1 = require("./comps/welcome/Welcome");
var App = (function () {
    function App(appStore, commBroker, styleService, appdbAction) {
        var _this = this;
        this.appStore = appStore;
        this.commBroker = commBroker;
        this.appdbAction = appdbAction;
        appStore.dispatch(appdbAction.appStartTime());
        this.m_styleService = styleService;
        this.commBroker.setService(Conts_1.Consts.Services().App, this);
        Observable_1.Observable.fromEvent(window, 'resize').debounceTime(250).subscribe(function () {
            _this.appResized();
        });
    }
    App.prototype.appResized = function () {
        var appHeight = document.body.clientHeight;
        var appWidth = document.body.clientWidth;
        jQuery(Conts_1.Consts.Elems().APP_NAVIGATOR_EVER).height(appHeight - 115);
        jQuery(Conts_1.Consts.Elems().APP_NAVIGATOR_WASP).height(appHeight - 115);
        jQuery(Conts_1.Consts.Clas().CLASS_APP_HEIGHT).height(appHeight - 420);
        jQuery('#mainPanelWrap').height(appHeight - 115);
        jQuery('#propPanel').height(appHeight - 130);
        this.commBroker.setValue(Conts_1.Consts.Values().APP_SIZE, { height: appHeight, width: appWidth });
        this.commBroker.fire({
            fromInstance: self,
            event: Conts_1.Consts.Events().WIN_SIZED,
            context: '',
            message: { height: appHeight, width: appWidth }
        });
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            encapsulation: core_1.ViewEncapsulation.Emulated,
            providers: [StyleService_1.StyleService, AppdbAction_1.AppdbAction],
            templateUrl: '/src/App.html',
            directives: [router_1.ROUTER_DIRECTIVES, router_2.RouterLink, Filemenu_1.Filemenu, FilemenuItem_1.FilemenuItem, Logo_1.Logo, Footer_1.Footer]
        }),
        router_2.RouteConfig([
            { path: "/", name: "root", redirectTo: ["/EntryPanelNoId/Login"], useAsDefault: true },
            { path: '/AppManager', component: AppManager_1.AppManager, as: 'AppManager' },
            { path: '/Welcome', component: Welcome_1.Welcome, as: 'Welcome' },
            { path: '/EntryPanelNoId/...', component: EntryPanel_1.EntryPanel, as: 'EntryPanelNoId' },
            { path: '/EntryPanel/:id/...', component: EntryPanel_1.EntryPanel, as: 'EntryPanel' },
            { path: '/Login/...', component: EntryPanel_1.EntryPanel, as: 'Login' },
            { path: '/ForgotPass/...', component: EntryPanel_1.EntryPanel, as: 'ForgotPass' },
            { path: '/App1/...', component: App1_1.App1, as: 'App1' },
            { path: '/App2', component: App2_1.App2, as: 'App2' },
            { path: '/App3', component: App3_1.App3, as: 'App3' },
        ]), 
        __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, CommBroker_1.CommBroker, StyleService_1.StyleService, AppdbAction_1.AppdbAction])
    ], App);
    return App;
})();
exports.App = App;
browser_1.bootstrap(App, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, http_1.JSONP_PROVIDERS,
    core_1.provide(angular2_redux_util_1.AppStore, { useFactory: Lib_1.Lib.StoreFactory({ notify: NotifyReducer_1.default, appdb: AppdbReducer_1.default, parts: parts_reducer_1.default, cart: cart_reducer_1.default, films: films_reducer_1.default, users: users_reducer_1.default, todos: TodoReducer_1.todos }) }),
    core_1.provide(CommBroker_1.CommBroker, { useClass: CommBroker_1.CommBroker }),
    core_1.provide(Conts_1.Consts, { useClass: Conts_1.Consts }),
    core_1.provide(router_2.LocationStrategy, { useClass: router_2.HashLocationStrategy })]);
window['jQuery'] = require('jquery');
window['bootbox'] = require('bootbox');
window['_'] = require('underscore');
window['Highcharts'] = require('highcharts');
window['immutable'] = require('immutable');
require('bootstrap');

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyJdLCJuYW1lcyI6WyJBcHAiLCJBcHAuY29uc3RydWN0b3IiLCJBcHAuYXBwUmVzaXplZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBSUEsUUFBTyxrQkFBa0IsQ0FBQyxDQUFBO0FBQzFCLFFBQU8sbUNBQW1DLENBQUMsQ0FBQTtBQUMzQyxRQUFPLHFCQUFxQixDQUFDLENBQUE7QUFDN0Isd0JBQXdCLDJCQUEyQixDQUFDLENBQUE7QUFDcEQscUJBQThDLGVBQWUsQ0FBQyxDQUFBO0FBQzlELHFCQUFtQix3QkFBd0IsQ0FBQyxDQUFBO0FBQzVDLHFCQUFtQix3QkFBd0IsQ0FBQyxDQUFBO0FBQzVDLHFCQUFtQix3QkFBd0IsQ0FBQyxDQUFBO0FBQzVDLHFCQUFvRCxlQUFlLENBQUMsQ0FBQTtBQUNwRSwyQkFBeUIsK0JBQStCLENBQUMsQ0FBQTtBQUN6RCwyQkFBeUIsb0NBQW9DLENBQUMsQ0FBQTtBQUM5RCwyQkFBeUIsNEJBQTRCLENBQUMsQ0FBQTtBQUN0RCx5QkFBdUIsZ0NBQWdDLENBQUMsQ0FBQTtBQUN4RCw2QkFBMkIsb0NBQW9DLENBQUMsQ0FBQTtBQUNoRSxxQkFBbUIsbUJBQW1CLENBQUMsQ0FBQTtBQUN2Qyx1QkFBcUIsdUJBQXVCLENBQUMsQ0FBQTtBQUM3QyxzQkFBcUIsY0FBYyxDQUFDLENBQUE7QUFDcEMsNkJBQTJCLHVCQUF1QixDQUFDLENBQUE7QUFDbkQsdUJBQThELGlCQUFpQixDQUFDLENBQUE7QUFDaEYsdUJBQTJGLGlCQUFpQixDQUFDLENBQUE7QUFDN0csb0NBQXVCLHFCQUFxQixDQUFDLENBQUE7QUFDN0Msb0JBQWtCLE9BQU8sQ0FBQyxDQUFBO0FBQzFCLDJCQUF5QixpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLFFBQU8sdUJBQXVCLENBQUMsQ0FBQTtBQUMvQixRQUFPLGdDQUFnQyxDQUFDLENBQUE7QUFDeEMsUUFBTywrQkFBK0IsQ0FBQyxDQUFBO0FBQ3ZDLDhCQUFrQiw4Q0FDbEIsQ0FBQyxDQUQrRDtBQUNo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TyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzdDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDM0MsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvYXBwLmQudHNcIi8+XHJcblxyXG4vL2ltcG9ydCB7ZW5hYmxlUHJvZE1vZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG4vLyBpbXBvcnQgJ3pvbmUuanMvZGlzdC96b25lLm1pbi5qcyc7XHJcbmltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcclxuaW1wb3J0ICd0d2JzL2Jvb3RzdHJhcC9jc3MvYm9vdHN0cmFwLmNzcyEnO1xyXG5pbXBvcnQgJy4vc3R5bGVzL3N0eWxlLmNzcyEnO1xyXG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XHJcbmltcG9ydCB7SFRUUF9QUk9WSURFUlMsIEpTT05QX1BST1ZJREVSU30gZnJvbSBcImFuZ3VsYXIyL2h0dHBcIjtcclxuaW1wb3J0IHtBcHAxfSBmcm9tICcuLi9zcmMvY29tcHMvYXBwMS9BcHAxJztcclxuaW1wb3J0IHtBcHAyfSBmcm9tICcuLi9zcmMvY29tcHMvYXBwMi9BcHAyJztcclxuaW1wb3J0IHtBcHAzfSBmcm9tICcuLi9zcmMvY29tcHMvYXBwMy9BcHAzJztcclxuaW1wb3J0IHtDb21wb25lbnQsIHByb3ZpZGUsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcclxuaW1wb3J0IHtFbnRyeVBhbmVsfSBmcm9tICcuLi9zcmMvY29tcHMvZW50cnkvRW50cnlQYW5lbCc7XHJcbmltcG9ydCB7QXBwTWFuYWdlcn0gZnJvbSAnLi4vc3JjL2NvbXBzL2FwcG1hbmFnZXIvQXBwTWFuYWdlcic7XHJcbmltcG9ydCB7Q29tbUJyb2tlcn0gZnJvbSAnLi4vc3JjL3NlcnZpY2VzL0NvbW1Ccm9rZXInO1xyXG5pbXBvcnQge0ZpbGVtZW51fSBmcm9tIFwiLi4vc3JjL2NvbXBzL2ZpbGVtZW51L0ZpbGVtZW51XCI7XHJcbmltcG9ydCB7RmlsZW1lbnVJdGVtfSBmcm9tIFwiLi4vc3JjL2NvbXBzL2ZpbGVtZW51L0ZpbGVtZW51SXRlbVwiO1xyXG5pbXBvcnQge0xvZ299IGZyb20gXCIuL2NvbXBzL2xvZ28vTG9nb1wiO1xyXG5pbXBvcnQge0Zvb3Rlcn0gZnJvbSBcIi4vY29tcHMvZm9vdGVyL0Zvb3RlclwiO1xyXG5pbXBvcnQge0NvbnN0c30gZnJvbSBcIi4uL3NyYy9Db250c1wiO1xyXG5pbXBvcnQge1N0eWxlU2VydmljZX0gZnJvbSBcIi4vc3R5bGVzL1N0eWxlU2VydmljZVwiO1xyXG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBST1VURVJfUFJPVklERVJTLCBBc3luY1JvdXRlfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xyXG5pbXBvcnQge0xvY2F0aW9uU3RyYXRlZ3ksIFJvdXRlUGFyYW1zLCBSb3V0ZXJMaW5rLCBIYXNoTG9jYXRpb25TdHJhdGVneSwgUm91dGVDb25maWd9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XHJcbmltcG9ydCB7QXBwU3RvcmV9IGZyb20gXCJhbmd1bGFyMi1yZWR1eC11dGlsXCI7XHJcbmltcG9ydCB7TGlifSBmcm9tIFwiLi9MaWJcIjtcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kZWJvdW5jZVRpbWUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZnJvbUV2ZW50JztcclxuaW1wb3J0IHBhcnRzIGZyb20gXCIuL2NvbXBzL2FwcDMvc3RhcndhcnMvcmVkdWNlcnMvcGFydHMtcmVkdWNlclwiXHJcbmltcG9ydCBjYXJ0IGZyb20gXCIuL2NvbXBzL2FwcDMvc3RhcndhcnMvcmVkdWNlcnMvY2FydC1yZWR1Y2VyXCJcclxuaW1wb3J0IGZpbG1zIGZyb20gXCIuL2NvbXBzL2FwcDMvc3RhcndhcnMvcmVkdWNlcnMvZmlsbXMtcmVkdWNlclwiXHJcbmltcG9ydCB1c2VycyBmcm9tIFwiLi9jb21wcy9hcHAzL3N0YXJ3YXJzL3JlZHVjZXJzL3VzZXJzLXJlZHVjZXJcIlxyXG5pbXBvcnQgbm90aWZ5IGZyb20gXCIuL3JlZHVjZXJzL05vdGlmeVJlZHVjZXJcIlxyXG5pbXBvcnQgYXBwZGIgZnJvbSBcIi4vcmVkdWNlcnMvQXBwZGJSZWR1Y2VyXCJcclxuaW1wb3J0IHt0b2Rvc30gZnJvbSBcIi4vY29tcHMvYXBwMS90b2Rvcy9yZWR1Y2Vycy9Ub2RvUmVkdWNlclwiXHJcbmltcG9ydCB7QXBwZGJBY3Rpb259IGZyb20gXCIuL2FjdGlvbnMvQXBwZGJBY3Rpb25cIjtcclxuaW1wb3J0IHtXZWxjb21lfSBmcm9tIFwiLi9jb21wcy93ZWxjb21lL1dlbGNvbWVcIjtcclxuXHJcbi8qKlxyXG4gTWFpbiBhcHBsaWNhdGlvbiBib290c3RyYXBcclxuIEBjbGFzcyBBcHBcclxuICoqL1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXBwJyxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkLFxyXG4gICAgcHJvdmlkZXJzOiBbU3R5bGVTZXJ2aWNlLCBBcHBkYkFjdGlvbl0sXHJcbiAgICB0ZW1wbGF0ZVVybDogJy9zcmMvQXBwLmh0bWwnLFxyXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXJMaW5rLCBGaWxlbWVudSwgRmlsZW1lbnVJdGVtLCBMb2dvLCBGb290ZXJdXHJcbn0pXHJcbkBSb3V0ZUNvbmZpZyhbXHJcbiAgICB7cGF0aDogXCIvXCIsIG5hbWU6IFwicm9vdFwiLCByZWRpcmVjdFRvOiBbXCIvRW50cnlQYW5lbE5vSWQvTG9naW5cIl0sIHVzZUFzRGVmYXVsdDogdHJ1ZX0sXHJcbiAgICB7cGF0aDogJy9BcHBNYW5hZ2VyJywgY29tcG9uZW50OiBBcHBNYW5hZ2VyLCBhczogJ0FwcE1hbmFnZXInfSxcclxuICAgIHtwYXRoOiAnL1dlbGNvbWUnLCBjb21wb25lbnQ6IFdlbGNvbWUsIGFzOiAnV2VsY29tZSd9LFxyXG4gICAge3BhdGg6ICcvRW50cnlQYW5lbE5vSWQvLi4uJywgY29tcG9uZW50OiBFbnRyeVBhbmVsLCBhczogJ0VudHJ5UGFuZWxOb0lkJ30sXHJcbiAgICB7cGF0aDogJy9FbnRyeVBhbmVsLzppZC8uLi4nLCBjb21wb25lbnQ6IEVudHJ5UGFuZWwsIGFzOiAnRW50cnlQYW5lbCd9LFxyXG4gICAge3BhdGg6ICcvTG9naW4vLi4uJywgY29tcG9uZW50OiBFbnRyeVBhbmVsLCBhczogJ0xvZ2luJ30sXHJcbiAgICB7cGF0aDogJy9Gb3Jnb3RQYXNzLy4uLicsIGNvbXBvbmVudDogRW50cnlQYW5lbCwgYXM6ICdGb3Jnb3RQYXNzJ30sXHJcbiAgICB7cGF0aDogJy9BcHAxLy4uLicsIGNvbXBvbmVudDogQXBwMSwgYXM6ICdBcHAxJ30sXHJcbiAgICB7cGF0aDogJy9BcHAyJywgY29tcG9uZW50OiBBcHAyLCBhczogJ0FwcDInfSxcclxuICAgIHtwYXRoOiAnL0FwcDMnLCBjb21wb25lbnQ6IEFwcDMsIGFzOiAnQXBwMyd9LFxyXG4gICAgLy9uZXcgQXN5bmNSb3V0ZSh7XHJcbiAgICAvLyAgICBwYXRoOiAnL0FwcDEnLFxyXG4gICAgLy8gICAgbG9hZGVyOiAoKSA9PiBMaWIuTG9hZENvbXBvbmVudEFzeW5jKCdBcHAxJywgJy4uL2NvbXBzL2FwcDEvQXBwMScpLFxyXG4gICAgLy8gICAgbmFtZTogJ0FwcDEnXHJcbiAgICAvL30pLCAvKnN5c3RlbWpzKi9cclxuICAgIC8vbmV3IEFzeW5jUm91dGUoe1xyXG4gICAgLy8gICAgcGF0aDogJy9BcHAyJyxcclxuICAgIC8vICAgIGxvYWRlcjogKCkgPT4gTGliLkxvYWRDb21wb25lbnRBc3luYygnQXBwMicsICcuLi9jb21wcy9hcHAyL0FwcDInKSxcclxuICAgIC8vICAgIG5hbWU6ICdBcHAyJ1xyXG4gICAgLy99KVxyXG5cclxuXSlcclxuZXhwb3J0IGNsYXNzIEFwcCB7XHJcbiAgICBwcml2YXRlIG1fc3R5bGVTZXJ2aWNlOlN0eWxlU2VydmljZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcFN0b3JlOkFwcFN0b3JlLCBwcml2YXRlIGNvbW1Ccm9rZXI6Q29tbUJyb2tlciwgc3R5bGVTZXJ2aWNlOlN0eWxlU2VydmljZSwgcHJpdmF0ZSBhcHBkYkFjdGlvbjpBcHBkYkFjdGlvbikge1xyXG4gICAgICAgIGFwcFN0b3JlLmRpc3BhdGNoKGFwcGRiQWN0aW9uLmFwcFN0YXJ0VGltZSgpKTtcclxuICAgICAgICB0aGlzLm1fc3R5bGVTZXJ2aWNlID0gc3R5bGVTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMuY29tbUJyb2tlci5zZXRTZXJ2aWNlKENvbnN0cy5TZXJ2aWNlcygpLkFwcCwgdGhpcyk7XHJcbiAgICAgICAgT2JzZXJ2YWJsZS5mcm9tRXZlbnQod2luZG93LCAncmVzaXplJykuZGVib3VuY2VUaW1lKDI1MCkuc3Vic2NyaWJlKCgpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFwcFJlc2l6ZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICBPbiBhcHBsaWNhdGlvbiByZXNpemUgZGVhbCB3aXRoIGhlaWdodCBjaGFuZ2VzXHJcbiAgICAgQG1ldGhvZCBhcHBSZXNpemVkXHJcbiAgICAgKiovXHJcbiAgICBwdWJsaWMgYXBwUmVzaXplZCgpOnZvaWQge1xyXG4gICAgICAgIHZhciBhcHBIZWlnaHQgPSBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodDtcclxuICAgICAgICB2YXIgYXBwV2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3Jlc2l6ZWQgJyArIGFwcEhlaWdodCk7XHJcbiAgICAgICAgalF1ZXJ5KENvbnN0cy5FbGVtcygpLkFQUF9OQVZJR0FUT1JfRVZFUikuaGVpZ2h0KGFwcEhlaWdodCAtIDExNSk7XHJcbiAgICAgICAgalF1ZXJ5KENvbnN0cy5FbGVtcygpLkFQUF9OQVZJR0FUT1JfV0FTUCkuaGVpZ2h0KGFwcEhlaWdodCAtIDExNSk7XHJcbiAgICAgICAgalF1ZXJ5KENvbnN0cy5DbGFzKCkuQ0xBU1NfQVBQX0hFSUdIVCkuaGVpZ2h0KGFwcEhlaWdodCAtIDQyMCk7XHJcbiAgICAgICAgalF1ZXJ5KCcjbWFpblBhbmVsV3JhcCcpLmhlaWdodChhcHBIZWlnaHQgLSAxMTUpO1xyXG4gICAgICAgIGpRdWVyeSgnI3Byb3BQYW5lbCcpLmhlaWdodChhcHBIZWlnaHQgLSAxMzApO1xyXG5cclxuICAgICAgICB0aGlzLmNvbW1Ccm9rZXIuc2V0VmFsdWUoQ29uc3RzLlZhbHVlcygpLkFQUF9TSVpFLCB7aGVpZ2h0OiBhcHBIZWlnaHQsIHdpZHRoOiBhcHBXaWR0aH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbW1Ccm9rZXIuZmlyZSh7XHJcbiAgICAgICAgICAgIGZyb21JbnN0YW5jZTogc2VsZixcclxuICAgICAgICAgICAgZXZlbnQ6IENvbnN0cy5FdmVudHMoKS5XSU5fU0laRUQsXHJcbiAgICAgICAgICAgIGNvbnRleHQ6ICcnLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiB7aGVpZ2h0OiBhcHBIZWlnaHQsIHdpZHRoOiBhcHBXaWR0aH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG4vL2VuYWJsZVByb2RNb2RlKCk7XHJcbmJvb3RzdHJhcChBcHAsIFtST1VURVJfUFJPVklERVJTLCBIVFRQX1BST1ZJREVSUywgSlNPTlBfUFJPVklERVJTLFxyXG4gICAgcHJvdmlkZShBcHBTdG9yZSwge3VzZUZhY3Rvcnk6IExpYi5TdG9yZUZhY3Rvcnkoe25vdGlmeSwgYXBwZGIsIHBhcnRzLCBjYXJ0LCBmaWxtcywgdXNlcnMsIHRvZG9zfSl9KSxcclxuICAgIHByb3ZpZGUoQ29tbUJyb2tlciwge3VzZUNsYXNzOiBDb21tQnJva2VyfSksXHJcbiAgICBwcm92aWRlKENvbnN0cywge3VzZUNsYXNzOiBDb25zdHN9KSxcclxuICAgIHByb3ZpZGUoTG9jYXRpb25TdHJhdGVneSwge3VzZUNsYXNzOiBIYXNoTG9jYXRpb25TdHJhdGVneX0pXSk7XHJcblxyXG5cclxuLyoqIGdsb2JhbCBsaWJyYXJpZXMsIGNhbid0IGxpdmUgd2l0aCdlbSBjYW4ndCB3aXRoIGxpdmUgd2l0aG91dCdlbSAqKi9cclxud2luZG93WydqUXVlcnknXSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG53aW5kb3dbJ2Jvb3Rib3gnXSA9IHJlcXVpcmUoJ2Jvb3Rib3gnKTtcclxud2luZG93WydfJ10gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyk7XHJcbndpbmRvd1snSGlnaGNoYXJ0cyddID0gcmVxdWlyZSgnaGlnaGNoYXJ0cycpO1xyXG53aW5kb3dbJ2ltbXV0YWJsZSddID0gcmVxdWlyZSgnaW1tdXRhYmxlJyk7XHJcbnJlcXVpcmUoJ2Jvb3RzdHJhcCcpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
