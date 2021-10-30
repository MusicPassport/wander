import {useState} from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
// import '../../css/Calendar.css';
import 'react-date-range/dist/theme/default.css'; // theme css file

const AltCalendar = ({dateRange, setDateRange}) => { 

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
    console.log(dateRange);

  }
    return (
      <>
     <DateRange
                scroll={{enabled: true}}
                ranges={[selection]}
                onChange={handleSelect}
            />
            </>
    )
};

export default AltCalendar;