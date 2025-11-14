/* jonolist/app.js
// handles the filtering and sorting of list data for display in a table
*/

const libraryData = async () => {
  return await getSheetData(librarySheetURL) || []
}

function app() {

  return {

    // default states
    loading: true,
    search: '',
    sortKey: '',
    sortDirection: 'asc',
    selectedColumn: '',
    filterFields: [],
    data: [],
    uniqueColumn: '',
    library: [],
    dataset: {},

    // initialize before load
    async init() {

      // get page metadata
      if (librarySheetURL === '') {
        // if library originates from rawData in config.js
        this.library = Object.keys(rawData).reduce((lib, key) => {
          lib[key] = { link: '#' + key, name: key }
          return lib
        }, {})
        // metadata for rawData pages will only include the title
        this.dataset = { "name" : hashurl }
      } else {
        // if library originates from Google sheets
        this.library = JSON.parse(JSON.stringify(await libraryData()))
        // get the metadata of the current page (title, description, category, etc.)
        this.dataset = this.library.find(item => item.link.replace("index.html", "").toLowerCase() === window.location.hash.toLowerCase())
      }

      // blank 404 page for an invalid hash (i.e. no data)
      if (!this.dataset) {
        this.loading = false
        this.data = []
      }

      // update <title> tag according to the dataset metadata
      const pageName = (this.dataset) ? this.dataset['name'] : ""
      document.title = (pageName ? pageName + ' - ' : '404 - ') + appName

      // pre-load the table data
      if (this.dataset['hidden-sheetURL'] === 'none' || this.dataset['hidden-sheetURL'] === undefined) {
        // from static rawData
        this.data = rawData[hashurl]
        this.loading = false
      } else {
        // from a google sheet
        this.data = await getSheetData(this.dataset['hidden-sheetURL'])
        this.loading = false
      }

      // populate ui defaults
      if (this.data?.length > 0) {
        this.filterFields = Object.keys(this.data[0])
        this.sortKey = this.dataset['hidden-sortKey'] ? String(this.dataset['hidden-sortKey']) : this.filterFields[0]
        this.uniqueColumn = this.filterFields[0]
        this.sortDirection = this.dataset['hidden-sortDirection'] ?? 'asc'
      }

    },

    // search by query in either all fields or a selected field
    get filteredData() {

      let query = this.search.toLowerCase().trim()

      if (!this.data || !this.dataset) return null

      return this.data.filter(item => {
        if (query == '') return true
        if (this.selectedColumn != '') {
          return (item[this.selectedColumn] || '').toString().toLowerCase().includes(query)
        }
        return this.filterFields.some(field =>
          String(item[field] || '').toLowerCase().includes(query)
        )
      })
      .sort((a, b) => {

        let ordering = this.sortDirection === 'asc' ? 1 : -1

        // get the values
        let valA = a[this.sortKey]
        let valB = b[this.sortKey]

        // cast dates
        let dateA = Date.parse(valA)
        let dateB = Date.parse(valB)

        // determine if dates
        let isDateA = dateA instanceof Date
        let isDateB = dateB instanceof Date
      
        // compare dates
        if (isDateA && isDateB) {
          if (dateA < dateB) return -1 * ordering
          if (dateA > dateB) return 1 * ordering
          return 0
        }

        // otherwise, cast numbers
        let numA = parseFloat(valA)
        let numB = parseFloat(valB)

        // determine if both are numbers
        let bothNumbers = !isNaN(numA) && !isNaN(numB)

        if (bothNumbers) {

          // compare numbers
          if (numA < numB) return -1 * ordering
          if (numA > numB) return 1 * ordering
          return 0

        } else {

          // otherwise, compare as strings
          let strA = String(valA).toLowerCase()
          let strB = String(valB).toLowerCase()
          if (strA < strB) return -1 * ordering
          if (strA > strB) return 1 * ordering
          return 0

        }
      });
    },

    // sort by field in either ascending or descending order
    sort(key) {
      if (this.sortKey === key) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortDirection = 'asc'
      }
      this.sortKey = key
    },
  }

}

window.app = app;