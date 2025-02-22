import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@components/ui';

// Lazy load pages
const Dashboard = lazy(() => import('@pages/Dashboard'));
const RouteOptimization = lazy(() => import('@pages/RouteOptimization'));
const Maintenance = lazy(() => import('@pages/Maintenance'));
const Performance = lazy(() => import('@pages/Performance'));
const VehicleTracking = lazy(() => import('@pages/VehicleTracking'));
const EVCharging = lazy(() => import('@pages/EVCharging'));
const Inventory = lazy(() => import('@pages/Inventory'));
const DemandPlanning = lazy(() => import('@pages/DemandPlanning'));

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/route-optimization" element={<RouteOptimization />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/tracking" element={<VehicleTracking />} />
        <Route path="/charging" element={<EVCharging />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/demand-planning" element={<DemandPlanning />} />
      </Routes>
    </Suspense>
  );
}