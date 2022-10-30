import React from 'react'
import './FooterStyles.css'
import { FaFacebook, FaLinkedin, FaMailBulk, FaPhone, FaSearchLocation, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-container'>
                <div className='left'>
                    <div className='location'>
                        <FaSearchLocation size={20} style={{ color: '#ffffff', marginRight: '2rem' }} />
                        <div>
                            <p>地址</p>
                            <h4>上海市尊觉大楼</h4>
                        </div>
                    </div>
                    <div className='phone'>
                        <h4><FaPhone size={20} style={{ color: '#ffffff', marginRight: '2rem' }} />1111111111111</h4>
                    </div>
                    <div className='email'>
                        <h4><FaMailBulk size={20} style={{ color: '#ffffff', marginRight: '2rem' }} /> zunjue.com</h4>
                    </div>
                </div>
                <div className='right'>
                    <h4>关于该公司</h4>
                    <p>"本公司是投资公司，本公司是投资公司，本公司是投资公司，本公司是投资公司"</p>
                </div>

            </div>
        </div>
    )
}

export default Footer
