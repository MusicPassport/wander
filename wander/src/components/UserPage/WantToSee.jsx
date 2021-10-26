import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function WantToSee(props) {
    const { userId } = useParams();
		const [currentUser, setCurrentUser] = useState();

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
				{currentUser.attendees.map((event) => (
					<li>{event}</li>
				))}
			</ul>
		</div>
	);
}

export default WantToSee;
