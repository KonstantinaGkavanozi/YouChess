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
    const result = await getStudent();
    t.is(result.length ,2);
    t.is(result[0].name, "Jane Smith");
    // t.is(result[1].name, "John Doe");
    t.is(result[1].ID, 32224);

});

// test('does the id exists?', async (t) => {
//     const result = await getStudent();
//     t.is(getStudent(198772),result[0].ID);
// });
// test('getStudent', async (t) => {
//     const studentID = 198772;
//     const { body, statusCode } = await t.context.got(`student/${studentID}`);
//     // t.is(body[0].name, "Jane Smith");
//     t.is(statusCode, 200);
//     t.is(body[1].ID,32224);
// });