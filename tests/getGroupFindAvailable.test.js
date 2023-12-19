const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const { findAvailableGroups } = require('../service/GroupService.js');
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

// ---------------- Test by function ---------------------

test('GET group/findAvailable level by function', async (t) => {
    const price_min = undefined
    const price_max = undefined
    const level = "Intermediate"
    const sortBy = undefined
    const result = await findAvailableGroups(price_min,price_max,level,sortBy)
    
    t.is(typeof result, 'object');
    
    // Check that all the returned groups have the right level
    for (const group of result){
        t.true(group.hasOwnProperty('level'));
        t.is(group.level, level)
    } 
    
    // Database specific test, to test that all the qualified groups are returned  
    t.deepEqual(
        result,
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 5,
                "availableSeats" : 5,
                "ID" : 2,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 20,
                "availableSeats" : 5,
                "ID" : 4,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
        ]
    )
});


test('GET group/findAvailable price by function', async (t) => {
    const price_min = 7
    const price_max = 11
    const level = undefined
    const sortBy = undefined
    const result = await findAvailableGroups(price_min,price_max,level,sortBy);
   
    t.is(typeof result, 'object');

    // Check that all the returned groups have a price between the range [price_min, price_max]
    for (const group of result){
        t.true(group.hasOwnProperty('price'));
        t.true(price_min <= group.price <= price_max)
    } 
    
    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        result,
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Beginner",
                "price" : 7,
                "availableSeats" : 1,
                "ID" : 5,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
        ]
    )
});

test('GET group/findAvailable sorting price_asc by function', async (t) => {
    const price_min = undefined
    const price_max = undefined
    const level = undefined
    const sortBy = "price_asc"
    const result = await findAvailableGroups(price_min,price_max,level,sortBy);
   
    t.is(typeof result, 'object');

    // Check that all the returned groups are sorted in ascending price order
    cur_value = -1
    for (const group of result){
        t.true(group.hasOwnProperty('price'));
        t.true(group.price >= cur_value)
        cur_value = group.price
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        result,
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 5,
                "availableSeats" : 5,
                "ID" : 2,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Beginner",
                "price" : 7,
                "availableSeats" : 1,
                "ID" : 5,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Advanced",
                "price" : 12,
                "availableSeats" : 2,
                "ID" : 1,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 20,
                "availableSeats" : 5,
                "ID" : 4,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
        ]
    )
});


test('GET group/findAvailable sorting price_desc by function', async (t) => {
    const price_min = undefined
    const price_max = undefined
    const level = undefined
    const sortBy = "price_desc"
    const result = await findAvailableGroups(price_min,price_max,level,sortBy);

    t.is(typeof result, 'object');

    // Check that all the returned groups are sorted in descending price order 
    cur_value = Infinity
    for (const group of result){
        t.true(group.hasOwnProperty('price'));
        t.true(group.price <= cur_value)
        cur_value = group.price
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        result,
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 20,
                "availableSeats" : 5,
                "ID" : 4,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Advanced",
                "price" : 12,
                "availableSeats" : 2,
                "ID" : 1,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Beginner",
                "price" : 7,
                "availableSeats" : 1,
                "ID" : 5,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 5,
                "availableSeats" : 5,
                "ID" : 2,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
        ]
    )
});


test('GET group/findAvailable sorting availableSeats_desc by function', async (t) => {
    const price_min = undefined
    const price_max = undefined
    const level = undefined
    const sortBy = "availableSeats_desc"
    const result = await findAvailableGroups(price_min,price_max,level,sortBy);
   
    t.is(typeof result, 'object');

    // Check that all the returned groups are sorted in descending availableSeats order 
    cur_value = Infinity
    for (const group of result){
        t.true(group.hasOwnProperty('availableSeats'));
        t.true(group.availableSeats <= cur_value)
        cur_value = group.price
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        result, 
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 5,
                "availableSeats" : 5,
                "ID" : 2,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 20,
                "availableSeats" : 5,
                "ID" : 4,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Advanced",
                "price" : 12,
                "availableSeats" : 2,
                "ID" : 1,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Beginner",
                "price" : 7,
                "availableSeats" : 1,
                "ID" : 5,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
        ]
    )
});


