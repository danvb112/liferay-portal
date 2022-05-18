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
import ClayDropDown from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';
import ClayLabel from '@clayui/label';
import ClayLayout from '@clayui/layout';
import {ClassicEditor} from 'frontend-editor-ckeditor-web';
import React, {useEffect, useRef, useState} from 'react';

import FieldBase from '../FieldBase';

import './RichTextLocalized.scss';

const editorConfig =
	'{"toolbar_text_advanced":[["Undo","Redo"],["Styles"],["FontColor","BGColor"],["Bold","Italic","Underline","Strikethrough"],["RemoveFormat"],["NumberedList","BulletedList"],["IncreaseIndent","DecreaseIndent"],["IncreaseIndent","DecreaseIndent"],["Link","Unlink"],["Source","Expand"]],"allowedContent":true,"filebrowserVideoBrowseLinkUrl":"http://localhost:8080/group/guest/~/control_panel/manage/-/select/video%2Curl/selectItem?_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22videoembeddablehtml%22%2C%22mimeTypeRestriction%22%3A%22video%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22videoembeddablehtml%22%7D&p_p_auth=wrmfXysy","stylesSet":[{"name":"Normal","element":"p"},{"name":"Heading 1","element":"h1"},{"name":"Heading 2","element":"h2"},{"name":"Heading 3","element":"h3"},{"name":"Heading 4","element":"h4"},{"name":"Preformatted Text","element":"pre"},{"name":"Cited Work","element":"cite"},{"name":"Computer Code","element":"code"},{"name":"Info Message","attributes":{"class":"overflow-auto portlet-msg-info"},"element":"div"},{"name":"Alert Message","attributes":{"class":"overflow-auto portlet-msg-alert"},"element":"div"},{"name":"Error Message","attributes":{"class":"overflow-auto portlet-msg-error"},"element":"div"}],"language":"en-US","contentsLangDirection":"ltr","extraPlugins":"addimages,autogrow,autolink,colordialog,filebrowser,itemselector,lfrpopup,media,stylescombo,videoembed","embedProviders":[],"title":false,"filebrowserImageBrowseLinkUrl":"http://localhost:8080/group/guest/~/control_panel/manage/-/select/image%2Curl/selectItem?_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%2C%22mimeTypeRestriction%22%3A%22image%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&p_p_auth=wrmfXysy","contentsCss":["http://localhost:8080/o/admin-theme/css/clay.css?browserId=chrome&amp;themeId=admin_WAR_admintheme&amp;minifierType=css&amp;languageId=en_US&amp;t=1652446632000","http://localhost:8080/o/admin-theme/css/main.css?browserId=chrome&amp;themeId=admin_WAR_admintheme&amp;minifierType=css&amp;languageId=en_US&amp;t=1652446632000","/o/frontend-editor-ckeditor-web/ckeditor/skins/moono-lexicon/editor.css?browserId=chrome&amp;themeId=admin_WAR_admintheme&amp;minifierType=css&amp;languageId=en_US&amp;t=1652446632000","/o/frontend-editor-ckeditor-web/ckeditor/skins/moono-lexicon/dialog.css?browserId=chrome&amp;themeId=admin_WAR_admintheme&amp;minifierType=css&amp;languageId=en_US&amp;t=1652446632000"],"toolbar_text_simple":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Source","Expand"]],"pasteFromWordRemoveStyles":false,"removePlugins":"elementspath","contentsLanguage":"en-US","bodyClass":"cke_editable html-editor","resize_enabled":false,"toolbar_editInPlace":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"autoSaveTimeout":3000,"closeNoticeTimeout":8000,"height":265,"filebrowserBrowseUrl":"http://localhost:8080/group/guest/~/control_panel/manage/-/select/file%2Clayout/selectItem?_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22checkDisplayPage%22%3Afalse%2C%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%2C%22enableCurrentPage%22%3Afalse%2C%22followURLOnTitleClick%22%3Afalse%2C%22multiSelection%22%3Afalse%2C%22showActionsMenu%22%3Afalse%2C%22showBreadcrumb%22%3Atrue%2C%22showDraftPages%22%3Afalse%2C%22showHiddenPages%22%3Atrue%2C%22showPrivatePages%22%3Atrue%2C%22showPublicPages%22%3Atrue%7D&p_p_auth=wrmfXysy","toolbar_tablet":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"toolbar_phone":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"filebrowserImageBrowseUrl":"http://localhost:8080/group/guest/~/control_panel/manage/-/select/image%2Curl/selectItem?_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%2C%22mimeTypeRestriction%22%3A%22image%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&p_p_auth=wrmfXysy","toolbar_email":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"filebrowserVideoBrowseUrl":"http://localhost:8080/group/guest/~/control_panel/manage/-/select/video%2Curl/selectItem?_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22videoembeddablehtml%22%2C%22mimeTypeRestriction%22%3A%22video%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22videoembeddablehtml%22%7D&p_p_auth=wrmfXysy","toolbar_liferayArticle":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"filebrowserWindowFeatures":"title=Browse","entities":false,"toolbar_liferay":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"toolbar_simple":[["Undo","Redo"],["Styles","Bold","Italic","Underline"],["NumberedList","BulletedList"],["Link","Unlink"],["Table","ImageSelector","VideoSelector"],["Source","Expand"]],"pasteFromWordRemoveFontStyles":false}';

