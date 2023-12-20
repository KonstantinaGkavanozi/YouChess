const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const { postCoach } = require('../service/CoachService.js');
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

    const coach = {
        "name" : "John Doe",
        "groupsCreated" : [198772, 32224, 44221],
        "ID" : 8765
    };

    const result = await postCoach(coach);

    // check that result is a dictionary
    t.is(typeof result, 'object');

    // check it has the right keys
    t.true(result.hasOwnProperty('name'));
    t.true(result.hasOwnProperty('groupsCreated'));
    t.true(result.hasOwnProperty('ID'));
    

    // check the values are correct
    t.is(result.name, "John Doe");
    t.is(result.ID, 8765);
    t.deepEqual(result.groupsCreated, [198772, 32224, 44221]);
    
});


//Test by endpoint 

test('Post Coach by endpoint', async(t)=>{

    const coach = {
        "name" : "John Doe",
        "groupsCreated" : [198772, 32224, 44221],
        "ID" : 8765
    };

    const coach_id = 8765;
    const coach_name = "John Doe";

    const { body, statusCode } = await t.context.got.post("coach", {json: {name:coach_name}});

    //Check if the status is correct
    t.is(statusCode, 200);
    //Check if the result is an object
    t.is(typeof body, "object");


    // check it has the right keys
    t.true(body.hasOwnProperty('name'));
    t.true(body.hasOwnProperty('groupsCreated'));
    t.true(body.hasOwnProperty('ID'));
    

    // check the values are correct
    t.is(body.name, "John Doe");
    t.is(body.ID, 8765);
    t.deepEqual(body.groupsCreated, [198772, 32224, 44221]);


});