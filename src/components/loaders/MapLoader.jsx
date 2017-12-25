import React from 'react';
import { BeatLoader } from 'react-spinners';

const MapLoader = (props) => {
  const style = props.style || {};

  // TODO: Fix this into proper way.
  if(!style.padding) {
    // parseInt('300px', 10) => 300.
    //   This is kind of hacky way.
    //
    // I want spinner/loader to be in center the container.
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