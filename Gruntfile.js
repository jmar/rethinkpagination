// Generated on 2013-09-25 using generator-bootstrap-less 3.0.3
'use strict';

//var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
//var mountFolder = function (connect, dir) {
//  return connect.static(require('path').resolve(dir));
//};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: './',
        dist: 'app/dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['scripts/{,*/}*.coffee'],
                tasks: ['coffee']
            },
            less: {
                files: ['styles/{,*/}*.less'],
                tasks: ['less']
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'scripts/{,*/}*.js',
                '!scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        coffee: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'scripts',
                        src: '{,*/}*.coffee',
                        dest: 'scripts',
                        ext: '.js'
                    }
                ]
            }
        },
        less: {
            dev: {
                options: {
                    strictMath: false,
                    sourceMap: false,
                    outputSourceFiles: true,
                    ieCompat: true,
                    cleancss: true,
                    paths: ["styles/"]
//                  sourceMapURL: 'styles/main.css.map',
//                  sourceMapFilename: 'styles/main.css.map'
                },
                files: {
                    "styles/main.css": "styles/main.less",
                    "styles/rethinkpagination.css": "styles/rethinkpagination.less"
                }
            }
        },
        browserSync: {
            options: {
                watchTask: true,
                debugInfo: false,
                notify: true,
                open: false,
                ports: {
                    min: 3005
                },
                ghostMode: {
                    clicks: true,
                    location: true,
                    forms: true,
                    scroll: false
                }
                ,proxy: "localhost/rethinkpagination/app"
            },
            files: {
                src: ["styles/*.css", ".tmp/*.html", "images/**/*.jpg", "images/**/*.png", "scripts/**/*.js", "*.html"]
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
         dist: {}
         },*/
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
         dist: {}
         },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/fonts/{,*/}*.*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: '<%= yeoman.app %>'
            }
        },
        usemin: {
            js: '<%= yeoman.dist %>/scripts/rethinkpagination.js',
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.app %>']
            }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'images',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: {
                    'styles/main.min.css': [
                        '.tmp/styles/{,*/}*.css',
                        'styles/main.css'
                    ],
                    'styles/rethinkpagination.min.css': [
                        '.tmp/styles/{,*/}*.css',
                        'styles/rethinkpagination.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     // https://github.com/yeoman/grunt-usemin/issues/44
                     //collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: '*.html',
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'images/{,*/}*.{webp,gif}'
                        ]
                    }
                ]
            },
            server: {
                files: [
                    {
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap/fonts/',
                        dest: 'fonts/glyphicons',
                        src: ['*']
                    }
                ]
            }
        },
        concurrent: {
            dist: [
                'coffee',
                'less'
//                'imagemin',
//                'svgmin'
            ]
        }
    });

    grunt.renameTask('regarde', 'watch');

//    grunt.registerTask('server', function (target) {
//        if (target === 'dist') {
//            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
//        }
//
//        grunt.task.run([
//            'clean:server',
//            'coffee',
//            'less',
//            'copy:server',
//            'livereload-start',
//            'connect:livereload',
//            'open',
//            'watch'
//        ]);
//    });

    grunt.registerTask('test', [
        'clean:server',
        'coffee',
        'less',
        'copy:server',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
//        'clean:dist',
//        'copy:server',
        'less',
        'useminPrepare',
        'cssmin',
        'concat',
        'uglify',
//        'copy',
        // 'rev',
        'usemin'
    ]);

    grunt.registerTask("default", ["browserSync", "watch"]);
};
