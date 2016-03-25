# Query Compiler

NOTE: This project is in pre-release development.

The goal is to provide a simple object-based syntax for defining a data query. A high-level query object syntax is compiled to an array of uniform, lower-level query objects that can be parsed to perform a query. A high-level query can utilize elements of the low-level syntax as needed in order to provide sufficient granularity in the query. Additionally, a SQL-like query language can be compiled to the high-level query object syntax, which can in turn be compiled to the lower-level query object syntax for parsing.

## Basics

- Items grouped together in an object are ANDed together
- Items grouped together in an array are ORed together
- A high-level query object syntax compiles into a uniform, low-level query object format
- A SQL-like query statement is compiled to the high-level query object format, which is then compiled to the low-level query object format
- The compilers for transforming a query statement to a high-level query object and for transforming a high-level query object to a low-level query object array are reusable.
- You must implement code in order to transform the low-level query syntax into a format that can be used with your data source (e.g. MongoDB, DynamoDB, proprietary API, etc)

## Examples:

```js
/*
* Example 1: Query for someone named Bill Clinton.
*/
compile({firstName: 'Bill', lastName: 'Clinton'});

// Compiles to...
[
    {
        'firstName': [
            {
                '=': 'Bill'
            }
        ],
        'lastName': [
            {
                '=': 'Clinton'
            }
        ]
    }
]

/*
* Example 2: Query for Fender and Gibson guitars priced between 40 and 100 dollars.
*/
compile({category: 'Guitars', 'brand.name': ['Fender', 'Gibson'], {'price': {'>': 40, '<': 100}});

// Compiles to...

// Filters Array (filters in the array are OR'd together)
[
    // Filter Object (property comparisons in the object are ANDed together)
    {
        // Property Comparisons Array (comparison operation objects in the same array are OR'd together)
        'category': [
            {
                '=': 'Guitars'
            }
        ],
        'brand.name': [
                // Property Comparison Object (comparison operations in the same object are ANDed together)
            {
                '=': 'Fender'
            },
            {
                '=': 'Gibson'
            }
        ],
        'price': [
            {
                '>': 40,
                '<': 100
            }
        ]
    }
]

/**
* Example 3: An array of high-level query query for someone named Bill Clinton or Barack Obama.
*/
compile([{firstName: 'Bill', lastName: 'Clinton'}, {firstName: 'Barack', lastName: 'Obama'}]);

// Compiles to...
[
    {
        'firstName': [
            {
                '=': 'Bill'
            }
        ],
        'lastName': [
            {
                '=': 'Clinton'
            }
        ]
    }
]
```
