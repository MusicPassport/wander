import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Utility/Context';
import axios from 'axios';

const Discover = () => {
    // get events in the area 
    const [sports, setSports] = useState()

    useEffect(() => {
        getSports()
        // setDiscover([...res.data])
        suggest()  

    }, [])

    const suggest = async () => {
			let res = await axios.get(
				`https://app.ticketmaster.com/discovery/v2/suggest?apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}`
			);
			console.log(res.data['_embedded'].attractions);
		}

    const getSports = async () => {
        let res =await  axios.get(
					`https://app.ticketmaster.com/discovery/v2/events.json?&random=true&apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}`
				);
		console.log(res.data['_embedded'].events);
    }

    const getMusic = async () => {
         let res = await axios.get(
						`https://app.ticketmaster.com/discovery/v2/events.json?&segmentName=music&apikey=RW9cwwI0fopdanO8UIpgzYPYq0GlSavB`
					);

                    //app.ticketmaster.com/discovery/v2/events.json?&segmentName=miscellaneous&apikey=RW9cwwI0fopdanO8UIpgzYPYq0GlSavB

										https: console.log(res);
        
    }

    const getMisc = async () => {
			let res = await axios.get(
				`https://app.ticketmaster.com/discovery/v2/events.json?&segmentName=miscellaneous&apikey=RW9cwwI0fopdanO8UIpgzYPYq0GlSavB`
			);

		};

    const getFilm = async () => {
			let res = await axios.get(
				`https://app.ticketmaster.com/discovery/v2/events.json?&segmentName=film&apikey=RW9cwwI0fopdanO8UIpgzYPYq0GlSavB`
			);

			console.log(res);
		};

    
    return (
        <div>
            <h1>Discover</h1>
  <div>
    <p id="location">location there</p>
    <div id="map"></div>
    <div id="events"></div>
    <script src="script.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js" async defer></script>

  </div>
            
        </div>
    );
};

export default Discover;
