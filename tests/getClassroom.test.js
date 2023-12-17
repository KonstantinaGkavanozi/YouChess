const test  = require('ava');
const http = require('http');
const listen = require('test-listen');
const got = require('got');

const { getClassroom } = require('../service/ClassroomService.js');
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

test('Ava is imported', (t) => {
    t.truthy(test, 'Ava is imported successfully');
});

test('GET Classroom by function', async (t) => {

    const id = 198772;

    const result = await getClassroom(id);

    // check that result is a dictionary
    t.is(typeof result, 'object');

    
    const expected = {
        "userList" : [ 198772, 32224, 44221 ],
        "ID" : 1234,
        "editingPermissionOwner" : 198772
      };

    const expectedKeys = Object.keys(expected);
    expectedKeys.forEach(key => {
      t.true(result.hasOwnProperty(key), `Result should have key: ${key}`);
    });

    
    // Assert that the actual result matches the expected result
    t.deepEqual(result, expected);
});
