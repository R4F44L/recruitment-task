import React from 'react';
import styled from 'styled-components';
import { PostComment } from '../../interfaces/Post';

const Container = styled.div`border: 1px solid black; padding 20px; margin: 20px 0 20px 0`;
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0 0 20px 0;
`;
const CommentName = styled.span`
	font-weight: bold;
`;
const CommentEmail = styled.span`
	color: blue;
	text-decoration: underline;
`;

interface CommentListItemProps {
	comment: PostComment;
}

let CommentListItem: React.FC<CommentListItemProps> = ({ comment }) => {
	return (
		<>
			<Container>
				<Header>
					<CommentName>{comment.name}</CommentName>
					<CommentEmail>{comment.email}</CommentEmail>
				</Header>
				{comment.body}
			</Container>
		</>
	);
};
export default CommentListItem = React.memo(CommentListItem);
