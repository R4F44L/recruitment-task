import React, { useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ImPlus } from 'react-icons/im';
import Skeleton from 'react-loading-skeleton';

import { Alert, FormInstance, Modal } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';

import { PostInput, PostListItem as PostListItemInterface } from '../../interfaces/Post';
import { UserDetails as UserDetailsInterface } from '../../interfaces/User';
import PostListItem from '../../components/posts/PostListItem';
import { GET_USER_BY_ID } from '../../components/users/Queries';
import { IdParam } from '../../shared/Interfaces';
import BackArrow from '../../shared/components/BackArrow';
import { Container, DetailsHeader, HeaderContainer, PlusMinusWrapper } from '../../shared/Styles';
import PostForm from '../../components/posts/PostForm';
import { CREATE_POST } from '../../components/posts/Queries';
import OpenNotification from '../../shared/functions/OpenNotification';
import {
	ERROR_OCCURED_MESSAGE,
	DATA_SENT_CORRECTLY_MESSAGE,
	SUCCESS_MESSAGE,
	ADD_COMMENT,
} from '../../shared/Strings';
import { ROOT_PATH } from '../../shared/Constants';

const UserDetails: React.FC = () => {
	const [visible, setVisible] = React.useState(false);
	const [confirmLoading, setConfirmLoading] = React.useState(false);
	const formRef = useRef<FormInstance>(null);

	const { id } = useParams<IdParam>();
	const { data, loading, error } = useQuery<{ user: UserDetailsInterface }>(GET_USER_BY_ID, {
		variables: { id },
	});
	const [createPost] = useMutation<{}, PostInput>(CREATE_POST);

	const showModal = useCallback(() => {
		setVisible(true);
	}, [setVisible]);

	const handleOk = useCallback(async () => {
		setConfirmLoading(true);
		try {
			const { title, body } = await formRef.current?.validateFields();
			await createPost({
				variables: { post: { title, body } },
			});
			setConfirmLoading(false);
			setVisible(false);
			OpenNotification(
				SUCCESS_MESSAGE,
				DATA_SENT_CORRECTLY_MESSAGE,
				5,
				<SmileOutlined style={{ color: 'green' }} />
			);
		} catch (err) {
			setConfirmLoading(false);
		}
	}, [createPost, formRef, setConfirmLoading, setVisible]);

	const handleCancel = useCallback(() => {
		setVisible(false);
	}, [setVisible]);

	return (
		<>
			<Container>
				{error && (
					<Alert message={ERROR_OCCURED_MESSAGE} description="Error" type="error" closable />
				)}
				<HeaderContainer>
					<BackArrow url={ROOT_PATH} />
					<DetailsHeader>{data?.user.name || <Skeleton />}</DetailsHeader>
					<PlusMinusWrapper>
						<ImPlus onClick={showModal} />
					</PlusMinusWrapper>
				</HeaderContainer>
				{loading
					? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => <PostListItem key={i} />)
					: data?.user.posts?.data.map((p: PostListItemInterface) => (
							<PostListItem post={p} key={p.id} />
					  ))}
				<Modal
					title={ADD_COMMENT}
					visible={visible}
					onOk={handleOk}
					confirmLoading={confirmLoading}
					onCancel={handleCancel}
				>
					<PostForm ref={formRef} />
				</Modal>
			</Container>
		</>
	);
};

export default UserDetails;
