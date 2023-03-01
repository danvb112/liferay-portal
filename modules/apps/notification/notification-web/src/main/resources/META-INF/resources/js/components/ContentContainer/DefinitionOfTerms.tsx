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
import ClayIcon from '@clayui/icon';
import ClayPanel from '@clayui/panel';
import {
	AutoComplete,
	filterArrayByQuery,
	getLocalizableLabel,
	openToast,
} from '@liferay/object-js-components-web';
import {createResourceURL, fetch} from 'frontend-js-web';
import React, {useEffect, useMemo, useState} from 'react';

import './DefinitionOfTerms.scss';

interface DefinitionOfTermsProps {
	baseResourceURL: string;
	objectDefinitions: ObjectDefinition[];
}

export interface Item {
	name: string;
	term: string;
}

export function DefinitionOfTerms({
	baseResourceURL,
	objectDefinitions,
}: DefinitionOfTermsProps) {
	const [selectedEntity, setSelectedEntity] = useState<ObjectDefinition>();
	const [query, setQuery] = useState<string>('');

	const [entityFields, setEntityFields] = useState<Item[]>([]);

	const filteredObjectDefinitions = useMemo(() => {
		if (objectDefinitions) {
			return filterArrayByQuery({
				array: objectDefinitions,
				query,
				str: 'label',
			});
		}
	}, [objectDefinitions, query]);

	const getEntityFields = async (objectDefinition: ObjectDefinition) => {
		const response = await fetch(
			createResourceURL(baseResourceURL, {
				objectDefinitionId: objectDefinition.id,
				p_p_resource_id:
					'/notification_templates/notification_template_terms',
			}).toString()
		);

		const responseJSON = (await response.json()) as Item[];

		setEntityFields(responseJSON);
	};

	const copyObjectFieldTerm = ({itemData}: {itemData: Item}) => {
		navigator.clipboard.writeText(itemData.term);

		openToast({
			message: Liferay.Language.get('term-copied-successfully'),
			type: 'success',
		});
	};

	useEffect(() => {
		Liferay.on('copyObjectFieldTerm', copyObjectFieldTerm);

		return () => {
			Liferay.detach('copyObjectFieldTerm');
		};
	}, []);

	return (
		<ClayPanel
			collapsable
			defaultExpanded
			displayTitle={Liferay.Language.get('definition-of-terms')}
			displayType="secondary"
			showCollapseIcon={true}
		>
			<ClayPanel.Body>
				<AutoComplete<ObjectDefinition>
					creationLanguageId={
						selectedEntity?.defaultLanguageId as Locale
					}
					emptyStateMessage={Liferay.Language.get(
						'no-entities-were-found'
					)}
					items={filteredObjectDefinitions ?? []}
					label={Liferay.Language.get('entity')}
					onChangeQuery={setQuery}
					onSelectItem={(item) => {
						getEntityFields(item);
						setSelectedEntity(item);
					}}
					query={query}
					value={getLocalizableLabel(
						selectedEntity?.defaultLanguageId as Locale,
						selectedEntity?.label,
						selectedEntity?.name as string
					)}
				>
					{({defaultLanguageId, label, name}) => (
						<div className="d-flex justify-content-between">
							<div>
								{getLocalizableLabel(
									defaultLanguageId,
									label,
									name
								)}
							</div>
						</div>
					)}
				</AutoComplete>

				<div id="lfr-notification-web__definition-of-terms">
					{entityFields.map((entityField) => (
						<div className="lfr-notification-web__definition-of-terms-list-container">
							<div className="lfr-notification-web__definition-of-terms-list-left-container">
								<span className="lfr-notification-web__definition-of-terms-list-name">
									{entityField.name}
								</span>

								<span className="lfr-notification-web__definition-of-terms-list-term">
									{entityField.term}
								</span>
							</div>

							<ClayButton
								className="lfr-notification-web__definition-of-terms-list-button"
								displayType="secondary"
								onClick={() => {
									navigator.clipboard.writeText(
										entityField.term
									);

									openToast({
										message: Liferay.Language.get(
											'term-copied-successfully'
										),
										type: 'success',
									});
								}}
							>
								<ClayIcon symbol="copy" />
							</ClayButton>
						</div>
					))}
				</div>
			</ClayPanel.Body>
		</ClayPanel>
	);
}
