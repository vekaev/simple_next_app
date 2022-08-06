import '@testing-library/jest-dom/extend-expect';
import ResizeObserver from 'resize-observer-polyfill';
import { server } from '../client/src/__mocks__/server';

global.ResizeObserver = ResizeObserver;

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
