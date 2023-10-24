/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.object.internal.field.business.type;

import com.liferay.object.constants.ObjectFieldConstants;
import com.liferay.object.constants.ObjectFieldSettingConstants;
import com.liferay.object.exception.ObjectFieldSettingValueException;
import com.liferay.object.field.business.type.ObjectFieldBusinessType;
import com.liferay.object.model.ObjectField;
import com.liferay.object.model.ObjectFieldSetting;
import com.liferay.object.service.ObjectEntryLocalService;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.language.Language;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.SetUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.vulcan.extension.PropertyDefinition;

import java.math.BigDecimal;

import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Carolina Barbosa
 */
@Component(
	property = "object.field.business.type.key=" + ObjectFieldConstants.BUSINESS_TYPE_AUTO_INCREMENT,
	service = ObjectFieldBusinessType.class
)
public class AutoIncrementObjectFieldBusinessType
	extends BaseObjectFieldBusinessType {

	@Override
	public Set<String> getAllowedObjectFieldSettingsNames() {
		return SetUtil.fromArray(
			ObjectFieldSettingConstants.NAME_PREFIX,
			ObjectFieldSettingConstants.NAME_SUFFIX);
	}

	@Override
	public String getDBType() {
		return ObjectFieldConstants.DB_TYPE_STRING;
	}

	@Override
	public String getDDMFormFieldTypeName() {
		return null;
	}

	@Override
	public String getDescription(Locale locale) {
		return _language.get(
			locale,
			"automatically-generates-a-unique-numeric-value-when-a-new-entry-" +
				"is-added-this-field-value-is-read-only");
	}

	@Override
	public String getLabel(Locale locale) {
		return _language.get(locale, "auto-increment");
	}

	@Override
	public String getName() {
		return ObjectFieldConstants.BUSINESS_TYPE_AUTO_INCREMENT;
	}

	@Override
	public PropertyDefinition.PropertyType getPropertyType() {
		return PropertyDefinition.PropertyType.TEXT;
	}

	@Override
	public Set<String> getRequiredObjectFieldSettingsNames(
		ObjectField objectField) {

		return Collections.singleton(
			ObjectFieldSettingConstants.NAME_INITIAL_VALUE);
	}

	public Set<String> getUnmodifiableObjectFieldSettingsNames() {
		return SetUtil.fromArray(
			ObjectFieldSettingConstants.NAME_INITIAL_VALUE,
			ObjectFieldSettingConstants.NAME_PREFIX,
			ObjectFieldSettingConstants.NAME_SUFFIX);
	}

	@Override
	public Object getValue(
			ObjectField objectField, long userId, Map<String, Object> values)
		throws PortalException {

		Object value = values.get(objectField.getName());

		if (Validator.isNull(value)) {
			value =
				_objectEntryLocalService.getNextAutoIncrementObjectEntryValue(
					objectField);
		}

		return value;
	}

	@Override
	public void validateObjectFieldSettings(
			ObjectField objectField,
			List<ObjectFieldSetting> objectFieldSettings)
		throws PortalException {

		super.validateObjectFieldSettings(objectField, objectFieldSettings);

		Map<String, String> objectFieldSettingsValues =
			getObjectFieldSettingsValues(objectFieldSettings);

		BigDecimal bigDecimal = null;

		try {
			bigDecimal = new BigDecimal(
				objectFieldSettingsValues.get(
					ObjectFieldSettingConstants.NAME_INITIAL_VALUE));
		}
		catch (NumberFormatException numberFormatException) {
			if (_log.isDebugEnabled()) {
				_log.debug(numberFormatException);
			}
		}

		if ((bigDecimal == null) || (bigDecimal.signum() == -1)) {
			throw new ObjectFieldSettingValueException.InvalidValue(
				objectField.getName(),
				ObjectFieldSettingConstants.NAME_INITIAL_VALUE,
				objectFieldSettingsValues.get(
					ObjectFieldSettingConstants.NAME_INITIAL_VALUE));
		}
	}

	private static final Log _log = LogFactoryUtil.getLog(
		AutoIncrementObjectFieldBusinessType.class);

	@Reference
	private Language _language;

	@Reference
	private ObjectEntryLocalService _objectEntryLocalService;

}