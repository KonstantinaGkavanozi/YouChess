// Functions that implement the logic of the tests


const { groups_db } = require('../../service/GroupService.js');


exports.test_level = function(t, result_body, input_level){
    // Check that all the returned groups have the right level
    for (const group of result_body){
        t.true(group.hasOwnProperty('level'));
        t.is(group.level, input_level)
    } 
    
    // Database specific test, to test that all the qualified groups are returned  
    t.deepEqual(
        result_body,
        [
            groups_db[1],
            groups_db[2],
            groups_db[3],
        ]
    )
}


exports.test_price = function(t, result_body, input_price_min, input_price_max){
    // Check that all the returned groups have a price between the range [price_min, price_max]
    for (const group of result_body){
        t.true(group.hasOwnProperty('price'));
        t.true(input_price_min <= group.price <= input_price_max)
    } 
    
    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        result_body,
        [
            groups_db[2],
            groups_db[4],
        ]
    )
}


exports.test_sorting_price_asc = function(t, result_body){
    // Check that all the returned groups are sorted in ascending price order
    cur_value = -1
    for (const group of result_body){
        t.true(group.hasOwnProperty('price'));
        t.true(group.price >= cur_value)
        cur_value = group.price
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        result_body,
        [
            groups_db[1],
            groups_db[4],
            groups_db[2],
            groups_db[0],
            groups_db[3],
        ]
    )
}


exports.test_sorting_price_desc = function(t, result_body){
    // Check that all the returned groups are sorted in descending price order 
    cur_value = Infinity
    for (const group of result_body){
        t.true(group.hasOwnProperty('price'));
        t.true(group.price <= cur_value)
        cur_value = group.price
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        result_body,
        [
            groups_db[3],
            groups_db[0],
            groups_db[2],
            groups_db[4],
            groups_db[1],
        ]
    )
}


exports.test_sorting_available_seats_desc = function(t, result_body){
    // Check that all the returned groups are sorted in descending availableSeats order 
    cur_value = Infinity
    for (const group of result_body){
        t.true(group.hasOwnProperty('availableSeats'));
        t.true(group.availableSeats <= cur_value)
        cur_value = group.price
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        result_body, 
        [
            groups_db[1],
            groups_db[3],
            groups_db[2],
            groups_db[0],
            groups_db[4],
        ]
    )
}


exports.test_complex_combo = function(t, result_body, input_level, input_price_min, input_price_max){
    // We assume sortBy = 'price_desc'

    // Check that all the returned groups have the right level
    for (const group of result_body){
        t.true(group.hasOwnProperty('level'));
        t.is(group.level, input_level)
    } 
    // Check that all the returned groups have a price between the range [price_min, price_max]
    for (const group of result_body){
        t.true(group.hasOwnProperty('price'));
        t.true(input_price_min <= group.price <= input_price_max)
    } 
    // Check that all the returned groups are sorted in descending price order 
    cur_value = Infinity
    for (const group of result_body){
        t.true(group.hasOwnProperty('price'));
        t.true(group.price <= cur_value)
        cur_value = group.price
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        result_body, 
        [
            groups_db[3],
            groups_db[2],
        ]
    )
}


exports.test_no_queries = function(t, result_body){
    // Check that all the returned groups have the attributes that are used for filtering
    for (const group of result_body){
        t.true(group.hasOwnProperty('price'));
        t.true(group.hasOwnProperty('level'));
        t.true(group.hasOwnProperty('availableSeats'));
    }

    // Database specific test, to test that all the qualified groups are returned
    t.deepEqual(
        result_body, 
        groups_db
    )
}