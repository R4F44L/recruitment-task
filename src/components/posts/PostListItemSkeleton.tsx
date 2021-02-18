import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { DeleteIcon, RightArrow, SkeletonFlexContainer } from '../../shared/Styles';
import { PostListItemContainer, PostListItemTitle } from './Styles';

const PostListItem: React.FC = () => {
	return (
		<PostListItemContainer>
			<PostListItemTitle>
				<DeleteIcon />
				<SkeletonFlexContainer>
					<Skeleton />
				</SkeletonFlexContainer>
				<RightArrow />
			</PostListItemTitle>
		</PostListItemContainer>
	);
};

export default React.memo(PostListItem);
