// https://en.wikipedia.org/wiki/List_of_United_States_presidential_election_results_by_state

let tableEl = document.querySelector('.wikitable');

// Iterates through table and gets a sorted array ascending by year with links to the election results in wikipedia.
function parseStateLinks (tableEl) {
    let headerRow = tableEl.querySelector('tr');
    let stateLinks = headerRow.querySelectorAll('th a');

    return Array.from(stateLinks).map((link) => {
        return {
            link: link.href,
            value: link.textContent.replace(/\n/g, '')
        }
    });
}
let stateLinks = parseStateLinks(tableEl);

function parseStateResults (tableEl) {
    let allRows = Array.from(tableEl.querySelectorAll('tr'));
    // First row and last row are header rows.
    let stateRows = allRows.splice(1, allRows.length - 2);
    return stateRows.map((row) => {
        let stateEl = row.querySelector('th');
        let state = stateEl.textContent.replace(/\n/g, '');
        let stateHref = stateEl.querySelector('a').href;
        let yearResultsCodes = Array.from(row.querySelectorAll('td')).map((cell) => {
            return cell.textContent.replace(/\n/g, '');
        });

        return {
            state,
            stateHref,
            yearResultsCodes,
        };
    });
}
let stateResults = parseStateResults(tableEl);
