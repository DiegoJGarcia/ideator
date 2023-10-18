import { commonId } from 'domain/models/common';
import { GameCard } from 'domain/models/gameCard';

export interface GameCardCommand {
	id: commonId;
}

export interface GameCardResponse {
	power: GameCard;
}

export interface GameCardService {
	create(id: commonId, cmd: GameCardCommand): Promise<GameCardResponse>;
	update(id: commonId, code: string, cmd: GameCardCommand): Promise<unknown>;
	delete(id: commonId, code: string): Promise<unknown>;
}
