const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const { enrollStudent } = require('../service/GroupService.js');
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

test('POST groups/enroll successful by function', async (t) => {
    const student_id = 198772;
    const group_id = 123;

    const result = await enrollStudent({groupID: group_id, studentID: student_id});

    // check that result is a dictionary
    t.is(typeof result, 'object');

    // check it has the right keys
    t.true(result.hasOwnProperty('groupID'));
    t.true(result.hasOwnProperty('studentID'));

    // check the values are correct
    t.is(result.groupID, group_id);
    t.is(result.studentID, student_id);

    // const result = await getStudent();
    // t.is(result.length ,2);
    // t.is(result[0].name, "Jane Smith");
    // // t.is(result[1].name, "John Doe");
    // t.is(result[1].ID, 32224);

});


// test('POST groups/enroll unsuccessful by function', async (t) => {
//     const result = await enrollStudent({});

//     // check that result is a dictionary
//     t.is(typeof result, 'object');

//     // check it has the right keys
//     t.true(result.hasOwnProperty('groupID'));
//     t.true(result.hasOwnProperty('studentID'));

//     // check the values are correct
//     t.is(result.groupID, group_id);
//     t.is(result.studentID, student_id);

//     // const result = await getStudent();
//     // t.is(result.length ,2);
//     // t.is(result[0].name, "Jane Smith");
//     // // t.is(result[1].name, "John Doe");
//     // t.is(result[1].ID, 32224);

// });


test('POST groups/enroll successful', async (t) => {
    const student_id = 198772;
    const group_id = 123;

    const { body, statusCode } = await t.context.got.post("groups/enroll", {json: {groupID: group_id, studentID: student_id}});
    t.is(statusCode, 200);
    // check that result is a dictionary
    t.is(typeof body, 'object');

    // check it has the right keys
    t.true(body.hasOwnProperty('groupID'));
    t.true(body.hasOwnProperty('studentID'));

    // check the values are correct
    t.is(body.groupID, group_id);
    t.is(body.studentID, student_id);
});


test('POST groups/enroll unsuccessful', async (t) => {
    const student_id = 198772;
    const group_id = 123;

    const res = await t.throwsAsync(() => t.context.got.post("groups/enroll", {json: {}}));   
});