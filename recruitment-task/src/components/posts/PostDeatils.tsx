import { useQuery } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostDetails as PostDeatilsInterface } from '../../interfaces/Post';
import { BackArrow } from '../../shared/BackArrow';
import { Container, DetailsHeader, HeaderContainer } from '../../shared/StyledComponents';
import { CommentListItem } from './CommentListItem';
import { GET_POST_BY_ID } from './Queries';

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
					<CommentsToggle>Add Comment</CommentsToggle>
				</CommentsManipulationContainer>
				{showComments ? (
					data?.post.comments.data.map((c) => <CommentListItem comment={c}></CommentListItem>)
				) : (
					<></>
				)}
			</Container>
		</>
	);
};
