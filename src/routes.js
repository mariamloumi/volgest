import Home from './pages/clienthome';
import FlightSearchForm from './pages/search';
import SignIn from './pages/signIn';
import BookingForm from './pages/reserv';

export const routes = [
{path:'/', component: Home },
{path:'/signup', component: SignIn },
{path:'/search' ,component: FlightSearchForm },
{path:"/Booking/:volId", component:BookingForm },
]