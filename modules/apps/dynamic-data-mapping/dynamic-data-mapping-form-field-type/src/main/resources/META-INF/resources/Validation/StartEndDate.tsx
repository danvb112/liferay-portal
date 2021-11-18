/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import {ClayDropDownWithItems} from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';
import {ClayTooltipProvider} from '@clayui/tooltip';
import React, {useMemo} from 'react';

import CustomDate from './CustomDate';
import './StartEndDate.scss';

const StartEndDate: React.FC<IProps> = ({
	dateFieldOptions,
	eventType,
	label,
	name,
	onChange,
	options,
	parameters,
	readOnly,
	tooltip,
}) => {

	const handleChange = (key: string, value: string | number, options?: {}) => {

		onChange(eventType,{
			...parameters,
			...options,
			[key]: value,
		});
	}

	const selectedOption = useMemo(()=>{
		if(parameters?.type === "dateField"){
			const date = dateFieldOptions.find(({name}) => 
				parameters.dateFieldName === name
			) as IDateFieldOption;

			return date.label;
		}

		const option = options?.find(({value}) => 
			value === parameters?.type
		);

		return option?.label;
	},[parameters]);

	const select = (
		<div className="form-builder-select-field input-group-container">
			<div className="form-control results-chosen select-field-trigger">
				<div className="option-selected">{selectedOption}</div>
				<a className="select-arrow-down-container">
					<ClayIcon symbol="caret-double" />
				</a>
			</div>
		</div>
	);

	const items: {
		items?: {
			onClick: () => void;
			label: string;
			name: string;
		}[];
		onClick?: () => void;
		name?: 'customDate' | 'responseDate';
		value?: 'customDate' | 'responseDate';
		label?: string;
		type?: 'group' | 'divider';
	}[] = [
		...options.map((option) => ({
			...option,
			onClick: () => {
				handleChange('type', option.name);
			},
		})),
		{
			type: 'divider',
		},
		{
			items: dateFieldOptions.map((option) => ({
				...option,
				onClick: () => {
					handleChange('type', 'dateField', {dateFieldName: option.name});
				},
			})),
			label: Liferay.Language.get('date-fields'),
			type: 'group',
		},
	];

	return (
		<>
			<div className="ddm__validation-date-start-end">
				<div className="ddm__validation-date-start-end-label">
					<label>{label}</label>
					<ClayTooltipProvider>
						<div data-tooltip-align="top" title={tooltip}>
							<ClayIcon
								className="ddm__validation-date-start-end-icon"
								symbol="question-circle-full"
							/>
						</div>
					</ClayTooltipProvider>
				</div>

				<ClayDropDownWithItems items={items} trigger={select} />
			</div>


			{parameters?.type === 'customDate' && (
				<CustomDate
					// dateFieldOptions={fields}
					onChange={handleChange}
					// label={label}
					name={name}
					// options={options}
					parameters={parameters}
					// tooltip={tooltip}
					// date={startSection ? startDate : endDate}
					// endDate={endDate}
					eventType={eventType}
					// handleChangeParameters={handleChangeParameters}
					// name={name}
					// operation={
					// 	startSection ? startOperation : endOperation
					// }
					// quantity={
					// 	startSection ? startQuantity : endQuantity
					// }
					readOnly={readOnly}
					// setDate={
					// 	startSection ? setStartDate : setEndDate
					// }
					// setOperation={
					// 	startSection
					// 		? setStartOperation
					// 		: setEndOperation
					// }
					// setQuantity={
					// 	startSection
					// 		? setStartQuantity
					// 		: setEndQuantity
					// }
					// setUnit={
					// 	startSection ? setStartUnit : setEndUnit
					// }
					// unit={startSection ? startUnit : endUnit}
					// visible={visible}
				/>
			)}
		</>
	);
};

export default StartEndDate;

interface IProps {
	eventType: 'startsFrom' | 'endsOn';
	label: string;
	name: string;
	options: IOptions[];
	onChange: any; //(value: string, typeName: string, type: DateType) => void;
	tooltip: string;
	parameters: {
		type: DateType;
		dateFieldName: string;
		quantity: number;
	};
	readOnly?: boolean;
	dateFieldOptions: IDateFieldOption[];
}

interface IDateFieldOption {
	label: string;
	name: string;
}

interface IOptions {
	label: string;
	name: 'customDate' | 'responseDate';
	value: 'customDate' | 'responseDate';
}

type DateType = 'customDate' | 'responseDate' | 'dateField';
