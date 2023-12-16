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
    t.is(result.groupsEnrolled, "123, 124, 125");

});

test('getStudent with id of type string by function', async (t) => {
    const id = "fjsffe";
    const result = await getStudent(id);

    t.is(result.ID, id);
});

test('getStudent with id of type char by function', async (t) => {
    const id = 'e';
    const result = await getStudent(id);

    t.is(result.ID, id);
});

test('getStudent with id of type NaN by function', async (t) => {
    const id = NaN;
    const result = await getStudent(id);

    t.is(result.ID, id);
});

test('getStudent with id of type undefined by function', async (t) => {
    const id = undefined;
    const result = await getStudent(id);

    t.is(result.ID, id);
});

// ------------------ Test by endpoint  ------------------

test('getStudent by id', async (t) => {
    const studentID = "yvghhg";
    const { body, statusCode } = await t.context.got(`student/${studentID}`);
    // t.is(body[0].name, "Jane Smith");
    // t.is(statusCode, 400);
    t.is(body.ID,198772);
});
