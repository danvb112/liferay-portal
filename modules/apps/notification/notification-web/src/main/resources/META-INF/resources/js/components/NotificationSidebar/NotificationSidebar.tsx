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

import ClayButton from '@clayui/button';
import {VerticalBar} from '@clayui/core';
import ClayIcon from '@clayui/icon';
import {API} from '@liferay/object-js-components-web';
import React, {useEffect, useState} from 'react';

import {DefinitionOfTerms} from '../ContentContainer/DefinitionOfTerms';

import './NotificationSidebar.scss';

const verticalBarItems = [
	{
		icon: 'percentage-symbol',
		title: 'Percentage Symbol',
	},
];

interface NotificationSidebarProps {
	baseResourceURL: string;
}

export function NotificationSidebar({
	baseResourceURL,
}: NotificationSidebarProps) {
	const [objectDefinitions, setObjectDefinitions] = useState<
		ObjectDefinition[]
	>([]);

	useEffect(() => {
		const makeFetch = async () => {
			const objectDefinitionsItems = await API.getObjectDefinitions();

			setObjectDefinitions(objectDefinitionsItems);
		};

		makeFetch();
	}, []);

	return (
		<VerticalBar
			className="vertical-bar-test"
			defaultActive="Percentage Symbol"
		>
			<VerticalBar.Content displayType="light" items={verticalBarItems}>
				{(item) => (
					<VerticalBar.Panel key={item.title}>
						<DefinitionOfTerms
							baseResourceURL={baseResourceURL}
							objectDefinitions={objectDefinitions}
						/>
					</VerticalBar.Panel>
				)}
			</VerticalBar.Content>

			<VerticalBar.Bar displayType="light" items={verticalBarItems}>
				{(item) => (
					<VerticalBar.Item key={item.title}>
						<ClayButton displayType={null}>
							<ClayIcon symbol={item.icon} />
						</ClayButton>
					</VerticalBar.Item>
				)}
			</VerticalBar.Bar>
		</VerticalBar>
	);
}
