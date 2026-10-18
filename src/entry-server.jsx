/**
 * Server entry point — used by `vite build --config vite.server.config.js`
 * to produce a Node-compatible bundle for build-time HTML injection.
 *
 * MotionConfig initial={false} renders all framer components in their
 * "animate" target state (fully visible) rather than their hidden initial
 * state, so the prerendered HTML shows real content to crawlers and on
 * first paint.
 */
import { renderToString } from 'react-dom/server';
import { StrictMode } from 'react';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import Home from './pages/Home/Home';

export function render() {
  return renderToString(
    <StrictMode>
      <LazyMotion features={domAnimation}>
        {/* initial={false}: render all motionValue targets immediately — no opacity:0 flash */}
        <MotionConfig initial={false} reducedMotion="never">
          <Home />
        </MotionConfig>
      </LazyMotion>
    </StrictMode>
  );
}
