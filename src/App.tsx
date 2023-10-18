import React, { ReactElement, useState } from 'react';
import './App.scss';

import moment from 'moment';

import Themer from 'components/Themer';
import Add from 'components/Add';

import { useGameCard } from 'hooks/useGameDesignCard';
import { Card } from 'components/Card';
import { GameCard } from 'domain/models/gameCard';

const emptyGameCard: GameCard = {
	name: 'asd',
	category: '',
	style: '',
	references: [],
	history: '',
	mechanics: [],
	systems: [],
	platforms: [],
	loop: '',
};

const App = (): ReactElement => {
	const { gameCards, addGameCard, removeGameCard } = useGameCard();
	const [emptyOne, setEmptyOne] = useState<boolean>(true);
	const [light, setLight] = React.useState(false);
	const currentYear = moment().year();

	const switchLight = () => {
		!light ? localStorage.setItem('light', 'on') : localStorage.removeItem('light');
		setLight(!light);
	};

	const save = (gameDoc: GameCard) => {
		setEmptyOne(true);
		addGameCard(gameDoc);
	};

	const remove = (gameDocId?: string) => {
		removeGameCard(gameDocId || '');
		setEmptyOne(true);
	};

	return (
		<div className={`app ${light ? 'light' : 'dark'}`}>
			<div className="app_title titles">
				games design cards
				<Themer onClick={switchLight} light={light} />
			</div>
			<div className="app_list">
				{gameCards.map((gameDoc: GameCard, i: number) => (
					<Card
						key={gameDoc.id || i}
						game={gameDoc}
						onSave={() => save(gameDoc)}
						onDelete={() => remove(gameDoc.id)}
					/>
				))}
				{emptyOne ? (
					<Add onClick={() => setEmptyOne(false)} />
				) : (
					<Card
						key={emptyGameCard.id}
						game={emptyGameCard}
						onSave={() => save(emptyGameCard)}
						onDelete={() => remove(emptyGameCard.id)}
					/>
				)}
			</div>
			<div className="app_action codes">
				<h2>GAMES DESIGN CARDS</h2>
				<p>by DECREIER {currentYear}</p>
			</div>
		</div>
	);
};

export default App;
