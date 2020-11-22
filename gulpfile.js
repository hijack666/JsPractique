"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

const dist = "./dist/";
// const dist = "F:/OpenServer/domains/JsPractique";  // Можно компилить сразу куда требуется


gulp.task("copy-html", () => {
    return gulp.src("./src/index.html") //берем хтмл
                .pipe(gulp.dest(dist)) //перемещаем в папку дист
                .pipe(browsersync.stream()); //запускаем браузерсинк, чтобы страница обновилась
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({ // запускаем вебпак, конфиг вебпака
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false, // другая задача будет отслеживать
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*") // берем любые папки и файлы в папке ассетс
                .pipe(gulp.dest(dist + "/assets")) //перемещаем в дист/ассетс
                .on("end", browsersync.reload); //релоад
});

gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/", // отслеживает файлы в папке дист
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/index.html", gulp.parallel("copy-html")); //такс copy-html, если было изменение в файле
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js")); // запускаются параллельно три задачи

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build")); // 2 задачи параллельно, билд и вотч