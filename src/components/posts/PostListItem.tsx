import React, { useCallback, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { PostListItem as PostListItemInterface } from '../../interfaces/Post';
import { AiOutlineRight } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
import { SkeletonFlexContainer } from '../../shared/StyledComponents';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from './Queries';
import { Spin } from 'antd';
import OpenNotification from '../../shared/functions/OpenNotification';
import { SmileOutlined } from '@ant-design/icons';
import { DATA_SENT_CORRECTLY_MESSAGE, SUCCESS_MESSAGE } from '../../shared/Strings';
interface PostListItemProps {
	post?: PostListItemInterface;
}
const DeleteIconWrapper = styled.div`
	margin-right: 10px;
	vertical-align: middle;
	display: inline-block;
	margin-top: 3px;
`;
const RightArrowWrapper = styled.div`
	margin-left: auto;
	vertical-align: middle;
	margin-top: 3px;
	display: inline-block;
`;
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
				<Container>
					<Title>
						<DeleteIconWrapper>
							<RiDeleteBin6Line onClick={removePost} />
						</DeleteIconWrapper>
						<SkeletonFlexContainer>{post?.title || <Skeleton />}</SkeletonFlexContainer>
						<RightArrowWrapper>
							<AiOutlineRight onClick={postRedirect} />
						</RightArrowWrapper>
					</Title>
				</Container>
			</Spin>
		</>
	);
};

export default React.memo(PostListItem);
