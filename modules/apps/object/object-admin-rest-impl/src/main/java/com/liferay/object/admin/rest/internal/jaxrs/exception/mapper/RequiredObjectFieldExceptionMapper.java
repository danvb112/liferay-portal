package com.liferay.object.admin.rest.internal.jaxrs.exception.mapper;

import com.liferay.object.exception.RequiredObjectFieldException;
import com.liferay.portal.kernel.language.Language;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.vulcan.jaxrs.exception.mapper.BaseExceptionMapper;
import com.liferay.portal.vulcan.jaxrs.exception.mapper.Problem;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import java.util.Locale;

/**
 * @author Daniel Bonasser
 */
@Component(
	property = {
		"osgi.jaxrs.application.select=(osgi.jaxrs.name=Liferay.Object.Admin.REST)",
		"osgi.jaxrs.extension=true",
		"osgi.jaxrs.name=Liferay.Object.Admin.REST.RequiredObjectFieldExceptionMapper"
	},
	service = ExceptionMapper.class
)
public class RequiredObjectFieldExceptionMapper extends BaseExceptionMapper<RequiredObjectFieldException> {

	@Override
	protected Problem getProblem(
		RequiredObjectFieldException requiredObjectFieldException) {

		return new Problem(
			Response.Status.BAD_REQUEST,
			_language.get(
				LocaleUtil.getDefault(),
				"at-least-one-custom-field-must-be-added"));
	}

	@Override
	protected boolean isSanitize() {
		return false;
	}

	@Reference
	private Language _language;
}
