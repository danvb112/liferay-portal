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

import ClayTabs from '@clayui/tabs';
import React, {useState, useEffect} from 'react';

import EditObjectDetails, {
	KeyValuePair,
} from '../ObjectDetails/EditObjectDetails';
import Fields from '../ObjectField/Fields';
import ObjectManagementToolbar from '../ObjectManagementToolbar';

interface ObjectNavigationProps {
	backURL: string;
	companyKeyValuePair: KeyValuePair[];
	dbTableName: string;
	externalReferenceCode: string;
	fieldsApiURL: string;
	fieldsCreationMenu: {
		primaryItems?: any[];
		secondaryItems?: any[];
	};
	fieldDropdownitems: [];
	fieldId: string;
	fieldUrl: string;
	hasPublishObjectPermission: boolean;
	hasUpdateObjectDefinitionPermission: boolean;
	isApproved: boolean;
	label: LocalizedValue<string>;
	objectDefinitionId: number;
	onSubmit: (draft: boolean) => void;
	portletNamespace: string;
	pluralLabel: LocalizedValue<string>;
	nonRelationshipObjectFieldsInfo: {
		label: LocalizedValue<string>;
		name: string;
	}[];
	screenNavigationCategoryKey: string;
	shortName: string;
	setValues: (values: Partial<ObjectDefinition>) => void;
	system: boolean;
	siteKeyValuePair: KeyValuePair[];
	storageTypes: LabelValueObject[];
}

let tabs: HTMLCollectionOf<Element>;

function ObjectNavigation({
	backURL,
	companyKeyValuePair,
	dbTableName,
	externalReferenceCode,
	hasPublishObjectPermission,
	hasUpdateObjectDefinitionPermission,
	fieldsApiURL,
	fieldsCreationMenu,
	fieldDropdownitems,
	fieldId,
	fieldUrl,
	isApproved,
	label,
	nonRelationshipObjectFieldsInfo,
	objectDefinitionId,
	onSubmit,
	pluralLabel,
	portletNamespace,
	screenNavigationCategoryKey,
	setValues,
	shortName,
	siteKeyValuePair,
	storageTypes,
	system,
}: ObjectNavigationProps) {
	const [active, setActive] = useState(0);
	const [selectedTabId, setSelectedTabId] = useState('details');
	const [firstRender, setFirstRender] = useState(true);

	const display = (tabId: string) => {
		if (tabs) {
			for (let i = 0; i < tabs.length; i++) {
				const currentTabId = tabs[i].id;
				const tabElt = document.getElementById(currentTabId);
				
				if (tabId !== currentTabId) {
					tabElt?.classList.add('active', 'show');
				}
				else {
					tabElt?.classList.remove('active', 'show');
				}
				if (!firstRender && currentTabId) {
					if(tabElt?.style) {
						tabElt.style.display = "";
						tabElt.style.visibility = "";
						tabElt.style.height = "";
					}
				}
			}
		}
	};

	useEffect(() => {
		tabs = document.getElementsByClassName('tab-pane');
		display(selectedTabId);

		setFirstRender(false);
	}, []);

	return (
		<>
			<ObjectManagementToolbar
				backURL={backURL}
				externalReferenceCode={externalReferenceCode}
				hasPublishObjectPermission={hasPublishObjectPermission}
				hasUpdateObjectDefinitionPermission={
					hasUpdateObjectDefinitionPermission
				}
				isApproved={isApproved}
				label={label.en_US as string}
				objectDefinitionId={objectDefinitionId}
				onSubmit={onSubmit}
				portletNamespace={portletNamespace}
				screenNavigationCategoryKey={screenNavigationCategoryKey}
				setValues={setValues}
				system={system}
			/>

			<ClayTabs active={active} onActiveChange={setActive}>
				<ClayTabs.Item
					innerProps={{
						'aria-controls': 'tabpanel-1',
					}}
				>
					Details
				</ClayTabs.Item>

				<ClayTabs.Item
					innerProps={{
						'aria-controls': 'tabpanel-2',
					}}
				>
					Fields
				</ClayTabs.Item>
			</ClayTabs>
			<ClayTabs.Content activeIndex={active} fade>
				<ClayTabs.TabPane 
					aria-labelledby="details-tab"
					id='detailsTab' 
					onClick={() => setSelectedTabId('detailsTab')} 
				>
					<EditObjectDetails
						backURL={backURL}
						companyKeyValuePair={companyKeyValuePair}
						dbTableName={dbTableName}
						externalReferenceCode={externalReferenceCode}
						hasPublishObjectPermission={hasPublishObjectPermission}
						hasUpdateObjectDefinitionPermission={
							hasUpdateObjectDefinitionPermission
						}
						isApproved={isApproved}
						label={label}
						nonRelationshipObjectFieldsInfo={
							nonRelationshipObjectFieldsInfo
						}
						objectDefinitionId={objectDefinitionId}
						pluralLabel={pluralLabel}
						portletNamespace={portletNamespace}
						shortName={shortName}
						siteKeyValuePair={siteKeyValuePair}
						storageTypes={storageTypes}
					/>
				</ClayTabs.TabPane>

				<ClayTabs.TabPane 
					aria-labelledby="fields-tab"
					id='fieldsTab' 
					onClick={() => setSelectedTabId('fieldsTab')} 
				>
					<div>
						<Fields 
							creationMenu={fieldsCreationMenu}
							apiURL={fieldsApiURL}
							id={fieldId}
							objectDefinitionExternalReferenceCode={externalReferenceCode}
							url={fieldUrl}
							items={fieldDropdownitems}
						/>
					</div>
				</ClayTabs.TabPane>
			</ClayTabs.Content>
		</>
	);
}
export default ObjectNavigation;
