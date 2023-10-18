import React, { useState } from 'react';
import { GameCard } from '../domain/models/gameCard';
import './Card.scss';
import { Button } from './Button';
import { Tilt } from 'react-tilt';

interface CardProps {
	game: GameCard;
	onSave: () => void;
	onDelete: () => void;
}

export const Card: React.FC<CardProps> = ({ game, onSave, onDelete }) => {
	const [selectedSection, setSelectedSection] = useState<string | null>(null);
	const [isFlipped, setIsFlipped] = useState<boolean>(false);

	const handleSave = () => {
		onSave();
	};

	const handleDelete = () => {
		onDelete();
	};

	const handleClick = (section: keyof GameCard) => {
		setSelectedSection(section);
		setIsFlipped(true);
	};

	const handleMouseLeave = () => {
		setIsFlipped(false);
	};

	return (
		<Tilt className="card_tilt" options={{ max: 50 }}>
			<div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
				<div className="card_inner" onMouseLeave={handleMouseLeave}>
					<div className="card_inner_front">
						<h2 className="card_title titles">{game.name}</h2>
						{Object.keys(game).map(
							(item: string, i: number) =>
								item !== 'name' &&
								item !== 'id' && (
									<div
										className="card_inner_front_item values"
										key={i}
										onClick={() => handleClick(item as keyof GameCard)}
									>
										{item}
									</div>
								),
						)}
					</div>
					<div className="card_inner_back">
						{selectedSection && (
							<>
								<h2>{selectedSection}</h2>
								<p>{game[selectedSection as keyof GameCard]}</p>
							</>
						)}
					</div>
				</div>
			</div>
			<div className="card_actions">
				<Button onClick={handleSave}>Guardar</Button>
				<Button onClick={handleDelete}>Eliminar</Button>
			</div>
		</Tilt>
	);
};

export default Card;
