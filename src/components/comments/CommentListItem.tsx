import React from 'react';

import { PostComment } from '../../interfaces/Post';
import {
	CommentName,
	CommentEmail,
	CommentListItemContainer,
	CommentListItemHeader,
} from './Styles';

interface CommentListItemProps {
	comment: PostComment;
}

const CommentListItem: React.FC<CommentListItemProps> = ({ comment }) => (
	<CommentListItemContainer>
		<CommentListItemHeader>
			<CommentName>{comment.name}</CommentName>
			<CommentEmail href={`mailto:${comment.email}`}>{comment.email}</CommentEmail>
		</CommentListItemHeader>
		{comment.body}
	</CommentListItemContainer>
);

export default React.memo(CommentListItem);
