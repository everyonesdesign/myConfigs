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
              src: ['*.scss', '!_*.scss'], //sass files filter
              dest: '<%=cssFolder%>', //destination folder
              ext: '.css' //destination extension
          }],
          options: {
//              check: true, //should be false else the output is empty!!!
              style: 'expanded'
          }
        }
      },  
      autoprefixer: {
        dist: {
          options: {
            browsers: ['last 2 versions', '> 1%', 'ie 8']
          },
//          files: {
//            'css/test.css': 'css/test.css' //dest : source
//          }
          files: [{
               expand: true,
               cwd: '<%=cssFolder%>', //current working dir
               src: ['*.css'], //css files filter
               dest: '<%=cssFolder%>', //destination folder
               ext: '.css' //destination extension
          }]
        }
      },      
      watch: {
        dist: {
            files: ['<%=scssFolder%>/*.scss'],
            // tasks: ['sass']
            tasks: ['sass', 'autoprefixer']
          }
     }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Default task.
  grunt.registerTask('default', ['watch']);

};
