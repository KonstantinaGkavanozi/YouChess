const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const { getStudent } = require('../service/StudentService.js');
const app = require('../index.js');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

test.after.always((t) => {
    t.context.server.close();
});

test('test to pass', (t)=> {
    t.pass();
});

test('GET Student by function', async (t) => {

    const id = 198772;

    const result = await getStudent(id);
    // check that student  looks like the example
    // examples['application/json'] = {
    //     "name" : "Jane Smith",
    //     "ID" : 198772,
    //     "groupsEnrolled" : "123, 124, 125"
    //   };

    // check that result is a dictionary
    t.is(typeof result, 'object');

    // check it has the right keys
    t.true(result.hasOwnProperty('name'));
    t.true(result.hasOwnProperty('ID'));
    t.true(result.hasOwnProperty('groupsEnrolled'));

    // check the values are correct
    t.is(result.name, "Jane Smith");
    t.is(result.ID, id);
    t.deepEqual(result.groupsEnrolled, [123, 124, 125]);
});
