import { commonId } from './common';

export interface GameCard {
	id?: commonId;
	name: string;
	category: string;
	style: string;
	references: string[];
	history: string;
	mechanics: string[];
	systems: string[];
	platforms: string[];
	loop: string;
}
