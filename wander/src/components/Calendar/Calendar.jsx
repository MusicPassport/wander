import React from 'react'
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import './Calendar.css'

const Calendar = () => {
    const dateValue = new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			10
		);
		const minDate = new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			6
		);
		const maxDate = new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			25
		);
    return (
			<div>
				<div>
					<h1>Calendar</h1>
					{/* <CalendarComponent value={} min={} max={maxDate}></CalendarComponent> */}
					<CalendarComponent
						value={dateValue}
						min={minDate}
						max={maxDate}
						isMultiSelection={true}></CalendarComponent>
				</div>
				<div>
					<h2>Display Events</h2>
				</div>
			</div>
		);
}

export default Calendar
