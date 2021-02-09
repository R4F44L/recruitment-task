import { Input, Form, FormInstance } from 'antd';
import React, { forwardRef } from 'react';

export const CommentForm = forwardRef<FormInstance, {}>((props, ref) => (
	<Form ref={ref} name="commentForm" initialValues={{ remember: true }}>
		<Form.Item label="Name" name="name">
			<Input />
		</Form.Item>
		<Form.Item label="Body" name="body">
			<Input />
		</Form.Item>
		<Form.Item label="Email" name="email">
			<Input />
		</Form.Item>
	</Form>
));
