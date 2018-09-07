"use strict";
// Uncomment these imports to begin using these cool features!
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
// import {inject} from '@loopback/context';
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const models_1 = require("../models");
const rest_1 = require("@loopback/rest");
const core_1 = require("../../node_modules/@loopback/core");
let IslandController = class IslandController {
    constructor(islandRepo, geoService) {
        this.islandRepo = islandRepo;
        this.geoService = geoService;
    }
    async createIsland(island) {
        if (!island.name) {
            throw new rest_1.HttpErrors.BadRequest('title is required');
        }
        if (island.remindAtAddress) {
            // TODO handle "address not found"
            const geo = await this.geoService.geocode(island.remindAtAddress);
            // Encode the coordinates as "lat,lng"
            island.remindAtGeo = `${geo[0].y},${geo[0].x}`;
        }
        return await this.islandRepo.create(island);
    }
    async findIslands() {
        return await this.islandRepo.find();
    }
    async deleteIsland(id) {
        return await this.islandRepo.deleteById(id);
    }
};
__decorate([
    rest_1.post('/islands'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Island]),
    __metadata("design:returntype", Promise)
], IslandController.prototype, "createIsland", null);
__decorate([
    rest_1.get('/islands'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IslandController.prototype, "findIslands", null);
__decorate([
    rest_1.del('/islands/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IslandController.prototype, "deleteIsland", null);
IslandController = __decorate([
    __param(0, repository_1.repository(repositories_1.IslandRepository)),
    __param(1, core_1.inject('services.GeocoderService')),
    __metadata("design:paramtypes", [repositories_1.IslandRepository, Object])
], IslandController);
exports.IslandController = IslandController;
//# sourceMappingURL=island.controller.js.map