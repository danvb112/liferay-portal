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

/// <reference types="react" />

import {KeyValuePair} from '../ObjectDetails/EditObjectDetails';
interface ObjectNavigationProps {
	backURL: string;
	companyKeyValuePair: KeyValuePair[];
	dbTableName: string;
	externalReferenceCode: string;
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
declare function ObjectNavigation({
	backURL,
	companyKeyValuePair,
	dbTableName,
	externalReferenceCode,
	hasPublishObjectPermission,
	hasUpdateObjectDefinitionPermission,
	isApproved,
	label,
	objectDefinitionId,
	onSubmit,
	portletNamespace,
	pluralLabel,
	nonRelationshipObjectFieldsInfo,
	screenNavigationCategoryKey,
	shortName,
	setValues,
	system,
	siteKeyValuePair,
	storageTypes,
}: ObjectNavigationProps): JSX.Element;
export default ObjectNavigation;
