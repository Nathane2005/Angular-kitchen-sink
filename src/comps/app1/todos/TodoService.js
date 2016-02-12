var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var Lib_1 = require("../../../Lib");
require('rxjs/add/operator/share');
var TodoStatsModel_1 = require("./TodoStatsModel");
var TodoModel_1 = require("./TodoModel");
var index_1 = require("angular2-redux-util/dist/index");
var url = 'http://secure.digitalsignage.com';
var TodoItemModel = (function () {
    function TodoItemModel(text, id) {
        this.task = text;
        this.id = id || Lib_1.Lib.guid();
    }
    Object.defineProperty(TodoItemModel.prototype, "text", {
        get: function () {
            console.log('getting value for task', this.task);
            return this.task;
        },
        set: function (value) {
            this.task = value;
        },
        enumerable: true,
        configurable: true
    });
    TodoItemModel.prototype.getTask = function () {
        return this.task;
    };
    return TodoItemModel;
})();
exports.TodoItemModel = TodoItemModel;
var TodosService = (function () {
    function TodosService(_http, todoStatsModel, appStore) {
        this._http = _http;
        this.todoStatsModel = todoStatsModel;
        this.appStore = appStore;
        this.m_dataStore = { todos: [] };
    }
    Object.defineProperty(TodosService.prototype, "action", {
        set: function (i_actionTodo) {
            this.m_actionTodo = i_actionTodo;
            this.m_addTodoDispatch = this.m_actionTodo.createDispatcher(this.appStore, this.m_actionTodo.addTodoDispatch);
            this.m_clearTodoDispatch = this.m_actionTodo.createDispatcher(this.appStore, this.m_actionTodo.clearTodoDispatch);
        },
        enumerable: true,
        configurable: true
    });
    TodosService.prototype.saveTodoRemote = function (todo, cb) {
        this.todoStatsModel.creates++;
        var sendData = JSON.stringify(todo);
        this._http.post(url + "/todos", sendData)
            .map(function (response) { return response.json(); }).subscribe(function (sendData) {
            cb(1);
        }, function (error) {
            console.log('Could not create todo.');
            cb(-1);
        });
    };
    TodosService.prototype.loadTodosRemote = function (cb) {
        var _this = this;
        this.m_clearTodoDispatch();
        this.todoStatsModel.reads++;
        console.log(url + "/todos");
        this._http.get(url + "/todos").map(function (response) { return response.json(); }).subscribe(function (data) {
            try {
                data = JSON.parse(data);
                cb(1);
            }
            catch (e) {
                cb(-1);
                return;
            }
            for (var i in data) {
                var todoModel = new TodoModel_1.TodoModel({ task: data[i]._data.task, modelId: data[i]._data.modelId });
                _this.m_addTodoDispatch(todoModel);
            }
        }, function (error) { return console.log("Could not load todos " + error); });
    };
    TodosService.prototype.removeTodoRemote = function (todoModel, cb) {
        this.todoStatsModel.deletes++;
        var modelId = todoModel.getKey('modelId');
        this._http.delete(url + "/todos/" + modelId).subscribe(function (response) {
            if (response.status == 200) {
                cb(1);
            }
            else {
                cb(-1);
            }
        }, function (error) { return console.log('Could not delete todo.'); });
    };
    TodosService.prototype.editTodoRemote = function (todoModel, cb) {
        this.todoStatsModel.updates++;
        var modelId = todoModel.getKey('modelId');
        var data = JSON.stringify(todoModel);
        this._http.put(url + "/todos/" + modelId, data).subscribe(function (response) {
            if (response.status == 200) {
                cb(1);
            }
            else {
                cb(-1);
            }
        }, function (error) { return console.log('Could not update todo.'); });
    };
    TodosService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, TodoStatsModel_1.default, index_1.AppStore])
    ], TodosService);
    return TodosService;
})();
exports.TodosService = TodosService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBzL2FwcDEvdG9kb3MvdG9kb3NlcnZpY2UudHMiXSwibmFtZXMiOlsiVG9kb0l0ZW1Nb2RlbCIsIlRvZG9JdGVtTW9kZWwuY29uc3RydWN0b3IiLCJUb2RvSXRlbU1vZGVsLnRleHQiLCJUb2RvSXRlbU1vZGVsLmdldFRhc2siLCJUb2Rvc1NlcnZpY2UiLCJUb2Rvc1NlcnZpY2UuY29uc3RydWN0b3IiLCJUb2Rvc1NlcnZpY2UuYWN0aW9uIiwiVG9kb3NTZXJ2aWNlLnNhdmVUb2RvUmVtb3RlIiwiVG9kb3NTZXJ2aWNlLmxvYWRUb2Rvc1JlbW90ZSIsIlRvZG9zU2VydmljZS5yZW1vdmVUb2RvUmVtb3RlIiwiVG9kb3NTZXJ2aWNlLmVkaXRUb2RvUmVtb3RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMscUJBQW1CLGVBQWUsQ0FBQyxDQUFBO0FBQ25DLG9CQUFrQixjQUFjLENBQUMsQ0FBQTtBQUNqQyxRQUFPLHlCQUF5QixDQUFDLENBQUE7QUFDakMsK0JBQTJCLGtCQUFrQixDQUFDLENBQUE7QUFDOUMsMEJBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBQ3RDLHNCQUF1QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBS3hELElBQU0sR0FBRyxHQUFVLGtDQUFrQyxDQUFDO0FBRXREO0lBSUlBLHVCQUFZQSxJQUFXQSxFQUFFQSxFQUFVQTtRQUMvQkMsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDakJBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLFNBQUdBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO0lBQy9CQSxDQUFDQTtJQUVERCxzQkFBSUEsK0JBQUlBO2FBQVJBO1lBQ0lFLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLHdCQUF3QkEsRUFBRUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDakRBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1FBQ3JCQSxDQUFDQTthQUVERixVQUFTQSxLQUFLQTtZQUNWRSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7OztPQUpBRjtJQU1EQSwrQkFBT0EsR0FBUEE7UUFDSUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7SUFDckJBLENBQUNBO0lBQ0xILG9CQUFDQTtBQUFEQSxDQXJCQSxBQXFCQ0EsSUFBQTtBQXJCWSxxQkFBYSxnQkFxQnpCLENBQUE7QUFNRDtJQU9JSSxzQkFBb0JBLEtBQVVBLEVBQVVBLGNBQTZCQSxFQUFVQSxRQUFpQkE7UUFBNUVDLFVBQUtBLEdBQUxBLEtBQUtBLENBQUtBO1FBQVVBLG1CQUFjQSxHQUFkQSxjQUFjQSxDQUFlQTtRQUFVQSxhQUFRQSxHQUFSQSxRQUFRQSxDQUFTQTtRQUM1RkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsRUFBQ0EsS0FBS0EsRUFBRUEsRUFBRUEsRUFBQ0EsQ0FBQ0E7SUFDbkNBLENBQUNBO0lBRURELHNCQUFXQSxnQ0FBTUE7YUFBakJBLFVBQWtCQSxZQUFZQTtZQUMxQkUsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsWUFBWUEsQ0FBQ0E7WUFDakNBLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtZQUM5R0EsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7UUFDdEhBLENBQUNBOzs7T0FBQUY7SUFFTUEscUNBQWNBLEdBQXJCQSxVQUFzQkEsSUFBY0EsRUFBRUEsRUFBd0JBO1FBQzFERyxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtRQUM5QkEsSUFBSUEsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDcENBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUlBLEdBQUdBLFdBQVFBLEVBQUVBLFFBQVFBLENBQUNBO2FBQ3BDQSxHQUFHQSxDQUFDQSxVQUFBQSxRQUFRQSxJQUFJQSxPQUFBQSxRQUFRQSxDQUFDQSxJQUFJQSxFQUFFQSxFQUFmQSxDQUFlQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUMzQ0EsVUFBQUEsUUFBUUE7WUFDSkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDVkEsQ0FBQ0EsRUFDREEsVUFBQUEsS0FBS0E7WUFDREEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxDQUFDQTtZQUN0Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDWEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDWEEsQ0FBQ0E7SUFFTUgsc0NBQWVBLEdBQXRCQSxVQUF1QkEsRUFBd0JBO1FBQS9DSSxpQkFpQkNBO1FBaEJHQSxJQUFJQSxDQUFDQSxtQkFBbUJBLEVBQUVBLENBQUNBO1FBQzNCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtRQUM1QkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBSUEsR0FBR0EsV0FBUUEsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUlBLEdBQUdBLFdBQVFBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLFVBQUFBLFFBQVFBLElBQUlBLE9BQUFBLFFBQVFBLENBQUNBLElBQUlBLEVBQUVBLEVBQWZBLENBQWVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFVBQUFBLElBQUlBO1lBQzFFQSxJQUFJQSxDQUFDQTtnQkFDREEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFFQTtZQUFBQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDVEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLE1BQU1BLENBQUNBO1lBQ1hBLENBQUNBO1lBQ0RBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNqQkEsSUFBSUEsU0FBU0EsR0FBYUEsSUFBSUEscUJBQVNBLENBQUNBLEVBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLEVBQUNBLENBQUNBLENBQUNBO2dCQUNwR0EsS0FBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUN0Q0EsQ0FBQ0E7UUFDTEEsQ0FBQ0EsRUFBRUEsVUFBQUEsS0FBS0EsSUFBSUEsT0FBQUEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsMEJBQXdCQSxLQUFPQSxDQUFDQSxFQUE1Q0EsQ0FBNENBLENBQUNBLENBQUNBO0lBQzlEQSxDQUFDQTtJQUVNSix1Q0FBZ0JBLEdBQXZCQSxVQUF3QkEsU0FBbUJBLEVBQUVBLEVBQXdCQTtRQUNqRUssSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7UUFDOUJBLElBQUlBLE9BQU9BLEdBQUdBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1FBQzFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFJQSxHQUFHQSxlQUFVQSxPQUFTQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxVQUFBQSxRQUFRQTtZQUMzREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFBQTtZQUNUQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDSkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDWEEsQ0FBQ0E7UUFDTEEsQ0FBQ0EsRUFBRUEsVUFBQUEsS0FBS0EsSUFBSUEsT0FBQUEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxFQUFyQ0EsQ0FBcUNBLENBQUNBLENBQUNBO0lBQ3ZEQSxDQUFDQTtJQUVNTCxxQ0FBY0EsR0FBckJBLFVBQXNCQSxTQUFtQkEsRUFBRUEsRUFBd0JBO1FBQy9ETSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtRQUM5QkEsSUFBSUEsT0FBT0EsR0FBR0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDMUNBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1FBQ3JDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFJQSxHQUFHQSxlQUFVQSxPQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxVQUFBQSxRQUFRQTtZQUM5REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFBQTtZQUNUQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDSkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDWEEsQ0FBQ0E7UUFDTEEsQ0FBQ0EsRUFBRUEsVUFBQUEsS0FBS0EsSUFBSUEsT0FBQUEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxFQUFyQ0EsQ0FBcUNBLENBQUNBLENBQUNBO0lBQ3ZEQSxDQUFDQTtJQXpFTE47UUFBQ0EsaUJBQVVBLEVBQUVBOztxQkEwRVpBO0lBQURBLG1CQUFDQTtBQUFEQSxDQTFFQSxBQTBFQ0EsSUFBQTtBQXpFWSxvQkFBWSxlQXlFeEIsQ0FBQSIsImZpbGUiOiJjb21wcy9hcHAxL3RvZG9zL1RvZG9TZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcclxuaW1wb3J0IHtIdHRwfSBmcm9tICdhbmd1bGFyMi9odHRwJztcclxuaW1wb3J0IHtMaWJ9IGZyb20gXCIuLi8uLi8uLi9MaWJcIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9zaGFyZSc7XHJcbmltcG9ydCBUb2RvU3RhdHNNb2RlbCBmcm9tIFwiLi9Ub2RvU3RhdHNNb2RlbFwiO1xyXG5pbXBvcnQge1RvZG9Nb2RlbH0gZnJvbSBcIi4vVG9kb01vZGVsXCI7XHJcbmltcG9ydCB7QXBwU3RvcmV9IGZyb20gXCJhbmd1bGFyMi1yZWR1eC11dGlsL2Rpc3QvaW5kZXhcIjtcclxuaW1wb3J0IHtUb2RvQWN0aW9ufSBmcm9tIFwiLi9hY3Rpb25zL1RvZG9BY3Rpb25cIjtcclxuXHJcbi8vIGRlYnVnIHNlcnZlclxyXG4vL2NvbnN0IHVybDpzdHJpbmcgPSAnaHR0cDovL3NlY3VyZS5kaWdpdGFsc2lnbmFnZS5jb206ODA4MCc7XHJcbmNvbnN0IHVybDpzdHJpbmcgPSAnaHR0cDovL3NlY3VyZS5kaWdpdGFsc2lnbmFnZS5jb20nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRvZG9JdGVtTW9kZWwge1xyXG4gICAgcHJpdmF0ZSB0YXNrOlN0cmluZztcclxuICAgIHByaXZhdGUgaWQ6c3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRleHQ6U3RyaW5nLCBpZD86c3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy50YXNrID0gdGV4dDtcclxuICAgICAgICB0aGlzLmlkID0gaWQgfHwgTGliLmd1aWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGV4dCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2V0dGluZyB2YWx1ZSBmb3IgdGFzaycsIHRoaXMudGFzayk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFzaztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdGV4dCh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMudGFzayA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRhc2soKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFzaztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0YVN0b3JlIHtcclxuICAgIHRvZG9zOiBBcnJheTxUb2RvSXRlbU1vZGVsPlxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUb2Rvc1NlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBtX2RhdGFTdG9yZTpJRGF0YVN0b3JlO1xyXG4gICAgcHJpdmF0ZSBtX2FkZFRvZG9EaXNwYXRjaDpGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgbV9jbGVhclRvZG9EaXNwYXRjaDpGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBtX2FjdGlvblRvZG86VG9kb0FjdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOkh0dHAsIHByaXZhdGUgdG9kb1N0YXRzTW9kZWw6VG9kb1N0YXRzTW9kZWwsIHByaXZhdGUgYXBwU3RvcmU6QXBwU3RvcmUpIHtcclxuICAgICAgICB0aGlzLm1fZGF0YVN0b3JlID0ge3RvZG9zOiBbXX07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBhY3Rpb24oaV9hY3Rpb25Ub2RvKSB7XHJcbiAgICAgICAgdGhpcy5tX2FjdGlvblRvZG8gPSBpX2FjdGlvblRvZG87XHJcbiAgICAgICAgdGhpcy5tX2FkZFRvZG9EaXNwYXRjaCA9IHRoaXMubV9hY3Rpb25Ub2RvLmNyZWF0ZURpc3BhdGNoZXIodGhpcy5hcHBTdG9yZSwgdGhpcy5tX2FjdGlvblRvZG8uYWRkVG9kb0Rpc3BhdGNoKTtcclxuICAgICAgICB0aGlzLm1fY2xlYXJUb2RvRGlzcGF0Y2ggPSB0aGlzLm1fYWN0aW9uVG9kby5jcmVhdGVEaXNwYXRjaGVyKHRoaXMuYXBwU3RvcmUsIHRoaXMubV9hY3Rpb25Ub2RvLmNsZWFyVG9kb0Rpc3BhdGNoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZVRvZG9SZW1vdGUodG9kbzpUb2RvTW9kZWwsIGNiOihzdGF0dXM6bnVtYmVyKT0+dm9pZCkge1xyXG4gICAgICAgIHRoaXMudG9kb1N0YXRzTW9kZWwuY3JlYXRlcysrO1xyXG4gICAgICAgIGxldCBzZW5kRGF0YSA9IEpTT04uc3RyaW5naWZ5KHRvZG8pO1xyXG4gICAgICAgIHRoaXMuX2h0dHAucG9zdChgJHt1cmx9L3RvZG9zYCwgc2VuZERhdGEpXHJcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIHNlbmREYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGNiKDEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ291bGQgbm90IGNyZWF0ZSB0b2RvLicpO1xyXG4gICAgICAgICAgICAgICAgY2IoLTEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZFRvZG9zUmVtb3RlKGNiOihzdGF0dXM6bnVtYmVyKT0+dm9pZCkge1xyXG4gICAgICAgIHRoaXMubV9jbGVhclRvZG9EaXNwYXRjaCgpO1xyXG4gICAgICAgIHRoaXMudG9kb1N0YXRzTW9kZWwucmVhZHMrKztcclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt1cmx9L3RvZG9zYCk7XHJcbiAgICAgICAgdGhpcy5faHR0cC5nZXQoYCR7dXJsfS90b2Rvc2ApLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgY2IoMSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNiKC0xKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b2RvTW9kZWw6VG9kb01vZGVsID0gbmV3IFRvZG9Nb2RlbCh7dGFzazogZGF0YVtpXS5fZGF0YS50YXNrLCBtb2RlbElkOiBkYXRhW2ldLl9kYXRhLm1vZGVsSWR9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9hZGRUb2RvRGlzcGF0Y2godG9kb01vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUubG9nKGBDb3VsZCBub3QgbG9hZCB0b2RvcyAke2Vycm9yfWApKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlVG9kb1JlbW90ZSh0b2RvTW9kZWw6VG9kb01vZGVsLCBjYjooc3RhdHVzOm51bWJlcik9PnZvaWQpIHtcclxuICAgICAgICB0aGlzLnRvZG9TdGF0c01vZGVsLmRlbGV0ZXMrKztcclxuICAgICAgICB2YXIgbW9kZWxJZCA9IHRvZG9Nb2RlbC5nZXRLZXkoJ21vZGVsSWQnKTtcclxuICAgICAgICB0aGlzLl9odHRwLmRlbGV0ZShgJHt1cmx9L3RvZG9zLyR7bW9kZWxJZH1gKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgY2IoMSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNiKC0xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUubG9nKCdDb3VsZCBub3QgZGVsZXRlIHRvZG8uJykpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlZGl0VG9kb1JlbW90ZSh0b2RvTW9kZWw6VG9kb01vZGVsLCBjYjooc3RhdHVzOm51bWJlcik9PnZvaWQpIHtcclxuICAgICAgICB0aGlzLnRvZG9TdGF0c01vZGVsLnVwZGF0ZXMrKztcclxuICAgICAgICB2YXIgbW9kZWxJZCA9IHRvZG9Nb2RlbC5nZXRLZXkoJ21vZGVsSWQnKTtcclxuICAgICAgICB2YXIgZGF0YSA9IEpTT04uc3RyaW5naWZ5KHRvZG9Nb2RlbCk7XHJcbiAgICAgICAgdGhpcy5faHR0cC5wdXQoYCR7dXJsfS90b2Rvcy8ke21vZGVsSWR9YCwgZGF0YSkuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGNiKDEpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYigtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmxvZygnQ291bGQgbm90IHVwZGF0ZSB0b2RvLicpKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
