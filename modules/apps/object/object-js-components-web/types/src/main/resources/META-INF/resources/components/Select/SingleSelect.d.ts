/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React, {FocusEvent, ReactNode, Key} from 'react';
import './index.scss';
declare type LabelValueTest = {
	label?: string;
	value?: string;
};
interface SingleSelectProps<T extends LabelValueTest> {
	className?: string;
	defaultSelectedKey?: Key;
	disabled?: boolean;
	error?: string;
	feedbackMessage?: string;
	id?: string;
	label?: string;
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	onSelectionChange?: (itemValue: React.Key) => void;
	placeholder?: string;
	readonly?: boolean;
	required?: boolean;
	children?: ReactNode;
	contentRight?: ReactNode;
	onChange?: (selected: T) => void;
	options: T[];
	value?: string;
}
export declare function SingleSelect<T extends LabelValueTest>({
	className,
	defaultSelectedKey,
	disabled,
	error,
	feedbackMessage,
	id,
	label,
	onSelectionChange,
	required,
	contentRight,
	placeholder,
	children,
	onBlur,
	onChange,
	options,
}: SingleSelectProps<T>): JSX.Element;
export {};
