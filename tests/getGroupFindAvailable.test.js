const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const { findAvailableGroups } = require('../service/GroupService.js');
const app = require('../index.js');

const {
    test_level, 
    test_price, 
    test_sorting_price_asc, 
    test_sorting_price_desc,
    test_sorting_available_seats_desc,
    test_complex_combo, 
    test_no_queries,
}  = require('./test_logic/test_getGroupFindAvailable.js');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

test.after.always((t) => {
    t.context.server.close();
});


// ---------------- Test by function ---------------------
test('GET group/findAvailable level by function', async (t) => {
    const price_min = undefined
    const price_max = undefined
    const level = "Intermediate"
    const sortBy = undefined
    const result = await findAvailableGroups(price_min,price_max,level,sortBy)
    
    t.is(typeof result, 'object');

    test_level(t, result, level) // Test logic for level
});


test('GET group/findAvailable price by function', async (t) => {
    const price_min = 7
    const price_max = 11
    const level = undefined
    const sortBy = undefined
    const result = await findAvailableGroups(price_min,price_max,level,sortBy);
   
    t.is(typeof result, 'object');

    test_price(t, result, price_min, price_max) // Test logic for price
});


test('GET group/findAvailable sorting price_asc by function', async (t) => {
    const price_min = undefined
    const price_max = undefined
    const level = undefined
    const sortBy = "price_asc"
    const result = await findAvailableGroups(price_min,price_max,level,sortBy);
   
    t.is(typeof result, 'object');

    test_sorting_price_asc(t, result) // Test logic for sorting by ascending price
});


test('GET group/findAvailable sorting price_desc by function', async (t) => {
    const price_min = undefined
    const price_max = undefined
    const level = undefined
    const sortBy = "price_desc"
    const result = await findAvailableGroups(price_min,price_max,level,sortBy);

    t.is(typeof result, 'object');

    test_sorting_price_desc(t, result) // Test logic for sorting by descending price
});


test('GET group/findAvailable sorting availableSeats_desc by function', async (t) => {
    const price_min = undefined
    const price_max = undefined
    const level = undefined
    const sortBy = "availableSeats_desc"
    const result = await findAvailableGroups(price_min,price_max,level,sortBy);
   
    t.is(typeof result, 'object');

    test_sorting_available_seats_desc(t, result) // Test logic for sorting by descending available seats
});


test('GET group/findAvailable complex combo by function', async (t) => {
    const price_min = 6
    const price_max = 20
    const level = "Intermediate"
    const sortBy = 'price_desc'
    const result = await findAvailableGroups(price_min,price_max,level,sortBy);
    
    t.is(typeof result, 'object');

    test_complex_combo(t, result, level, price_min, price_max) // Test logic for combination of queries (only works for sortBy=price_desc)
});


test('GET group/findAvailable no queries by function', async (t) => {
    const price_min = undefined
    const price_max = undefined
    const level = undefined
    const sortBy = undefined
    const result = await findAvailableGroups(price_min,price_max,level,sortBy);

    t.is(typeof result, 'object');

    test_no_queries(t, result) // Test logic for request with no queries
});


test('GET group/findAvailable invalid level by function', async (t) => {
    const price_min = undefined
    const price_max = undefined
    const level = "Noob"
    const sortBy = undefined

    // Test that an error does get thrown
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


test('GET group/findAvailable invalid sortBy by function', async (t) => {
    const price_min = undefined
    const price_max = undefined
    const level = undefined
    const sortBy = "popularity"

    // Test that an error does get thrown
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
    
    test_level(t, body, level) // Test logic for level
});


test('GET group/findAvailable price', async (t) => {
    const price_min = 7;
    const price_max = 11;
    const { body, statusCode } = await t.context.got.get(`group/findAvailable?price_min=${price_min}&price_max=${price_max}`);

    t.is(statusCode, 200);
    t.is(typeof body, 'object');

    test_price(t, body, price_min, price_max) // Test logic for price
});


test('GET group/findAvailable sorting price asc', async (t) => {
    const sorting_filter = 'price_asc'
    const { body, statusCode } = await t.context.got.get(`group/findAvailable?sortBy=${sorting_filter}`);

    t.is(statusCode, 200);
    t.is(typeof body, 'object');

    test_sorting_price_asc(t, body) // Test logic for sorting by ascending price
});


test('GET group/findAvailable sorting price desc', async (t) => {
    const sorting_filter = 'price_desc'
    const { body, statusCode } = await t.context.got.get(`group/findAvailable?sortBy=${sorting_filter}`);

    t.is(statusCode, 200);
    t.is(typeof body, 'object');

    test_sorting_price_desc(t, body) // Test logic for sorting by descending price
});


test('GET group/findAvailable sorting available seats desc', async (t) => {
    const sorting_filter = 'availableSeats_desc'
    const { body, statusCode } = await t.context.got.get(`group/findAvailable?sortBy=${sorting_filter}`);

    t.is(statusCode, 200);
    t.is(typeof body, 'object');

    test_sorting_available_seats_desc(t, body) // Test logic for sorting by descending available seats
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

    test_complex_combo(t, body, level, price_min, price_max) // Test logic for combination of queries (only works for sortBy=price_desc)
});


test('GET group/findAvailable no queries', async (t) => {
    const { body, statusCode } = await t.context.got.get(
        `group/findAvailable`
    );

    t.is(statusCode, 200);
    t.is(typeof body, 'object');

    test_no_queries(t, body) // Test logic for request with no queries
});


test('GET group/findAvailable Bad Request', async (t) => {
    const price_min = "hi"
    const res = await t.throwsAsync(() => t.context.got.get(
        `group/findAvailable?price_min=${price_min}`
    ));
    t.is(res.message, "Response code 400 (Bad Request)") // Test that we do get a 400 response code
});