module.exports = {
  description: '',

  normalizeEntityName() {
  },

  afterInstall() {
    return this.addPackagesToProject([
      { name: 'ember-cli-fastboot' },
      { name: 'chai' }
    ]);
  }
};
