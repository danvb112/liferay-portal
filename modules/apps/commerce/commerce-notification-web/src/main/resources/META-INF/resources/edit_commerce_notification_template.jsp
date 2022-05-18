<%--
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
--%>

<%@ include file="/init.jsp" %>

<%
CommerceNotificationTemplatesDisplayContext commerceNotificationTemplatesDisplayContext = (CommerceNotificationTemplatesDisplayContext)request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT);

CommerceNotificationTemplate commerceNotificationTemplate = commerceNotificationTemplatesDisplayContext.getCommerceNotificationTemplate();

String name = BeanParamUtil.getString(commerceNotificationTemplate, renderRequest, "name");
String description = BeanParamUtil.getString(commerceNotificationTemplate, renderRequest, "description");
String from = BeanParamUtil.getString(commerceNotificationTemplate, renderRequest, "from");
String fromName = BeanParamUtil.getString(commerceNotificationTemplate, renderRequest, "fromName");
String cc = BeanParamUtil.getString(commerceNotificationTemplate, renderRequest, "cc");
String bcc = BeanParamUtil.getString(commerceNotificationTemplate, renderRequest, "bcc");

String type = BeanParamUtil.getString(commerceNotificationTemplate, renderRequest, "type");

CommerceNotificationType commerceNotificationType = commerceNotificationTemplatesDisplayContext.getCommerceNotificationType(type);

Map<String, String> definitionTerms = null;

if (commerceNotificationType != null) {
	definitionTerms = commerceNotificationTemplatesDisplayContext.getDefinitionTerms(CommerceDefinitionTermConstants.RECIPIENT_DEFINITION_TERMS_CONTRIBUTOR, commerceNotificationType.getKey(), locale);
}

String title = LanguageUtil.get(resourceBundle, "add-notification-template");

if (commerceNotificationTemplate != null) {
	title = LanguageUtil.format(request, "edit-x", commerceNotificationTemplate.getName(), false);
}
%>

<liferay-frontend:side-panel-content
	title="<%= title %>"
>
	<portlet:actionURL name="/commerce_channels/edit_commerce_notification_template" var="editCommerceNotificationTemplateActionURL" />

	<aui:form action="" method="post" name="fm">
		<aui:input name="<%= Constants.CMD %>" type="hidden" value="" />
		<aui:input name="redirect" type="hidden" value="" />
		<aui:input name="commerceChannelId" type="hidden" value="" />
		<aui:input name="commerceNotificationTemplateId" type="hidden" value="" />


		<div class="row">
			<div class="col-lg-6">
				<commerce-ui:panel
					title='<%= LanguageUtil.get(request, "basic-info") %>'
				>
					<aui:input required="<%= true %>" name="name" value="" />

					<aui:input name="description" value=""  type="textarea"/>

					<aui:select disabled="<%= true %>" name="type" value="Email">

						<aui:option label="Email" selected="<%= true %>" value="email" />

					</aui:select>

					<aui:input label="enable-notifications" checked="" name="enable-notifications" type="toggle-switch" />
				</commerce-ui:panel>
			</div>

			<div class="col-lg-6">
				<commerce-ui:panel
					title='<%= LanguageUtil.get(resourceBundle, "settings") %>'
				>
					<label for="<portlet:namespace />toFieldWrapper"><%= LanguageUtil.get(resourceBundle, "to") %></label>

					<aui:field-wrapper label="" name="toFieldWrapper">
						<liferay-ui:input-localized
							name="to"
							xml=""
						/>
					</aui:field-wrapper>

					<div class="row">
						<div class="col-lg-6">
							<aui:input name="cc" value="" />

							<liferay-ui:input-localized
								required="<%= true %>"
								label="from-address"
								name="from"
								value=""
								xml=""
							/>

						</div>

						<div class="col-lg-6">
							<aui:input name="bcc" value="" />

							<aui:input required="<%= true %>" name="fromName" value="" />
						</div>
					</div>

				</commerce-ui:panel>
			</div>
		</div>

		<commerce-ui:panel
			title='<%= LanguageUtil.get(resourceBundle, "content") %>'
		>
			<label for="<portlet:namespace />subjectFieldWrapper"><%= LanguageUtil.get(resourceBundle, "subject") %></label>

			<aui:field-wrapper label="" name="subjectFieldWrapper">
				<liferay-ui:input-localized
					name="subject"
					xml=""
				/>
			</aui:field-wrapper>

			<label for="<portlet:namespace />bodyFieldWrapper"><%= LanguageUtil.get(resourceBundle, "body") %></label>

			<aui:field-wrapper label="" name="bodyFieldWrapper">
				<liferay-ui:input-localized
					editorName='<%= PropsUtil.get("editor.wysiwyg.portal-web.docroot.html.taglib.ui.email_notification_settings.jsp") %>'
					name="body"
					toolbarSet="email"
					type="editor"
					xml=""
				/>
			</aui:field-wrapper>

			<div>
				<react:component
					module="js/components/DefinitionOfTerms"
				/>
			</div>
		</commerce-ui:panel>

		<aui:button cssClass="btn-lg" type="submit" />

	</aui:form>
</liferay-frontend:side-panel-content>

<aui:script>
	Liferay.provide(
		window,
		'<portlet:namespace />selectType',
		() => {
			var A = AUI();

			var name = A.one('#<portlet:namespace />name').val();
			var description = A.one('#<portlet:namespace />description').val();
			var from = A.one('#<portlet:namespace />from').val();
			var fromName = A.one('#<portlet:namespace />fromName').val();
			var cc = A.one('#<portlet:namespace />cc').val();
			var bcc = A.one('#<portlet:namespace />bcc').val();
			var type = A.one('#<portlet:namespace />type').val();

			var portletURL = new Liferay.PortletURL.createURL(
				'<%= currentURLObj %>'
			);

			portletURL.setParameter('name', name);
			portletURL.setParameter('description', description);
			portletURL.setParameter('from', from);
			portletURL.setParameter('fromName', fromName);
			portletURL.setParameter('cc', cc);
			portletURL.setParameter('bcc', bcc);
			portletURL.setParameter('type', type);

			window.location.replace(portletURL.toString());
		},
		['liferay-portlet-url']
	);
</aui:script>