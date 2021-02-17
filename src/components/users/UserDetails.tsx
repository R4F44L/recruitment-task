import { useMutation, useQuery } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { PostInput, PostListItem as PostListItemInterface } from '../../interfaces/Post';
import { UserDetails as UserDetailsInterface } from '../../interfaces/User';
import PostListItem from '../posts/PostListItem';
import { GET_USER_BY_ID } from './Queries';
import { ImPlus } from 'react-icons/im';
import React, { useCallback, useRef } from 'react';
import { IdParam } from '../../shared/Interfaces';
import BackArrow from '../../shared/components/BackArrow';
import { Container, DetailsHeader, HeaderContainer } from '../../shared/Styles';
import { Alert, FormInstance, Modal } from 'antd';
import PostForm from '../posts/PostForm';
import { CREATE_POST } from '../posts/Queries';
import OpenNotification from '../../shared/functions/OpenNotification';
import { SmileOutlined } from '@ant-design/icons';
import {
	ERROR_OCCURED_MESSAGE,
	DATA_SENT_CORRECTLY_MESSAGE,
	SUCCESS_MESSAGE,
	ADD_COMMENT,
} from '../../shared/Strings';
import { ROOT_PATH } from '../../shared/Constants';

const UserDetails: React.FC = () => {
	const { id } = useParams<IdParam>();
	const { data, loading, error } = useQuery<{ user: UserDetailsInterface }>(GET_USER_BY_ID, {
		variables: { id },
	});
	const [createPost] = useMutation<{}, PostInput>(CREATE_POST);
	const [visible, setVisible] = React.useState(false);
	const [confirmLoading, setConfirmLoading] = React.useState(false);
	const showModal = useCallback(() => {
		setVisible(true);
	}, [setVisible]);
	const formRef = useRef<FormInstance>(null);
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
					<ImPlus style={{ fontSize: '30px', marginTop: '5px' }} onClick={showModal} />
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
