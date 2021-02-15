import { Input, Form, FormInstance } from 'antd';
import React, { forwardRef } from 'react';

const CommentForm = forwardRef<FormInstance, {}>((_, ref) => (
	<Form ref={ref} name="commentForm" initialValues={{ remember: true }}>
		<Form.Item
			label="Name"
			name="name"
			rules={[{ required: true, message: 'Please input your name!' }]}
		>
			<Input />
		</Form.Item>
		<Form.Item label="Body" name="body" rules={[{ required: true, message: 'Please input body!' }]}>
			<Input />
		</Form.Item>
		<Form.Item
			label="Email"
			name="email"
			rules={[
				{ required: true, message: 'Please input your email!' },
				{
					pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					message: 'Please provide correct email',
				},
			]}
		>
			<Input />
		</Form.Item>
	</Form>
));

export default CommentForm;
