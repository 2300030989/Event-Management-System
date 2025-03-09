import React from 'react';
import { format } from 'date-fns';
import { MapPin, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const events = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2025',
    description: 'Join industry leaders for a day of cutting-edge technology discussions and networking opportunities.',
    date: '2025-04-15',
    time: '09:00',
    location: 'Bangalore International Convention Center',
    capacity: 500,
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
    organizerId: 'org1'
  },
  {
    id: '2',
    title: 'Classical Music Festival',
    description: 'Experience the magic of classical music with performances by renowned artists from around the world.',
    date: '2025-05-20',
    time: '18:30',
    location: 'Chennai Music Academy',
    capacity: 300,
    price: 199,
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80',
    organizerId: 'org2'
  },
  {
    id: '3',
    title: 'Food & Wine Festival',
    description: 'Indulge in culinary delights and premium wines from top chefs and sommeliers.',
    date: '2025-06-10',
    time: '12:00',
    location: 'Hyderabad Exhibition Center',
    capacity: 400,
    price: 149,
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80',
    organizerId: 'org3'
  },
  {
    id: '4',
    title: 'Startup Pitch Competition',
    description: 'Watch innovative startups pitch their ideas to top investors and win exciting prizes.',
    date: '2025-07-05',
    time: '10:00',
    location: 'Mumbai Startup Hub',
    capacity: 200,
    price: 99,
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80',
    organizerId: 'org4'
  },
  {
    id: '5',
    title: 'Wellness Retreat',
    description: 'A day of yoga, meditation, and holistic wellness workshops with expert practitioners.',
    date: '2025-08-15',
    time: '07:00',
    location: 'Kerala Ayurveda Center',
    capacity: 100,
    price: 179,
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80',
    organizerId: 'org5'
  },
  {
    id: '6',
    title: 'Fashion Week 2025',
    description: 'Witness the latest trends and designs from India\'s top fashion designers.',
    date: '2025-09-20',
    time: '16:00',
    location: 'Delhi Fashion Arena',
    capacity: 600,
    price: 399,
    imageUrl: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&q=80',
    organizerId: 'org6'
  },
  {
    id: '7',
    title: 'Gaming Championship',
    description: 'Compete in various esports tournaments and win amazing prizes.',
    date: '2025-10-10',
    time: '11:00',
    location: 'Pune Gaming Center',
    capacity: 250,
    price: 79,
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80',
    organizerId: 'org7'
  },
  {
    id: '8',
    title: 'Art & Culture Festival',
    description: 'Celebrate India\'s rich cultural heritage through art, dance, and music.',
    date: '2025-11-15',
    time: '14:00',
    location: 'Jaipur Heritage Center',
    capacity: 350,
    price: 129,
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80',
    organizerId: 'org8'
  },
  {
    id: '9',
    title: 'Business Leadership Summit',
    description: 'Learn from successful business leaders and network with industry professionals.',
    date: '2025-12-05',
    time: '09:30',
    location: 'Gurgaon Business Center',
    capacity: 450,
    price: 349,
    imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80',
    organizerId: 'org9'
  },
  {
    id: '10',
    title: 'Science & Innovation Expo',
    description: 'Explore groundbreaking scientific discoveries and innovative technologies.',
    date: '2026-01-20',
    time: '10:00',
    location: 'Kolkata Science Center',
    capacity: 300,
    price: 149,
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80',
    organizerId: 'org10'
  },
  {
    id: '11',
    title: 'Comedy Night Spectacular',
    description: 'Enjoy an evening of laughter with India\'s top stand-up comedians.',
    date: '2026-02-14',
    time: '20:00',
    location: 'Bangalore Comedy Club',
    capacity: 200,
    price: 99,
    imageUrl: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&q=80',
    organizerId: 'org11'
  },
  {
    id: '12',
    title: 'Photography Workshop',
    description: 'Master the art of photography with hands-on training from professional photographers.',
    date: '2026-03-10',
    time: '09:00',
    location: 'Chennai Creative Arts Center',
    capacity: 50,
    price: 199,
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80',
    organizerId: 'org12'
  }
];

function Events() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  
  // Get user's bookings to filter out booked events
  const userBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    .filter(booking => booking.userId === currentUser?.id && booking.status !== 'cancelled');
  
  // Filter out events that are already booked by the user
  const availableEvents = events.filter(event => 
    !userBookings.some(booking => booking.eventId === event.id)
  );

  const handleBooking = (event) => {
    const newBooking = {
      id: Math.random().toString(36).substr(2, 9),
      eventId: event.id,
      userId: currentUser.id,
      status: 'confirmed',
      bookingDate: new Date().toISOString().split('T')[0],
      numberOfTickets: 1,
      event: event
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));
    navigate('/bookings');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{format(new Date(`${event.date}T${event.time}`), 'PPp')}</span>
                </div>
                
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center text-gray-500">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{event.capacity} spots available</span>
                </div>
              </div>
              
              <div className="mt-6">
                <span className="text-2xl font-bold text-gray-900">${event.price}</span>
                <button 
                  onClick={() => handleBooking(event)}
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;