test('GET group/findAvailable complex combo by function', async (t) => {
    const price_min = 6
    const price_max = 20
    const level = "Intermediate"
    const sortBy = 'price_desc'
    const result = await findAvailableGroups(price_min,price_max,level,sortBy);
    
    t.is(typeof result, 'object');

    // Check that all the returned groups have the right level
    for (const group of result){
        t.true(group.hasOwnProperty('level'));
        t.is(group.level, level)
    } 
    // Check that all the returned groups have a price between the range [price_min, price_max]
    for (const group of result){
        t.true(group.hasOwnProperty('price'));
        t.true(price_min <= group.price <= price_max)
    } 
    // Check that all the returned groups are sorted in descending price order 
    cur_value = Infinity
    for (const group of result){
        t.true(group.hasOwnProperty('price'));
        t.true(group.price <= cur_value)
        cur_value = group.price
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        result, 
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 20,
                "availableSeats" : 5,
                "ID" : 4,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
        ]
    )
});


test('GET group/findAvailable no queries by function', async (t) => {
    const price_min = undefined
    const price_max = undefined
    const level = undefined
    const sortBy = undefined
    const result = await findAvailableGroups(price_min,price_max,level,sortBy);

    t.is(typeof result, 'object');

    // Check that all the returned groups have the attributes that are used for filtering
    for (const group of result){
        t.true(group.hasOwnProperty('price'));
        t.true(group.hasOwnProperty('level'));
        t.true(group.hasOwnProperty('availableSeats'));
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        result, 
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Advanced",
                "price" : 12,
                "availableSeats" : 2,
                "ID" : 1,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 5,
                "availableSeats" : 5,
                "ID" : 2,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 20,
                "availableSeats" : 5,
                "ID" : 4,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Beginner",
                "price" : 7,
                "availableSeats" : 1,
                "ID" : 5,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            }
        ]
    )
});


test('GET group/findAvailable Bad Request by function', async (t) => {
    const price_min = undefined
    const price_max = undefined
    const level = "Noob"
    const sortBy = undefined

    let err = false
    try{
        const result = await findAvailableGroups(price_min,price_max,level,sortBy);
    }
    catch(e){
        err = true
        console.log(e)
    }

    t.true(err)
})


// ---------------- Test by endpoint ---------------------

test('GET group/findAvailable level', async (t) => {
    const level = "Intermediate"
    const { body, statusCode } = await t.context.got.get(`group/findAvailable?level=${level}`);

    t.is(statusCode, 200);
    t.is(typeof body, 'object');
    
    // Check that all the returned groups have the right level
    for (const group of body){
        t.true(group.hasOwnProperty('level'));
        t.is(group.level, level)
    } 
    
    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        body,
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 5,
                "availableSeats" : 5,
                "ID" : 2,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 20,
                "availableSeats" : 5,
                "ID" : 4,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
        ]
    )
});


test('GET group/findAvailable price', async (t) => {
    const price_min = 7;
    const price_max = 11;
    const { body, statusCode } = await t.context.got.get(`group/findAvailable?price_min=${price_min}&price_max=${price_max}`);

    t.is(statusCode, 200);
    t.is(typeof body, 'object');

    // Check that all the returned groups have a price between the range [price_min, price_max]
    for (const group of body){
        t.true(group.hasOwnProperty('price'));
        t.true(price_min <= group.price <= price_max)
    } 
    
    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        body,
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Beginner",
                "price" : 7,
                "availableSeats" : 1,
                "ID" : 5,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
        ]
    )
});

test('GET group/findAvailable sorting price asc', async (t) => {
    const sorting_filter = 'price_asc'
    const { body, statusCode } = await t.context.got.get(`group/findAvailable?sortBy=${sorting_filter}`);

    t.is(statusCode, 200);
    t.is(typeof body, 'object');

    // Check that all the returned groups are sorted in ascending price order
    cur_value = -1
    for (const group of body){
        t.true(group.hasOwnProperty('price'));
        t.true(group.price >= cur_value)
        cur_value = group.price
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        body,
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 5,
                "availableSeats" : 5,
                "ID" : 2,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Beginner",
                "price" : 7,
                "availableSeats" : 1,
                "ID" : 5,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Advanced",
                "price" : 12,
                "availableSeats" : 2,
                "ID" : 1,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 20,
                "availableSeats" : 5,
                "ID" : 4,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
        ]
    )
});


