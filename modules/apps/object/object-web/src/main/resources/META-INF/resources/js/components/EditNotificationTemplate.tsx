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
import ClayForm from '@clayui/form';
import ClayManagementToolbar from '@clayui/management-toolbar';
import React, {useEffect, useState} from 'react';

import {
	availableLocales,
	defaultLanguageId,
	defaultLocale,
} from '../utils/locale';
import DefinitionOfTerms from './DefinitionOfTerms';
import {Card, FormCustomSelect, Input, InputLocalized, RichTextLocalized, openToast} from '@liferay/object-js-components-web';

const editorConfig =
	'{"toolbar_text_advanced":[["Undo","Redo"],["Styles"],["FontColor","BGColor"],["Bold","Italic","Underline","Strikethrough"],["RemoveFormat"],["NumberedList","BulletedList"],["IncreaseIndent","DecreaseIndent"],["IncreaseIndent","DecreaseIndent"],["Link","Unlink"],["Source","Expand"]],"allowedContent":true,"filebrowserVideoBrowseLinkUrl":"http://localhost:8080/group/guest/~/control_panel/manage/-/select/video%2Curl/selectItem?_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22videoembeddablehtml%22%2C%22mimeTypeRestriction%22%3A%22video%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22videoembeddablehtml%22%7D&p_p_auth=wrmfXysy","stylesSet":[{"name":"Normal","element":"p"},{"name":"Heading 1","element":"h1"},{"name":"Heading 2","element":"h2"},{"name":"Heading 3","element":"h3"},{"name":"Heading 4","element":"h4"},{"name":"Preformatted Text","element":"pre"},{"name":"Cited Work","element":"cite"},{"name":"Computer Code","element":"code"},{"name":"Info Message","attributes":{"class":"overflow-auto portlet-msg-info"},"element":"div"},{"name":"Alert Message","attributes":{"class":"overflow-auto portlet-msg-alert"},"element":"div"},{"name":"Error Message","attributes":{"class":"overflow-auto portlet-msg-error"},"element":"div"}],"language":"en-US","contentsLangDirection":"ltr","extraPlugins":"addimages,autogrow,autolink,colordialog,filebrowser,itemselector,lfrpopup,media,stylescombo,videoembed","embedProviders":[],"title":false,"filebrowserImageBrowseLinkUrl":"http://localhost:8080/group/guest/~/control_panel/manage/-/select/image%2Curl/selectItem?_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%2C%22mimeTypeRestriction%22%3A%22image%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&p_p_auth=wrmfXysy","contentsCss":["http://localhost:8080/o/admin-theme/css/clay.css?browserId=chrome&amp;themeId=admin_WAR_admintheme&amp;minifierType=css&amp;languageId=en_US&amp;t=1652446632000","http://localhost:8080/o/admin-theme/css/main.css?browserId=chrome&amp;themeId=admin_WAR_admintheme&amp;minifierType=css&amp;languageId=en_US&amp;t=1652446632000","/o/frontend-editor-ckeditor-web/ckeditor/skins/moono-lexicon/editor.css?browserId=chrome&amp;themeId=admin_WAR_admintheme&amp;minifierType=css&amp;languageId=en_US&amp;t=1652446632000","/o/frontend-editor-ckeditor-web/ckeditor/skins/moono-lexicon/dialog.css?browserId=chrome&amp;themeId=admin_WAR_admintheme&amp;minifierType=css&amp;languageId=en_US&amp;t=1652446632000"],"toolbar_text_simple":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Source","Expand"]],"pasteFromWordRemoveStyles":false,"removePlugins":"elementspath","contentsLanguage":"en-US","bodyClass":"cke_editable html-editor","resize_enabled":false,"toolbar_editInPlace":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"autoSaveTimeout":3000,"closeNoticeTimeout":8000,"height":265,"filebrowserBrowseUrl":"http://localhost:8080/group/guest/~/control_panel/manage/-/select/file%2Clayout/selectItem?_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22checkDisplayPage%22%3Afalse%2C%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%2C%22enableCurrentPage%22%3Afalse%2C%22followURLOnTitleClick%22%3Afalse%2C%22multiSelection%22%3Afalse%2C%22showActionsMenu%22%3Afalse%2C%22showBreadcrumb%22%3Atrue%2C%22showDraftPages%22%3Afalse%2C%22showHiddenPages%22%3Atrue%2C%22showPrivatePages%22%3Atrue%2C%22showPublicPages%22%3Atrue%7D&p_p_auth=wrmfXysy","toolbar_tablet":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"toolbar_phone":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"filebrowserImageBrowseUrl":"http://localhost:8080/group/guest/~/control_panel/manage/-/select/image%2Curl/selectItem?_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%2C%22mimeTypeRestriction%22%3A%22image%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&p_p_auth=wrmfXysy","toolbar_email":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"filebrowserVideoBrowseUrl":"http://localhost:8080/group/guest/~/control_panel/manage/-/select/video%2Curl/selectItem?_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22videoembeddablehtml%22%2C%22mimeTypeRestriction%22%3A%22video%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22videoembeddablehtml%22%7D&p_p_auth=wrmfXysy","toolbar_liferayArticle":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"filebrowserWindowFeatures":"title=Browse","entities":false,"toolbar_liferay":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"toolbar_simple":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"pasteFromWordRemoveFontStyles":false}';

