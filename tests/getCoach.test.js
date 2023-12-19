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


test('GET Coach by function', async (t) => {

    const id = 8765;

    const result = await getCoach(id);

    t.is(typeof result, 'object');

    // check it has the right keys
    t.true(result.hasOwnProperty('name'));
    t.true(result.hasOwnProperty('groupsCreated'));
    t.true(result.hasOwnProperty('ID'));

    // check the values are correct
    t.is(result.name, "John Doe");
    t.is(result.ID, id);
    t.deepEqual(result.groupsCreated, [198772, 32224, 44221]);
   
});





    
