import { useEffect, useState } from 'react';
import EventEmitter from 'events';
import { shareState, shareEE } from './shareState';

export default function useShareState<T>(
  key: string,
  initialState: T extends any ? T | (() => T) : never
): [T, SetState<T>] {
  if (!(key in shareState)) {
    const initState =
      typeof initialState === 'function' ? initialState() : initialState;
    shareState[key] = initState;
  }

  if (!(key in shareEE)) {
    shareEE[key] = new EventEmitter();
  }

  const [, forceUpdate] = useState<boolean>(false);

  const setState: SetState<T> = (input) => {
    const state = typeof input === 'function' ? input(shareState[key]) : input;

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

type SetState<T> = (
  input: T extends any ? T | ((input: T) => T) : never
) => void;
