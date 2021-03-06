import { useEffect, useState } from 'react';
import EventEmitter from 'events';
import { maxListeners, shareState, shareEE } from './shareState';

export default function useSelectShareState<T>(key: string): T | null {
  if (!(key in shareEE)) {
    shareEE[key] = new EventEmitter();
    shareEE[key].setMaxListeners(maxListeners);
  }

  const [hasState, setHasState] = useState(key in shareState);
  const [, forceUpdate] = useState<boolean>(false);

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

  return key in shareState ? shareState[key] : null;
}
