* [Windows 7 Setup](#windows-7-setup)
* [Windows 10 Setup](#windows-10-setup)
* [Unix Setup](#unix-setup) (Linux, MacOS)

# Unix Setup

1. Install Docker and Git
2. Continue with the [General Setup](#general-setup)

# Windows 10 Setup

## Option 1

1. Start there: [Docker for Windows](https://docs.docker.com/docker-for-windows/)
2. Install everything
3. Continue with the [General Setup](#general-setup)

## Option 2

Give up and continue with Option 2 or 3 of [Windows 7 Setup](#windows-7-setup)

# Windows 7 Setup

## 1. Installing Docker

* **Option 1:** Take a day off, install VirtualBox and the Docker toolbox and a lot of Unixy tools
* **Option 2:** Get a Linux VM, log in and go to [Unix Setup](#unix-setup)
* **Option 3:** Forget it and use [Play with Docker](https://labs.play-with-docker.com/)

Recommended option: **Option 2**!
We describe here **Option 3**

## Preparations for Play with Docker

Play with docker is a great tool to learn Docker and experiment without breaking anything.

1. Sign Up at Docker Hub: https://hub.docker.com/signup
2. Start a Session on Play with Docker: https://labs.play-with-docker.com/
3. Add a new instance
3. To simplify your life continue with the following steps

### Get Putty

Putty is an SSH Client for Windows. Optional. If you do not want 

1. [Download Putty](https://www.putty.org/)
2. Open PuTTYGen and generate a new key pair
3. Copy the displayed public key
4. execute the following command in your Play with docker session:
  ```sh
  echo '<PASTE YOUR PUBLIC KEY HERE>' > ~/.ssh/authorized_keys
  ```
5. Save your private key (no passphrase is needed) and your public key
5. Open PuTTY
6. Set `direct.labs.play-with-docker.com` as the Host Name
7. Go to Connection → SSH → Auth and select the Private key file from above
8. Go to Session and save the session (name: `Play with Docker`)
9. Later you can `Load` the session and can skip to step 8
7. Click on `Open` and accept
8. `Login as:` paste the username from play-with-docker (see the `SSH` text field, and paste everything after `ssh` and before the `@` sign. Example: `ip172-18-0-36-bh3inlc3uhdg00dpt0j0`)
9. You should now be connected. Hurray! If not go to step 1 and verify whether everything is correct
10. Finish [General Setup](#general-setup) and continue with [Get WinSCP](#get-winscp)

### Get WinSCP

1. Download and install [WinSCP](https://winscp.net/eng/download.php).
2. Import the session from Putty
3. Connect to Play with Docker
4. Download the `kafka-bank-showcase` directory (this will take a while…)
5. Change to that directory locally (in WinSCP)
6. Setup `Keep remote up to date` (`CTRL+U`)

### Get an Editor

Download [VSCode](https://code.visualstudio.com/) if you do not have a good Editor

### Glue it together

# General Setup

Execute following in your docker environment:

```sh
git clone https://github.com/azapps/kafka-bank-showcase.git
docker-compose up
```

If you get ALOT of log entries without errors (takes some time on the first startup) – everything was successful.
