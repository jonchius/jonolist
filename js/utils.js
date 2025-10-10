// mundane Google sheet data extraction solved by Copilot and not afraid to admit it
async function getSheetData(url) {

  const response = await fetch(url);
  const csvText = await response.text();
  const rows = csvText.split('\n').filter(row => row.trim() !== '');
  const headers = rows[0].split(',').map(header => header.trim());
  return rows.slice(1).map(row => {
    const values = row.split(',').map(value => value.trim());
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index] || '';
      return obj;
    }, {});
  });

}

// get the hashtag in the URL or use "examples" in rawData
const hashurl = window.location.hash.replace('#', '') || 'examples'