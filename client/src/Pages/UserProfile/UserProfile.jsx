import React, { useState, Component } from 'react'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import './UsersProfile.css'
import axios from 'axios'
import UseGeoLocation from './UseGeoLocation'



const UserProfile = () => {

    const { id } = useParams()
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)
    const [Switch, setSwitch] = useState(false)


    // const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather?";
    // const API_KEY = "30707663a4a87a3b60f7e03fa4e54f6e"

    const [latitude, setLatitude] = React.useState(``);
    const [longitude, setLongitude] = React.useState(``);
    const [responseData, setResponseData] = React.useState({})


    // React.useEffect(() => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         // setLatitude(position.coords.latitude);
    //         // setLongitude(position.coords.longitude)
    //         console.log("Latitude is :", position);
    //         console.log("Longitude is :", position.coords.longitude);

    //     })
    //     let finalAPIEndpoint = `${API_ENDPOINT}lat=${latitude}&lon=${longitude}&appis=${API_KEY}`
       
    //     axios.get(finalAPIEndpoint)
    //         .then((response) => {
    //             setResponseData(response.data)
    //             console.log(response.name)
    //         })

    // }, [])

 const location = UseGeoLocation();





    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className='user-details'>
                            <Avatar backgroundColor="purple" color='white' fontSize='50px' px='40px' py='30px'>
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                                {/* <p>{responseData.data}</p> */}
                                <div className="inline-block mr-auto pt-1">
                                {location.loaded
                                    ? JSON.stringify(location)
                                    : "Location data not available yet."}
                            </div>

                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            )
                        }

                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
                            ) : (
                                <ProfileBio currentProfile={currentProfile} />
                            )
                        }
                    </>

                </section>
            </div>
        </div>
    )
}

export default UserProfile
