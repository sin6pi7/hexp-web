module.exports = (db) => {
  // Load all the models
  const models = [
    'movie',
    'movie_image',
    'period',
    'movie_period',
    'tag',
    'movie_tag',
    'region',
    'movie_region',
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