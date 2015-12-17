module.exports = function(grunt) {
	
	grunt.initConfig({
		concat: {
			build : {
				src: ["src/js/*.js", 'tmp/uiKonpasaTemplates.js'],
				dest : "build/uiKonpasa.js"
			}
		},
		html2js: {
		    options: {
		      // custom options, see below
		      module: 'uiKonpasaTemplates'
		    },
		    uiKonpasaTemplates: {
		      src: ['src/**/*.tpl.html'],
		      dest: 'tmp/uiKonpasaTemplates.js'
		    },
		},
		connect: {
			server: {
				options : {
					port: 8001,
					base: 'www',
					keepalive: true,
					open: { 
						target: "http://localhost:8001",
					}
				},
			},
		},
		copy: {
			dist: {
				files: [
					{expand: true, cwd: 'build', src: '*.js', dest: 'dist/uikonpasa'},
					{expand: true, cwd: 'build', src: '*.css', dest: 'dist/uikonpasa'}
				]
			},
			build: {
				files: [
					{ expand: true, cwd: 'src/', src: 'css/*.css', dest: 'build/', isFile: true, flatten: true },
				]
			},
			run: {
				expand: true,
				cwd: 'build/',
				src: '**',
				dest: 'www/uikonpasa/',
				isFile: true
			}
		},
		watch : {
			dist : {
				files: ["src/**/*", "src/css/*"],
				tasks: ['html2js','concat:build', 'copy:build', 'copy:run'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['html2js', 'concat:build', 'copy:build']);
	grunt.registerTask('build-pkg', ['html2js', 'concat:build', 'copy:dist']);

	grunt.registerTask('run', ['copy:run', 'connect:server']);

	grunt.registerTask('serve', ['build', 'build-pkg', 'run']);

}