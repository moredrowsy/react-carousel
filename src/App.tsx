import React, { useEffect, useState } from 'react';
import { Next, Previous, Slider, Viewer } from './components/Carousel';

// Mock data
import { carouselImages } from './data';

const App: React.FC<Props> = () => {
  const [images, setImages] = useState<string[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  useEffect(() => {
    setImages(
      carouselImages.map((i) => require(`./assets/images/${i.image}`).default)
    );
    setThumbnails(
      carouselImages.map(
        (i) => require(`./assets/thumbnails/${i.thumbnail}`).default
      )
    );
  }, []);

  return (
    <div className='App'>
      <div style={{ textAlign: 'center', margin: 15 }}>
        A React Carousel Example
      </div>
      <div style={{ width: 480, height: 480, margin: 'auto' }}>
        <Viewer id='1' images={images} />
      </div>
      <div style={{ width: 480, height: 150, margin: 'auto' }}>
        <Slider
          id='1'
          thumbnails={thumbnails}
          thumbnailWidth={150}
          thumbnailHeight={150}
        />
      </div>
      <div style={{ width: 480, margin: 'auto' }}>
        <Previous
          id='1'
          size={images.length}
          style={{ position: 'relative', float: 'left' }}
        >
          Previous
        </Previous>
        <Next
          id='1'
          size={images.length}
          style={{ position: 'relative', float: 'right' }}
        >
          Next
        </Next>
      </div>
    </div>
  );
};

export default App;

type Props = {};
