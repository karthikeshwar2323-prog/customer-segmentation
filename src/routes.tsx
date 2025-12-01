import Dashboard from './pages/Dashboard';
import Segments from './pages/Segments';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Recommendations from './pages/Recommendations';
import Offers from './pages/Offers';
import DynamicPricing from './pages/DynamicPricing';
import Settings from './pages/Settings';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Dashboard',
    path: '/',
    element: <Dashboard />
  },
  {
    name: 'Segments',
    path: '/segments',
    element: <Segments />
  },
  {
    name: 'Customers',
    path: '/customers',
    element: <Customers />
  },
  {
    name: 'Analytics',
    path: '/analytics',
    element: <Analytics />
  },
  {
    name: 'Recommendations',
    path: '/recommendations',
    element: <Recommendations />
  },
  {
    name: 'Offers',
    path: '/offers',
    element: <Offers />
  },
  {
    name: 'Dynamic Pricing',
    path: '/pricing',
    element: <DynamicPricing />
  },
  {
    name: 'Settings',
    path: '/settings',
    element: <Settings />
  }
];

export default routes;
