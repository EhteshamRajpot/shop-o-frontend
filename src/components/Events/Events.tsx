import React from 'react';
import styles from '../../styles/styles';
import { productData } from '../../static/data';
import EventCard from "./EventCard.tsx";

const Events = () => {
    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Popular Events</h1>
                </div>
                <div className="w-full grid">
                   <EventCard/>
                </div>
            </div>
        </div>
    )
}

export default Events