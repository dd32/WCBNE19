module.exports = function(grunt){
	const sass = require('node-sass');

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			sass: {
				files: ['src/**/*', 'styles.scss'],
				tasks: ['sass', 'postcss', 'australianStylesheets']
			}
		},

		sass: {
			options: {
				sourceMap: true,
				implementation: sass
			},
			dist: {
				files: {
					'dist/style.css': 'styles.scss'
				}
			}
		},

		postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 20 versions']
                    })
                ]
            },
            dist: {
                src: 'dist/*.css'
            }
        },

        australianStylesheets: {

        	no_dest_single: {
                src: 'dist/style.css'
            }

        }

	});

	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-postcss' );
	grunt.loadNpmTasks( 'grunt-australian-stylesheets' );
	grunt.registerTask( 'default', [ 'sass', 'postcss', 'australianStylesheets' ] );
	grunt.registerTask( 'watch', [ 'watch' ] );
};
