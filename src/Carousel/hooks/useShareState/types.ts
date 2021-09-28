export type SetState<T> = (input: T | ((input: T) => T)) => void;
