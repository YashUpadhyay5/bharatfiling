import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ErrorBoundary from '../components/common/ErrorBoundary.jsx';
import RouteLoadingFallback from './RouteLoadingFallback.jsx';

/**
 * Renders the matched child route.
 *  - Suspense keeps the surrounding chrome (header / footer) on screen while a lazy page loads.
 *  - The boundary is keyed by pathname so an error on one page never sticks to the next one.
 */
export default function PageOutlet() {
  const { pathname } = useLocation();
  return (
    <ErrorBoundary key={pathname}>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}
