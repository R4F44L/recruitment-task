import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';

import { DeleteIconWrapper, RightArrowWrapper, SkeletonFlexContainer } from '../../shared/Styles';
import { PostListItemContainer, PostListItemTitle } from './Styles';

const PostListItem: React.FC = () => {
	return (
		<PostListItemContainer>
			<PostListItemTitle>
				<DeleteIconWrapper>
					<RiDeleteBin6Line />
				</DeleteIconWrapper>
				<SkeletonFlexContainer>
					<Skeleton />
				</SkeletonFlexContainer>
				<RightArrowWrapper>
					<AiOutlineRight />
				</RightArrowWrapper>
			</PostListItemTitle>
		</PostListItemContainer>
	);
};

export default React.memo(PostListItem);
