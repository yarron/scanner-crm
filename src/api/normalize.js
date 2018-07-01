export const normalize = (data) => {
  const byId = {};
  const allIds = [];

  if (Array.isArray(data)) {
    data.forEach((item) => {
      allIds.push(Number(item.id));
      byId[item.id] = item;
      byId[item.id].id = Number(item.id);
    });
  } else {
    byId[data.id] = data;
    byId[data.id].id = Number(data.id);
    allIds.push(Number(data.id));
  }

  return {
    byId,
    allIds,
  };
};

export const normalizeCast = (data, id) => {
  const byId = {};
  const allIds = [];

  byId[id] = data;
  allIds.push(id);

  return {
    byId,
    allIds,
  };
};
