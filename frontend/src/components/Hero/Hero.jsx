import React from 'react'
import './Hero.css';
import men_suit from '../Assets/General-images/Black-suit-men.png';

export const Hero = () => {
    return (
        <div class="hero">
            <div class="hero-text">
                <h3>فقط جدیدترین‌ها</h3>
                <h1>مجموعه‌های جدید <br/>برای همه</h1>
                <button class="btn">مشاهده جدیدترین مجموعه</button>
            </div>
            <div class="hero-image">
                <img src={men_suit} alt="Hero Image"/>
            </div>
        </div>
    )
}

export default Hero; 