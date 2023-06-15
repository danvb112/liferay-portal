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
ObjectDefinition objectDefinition = (ObjectDefinition)request.getAttribute(ObjectWebKeys.OBJECT_DEFINITION);
ObjectDefinitionsDetailsDisplayContext objectDefinitionsDetailsDisplayContext = (ObjectDefinitionsDetailsDisplayContext)request.getAttribute(ObjectWebKeys.OBJECT_PORTLET_DEFINITION_DETAILS_DISPLAY_CONTEXT);
ObjectDefinitionsFieldsDisplayContext objectDefinitionsFieldsDisplayContext = (ObjectDefinitionsFieldsDisplayContext)request.getAttribute(ObjectWebKeys.OBJECT_PORTLET_DEFINITION_FIELDS_DISPLAY_CONTEXT);
%>

<div class="lfr-object__edit-object-definition">
	<react:component
		module="js/components/ObjectNavigation/ObjectNavigation"
		props='<%=
			HashMapBuilder.<String, Object>put(
				"backURL", ParamUtil.getString(request, "backURL", String.valueOf(renderResponse.createRenderURL()))
			).put(
				"dbTableName", objectDefinition.getDBTableName()
			).put(
				"externalReferenceCode", objectDefinition.getExternalReferenceCode()
			).put(
				"hasPublishObjectPermission", objectDefinitionsDetailsDisplayContext.hasPublishObjectPermission()
			).put(
				"hasUpdateObjectDefinitionPermission", objectDefinitionsDetailsDisplayContext.hasUpdateObjectDefinitionPermission()
			).put(
				"isApproved", objectDefinition.isApproved()
			).put(
				"label", LocalizationUtil.getLocalizationMap(objectDefinition.getLabel())
			).put(
				"nonRelationshipObjectFieldsInfo", objectDefinitionsDetailsDisplayContext.getNonrelationshipObjectFieldsInfo()
			).put(
				"objectDefinitionId", objectDefinition.getObjectDefinitionId()
			).put(
				"pluralLabel", LocalizationUtil.getLocalizationMap(objectDefinition.getPluralLabel())
			).put(
				"portletNamespace", liferayPortletResponse.getNamespace()
			).put(
				"screenNavigationCategoryKey", ParamUtil.getString(request, "screenNavigationCategoryKey")
			).put(
				"shortName", objectDefinition.getShortName()
			).put(
				"storageTypes", objectDefinitionsDetailsDisplayContext.getStoragesJSONArray()
			).put(
				"system", objectDefinition.isSystem()
			).put(
				"fieldsApiURL", objectDefinitionsFieldsDisplayContext.getAPIURL()
			).put(
				"fieldsCreationMenu", objectDefinitionsFieldsDisplayContext.getCreationMenu(objectDefinition)
			).put(
				"fieldDropdownitems", objectDefinitionsFieldsDisplayContext.getFDSActionDropdownItems()
			).put(
				"fieldId", ObjectDefinitionsFDSNames.OBJECT_FIELDS
			).put(
				"fieldUrl", objectDefinitionsFieldsDisplayContext.getEditObjectFieldURL()
			).build()
		%>'
	/>
</div>