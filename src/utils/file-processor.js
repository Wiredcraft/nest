/* global electronRequire */
var remoteRequire = electronRequire('remote')

var path = remoteRequire.require('path')
var fs = remoteRequire.require('fs')
var fse = remoteRequire.require('fs-extra')
var unzip = remoteRequire.require('unzip')
var zipFolder = remoteRequire.require('zip-folder')
var process = remoteRequire.require('process')
var cwd = process.cwd()
import assign from 'react/lib/Object.assign'

/**
 * mv a given file to the target directory with new name
 * @param  {String}   source   path to the source file
 * @param  {String}   fileName new filename
 * @param  {Function} cb       The callback function
 */
export function renameFile (source, fileName, cb) {
  const parsedSource = path.parse(source)
  const targetObject = assign({}, parsedSource, {
    name: fileName,
    base: `${fileName}${parsedSource.ext}`,
    dir: parsedSource.dir.replace('scanned_files', 'renamed_files')
  })
  const target = path.format(targetObject)

  fse.move(source, target, cb)
}

/**
 * unzip a given zip file to the target folder
 * @param  {String}   source the path to the zip file
 * @param  {Function} cb     The callback function
 */
export function unzipTract (source, cb) {
  const dataDir = path.join(cwd, './data')

  let unzipExtractor = unzip.Extract({ path: dataDir })
  unzipExtractor.on('error', (err) => {
    cb(err)
  })
  unzipExtractor.on('close', cb)

  fs.createReadStream(source).pipe(unzipExtractor)
}

export function zipRenamedFiles (townshipName, cb) {
  const now = new Date()
  const timeStamp = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds()
  const desktopDir = path.resolve(process.env.HOMEPATH || process.env.HOME, 'Desktop')
  const srcDir = path.join(desktopDir, 'myanmarTRM', 'renamed_files')
  const distDir = path.join(desktopDir, `${townshipName || 'archive'}-${timeStamp}.zip`)

  zipFolder(srcDir, distDir, cb)
}
