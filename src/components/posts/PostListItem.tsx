import React, { useCallback, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Spin } from 'antd';
import { useMutation } from '@apollo/client';

import { PostListItem as PostListItemInterface } from '../../interfaces/Post';
import {
	DeleteIconWrapper,
	GreenSmile,
	RightArrowWrapper,
	SkeletonFlexContainer,
} from '../../shared/Styles';
import { DELETE_POST } from './Queries';
import OpenNotification from '../../shared/functions/OpenNotification';
import { DATA_SENT_CORRECTLY_MESSAGE, SUCCESS_MESSAGE } from '../../shared/Strings';
import { PostListItemContainer, PostListItemTitle } from './Styles';
import { IdParam } from '../../interfaces/RouteParams';
import { POST_DETAILS_PATH } from '../../shared/Constants';

interface PostListItemProps {
	post: PostListItemInterface;
}

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
	const [loading, setLoading] = useState<boolean>(false);

	const history = useHistory();
	const { id } = useParams<IdParam>();

	const [deletePost] = useMutation<{}, { id: string | undefined }>(DELETE_POST, {
		variables: { id: post?.id },
	});
	const postRedirect = useCallback(() => {
		history.push(generatePath(POST_DETAILS_PATH, { id: id, postId: post.id }));
	}, [post, history, id]);

	const removePost = useCallback(async () => {
		setLoading(true);
		try {
			await deletePost();
			OpenNotification(SUCCESS_MESSAGE, DATA_SENT_CORRECTLY_MESSAGE, 5, <GreenSmile />);
		} catch {}
		setLoading(false);
	}, [deletePost, setLoading]);

	return (
		<Spin spinning={loading}>
			<PostListItemContainer>
				<PostListItemTitle>
					<DeleteIconWrapper onClick={removePost}>
						<RiDeleteBin6Line />
					</DeleteIconWrapper>
					<SkeletonFlexContainer>{post.title}</SkeletonFlexContainer>
					<RightArrowWrapper onClick={postRedirect}>
						<AiOutlineRight />
					</RightArrowWrapper>
				</PostListItemTitle>
			</PostListItemContainer>
		</Spin>
	);
};

export default React.memo(PostListItem);
