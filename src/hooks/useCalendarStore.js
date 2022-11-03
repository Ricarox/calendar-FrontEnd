import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertEventstoDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from '../store';


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {


        try {

            //Actualizar
            if (calendarEvent.id) {

                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)

                dispatch(onUpdateEvent({ ...calendarEvent, user }));

                return


            }

            //Crear
            const { data } = await calendarApi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))



        } catch (error) {
            console.log(error);
            Swal.fire('Error', error.response.data.msg, 'error');
        }
    }

    const startDeletingEvent = async () => {

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)

            dispatch(onDeleteEvent());
        } catch (error) {

            console.log(error);
            Swal.fire('Error', error.response.data.msg, 'error');


        }

    }

    const startLoadingEvent = async () => {

        try {
                
                const { data } = await calendarApi.get('/events');
                const events = convertEventstoDateEvents(data.events);
                dispatch(onLoadEvents(events));



        } catch (error) {
            console.log(error);
            console.log('loading Error');
        }

    }



    return {
        //Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,


        //Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvent,
   
       

    }

}