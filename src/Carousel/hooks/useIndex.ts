import { useShareStateOrNull, SetState } from './useShareState';

export default function useIndex(id: string): [number, SetState<number>] {
  const [index, setIndex] = useShareStateOrNull<number>(
    `carousel/selIdx/${id}`
  );

  const setState: SetState<number> = (input) =>
    setIndex((p) => (input instanceof Function ? input(p) : input));

  return [index ? index : 0, setState];
}
