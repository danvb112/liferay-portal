import React, {useContext, useState, useEffect} from 'react';
import ClayModal from '@clayui/modal';
import ViewContext from '../context';
import { TObjectField } from '../types';
import AutoComplete from '../../Form/AutoComplete';

interface IProps {
    header: string;
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

const defaultLanguageId = Liferay.ThemeDisplay.getDefaultLanguageId();

export function ModalAddDefaultFilterColumn({header, observer, onClose}: IProps) {

    const [{objectFields}] = useContext(ViewContext);

	const [numericFields, setNumericFields] = useState(objectFields);

	const [selectedOperator, setSelectedOperator] = useState<
		TNumericOperators
	>();
	const [selectedFilterColumn, setSelectedFilterColumn] = useState<
		TObjectField
	>();

	const [query, setQuery] = useState('');

	console.log(objectFields);

    useEffect(() => {
		const filteredNumericFields = objectFields.filter((objectField) => {
			if (objectField.businessType === "Picklist") {
				return objectField;
			}
		});

		setNumericFields(filteredNumericFields);
	}, []);

    return (
        <ClayModal observer={observer}>
            <ClayModal.Header>{header}</ClayModal.Header>

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

            </ClayModal.Body>

        </ClayModal>
    )
}