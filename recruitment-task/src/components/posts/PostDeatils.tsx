import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { PostDetails as PostDeatilsInterface } from '../../interfaces/Post';
import { BackArrow } from '../../shared/BackArrow';
import { GET_POST_BY_ID } from './Queries';

export const PostDetails: React.FC = () => {
	const { id, postId } = useParams<{ id: string; postId: string }>();
	const { data, loading, error } = useQuery<PostDeatilsInterface>(GET_POST_BY_ID, {
		variables: { postId },
	});
	return (
		<>
			<BackArrow url={`/user/${id}`} />
		</>
	);
};
