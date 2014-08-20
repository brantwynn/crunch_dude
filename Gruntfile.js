module.exports = function(grunt) {
  "use strict";

  var module_name = 'dude';

  var global_vars = {
    module_name: module_name,
    module_css: 'css',
    module_scss: 'scss'
  }

  grunt.initConfig({
    global_vars: global_vars,
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          includePaths: ['<%= global_vars.module_scss %>', require('node-bourbon').includePaths[0]]
        },
        files: {
          '<%= global_vars.module_css %>/<%= global_vars.module_name %>.css': '<%= global_vars.module_scss %>/<%= global_vars.module_name %>.scss'
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: '<%= global_vars.module_scss %>/**/*.scss',
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
