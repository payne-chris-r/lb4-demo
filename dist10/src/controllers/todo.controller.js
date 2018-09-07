"use strict";
// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let TodoController = class TodoController {
    constructor(todoRepo, geoService) {
        this.todoRepo = todoRepo;
        this.geoService = geoService;
    }
    async createTodo(todo) {
        if (todo.remindAtAddress) {
            // TODO(bajtos) handle "address not found"
            const geo = await this.geoService.geocode(todo.remindAtAddress);
            // Encode the coordinates as "lat,lng" (Google Maps API format). See also
            // https://stackoverflow.com/q/7309121/69868
            // https://gis.stackexchange.com/q/7379
            todo.remindAtGeo = `${geo[0].y},${geo[0].x}`;
        }
        return await this.todoRepo.create(todo);
    }
    async findTodoById(id, items) {
        return await this.todoRepo.findById(id);
    }
    async findTodos() {
        return await this.todoRepo.find();
    }
    async replaceTodo(id, todo) {
        return await this.todoRepo.replaceById(id, todo);
    }
    async updateTodo(id, todo) {
        return await this.todoRepo.updateById(id, todo);
    }
    async deleteTodo(id) {
        return await this.todoRepo.deleteById(id);
    }
};
__decorate([
    rest_1.post('/todos'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Todo]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "createTodo", null);
__decorate([
    rest_1.get('/todos/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.param.query.boolean('items')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "findTodoById", null);
__decorate([
    rest_1.get('/todos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "findTodos", null);
__decorate([
    rest_1.put('/todos/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Todo]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "replaceTodo", null);
__decorate([
    rest_1.patch('/todos/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Todo]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateTodo", null);
__decorate([
    rest_1.del('/todos/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "deleteTodo", null);
TodoController = __decorate([
    __param(0, repository_1.repository(repositories_1.TodoRepository)),
    __param(1, core_1.inject('services.GeocoderService')),
    __metadata("design:paramtypes", [repositories_1.TodoRepository, Object])
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map