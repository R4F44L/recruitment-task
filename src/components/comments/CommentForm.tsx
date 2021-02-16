import { Input, Form, FormInstance } from 'antd';
import React, { forwardRef } from 'react';
import { EMAIL_REGEX_PATTERN } from '../../shared/Constants';
import {
	BODY,
	BODY_MISSING_ERROR_MESSAGE,
	EMAIL,
	EMAIL_MISSING_ERROR_MESSAGE,
	EMAIL_REGEX_ERROR_MESSAGE,
	NAME,
	NAME_MISSING_ERROR_MESSAGE,
} from '../../shared/Strings';

const CommentForm = forwardRef<FormInstance, {}>((_, ref) => (
	<Form ref={ref} name="commentForm" initialValues={{ remember: true }}>
		<Form.Item
			label={NAME}
			name="name"
			rules={[{ required: true, message: NAME_MISSING_ERROR_MESSAGE }]}
		>
			<Input />
		</Form.Item>
		<Form.Item
			label={BODY}
			name="body"
			rules={[{ required: true, message: BODY_MISSING_ERROR_MESSAGE }]}
		>
			<Input />
		</Form.Item>
		<Form.Item
			label={EMAIL}
			name="email"
			rules={[
				{ required: true, message: EMAIL_MISSING_ERROR_MESSAGE },
				{
					pattern: EMAIL_REGEX_PATTERN,
					message: EMAIL_REGEX_ERROR_MESSAGE,
				},
			]}
		>
			<Input />
		</Form.Item>
	</Form>
));

export default CommentForm;
