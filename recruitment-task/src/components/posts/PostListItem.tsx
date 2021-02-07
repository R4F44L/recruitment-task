import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PostListItem as PostListItemInterface } from '../../interfaces/Post';
import { AiOutlineRight } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
interface PostListItemProps {
	post?: PostListItemInterface;
}

const Container = styled.div`border 2px solid black; width 80%; margin: 10px auto 10px auto; padding: 10px;   display: flex;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;`;

const Title = styled.p`
	width: 100%;
	margin: 0 0 0 0;
`;

export const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
	const history = useHistory();
	const postRedirect = useCallback(() => {
		history.push(`${post?.id}/`);
	}, [post, history]);
	return (
		<>
			<Container onClick={postRedirect}>
				<Title>
					<RiDeleteBin6Line
						style={{
							marginRight: '10px',
							verticalAlign: 'middle',
							display: 'inline-block',
						}}
					/>
					{post?.title || <Skeleton />}
					<AiOutlineRight
						style={{
							marginLeft: 'auto',
							verticalAlign: 'middle',
							display: 'inline-block',
						}}
					/>
				</Title>
			</Container>
		</>
	);
};
