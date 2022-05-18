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

ObjectDefinitionsDetailsDisplayContext objectDefinitionsDetailsDisplayContext = (ObjectDefinitionsDetailsDisplayContext)request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT);

ObjectDefinition objectDefinition = objectDefinitionsDetailsDisplayContext.getObjectDefinition();

portletDisplay.setShowBackIcon(true);
portletDisplay.setURLBack(backURL);

renderResponse.setTitle(LanguageUtil.format(request, "edit-x", objectDefinition.getLabel(locale, true), false));
%>

<react:component
	module="js/components/EditNotificationTemplate"
/>

<script>
	function <portlet:namespace />selectScope() {
		const scope = document.getElementById('<portlet:namespace />scope');

		let url = new URL(window.location.href);

		url.searchParams.set('<portlet:namespace />scope', scope.value);

		if (Liferay.SPA) {
			Liferay.SPA.app.navigate(url);
		}
		else {
			window.location.href = url;
		}
	}

	function <portlet:namespace />submitObjectDefinition(draft) {
		var form = document.getElementById('<portlet:namespace />fm');

		var cmd = form.querySelector('#<portlet:namespace /><%= Constants.CMD %>');

		if (!draft) {
			cmd.setAttribute('value', '<%= Constants.PUBLISH %>');
		}

		submitForm(form);
	}
</script>