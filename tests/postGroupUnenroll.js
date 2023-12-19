const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const { unenrollStudent } = require('../service/GroupService.js');
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

//Test by function
test('POST Group unenroll by function', async (t) => {

    //const group_id = 10;

    const body = {
        "schedule" : "5 O'clock every Monday",
        "level" : "Intermediate",
        "price" : 10.5,
        "availableSeats" : 5,
        "ID" : 10,
        "studentIDs" : [ 198772, 32224, 44221 ],
        "coachID" : 8765
    };

    const result = await unenrollStudent(body);

    t.is(typeof result, 'object');

    // check if it has the right keys
    t.true(result.hasOwnProperty('schedule'));
    t.true(result.hasOwnProperty('level'));
    t.true(result.hasOwnProperty('ID'));
    t.true(result.hasOwnProperty('price'));
    t.true(result.hasOwnProperty('availableSeats'));
    t.true(result.hasOwnProperty('studentIDs'));
    t.true(result.hasOwnProperty('coachID'));

    // check if the values are correct
   
    t.is(result.schedule, body.schedule);
    t.is(result.level, body.level);
    t.is(result.price, body.price);
    t.is(result.availableSeats, body.availableSeats);
    t.is(result.ID, body.ID);
    t.deepEqual(result.studentIDs, body.studentIDs);
    t.is(result.coachID, body.coachID);

   
});

//Test by endpoint
test('POST groups/unenroll successful', async (t) =>{

    const expectedBody = {
        "schedule" : "5 O'clock every Monday",
        "level" : "Intermediate",
        "price" : 10.5,
        "availableSeats" : 5,
        "ID" : 10,
        "studentIDs" : [ 198772, 32224, 44221 ],
        "coachID" : 8765
    };

    const studentID = 198772;
    const groupID = 10;

    const { body, statusCode } = await t.context.got.post("groups/unenroll", {json: {groupID:groupID, studentID:studentID}});

    //Check if the status is correct
    t.is(statusCode, 200);
    //Check if the result is an object
    t.is(typeof body, "object");

    //Check if the keys in the dictionary are correct
    t.true(body.hasOwnProperty('schedule'));
    t.true(body.hasOwnProperty('level'));
    t.true(body.hasOwnProperty('price'));
    t.true(body.hasOwnProperty('availableSeats'));
    t.true(body.hasOwnProperty('ID'));
    t.true(body.hasOwnProperty('studentIDs'));
    t.true(body.hasOwnProperty('coachID'));

    //Check if the values are correct
    
    t.is(body.schedule, expectedBody.schedule);
    t.is(body.level, expectedBody.level);
    t.is(body.price, expectedBody.price);
    t.is(body.availableSeats, expectedBody.availableSeats);
    t.is(body.ID, expectedBody.ID);
    t.deepEqual(body.studentIDs, expectedBody.studentIDs);
    t.is(body.coachID, expectedBody.coachID);

});