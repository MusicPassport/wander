import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {DataContext} from '../../Utility/Context';
import {DashContext} from '../../Utility/Context'

const Timeline = ( { dateRange } ) => {
    
    const {currentUser} = useContext(DataContext);
    const [timeline, setTimeline] = useState([]);
    
    const formatDate=  (date) => {
        let myEvent = date.split("-");
        let myYear = parseInt(myEvent[0]);
        let myMonth = parseInt(myEvent[1]);
        let myDay = parseInt(myEvent[2]);
        return {year: myYear, month: myMonth, day: myDay};
    }
    const checkStartDate = (date) => {
        //      2022      >         2021
         if (date.year > dateRange.start.year) return true;
        //      2022   ===          2022            02       >          01
        if (date.year === dateRange.start.year && date.month > dateRange.start.month) return true;

        //       2022               2022
        if (date.year === dateRange.start.year && 
            //      02                  02
            date.month === dateRange.start.month && 
            //  14              13
            date.day >= dateRange.start.day) return true;
        return false;
    }

    const checkEndDate = (date) => {
         if (date.year < dateRange.end.year) return true;
        if (date.year === dateRange.end.year && date.month < dateRange.end.month) return true;
        
        if (date.year === dateRange.end.year && 
            date.month === dateRange.end.month && 
            date.day <= dateRange.end.day) return true;
        return false;
    }

    const checkDate = (date) => {
        //if there's no dateRange, return true.
        if(!dateRange) return true;
       if(checkStartDate(date) && checkEndDate(date)) return true;
       // Returns false IF the event doesn't pass the start Date or End Date tests.
       return false;
    }

    const addDateProperty = async(array) => {
                return await array.map( (item) => {
                    item.date = formatDate(item.start);
                    return item;
                });
    }

    const filterArrays = async(array) => {
       return await array.filter((event) => checkDate(event.date))
    }

    
    useEffect( () => {
        console.log('date range: ',dateRange)
        const getMashup= async ()=>{
            //revisit the sorting logic. Strings aren't integers!
            const array = (currentUser.attending.concat(currentUser.viewing)).sort((a, b) => b.start- a.start);
            console.log('array', array);
    
            const nextArray = await addDateProperty(array);
            const lastArray = await filterArrays(nextArray);
            console.log('last Array: ', lastArray);
            setTimeline(lastArray);
        }
        getMashup();
        console.log('timeline: ',timeline);
    }, []);


return (
    <div>
         <h1>{timeline.length ? 'Hello from Timeline' : 'No timeline yet'}</h1>
        {timeline.length ?  (timeline.map( event => {
            return  (
                <Link className='event-link' key={event.id} to={`/events/${event.id}`}>
                <h2>{event.name}</h2>
                <img src={event.img_url} style={{width: '100%'}} alt="alt" />
                <p>{event.start}</p>
                </Link>
            )})) : (
                <h1>No Events yet!</h1>
            )
        }
            
        </div>
    );
}

export default Timeline
