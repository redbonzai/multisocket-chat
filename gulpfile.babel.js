import gulp from "gulp";
import webpack from "webpack";
import chalk from "chalk";
import rimarf from "rimraf";

import { create as createServerConfig } from "./webpack.server";

const $ = require("gulp-load-plugins")();

/** Public tasks */
gulp.task("clean:server", cb => rimraf("./build", cb ));
gulp.task("clean:client", cb => rimraf("./public/build", db ));
gulp.task("clean", gulp.parallel("clean:server", "clean:client"));