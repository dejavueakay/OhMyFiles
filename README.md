# OhMyFiles

OhMyFiles is a school project at the University of St. Gallen. This application is designed to synchronize files securely via SSH + rsync so you always have a backup of your important files. It runs on Mac OS X.


## Goal

The goal of this project is to make use of one of the safest file transfer mechanisms (SSH + rsync) to instantly backup files from your computer. The inspiration came from being dependent on third party applications (like Google Cloud, DropBox or even self-hosted applications like ownCloud). When using a cloud provider, you give up control of your files. When using a self-hosted solution, you need to take care of updating the application, otherwise your solution will end up having security holes.

## Prerequisites

What you will need before starting:

* **rsync** installed on your computer
* **node v.13.2** and **git**.
* a remote server with **SSH** installed and access to it via ssh key

# Installation


You will need to run the following commands in a terminal.


This software was tested using Mac OS X Mojave 10.14.6, node v13.2.0 and npm 6.13.1.

Install [Homebrew](https://brew.sh/). Homebrew is a package manager for Mac OS X.

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
``` 

Install node

```
brew install node
```

Install rsync

```
brew install rsync
```

Install git if you do not have it installed already

```
brew install git
```

Clone the repository

```
git clone https://github.com/dejavueakay/OhMyFiles.git
```

Change to the repo directory and install npm dependencies

```
cd OhMyFiles && npm install
```

If none of these commands returned an error, you are set to go!


# Usage


First, create a ssh key. Because of the automatic nature of this software, it is advised to either not set a passphrase for your key or use a ssh-agent for managing keys with passphrases. This example will show how to do it without a passphrase.
Open your terminal and type in:
```
ssh-keygen
```

It will ask you for the file name and location. You will need the location of the file later on, so use something easy. Also, this key will grant access to your files, so keep it in a safe spot! As mentioned earlier, do not set a passphrase. The program will now generate a ssh key for you. Now, in order to be able to access your remote SSH server via key, you need to add it to the authorized_keys file on your remote machine.
```
ssh-copy-id -i ~/.ssh/mykey user@host
```

Replace "~/.ssh/mykey" with the file from above and "user@host" with your remote machine infos. After that, you are ready to use the program. go to the cloned directory and run:
```
node main.js -d [local dir] -s user@host:[remote dir] -i [private key file]
```

The program will now run until you close the window. Here is an example on how the command could look:
```
node main.js -d /Users/akay/Documents/omf/ -s omf@127.0.0.1:/home/omf -i omf.key
```




# DISCLAIMER

Read the following disclaimers carefully before using this software.

* This software IS NOT INTENDED FOR PRODUCTION USE. 
* I am in no way responsible for any damage this software might cause. USE AT YOUR OWN RISK.

## Built With

* [nodejs](https://nodejs.org/en/) - The javascript Runtime
* [rsync](https://linux.die.net/man/1/rsync) - file copying tool



## Authors

* **Ilija Bajunovic** - [dejavueakay](https://github.com/dejavueakay)


## Acknowledgments

* [Patrick McElhaney](https://stackoverflow.com/a/40896897) - Code snippet to list all directories recursively - Thank you!
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) - README.md template