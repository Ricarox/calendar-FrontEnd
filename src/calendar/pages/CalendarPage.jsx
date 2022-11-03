import { useState, useEffect } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { localizer } from '../../helpers';
import { getMessagesES } from '../../helpers/getMesagges';

import { NavBar, CalendarEvent, CalendarModal, FabAddnew, FabDelete } from '../';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';



export const CalendarPage = () => {

  const { user } = useAuthStore()

  const {  events, setActiveEvent, startLoadingEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent ? event.bgColor : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);

  }


  useEffect(() => {
    
    startLoadingEvent();
    
  }, []);
  
  







  return (
    <>
      <NavBar />
   

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />


      <CalendarModal />
      <FabAddnew />
      <FabDelete />


    </>
  )
}
