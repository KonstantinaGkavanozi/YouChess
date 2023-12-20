//Get Coach

//Set up the variables
const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const { getCoach } = require('../service/CoachService.js');
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

//Test Get Coach by function
test('GET Coach by function', async (t) => {

    //Expected returned object
    const expectedBody = {
        "name" : "John Doe",
        "groupsCreated" : [ 198772, 32224, 44221 ],
        "ID" : 8765
      };

    const id = expectedBody.ID;

    const result = await getCoach(id);

    //Check if the returned value result is a dictionary
    t.is(typeof result, 'object');

    //Check that the dictionary has the right keys
    t.true(result.hasOwnProperty('name'));
    t.true(result.hasOwnProperty('groupsCreated'));
    t.true(result.hasOwnProperty('ID'));

    //Check that the dictionary has the right values
    t.is(result.name,expectedBody.name);
    t.is(result.ID, expectedBody.ID);
    t.deepEqual(result.groupsCreated, expectedBody.groupsCreated);
   
});

//Test GET Coach by endpoint

test('Get coach by endpoint', async (t) => {

    const expectedBody = {
        "name" : "John Doe",
        "groupsCreated" : [ 198772, 32224, 44221 ],
        "ID" : 8765
      };

    const coachID = expectedBody.ID;

    const { body, statusCode } = await t.context.got.get(`coach/${coachID}`);

    //Check if the Status Code is 200
    t.is(statusCode, 200);

    //Check if the returned body is a dictionary
    t.is(typeof body, 'object');


    //Check that the dictionary has the right keys
    t.true(body.hasOwnProperty('name'));
    t.true(body.hasOwnProperty('groupsCreated'));
    t.true(body.hasOwnProperty('ID'));

    //Check that the dictionary has the right values
    t.is(body.name, expectedBody.name);
    t.is(body.ID, expectedBody.ID);
    t.deepEqual(body.groupsCreated, expectedBody.groupsCreated);



  });



  



    
