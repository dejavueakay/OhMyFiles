# OhMyFiles

OhMyFiles is a school project at the University of St. Gallen. This application is designed to synchronize files securely via SSH + rsync so you always have a backup of your important files.


## Goal

The goal of this project is to make use of one of the safest file transfer mechanisms (SSH + rsync) to instantly backup files from your computer. The inspiration came from being dependent on third party applications (like Google Cloud, DropBox or even self-hosted applications like ownCloud). When using a cloud provider, you give up control of your files. When using a self-hosted solution, you need to take care of updating the application, otherwise your solution will end up having security holes.

## Prerequisites

What you will need before starting:

* **rsync** installed on your computer
* If you do not want to use the binaries but rather want to run it with node, **node v.13.2** and **git**.
* a remote server with **SSH** installed and access to it via ssh key

# Installation

## Using node

You will need to run the following commands in a terminal.

### Mac OS X

This software was tested using Mac OS X Mojave 10.14.6, node v13.2.0 and npm 6.13.1.

Install Homebrew. Homebrew is a package manager.

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

### Windows



## Using the binaries

### Mac OS X

### Windows

# Usage

## Mac OS X

## Windows





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