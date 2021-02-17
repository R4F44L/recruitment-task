import React, { useCallback, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';

import { Spin } from 'antd';
import { useMutation } from '@apollo/client';
import { SmileOutlined } from '@ant-design/icons';

import { PostListItem as PostListItemInterface } from '../../interfaces/Post';
import { DeleteIconWrapper, RightArrowWrapper, SkeletonFlexContainer } from '../../shared/Styles';
import { DELETE_POST } from './Queries';
import OpenNotification from '../../shared/functions/OpenNotification';
import { DATA_SENT_CORRECTLY_MESSAGE, SUCCESS_MESSAGE } from '../../shared/Strings';
import { PostListItemContainer, PostListItemTitle } from './Styles';

interface PostListItemProps {
	post?: PostListItemInterface;
}

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
	const [loading, setLoading] = useState<boolean>(false);

	const history = useHistory();
	const { url } = useRouteMatch();

	const [deletePost] = useMutation<{}, { id: string | undefined }>(DELETE_POST, {
		variables: { id: post?.id },
	});
	const postRedirect = useCallback(() => {
		if (post?.id) {
			history.push(`${url}/${post?.id}/`);
		}
	}, [post, history, url]);

	const removePost = useCallback(async () => {
		setLoading(true);
		try {
			await deletePost();
			OpenNotification(
				SUCCESS_MESSAGE,
				DATA_SENT_CORRECTLY_MESSAGE,
				5,
				<SmileOutlined style={{ color: 'green' }} />
			);
		} catch {}
		setLoading(false);
	}, [deletePost, setLoading]);

	return (
		<>
			<Spin spinning={loading}>
				<PostListItemContainer>
					<PostListItemTitle>
						<DeleteIconWrapper>
							<RiDeleteBin6Line onClick={removePost} />
						</DeleteIconWrapper>
						<SkeletonFlexContainer>{post?.title || <Skeleton />}</SkeletonFlexContainer>
						<RightArrowWrapper>
							<AiOutlineRight onClick={postRedirect} />
						</RightArrowWrapper>
					</PostListItemTitle>
				</PostListItemContainer>
			</Spin>
		</>
	);
};

export default React.memo(PostListItem);
