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


 // ------------------ Test by function ------------------

test('getStudent with specific id by function', async (t) => {
    const id = 198772;
    const group_ids = [123, 124, 125];
    const result = await getStudent(id);
    //check that student looks like the example
    // examples['application/json'] = {
    //     "name" : "Jane Smith",
    //     "ID" : 198772,
    //     "groupsEnrolled" : "123, 124, 125"
    //   };

    // check it has the right keys
    t.true(result.hasOwnProperty('name'));
    t.true(result.hasOwnProperty('ID'));
    t.true(result.hasOwnProperty('groupsEnrolled'));

    // check the values are correct
    t.is(result.name, "Jane Smith");
    t.is(result.ID, id);
    t.deepEqual(result.groupsEnrolled, group_ids);

});


//  ------------------ Test by endpoint  ------------------


test('getStudent with specific id', async (t) => {
    const id = 198772;
    const { body, statusCode } = await t.context.got.get(`student/${id}`);
    t.is(body.name, "Jane Smith");

    t.is(statusCode, 200);
    t.is(body.ID,id);
});


test('getStudent with id of type string', async (t) => {
    const id = "fjsffe";
    const res = await t.throwsAsync(() => t.context.got.get(`student?id=${id}`));

    t.is(res.message, "Response code 404 (Not Found)")
});


test('getStudent with id of char string', async (t) => {
    const id = 'v';
    const res = await t.throwsAsync(() => t.context.got.get(`student?id=${id}`));

    t.is(res.message, "Response code 404 (Not Found)")
});

test('getStudent with id of NaN string', async (t) => {
    const id = NaN;
    const res = await t.throwsAsync(() => t.context.got.get(`student?id=${id}`));

    t.is(res.message, "Response code 404 (Not Found)")
});

test('getStudent with id of undefined string', async (t) => {
    const id = undefined;
    const res = await t.throwsAsync(() => t.context.got.get(`student?id=${id}`));

    t.is(res.message, "Response code 404 (Not Found)")
});


test('getStudent with non-existent id', async (t) => {
    const nonExistentStudentID = 999999;
    const res = await t.throwsAsync(() => t.context.got.get(`student?id=${nonExistentStudentID}`));

    t.is(res.message, "Response code 404 (Not Found)")
    
});


