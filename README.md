# Daily Tasks

## Update local copy of a repository online with the latest version

1. Terminal: navigate to the local copy of the repo  
   `cd ~/Northeastern/github/cs5610/CS5610_ClassRepo`
2. Make a local copy of the repo  
   `git pull`

## Copy each Assignment from local copy of professor's repo to the local copy of my repo

1. Terminal: navigate to ~/Northeastern/github/cs5610  
   `cd ~/Northeastern/github/cs5610`
2. copy first assignment from professor's repo to mine (local repos)  
   `cp -r CS5610_ClassRepo/L1-files cs5610_audreyjo`

## Commit and push changes to my repo

1. Check if any changes have been made since last commit  
   `git status`
2. Add all changes to git staging directory  
   `git add .`
3. Make a commit
   - with a short message  
     `git commit -m "Initial commit"`
   - with a long message  
     `git commit`
4. Create a tag
   - tag an old commit
     `git tag -a "assignment1" -m "Assignment 1" [commit_sha]`
   - tag the last commit
     `git tag -a "assignment1" -m "Assignment 1"
5. View all commit messages  
   `git log`
6. View all tags
   `git tag`
7. Push changes to remote repository (push tags as well)
   `git push --tags`

# One Time Setup

## Install VirtualBox on Mac

1. Go to https://www.virtualbox.org
2. Click _Download VirtualBox 6.1_
3. Click _OS X hosts_ for the download to start
4. Follow the instructions to install VirtualBox

## Download Ubuntu Server

1. Go to https://ubuntu.com
2. Click _Download_
3. Click _Get Ubuntu Server_
4. Click _Option 2 - Manual server installation_
5. Click _Download Ubuntu Server 20.04.3 LTS_

## Create an Ubuntu Server Virtual Machine on VirtualBox

1. Open VirtualBox
2. Click New and fill in the information
   Name _Ubuntu Server_
   Type _Linux_
   Version _Ubuntu (64-bit)_
3. Accept all defaults for the rest to create the VM
4. Click Settings for the Ubuntu Server
5. Set Storage

- Click _Empty_ under _Controller: IDE_
- Click Choose a Disk File
- Click the downloaded ubuntu server .iso file

9. Disable Audio
10. Enable Network

- Attached to: Bridged Adapter
- Promiscuous Mode: Allow all

11. Display

- 200%

12. Close Settings
13. Start Ubuntu Server
14. Accept all defaults for set up
15. Restart Ubuntu Server when prompted
16. After reboot, do a Headless Start
17. Click Show, then run  
    `ifconfig -a`
18. If it failed, then run

```
sudo apt instal net-tools
if config -a
```

19. Copy the inet for enp0s3
20. Close the Terminal for Ubuntu Server (continue running in background)
21. Open the Terminal on Mac
22. SSH into Ubuntu Server on VirtualBox  
    `ssh username_ubuntu_server@enp0s3_inet_ubuntu_server`
23. Open up specific ports on the Ubuntu Server and lock the rest of the ports by using ufw (ubuntu firewall), which can only be run by super user.

```
sudo bash # start super user shell
ufw allow 22/tcp # allows ssh
ufw allow 80/tcp # allows normal HTTP
ufw allow 443/tcp # allows HTTPS
ufw allow 4000/tcp # allows the Phoenix dev server
ufw allow 5000/tcp # allows the dev server for Heroku
ufw allows 3000/tcp # allows local test/dev server
ufw enable # turns on the firewall and block all unmentioned ports
exit # exit super user shell
```

## How to install NodeJS on Ubuntu Server in VirtualBox

\*Source: (Installing NodeJS via package manager)[https://github.com/nodesource/distributions/blob/master/README.md#debinstall]

1. Start Ubuntu Server and ssh into it from Mac Terminal
2. Download Node JS installation files  
   `curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -`
3. Install NodeJS  
   `sudo apt-get install -y nodejs`
4. Install Build-Essentials  
   `sudo apt-get install -y build-essential`
5. Install npm (install the latest version as suggested)
   `sudo npm install -g npm@7.23.0`
6. Uninstall express  
   `npm uninstall express`
7. Reinstall express version 4 to match the textbook
   `npm install express@4`

## How to connect to Ubuntu Server on VirtualBox from Mac?

**Generate a new SSH key**

1. open Terminal on Mac
2. generate a new SSH key using your email  
   `ssh-keygen -t ed25519 -C "audreyjo35@gmail.com"`
3. prompts for "Enter file in which to save the key"  
   `.ssh/id_ed25519`
4. <kbd>return</kbd> to skip providing a passphrase
5. open config file for editing  
   `open ~/.ssh/config`
6. if the command fails, then try  
   `touch ~/.ssh/config`
7. edit the file as shown below, then save and close the file
   ```
   Host ubuntu
   HostName enp0s3_inet
   User git
   IdentityFile ~/.ssh/id_ed25519
   ```

**Add a new SSH key to Ubuntu Server on VirtualBox**

1. Copy the public keyfile to the home folder on the Ubuntu Server on VirtualBox
   `scp .ssh/id_rsa.pub username_for_ubuntu_server@enp0s3_inet_for_ubuntu_server:`
2. Log into Ubuntu Server
   `ssh username_for_ubuntu_server@enp0s3_inet_for_ubuntu_server`
3. Add the contents of the copied public key to the authorized keys file on the Khoury server
   `cat id_rsa.pub > .ssh/authorized_keys`
4. Exit the Ubuntu Server
   `exit`

**Test your SSH connection**

1. open Terminal on Mac
2. connect to Ubuntu Server on VirtualBox using SSH  
   `ssh ubuntu`
3. you may see a warning "Are you sure you want to continue connecting?"  
   `yes` + <kbd>return</kbd>

## Set Global Defaults for Git

**Set user and email to match the GitHub account used**  
Once the user name and email match the GitHub account used to commit, the commit author will match the GitHub account owner when posting the commits.  
If set for local, then it gets reset after a while. It's easier to update the global user and email every time you want to switch git accounts.

- `git config --global user.name "Audrey Jo"`
- `git config --global user.email "audreyjo@login-students.ccs.neu.edu"`

Set editor: `git config --global core.editor vim`

## How to connect to Khoury GitHub from Ubuntu Server on VirtualBox using a key?

**Generate a new SSH key**

1. open Terminal on Mac and log into Ubuntu Server on VirtualBox
2. generate a new SSH key using your Khoury GitHub email  
   `ssh-keygen -t ed25519 -C "audreyjo@login-students.ccs.neu.edu"`
3. prompts for "Enter file in which to save the key"  
   `.ssh/id_ed25519`
4. <kbd>return</kbd> to skip providing a passphrase
5. open config file for editing  
   `vi ~/.ssh/config`
6. if the command fails, then try  
   `touch ~/.ssh/config`
7. edit the file as shown below, then save and close the file
   ```
   Host neu
   HostName github.ccs.neu.edu
   User git
   IdentityFile ~/.ssh/id_ed25519
   ```

**Add a new SSH key to Khoury GitHub**

1. open Terminal on Mac and log into Ubuntu Server on VirtualBox
2. copy the SSH public key to your clipboard by running the command below, then cmd + C to copy  
   `vi ~/.ssh/id_ed25519.pub`
3. browser: log into Khoury GitHub
4. click the profile photo
5. click Settings
6. click SSH and GPG keys
7. click New SSH key
8. Fill in the Title and Key as shown below  
   Title: _Ubuntu Server_  
   Key: _paste the key copied from Terminal_
9. click Add SSH key
10. confirm your GitHub password

**Test your SSH connection**

1. open Terminal
2. connect to GitHub using SSH  
   `ssh neu`
3. you may see a warning "Are you sure you want to continue connecting?"  
   `yes` + <kbd>return</kbd>
4. if the following prompt is returned then SSH connection is working correctly
   Hi username! You've successfully authenticated, but GitHub does not provide shell access.

## Clone Professor's Repository on Khoury GitHub to Ubuntu Server on VirtualBox

1. Get the link for professor's repository

- Browser: navigate to the professor's repo
- Click Code
- Click SSH and copy the link

2. On Terminal, ssh into Ubuntu Server on VirtualBox
3. Navigate to the folder to save the cloned repo
   `cd ~`
4. Replace git@github.ccs.neu.edu: with git clone neu:  
   `git clone neu:sav/CS5610_ClassRepo.git`

## Clone My Repository on Khoury GitHub to Ubuntu Server on VirtualBox

1. Copy the link to my repo

- Browser: navigate to my repo
- Click Code
- Click SSH and copy the link

2. On Terminal, ssh into Ubuntu Server on VirtualBox
3. Navigate to the folder to save the cloned repo
   `cd ~`
4. Replace git@github.ccs.neu.edu: with git clone neu:  
   `git clone neu:audreyjo/cs5610_audreyjo.git`

## Getting Started on Heroku with Node.js on Ubuntu (VirtualBox)

Follow the instructions (here)[https://devcenter.heroku.com/articles/getting-started-with-nodejs]

**Troubleshooting Errors I encountered**

1. Install Heroku on Ubuntu Server in VirtualBox.  
   Use `-i` flag when logging into Heroku from the command line.  
   `heroku login -i`
2. Open http://localhost:5000 from browser on my Mac
   Run `ifconfig -a` on Ubuntu Server on VirtualBox.
   Find the inet for enp0s3
   The address should be http://enp0s3_inet:5000
