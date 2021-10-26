import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { AppContext } from './Utility/Context';
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
import SignUp from './components/Authentication/Sign Up/SignUp';
import Calendar from './components/Calendar/Calendar';

const App = () => {
	// const [events,setEvents] = useState([{}]);
	const [currentUser, setCurrentUser] = useState({
		name: 'Group 4',
		events: [],
	});

	const [events, setEvents] = useState([]);

	const url = `https://app.ticketmaster.com/discovery/v2/events.json?size=100&keyword=music&apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}`;

	useEffect(() => {
		axios.get(url).then((res) => setEvents([...res.data['_embedded'].events])).catch(err => console.log(err));
	}, []);
	

	return (
		<div className='App'>
			<Nav />
			<main>
				<DataContext.Provider value={{ events, setEvents }}>
					<Route exact path='/' component={Home} />
					<Route exact path='/about' component={About} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={SignUp} />
					{/* <Route exact path='/timeline' component={Timeline}/> */}
					<Route exact path='/events/:id' component={EventDetail} />
					<Route exact path='/events' component={Events} />
					<Route exact path='/create' component={Create} />
					<Route exact path='/calendar' component={Calendar}/>
				</DataContext.Provider>
			</main>
		</div>
	);
};

export default App;
