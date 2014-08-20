module.exports = function(grunt) {
  "use strict";

  var project_name = 'dude';

  var global_vars = {
    project_name: project_name,
    project_css: 'css',
    project_scss: 'scss'
  }

  grunt.initConfig({
    global_vars: global_vars,
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          includePaths: ['<%= global_vars.project_scss %>', require('node-bourbon').includePaths[0]]
        },
        files: {
          '<%= global_vars.project_css %>/<%= global_vars.project_name %>.css': '<%= global_vars.project_scss %>/<%= global_vars.project_name %>.scss'
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: '<%= global_vars.project_scss %>/**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build', 'watch']);
}
