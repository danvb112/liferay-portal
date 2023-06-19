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

import {VerticalBar} from '@clayui/core';
import {
	FrontendDataSet,

	// @ts-ignore

} from '@liferay/frontend-data-set-web';
import {API, getLocalizableLabel} from '@liferay/object-js-components-web';
import classNames from 'classnames';
import React, {useEffect, useState} from 'react';

import {IFDSTableProps, defaultDataSetProps, fdsItem} from '../../utils/fds';
import AddObjectField from './AddObjectField';
import EditObjectField from './EditObjectField';

interface ItemData {
	id: number;
	required: boolean;
	system?: boolean;
}

interface FieldsProps extends IFDSTableProps {
	objectFieldTypes: ObjectFieldType[];
	objectName: string;
}

export default function Fields({
	apiURL,
	creationMenu,
	formName,
	id,
	items,
	objectDefinitionExternalReferenceCode,
	objectFieldTypes,
	objectName,
}: FieldsProps) {
	const [creationLanguageId, setCreationLanguageId] = useState<
		Liferay.Language.Locale
	>();
	const [isModalVisible, setModalVisible] = useState<boolean>(false);
	const [isVerticalBarVisible, setVerticalBarVisible] = useState<boolean>(
		false
	);

	const sidePanelitems = [
		{
			title: 'Fields',
		},
	];

	useEffect(() => {
		const makeFetch = async () => {
			const objectDefinition = await API.getObjectDefinitionByExternalReferenceCode(
				objectDefinitionExternalReferenceCode
			);

			setCreationLanguageId(objectDefinition.defaultLanguageId);
		};

		makeFetch();
	}, [objectDefinitionExternalReferenceCode]);

	useEffect(() => {
		Liferay.on('addObjectField', () => setModalVisible(true));

		return () => Liferay.detach('addObjectField');
	}, []);

	function objectFieldLabelDataRenderer({value}: fdsItem<ItemData>) {
		const handleEditField = () => {
			setVerticalBarVisible(!isVerticalBarVisible);
		};

		return (
			<div className="table-list-title">
				<a href="#" onClick={handleEditField}>
					{getLocalizableLabel(
						creationLanguageId as Liferay.Language.Locale,
						value
					)}
				</a>
			</div>
		);
	}

	function objectFieldSourceDataRenderer({itemData}: {itemData: ItemData}) {
		return (
			<strong
				className={classNames(
					itemData.system ? 'label-info' : 'label-warning',
					'label'
				)}
			>
				{itemData.system
					? Liferay.Language.get('system')
					: Liferay.Language.get('custom')}
			</strong>
		);
	}

	function objectFieldMandatoryDataRenderer({
		itemData,
	}: {
		itemData: ItemData;
	}) {
		return itemData.required
			? Liferay.Language.get('yes')
			: Liferay.Language.get('no');
	}

	const dataSetProps = {
		...defaultDataSetProps,
		apiURL,
		creationMenu,
		customDataRenderers: {
			objectFieldLabelDataRenderer,
			objectFieldMandatoryDataRenderer,
			objectFieldSourceDataRenderer,
		},
		formName,
		id,
		itemsActions: items,
		namespace:
			'_com_liferay_object_web_internal_object_definitions_portlet_ObjectDefinitionsPortlet_',
		onActionDropdownItemClick({
			action,
			itemData,
		}: {
			action: {data: {id: string}};
			itemData: {id: string};
		}) {
			if (action.data.id === 'deleteObjectField') {
				Liferay.fire('deleteObjectField', {itemData});
			}
		},
		portletId:
			'com_liferay_object_web_internal_object_definitions_portlet_ObjectDefinitionsPortlet',
		showManagementBar: true,
		showPagination: true,
		showSearch: true,
		style: 'default' as 'default',
		views: [
			{
				contentRenderer: 'table',
				label: 'Table',
				name: 'table',
				schema: {
					fields: [
						{
							contentRenderer: 'objectFieldLabelDataRenderer',
							expand: false,
							fieldName: 'label',
							label: Liferay.Language.get('label'),
							localizeLabel: true,
							sortable: false,
						},
						{
							expand: false,
							fieldName: 'businessType',
							label: Liferay.Language.get('type'),
							localizeLabel: true,
							sortable: false,
						},
						{
							contentRenderer: 'objectFieldMandatoryDataRenderer',
							expand: false,
							fieldName: 'mandatory',
							label: Liferay.Language.get('mandatory'),
							localizeLabel: true,
							sortable: false,
						},
						{
							contentRenderer: 'objectFieldSourceDataRenderer',
							expand: false,
							fieldName: 'source',
							label: Liferay.Language.get('source'),
							localizeLabel: true,
							sortable: false,
						},
					],
				},
				thumbnail: 'table',
			},
		],
	};

	return (
		<>
			<FrontendDataSet {...dataSetProps} />

			{isVerticalBarVisible && (
				<VerticalBar
					defaultActive="Fields"
					defaultPanelWidth={1100}
					panelWidth={700}
					panelWidthMax={1100}
					panelWidthMin={250}
					position="right"
					resize
				>
					<div
						style={{
							overflow: 'auto',
						}}
					>
						<VerticalBar.Content items={sidePanelitems}>
							{(item) => (
								<VerticalBar.Panel key={item.title}>
									<EditObjectField
										creationLanguageId="ar_SA"
										filterOperators={{
											dateOperators: [],
											numericOperators: [],
											picklistOperators: [],
										}}
										forbiddenChars={[]}
										forbiddenLastChars={[]}
										forbiddenNames={[]}
										isApproved={false}
										isDefaultStorageType={false}
										objectDefinitionExternalReferenceCode=""
										objectField={{} as ObjectField}
										objectFieldId={0}
										objectFieldTypes={[]}
										objectName=""
										objectRelationshipId={0}
										readOnly={false}
										readOnlySidebarElements={[]}
										sidebarElements={[]}
										workflowStatusJSONArray={[]}
									/>
								</VerticalBar.Panel>
							)}
						</VerticalBar.Content>
					</div>
				</VerticalBar>
			)}

			{isModalVisible && (
				<AddObjectField
					apiURL={apiURL as string}
					creationLanguageId="ar_SA"
					objectDefinitionExternalReferenceCode={
						objectDefinitionExternalReferenceCode
					}
					objectFieldTypes={objectFieldTypes}
					objectName={objectName}
					onVisibilityChange={setModalVisible}
				/>
			)}
		</>
	);
}
