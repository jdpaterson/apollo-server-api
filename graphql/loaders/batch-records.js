module.exports = {
  batchRecords: async (keys, model) => {
    const records = await model.findAll({
      where: {
        id: keys,
      },
    });
    return keys.map((key) => records.find((rec) => rec.id === key));
  },
};
