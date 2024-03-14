/**
 * SPDX-FileCopyrightText: (c) 2024 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.object.web.internal.object.validation.rule.groovy.script.use.provider;

import com.liferay.object.constants.ObjectPortletKeys;
import com.liferay.object.constants.ObjectValidationRuleConstants;
import com.liferay.object.service.ObjectValidationRuleLocalService;
import com.liferay.object.web.internal.object.definitions.constants.ObjectDefinitionsScreenNavigationEntryConstants;
import com.liferay.petra.function.transform.TransformUtil;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.service.CompanyLocalService;
import com.liferay.portal.kernel.util.HttpComponentsUtil;
import com.liferay.portal.kernel.util.Portal;
import com.liferay.portal.security.script.management.groovy.script.use.GroovyScriptUse;
import com.liferay.portal.security.script.management.groovy.script.use.provider.GroovyScriptUseProvider;

import java.util.List;

import javax.portlet.PortletMode;
import javax.portlet.ResourceRequest;
import javax.portlet.WindowState;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Feliphe Marinho
 */
@Component(service = GroovyScriptUseProvider.class)
public class ObjectValidationRuleGroovyScriptUseProvider
	implements GroovyScriptUseProvider {

	@Override
	public List<GroovyScriptUse> provide(ResourceRequest resourceRequest) {
		return TransformUtil.transform(
			_objectValidationRuleLocalService.getObjectValidationRules(
				true, ObjectValidationRuleConstants.ENGINE_TYPE_GROOVY),
			objectValidationRule -> {
				Company company = _companyLocalService.getCompany(
					objectValidationRule.getCompanyId());

				String url = company.getPortalURL(0);

				url = HttpComponentsUtil.addParameter(
					url, "p_p_id", ObjectPortletKeys.OBJECT_DEFINITIONS);
				url = HttpComponentsUtil.addParameter(
					url, "p_p_lifecycle", "0");
				url = HttpComponentsUtil.addParameter(
					url, "p_p_mode", PortletMode.VIEW.toString());
				url = HttpComponentsUtil.addParameter(
					url, "p_p_state", WindowState.MAXIMIZED.toString());

				String namespace = _portal.getPortletNamespace(
					ObjectPortletKeys.OBJECT_DEFINITIONS);

				url = HttpComponentsUtil.addParameter(
					url, namespace + "mvcRenderCommandName",
					"/object_definitions/edit_object_definition");
				url = HttpComponentsUtil.addParameter(
					url, namespace + "objectDefinitionId",
					objectValidationRule.getObjectDefinitionId());
				url = HttpComponentsUtil.addParameter(
					url, namespace + "screenNavigationCategoryKey",
					ObjectDefinitionsScreenNavigationEntryConstants.
						CATEGORY_KEY_VALIDATIONS);

				return new GroovyScriptUse(
					company.getWebId(),
					objectValidationRule.getName(resourceRequest.getLocale()),
					url);
			});
	}

	@Reference
	private CompanyLocalService _companyLocalService;

	@Reference
	private ObjectValidationRuleLocalService _objectValidationRuleLocalService;

	@Reference
	private Portal _portal;

}