module.exports = {
  stories: ['../**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  typescript: {
    check: true,
    reactDocgen: 'none'
  }
};
