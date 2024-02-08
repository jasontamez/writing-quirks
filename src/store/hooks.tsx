import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Dispatch, SetStateAction } from 'react';
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type SetState<T extends unknown> = Dispatch<SetStateAction<T>>;
export type SetStateBoolean = SetState<boolean>;
