import React, { useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { PostListItem as PostListItemInterface } from '../../interfaces/Post';
import { AiOutlineRight } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
import { SkeletonFlexContainer } from '../../shared/StyledComponents';
interface PostListItemProps {
	post?: PostListItemInterface;
}

const Container = styled.div`
    border 2px solid black; 
    width 80%; 
    margin: 10px auto 10px auto; 
    padding: 10px;   
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;`;

const Title = styled.div`
	display: flex;
	margin: 0 0 0 0;
	width: 100%;
	height: 100%;
`;

export const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
	const history = useHistory();
	const { url } = useRouteMatch();
	const postRedirect = useCallback(() => {
		if (post?.id) {
			history.push(`${url}/${post?.id}/`);
		}
	}, [post, history, url]);
	return (
		<>
			<Container onClick={postRedirect}>
				<Title>
					<RiDeleteBin6Line
						style={{
							marginRight: '10px',
							verticalAlign: 'middle',
							display: 'inline-block',
							marginTop: '3px',
						}}
					/>
					<SkeletonFlexContainer>{post?.title || <Skeleton />}</SkeletonFlexContainer>
					<AiOutlineRight
						style={{
							marginLeft: 'auto',
							verticalAlign: 'middle',
							marginTop: '3px',
							display: 'inline-block',
						}}
					/>
				</Title>
			</Container>
		</>
	);
};
