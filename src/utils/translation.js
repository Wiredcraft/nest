/* global electronRequire */
var remoteRequire = electronRequire('remote')
var path = remoteRequire.require('path')
var cwd = remoteRequire.require('process').cwd()
var fs = remoteRequire.require('fs')

/**
* Getttext
*/
var Gettext = remoteRequire.require('node-gettext')

var gt = new Gettext()

// add the language you need, here `my` means Myanmar
gt.addTextdomain('en', fs.readFileSync(path.join(cwd, './locale/en.po')))
gt.addTextdomain('my', fs.readFileSync(path.join(cwd, './locale/my.po')))

// set the default domain
gt.textdomain('my')

export default gt
