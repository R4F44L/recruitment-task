import React, { useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Alert, FormInstance, Modal } from 'antd';
import { useMutation, useQuery } from '@apollo/client';

import { PostInput, PostListItem as PostListItemInterface } from '../../interfaces/Post';
import { UserDetails as UserDetailsInterface } from '../../interfaces/User';
import PostListItem from '../../components/posts/PostListItem';
import { GET_USER_BY_ID } from '../../components/users/Queries';
import { IdParam } from '../../interfaces/RouteParams';
import BackArrow from '../../shared/components/BackArrow';
import {
	Container,
	DetailsHeader,
	GreenSmile,
	HeaderContainer,
	PlusIcon,
} from '../../shared/Styles';
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
import PostListItemSkeleton from '../../components/posts/PostListItemSkeleton';
import ListSkeleton from '../../shared/components/ListSkeleton';

const UserDetails: React.FC = () => {
	const [visible, setVisible] = React.useState(false);
	const [confirmLoading, setConfirmLoading] = React.useState(false);
	const formRef = useRef<FormInstance>(null);
	const { id } = useParams<IdParam>();

	const { data, loading, error } = useQuery<{ user: UserDetailsInterface }>(GET_USER_BY_ID, {
		variables: { id },
	});

	const [createPost] = useMutation<{}, PostInput>(CREATE_POST, {
		refetchQueries: [{ query: GET_USER_BY_ID, variables: { id } }],
	});

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
			OpenNotification(SUCCESS_MESSAGE, DATA_SENT_CORRECTLY_MESSAGE, 5, <GreenSmile />);
		} catch (err) {
			setConfirmLoading(false);
		}
	}, [createPost, formRef, setConfirmLoading, setVisible]);

	const handleCancel = useCallback(() => {
		setVisible(false);
	}, [setVisible]);

	return (
		<Container>
			{error && <Alert message={ERROR_OCCURED_MESSAGE} description="Error" type="error" closable />}
			<HeaderContainer>
				<BackArrow url={ROOT_PATH} />
				<DetailsHeader>{loading ? <Skeleton /> : data?.user.name}</DetailsHeader>
				<PlusIcon onClick={showModal} />
			</HeaderContainer>
			{loading ? (
				<ListSkeleton range={8} component={PostListItemSkeleton} />
			) : (
				data?.user.posts?.data.map((p: PostListItemInterface) => (
					<PostListItem post={p} key={p.id} />
				))
			)}
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
	);
};

export default UserDetails;
