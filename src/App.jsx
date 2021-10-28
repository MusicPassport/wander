import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { DataContext } from './Utility/Context';
import './App.css';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import About from './components/About/About';
// import Timeline from './components/Timeline/Timeline';
import EventDetail from './components/EventDetail/EventDetail';
import Events from './components/Events/Events';
import Create from './components/Create/Create';
import axios from 'axios';
import Login from './components/Authentication/Login/Login';
import SignUp from './components/Authentication/SignUp/SignUp';
import Calendar from './components/Calendar/Calendar';
import Dashboard from './components/Dashboard/Dashboard';
import BucketList from './components/BucketList/BucketList';
import EventSearch from './components/Events/EventSearch';
import EventSearchResults from './components/Events/EventSearchResults';
import ResetPassword from './components/Authentication/Reset/ResetPassword';
import ResetEmail from './components/Authentication/Reset/ResetEmail';
import Timeline from './components/Timeline/Timeline';
import Memories from './components/Memories/Memories';
import Seen from './components/Seen/Seen';
import Discover from './components/Discover/Discover';




const App = () => {
	// const [events,setEvents] = useState([{}]);
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser'))|| {});

	const [events, setEvents] = useState([]);

	const initialState={
		keyword:'',
		postalCode:'',
		venueId:'',
		city:'',
		stateCode:'',
		startDateTime:'',
		endDateTime:'',
		classificationName:'',
	}
	const [searchInputs, setSearchInputs] = useState(initialState);


	const url = `https://app.ticketmaster.com/discovery/v2/events.json?size=100&keyword=music&random=true&apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}`;


	useEffect(() => {
		axios.get(url).then((res) => setEvents([...res.data['_embedded'].events])).catch(err => console.log(err));
	}, []);

	const updateUser = async () => {
		const auth = localStorage.getItem('auth')
		 const config = {
				headers: {
					Authorization: `Token  ${auth}`,
				},
			};
		 // update user 
        let updatedUser = await axios.get(
					`https://intense-island-04626.herokuapp.com/users/${currentUser.id}/`, config
				);

        setCurrentUser({...updatedUser.data})
        console.log(updatedUser)
	}
	

	return (
		<div className='App'>
			<Nav />
			<main>

				<DataContext.Provider value={{ events, setEvents, currentUser, setCurrentUser, updateUser, searchInputs, setSearchInputs }}>

					<Route exact path='/' component={Home} />
					<Route exact path='/about' component={About} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={SignUp} />
					{/* <Route exact path='/timeline' component={Timeline}/> */}
					<Route exact path='/bucketlist/' component={BucketList} />
					<Route exact path='/events/:id' component={EventDetail} />
					<Route exact path='/events' component={Events} />
					<Route exact path='/create' component={Create} />
					<Route exact path='/calendar' component={Calendar} />

					<Route exact path='/search/' component={EventSearch} />
					<Route exact path='/search/events' component={EventSearchResults}/>


					<Route exact path='/dashboard' component={Dashboard}/>
					<Route path='/dashboard/reset-password' component={ResetPassword}/>
					<Route path='/dashboard/reset-email' component={ResetEmail}/>
					<Route path='/dashboard/timeline' component={Timeline}/>
					<Route path='/dashboard/memories' component={Memories}/>


					<Route exact path='/seen' component={Seen} />
					<Route exact path='/discover' component={Discover}/>

				</DataContext.Provider>
			</main>
		</div>
	);
};

export default App;
