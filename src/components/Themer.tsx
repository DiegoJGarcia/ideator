import React, { FC } from 'react';
import './Themer.scss';

import sun from '../assets/sun.png';
import moon from '../assets/moon.png';

type ThemerProps = {
	onClick: () => void;
	disabled?: boolean;
	className?: string;
	light?: boolean;
};

const Themer: FC<ThemerProps> = ({ onClick, disabled, className, light = true }) => {
	const themerClassName = className ? `themer ${className}` : 'themer';
	const themerIcon = light ? (
		<img src={sun} alt="themer-light" />
	) : (
		<img src={moon} alt="themer-dark" />
	);

	return (
		<button className={themerClassName} onClick={onClick} disabled={disabled}>
			{themerIcon}
		</button>
	);
};

export default Themer;
