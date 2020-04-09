import {info, success, warning} from "./helpers/chalk";
import {readFile, writeToFile} from "./helpers/fs";
import {filter, map, switchMap, tap} from "rxjs/operators";
import {concat, Observable} from "rxjs";
import * as glob from 'glob';

function getAllFiles() {
  info('Crawling angular application files...');
  return new Observable(obs => glob('src/**/*.ts', {}, (err, matches) => {
    if (err)
      obs.error(err);

    if (matches.length === 0) {
      warning('WARNING: No files found, aborting. Make sure you have an \'src\' folder.');
    } else {
      success(`${matches.length} files found!`);
    }
    obs.next(matches)
  }));
}

const importReg = new RegExp(/@acpaas-ui\/ngx-components\//g);

function findAndReplaceOldImports(file) {
  return readFile(file).pipe(
    map(buffer => buffer.toString()),
    filter(contents => importReg.test(contents)),
    tap(() => info(`Updating import paths in ${file}`)),
    map(contents => contents.replace(importReg, '@acpaas-ui/ngx-')),
    switchMap(newContents => writeToFile(file, newContents))
  )
}


function run() {
  return getAllFiles().pipe(
    switchMap((files) => concat(...files.map(file => findAndReplaceOldImports(file))))
  )
}

run().subscribe();
