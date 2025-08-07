import React from 'react'
import Hero from '../components/Hero/Hero';
import Popular from '../components/Popular/Popular';
import Offers from '../components/Offers/Offers';
import NewCollection from '../components/Newcollection/Newcollection';
import Newsletter from '../components/Newsletter/Newsletter';
import Footer from '../components/footer/footer';

export const Shop = () => {
    return (
        <div>

            <Hero/>
            <Popular/>
            <Offers />
            <NewCollection/>
            <Newsletter/>
            <Footer/>
        </div>

    )
}

export default Shop;

