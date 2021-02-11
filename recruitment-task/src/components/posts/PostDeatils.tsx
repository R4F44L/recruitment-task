import { useMutation, useQuery } from '@apollo/client';
import React, { useCallback, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostDetails as PostDeatilsInterface } from '../../interfaces/Post';
import { BackArrow } from '../../shared/BackArrow';
import { Container, DetailsHeader, HeaderContainer } from '../../shared/StyledComponents';
import { DELETE_POST, GET_POST_BY_ID } from './Queries';
import { Alert, FormInstance, Modal, Spin } from 'antd';
import CommentListItem from '../comments/CommentListItem';
import { CommentForm } from '../comments/CommentForm';
import { CREATE_COMMENT } from '../comments/Queries';
import { ImMinus } from 'react-icons/im';
import { openNotification } from '../../shared/Functions';
import { SmileOutlined } from '@ant-design/icons';
import { CommentInput } from '../../interfaces/Comment';

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

export const PostDetails: React.FC = () => {
	const [showComments, setShowComments] = useState(false);
	const history = useHistory();
	const toggleComments = useCallback(() => {
		setShowComments(!showComments);
	}, [showComments]);
	const { id, postId } = useParams<{ id: string; postId: string }>();
	const { data, error } = useQuery<{ post: PostDeatilsInterface }, { postId: string }>(
		GET_POST_BY_ID,
		{
			variables: { postId },
		}
	);
	const [createComment] = useMutation<{}, CommentInput>(CREATE_COMMENT);
	const [visible, setVisible] = React.useState(false);
	const [confirmLoading, setConfirmLoading] = React.useState(false);
	const [deletePost] = useMutation<{}, { id: string | undefined }>(DELETE_POST, {
		variables: { id: postId },
	});
	const showModal = useCallback(() => {
		setVisible(true);
	}, [setVisible]);
	const formRef = useRef<FormInstance>(null);
	const handleOk = useCallback(async () => {
		setConfirmLoading(true);
		try {
			const { name, body, email } = await formRef.current?.validateFields();
			await createComment({
				variables: { comment: { name, email, body } },
			});
			openNotification(
				'Succes',
				'Data sent correctly',
				5,
				<SmileOutlined style={{ color: 'green' }} />
			);
			setConfirmLoading(false);
			setVisible(false);
		} catch (err) {
			console.log('errors', err);
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
		} catch (err) {
			console.log(err);
		}
		setConfirmLoading(false);
		history.push(`/user/${id}`);
	}, [deletePost, setConfirmLoading, history, id]);
	return (
		<>
			<Spin spinning={confirmLoading}>
				<Container>
					{error && <Alert message="Error Occured" description="Error" type="error" closable />}
					<HeaderContainer>
						<BackArrow url={`/user/${id}`} />
						<DetailsHeader>{data?.post.user?.username || <Skeleton />}</DetailsHeader>
						<ImMinus style={{ fontSize: '30px', marginTop: '5px' }} onClick={removePost} />
					</HeaderContainer>
					<PostTitle>{data?.post.title || <Skeleton />}</PostTitle>
					<PostDescription>{data?.post.body || <Skeleton />} </PostDescription>
					<CommentsManipulationContainer>
						<CommentsToggle onClick={toggleComments}>
							{!showComments ? 'Show' : 'Hide'} comments
						</CommentsToggle>
						<CommentsToggle onClick={showModal}>Add Comment</CommentsToggle>
					</CommentsManipulationContainer>
					{showComments ? (
						data?.post.comments.data.map((c) => (
							<CommentListItem comment={c} key={c.id}></CommentListItem>
						))
					) : (
						<></>
					)}
					<Modal
						title="Add comment"
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
