/**
 * SPDX-FileCopyrightText: (c) 2024 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.portal.security.script.management.web.internal.portlet.action.test;

import com.liferay.arquillian.extension.junit.bridge.junit.Arquillian;
import com.liferay.configuration.admin.constants.ConfigurationAdminPortletKeys;
import com.liferay.object.constants.ObjectActionExecutorConstants;
import com.liferay.object.constants.ObjectActionTriggerConstants;
import com.liferay.object.constants.ObjectDefinitionConstants;
import com.liferay.object.constants.ObjectPortletKeys;
import com.liferay.object.constants.ObjectValidationRuleConstants;
import com.liferay.object.field.builder.TextObjectFieldBuilder;
import com.liferay.object.model.ObjectDefinition;
import com.liferay.object.service.ObjectActionLocalService;
import com.liferay.object.service.ObjectDefinitionLocalService;
import com.liferay.object.service.ObjectValidationRuleLocalService;
import com.liferay.object.test.util.ObjectDefinitionTestUtil;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.portlet.PortletConfigFactoryUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCResourceCommand;
import com.liferay.portal.kernel.service.CompanyLocalService;
import com.liferay.portal.kernel.service.PortletLocalService;
import com.liferay.portal.kernel.service.UserLocalService;
import com.liferay.portal.kernel.test.portlet.MockLiferayResourceRequest;
import com.liferay.portal.kernel.test.portlet.MockLiferayResourceResponse;
import com.liferay.portal.kernel.test.util.CompanyTestUtil;
import com.liferay.portal.kernel.test.util.RandomTestUtil;
import com.liferay.portal.kernel.test.util.TestPropsValues;
import com.liferay.portal.kernel.test.util.UserTestUtil;
import com.liferay.portal.kernel.util.HttpComponentsUtil;
import com.liferay.portal.kernel.util.JavaConstants;
import com.liferay.portal.kernel.util.Portal;
import com.liferay.portal.kernel.util.UnicodeProperties;
import com.liferay.portal.kernel.util.UnicodePropertiesBuilder;
import com.liferay.portal.test.rule.FeatureFlags;
import com.liferay.portal.test.rule.Inject;
import com.liferay.portal.test.rule.LiferayIntegrationTestRule;
import com.liferay.portal.vulcan.util.LocalizedMapUtil;

import java.io.ByteArrayOutputStream;

import java.util.Arrays;
import java.util.Collections;
import java.util.Objects;

import javax.portlet.PortletMode;
import javax.portlet.WindowState;

import org.junit.Assert;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestRule;
import org.junit.runner.RunWith;

/**
 * @author Feliphe Marinho
 */
@FeatureFlags("LPD-11179")
@RunWith(Arquillian.class)
public class GetGroovyScriptUsesMVCResourceCommandTest {

	@ClassRule
	@Rule
	public static final TestRule testRule = new LiferayIntegrationTestRule();

	@Before
	public void setUp() throws Exception {
		_mockLiferayResourceRequest = new MockLiferayResourceRequest();

		_mockLiferayResourceRequest.setAttribute(
			JavaConstants.JAVAX_PORTLET_CONFIG,
			PortletConfigFactoryUtil.create(
				_portletLocalService.getPortletById(
					ConfigurationAdminPortletKeys.SYSTEM_SETTINGS),
				null));
	}

