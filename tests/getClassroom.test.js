const test  = require('ava');
const http = require('http');
const listen = require('test-listen');
const got = require('got');
const nock = require('nock');


const { getClassroom } = require('../service/ClassroomService.js');
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

test('GET Classroom by function', async (t) => {

    const group_id = 10;

    const result = await getClassroom(group_id);

    // check that result is a dictionary
    t.is(typeof result, 'object');

    const expected = {
        "userList" : [ 198772, 32224, 44221 ],
        "ID" : 1234,
        "editingPermissionOwner" : 198772
      };

    const expectedKeys = Object.keys(expected);
    expectedKeys.forEach(key => {
      t.true(result.hasOwnProperty(key), `Result should have key: ${key}`);
    });

    t.deepEqual(result, expected);
});




test('GET group/{groupID}/classroom', async (t) => {
    const group_id = 1234;
  
    // Mock the HTTP request using nock
    nock('http://localhost:8080/') 
    .get(`/group/${group_id}/classroom`) 
    .reply(200, {
        "userList": [198772, 32224, 44221],
        "ID": 1234,
        "editingPermissionOwner": 198772
    });

// Make the HTTP request 
    const response = await got.get('http://localhost:8080/group/1234/classroom');
    const responseBody = JSON.parse(response.body);
    
    t.is(response.statusCode, 200);  
  
    const expected = {
        "userList" : [ 198772, 32224, 44221 ],
        "ID" : 1234,  
        "editingPermissionOwner" : 198772
    };
  
    // Check if it has the right keys
    const expectedKeys = Object.keys(expected);
    expectedKeys.forEach(key => {
        t.true(responseBody.hasOwnProperty(key), `Result should have key: ${key}`);
    });
  
    // Check if the values are correct
    t.deepEqual(responseBody, expected);
  
    // Clean up the nock mocks
    nock.cleanAll(); 
  });


test('groupGroupIDClassroomSetEditorPOST ', async (t) => {
    t.pass();
});