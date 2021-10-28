import { useState, useEffect, useContext } from 'react';
import { backendAPI } from '../../Utility/Config';
import { DataContext, DashContext } from '../../Utility/Context';
import axios from 'axios';
import { fireEvent } from '@testing-library/react';

const Memories = () => {
	const { minDate, maxDate, dateValue } = useContext(DashContext);
	const { currentUser } = useContext(DataContext);
	const [memories, setMemories] = useState([]);
	const [events, setEvents] = useState();
	const [addMem, setAddMem] = useState(false);
	const [userInput, setUserInput] = useState({
		title: null,
		body: null,
		photo: null,
		event: null,
	});

	useEffect(() => {
		if (currentUser.memories.length) setMemories(currentUser.memories);
		if (currentUser.attending.length) setEvents(currentUser.attending);
		console.log('events: ', events);
	}, []);

	const handleChange = (e) => {
		setUserInput((previousState) => {
			return { ...previousState, [e.target.name]: e.target.value };
		});
	};

	const fileChange = (e) => {
		setUserInput((previousState) => {
			return { ...previousState, [e.target.name]: e.target.files[0].name };
		});
	};

	const toggleMem = () => {
		setAddMem(!addMem);
	};

	const postData = async () => {
		const auth = localStorage.getItem('auth');
		const config = {
			headers: {
				Authorization: `Token  ${auth}`,
			},
		};
		// send to back end
        console.log(userInput)
		let res = await axios.post(
			`https://intense-island-04626.herokuapp.com/memories/`,
			{
				title: 'new memory',
				body: 'hello',
				photo: null,
				event: null,
			},
			config
		);

        console.log(res)
	};

	const handleSubmit = async (event) => {
		console.log('userInput: ', userInput);
		event.preventDefault();
		try {
			const data = new FormData();
			// const imageData = userInput.photo;
			console.log(localStorage.getItem('auth'));
            const auth = localStorage.getItem('auth');
            const config = {
							headers: {
								Authorization: `Token  ${auth}`,
							},
						};

			let res = await axios.post(
				`https://intense-island-04626.herokuapp.com/memories/`,
				userInput,
				config
			);

			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<h1>{memories.length ? 'Hello from memories' : 'No memories yet'}</h1>
			<button onClick={toggleMem}>Add a memory</button>
			{addMem && (
				<form onSubmit={handleSubmit}>
					<input type='text' name='title' onChange={handleChange} />
					<textarea name='body' rows='10' onChange={handleChange} />
					<select name='event' defaultValue={null} onChange={handleChange}>
						return (
						<>
							<option name={null} selected value={null}>
								Choose an event.
							</option>
							{events.map((event) => {
								if (!dateValue && !minDate) {
									return (
										<option name='event' value={event.id}>
											{event.name}
										</option>
									);
								} else if (
									!dateValue &&
									event.start > minDate &&
									event.start < maxDate
								) {
									return (
										<option name='event' value={event.id}>
											{event.name}
										</option>
									);
								} else {
									if (event.start === dateValue) {
										return (
											<option name='event' value={event.id}>
												{event.name}
											</option>
										);
									}
								}
							})}
						</>
						)
					</select>
					<input
						type='file'
						name='photo'
						accept='image/jpg, image/jpeg, image/png'
						placeholder='choose image'
						onChange={fileChange}
					/>
					<button type='submit'>Submit</button>
				</form>
			)}
			{memories &&
				memories.map((event) => {
					return (
						<>
							<h2>{event.title}</h2>
							<p>{event.body}</p>
							<image src={event.photo} />
						</>
					);
				})}
			<button onClick={postData}>PostData</button>
		</div>
	);
};

export default Memories;
