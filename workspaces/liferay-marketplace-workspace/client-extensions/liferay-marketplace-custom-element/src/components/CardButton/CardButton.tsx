import ClayIcon from '@clayui/icon';
import classNames from 'classnames';
import {MouseEvent} from 'react';

import arrowLeft from '../../assets/icons/guide-icon.svg';

import './CardButton.scss';

export function CardButton({
	description,
	icon,
	onClick,
	selected,
	title,
}: {
	description: string;
	icon: string;
	onClick: (event: MouseEvent) => void;
	title: string;
	selected: boolean;
}) {
	return (
		<div
			className={classNames('card-button', {
				'card-button--selected': selected,
			})}
			onClick={onClick}
		>
			<img alt="trial" className="card-button-icon" src={arrowLeft} />

			<div className="card-button-info">
				<div className="card-button-title">
					<div className="card-button-text">{title}</div>

					<div className="card-button-description">{description}</div>
				</div>
			</div>
		</div>
	);
}
