# jonolist

a flexible list applet for Alpine.js that allows searching and sorting, as well as filtering by column, then displays the data in the form of a table

we can use either a JavaScript array with objects (with key-value pairs)

or 

a Google spreadsheet to update data quickly and easily in real-time with no coding!

## terminology

a **library** refers to a list of lists

a **dataset** refers to a list

## setup

### using rawData for quick startup

in config.js:

(1) modify the `rawData` variable according to taste

(2) add/uncomment this line out: 

```
const librarySheetURL = ''
```

(3) modify the `appName` variable if desired

(4) upload the contents to any web server (no build system required!)

### using Google sheets for easy data entry and editing

// one-time setup steps

* start a new [Google sheet](https://sheets.google.com)
* ensure that the sheet has the first row as table column headers 
* have at least one google "library" worksheet that lists all the pages with the following mandatory columns:   
  * `id` = provides the unique identifier (key) for each row
  * `name` = the title
  * `description` = the content
  * `link` = the hashtag URL, e.g. index.html#mytable
  * `hidden-sheetURL` = the URL of the Google spreadsheet
* on the Google worksheet, use _File > Share > Publish to web_ (a modal should appear)
  * instead of _Entire document_, select the "library" worksheet 
  * then, in the next dropdown, instead of "Web page", select _Comma-separated values (.csv)_
  * copy the URL located below the drop-down menus
* use the "library" sheet to update the library

in config.js:

* leave the `rawData` variable alone and modify the `librarySheetURL` variable to a Google sheet

// after this, no more "coding": just use Google sheets!

so, to create new datasets: 

* start a new worksheet with headers and data rows
* on the Google worksheet, use _File > Share > Publish to web_ (a modal should appear)
  * instead of _Entire document_, select the "library" worksheet 
  * then, in the next dropdown, instead of "Web page", select _Comma-separated values (.csv)_
  * copy the URL located below the drop-down menus
* include this new worksheet in the "library" worksheet
  * ensure that the `hidden-sheetURL` column contains that copied URL 

then, any update on the google sheets will result in a live update of the webpages!

## credits

with help from

* [zulfikarditya's blog post](https://medium.com/@zulfikarditya/alpine-js-the-minimalist-javascript-framework-for-modern-web-development-839382997988) 
* github copilot (for help in extracting google sheet data in `js/utils.js`)