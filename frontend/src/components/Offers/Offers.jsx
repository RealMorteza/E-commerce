import React from 'react'
import './Offers.css'
import Offers_img from '../Assets/General-images/Offers-img(1).jpg'


export const Offers = () => {
    return (
        <div>
            <section class="offer-section">
                <div class="offer-text">
                    <h1> فقط <br /> برای تو </h1>
                    <p>خاص ترین ها در مجموعه ما </p>
                    <button>مشاهده بیشتر </button>
                </div>
                <div class="offer-image">
                    <img src={Offers_img} alt="Offer" />
                </div>
            </section>

        </div>
    )
}
export default Offers