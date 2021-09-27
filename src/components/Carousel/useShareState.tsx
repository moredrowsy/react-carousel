import { useEffect, useState } from 'react';
import EventEmitter from 'events';

const shareState: Record<string, ShareState<any>> = {};

export function useShareState<T>(
  key: string,
  initialState: T
): [T, SetState<T>] {
  if (!(key in shareState))
    shareState[key] = { state: initialState, ee: new EventEmitter() };

  const [, forceUpdate] = useState<boolean>(false);

  const setState: SetState<T> = (input) => {
    const state =
      typeof input === 'function' ? input(shareState[key].state) : input;

    if (state !== shareState[key].state) {
      shareState[key].state = state;
      shareState[key].ee.emit('update');
    }
  };

  useEffect(() => {
    const update = () => forceUpdate((p) => !p);
    shareState[key].ee.addListener('update', update);

    return () => {
      if (key in shareState)
        shareState[key].ee.removeListener('update', update);
    };
  }, [key]);

  return [shareState[key].state, setState];
}

type ShareState<T> = {
  state: T;
  ee: NodeJS.EventEmitter;
};

type SetState<T> = (
  input: T extends any ? T | ((input: T) => T) : never
) => void;
