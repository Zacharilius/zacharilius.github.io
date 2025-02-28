/* eslint-disable no-undef,@typescript-eslint/no-unused-vars */

// https://en.wikipedia.org/wiki/List_of_United_States_presidential_election_results_by_state
let tableEl = document.querySelector('.wikitable');

// Iterates through table and gets a sorted array ascending by year with links to the election results in wikipedia.
function parseStateLinks (tableEl) {
	let headerRow = tableEl.querySelector('tr');
	let electionLinks = headerRow.querySelectorAll('th a');

	return Array.from(electionLinks).map((link) => {
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

// Iterates through table and gets a sorted array ascending by year with links to the election results in wikipedia.
function parseWinnerByYear (tableEl) {
	let headerRow = tableEl.querySelector('tr');
	let electionLinks = headerRow.querySelectorAll('th a');
	let electionYears = Array.from(electionLinks).map(electionLink => electionLink.textContent.replace(/\n/g, ''));

	const codeForYear = {};

	// All body rows
	let bodyRows = Array.from(tableEl.querySelectorAll('tr')).splice(1);
	bodyRows.forEach((bodyRow) => {
		const bodyRowCells = Array.from(bodyRow.querySelectorAll('td'));
		bodyRowCells.forEach((bodyRowCell, index) => {
			const boldCell = bodyRowCell.querySelector('b');
			if (boldCell) {
				if (bodyRowCells.length != electionYears.length) {
					throw Error('Mismatch in size so cannot compute year')
				}
				const code = boldCell.textContent.replace(/\n/g, '');
				const year = electionYears[index];
				if (codeForYear[year] != undefined && codeForYear[year].code != code) {
					throw Error(`Year (${year}) already has a code  (${codeForYear[year]}) and found a mismatch with new code (${code})`);
				}
				codeForYear[electionYears[index]] = {
					code,
					name: '',
				};
			}
		});
	});
	return codeForYear;
}
let winnerCodeByYear = parseWinnerByYear(tableEl);
