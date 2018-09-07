"use strict";
// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const services_1 = require("../../../src/services");
const helpers_1 = require("../../helpers");
const geocoder_datasource_1 = require("../../../src/datasources/geocoder.datasource");
describe('GeoLookupService', function () {
    // tslint:disable-next-line:no-invalid-this
    this.timeout(30 * 1000);
    let cachingProxy;
    before(async () => (cachingProxy = await helpers_1.givenCachingProxy()));
    after(() => cachingProxy.stop());
    let service;
    before(givenGeoService);
    it('resolves an address to a geo point', async () => {
        const points = await service.geocode('1 New Orchard Road, Armonk, 10504');
        testlab_1.expect(points).to.deepEqual([
            {
                y: 41.109653,
                x: -73.72467,
            },
        ]);
    });
    async function givenGeoService() {
        const config = helpers_1.getProxiedGeoCoderConfig(cachingProxy);
        const dataSource = new geocoder_datasource_1.GeocoderDataSource(config);
        service = await new services_1.GeocoderServiceProvider(dataSource).value();
    }
});
//# sourceMappingURL=geocoder.service.integration.js.map