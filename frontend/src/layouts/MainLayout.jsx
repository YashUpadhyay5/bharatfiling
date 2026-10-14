import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SupportWidget from '../components/common/SupportWidget.jsx';
import ErrorBoundary from '../components/common/ErrorBoundary.jsx';
import PageOutlet from './PageOutlet.jsx';

/**
 * Public website + customer journey:  Header  ->  <Outlet />  ->  Footer
 */
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* A header failure must never take the page content down with it */}
      <ErrorBoundary fallback={null}>
        <Header />
      </ErrorBoundary>

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <PageOutlet />
      </main>

      <Footer />
      <SupportWidget />
    </div>
  );
}
