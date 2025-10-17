// mundane Google sheet data extraction solved by Copilot and not afraid to admit it
async function getSheetData(url) {

  const response = await fetch(url);
  const csvText = await response.text();
  const rows = csvText.split('\n').filter(row => row.trim() !== '');
  const headers = rows[0].split(',').map(header => header.trim());
  return rows.slice(1).map(row => {
    const values = row.split(',').map(value => value.trim());
    return headers.reduce((obj, header, index) => {      
      obj[header] = cleanQuotes(values[index]) || '';
      return obj;
    }, {});
  });

}

// allow only "one pair" of surrounding quotes and avoid things """like this""" in table cells
function cleanQuotes(value) {
  
  if (value === null || value === undefined) return ''
  
  let str = String(value).trim()
    
  // remove multiple wrapping quotation marks
  while (
    (str.startsWith('"') || str.endsWith('"')) &&
    (str.startsWith("'") || str.endsWith("'"))    
  ) {        
    const inner = str.slice(1, -1).trim();
    if (
      !(inner.startsWith('"') && inner.endsWith('"')) &&
      !(inner.startsWith("'") && inner.endsWith("'"))
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
    (str.startsWith('"') && str.endsWith('"')) ||
    (str.startsWith("'") && str.endsWith("'"))
  ) {
    str = str.slice(1, -1).trim();
  }

  return str

}

// get the hashtag in the URL or use "examples" in rawData
const hashurl = window.location.hash.replace('#', '') || 'examples'