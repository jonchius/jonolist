// mundane Google sheet data extraction solved by Copilot and not afraid to admit it
async function getSheetData(url) {

  const delimiter = url.endsWith('output=tsv') ? '\t' : ','
  const response = await fetch(url)
  const tsvText = await response.text()
  const rows = tsvText.split('\n').filter(row => row.trim() !== '')
  const headers = rows[0].split(delimiter).map(header => header.trim())
  return rows.slice(1).map(row => {
    const values = row.split(delimiter).map(value => value.trim())
    return headers.reduce((obj, header, index) => {
      obj[header] = cleanQuotes(values[index]) || ''
      return obj
    }, {})
  });

}

// clean up quotation marks because Google Sheets exports a lot of unnecessary quotes
function cleanQuotes(value) {

  if (value === null || value === undefined) return ''

  let str = String(value).trim()

  // remove multiple wrapping quotation marks
  while (
    (str.startsWith('"') || str.startsWith("'")) &&
    (str.endsWith('"') || str.endsWith("'"))
  ) {
    const inner = str.slice(1, -1).trim()
    if (
      !(
        (inner.startsWith('"') || inner.startsWith("'")) &&
        (inner.endsWith('"') || inner.endsWith("'"))
      )
    ) {
      str = inner
      break
    }
    str = inner
  }

  // remove duplicated quotation marks
  str = str.replace(/""/g, '"').replace(/''/g, "'")

  // remove outermost quotation marks
  if (
    (str.startsWith('"') || str.startsWith("'")) &&
    (str.endsWith('"') || str.endsWith("'"))
  ) {
    str = str.slice(1, -1).trim()
  }

  return str

}

// get the hashtag in the URL or use "examples" in rawData
const hashurl = window.location.hash.replace('#', '') || 'examples'