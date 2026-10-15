import React from 'react';
import SupportWidget from '../components/common/SupportWidget.jsx';
import PageOutlet from './PageOutlet.jsx';

/**
 * Focused screens that bring their own chrome (checkout, CA workbench, admin portal):
 * just the <Outlet /> and the support widget - no public header or footer.
 */
export default function BareLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <PageOutlet />
      </main>
      <SupportWidget />
    </div>
  );
}
