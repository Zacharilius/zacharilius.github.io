import stateLinks from './stateLinks.json';
import stateResults from './stateResults.json';

interface Result {
	winner: string;
	href: string;
	color: string;
}

export interface Election {
	year: string;
	link: string;
	results: Record<string, Result>
}

export const getElectionForYearIndex = (yearIndex: number): Election => {
	yearIndex = yearIndex % stateLinks.length;
	const stateLink = stateLinks[yearIndex];
	const results: Record<string, Result> = {};
	stateResults.forEach((stateResult => {
		const code = stateResult.yearResultsCodes[yearIndex];
		results[stateResult.state] = {
			winner: tryGetWinnerByCode(code),
			href: stateResult.statehref,
			color: tryGetColorByCode(code)
		}
	}));
	return {
		year: stateLink.value,
		link: stateLink.link,
		results,
	}
}

const NAME_FOR_CODE: Record<string, string> = {
	'R': 'Republican',
	'D': 'Democratic',
	'DR': 'Democratic-Republican',
	'W': 'Whig',
	'F': 'Federalist',
	'GW': 'George Washington',
	'NR': 'National Republican',
	'SD': 'Southern Democrat',
	'BM': 'Progressive "Bull Moose"',
	'LR': 'Liberal Republican',
	'AI': 'American Independent',
	'SR': 'States\' Rights',
	'PO': 'Populist',
	'CU': 'Constitutional Union',
	'I': 'Independent',
	'PR': 'Progressive',
	'ND': 'Northern Democrat',
	'KN': 'Know Nothing',
	'AM': 'Anti-Masonic',
	'N': 'Nullifier',
	'SP': 'Split evenly',
	'Jackson': 'Jackson',
	'Adams': 'Adams',
	'Crawford': 'Crawford',
	'Clay': 'Clay',
};

const COLOR_FOR_NAME: Record<string, string> = {
	'R': '#a6cee3',
	'D': '#1f78b4',
	'DR': '#b2df8a',
	'W': '#33a02c',
	'F': '#fb9a99',
	'GW': '#e31a1c',
	'NR': '#fdbf6f',
	'SD': '#ff7f00',
	'BM': '#cab2d6',
	'LR': '#6a3d9a',
	'AI': '#ffff99',
	'SR': '#b15928',
	'PO': '#a6cee3',
	'CU': '#1f78b4',
	'I': '#b2df8a',
	'PR': '#33a02c',
	'ND': '#fb9a99',
	'KN': '#e31a1c',
	'AM': '#fdbf6f',
	'N': '#ff7f00',
	'SP': '#cab2d6',
	'Jackson': '#6a3d9a',
	'Adams': '#ffff99',
	'Crawford': '#b15928',
	'Clay': '#a6cee3',
}

const tryGetWinnerByCode = (code: string): string => {
	return NAME_FOR_CODE[code] ?? '';
}

const tryGetColorByCode = (code: string): string => {
	return COLOR_FOR_NAME[code] ?? '#808080';
}
