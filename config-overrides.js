module.exports = function override(config, env) {
  // Add the alias configuration here
  config.resolve.alias = {
    ...config.resolve.alias,
    "@mui/styled-engine": "@mui/styled-engine-sc",
  };

  return config;
};
