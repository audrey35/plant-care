# Daily Tasks

## Update local copy of a repository online with the latest version
Terminal: navigate to the local copy of the repo
`cd ~/Northeastern/github/cs5610/CS5610_ClassRepo`
`git pull`

## Copy each Assignment from local copy of professor's repo to the local copy of my repo
Terminal: navigate to ~/Northeastern/github/cs5610
`cd ~/Northeastern/github/cs5610`
copy first assignment from professor's repo to mine (local repos)
`cp -r CS5610_ClassRepo/L1-files cs5610_audreyjo`

## Commit and push changes to my repo
- Check if any changes have been made since last commit
`git status`
- Add all changes to git staging directory
`git add .`
- Make a commit with a short message
`git commit -m "Initial commit"`
- Make a commit with a long message
`git commit`
- [If you get error: gpg failed to sign the data](https://stackoverflow.com/a/57442957)
```touch a.txt
gpg --sign a.txt
rm a.txt
rm a.txt.gpg
```
- View all commit messages
`git log`
- Push changes to remote repository
`git push`

# One Time Setup

## Set Global Defaults for Git
Set user as GPG signing key (committor is set to GitHub account)
Note: create a GPG key for GitHub prior to setting this
`git config --global user.signingkey [GPG key ID]`
`git config --global user.name "Audrey Jo"`
`git config --global user.email "audreyjo35@gmail.com"`
Sign commits by default
`git config --global commit.gpgsign true`
Set editor
`git config --global core.editor vim`

## Set Local Defaults for Git
These commands need to be executed once for every repo that needs to be set. Navigate to the repo, then run the commands.
Set user as GPG signing key (committor is set to Khoury account)
Note: create a GPG key for Khoury GitHub prior to setting this
`git config user.signingkey [GPG key ID]`
`git config user.email "audreyjo@login-students.ccs.neu.edu"`

## How to connect to GitHub from Mac using a key?
Source: Connecting to GitHub with SSH (docs.github.com)
SSH key: you can connect to GitHub without supplying your username and personal access token at each visit

*Generate a new SSH key*
1. open Terminal
2. generate a new SSH key using your GitHub email
`ssh-keygen -t ed25519 -C "audreyjo35@gmail.com"`
3. prompts for "Enter file in which to save the key"
`.ssh/github_ed25519`
4. <kbd>return</kbd> to skip providing a passphrase
5. Add your SSH key to the ssh-agent (a background program that handles password for SSH private keys)
`eval "$(ssh-agent -s)"`
6. open config file for editing
`open ~/.ssh/config`
7. if the command fails, then try
`touch ~/.ssh/config`
8. edit the file as shown below, then save and close the file
```Host github
HostName github.com
User git
AddKeysToAgent yes
IdentityFile ~/.ssh/github_ed25519
```
9. add your SSH private key to the ssh-agent
`ssh-add ~/.ssh/github_ed25519`

*Add a new SSH key to GitHub*
1. open Terminal
2. copy the SSH public key to your clipboard
`pbcopy < ~/.ssh/github_ed25519.pub`
3. browser: log into GitHub
4. click the profile photo
5. click Settings
6. click SSH and GPG keys
7. click New SSH key
8. Fill in the Title and Key as shown below
Title: _Personal MacBook Pro_
Key: _paste the key copied from Terminal_
9. click Add SSH key
10. confirm your GitHub password

*Test your SSH connection*
1. open Terminal
2. connect to GitHub using SSH
`ssh github`
3. you may see a warning "Are you sure you want to continue connecting?"
`yes` + <kbd>return</kbd>
4. if the following prompt is returned then SSH connection is working correctly
Hi username! You've successfully authenticated, but GitHub does not provide shell access.

## How to connect to Khoury GitHub from Mac using a key?
*Generate a new SSH key*
1. open Terminal
2. generate a new SSH key using your Khoury GitHub email
`ssh-keygen -t ed25519 -C "audreyjo@login-students.ccs.neu.edu"`
3. prompts for "Enter file in which to save the key"
`.ssh/neu_ed25519`
4. <kbd>return</kbd> to skip providing a passphrase
5. Add your SSH key to the ssh-agent (a background program that handles password for SSH private keys)
`eval "$(ssh-agent -s)"`
6. open config file for editing
`open ~/.ssh/config`
7. if the command fails, then try
`touch ~/.ssh/config`
8. edit the file as shown below, then save and close the file
```Host neu
HostName github.ccs.neu.edu
User git
AddKeysToAgent yes
IdentityFile ~/.ssh/neu_ed25519
```
9. add your SSH private key to the ssh-agent
`ssh-add ~/.ssh/neu_ed25519`

*Add a new SSH key to Khoury GitHub*
1. open Terminal
2. copy the SSH public key to your clipboard
`pbcopy < ~/.ssh/neu_ed25519.pub`
3. browser: log into GitHub
4. click the profile photo
5. click Settings
6. click SSH and GPG keys
7. click New SSH key
8. Fill in the Title and Key as shown below
Title: _Personal MacBook Pro_
Key: _paste the key copied from Terminal_
9. click Add SSH key
10. confirm your GitHub password

*Test your SSH connection*
1. open Terminal
2. connect to GitHub using SSH
`ssh neu`
3. you may see a warning "Are you sure you want to continue connecting?"
`yes` + <kbd>return</kbd>
4. if the following prompt is returned then SSH connection is working correctly
Hi username! You've successfully authenticated, but GitHub does not provide shell access.

## How to create a GPG key for GitHub?
Source: Managing commit signature verification (docs.github.com)
GPG key: you can sign your work locally using GPG or S/MIME. GitHub will verify these signatures so other people will know that your commits come from a trusted source.

*Download and install GPG*
1. open Terminal
2. install GPG
`brew install gnupg`

*Generate a new GPG key for GitHub*
1. generate a GPG key pair
`gpg --full-generate-key`
2. at the prompt for specifying key kind, size, length of validity, press <kbd>return</kbd> to accept the defaults (y to set it to never expire)
3. for the subsequent prompts, provide following info
Real name: `Audrey Jo`
Email address: `audreyjo35@gmail.com`
Comment: _leave blank and simply press <kbd>return</kbd>_
4. at prompt, type O for Okay
5. provide a passphrase
6. list the long form of the GPG keys
`gpg --list-secret-keys --keyid-format=long`
7. From the list of GPG keys, copy the long form of the GPG key ID you'd like to use. In this example, the GPG key ID is `3AA5C34371567BD2`. Check the uid to check if it's the GPG key you want.
```$ gpg --list-secret-keys --keyid-format=long
/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
uid                          Hubot 
ssb   4096R/42B317FD4BA89E7A 2016-03-10
```
8. print the GPG key ID (substitute GPG key ID with yours)
`gpg --armor --export 3AA5C34371567BD2`
9. copy your GPG key, including `-----BEGIN PGP PUBLIC KEY BLOCK-----` and `-----END PGP PUBLIC KEY BLOCK-----`
10. browser: log into GitHub
11. click on the profile photo, settings, SSH and GPG keys
12. click NEW GPG key, then paste the key copied from Terminal
13. click Add GPG key

*Tell Git about your signing key*
1. open Terminal
2. list the long form of the GPG keys
`gpg --list-secret-keys --keyid-format=long`
3. From the list of GPG keys, copy the long form of the GPG key ID you'd like to use. In this example, the GPG key ID is `3AA5C34371567BD2`. Check the uid to check if it's the GPG key you want.
```$ gpg --list-secret-keys --keyid-format=long
/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
uid                          Hubot 
ssb   4096R/42B317FD4BA89E7A 2016-03-10
```
4. set your GPG signing key in Git by referring to Set Global/Local Defaults for Git section above

## How to create a GPG key for Khoury GitHub?
*Download and install GPG*
1. open Terminal
2. install GPG
`brew install gnupg`

*Generate a new GPG key for Khoury GitHub*
1. generate a GPG key pair
`gpg --full-generate-key`
2. at the prompt for specifying key kind, size, length of validity, press <kbd>return</kbd> to accept the defaults (y to set it to never expire)
3. for the subsequent prompts, provide following info
Real name: `Audrey Jo`
Email address: `audreyjo@login-students.ccs.neu.edu`
Comment: _leave blank and simply press <kbd>return</kbd>_
4. at prompt, type O for Okay
5. provide a passphrase
6. list the long form of the GPG keys
`gpg --list-secret-keys --keyid-format=long`
7. From the list of GPG keys, copy the long form of the GPG key ID you'd like to use. In this example, the GPG key ID is `3AA5C34371567BD2`. Check the uid to check if it's the GPG key you want.
```$ gpg --list-secret-keys --keyid-format=long
/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
uid                          Hubot 
ssb   4096R/42B317FD4BA89E7A 2016-03-10
```
8. print the GPG key ID (substitute GPG key ID with yours)
`gpg --armor --export 3AA5C34371567BD2`
9. copy your GPG key, including `-----BEGIN PGP PUBLIC KEY BLOCK-----` and `-----END PGP PUBLIC KEY BLOCK-----`
10. browser: log into GitHub
11. click on the profile photo, settings, SSH and GPG keys
12. click NEW GPG key, then paste the key copied from Terminal
13. click Add GPG key

*Tell Git about your signing key*

## Clone Professor's Repository on Khoury GitHub to my Mac
Browser: navigate to professor's repo to clone
Click Code, then click SSH and copy the link
Terminal: navigate to the folder to save the cloned repo
`cd ~/Northeastern/github`
Replace git@github.ccs.neu.edu: with git clone neu:
`git clone neu:sav/CS5610_ClassRepo.git`

## Clone My Repository on Khoury GitHub to my Mac
Browser: navigate to my repo to clone
Click Code, then click SSH and copy the link
Terminal: navigate to the folder to save the cloned repo
`cd ~/Northeastern/github`
Replace git@github.ccs.neu.edu: with git clone neu:
`git clone neu:sav/cs5610_audreyjo.git`
Set the GPG signing key to NEU's GPG key
`git config user.signingkey [signing key id]`
Set git to sign commits by default for a local repository
`git config commit.gpgsign true`
