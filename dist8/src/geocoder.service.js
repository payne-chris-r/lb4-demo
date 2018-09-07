"use strict";
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
const service_proxy_1 = require("@loopback/service-proxy");
const core_1 = require("@loopback/core");
const geocoder_datasource_1 = require("./datasources/geocoder.datasource");
let GeocoderServiceProvider = class GeocoderServiceProvider {
    constructor(datasource = new geocoder_datasource_1.GeocoderDataSource()) {
        this.datasource = datasource;
    }
    value() {
        return service_proxy_1.getService(this.datasource);
    }
};
GeocoderServiceProvider = __decorate([
    __param(0, core_1.inject('datasources.geocoder')),
    __metadata("design:paramtypes", [service_proxy_1.juggler.DataSource])
], GeocoderServiceProvider);
exports.GeocoderServiceProvider = GeocoderServiceProvider;
//# sourceMappingURL=geocoder.service.js.map