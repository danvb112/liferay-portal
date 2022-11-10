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
String backURL = ParamUtil.getString(request, "backURL", String.valueOf(renderResponse.createRenderURL()));

portletDisplay.setShowBackIcon(true);
portletDisplay.setURLBack(backURL);

ObjectDefinitionsDetailsDisplayContext objectDefinitionsDetailsDisplayContext = (ObjectDefinitionsDetailsDisplayContext)request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT);

List<ObjectField> accountEntryRelationshipObjectFields = objectDefinitionsDetailsDisplayContext.getAccountEntryRelationshipObjectFields();
List<Map<String, Object>> nonRelationshipObjectFieldsInfo = objectDefinitionsDetailsDisplayContext.getNonRelationshipObjectFieldsInfo();
List<ObjectField> objectFields = objectDefinitionsDetailsDisplayContext.getObjectFields();

ObjectDefinition objectDefinition = (ObjectDefinition)request.getAttribute(ObjectWebKeys.OBJECT_DEFINITION);

renderResponse.setTitle(LanguageUtil.format(request, "edit-x", objectDefinition.getLabel(locale, true), false));
%>

<div id="<portlet:namespace />EditObjectDefinition">
	<react:component
		module="js/components/ObjectDetails/ObjectDetails"
		props='<%=
			HashMapBuilder.<String, Object>put(
				"accountEntryRelationshipObjectFields", accountEntryRelationshipObjectFields
			).put(
				"companyKeyValuePair", objectDefinitionsDetailsDisplayContext.getKeyValuePairs("company")
			).put(
				"DBTableName", objectDefinition.getExtensionDBTableName()
			).put(
				"label", LocalizationUtil.getLocalizationMap(objectDefinition.getLabel())
			).put(
				"nonRelationshipObjectFieldsInfo", nonRelationshipObjectFieldsInfo
			).put(
				"objectDefinitionId", objectDefinition.getObjectDefinitionId()
			).put(
				"objectFields", objectFields
			).put(
				"objectScopeProvider", objectDefinitionsDetailsDisplayContext.getObjectScopeProviders()
			).put(
				"panelCategoryKey", objectDefinition.getPanelCategoryKey()
			).put(
				"pluralLabel", LocalizationUtil.getLocalizationMap(objectDefinition.getPluralLabel())
			).put(
				"shortName", objectDefinition.getShortName()
			).put(
				"siteKeyValuePair", objectDefinitionsDetailsDisplayContext.getKeyValuePairs("site")
			).build()
		%>'
	/>
</div>