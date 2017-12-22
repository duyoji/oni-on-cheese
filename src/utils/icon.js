import fontawesome from 'fontawesome-markers';

const DEFAULT_ICON = {
  path: fontawesome.MAP_MARKER,
  scale: 0.5,
  strokeWeight: 1,
  strokeColor: 'black',
  strokeOpacity: 1,
  fillColor: '#FD9E6C',
  fillOpacity: 1.0,
};

// Future plan.
// Switch icon according to roles of each user.

const createUserIcon = () => {
  const icon = DEFAULT_ICON;

  return icon;
};


export { createUserIcon };