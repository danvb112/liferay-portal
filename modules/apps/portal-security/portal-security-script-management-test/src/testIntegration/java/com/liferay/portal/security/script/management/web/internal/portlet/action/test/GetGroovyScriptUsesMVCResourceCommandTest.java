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
import com.liferay.object.model.ObjectAction;
import com.liferay.object.model.ObjectDefinition;
import com.liferay.object.model.ObjectValidationRule;
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
import com.liferay.portal.kernel.util.LocaleUtil;
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
		Company company1 = _companyLocalService.getCompany(
			TestPropsValues.getCompanyId());

		_user = TestPropsValues.getUser();

		ObjectDefinition objectDefinition1 = _createObjectDefinition();

		ObjectAction objectAction1 = _addObjectAction(
			true, ObjectActionExecutorConstants.KEY_GROOVY, objectDefinition1);

		_addObjectAction(
			false, ObjectActionExecutorConstants.KEY_GROOVY, objectDefinition1);
		_addObjectAction(
			true, ObjectActionExecutorConstants.KEY_WEBHOOK, objectDefinition1);

		ObjectValidationRule objectValidationRule1 = _addObjectValidationRule(
			true, ObjectValidationRuleConstants.ENGINE_TYPE_GROOVY,
			objectDefinition1);

		_addObjectValidationRule(
			false, ObjectValidationRuleConstants.ENGINE_TYPE_GROOVY,
			objectDefinition1);
		_addObjectValidationRule(
			true, ObjectValidationRuleConstants.ENGINE_TYPE_DDM,
			objectDefinition1);

		Company company2 = CompanyTestUtil.addCompany("company2.com");

		_user = UserTestUtil.addCompanyAdminUser(company2);

		ObjectDefinition objectDefinition2 = _createObjectDefinition();

		ObjectAction objectAction2 = _addObjectAction(
			true, ObjectActionExecutorConstants.KEY_GROOVY, objectDefinition2);

		_addObjectAction(
			false, ObjectActionExecutorConstants.KEY_GROOVY, objectDefinition2);
		_addObjectAction(
			true, ObjectActionExecutorConstants.KEY_WEBHOOK, objectDefinition2);

		ObjectValidationRule objectValidationRule2 = _addObjectValidationRule(
			true, ObjectValidationRuleConstants.ENGINE_TYPE_GROOVY,
			objectDefinition2);

		_addObjectValidationRule(
			false, ObjectValidationRuleConstants.ENGINE_TYPE_GROOVY,
			objectDefinition2);
		_addObjectValidationRule(
			true, ObjectValidationRuleConstants.ENGINE_TYPE_DDM,
			objectDefinition2);

		Assert.assertEquals(
			JSONFactoryUtil.createJSONArray(
			).put(
				JSONUtil.put(
					"companyWebId", "company2.com"
				).put(
					"sourceName", objectValidationRule2.getName(LocaleUtil.US)
				).put(
					"sourceURL",
					_getSourceURL(
						company2, objectDefinition2.getObjectDefinitionId(),
						"validations")
				)
			).put(
				JSONUtil.put(
					"companyWebId", "company2.com"
				).put(
					"sourceName", objectAction2.getLabel(LocaleUtil.US)
				).put(
					"sourceURL",
					_getSourceURL(
						company2, objectDefinition2.getObjectDefinitionId(),
						"actions")
				)
			).put(
				JSONUtil.put(
					"companyWebId", "liferay.com"
				).put(
					"sourceName", objectValidationRule1.getName(LocaleUtil.US)
				).put(
					"sourceURL",
					_getSourceURL(
						company1, objectDefinition1.getObjectDefinitionId(),
						"validations")
				)
			).put(
				JSONUtil.put(
					"companyWebId", "liferay.com"
				).put(
					"sourceName", objectAction1.getLabel(LocaleUtil.US)
				).put(
					"sourceURL",
					_getSourceURL(
						company1, objectDefinition1.getObjectDefinitionId(),
						"actions")
				)
			).toString(),
			_getGroovyScriptUsesJSONArrayString());
	}

	private ObjectAction _addObjectAction(
			boolean active, String objectActionExecutorKey,
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

		return _objectActionLocalService.addObjectAction(
			RandomTestUtil.randomString(), _user.getUserId(),
			objectDefinition.getObjectDefinitionId(), active, StringPool.BLANK,
			RandomTestUtil.randomString(),
			LocalizedMapUtil.getLocalizedMap(RandomTestUtil.randomString()),
			LocalizedMapUtil.getLocalizedMap(RandomTestUtil.randomString()),
			RandomTestUtil.randomString(), objectActionExecutorKey,
			ObjectActionTriggerConstants.KEY_ON_AFTER_ADD, unicodeProperties,
			false);
	}

	private ObjectValidationRule _addObjectValidationRule(
			boolean active, String engine, ObjectDefinition objectDefinition)
		throws Exception {

		String script = "isEmailAddress(textObjectField)";

		if (Objects.equals(
				ObjectValidationRuleConstants.ENGINE_TYPE_GROOVY, engine)) {

			script = "println \"Hello World \"";
		}

		return _objectValidationRuleLocalService.addObjectValidationRule(
			StringPool.BLANK, _user.getUserId(),
			objectDefinition.getObjectDefinitionId(), active, engine,
			LocalizedMapUtil.getLocalizedMap(RandomTestUtil.randomString()),
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