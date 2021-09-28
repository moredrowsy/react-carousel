import { useShareStateOrNull, SetState } from './useShareState';
import { AutoSlide } from '../types';

export default function useAutomate(id: string): [boolean, SetState<boolean>] {
  const [autoSlide, setAutoSlide] = useShareStateOrNull<AutoSlide>(
    `carousel/autoSlide/${id}`
  );

  const setState: SetState<boolean> = (input) =>
    setAutoSlide((p) => ({
      ...p,
      active: input instanceof Function ? input(p.active) : input,
    }));

  return [autoSlide ? autoSlide.active : false, setState];
}
