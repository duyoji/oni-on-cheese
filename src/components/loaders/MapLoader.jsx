import React from 'react';
import { BeatLoader } from 'react-spinners';

const MapLoader = (props) => {
  const style = props.style || {};

  // Vertical middle.
  if(!style.padding) {
    const padding = style.height ? `${parseInt(style.height, 10) / 2 - 15}px` : '0';
    style.padding = padding;
  }

  return (
    <div style={style}>
      <BeatLoader
        color={'#50E3C2'}
        loading={true}
      />
    </div>
  );
};

export default MapLoader;