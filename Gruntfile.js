module.exports = function (grunt) {

    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    require('time-grunt')(grunt);

    // Configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        assemble: {
            options: {
                layoutdir: 'source/hbs/layouts/',
                partials: ['source/hbs/partials/**/*.hbs'],
                helpers: ['source/hbs/helpers/*.js'],
                data: 'source/hbs/data/*.json'
            },
            site: {
                expand: true,
                cwd: 'source/hbs/pages/',
                src: ['**/*.hbs'],
                dest: 'public/'
            }
        },

        uglify: {
            options: {
                mangle: {
                    except: [
                        'jQuery',
                        'Backbone',
                        'Spinner',
                        '$',
                        'enquire',
                        'respond',
                        'Bootstrap',
                        'R',
                        'Raphael'
                    ]
                }
            }
        },

        sass: {
            develop: {
                options: {
                    sourceMap: true
                },
                files: {
                    'source/scss/style.css': 'source/scss/style.scss'
                }
            }
        },

        autoprefixer: {
            browers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],

            dist: {
                files: {
                    'source/scss/stylePrefixed.css': 'source/scss/style.css'
                }
            }
        },

        "bower-install-simple": {
            options: {
                color: true,
                directory: "bower_components"
            },
            "dev": {
                options: {
                    production: false
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 1111,
                    base: 'public',
                    livereload: true,
                    open: 'http://localhost:1111'
                }
            }
        },

        webfont: {
            icons: {
                src: './source/media/images/icon-font/*.svg',
                dest: './source/fonts/project-icon/'
            },
            options: {
                font: 'project-icon',
                normalize: true,
                syntax: 'bootstrap',
                relativeFontPath: '../fonts/project-icon/',
                htmlDemo: true,
                engine: 'node',
                descent: 0,
                templateOptions: {
                    baseClass: 'project-icon',
                    classPrefix: 'project-icon-',
                    mixinPrefix: 'project-icon-'
                }
            }
        },

        copy: {
            media: {
                files: [
                    {
                        expand: true,
                        cwd: 'source/media',
                        src: ['**/*', '!images'],
                        dest: 'public/media'
                    }
                ]
            },
            font: {
                files: [
                    {
                        expand: true,
                        cwd: 'source/fonts',
                        src: ['**/*', '!project-icon.css'],
                        dest: 'public/fonts'
                    }
                ]
            },
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'source',
                        src: ['index.html'],
                        dest: 'public'
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'source/scripts',
                        src: ['**/*'],
                        dest: 'public/scripts'
                    }
                ]
            }

        },

        useminPrepare: {
            html: 'source/index.html',
            options: {
                dest: 'public'
            }
        },

        usemin: {
            html: 'public/index.html'
        },

        clean: ["public/**/*.html"],

        concat: {
            options: {
                separator: ';'
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'public/css/style.min.css': ['source/scss/stylePrefixed.css']
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'source/media/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/media/images'
                }]
            }
        },

        watch: {
            options: {
                livereload: true
            },
            assemble: {
                files: ['source/hbs/**/*.hbs', 'source/hbs/**/*.json'],
                tasks: ['uglify', 'sass'],
                options: {
                    spawn: false
                }
            },
            js: {
                files: 'source/scripts/*.js',
            },

            scss: {
                files: 'source/scss/**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: false
                }
            },
            css: {
                files: 'public/css/**/*.css',
                tasks: []
            }
        }
    });

    // Tasks
    grunt.registerTask('build', [
        'bower-install-simple',
        'sass',
        'autoprefixer',
        'imagemin',
        'clean',
        'copy',
        'cssmin',
        'useminPrepare',
        'concat',
        'uglify',
        'usemin']);

    grunt.registerTask('default', [
        'sass',
        'autoprefixer',
        'clean',
        'copy',
        'cssmin',
        'connect',
        'watch']);
    grunt.registerTask('generateIconFont', ['webfont', 'copy:css_to_scss'])
};
