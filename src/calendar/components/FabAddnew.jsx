import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddnew = () => {

    const { setActiveEvent } = useCalendarStore();
    const { openDateModal } = useUiStore();


    const handleClickNew = () => {
        setActiveEvent ({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#347CF7', //fafafa
            user: {
                _id: '123',
                name: 'Fernando'
            }
        });
        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
