import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin, Clock, User, Phone, Mail, MapPinIcon, X } from 'lucide-react';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  useEffect(() => {
    if (currentUser) {
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const userBookings = savedBookings
        .filter(booking => booking.userId === currentUser.id)
        .map(booking => ({
          ...booking,
          user: currentUser
        }));
      setBookings(userBookings);
    }
  }, [currentUser?.id]);

  const handleCancelBooking = (bookingId) => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = savedBookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' }
        : booking
    );
    
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    setBookings(prevBookings => 
      prevBookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      )
    );
  };

  const activeBookings = bookings.filter(booking => booking.status !== 'cancelled');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
      
      {activeBookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No bookings found. Start by booking an event!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {activeBookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{booking.event.title}</h2>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                    title="Cancel Booking"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{format(new Date(`${booking.event.date}T${booking.event.time}`), 'PPp')}</span>
                </div>
                
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{booking.event.location}</span>
                </div>
                
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Booked on {format(new Date(booking.bookingDate), 'PP')}</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <span className="text-gray-600">Number of tickets:</span>
                  <span className="ml-2 font-medium">{booking.numberOfTickets}</span>
                  <span className="ml-4 text-gray-600">Total amount:</span>
                  <span className="ml-2 font-medium">${booking.numberOfTickets * booking.event.price}</span>
                </div>
                
                <button
                  onClick={() => setSelectedBooking(selectedBooking?.id === booking.id ? null : booking)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {selectedBooking?.id === booking.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>

              {selectedBooking?.id === booking.id && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <User className="h-5 w-5 mr-2" />
                      <span>Username: {booking.user.username}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-2" />
                      <span>Email: {booking.user.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-5 w-5 mr-2" />
                      <span>Phone: {booking.user.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      <span>State: {booking.user.state}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}