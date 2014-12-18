/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssFolder: 'assets/css',
    scssFolder: 'src/scss',
    jadeFolder: 'src/jade',
    typescriptFolder: 'src/ts',
    builtFolder: 'built',
    sass: {                              // Task
        dist: {                            // Target
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
            '<%=cssFolder%>/main.css': '<%=cssFolder%>/main.css' //dest : source
          }
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
      typescript: {
          base: {
              src: ['<%=typescriptFolder%>/*.ts'],
              dest: 'assets/js',
              options: {
                  module: 'amd', //or commonjs
                  target: 'es5', //or es3
                  basePath: '<%=typescriptFolder%>',
                  sourceMap: false,
                  declaration: false
              }
          }
      },
      watch: {
        gruntfile: {
            files: 'Gruntfile.js'
        },
        main: {
            files: ['<%=scssFolder%>/*.scss', '<%=jadeFolder%>/**/*.jade', '<%=typescriptFolder%>/**/*.ts'],
            // tasks: ['sass']
            tasks: ['sass', 'jade', 'typescript', 'autoprefixer', 'replace']
        },
        jade: {
            files: ['<%=jadeFolder%>/**/*.jade'],
            // tasks: ['sass']
            tasks: ['sass', 'jade']
        },
        css: {
            files: ['<%=scssFolder%>/*.scss'],
            // tasks: ['sass']
            tasks: ['sass', 'autoprefixer', 'replace']
        },
        ts: {
            files: ['<%=typescriptFolder%>/*.ts'],
            // tasks: ['sass']
            tasks: ['typescript']
        }
     }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-typescript');

  // Default task.
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('run', ['sass', 'autoprefixer', 'jade', 'typescript', 'replace']);

};
