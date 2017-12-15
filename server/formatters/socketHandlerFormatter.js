const formatInput = () => {};

/**
 *
 * @param {Error} error
 * @param {object} data
 */
const formatOutput = ({error, data} = {}) => {
  if( (!error && !data ) ) {
    throw new Error('Need an error or data prop.');
  }
  if( (error && data ) ) {
    throw new Error('Cannot pass both error and data props.');
  }

  return {
    result: {error, data}
  };
};

export { formatInput, formatOutput };