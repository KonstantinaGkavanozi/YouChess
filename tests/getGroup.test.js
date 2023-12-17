const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const { getGroup } = require('../service/GroupService.js');
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

test('GET Group by function', async (t) => {

    const id = 198772;

    const result = await getGroup(id);
    // check that group looks like the example
    // examples['application/json'] = {
    //     "schedule" : "5 O'clock every Monday",
    //     "level" : "Intermediate",
    //     "price" : 10.5,
    //     "availableSeats" : 5,
    //     "ID" : 10,
    //     "studentIDs" : [ 198772, 32224, 44221 ],
    //     "coachID" : 8765
    //   };

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
    t.is(result.ID, id);
    t.deepEqual(result.studentIDs, [198772,32224,44221]);
    t.is(result.coachID,  8765);
});

