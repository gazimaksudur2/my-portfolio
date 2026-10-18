import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home/Home';
import ErrorPage from './pages/ErrorPage/ErrorPage';

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <ErrorPage />;
    return this.props.children;
  }
}

const rootEl = document.getElementById('root');
const app = (
  <React.StrictMode>
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  </React.StrictMode>
);

// Use hydrateRoot when the element already has prerendered HTML (build-time prerender).
// Fall back to createRoot in dev or when prerender is skipped.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
