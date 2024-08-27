/**
 * SPDX-FileCopyrightText: (c) 2024 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

export function getObjectFieldBusinessTypeLabel(
	objectFieldBusinessType: ObjectFieldBusinessTypeName
) {
	switch (objectFieldBusinessType) {
		case 'Aggregation':
			return Liferay.Language.get('aggregation');

		case 'Attachment':
			return Liferay.Language.get('attachment');

		case 'AutoIncrement':
			return Liferay.Language.get('auto-increment');

		case 'Boolean':
			return Liferay.Language.get('boolean');

		case 'Date':
			return Liferay.Language.get('date');

		case 'DateTime':
			return Liferay.Language.get('date-time');

		case 'Decimal':
			return Liferay.Language.get('decimal');

		case 'Encrypted':
			return Liferay.Language.get('encrypted');

		case 'Formula':
			return Liferay.Language.get('formula');

		case 'Integer':
			return Liferay.Language.get('integer');

		case 'LongInteger':
			return Liferay.Language.get('long-integer');

		case 'LongText':
			return Liferay.Language.get('long-text');

		case 'MultiselectPicklist':
			return Liferay.Language.get('multiselect-picklist');

		case 'Picklist':
			return Liferay.Language.get('picklist');

		case 'PrecisionDecimal':
			return Liferay.Language.get('precision-decimal');

		case 'Relationship':
			return Liferay.Language.get('relationship');

		case 'RichText':
			return Liferay.Language.get('rich-text');

		case 'Text':
			return Liferay.Language.get('text');

		case 'Workflow Status':
			return Liferay.Language.get('workflow-status');

		default:
			return objectFieldBusinessType;
	}
}
