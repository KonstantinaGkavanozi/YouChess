const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const { updateClassroom } = require('../service/ClassroomService.js');
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

test('PUT /group/{groupID}/classroom/ successful by function', async (t) => {
    const group_id = 14;
    const updatedUserList = [198772, 32224, 44221];
    const updatedEditingPermissionOwner = 198772;

    const result = await updateClassroom({userList: updatedUserList, editingPermissionOwner: updatedEditingPermissionOwner, ID: group_id},group_id);
    

    // check it has the right keys
    t.true(result.hasOwnProperty('userList'));
    t.true(result.hasOwnProperty('ID'));
    t.true(result.hasOwnProperty('editingPermissionOwner'));

    // // check the values are correct
    t.deepEqual(result.userList, updatedUserList);
    t.is(result.ID, group_id);
    t.is(result.editingPermissionOwner, updatedEditingPermissionOwner);

});



// ------------------ Test by endpoint  ------------------

test('PUT /group/{groupID}/classroom/ successful', async (t) => {
    const group_id = 1234;
    const updatedUserList = [198772, 32224, 44221];
    const updatedEditingPermissionOwner = 198772;

    const { body, statusCode } = await t.context.got.put(`group/${group_id}/classroom/`, {json: {ID: group_id, userList: updatedUserList, editingPermissionOwner: updatedEditingPermissionOwner}});

    t.is(statusCode, 200);

    // // check it has the right keys
    t.true(body.hasOwnProperty('userList'));
    t.true(body.hasOwnProperty('ID'));
    t.true(body.hasOwnProperty('editingPermissionOwner'));

    // // check the values are correct
    t.deepEqual(body.userList, updatedUserList);
    t.is(body.ID, group_id);
    t.is(body.editingPermissionOwner, updatedEditingPermissionOwner);
});


test('PUT group/{groupID}/classroom Bad Request', async (t) => {
    const res = await t.throwsAsync(() => t.context.got.put("group/{groupID}/classroom/", {json: {}}))
    t.is(res.message, "Response code 400 (Bad Request)")
});

test('PUT group/{groupID}/classroom with the type of updatedEditingPermissionOwner beeing not a "number"', async (t) => {
    const group_id = 255;
    const updatedUserList = [1,2,4];
    const updatedEditingPermissionOwner = 'r';
    const res = await t.throwsAsync(() => t.context.got.put(`group/{groupID}/classroom?group_id=${group_id}&updatedUserList=${updatedUserList}&updatedEditingPermissionOwner=${updatedEditingPermissionOwner}`));
    t.is(res.message, "Response code 404 (Not Found)")
});

test('PUT group/{groupID}/classroom with empty user list', async (t) => {
    const group_id = 255;
    const updatedUserList = [];
    const updatedEditingPermissionOwner = 198772;

    const res = await t.throwsAsync(() => t.context.got.put(`group/{groupID}/classroom?group_id=${group_id}&updatedUserList=${updatedUserList}&updatedEditingPermissionOwner=${updatedEditingPermissionOwner}`));
    t.is(res.message, "Response code 404 (Not Found)")
});

