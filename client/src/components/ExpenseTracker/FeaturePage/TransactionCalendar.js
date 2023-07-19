import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TransactionCalendar.css';
import TransactionDetails from './TransactionDetails';

const localizer = momentLocalizer(moment);

const TransactionCalendar = ({ transactions }) => {
  const events = transactions.map((transaction) => ({
    ...transaction,
    start: moment(transaction.date).startOf('day').toDate(),
    end: moment(transaction.date).endOf('day').toDate(),
  }));

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
        views={{
          month: true,
        }}
        onSelectEvent={handleEventClick} // Handle event click to show modal
      />
      {selectedEvent && (
        <TransactionDetails
          isOpen={true}
          onClose={handleCloseModal}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default TransactionCalendar;
