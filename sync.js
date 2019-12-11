const Rsync = require('rsync')

const log = (msg) => {
    console.log(msg)
}

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
const syncItt = () => {
    if (isSyncing) {
        // try again in 2 seconds
        log("Sync in progress. Trying again in two seconds.")
        setTimeout(function(){ syncIt() }, 2000)
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



export default syncItt