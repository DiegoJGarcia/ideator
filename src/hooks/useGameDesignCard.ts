/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from 'common/container';
import { GameCard } from 'domain/models/gameCard';
import { useEffect, useState } from 'react';

interface GameCardResponse {
	gameCards: GameCard[];
	addGameCard: (newGameCard: GameCard) => void;
	updateGameCard: (newGameCard: GameCard) => void;
	removeGameCard: (gameCardName: string) => void;
	gameCardNameValidation: (gameCardName: string) => boolean;
}

export const useGameCard = (): GameCardResponse => {
	const [gameCards, setGameCards] = useState<GameCard[]>([]);

	useEffect(() => {
		const cachedGameCards: GameCard[] | any = cache.get('gameCards');

		!!cachedGameCards && setGameCards(cachedGameCards);
		!!cachedGameCards && console.log('CACHED DATA RESTORED');

		return;
	}, []);

	const gameCardNameValidation = (gameCardName: string): boolean => {
		const notDuplicated = !gameCards?.find(d => d.name === gameCardName);

		return notDuplicated;
	};

	const saveGameCards = async (updatedGameCards: GameCard[]) => {
		await cache.set('gameCards', updatedGameCards);
		setGameCards(updatedGameCards);

		console.log('POWERS SAVED SUCCESSFULLY', updatedGameCards);
	};

	const addGameCard = async (newGameCard: GameCard) => {
		const baseGameCard: GameCard = {
			...newGameCard,
			id: `new-gameCard-${gameCards.length}`,
		};

		const updatedGameCards = await [...gameCards, baseGameCard];

		saveGameCards(updatedGameCards);
	};

	const updateGameCard = async (updatedGameCard: GameCard) => {
		const updatedGameCards = gameCards;
		const indexToupdate: number = await gameCards.findIndex(p => p.name === updatedGameCard.name);
		await updatedGameCards.splice(indexToupdate, 1, updatedGameCard);

		saveGameCards(updatedGameCards);
	};

	const removeGameCard = async (gameCardId: string) => {
		const updatedGameCards = await gameCards.filter(ps => ps.id !== gameCardId);

		saveGameCards(updatedGameCards);
	};

	return { gameCards, addGameCard, updateGameCard, removeGameCard, gameCardNameValidation };
};
