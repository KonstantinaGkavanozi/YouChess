const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const { createGroup } = require('../service/GroupService.js');
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

test('Post group by function', async (t) => {

    const group = {
        schedule: "5 O'clock every Monday",
        level: "Intermediate",
        price: 10.5,
        availableSeats: 5,
        ID: 10,
        studentIDs: [ 198772, 32224, 44221 ],
        coachID: 8765
    };

    const result = await createGroup(group);

    // check that result is a dictionary
    t.is(typeof result, 'object');

    // check it has the right keys
    t.true(result.hasOwnProperty('schedule'));
    t.true(result.hasOwnProperty('level'));
    t.true(result.hasOwnProperty('price'));
    t.true(result.hasOwnProperty('availableSeats'));
    t.true(result.hasOwnProperty('ID'));
    t.true(result.hasOwnProperty('studentIDs'));
    t.true(result.hasOwnProperty('coachID'));

    // check the values are correct
    t.is(result.schedule, "5 O'clock every Monday");
    t.is(result.level, "Intermediate");
    t.is(result.price, 10.5);
    t.is(result.availableSeats, 5);
    t.is(result.ID, 10);
    t.deepEqual(result.studentIDs, [198772, 32224, 44221]);
    t.is(result.coachID, 8765);
});


test('Post group by URL', async (t) => {

    const coachId = 8765;

    const {body, statusCode} = await t.context.got.post("group", {json: {
        schedule: "5 O'clock every Monday",
        level: "Intermediate",
        price: 10.5,
        availableSeats: 5,
        ID: 10,
        studentIDs: [ 198772, 32224, 44221 ],
        coachID: 8765
    }});

    t.is(statusCode, 200);

    // check that result is a dictionary
    t.is(typeof body, 'object');

    // check it has the right keys
    t.true(body.hasOwnProperty('schedule'));
    t.true(body.hasOwnProperty('level'));
    t.true(body.hasOwnProperty('price'));
    t.true(body.hasOwnProperty('availableSeats'));
    t.true(body.hasOwnProperty('ID'));
    t.true(body.hasOwnProperty('studentIDs'));
    t.true(body.hasOwnProperty('coachID'));

    // check the values are correct
    t.is(body.schedule, "5 O'clock every Monday");
    t.is(body.level, "Intermediate");
    t.is(body.price, 10.5);
    t.is(body.availableSeats, 5);
    t.is(body.ID, 10);
    t.deepEqual(body.studentIDs, [198772, 32224, 44221]);
    t.is(body.coachID, coachId);
});

test('POST group Bad Request', async (t) => {
    const res = await t.throwsAsync(() => t.context.got.post("group", {json: null}))
    t.is(res.message, "Response code 400 (Bad Request)")
});