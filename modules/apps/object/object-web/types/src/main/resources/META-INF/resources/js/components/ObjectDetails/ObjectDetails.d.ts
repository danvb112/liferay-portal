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

import './ObjectDetails.scss';
interface ObjectDetailsProps {
	DBTableName: string;
	companyKeyValuePair: KeyValuePair[];
	label: LocalizedValue<string>;
	nonRelationshipObjectFieldsInfo: {
		label: LocalizedValue<string>;
		name: string;
	}[];
	objectDefinitionId: number;
	pluralLabel: LocalizedValue<string>;
	shortName: string;
	siteKeyValuePair: KeyValuePair[];
}
declare type KeyValuePair = {
	key: string;
	value: string;
};
export default function ObjectDetails({
	DBTableName,
	companyKeyValuePair,
	label,
	nonRelationshipObjectFieldsInfo,
	objectDefinitionId,
	pluralLabel,
	shortName,
	siteKeyValuePair,
}: ObjectDetailsProps): JSX.Element;
export {};
