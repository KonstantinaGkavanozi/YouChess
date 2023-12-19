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

test('GET Group by function', async (t) => {

    const id = 10;

    const result = await getGroup(id);

    // check that result is a dictionary
    t.is(typeof result, 'object');

    
    const expected = {
        "schedule": "5 O'clock every Monday",
        "level": "Intermediate",
        "price": 10.5,
        "availableSeats": 5,
        "ID": 10,
        "studentIDs": [198772, 32224, 44221],
        "coachID": 8765
      };

    const expectedKeys = Object.keys(expected);
    expectedKeys.forEach(key => {
      t.true(result.hasOwnProperty(key), `Result should have key: ${key}`);
    });

    
    // Assert that the actual result matches the expected result
    t.deepEqual(result, expected);
});




test('GET group/{groupID}', async (t) => {
    const group_id = 10;

    // Perform the HTTP GET request and capture the response
    const response = await t.context.got.get(`group/${group_id}`);

    // Extract the response body from the response object
    const body = response.body;

    // Check the status code
    t.is(response.statusCode, 200);

    // Check that the result is a dictionary (assuming it's JSON)
    t.is(typeof body, 'object');

    const expected = {
        "schedule" : "5 O'clock every Monday",
        "level" : "Intermediate",
        "price" : 10.5,
        "availableSeats" : 5,
        "ID" : 10,
        "studentIDs" : [198772,32224,44221],
        "coachID" : 8765
      };
    const expectedKeys = Object.keys(expected);
    
    expectedKeys.forEach(key => {
        t.true(body.hasOwnProperty(key), `Result should have key: ${key}`);
        });
  
    // Check the values are correct
    t.deepEqual(body, expected);
});