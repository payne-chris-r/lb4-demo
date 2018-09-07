"use strict";
// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const application_1 = require("../../src/application");
const repositories_1 = require("../../src/repositories/");
const helpers_1 = require("../helpers");
describe('Application', () => {
    let app;
    let client;
    let todoRepo;
    let cachingProxy;
    before(async () => (cachingProxy = await helpers_1.givenCachingProxy()));
    after(() => cachingProxy.stop());
    before(givenRunningApplicationWithCustomConfiguration);
    after(() => app.stop());
    before(givenTodoRepository);
    before(() => {
        client = testlab_1.createClientForHandler(app.requestHandler);
    });
    beforeEach(async () => {
        await todoRepo.deleteAll();
    });
    it('creates a todo', async function () {
        // Set timeout to 30 seconds as `post /todos` triggers geocode look up
        // over the internet and it takes more than 2 seconds
        // tslint:disable-next-line:no-invalid-this
        this.timeout(30000);
        const todo = helpers_1.givenTodo();
        const response = await client
            .post('/todos')
            .send(todo)
            .expect(200);
        testlab_1.expect(response.body).to.containDeep(todo);
        const result = await todoRepo.findById(response.body.id);
        testlab_1.expect(result).to.containDeep(todo);
    });
    it('rejects requests to create a todo with no title', async () => {
        const todo = helpers_1.givenTodo();
        delete todo.title;
        await client
            .post('/todos')
            .send(todo)
            .expect(422);
    });
    it('creates an address-based reminder', async function () {
        // Increase the timeout to accommodate slow network connections
        // tslint:disable-next-line:no-invalid-this
        this.timeout(30000);
        const todo = helpers_1.givenTodo({ remindAtAddress: helpers_1.aLocation.address });
        const response = await client
            .post('/todos')
            .send(todo)
            .expect(200);
        todo.remindAtGeo = helpers_1.aLocation.geostring;
        testlab_1.expect(response.body).to.containEql(todo);
        const result = await todoRepo.findById(response.body.id);
        testlab_1.expect(result).to.containEql(todo);
    });
    context('when dealing with a single persisted todo', () => {
        let persistedTodo;
        beforeEach(async () => {
            persistedTodo = await givenTodoInstance();
        });
        it('gets a todo by ID', async () => {
            const result = await client
                .get(`/todos/${persistedTodo.id}`)
                .send()
                .expect(200);
            // Remove any undefined properties that cannot be represented in JSON/REST
            const expected = JSON.parse(JSON.stringify(persistedTodo));
            testlab_1.expect(result.body).to.deepEqual(expected);
        });
        it('replaces the todo by ID', async () => {
            const updatedTodo = helpers_1.givenTodo({
                title: 'DO SOMETHING AWESOME',
                desc: 'It has to be something ridiculous',
                isComplete: true,
            });
            await client
                .put(`/todos/${persistedTodo.id}`)
                .send(updatedTodo)
                .expect(200);
            const result = await todoRepo.findById(persistedTodo.id);
            testlab_1.expect(result).to.containEql(updatedTodo);
        });
        it('updates the todo by ID ', async () => {
            const updatedTodo = helpers_1.givenTodo({
                title: 'DO SOMETHING AWESOME',
                isComplete: true,
            });
            await client
                .patch(`/todos/${persistedTodo.id}`)
                .send(updatedTodo)
                .expect(200);
            const result = await todoRepo.findById(persistedTodo.id);
            testlab_1.expect(result).to.containEql(updatedTodo);
        });
        it('deletes the todo', async () => {
            await client
                .del(`/todos/${persistedTodo.id}`)
                .send()
                .expect(200);
            await testlab_1.expect(todoRepo.findById(persistedTodo.id)).to.be.rejectedWith(/no Todo found with id/);
        });
    });
    /*
     ============================================================================
     TEST HELPERS
     These functions help simplify setup of your test fixtures so that your tests
     can:
     - operate on a "clean" environment each time (a fresh in-memory database)
     - avoid polluting the test with large quantities of setup logic to keep
     them clear and easy to read
     - keep them DRY (who wants to write the same stuff over and over?)
     ============================================================================
     */
    async function givenRunningApplicationWithCustomConfiguration() {
        app = new application_1.TodoListApplication({
            rest: {
                port: 0,
            },
        });
        await app.boot();
        /**
         * Override default config for DataSource for testing so we don't write
         * test data to file when using the memory connector.
         */
        app.bind('datasources.config.db').to({
            name: 'db',
            connector: 'memory',
        });
        // Override Geocoder datasource to use a caching proxy to speed up tests.
        app
            .bind('datasources.config.geocoder')
            .to(helpers_1.getProxiedGeoCoderConfig(cachingProxy));
        // Start Application
        await app.start();
    }
    async function givenTodoRepository() {
        todoRepo = await app.getRepository(repositories_1.TodoRepository);
    }
    async function givenTodoInstance(todo) {
        return await todoRepo.create(helpers_1.givenTodo(todo));
    }
});
//# sourceMappingURL=todo.acceptance.js.map