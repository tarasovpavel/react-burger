import {
    TypedUseSelectorHook,
    useSelector as selectorHook,
    useDispatch as dispatchHook
} from 'react-redux';

import { ThunkAction } from 'redux-thunk'
import { store } from '../index';
import { TApplicationActions } from '../types/types';
import type { } from 'redux-thunk/extend-redux';


export type RootState = ReturnType<typeof store.getState>;


export type AppThunk<TReturnType = void> = ThunkAction<TReturnType, RootState, unknown, TApplicationActions>;


export type AppDispatch<TReturnType = void> = (action: TApplicationActions | AppThunk) => TReturnType;


export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: () => AppDispatch = dispatchHook;

