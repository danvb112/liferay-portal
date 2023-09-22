/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

/// <reference types="react" />

import {ObjectFieldErrors} from './ObjectFieldFormBase';
interface AggregationFormBaseProps {
	creationLanguageId2: Liferay.Language.Locale;
	disabled?: boolean;
	editingField?: boolean;
	errors: ObjectFieldErrors;
	objectDefinitionExternalReferenceCode: string;
	objectFieldSettings: ObjectFieldSetting[];
	onAggregationFilterChange?: (aggregationFilterArray: []) => void;
	onRelationshipChange?: (
		objectDefinitionExternalReferenceCode2: string
	) => void;
	onSubmit?: () => void;
	setValues: (values: Partial<ObjectField>) => void;
}
export declare function AggregationFormBase({
	creationLanguageId2,
	disabled,
	errors,
	editingField,
	onAggregationFilterChange,
	onRelationshipChange,
	onSubmit,
	objectDefinitionExternalReferenceCode,
	objectFieldSettings,
	setValues,
}: AggregationFormBaseProps): JSX.Element;
export {};
