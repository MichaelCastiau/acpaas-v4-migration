import {take} from "rxjs/operators";
import {Observable} from "rxjs";
import * as fs from 'fs';

export function readFile(file) {
  return new Observable(observer => fs.readFile(file, (err, data) => err ? observer.error(err) : observer.next(data))).pipe(
    take(1)
  )
}

export function writeToFile(file, contents) {
  return new Observable(observer => fs.writeFile(file, contents, (err) => err ? observer.error(err) : observer.next())).pipe(
    take(1)
  )
}