export function RichTextLocalized({
	ariaLabels = {
		default: 'Default',
		openLocalizations: 'Open Localizations',
		translated: 'Translated',
		untranslated: 'Untranslated',
	},
	helpMessage,
	label,
	locales,
	onSelectedLocaleChange,
	onTranslationsChange,
	selectedLocale,
	translations,
}: IProps) {
	const editorRef = useRef<IEditor>(null);

	const [active, setActive] = useState(false);

	const defaultLanguage = locales[0];

	useEffect(() => {
		const editor = editorRef.current?.editor;

		if (editor) {
			editor.config.contentsLangDirection =
				Liferay.Language.direction[selectedLocale.label as Locale];

			editor.config.contentsLanguage = selectedLocale.label;

			editor.setData(translations[selectedLocale.label as Locale]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedLocale.label]);

	return (
		<FieldBase helpMessage={helpMessage} label={label}>
			<div className="lfr-notification__rich-text-localized">
				<div className="lfr-notification__rich-text-localized-editor">
					<ClassicEditor
						contents={translations[selectedLocale.label as Locale]}
						editorConfig={JSON.parse(editorConfig)}
						onChange={(content: string) => {
							onTranslationsChange({
								...translations,
								[selectedLocale.label]: content,
							});
						}}
						ref={editorRef}
					/>
				</div>

				<ClayDropDown
					active={active}
					className="lfr-notification__rich-text-localized-flag"
					onActiveChange={setActive}
					trigger={
						<ClayButton
							displayType="secondary"
							monospaced
							onClick={() => setActive(!active)}
							title={ariaLabels.openLocalizations}
						>
							<span className="inline-item">
								<ClayIcon symbol={selectedLocale.symbol} />
							</span>

							<span className="btn-section">
								{selectedLocale.label}
							</span>
						</ClayButton>
					}
				>
					<ClayDropDown.ItemList>
						{locales.map((locale) => {
							const value = translations[locale.label as Locale];

							return (
								<ClayDropDown.Item
									key={locale.label}
									onClick={() => {
										onSelectedLocaleChange(locale);
										setActive(false);
									}}
								>
									<ClayLayout.ContentRow containerElement="span">
										<ClayLayout.ContentCol
											containerElement="span"
											expand
										>
											<ClayLayout.ContentSection>
												<ClayIcon
													className="inline-item inline-item-before"
													symbol={locale.symbol}
												/>

												{locale.label}
											</ClayLayout.ContentSection>
										</ClayLayout.ContentCol>

										<ClayLayout.ContentCol containerElement="span">
											<ClayLayout.ContentSection>
												<ClayLabel
													displayType={
														locale.label ===
														defaultLanguage.label
															? 'info'
															: value
															? 'success'
															: 'warning'
													}
												>
													{locale.label ===
													defaultLanguage.label
														? ariaLabels.default
														: value
														? ariaLabels.translated
														: ariaLabels.untranslated}
												</ClayLabel>
											</ClayLayout.ContentSection>
										</ClayLayout.ContentCol>
									</ClayLayout.ContentRow>
								</ClayDropDown.Item>
							);
						})}
					</ClayDropDown.ItemList>
				</ClayDropDown>
			</div>
		</FieldBase>
	);
}

interface IEditor {
	editor: {
		config: {contentsLangDirection: unknown; contentsLanguage: unknown};
		setData: (data: unknown) => void;
	};
}
interface IItem {
	label: string;
	symbol: string;
}
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	ariaLabels?: {
		default: string;
		openLocalizations: string;
		translated: string;
		untranslated: string;
	};
	helpMessage?: string;
	label: string;
	locales: Array<IItem>;
	onSelectedLocaleChange: (val: IItem) => void;
	onTranslationsChange: (val: LocalizedValue<string>) => void;
	selectedLocale: IItem;
	translations: LocalizedValue<string>;
}
