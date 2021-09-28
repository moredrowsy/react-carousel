import {
  useSelectShareState,
  useSetShareState,
  SetState,
} from './useShareState';

export default function useIndex(id: string): [number, SetState<number>] {
  const index = useSelectShareState<number>(`carousel/selIdx/${id}`);
  const setIndex = useSetShareState<number>(`carousel/selIdx/${id}`);

  const setState: SetState<number> = (input) =>
    setIndex((p) => (input instanceof Function ? input(p) : input));

  return [index ? index : 0, setState];
}
