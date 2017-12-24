import fontawesome from 'fontawesome-markers';

const ME_ICON = {
  path: fontawesome.MAP_MARKER,
  scale: 0.5,
  strokeWeight: 1,
  strokeColor: 'black',
  strokeOpacity: 1,
  fillColor: '#F44362',
  fillOpacity: 1.0,
};

const OTHERS_ICON = {
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

const createUserIcon = (isMe = false) => {
  const icon = isMe ? ME_ICON : OTHERS_ICON;

  return icon;
};


export { createUserIcon };