import { useEffect, useState } from 'react';
import EventEmitter from 'events';
import { maxListeners, shareState, shareEE } from './shareState';
import { SetState } from './types';

export default function useShareStateOrNull<T>(
  key: string
): [T | null, SetState<T>] {
  if (!(key in shareEE)) {
    shareEE[key] = new EventEmitter();
    shareEE[key].setMaxListeners(maxListeners);
  }

  const [hasState, setHasState] = useState(key in shareState);
  const [, forceUpdate] = useState<boolean>(false);

  const setState: SetState<T> = (input) => {
    if (key in shareState) {
      const state = input instanceof Function ? input(shareState[key]) : input;

      if (state !== shareState[key]) {
        shareState[key] = state;
        shareEE[key].emit('update');
      }
    }
  };

  useEffect(() => {
    const update = () => forceUpdate((p) => !p);
    shareEE[key].addListener('update', update);

    // Add listener once when useShareState has not initialized value
    // When useShareState has initialized value, update this hook from listener
    if (!hasState) {
      if (key in shareState) setHasState(true);
      else shareEE[key].once('init', () => setHasState(true));
    }

    return () => {
      if (key in shareEE) shareEE[key].removeListener('update', update);
    };
  }, [key, hasState]);

  return [key in shareState ? shareState[key] : null, setState];
}
