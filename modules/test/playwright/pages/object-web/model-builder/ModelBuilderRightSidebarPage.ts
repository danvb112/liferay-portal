/**
 * SPDX-FileCopyrightText: (c) 2024 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {Locator, Page} from '@playwright/test';

import {ModelBuilderPage} from './ModelBuilderPage';

export class ModelBuilderRightSidebarPage {
	readonly deleteButton: Locator;
	readonly deleteObjectRelationshipButton: Locator;
	readonly deleteTrashButton: Locator;
	readonly modelBuilderPage: ModelBuilderPage;
	readonly modalDeleteObjectRelationshipTextField: Locator;
	readonly modalDeleteObjectRelationshipConfirmationButton: Locator;
	readonly rightSidebar: Locator;
	readonly rightSidebarObjectDefinitionActivateObject: Locator;
	readonly rightSidebarObjectDefinitionEntryTitleField: Locator;
	readonly rightSidebarObjectDefinitionLabel: Locator;
	readonly rightSidebarObjectDefinitionLabelLocalizationButton: Locator;
	readonly rightSidebarObjectDefinitionPanelLink: Locator;
	readonly rightSidebarObjectDefinitionPluralLabel: Locator;
	readonly rightSidebarObjectDefinitionPluralLabelLocalizationButton: Locator;
	readonly rightSidebarObjectDefinitionScope: Locator;

	constructor(page: Page) {
		this.deleteButton = page.getByRole('button', {
			exact: true,
			name: 'Delete',
		});
		this.deleteObjectRelationshipButton = page.getByLabel(
			'Delete Relationship'
		);
		this.deleteTrashButton = page
			.getByRole('tabpanel')
			.getByTitle('Delete');
		this.modelBuilderPage = new ModelBuilderPage(page);
		this.modalDeleteObjectRelationshipTextField = page.getByPlaceholder(
			'Confirm Relationship Name'
		);
		this.modalDeleteObjectRelationshipConfirmationButton = page.getByRole(
			'button',
			{exact: true, name: 'Delete'}
		);
		this.rightSidebar = page.getByRole('tabpanel').filter({
			hasNot: this.modelBuilderPage.createNewObjectDefinitionButton,
		});
		this.rightSidebarObjectDefinitionActivateObject =
			page.getByLabel('Activate Object');
		this.rightSidebarObjectDefinitionEntryTitleField =
			page.getByLabel('Entry Title Field');
		this.rightSidebarObjectDefinitionLabel = page.getByLabel(
			'LabelMandatory',
			{exact: true}
		);
		this.rightSidebarObjectDefinitionLabelLocalizationButton = page
			.getByTitle('Open Localizations')
			.first();
		this.rightSidebarObjectDefinitionPanelLink =
			page.getByLabel('Panel Link');
		this.rightSidebarObjectDefinitionPluralLabel =
			page.getByLabel('Plural Label');
		this.rightSidebarObjectDefinitionPluralLabelLocalizationButton = page
			.getByTitle('Open Localizations')
			.last();
		this.rightSidebarObjectDefinitionScope = page.getByLabel('Scope');
	}

	async deleteObjectRelationship(objectRelationshipName: string) {
		await this.deleteObjectRelationshipButton.click();
		await this.modalDeleteObjectRelationshipTextField.click();
		await this.modalDeleteObjectRelationshipTextField.fill(
			objectRelationshipName
		);
		await this.modalDeleteObjectRelationshipConfirmationButton.click();
	}
}
