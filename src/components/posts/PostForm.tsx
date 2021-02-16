import { Input, Form, FormInstance } from 'antd';
import React, { forwardRef } from 'react';
import { BODY_MISSING_ERROR_MESSAGE, TITLE_MISSING_ERROR_MESSAGE } from '../../shared/Strings';

const PostForm = forwardRef<FormInstance, {}>((_, ref) => (
	<Form ref={ref} name="PostForm" initialValues={{ remember: true }}>
		<Form.Item
			label="Title"
			name="title"
			rules={[{ required: true, message: TITLE_MISSING_ERROR_MESSAGE }]}
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Body"
			name="body"
			rules={[{ required: true, message: BODY_MISSING_ERROR_MESSAGE }]}
		>
			<Input />
		</Form.Item>
	</Form>
));

export default PostForm;
