# React Carousel

A carousel example using Reactjs.

This project is to showcase how to create components that can internally
share state without the user explicitly setting up any state logic.

Users can just import the components and use the components anywhere in the
DOM tree. The components can still communicate with each other without
rerendering any parent nodes.

## How It Works

The `Viewer` component is all that's needed but you can import optional
`Slider`, `Previous`, `Next` and `Automate` components to control the `Viewer`
component.

All components require a unique string `id` so that components with the same
`id` string can internally share state.

You can have multiple carousel. For example, there are two carousels with
`id` "carousel-1" and "carousel-2". All the components with `id` "carousel-1"
will only affect "carousel-1" and not "carousel-2". All components with
`id` "carousel-2" will only affect only "carousel-2" and not "carousel-1".

## Carousel Components

The Carousel component has main three parts. All three parts do not require any
external state logic from the user. Just import them, provide the image data
and a unique id.

### Viewer

`src/Carousel/Viewer.tsx`

The `Viewer` component shows the main image. It also has a onhover previous and
next arrow buttons to navigate the carousel.

It requires props of `images` (list of image urls) and a unique string `id` for
this carousel.

### Slider

`src/Carousel/Slider.tsx`

The `Slider` component is a scrollable list of thumbnails.
Selecting one of the thumbnails will change the `Viewer` component's image.

It requires props of `thumbnails` (list of thumbnail urls) and a unique string
`id` for this carousel. The `thumbnailWidth` and `thumbnailHeight` are also
required to tell the `Slider` how to render the thumbnails dimensions.

### Previous, Next, and Automate

`src/Carousel/Previous.tsx`

`src/Carousel/Next.tsx`

`Previous` and `Next` are button components that can seperately control
both the `Viewer` and `Slider` components to change the selected image.

Use the `Previous` and/or `Next` components to wrap your UI components for
custom button appearance.

`src/Carousel/Automate.tsx`

`Automate` is a button component that controls the automate slideshow for
the Carousel's `Viewer` and `Slider` selected image to show. It can accept
a plain component or a custom component with the prop `active` passed into it.
The `active` prop has value `true` or `false` to indicate if the automatic
slideshow is on or off.

## useShareState Hook

`src/Carousel/hooks/useShareState.tsx`

Carousel components can internally share state via a custom hook called
`useShareState`. The hook `useShareState` setup a map of cache that is seperate
from React.

The record for each cache consist of `state` and `ee` (event emitter).
All `useStateState` hooks subscribe to the unique id string for the specific
cache record. Anytime an instance of `useStateState` updates a value, it will
emit a signal to all other `useStateState` instances that share the same `id`.

This means that components in any level of the DOM tree can bypass parent state
hoisting and direclty communicate with each other via `useShareState`.

The interface for `useShareState` is the same as `react`'s `useState`.
You provide either a intial `state` or a function that returns an intial
`state`. It returns a tuple of `state` and `setState`. The `setState` interface
is also the same, where you can directly pass in a new `state` or a `function`.

This is similar with `redux` and `recoil` but without the need for encapsulating
the root application with a `Provider` from Redux or `RecoilRoot` from `recoil`.

### Optional hooks

`src/Carousel/hooks/useSelectShareState.tsx`

`useSelectShareState` can be used select a `state` by `id` without
initialization. If `state` has not yet been initialized by `useShareState`,
then it returns `null`.

`src/Carousel/hooks/useSetShareState.tsx`

`useSetShareState` returns a `setState` function to set `state` without
initialization.
If `state` has not yet been initialized by `useShareState`,
then calling `setState` does nothing.

## Install

```bash
npm install
```

## Run

```bash
npm start
```
