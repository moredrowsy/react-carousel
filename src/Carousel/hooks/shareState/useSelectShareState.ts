import { useEffect, useState } from 'react';
import EventEmitter from 'events';
import { shareState, shareEE } from './shareState';

export default function useSelectShareState<T>(key: string): T | null {
  if (!(key in shareEE)) {
    shareEE[key] = new EventEmitter();
  }

  const [, forceUpdate] = useState<boolean>(false);

  useEffect(() => {
    const update = () => forceUpdate((p) => !p);
    shareEE[key].addListener('update', update);

    return () => {
      if (key in shareEE) shareEE[key].removeListener('update', update);
    };
  }, [key]);

  return key in shareState ? shareState[key] : null;
}
