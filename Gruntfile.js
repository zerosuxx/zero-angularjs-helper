// jshint camelcase: false, quotmark: false

var fs = require('fs');
module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    var pkg = grunt.file.readJSON('package.json');

    var config = {
        'src_dir': 'src'
    };

    function findFiles(dir, files) {
        fs.readdirSync(dir).forEach(function(file) {
            var path = dir + '/' + file;
            if( fs.lstatSync(path).isDirectory() ) {
                findFiles(path, files);
            } else {
                files.push(path);
            }
        });
    }
    var files = [];
    findFiles(config.src_dir, files);
	
    grunt.initConfig({
        pkg: pkg,
        language: grunt.option('lang') || 'en',
        meta: {
            banner: '/*!\n * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    ' * <%= pkg.homepage %>\n' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> - <%= pkg.author.name %>;' +
                    ' Licensed <%= pkg.license %>\n */\n'
        },
        build_dir: 'dist',
        lib_files: {
            core: files
        },
        jshint: {
            options: {
                jshintrc: true
            },
            all: ['Gruntfile.js', '<%= lib_files.core %>'],
            core: {
                files: {
                    src: ['<%= lib_files.core %>']
                }
            }
        },
        concat: {
            banner_core: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: '<%= concat.core.dest %>',
                dest: '<%= concat.core.dest %>'
            },
            core: {
                src: ['<%= lib_files.core %>'],
                dest: '<%= build_dir %>/zero-angularjs-helper.js'
            }
        },
        uglify: {
            options: {
                output: {
                    comments: /(?:^!|@(?:license|preserve|cc_on))/
                }
            },
            core: {
                files: {
                    '<%= build_dir %>/zero-angularjs-helper.min.js': '<%= concat.core.dest %>'
                }
            }
        },
        umd: {
            'core': {
                src: '<%= concat.core.dest %>',
                dest: '<%= concat.core.dest %>'
            }
        },
        file_append: {
            'core': {
                files: [{
                    append: "return 'zerosuxx.zeroNgHelper';",
                    input: '<%= concat.core.dest %>'
                }]
            }
        }
    });

    grunt.registerTask('build', [
        'build:core'
    ]);

    grunt.registerTask('build:core', [
        'jshint:core',
        'concat:core',
        'file_append:core',
        'umd:core',
        'concat:banner_core',
        'uglify:core'
    ]);
};

