import React, { useCallback, useRef, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Alert, FormInstance, Modal, Spin } from 'antd';
import { useMutation, useQuery } from '@apollo/client';

import { PostDetails as PostDetailsInterface } from '../../interfaces/Post';
import BackArrow from '../../shared/components/BackArrow';
import {
	Container,
	DetailsHeader,
	GreenSmile,
	HeaderContainer,
	MinusIcon,
} from '../../shared/Styles';
import { DELETE_POST, GET_POST_BY_ID } from '../../components/posts/Queries';
import CommentListItem from '../../components/comments/CommentListItem';
import CommentForm from '../../components/comments/CommentForm';
import { CREATE_COMMENT } from '../../components/comments/Queries';
import OpenNotification from '../../shared/functions/OpenNotification';
import { CommentInput } from '../../interfaces/Comment';
import {
	ADD_COMMENT,
	COMMENTS,
	DATA_SENT_CORRECTLY_MESSAGE,
	ERROR,
	ERROR_OCCURED_MESSAGE,
	HIDE,
	SHOW,
	SUCCESS_MESSAGE,
} from '../../shared/Strings';
import { USER_DETAILS_PATH } from '../../shared/Constants';
import {
	PostTitle,
	PostDescription,
	CommentsManipulationContainer,
	CommentsToggle,
} from '../../pages/posts/Styles';

const PostDetails: React.FC = () => {
	const [showComments, setShowComments] = useState(false);
	const [visible, setVisible] = React.useState(false);
	const [confirmLoading, setConfirmLoading] = React.useState(false);
	const formRef = useRef<FormInstance>(null);

	const history = useHistory();
	const { id, postId } = useParams<{ id: string; postId: string }>();

	const [createComment] = useMutation<{}, CommentInput>(CREATE_COMMENT, {
		refetchQueries: [{ query: GET_POST_BY_ID, variables: { postId } }],
	});

	const [deletePost] = useMutation<{}, { id: string | undefined }>(DELETE_POST, {
		variables: { id: postId },
		refetchQueries: [{ query: GET_POST_BY_ID, variables: { postId } }],
	});

	const toggleComments = useCallback(() => {
		setShowComments(!showComments);
	}, [showComments]);

	const { data, error } = useQuery<{ post: PostDetailsInterface }, { postId: string }>(
		GET_POST_BY_ID,
		{
			variables: { postId },
		}
	);

	const showModal = useCallback(() => {
		setVisible(true);
	}, [setVisible]);

	const handleOk = useCallback(async () => {
		setConfirmLoading(true);
		try {
			const { name, body, email } = await formRef.current?.validateFields();
			await createComment({
				variables: { comment: { name, email, body } },
			});
			OpenNotification(SUCCESS_MESSAGE, DATA_SENT_CORRECTLY_MESSAGE, 5, <GreenSmile />);
			setConfirmLoading(false);
			setVisible(false);
		} catch {
			setConfirmLoading(false);
		}
	}, [createComment, formRef, setConfirmLoading, setVisible]);

	const handleCancel = useCallback(() => {
		setVisible(false);
	}, [setVisible]);

	const removePost = useCallback(async () => {
		setConfirmLoading(true);
		try {
			await deletePost();
		} catch {}
		setConfirmLoading(false);
		history.push(generatePath(USER_DETAILS_PATH, { id }));
	}, [deletePost, setConfirmLoading, history, id]);

	return (
		<Spin spinning={confirmLoading}>
			<Container>
				{error && (
					<Alert message={ERROR_OCCURED_MESSAGE} description={ERROR} type="error" closable />
				)}
				<HeaderContainer>
					<BackArrow url={generatePath(USER_DETAILS_PATH, { id })} />
					<DetailsHeader>{data?.post.user?.username || <Skeleton />}</DetailsHeader>
					<MinusIcon onClick={removePost} />
				</HeaderContainer>
				<PostTitle>{data?.post.title || <Skeleton />}</PostTitle>
				<PostDescription>{data?.post.body || <Skeleton />} </PostDescription>
				<CommentsManipulationContainer>
					<CommentsToggle onClick={toggleComments}>
						{!showComments ? SHOW : HIDE} {COMMENTS}
					</CommentsToggle>
					<CommentsToggle onClick={showModal}>{ADD_COMMENT}</CommentsToggle>
				</CommentsManipulationContainer>
				{showComments &&
					data?.post.comments.data.map((c) => (
						<CommentListItem comment={c} key={c.id}></CommentListItem>
					))}
				<Modal
					title={ADD_COMMENT}
					visible={visible}
					onOk={handleOk}
					confirmLoading={confirmLoading}
					onCancel={handleCancel}
				>
					<CommentForm ref={formRef} />
				</Modal>
			</Container>
		</Spin>
	);
};

export default PostDetails;
