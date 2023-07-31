/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {getLocalizableLabel} from '@liferay/object-js-components-web';

import {defaultLanguageId} from '../../../utils/constants';
import {LeftSidebarItemType, TAction, TState} from '../types';
import {TYPES} from './typesEnum';

export function objectFolderReducer(state: TState, action: TAction) {
	switch (action.type) {
		case TYPES.CREATE_MODEL_BUILDER_STRUCTURE: {
			const {objectFolders} = action.payload;

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

			return {
				...state,
				leftSidebarItems: newLeftSidebar,
			};
		}
		default:
			return state;
	}
}
