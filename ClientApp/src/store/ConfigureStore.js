import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import customerReducer from './reducers/Customer';
import vechicleReducer from './reducers/Vechicle';
import enquiryReducer from './reducers/Enquiry';
import dailyReportReducer from './reducers/DailyReport';
import variantReducer from './reducers/Variant';

export default function ConfigureStore(history, initialState) {
  const reducers = {
    customer: customerReducer,
    vechicle: vechicleReducer,
    enquiry: enquiryReducer,
    dailyReport: dailyReportReducer,
    variant: variantReducer
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
