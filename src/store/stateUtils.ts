import { AsyncState } from './types/types';

export const mergeAsyncStates = (...asyncStates: AsyncState[]): AsyncState => {
  if (asyncStates.includes('INITIAL')) {
    return 'INITIAL';
  }
  if (asyncStates.includes('LOADING')) {
    return 'LOADING';
  }
  if (asyncStates.includes('FAILURE')) {
    return 'FAILURE';
  }

  return 'SUCCESS';
};

export const isStateInitial = (state: AsyncState): boolean => {
  return state === 'INITIAL';
};

export const isStateLoading = (state: AsyncState): boolean => {
  return state === 'LOADING';
};

export const isStateInitialOrLoading = (state: AsyncState): boolean => {
  return isStateInitial(state) || isStateLoading(state);
};

export const isStateFailure = (state: AsyncState): boolean => {
  return state === 'FAILURE';
};

export const isStateSuccess = (state: AsyncState): boolean => {
  return state === 'SUCCESS';
};

export const makeAsyncState = (isError: boolean, isLoading: boolean): AsyncState => {
  if (isError) {
    return 'FAILURE';
  }
  if (isLoading) {
    return 'LOADING';
  }
  return 'SUCCESS';
};
