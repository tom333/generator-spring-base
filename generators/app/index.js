'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the marvelous ${chalk.red('generator-spring-base')} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "appname",
        message: "application name",
        default: this.appname // Default to current folder name
      },
      {
        type: 'confirm',
        name: 'gitinit',
        message: 'Initialisation d\'un dépot git ?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // simple copie
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile')
    );
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );

    // copie de templates
    this.fs.copyTpl(
      this.templatePath("pom.xml"),
      this.destinationPath("pom.xml"),
      { appname: this.props.appname }
    );
    this.fs.copyTpl(
      this.templatePath("Makefile"),
      this.destinationPath("Makefile"),
      { appname: this.props.appname.toLowerCase() }
    );
    this.fs.copyTpl(
      this.templatePath("src/main/java/dev/demo/baseappname/BaseAppNameApplication.java"),
      this.destinationPath(`src/main/java/dev/demo/${this.props.appname.toLowerCase()}/${this.props.appname}Application.java`),
      { appname: this.props.appname }
    );
    this.fs.copyTpl(
      this.templatePath("src/main/resources/application.yml"),
      this.destinationPath('src/main/resources/application.yml'),
      { appname: this.props.appname }
    );
  }

  install() {
    // this.installDependencies();
  }
};
