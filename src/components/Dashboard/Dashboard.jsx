import {useState, useEffect, useContext} from 'react';
import { Route, Link } from 'react-router-dom';
// import {DashContext} from '../../Utility/Context';


import '../../css/Dashboard.css';
import DashNav from './DashNav';

import { DateRange } from 'react-date-range'; // new Date Range component. Also run: npm i date-fns
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Timeline from '../Timeline/Timeline';

const Dashboard = ( { dateRange, setDateRange }) => {
    const [displaySettings, setDisplaySettings] = useState(window.screen.width > 600 ? 'flex' : 'none');
    // const [dateRange,setDateRange] = useState();
    // const [currentMemory, setCurrentMemory] = useState({
    //     title: '',
    //     body: '',
    //     photo: '',
    //     owner: '',
    //     event: ''
    // });
    const [selection, setSelection] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })


    const formatDate = (date) => {
        let thisDate = date;
		let day = parseInt(thisDate[2]);
		let month = thisDate[1];
        let year = parseInt(thisDate[3]);
        console.log(day);
		let months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		]
		let monthNum = months.indexOf(month) +1;
        return {year: year, month: monthNum, day: day};
    }

    const setDates = async (data) => {
		 let startVal = await data.startDate.toString().split(' ');
         let endVal = await data.endDate.toString().split(' ');

         startVal = formatDate(startVal);
         endVal = formatDate(endVal);
        setDateRange(previousState => {
            return {...previousState, start: startVal, end: endVal}
        });
    }

  const handleSelect = async (ranges) => {
    setSelection(ranges['selection']);
    setDates(ranges['selection']);
    // console.log(dateRange);
  }

const handleCal = () => {
    if(displaySettings === 'none') setDisplaySettings('flex');
    else setDisplaySettings('none');
    console.log(displaySettings);
}


    return (
        <>
        <div className="dashboard">
        <section className="dashboard-buttons">
               <DashNav />
            </section>
            <button id="cal-btn" onClick={ handleCal}></button>
            {displaySettings === 'flex' ? (
            <section className='calendar'>
               <DateRange
                scroll={{enabled: false}}
                showDateDispay={false}
                ranges={[selection]}
                onChange={handleSelect}
                />
            </section>
            ) : ( null) }            
            <Timeline className="timeline" dateRange={dateRange} />
            {/* <Route exact path='/dashboard/settings' component={ResetPassword}/>
            <Route exact path='/dashboard/bucketlist' component={BucketList}/>
            <Route exact path='/dashboard/timeline' render={() => <Timeline dateRange={dateRange}/> } />
            <Route exact path='/dashboard/memories' render={() => <Memories setCurrentMemory={setCurrentMemory} /> } />
            <Route exact path='/dashboard/memories/:id' render={() => <MemoryDetail currentMemory={currentMemory} /> } /> */}

        </div>
        </>
           
    )
};

export default Dashboard;