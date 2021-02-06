import { useParams } from 'react-router-dom';

export const UserDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	console.log(id);
	return <> </>;
};