import './EditNotificationTemplate.scss';

import {fetch} from 'frontend-js-web';

import useForm from '../hooks/useForm';

const HEADERS = new Headers({
	'Accept': 'application/json',
	'Content-Type': 'application/json',
});

export default function EditNotificationTemplate({
	editingNotificationTemplateId,
}: IProps) {
	const initialValues = {
		bcc: '',
		body: {
			[defaultLanguageId]: '',
		},
		cc: '',
		description: '',
		from: '',
		fromName: {
			[defaultLanguageId]: '',
		},
		name: '',
		subject: {
			[defaultLanguageId]: '',
		},
		to: {
			[defaultLanguageId]: '',
		},
	};

	const [selectedLocale, setSelectedLocale] = useState(
		defaultLocale as {
			label: string;
			symbol: string;
		}
	);

	const validate = (values: any) => {
		const errors: {
			bcc?: string;
			body?: string;
			cc?: string;
			description?: string;
			from?: string;
			fromName?: string;
			name?: string;
			subject?: string;
			to?: string;
			type?: string;
		} = {};

		if (!values.name) {
			errors.name = Liferay.Language.get('required');
		}

		if (!values.from) {
			errors.from = Liferay.Language.get('required');
		}

		if (!values.fromName[defaultLanguageId]) {
			errors.fromName = Liferay.Language.get('required');
		}

		return errors;
	};

	const onSubmit = async (notification: TNotificationTemplate) => {
		const response = await fetch(
			editingNotificationTemplateId
				? `/o/notification/v1.0/notification-template/${editingNotificationTemplateId}`
				: '/o/notification/v1.0/notification-templates',
			{
				body: JSON.stringify(notification),
				headers: HEADERS,
				method: editingNotificationTemplateId ? 'PUT' : 'POST',
			}
		);

		if (response.ok) {
			openToast({
				message: Liferay.Language.get(
					'notification-template-created-successfully'
				),
				type: 'success',
			});
		}
		else if (response.status === 404) {
			openToast({
				message: Liferay.Language.get('an-error-occurred'),
				type: 'danger',
			});
		}
		else {
			openToast({
				message: Liferay.Language.get('an-error-occurred'),
				type: 'danger',
			});
		}
	};

	const {errors, handleSubmit, setValues, values} = useForm({
		initialValues,
		onSubmit,
		validate,
	});

	useEffect(() => {
		if (editingNotificationTemplateId) {
			const makeFetch = async () => {
				const response = await fetch(
					`/o/notification/v1.0/notification-template/${editingNotificationTemplateId}`,
					{
						headers: HEADERS,
						method: 'GET',
					}
				);

				const {
					bcc,
					body,
					cc,
					description,
					from,
					fromName,
					name,
					subject,
					to,
				} = (await response.json()) as TNotificationTemplate;

				setValues({
					...values,
					bcc,
					body,
					cc,
					description,
					from,
					fromName,
					name,
					subject,
					to,
				});
			};

			makeFetch();
		}
	}, [editingNotificationTemplateId, setValues, values]);

	console.log(values);

	return (
		<ClayForm onSubmit={handleSubmit}>
			<ClayManagementToolbar className="lfr__notification-template-management-tollbar">
				<ClayManagementToolbar.ItemList>
					<h2>Notification Template</h2>
				</ClayManagementToolbar.ItemList>

				<ClayManagementToolbar.ItemList>
					<ClayButton displayType="secondary" onClick={() => {}}>
						Cancel
					</ClayButton>

					<ClayButton className="inline-item-after" type="submit">
						Save
					</ClayButton>
				</ClayManagementToolbar.ItemList>
			</ClayManagementToolbar>

			<div className="lfr__notification-template-container">
				<div className="row">
					<div className="col-lg-6">
						<Card title={Liferay.Language.get('basic-info')}>
							<Input
								error={errors.name}
								label={Liferay.Language.get('name')}
								name="name"
								onChange={({target}) =>
									setValues({
										...values,
										name: target.value,
									})
								}
								required
								value={values.name}
							/>

							<Input
								component="textarea"
								label={Liferay.Language.get('description')}
								name="description"
								onChange={({target}) =>
									setValues({
										...values,
										description: target.value,
									})
								}
								type="text"
								value={values.description}
							/>

							<FormCustomSelect
								disabled
								label={Liferay.Language.get('type')}
								options={[]}
								value={Liferay.Language.get('email')}
							/>
						</Card>
					</div>

					<div className="col-lg-6">
						<Card title={Liferay.Language.get('settings')}>
							<InputLocalized
								defaultLanguageId={defaultLanguageId}
								label={Liferay.Language.get('to')}
								locales={availableLocales}
								name="to"
								onSelectedLocaleChange={setSelectedLocale}
								onTranslationsChange={(translation) => {
									setValues({
										...values,
										to: translation,
									});
								}}
								selectedLocale={selectedLocale}
								translations={values.to}
							/>

							<div className="row">
								<div className="col-lg-6">
									<Input
										label={Liferay.Language.get('cc')}
										name="cc"
										onChange={({target}) =>
											setValues({
												...values,
												cc: target.value,
											})
										}
										value={values.cc}
									/>
								</div>

								<div className="col-lg-6">
									<Input
										label={Liferay.Language.get('bcc')}
										name="bcc"
										onChange={({target}) =>
											setValues({
												...values,
												bcc: target.value,
											})
										}
										value={values.bcc}
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-lg-6">
									<Input
										error={errors.from}
										label={Liferay.Language.get(
											'from-address'
										)}
										name="fromAddress"
										onChange={({target}) =>
											setValues({
												...values,
												from: target.value,
											})
										}
										required
										value={values.from}
									/>
								</div>

								<div className="col-lg-6">
									<InputLocalized
										defaultLanguageId={defaultLanguageId}
										error={errors.fromName}
										label={Liferay.Language.get(
											'from-name'
										)}
										locales={availableLocales}
										name="fromName"
										onSelectedLocaleChange={
											setSelectedLocale
										}
										onTranslationsChange={(translation) => {
											setValues({
												...values,
												fromName: translation,
											});
										}}
										required
										selectedLocale={selectedLocale}
										translations={values.fromName}
									/>
								</div>
							</div>
						</Card>
					</div>
				</div>

				<Card title={Liferay.Language.get('content')}>
					<InputLocalized
						defaultLanguageId={defaultLanguageId}
						label={Liferay.Language.get('subject')}
						locales={availableLocales}
						name="subject"
						onSelectedLocaleChange={setSelectedLocale}
						onTranslationsChange={(translation) => {
							setValues({
								...values,
								subject: translation,
							});
						}}
						selectedLocale={selectedLocale}
						translations={values.subject}
					/>

					<RichTextLocalized
						editorConfig={editorConfig}
						label={Liferay.Language.get('body')}
						locales={availableLocales}
						name="body"
						onSelectedLocaleChange={setSelectedLocale}
						onTranslationsChange={(translation) => {
							setValues({
								...values,
								body: translation,
							});
						}}
						selectedLocale={selectedLocale}
						translations={values.body}
					/>

					<DefinitionOfTerms />
				</Card>
			</div>
		</ClayForm>
	);
}

interface IProps {
	editingNotificationTemplateId: number;
}

type TNotificationTemplate = {
	bcc: string;
	body: LocalizedValue<string>;
	cc: string;
	description: string;
	from: string;
	fromName: LocalizedValue<string>;
	name: string;
	subject: LocalizedValue<string>;
	to: LocalizedValue<string>;
};
