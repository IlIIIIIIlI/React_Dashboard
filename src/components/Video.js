import React from 'react'
import { Link } from 'react-router-dom'
import './VideoStyles.css'

import spaceVideo from '../assets/space.mp4'

const Video = () => {
    return (
        <div className='hero'>
            <video autoPlay loop muted id='video'>
                <source src={spaceVideo} type='video/mp4' />
            </video>
            <div className='content'>
                <h1>The Mystery of House Market</h1>
                <p>Tracking the house info.</p>
                <div>
                    <Link to='/HousingDashboard' className='btn'>House Info</Link>
                    <Link to='/TimeSeries' className='btn btn-light'>TimeSeries Info</Link>
                </div>
            </div>
        </div>
    )
}

export default Video
