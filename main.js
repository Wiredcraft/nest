/*global window:true*/

const BrowserWindow = require('browser-window')
const crashReporter = require('crash-reporter')
const path = require('path')
const app = require('app')
const fs = require('fs')
const mkdirp = require('mkdirp')

require('electron-debug')()

crashReporter.start()

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit()
})

app.on('ready', function () {
  window = new BrowserWindow({
    title: 'Myanmar TRM',
    icon: path.join(__dirname, 'assets/images/logo.png'),
    width: 1440,
    height: 800
  })

  window.loadUrl('file://' + __dirname + '/dist/index.html')

  window.on('closed', function () {
    window = null
  })

  const desktopDir = path.resolve(process.env.HOMEPATH || process.env.HOME, 'Desktop', 'myanmarTRM')

  fs.stat(desktopDir, function (err, stats) {
    if (err) {
      mkdirp(desktopDir, function (err) {
        if (err) throw err

        mkdirp(path.join(desktopDir, 'scanned_files'), function (err) {
          if (err) throw err
        })

        mkdirp(path.join(desktopDir, 'renamed_files'), function (err) {
          if (err) throw err
        })
      })
    }
  })
})
