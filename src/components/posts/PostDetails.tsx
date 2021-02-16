import { useMutation, useQuery } from '@apollo/client';
import React, { useCallback, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostDetails as PostDetailsInterface } from '../../interfaces/Post';
import BackArrow from '../../shared/components/BackArrow';
import { Container, DetailsHeader, HeaderContainer } from '../../shared/StyledComponents';
import { DELETE_POST, GET_POST_BY_ID } from './Queries';
import { Alert, FormInstance, Modal, Spin } from 'antd';
import CommentListItem from '../comments/CommentListItem';
import CommentForm from '../comments/CommentForm';
import { CREATE_COMMENT } from '../comments/Queries';
import { ImMinus } from 'react-icons/im';
import OpenNotification from '../../shared/functions/OpenNotification';
import { SmileOutlined } from '@ant-design/icons';
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

const PostTitle = styled.div`
	font-size: 30px;
	font-weight: bold;
	text-align: center;
	margin: 30px 0px 30px 0px;
`;
const PostDescription = styled.div``;

const CommentsManipulationContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px 0 20px 0;
`;
const CommentsToggle = styled.div`
	color: blue;
	text-decoration: underline;
`;

const PostDetails: React.FC = () => {
	const [showComments, setShowComments] = useState(false);
	const [visible, setVisible] = React.useState(false);
	const [confirmLoading, setConfirmLoading] = React.useState(false);
	const formRef = useRef<FormInstance>(null);

	const history = useHistory();
	const { id, postId } = useParams<{ id: string; postId: string }>();
	const [createComment] = useMutation<{}, CommentInput>(CREATE_COMMENT);
	const [deletePost] = useMutation<{}, { id: string | undefined }>(DELETE_POST, {
		variables: { id: postId },
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
			OpenNotification(
				SUCCESS_MESSAGE,
				DATA_SENT_CORRECTLY_MESSAGE,
				5,
				<SmileOutlined style={{ color: 'green' }} />
			);
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
		<>
			<Spin spinning={confirmLoading}>
				<Container>
					{error && (
						<Alert message={ERROR_OCCURED_MESSAGE} description={ERROR} type="error" closable />
					)}
					<HeaderContainer>
						<BackArrow url={generatePath(USER_DETAILS_PATH, { id })} />
						<DetailsHeader>{data?.post.user?.username || <Skeleton />}</DetailsHeader>
						<ImMinus style={{ fontSize: '30px', marginTop: '5px' }} onClick={removePost} />
					</HeaderContainer>
					<PostTitle>{data?.post.title || <Skeleton />}</PostTitle>
					<PostDescription>{data?.post.body || <Skeleton />} </PostDescription>
					<CommentsManipulationContainer>
						<CommentsToggle onClick={toggleComments}>
							{!showComments ? SHOW : HIDE} {COMMENTS}
						</CommentsToggle>
						<CommentsToggle onClick={showModal}>{ADD_COMMENT}</CommentsToggle>
					</CommentsManipulationContainer>
					{showComments ? (
						data?.post.comments.data.map((c) => (
							<CommentListItem comment={c} key={c.id}></CommentListItem>
						))
					) : (
						<></>
					)}
					<Modal
						title={ADD_COMMENT}
						visible={visible}
						onOk={handleOk}
						confirmLoading={confirmLoading}
						onCancel={handleCancel}
					>
						<CommentForm ref={formRef}></CommentForm>
					</Modal>
				</Container>
			</Spin>
		</>
	);
};
export default PostDetails;