	@Test
	public void testGetGroovyScriptUses() throws Exception {
		Company company1Company = CompanyTestUtil.addCompany("company1.com");

		_user = UserTestUtil.addCompanyAdminUser(company1Company);

		ObjectDefinition objectDefinition1 = _createObjectDefinition();

		_addObjectAction(
			true, ObjectActionExecutorConstants.KEY_GROOVY,
			"company1ActiveGroovyObjectAction", objectDefinition1);
		_addObjectAction(
			true, ObjectActionExecutorConstants.KEY_WEBHOOK,
			"company1ActiveWebhookObjectAction", objectDefinition1);
		_addObjectAction(
			false, ObjectActionExecutorConstants.KEY_GROOVY,
			"company1InactiveGroovyObjectAction", objectDefinition1);

		_addObjectValidationRule(
			true, ObjectValidationRuleConstants.ENGINE_TYPE_GROOVY,
			"company1ActiveGroovyObjectValidation",objectDefinition1);
		_addObjectValidationRule(
			true, ObjectValidationRuleConstants.ENGINE_TYPE_DDM,
			"company1ActiveDDMObjectValidation", objectDefinition1);
		_addObjectValidationRule(
			false, ObjectValidationRuleConstants.ENGINE_TYPE_GROOVY,
			"company1InactiveGroovyObjectValidation", objectDefinition1);

		Company liferayCompany = _companyLocalService.getCompany(
			TestPropsValues.getCompanyId());

		_user = TestPropsValues.getUser();

		ObjectDefinition objectDefinition2 = _createObjectDefinition();

		_addObjectAction(
			true, ObjectActionExecutorConstants.KEY_GROOVY,
			"liferayActiveGroovyObjectAction", objectDefinition2);
		_addObjectAction(
			true, ObjectActionExecutorConstants.KEY_WEBHOOK,
			"liferayActiveWebhookObjectAction", objectDefinition2);
		_addObjectAction(
			false, ObjectActionExecutorConstants.KEY_GROOVY,
			"liferayInactiveGroovyObjectAction", objectDefinition2);

		_addObjectValidationRule(
			true, ObjectValidationRuleConstants.ENGINE_TYPE_GROOVY,
			"liferayActiveGroovyObjectValidation",
			objectDefinition2);
		_addObjectValidationRule(
			true, ObjectValidationRuleConstants.ENGINE_TYPE_DDM,
			"liferayActiveDDMObjectValidation",
			objectDefinition2);
		_addObjectValidationRule(
			false, ObjectValidationRuleConstants.ENGINE_TYPE_GROOVY,
			"liferayInactiveGroovyObjectValidation",
			objectDefinition2);

		Assert.assertEquals(
			JSONFactoryUtil.createJSONArray(
			).put(
				JSONUtil.put(
					"companyWebId", "company1.com"
				).put(
					"sourceName", ""
				).put(
					"sourceURL",
					_getSourceURL(
						company1Company, objectDefinition1.getObjectDefinitionId(),
						"actions")
				)
			).put(
				JSONUtil.put(
					"companyWebId", "company1.com"
				).put(
					"sourceName", ""
				).put(
					"sourceURL",
					_getSourceURL(
						company1Company, objectDefinition1.getObjectDefinitionId(),
						"validations")
				)
			).put(
				JSONUtil.put(
					"companyWebId", "liferay.com"
				).put(
					"sourceName", ""
				).put(
					"sourceURL",
					_getSourceURL(
						liferayCompany, objectDefinition2.getObjectDefinitionId(),
						"actions")
				)
			).put(
				JSONUtil.put(
					"companyWebId", "liferay.com"
				).put(
					"sourceName", ""
				).put(
					"sourceURL",
					_getSourceURL(
						liferayCompany, objectDefinition2.getObjectDefinitionId(),
						"validations")
				)
			).toString(),
			_getGroovyScriptUsesJSONArrayString());
	}

	private void _addObjectAction(
			boolean active, String label, String objectActionExecutorKey,
			ObjectDefinition objectDefinition)
		throws Exception {

		UnicodeProperties unicodeProperties = UnicodePropertiesBuilder.put(
			"secret", "onafterdelete"
		).put(
			"url", "https://onafterdelete.com"
		).build();

		if (Objects.equals(
				ObjectActionExecutorConstants.KEY_GROOVY,
				objectActionExecutorKey)) {

			unicodeProperties = UnicodePropertiesBuilder.put(
				"script", "println \"Hello World \""
			).build();
		}

		_objectActionLocalService.addObjectAction(
			RandomTestUtil.randomString(), _user.getUserId(),
			objectDefinition.getObjectDefinitionId(), active, StringPool.BLANK,
			RandomTestUtil.randomString(),
			LocalizedMapUtil.getLocalizedMap(label),
			LocalizedMapUtil.getLocalizedMap(RandomTestUtil.randomString()),
			RandomTestUtil.randomString(), objectActionExecutorKey,
			ObjectActionTriggerConstants.KEY_ON_AFTER_ADD, unicodeProperties,
			false);
	}

