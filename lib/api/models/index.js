module.exports = (db) => {
  // Load all the models
  const models = [
    'movie',
    'movie_image',
    'period',
    'tag',
    'region',
    'movie_votable',
  ].reduce(
    (models, modelName) => {
      return Object.assign(
        {},
        models,
        {
          [modelName]: require(`./${modelName}`)(db),
        }
      );
    },
    {}
  );

  // Define associations
  Object.keys(models).forEach((modelName) => {
    const model = models[modelName];
    if ('associate' in model) {
      model.associate(models);
    }
  });

  models.db = db;

  return models;
};