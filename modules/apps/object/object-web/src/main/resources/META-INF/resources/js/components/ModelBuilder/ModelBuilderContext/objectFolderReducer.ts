/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {getLocalizableLabel} from '@liferay/object-js-components-web';

import {defaultLanguageId} from '../../../utils/constants';
import {
	LeftSidebarItemType,
	ObjectDefinitionNode,
	ObjectFieldNode,
	TAction,
	TState,
} from '../types';
import {TYPES} from './typesEnum';

function compareFn(field1: ObjectFieldNode, field2: any) {
	if (
		(field1.name == 'id' || field1.name == 'externalReferenceCode') &&
		(field2.name != 'id' || field2.name != 'externalReferenceCode')
	) {
		return -1;
	}

	return 0;
}

export function objectFolderReducer(state: TState, action: TAction) {
	switch (action.type) {
		case TYPES.CREATE_MODEL_BUILDER_STRUCTURE: {
			const {objectFolders} = action.payload;
			const {selectedFolderERC} = state;

			const newLeftSidebar = objectFolders.map((folder) => {
				const folderDefinitions = folder.definitions?.map(
					(definition) => {
						return {
							definitionName: definition.name,
							name: getLocalizableLabel(
								definition.defaultLanguageId,
								definition.label,
								definition.name
							),
							selected: false,
							type: 'objectDefinition',
						};
					}
				);

				return {
					folderName: folder.name,
					name: getLocalizableLabel(
						defaultLanguageId,
						folder.label,
						folder.name
					),
					objectDefinitions: folderDefinitions,
					type: 'objectFolder',
				} as LeftSidebarItemType;
			});

			const currentFolder = objectFolders.find(
				(folder) => folder.externalReferenceCode === selectedFolderERC
			);

			let newObjectDefinitionNodes: ObjectDefinitionNode[] = [];

			if (currentFolder) {
				let positionColumn = 1;

				newObjectDefinitionNodes = currentFolder.definitions!.map(
					(objectDefinition, index) => {
						const objectFields = objectDefinition.objectFields.map(
							(field) => {
								return {
									businessType: field.businessType,
									externalReferenceCode:
										field.externalReferenceCode,
									label: getLocalizableLabel(
										objectDefinition.defaultLanguageId,
										field.label,
										field.name
									),
									name: field.name,
									primaryKey: field.name === 'id',
									selected: false,
								} as ObjectFieldNode;
							}
						);

						if ((index + 1) % 4 === 0) {
							positionColumn++;
						}

						return {
							data: {
								creationLanguageId:
									objectDefinition.defaultLanguageId,
								hasDeleteResourcePermission: true,
								hasManagePermissionsResourcePermission: true,
								hasObjectDefinitionPublished: true,
								isLinkedNode: false,
								nodeSelected: false,
								objectDefinitionLabel: getLocalizableLabel(
									objectDefinition.defaultLanguageId,
									objectDefinition.label,
									objectDefinition.name
								),
								objectDefinitionName: objectDefinition.name,
								objectFields: objectFields.sort(compareFn),
								system: objectDefinition.system,
							},
							id: objectDefinition.externalReferenceCode,
							position: {
								x: (index % 4) * 300,
								y: positionColumn * 400,
							},
							type: 'objectDefinition',
						} as ObjectDefinitionNode;
					}
				);
			}

			return {
				...state,
				leftSidebarItems: newLeftSidebar,
				objectDefinitionNodes: newObjectDefinitionNodes,
			};
		}
		case TYPES.SET_SELECTED_NODE: {
			const {selectedObjectDefinitionName} = action.payload;

			const {leftSidebarItems, objectDefinitionNodes} = state;

			const newObjectDefinitionNodes = objectDefinitionNodes.map(
				(definitionNode) => {
					if (
						definitionNode.data.objectDefinitionName ===
						selectedObjectDefinitionName
					) {
						return {
							...definitionNode,
							data: {
								...definitionNode.data,
								nodeSelected: true,
							},
						};
					}

					return {
						...definitionNode,
						data: {
							...definitionNode.data,
							nodeSelected: false,
						},
					};
				}
			);

			const newLeftSidebarItems = leftSidebarItems.map((sidebarItem) => {
				const newLeftSidebarDefinitions = sidebarItem.objectDefinitions?.map(
					(sidebarDefinition) => {
						if (
							selectedObjectDefinitionName ===
							sidebarDefinition.definitionName
						) {
							return {
								...sidebarDefinition,
								selected: true,
							};
						}

						return {
							...sidebarDefinition,
							selected: false,
						};
					}
				);

				return {
					...sidebarItem,
					objectDefinitions: newLeftSidebarDefinitions,
				};
			});

			return {
				...state,
				objectDefinitionNodes: newObjectDefinitionNodes,
				leftSidebarItems: newLeftSidebarItems,
			};
		}
		default:
			return state;
	}
}
