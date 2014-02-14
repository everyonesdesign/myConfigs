/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssFolder: 'css',
    scssFolder: 'scss',
    builtFolder: 'built',
    sass: {                              // Task
        dist: {                            // Target
//          files: {
//            'css/styles.css': 'scss/styles.scss' //dest : source
//          },
          files: [{
              expand: true,
              cwd: '<%=scssFolder%>', //current working dir
              src: ['*.scss'], //sass files filter
              dest: '<%=cssFolder%>', //destination folder
              ext: '.css' //destination extension
          }],
          options: {
              check: false, //should be false else the output is empty!!!
              style: 'expanded'
          }
        }
      },
      replace: {
          dist: {
              options: {
                  patterns: [
                      {
                          match: /\n*?\s*?-webkit-filter:.*?;/,
                          replacement: ""
                      }
                  ]
              },
              files: [
                  {expand: true, flatten: true, src: ['css/*.css'], dest: 'css/'}
              ]
          }
      },
      autoprefixer: {
        dist: {
          options: {
            browsers: ['last 3 versions', '> 1%', 'ie 8']
          },
          files: {
            'css/styles.css': 'css/styles.css' //dest : source
          }
//          files: [{
//               expand: true,
//               cwd: '<%=cssFolder%>', //current working dir
//               src: ['*.css'], //css files filter
//               dest: '<%=cssFolder%>', //destination folder
//               ext: '.css' //destination extension
//          }]
        }
      },
      watch: {
        gruntfile: {
            files: 'Gruntfile.js'
        },
        dist: {
            files: ['<%=scssFolder%>/*.scss'],
            // tasks: ['sass']
            tasks: ['sass', 'autoprefixer', 'replace']
          }
     }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-replace');

  // Default task.
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('run', ['sass', 'autoprefixer', 'replace']);

};
