/* jonolist/config.js */

/* STEP 1 - configuring the data source */

// METHOD 1: using static data (a quick way to test the app without a Google sheet)

// all data can go into this rawData object
// each property represents a table's data in the form of an array of objects
// each object in that array has the same set of properties (keys) 
// e.g. [{key1: value, key2: value}, {key1: value, key2: value}, ...]
// i.e. [{name: "Joe", age: 30}, {name: "Sue", age: 25}, ...]
// column names can be a string of letters and numbers but cannot start with a number

const rawData = {  
  "examples" : [
    {id: 1, name: 'Alice', age: 28, city: 'New York'},
    {id: 2, name: 'Bob', age: 34, city: 'Los Angeles'},
    {id: 3, name: 'Charlie', age: 22, city: 'Chicago'},
    {id: 4, name: 'Diana', age: 30, city: 'Miami'},
    {id: 5, name: 'Ethan', age: 26, city: 'Seattle'}
  ], 
  "test" : [
    {id : 1, name: 'Alice', language: 'en', sex: 'f'},
    {id : 2, name: 'Bob', language: 'de', sex: 'm'},
    {id : 3, name: 'Charlie', language: 'fr', sex: 'm'}
  ]
}

// METHOD 2: using dynamic google-sheet data (longer to setup but easier to edit the data)

// have at least one google "library" worksheet that lists all the pages with the following mandatory columns: 
//  id, name, description, link, hidden-sheetURL
//  id = provides the unique identifier (key) for each row
//  name = the title
//  description = the content
//  link = the hashtag URL, e.g. index.html#mytable
//  hidden-sheetURL = the URL of the Google spreadsheet (not shown on app)
//  
// on the Google worksheet, use "File > Share > Publish to web"
//  instead of "Entire document", select the "library" worksheet 
//  then, in the next dropdown, instead of "Web page", select Comma-separated values (.csv)
//  copy the URL below the two drop-down menus
//  use the URL in the librarySheetURL variable below
//  finally, use the "library" sheet to update the library

// uncommented if listing tables on a Google sheet
const librarySheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_lQXI8mAaiQfpk_iHVHbJqvbJeVEoTnIUMvBLSPvgpDDMDdXRHRh-Tn55MC9GXxev5aq0uRcMhkMj/pub?gid=1685727771&single=true&output=csv'

// uncommented if just using the rawData for testing or simple "one-off" tables
// const librarySheetURL = ''

/* STEP 2 - configuring the webpage */

// app title on navbar
const appName = '📋 JONOLIST'