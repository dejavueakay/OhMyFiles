/*

AUTHOR: ILIJA BAJUNOVIC
LICENSE: MIT, SEE LICENSE
DESCRIPTION: This is the main entry point for this application.

*/

// command line options
const optionDefinitions = [
    { name: 'identity', alias: 'i', type: String },
    { name: 'server', alias: 's', type: String },
    { name: 'directory', alias: 'd', type: String },
    { name: 'help', alias: 'h', type: Boolean },
]


// Import libraries
const Rsync = require('rsync')
const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)
const filewatcher = require('filewatcher')
const log2file = require('log-to-file')
const fs = require("fs")
const path = require('path')



// Logging
const log = (msg) => {
    console.log(msg)
    log2file(msg, 'omf.log')
}


// Help print
if (options.help === true) {
    console.log('Usage:                 node main.js -i identity.key -s server -d directory [-h]')
    console.log('Description:           A file-syncer written in node.js.')
    console.log('GitHub:                https://github.com/dejavueakay/OhMyFiles')
    console.log()
    console.log('Arguments:')
    console.log(' -i identity.key       the SSH authentification key')
    console.log(' -s server             remote server and dir, ex.: akay@127.0.0.1/home/akay/files')
    console.log(' -d directory          local directory to sync')
    console.log(' -h                    Print this help')
    console.log()
    process.exit()
}

// Initiation of App
// Check if arguments are given and if local directory is valid.
// After that, do a initial sync
log("Starting OhMyFiles! - Initiation")

if (!options.identity) {
    log("Error: missing ssh identity (-i). See --help for more information.")
    process.exit(1)
} else if (!fs.existsSync(options.identity)) {
    log("Error: ssh identity file (-i) does not exist!")
    process.exit(1)
}

if (!options.server) {
    log("Error: missing server (-s). See --help for more information.")
    process.exit(1)
}

if (!options.directory) {
    log("Error: missing local directory (-d). See --help for more information.")
    process.exit(1)
} else if (!fs.existsSync(options.directory)) {
    log("Error: local directory (-d) does not exist!")
    process.exit(1)
}

// Get a list of all subdirs
// Source: https://stackoverflow.com/questions/18112204/get-all-directories-within-directory-nodejs
// Comments are my own, I wrote them in order to understand what is happening
// Helper function, which flattens an array. Arrays in the array get all lifted up to a single level.
function flatten(lists) {
    return lists.reduce((a, b) => a.concat(b), [])
}

// This function gets all directories in a given path and returns them in an array.
function getDirectories(srcpath) {
    return fs.readdirSync(srcpath)
        .map(file => path.join(srcpath, file))
        .filter(path => fs.statSync(path).isDirectory())
}

// This function walks through the given source path recursively and calls itself again
// it adds every found dir to the array which gets returned
function getDirectoriesRecursive(srcpath) {
    return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))]
}

// End source

// Get all directories so we can add them to the file watcher
var watchDirs = getDirectoriesRecursive(options.directory)

// This function looks for new directories and refreshes the watchDirs variable. At the same time
// it adds a new file watcher and starts a synchronisation.
// this function will be called every minute, see below.
const refreshDirList = () => {
    let newDirs = getDirectoriesRecursive(options.directory)
    newDirs.forEach(el => {
        let found = true
        for (var i = 0; i < watchDirs.length; i++) {
            if (el === watchDirs[i]) {
                found = true
                break
            } else {
                found = false
            }
        }
        if (!found) {
            log("Found new folder: " + el)
            watcher.add(el)
            watchDirs.push(el)
            syncIt()
        }
    })
}

// Check for any directory changes every minute
setInterval(function () {
    log("Refreshing Directory watch list")
    refreshDirList()
}, 60000)

// Here we build the rsync command on which all our operations will base on.
var rsync = Rsync.build({
    source: options.directory,
    destination: options.server,
    flags: 'avz',
    delete: true,
    shell: 'ssh -i ' + options.identity
})

// Keep track if we are already syncing right now. 
// We need this in order to avoid racing, we only want one sync process at a time.
var isSyncing = false

// Primary function to synchronise.
const syncIt = () => {
    if (isSyncing) {
        // try again in 2 seconds
        log("Sync in progress. Trying again in two seconds.")
        setTimeout(function () { syncIt() }, 2000)
    } else {
        isSyncing = true
        log("Beginning Rsync.")
        rsync.execute(function (error, code, cmd) {
            if (error) {
                log('Something went wrong while syncing. Error message:' + error)
                process.exit(1)
            } else {
                log('Rsync finished.')
                isSyncing = false
            }
        })
    }
}

log("Config Check OK, beginning initial sync to remote server")
syncIt()

// Filewatcher
// This is the main process of this program. Here, we watch for file changes 
// and call rsync if we see something.
var watcher = filewatcher()

watchDirs.forEach(e => {
    watcher.add(e)
})


watcher.on('change', function (file, stat) {
    log('Detected modification')
    syncIt()

})





