import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

import { ReactNode } from 'react';

export type mostPlayedCardsData = {
	cardName: string;
	colorIdentity: string;
	cardType: string;
	cardAmount: number;
	cardPercent: number;
	inXDecksofColor: number;
};

export type AverageDeckStatsData = {
	averageArtifactCount: number;
	averageLandCount: number;
	averageSorceryCount: number;
	averageInstantCount: number;
	averagePlaneswalkerCount: number;
	averageCreatureCount: number;
	averageBattleCount: number;
};

export type AveragesByColorIdentityData = {
	colorIdentity: string;
	averageArtifactCount: number;
	averageLandCount: number;
	averageSorceryCount: number;
	averageInstantCount: number;
	averagePlaneswalkerCount: number;
	averageCreatureCount: number;
	averageBattleCount: number;
};

// Define a type for mapping color characters to image source URLs
export type ColorIconMap = { [key in string]: string };

export type DeckStatsData = {
	deckName: string;
	colorIdentity: string;
	artifactCount: number;
	landCount: number;
	sorceryCount: number;
	instantCount: number;
	planeswalkerCount: number;
	creatureCount: number;
	battleCount: number;
	averageManaValue: number;
	uniqueCardCount: number;
};

export interface Column<T> {
	key: keyof T;
	title: string;
	// render?: (value: T[keyof T]) => ReactNode;
}

export interface TableProps<T extends object> {
	data: T[];
	columns: {
		key: string;
		title: string;
		render?: (value: T[keyof T]) => ReactNode;
	}[];
}
