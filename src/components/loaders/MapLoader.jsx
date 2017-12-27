import React from 'react';
import { BeatLoader } from 'react-spinners';

const MapLoader = (props) => {
  const style = props.style || {};

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