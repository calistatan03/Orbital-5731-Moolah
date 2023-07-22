import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TransactionCalendar.css';
import TransactionDetails from './TransactionDetails';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useQuery, useQueryClient } from "@tanstack/react-query";

const localizer = momentLocalizer(moment);

const TransactionCalendar = ({ transactions, onDeleteTransaction }) => {
  const {user} = useAuthContext(); 

  const { data: transactionData, isLoading, isError } = useQuery(["transactions"], () => { 
    const url2 = 'http://localhost:8080/api/add-transaction';
    const url = 'https://orbital-5731-moolah.onrender.com/api/add-transaction';
    return axios.get(url, { 
    headers: { 
      'Authorization': `Bearer ${user.token}`
    }
  }).then(res => res.data);
  }, { 
    refetchInterval: 1000, 
    refetchIntervalInBackground: true, 
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    placeholderData: [],  })

  const events = transactionData.map((transaction) => ({
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

  const handleDeleteTransaction = async (id) => {
    try {
      const url2 = `http://localhost:8080/api/add-transaction/${id}`
      const url = `https://orbital-5731-moolah.onrender.com/api/add-transaction/${id}`
      await axios.delete(url, { 
        headers: { 
          'Authorization': `Bearer ${user.token}`
        }
      });
    toast.success('Expense deleted successfully!');
    onDeleteTransaction(id);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className='container'>
      <h2 className='cal-desc'>CALENDAR</h2>
      <h3 className='desc2'>View all your monthly transactions at a glance!</h3>
    </div>
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
          onDelete={handleDeleteTransaction}
        />
      )}
    </div>
  );
};

export default TransactionCalendar;
