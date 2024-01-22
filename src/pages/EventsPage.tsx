import React, { useEffect } from "react";
import EventCard from "../components/Events/EventCard.tsx";
import Header from "../components/Layout/Header.tsx";
import Footer from "../components/Layout/Footer.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../redux/actions/event.tsx";

const EventsPage = () => {
    const { allEvents, isLoading } = useSelector((state: any) => state.events)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllEvents())
    }, [])

    return (
        <>
            <div>
                <Header activeHeading={"4"} />
                <EventCard active={true} data={allEvents && allEvents[0]} />
                <Footer/>
            </div>
        </>
    )
}

export default EventsPage