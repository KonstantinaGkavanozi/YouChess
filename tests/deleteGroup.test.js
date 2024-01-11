// Creating the test for deleteGroup

// Initiating the required parameters
const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const { deleteGroup } = require('../service/GroupService.js');
const app = require('../index.js');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

test.after.always((t) => {
    t.context.server.close();
});

// Creating the test to pass
test('test to pass', (t)=> {
    t.pass();
});

// Testing the delete group test by function
test('Delete group by function', async (t) => {
    await deleteGroup(10);
    t.is(true, true);
});

test('Delete group', async (t) => {
    const groupID = 10;
    const {body, statusCode} = await t.context.got.delete(`group/${groupID}`);

    t.is(statusCode, 200);
});

// Testing the test with a bad request 
test('Delete group Bad Request', async (t) => {
    const res = await t.throwsAsync(t.context.got.delete('group/abc'));

    t.is(res.message, 'Response code 400 (Bad Request)');
});