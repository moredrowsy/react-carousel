import { useEffect, useState } from 'react';
import EventEmitter from 'events';
import { maxListeners, shareState, shareEE } from './shareState';
import { SetState } from './types';

export default function useShareState<T>(
  key: string,
  initialState: T | (() => T)
): [T, SetState<T>] {
  if (!(key in shareState))
    shareState[key] =
      initialState instanceof Function ? initialState() : initialState;

  if (!(key in shareEE)) {
    shareEE[key] = new EventEmitter();
    shareEE[key].setMaxListeners(maxListeners);
  }

  const [, forceUpdate] = useState<boolean>(false);

  const setState: SetState<T> = (input) => {
    const state = input instanceof Function ? input(shareState[key]) : input;

    if (state !== shareState[key]) {
      shareState[key] = state;
      shareEE[key].emit('update');
    }
  };

  useEffect(() => {
    const update = () => forceUpdate((p) => !p);
    shareEE[key].addListener('update', update);

    return () => {
      if (key in shareEE) shareEE[key].removeListener('update', update);
    };
  }, [key]);

  return [shareState[key], setState];
}
