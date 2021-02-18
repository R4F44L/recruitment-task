import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { DeleteIcon, RightArrow, SkeletonFlexContainer } from '../../shared/Styles';
import { PostListItemContainer, PostListItemTitle } from './Styles';

const PostListItemSkeleton: React.FC = () => (
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

export default React.memo(PostListItemSkeleton);
