/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssFolder: 'css',
    scssFolder: 'scss',
    jadeFolder: 'jade',
    builtFolder: 'built',
    sass: {                              // Task
        dist: {                            // Target
//          files: {
//            'css/styles.css': 'scss/styles.scss' //dest : source
//          },
          files: [{
              expand: true,
              cwd: '<%=scssFolder%>', //current working dir
              src: ['*.scss', '!_*.scss'], //sass files filter
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
                  {expand: true, flatten: true, src: ['<%=cssFolder%>/*.css'], dest: '<%=cssFolder%>/'}
              ]
          }
      },
      autoprefixer: {
        dist: {
          options: {
            browsers: ['last 3 versions', '> 1%', 'ie 9', 'Opera 12']
          },
          files: {
            'css/styles.css': '<%=cssFolder%>/styles.css' //dest : source
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
      jade: {
          dist: {
              options: {
                  pretty: true
              },
              files: [{
                  expand: true,
                  cwd: '<%=jadeFolder%>', //current working dir
                  src: ['*.jade', '!_*.jade'], //jade files filter
                  dest: '', //destination folder
                  ext: '.html' //destination extension
              }]
          }
      },
      watch: {
        gruntfile: {
            files: 'Gruntfile.js'
        },
        dist: {
            files: ['<%=scssFolder%>/*.scss', '<%=jadeFolder%>/**/*.jade'],
            // tasks: ['sass']
            tasks: ['sass', 'autoprefixer', 'replace', 'jade']
          }
     }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-jade');

  // Default task.
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('run', ['sass', 'autoprefixer', 'replace', 'jade']);

};