	private void _addObjectValidationRule(
			boolean active, String engine, String label,
			ObjectDefinition objectDefinition)
		throws Exception {

		String script = "isEmailAddress(textObjectField)";

		if (Objects.equals(
				ObjectValidationRuleConstants.ENGINE_TYPE_GROOVY, engine)) {

			script = "println \"Hello World \"";
		}

		_objectValidationRuleLocalService.addObjectValidationRule(
			StringPool.BLANK, _user.getUserId(),
			objectDefinition.getObjectDefinitionId(), active, engine,
			LocalizedMapUtil.getLocalizedMap(label),
			LocalizedMapUtil.getLocalizedMap(RandomTestUtil.randomString()),
			ObjectValidationRuleConstants.OUTPUT_TYPE_FULL_VALIDATION, script,
			false, Collections.emptyList());
	}

	private ObjectDefinition _createObjectDefinition() throws Exception {
		ObjectDefinition objectDefinition =
			_objectDefinitionLocalService.addCustomObjectDefinition(
				_user.getUserId(), 0, false, false, false,
				LocalizedMapUtil.getLocalizedMap(RandomTestUtil.randomString()),
				ObjectDefinitionTestUtil.getRandomName(), null, null,
				LocalizedMapUtil.getLocalizedMap(RandomTestUtil.randomString()),
				false, ObjectDefinitionConstants.SCOPE_COMPANY,
				ObjectDefinitionConstants.STORAGE_TYPE_DEFAULT,
				Arrays.asList(
					new TextObjectFieldBuilder(
					).labelMap(
						LocalizedMapUtil.getLocalizedMap(
							RandomTestUtil.randomString())
					).name(
						"textObjectField"
					).objectFieldSettings(
						Collections.emptyList()
					).build()));

		return _objectDefinitionLocalService.publishCustomObjectDefinition(
			TestPropsValues.getUserId(),
			objectDefinition.getObjectDefinitionId());
	}

	private String _getGroovyScriptUsesJSONArrayString() throws Exception {
		MockLiferayResourceResponse mockLiferayResourceResponse =
			new MockLiferayResourceResponse();

		_mvcResourceCommand.serveResource(
			_mockLiferayResourceRequest, mockLiferayResourceResponse);

		ByteArrayOutputStream byteArrayOutputStream =
			(ByteArrayOutputStream)
				mockLiferayResourceResponse.getPortletOutputStream();

		return byteArrayOutputStream.toString();
	}

	private String _getSourceURL(
			Company company, long objectDefinitionId,
			String screenNavigationCategoryKey)
		throws Exception {

		String url = company.getPortalURL(0);

		url = HttpComponentsUtil.addParameter(
			url, "p_p_id", ObjectPortletKeys.OBJECT_DEFINITIONS);
		url = HttpComponentsUtil.addParameter(url, "p_p_lifecycle", "0");
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
			url, namespace + "objectDefinitionId", objectDefinitionId);

		return HttpComponentsUtil.addParameter(
			url, namespace + "screenNavigationCategoryKey",
			screenNavigationCategoryKey);
	}

	@Inject
	private CompanyLocalService _companyLocalService;

	private MockLiferayResourceRequest _mockLiferayResourceRequest;

	@Inject(filter = "mvc.command.name=/system_settings/get_groovy_script_uses")
	private MVCResourceCommand _mvcResourceCommand;

	@Inject
	private ObjectActionLocalService _objectActionLocalService;

	@Inject
	private ObjectDefinitionLocalService _objectDefinitionLocalService;

	@Inject
	private ObjectValidationRuleLocalService _objectValidationRuleLocalService;

	@Inject
	private Portal _portal;

	@Inject
	private PortletLocalService _portletLocalService;

	private User _user;

	@Inject
	private UserLocalService _userLocalService;

}