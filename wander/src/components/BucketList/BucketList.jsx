import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BucketList = () => {
	// get the events in the users bucketlist
	// load the current user
	// load events in bucketlist
	const { userId } = useParams();
	const [currentUser, setCurrentUser] = useState();

    
    // will save the currentUser app and save as currentUser, pass down as currentUser in dataContext

	const getUser = async () => {
		const user = await axios.get(
			`https://intense-island-04626.herokuapp.com/${userId}`
		);

		setCurrentUser({ ...user.data[0] });
	};

	useEffect(() => {
		getUser();

	});

	return (
		<div>
			<h1>Hello, {currentUser.name}</h1>
            <div>BucketList</div>
            <ul>
            {currentUser.viewing.map(event => <li>{event}</li>
            )}
            </ul>
		</div>
	);
};

export default BucketList;
