import { Link, Redirect } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { DataContext } from '../../Utility/Context.jsx';
import '../../css/EventSearch.css'



import Select from 'react-select'


const EventSearch = ({ isOpen , setIsOpen }) => {
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

    const stateOptions = [
    { id:'stateCode', label: 'ALABAMA', value: 'AL'},
    { id:'stateCode', label: 'AMERICAN SAMOA', value: 'AS'},
    { id:'stateCode', label: 'ALASKA', value: 'AK'},
    { id:'stateCode', label: 'ARIZONA', value: 'AZ'},
    { id:'stateCode', label: 'ARKANSAS', value: 'AR'},
    { id:'stateCode', label: 'CALIFORNIA', value: 'CA'},
    { id:'stateCode', label: 'COLORADO', value: 'CO'},
    { id:'stateCode', label: 'CONNECTICUT', value: 'CT'},
    { id:'stateCode', label: 'DELAWARE', value: 'DE'},
    { id:'stateCode', label: 'DISTRICT OF COLUMBIA', value: 'DC'},
    { id:'stateCode', label: 'FLORIDA', value: 'FL'},
    { id:'stateCode', label: 'GEORGIA', value: 'GA'},
    { id:'stateCode', label: 'GUAM', value: 'GU'},
    { id:'stateCode', label: 'HAWAII', value: 'HI'},
    { id:'stateCode', label: 'IDAHO', value: 'ID'},
    { id:'stateCode', label: 'ILLINOIS', value: 'IL'},
    { id:'stateCode', label: 'INDIANA', value: 'IN'},
    { id:'stateCode', label: 'IOWA', value: 'IA'},
    { id:'stateCode', label: 'KANSAS', value: 'KS'},
    { id:'stateCode', label: 'KENTUCKY', value: 'KY'},
    { id:'stateCode', label: 'LOUISIANA', value: 'LA'},
    { id:'stateCode', label: 'MAINE', value: 'ME'},
    { id:'stateCode', label: 'MARSHALL ISLANDS', value: 'MH'},
    { id:'stateCode', label: 'MARYLAND', value: 'MD'},
    { id:'stateCode', label: 'MASSACHUSETTS', value: 'MA'},
    { id:'stateCode', label: 'MICHIGAN', value: 'MI'},
    { id:'stateCode', label: 'MINNESOTA', value: 'MN'},
    { id:'stateCode', label: 'MISSISSIPPI', value: 'MS'},
    { id:'stateCode', label: 'MISSOURI', value: 'MO'},
    { id:'stateCode', label: 'MONTANA', value: 'MT'},
    { id:'stateCode', label: 'NEBRASKA', value: 'NE'},
    { id:'stateCode', label: 'NEVADA', value: 'NV'},
    { id:'stateCode', label: 'NEW HAMPSHIRE', value: 'NH'},
    { id:'stateCode', label: 'NEW JERSEY', value: 'NJ'},
    { id:'stateCode', label: 'NEW MEXICO', value: 'NM'},
    { id:'stateCode', label: 'NEW YORK', value: 'NY'},
    { id:'stateCode', label: 'NORTH CAROLINA', value: 'NC'},
    { id:'stateCode', label: 'NORTH DAKOTA', value: 'ND'},
    { id:'stateCode', label: 'NORTHERN MARIANA ISLANDS', value: 'MP'},
    { id:'stateCode', label: 'OHIO', value: 'OH'},
    { id:'stateCode', label: 'OKLAHOMA', value: 'OK'},
    { id:'stateCode', label: 'OREGON', value: 'OR'},
    { id:'stateCode', label: 'PALAU', value: 'PW'},
    { id:'stateCode', label: 'PENNSYLVANIA', value: 'PA'},
    { id:'stateCode', label: 'PUERTO RICO', value: 'PR'},
    { id:'stateCode', label: 'RHODE ISLAND', value: 'RI'},
    { id:'stateCode', label: 'SOUTH CAROLINA', value: 'SC'},
    { id:'stateCode', label: 'SOUTH DAKOTA', value: 'SD'},
    { id:'stateCode', label: 'TENNESSEE', value: 'TN'},
    { id:'stateCode', label: 'TEXAS', value: 'TX'},
    { id:'stateCode', label: 'UTAH', value: 'UT'},
    { id:'stateCode', label: 'VERMONT', value: 'VT'},
    { id:'stateCode', label: 'VIRGIN ISLANDS', value: 'VI'},
    { id:'stateCode', label: 'VIRGINIA', value: 'VA'},
    { id:'stateCode', label: 'WASHINGTON', value: 'WA'},
    { id:'stateCode', label: 'WEST VIRGINIA', value: 'WV'},
    { id:'stateCode', label: 'WISCONSIN', value: 'WI'},
    { id:'stateCode', label: 'WYOMING', value: 'WY' }
    ];

    const { searchInputs, setSearchInputs } = useContext(DataContext);
    

        function handleChange(event) {
            console.log(event)
            if(event.target){

                setSearchInputs({ ...searchInputs, [event.target.id]: event.target.value });
            } else{
                setSearchInputs({ ...searchInputs, [event.id]: event.value})

            }


    }
    console.log(isOpen)

    function handleSubmit(event) {
        event.preventDefault();
         setIsOpen(!isOpen);
        
    }

    useEffect ( ()=>{
        setSearchInputs(initialState);
        //eslint-disable-next-line
    },[]
    )
    return (
<div className="advancedSearch" >  
            <h2 className="formTitle">What would you like to find?</h2>  
            <form  className="searchFields" onSubmit={handleSubmit}>
                <div className="keyword">
                <label className="searchLabel" htmlFor="label">Keyword</label>
                    <input className="row1col2 formInput"id="keyword" type='text' 
                        placeholder="event name, type of event, etc."
                        onChange={handleChange} 
                        value={searchInputs.keyword}/>
                </div>
                <div className="startDate">
                <label className="searchLabel">Start Date</label>
                    <input className="row2col2 formInput" id="startDateTime" 
                        type='date' 
                        placeholder="Start Date"
                        onChange={handleChange} 
                        value={searchInputs.startDateTime}/>
                </div>
                <div className="endDate">
                <label className="searchLabel">End Date</label>
                    <input className="row3col2 formInput" id="endDateTime" 
                        type='date'
                        placeholder="End Date " 
                        onChange={handleChange} 
                        value={searchInputs.endDateTime }/>
                </div>
                <div className="city">
                <label className="searchLabel">City</label>
                    <input className="row4col2 formInput" id="city" 
                        placeholder="city"
                        type='text' 
                        onChange={handleChange} 
                        value={searchInputs.city }/>
                </div>
                <div className="state">
                <label className="searchLabel">State</label>
                    <Select id="stateCode" 
                        className="row5col2 formInput" 
                        onChange={handleChange} 
                        options={stateOptions} 
                        default=""
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 10,
                            colors: {
                                ...theme.colors,
                                primary25: 'hotpink',
                                primary: 'black',
                                neutral0: 'rgb(46, 41, 43)',

                            }})}
                        />
                </div>
            </form>
            <Link to="/events">
                <button className="searchButton" type="submit" onClick={handleSubmit}>Search</button>
            </Link>
        </div>  
    );
};

export default EventSearch;