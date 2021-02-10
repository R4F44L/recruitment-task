import { Input, Form, FormInstance } from 'antd';
import React, { forwardRef } from 'react';

export const PostForm = forwardRef<FormInstance, {}>((props, ref) => (
	<Form ref={ref} name="PostForm" initialValues={{ remember: true }}>
		<Form.Item label="Title" name="title">
			<Input />
		</Form.Item>
		<Form.Item label="Body" name="body">
			<Input />
		</Form.Item>
	</Form>
));