import React, { forwardRef } from 'react';
import { Input, Form, FormInstance } from 'antd';

import {
	BODY,
	BODY_MISSING_ERROR_MESSAGE,
	TITLE,
	TITLE_MISSING_ERROR_MESSAGE,
} from '../../shared/Strings';

const PostForm = forwardRef<FormInstance, {}>((_, ref) => (
	<Form ref={ref} name="PostForm" initialValues={{ remember: true }}>
		<Form.Item
			label={TITLE}
			name="title"
			rules={[{ required: true, message: TITLE_MISSING_ERROR_MESSAGE }]}
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
	</Form>
));

export default PostForm;
