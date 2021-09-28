export type AutoSlide = {
  active: boolean;
  timerId: NodeJS.Timeout | null;
  duration: number;
};
