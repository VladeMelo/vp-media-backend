const handlebars = require('handlebars');
const fs = require('fs');

class HandlebarsMailTemplateProvider {
  async parse(file, variables) {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);
    
    return parseTemplate(variables);
  }
}

module.exports = HandlebarsMailTemplateProvider;
