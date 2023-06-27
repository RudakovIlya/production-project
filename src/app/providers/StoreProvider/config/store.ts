import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'
import { StateSchema } from './StateSchema'
import { createReducerManager } from './reducerManager'

export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) => {
  const reducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    counter: counterReducer,
  }

  const reducerManager = createReducerManager(reducer)

  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  })
  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

export type RootState = ReturnType<typeof createReduxStore>['getState']

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
