import React from "react";
import EventCard from "../components/Events/EventCard.tsx";
import Header from "../components/Layout/Header.tsx";
import Footer from "../components/Layout/Footer.tsx";

const EventsPage = () => {
    return (
        <>
            <div>
                <Header activeHeading={"4"} />
                <EventCard active={true} />
                <Footer/>
            </div>
        </>
    )
}

export default EventsPage