test('GET group/findAvailable sorting price desc', async (t) => {
    const sorting_filter = 'price_desc'
    const { body, statusCode } = await t.context.got.get(`group/findAvailable?sortBy=${sorting_filter}`);

    t.is(statusCode, 200);
    t.is(typeof body, 'object');

    // Check that all the returned groups are sorted in descending price order
    cur_value = Infinity
    for (const group of body){
        t.true(group.hasOwnProperty('price'));
        t.true(group.price <= cur_value)
        cur_value = group.price
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        body,
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 20,
                "availableSeats" : 5,
                "ID" : 4,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Advanced",
                "price" : 12,
                "availableSeats" : 2,
                "ID" : 1,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Beginner",
                "price" : 7,
                "availableSeats" : 1,
                "ID" : 5,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 5,
                "availableSeats" : 5,
                "ID" : 2,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
        ]
    )
});


test('GET group/findAvailable sorting available seats desc', async (t) => {
    const sorting_filter = 'availableSeats_desc'
    const { body, statusCode } = await t.context.got.get(`group/findAvailable?sortBy=${sorting_filter}`);

    t.is(statusCode, 200);
    t.is(typeof body, 'object');

    // Check that all the returned groups are sorted in descending availableSeats order
    cur_value = Infinity
    for (const group of body){
        t.true(group.hasOwnProperty('availableSeats'));
        t.true(group.availableSeats <= cur_value)
        cur_value = group.availableSeats
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        body, 
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 5,
                "availableSeats" : 5,
                "ID" : 2,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 20,
                "availableSeats" : 5,
                "ID" : 4,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Advanced",
                "price" : 12,
                "availableSeats" : 2,
                "ID" : 1,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Beginner",
                "price" : 7,
                "availableSeats" : 1,
                "ID" : 5,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
        ]
    )
});


test('GET group/findAvailable complex combo', async (t) => {
    const price_min = 6
    const price_max = 20
    const level = "Intermediate"
    const sorting_filter = 'price_desc'
    const { body, statusCode } = await t.context.got.get(
        `group/findAvailable?price_min=${price_min}&price_max=${price_max}&level=${level}&sortBy=${sorting_filter}`
    );

    t.is(statusCode, 200);
    t.is(typeof body, 'object');

    // Check that all the returned groups have the right level
    for (const group of body){
        t.true(group.hasOwnProperty('level'));
        t.is(group.level, level)
    } 
    // Check that all the returned groups have a price between the range [price_min, price_max]
    for (const group of body){
        t.true(group.hasOwnProperty('price'));
        t.true(price_min <= group.price <= price_max)
    } 
    // Check that all the returned groups are sorted in descending price order
    cur_value = Infinity
    for (const group of body){
        t.true(group.hasOwnProperty('price'));
        t.true(group.price <= cur_value)
        cur_value = group.price
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        body, 
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 20,
                "availableSeats" : 5,
                "ID" : 4,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
        ]
    )
});


test('GET group/findAvailable no queries', async (t) => {
    const price_min = 6
    const price_max = 20
    const level = "Intermediate"
    const sorting_filter = 'price_desc'
    const { body, statusCode } = await t.context.got.get(
        `group/findAvailable`
    );

    t.is(statusCode, 200);
    t.is(typeof body, 'object');

     // Check that all the returned groups have the attributes that are used for filtering
    for (const group of body){
        t.true(group.hasOwnProperty('price'));
        t.true(group.hasOwnProperty('level'));
        t.true(group.hasOwnProperty('availableSeats'));
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        body, 
        [
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Advanced",
                "price" : 12,
                "availableSeats" : 2,
                "ID" : 1,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 5,
                "availableSeats" : 5,
                "ID" : 2,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 10.5,
                "availableSeats" : 4,
                "ID" : 3,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Intermediate",
                "price" : 20,
                "availableSeats" : 5,
                "ID" : 4,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            },
            {
                "schedule" : "5 O'clock every Monday",
                "level" : "Beginner",
                "price" : 7,
                "availableSeats" : 1,
                "ID" : 5,
                "studentIDs" : [ 198772, 32224, 44221 ],
                "coachID" : 8765
            }
        ]
    )
});


test('GET group/findAvailable Bad Request', async (t) => {
    const price_min = "hi"
    const res = await t.throwsAsync(() => t.context.got.get(
        `group/findAvailable?price_min=${price_min}`
    ));
    t.is(res.message, "Response code 400 (Bad Request)")
});