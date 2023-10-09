/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {Option, Picker} from '@clayui/core';
import ClayDropDown from '@clayui/drop-down';
import ClayPopover from '@clayui/popover';
import {FieldBase} from 'frontend-js-components-web';
import React, {
	Children,
	FocusEvent,
	Fragment,
	Key,
	ReactNode,
	useEffect,
	useState,
} from 'react';

import './index.scss';

type LabelValueTest = {
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
	onChange?: (value: T) => void;
	onSelectionChange?: (itemValue: React.Key) => void;
	placeholder?: string;
	readonly?: boolean;
	required?: boolean;
	children?: ReactNode;
	contentRight?: ReactNode;
	options: T[];
	value?: string;
}

export function SingleSelect<T extends LabelValueTest>({
	className,
	defaultSelectedKey,
	disabled,
	error,
	feedbackMessage,
	id,
	label,
	onSelectionChange,
	required,
	onChange,
	contentRight,
	placeholder,
	children,
	onBlur,
	options,
}: SingleSelectProps<T>) {
	return (
		<FieldBase
			className={className}
			disabled={disabled}
			errorMessage={error}
			helpMessage={feedbackMessage}
			id={id}
			label={label}
			required={required}
		>
			<Picker<T>
				aria-labelledby="picker-label"
				defaultSelectedKey={defaultSelectedKey}
				disabled={disabled}
				id="picker"
				items={options}
				onSelectionChange={onSelectionChange}
				placeholder={placeholder}
			>
				{(item) => <Option key={item.value}>{item.label}</Option>}
			</Picker>
		</FieldBase>
	);
}
