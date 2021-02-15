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
import OpenNotification from '../../shared/Functions';
import { SmileOutlined } from '@ant-design/icons';
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

let PostListItem: React.FC<PostListItemProps> = ({ post }) => {
	const history = useHistory();
	const { url } = useRouteMatch();
	const [deletePost] = useMutation<{}, { id: string | undefined }>(DELETE_POST, {
		variables: { id: post?.id },
	});
	const [loading, setLoading] = useState<boolean>(false);
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
				'Succes',
				'Data sent correctly',
				5,
				<SmileOutlined style={{ color: 'green' }} />
			);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	}, [deletePost, setLoading]);
	return (
		<>
			<Spin spinning={loading}>
				<Container>
					<Title>
						<RiDeleteBin6Line
							style={{
								marginRight: '10px',
								verticalAlign: 'middle',
								display: 'inline-block',
								marginTop: '3px',
							}}
							onClick={removePost}
						/>
						<SkeletonFlexContainer>{post?.title || <Skeleton />}</SkeletonFlexContainer>
						<AiOutlineRight
							onClick={postRedirect}
							style={{
								marginLeft: 'auto',
								verticalAlign: 'middle',
								marginTop: '3px',
								display: 'inline-block',
							}}
						/>
					</Title>
				</Container>
			</Spin>
		</>
	);
};
export default PostListItem = React.memo(PostListItem);
