import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import React, { useCallback, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostDetails as PostDeatilsInterface } from '../../interfaces/Post';
import { BackArrow } from '../../shared/BackArrow';
import { Container, DetailsHeader, HeaderContainer } from '../../shared/StyledComponents';
import { GET_POST_BY_ID } from './Queries';
import { FormInstance, Modal } from 'antd';
import CommentListItem from '../comments/CommentListItem';
import { CommentForm } from '../comments/CommentForm';
import { CREATE_COMMENT } from '../comments/Queries';

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
	const toggleComments = useCallback(() => {
		setShowComments(!showComments);
	}, [showComments]);
	const { id, postId } = useParams<{ id: string; postId: string }>();
	const { data, loading, error } = useQuery<{ post: PostDeatilsInterface }>(GET_POST_BY_ID, {
		variables: { postId },
	});
	const [createComment, { data: createdComment }] = useMutation(CREATE_COMMENT);
	const [visible, setVisible] = React.useState(false);
	const [confirmLoading, setConfirmLoading] = React.useState(false);

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
	return (
		<>
			<Container>
				<HeaderContainer>
					<BackArrow url={`/user/${id}`} />
					<DetailsHeader>{data?.post.user?.username || <Skeleton />}</DetailsHeader>
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
		</>
	);
};
