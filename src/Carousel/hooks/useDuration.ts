import {
  useSelectShareState,
  useSetShareState,
  SetState,
} from './useShareState';
import { AutoSlide } from '../types';

export default function useDuration(id: string): [number, SetState<number>] {
  const autoSlide = useSelectShareState<AutoSlide>(`carousel/autoSlide/${id}`);
  const setAutoSlide = useSetShareState<AutoSlide>(`carousel/autoSlide/${id}`);

  const setState: SetState<number> = (input) =>
    setAutoSlide((p) => ({
      ...p,
      duration: input instanceof Function ? input(p.duration) : input,
    }));

  return [autoSlide ? autoSlide.duration : 0, setState];
}
