import { useEffect, useState } from 'react';
import EventEmitter from 'events';
import { shareState, shareEE } from './shareState';

export default function useSetShareState<T>(key: string): SetState<T> {
  if (!(key in shareEE)) {
    shareEE[key] = new EventEmitter();
  }

  const [, forceUpdate] = useState<boolean>(false);

  const setState: SetState<T> = (input) => {
    if (key in shareState) {
      const state =
        typeof input === 'function' ? input(shareState[key]) : input;

      if (state !== shareState[key]) {
        shareState[key] = state;
        shareEE[key].emit('update');
      }
    }
  };

  useEffect(() => {
    const update = () => forceUpdate((p) => !p);
    shareEE[key].addListener('update', update);

    return () => {
      if (key in shareEE) shareEE[key].removeListener('update', update);
    };
  }, [key]);

  return setState;
}

type SetState<T> = (
  input: T extends any ? T | ((input: T) => T) : never
) => void;
