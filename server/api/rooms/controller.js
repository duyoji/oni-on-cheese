const formatResponse = (response) => ({results: response});
const send = (res, code, data, json = true) => {
  res.status(code).send(json ? JSON.stringify(data) : data);
}

const getRooms = async (req, res) => {
  send(
    res,
    200 ,//constants.SERVER.STATUS_TYPES.OK,
    formatResponse('getRooms')
  );
};

export {
  getRooms
};