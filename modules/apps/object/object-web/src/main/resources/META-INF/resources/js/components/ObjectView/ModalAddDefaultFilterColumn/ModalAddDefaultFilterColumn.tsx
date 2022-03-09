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

import ClayButton from '@clayui/button';
import ClayModal from '@clayui/modal';
import React, {useContext, useEffect, useState} from 'react';

import AutoComplete from '../../Form/AutoComplete';
import CustomSelect from '../../Form/CustomSelect/CustomSelect';
import Input from '../../Form/Input';
import ViewContext from '../context';
import {TObjectField} from '../types';

interface IProps {
	observer: any;
	onClose: () => void;
}

type TNumericOperators = {
	label: string;
	value: string;
};

const NUMERIC_OPERATORS: TNumericOperators[] = [
	{
		label: Liferay.Language.get('is-equal-to'),
		value: 'Is Equals To',
	},
	{
		label: Liferay.Language.get('is-not-equal-to'),
		value: 'Is Not Equals To',
	},
	{
		label: Liferay.Language.get('is-less-than'),
		value: 'Less Than',
	},
	{
		label: Liferay.Language.get('is-greater-than'),
		value: 'Greater Than',
	},
	{
		label: Liferay.Language.get('is-less-than-or-equal-to'),
		value: 'Less Or Equal',
	},
	{
		label: Liferay.Language.get('is-greater-than-or-equal-to'),
		value: 'Greater Or Equal',
	},
];

export function ModalAddDefaultFilterColumn({observer, onClose}: IProps) {
	const defaultLanguageId = Liferay.ThemeDisplay.getDefaultLanguageId();

	const [{objectFields}] = useContext(ViewContext);

	const [numericFields, setNumericFields] = useState(objectFields);

	const [selectedOperator, setSelectedOperator] = useState<
		TNumericOperators
	>();
	const [selectedFilterColumn, setSelectedFilterColumn] = useState<
		TObjectField
	>();

	const [query, setQuery] = useState('');

	useEffect(() => {
		const filteredNumericFields = objectFields.filter((objectField) => {
			if (
				objectField.type === 'Integer' ||
				objectField.type === 'Long' ||
				objectField.type === 'Double' ||
				objectField.type === 'BigDecimal'
			) {
				return objectField;
			}
		});

		setNumericFields(filteredNumericFields);
	}, []);

	return (
		<ClayModal observer={observer}>
			<ClayModal.Header>
				{Liferay.Language.get('new-default-filter')}
			</ClayModal.Header>

			<ClayModal.Body>
				<AutoComplete
					emptyStateMessage={Liferay.Language.get(
						'there-are-no-fields-added-in-this-objects-yet'
					)}
					items={numericFields}
					label={Liferay.Language.get('filter-by')}
					onChangeQuery={setQuery}
					onSelectItem={(item) => setSelectedFilterColumn(item)}
					query={query}
					required
					value={selectedFilterColumn?.label[defaultLanguageId]}
				>
					{({label}) => (
						<div className="d-flex justify-content-between">
							<div>{label[defaultLanguageId]}</div>
						</div>
					)}
				</AutoComplete>

				<CustomSelect
					label={Liferay.Language.get('operator')}
					onChange={(item: any) => {
						setSelectedOperator(item);
					}}
					options={NUMERIC_OPERATORS}
					required
					value={selectedOperator?.label}
				>
					{({label}: any) => {
						<div>{label}</div>;
					}}
				</CustomSelect>

				<Input
					label={Liferay.Language.get('value')}
					name="value"
					required
					type="number"
				/>
			</ClayModal.Body>

			<ClayModal.Footer
				last={
					<ClayButton.Group spaced>
						<ClayButton
							displayType="secondary"
							onClick={() => onClose()}
						>
							{Liferay.Language.get('cancel')}
						</ClayButton>

						<ClayButton displayType="primary" type="button">
							{Liferay.Language.get('save')}
						</ClayButton>
					</ClayButton.Group>
				}
			/>
		</ClayModal>
	);
}
