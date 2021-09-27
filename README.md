# React Carousel

A carousel example using Reactjs.

This project is to showcase how to create components that can internally
share state without the user explicitly setting up any state logic.

Users can just import the components and use the components anywhere in the
DOM tree. The components can still communicate with each other without
rerendering any parent nodes.

## Carousel Component

The Carousel component has three parts. All three parts do not require any
external state logic from the user. Just import them, provide the image data
and a unique id.

### Viewer

The `Viewer` component shows the main image. It also has a onhover previous and
next arrow buttons to navigate the carousel.

It requires props of `images` (list of image urls) and a unique string id for
this carousel.

### Slider

The `Slider` component is a scrollable list of thumbnails.
Selecting one of the thumbnails will change the `Viewer` component's image.

It requires props of `thumbnails` (list of thumbnail urls) and a unique string
`id` for this carousel. The `thumbnailWidth` and `thumbnailHeight` are also
required to tell the Slider how to render the thumbnails.

### Previous and Next

The `Previous` and `Next` are button components that can seperately control
both the `Viewer` and `Slider` components to change the selected image.

Use the `Previous` and/or `Next` components to wrap your UI components for
custom button appearance.

## How It Works

The `Viewer` component is all that's needed but you can import optional
`Slider`, `Previous` and `Next` components to control the `Viewer` component.

All components require a unique string `id` so that all components with the same
`id` string can internally share state.

You can have multiple carousel. For example, there are two carousels with
id "carousel-1" and "carousel-2". All the components with `id` "carousel-1" will
only affect "carousel-1" and not "carousel-2". All components with
`id` "carousel-2" will only affect only "carousel-2" and not "carousel-1".

## Install

```bash
npm install
```

## Run

```bash
npm start
```
