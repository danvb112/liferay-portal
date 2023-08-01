/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import classNames from 'classnames';
import React, {useState} from 'react';
import {NodeProps} from 'react-flow-renderer';

import './DefinitionNode.scss';
import {useFolderContext} from '../ModelBuilderContext/objectFolderContext';
import {TYPES} from '../ModelBuilderContext/typesEnum';
import {FieldNode} from '../types';
import NodeFields from './NodeFields';
import NodeFooter from './NodeFooter';
import NodeHeader from './NodeHeader';

interface DefinitionNodeProps {
	creationLanguageId: Liferay.Language.Locale;
	hasDeleteResourcePermission: boolean;
	hasManagePermissionsResourcePermission: boolean;
	hasObjectDefinitionPublished: boolean;
	isLinkedNode: boolean;
	nodeSelected: boolean;
	objectDefinitionLabel: string;
	objectDefinitionName: string;
	objectFields: FieldNode[];
	system: boolean;
}

export function DefinitionNode({
	data: {
		creationLanguageId,
		hasDeleteResourcePermission,
		hasManagePermissionsResourcePermission,
		hasObjectDefinitionPublished,
		isLinkedNode,
		nodeSelected,
		objectDefinitionLabel,
		objectDefinitionName,
		objectFields,
		system,
	},
}: NodeProps<DefinitionNodeProps>) {
	const [showAllFields, setShowAllFields] = useState<boolean>(false);
	const [_, dispatch] = useFolderContext();

	return (
		<div
			className={classNames('lfr-objects__model-builder-node-container', {
				'lfr-objects__model-builder-node-container--selected': nodeSelected,
			})}
			onClick={() => {
				dispatch({
					payload: {
						selectedObjectDefinitionName: objectDefinitionName,
					},
					type: TYPES.SET_SELECTED_NODE,
				});
			}}
		>
			<NodeHeader
				hasDeleteResourcePermission={hasDeleteResourcePermission}
				hasManagePermissionsResourcePermission={
					hasManagePermissionsResourcePermission
				}
				hasObjectDefinitionPublished={hasObjectDefinitionPublished}
				isLinkedNode={isLinkedNode}
				objectDefinitionLabel={objectDefinitionLabel}
				system={system}
			/>

			<NodeFields
				defaultLanguageId={creationLanguageId}
				objectFields={objectFields}
				showAll={showAllFields}
			/>

			<NodeFooter
				setShowAllFields={setShowAllFields}
				showAllFields={showAllFields}
			/>
		</div>
	);
}
