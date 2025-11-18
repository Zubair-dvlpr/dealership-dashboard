import {
  Home,
  FileCheck,
  Gift,
  ChevronLeft,
  Activity,
  BookCheck,
  MapPinCheck,
  UserStar
} from 'lucide-react';
import { Login } from '../panel/Authentication/Login';
import { License } from '../panel/License';
import { Offers } from '../panel/Offers';
import { Dashboard } from '../panel/Dashboard';
import { Appointments } from '../panel/Appointments';
import { OffersHeatmap } from '../panel/OffersHeatMap';
import { Performance } from '../panel/Performance';

// SIDE MENU ROUTES
export const sideMenuRoutes = [
  {
    path: '/dashboard',
    text: 'Dashboard',
    icon: Home,
    activeIcon: Home
  },
  {
    path: '/license',
    text: 'License',
    icon: FileCheck,
    activeIcon: FileCheck
  },
  {
    path: '/booken-appointments',
    text: 'Booked Appointments',
    icon: BookCheck,
    activeIcon: BookCheck
  },
  {
    path: '/generated-offers',
    text: 'Generated Offers',
    icon: Gift,
    activeIcon: Gift
  },
  {
    path: '/offers-heatmap',
    text: 'Offers Heatmap',
    icon: MapPinCheck,
    activeIcon: MapPinCheck
  },
  {
    path: '/performance',
    text: 'Rooftop Performance',
    icon: UserStar,
    activeIcon: UserStar
  }
];

// PROTECTED ROUTES
// PRIVATE ROUTES
export const privateRoutes = [
  {
    path: '/dashboard',
    moduleName: 'Dashboard  ',
    headerText: 'Dashboard  ',
    element: <Dashboard />
  },
  {
    path: '/license',
    moduleName: 'License',
    headerText: 'License',
    element: <License />
  },
  {
    path: '/booken-appointments',
    moduleName: 'Booked Appointments',
    headerText: 'Booked Appointments',
    element: <Appointments />
  },
  {
    path: '/generated-offers',
    moduleName: 'Generated Offers',
    headerText: 'Generated Offers',
    element: <Offers />
  },
  {
    path: '/offers-heatmap',
    moduleName: 'Offers Heatmap',
    headerText: 'Offers Heatmap',
    element: <OffersHeatmap />
  },
  {
    path: '/performance',
    moduleName: 'Rooftop Performance',
    headerText: 'Rooftop Performance',
    element: <Performance />
  }
];

// PUBLIC ROUTES
export const publicRoutes = [
  {
    path: '/login',
    moduleName: 'Authentication',
    element: <Login />
  }
];
