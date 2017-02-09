'use strict';

module.exports = {
  description: 'Generate a FastBoot test',

  locals(options) {
    let packageName = options.project.name();
    let moduleName = (options.entity && options.entity.name) || packageName;

    return {
      url: moduleName
    };
  }
};