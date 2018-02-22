# CourseWatcher

## Setup
Install npm in your local machine.
On Linux, this can be accomplished by doing `sudo apt install npm`.

You may encouter a `/usr/bin/node` is not found. Simply symbolic link from `/usr/bin/nodejs` by doing on Linux: `sudo ln -s /usr/bin/nodejs /usr/bin/node`

### MongoDB
We need to setup a local version of MongoDB to run cobalt locally.

In order to do this, install MongoDB and run
```
sudo service mongod start
mongo --host 127.0.0.1:27017 # Remember the port you choose.
```
More information can be found [here](https://docs.mongodb.com/manual/reference/program/mongo/#cmdoption-mongo-host).

Once it's up and running, take note of the server URI. It should look something like `mongodb://127.0.0.1:27017`

### Running Cobalt locally
Following that, we need to run our cobalt service locally.

Install cobalt by doing `sudo npm install -g cobalt-uoft`.

Using the port above, set the environment variable `COBALT_MONGO_URI` to the MongoDB server that it's hosted on. Using the value above, we should set `COBALT_MONGO_URI=mongodb://127.0.0.1:27017`

Now just run `cobalt` and you can access the api using something like `127.0.0.1:4242/1.0/courses`

More information can be found [here](https://github.com/cobalt-uoft/documentation/blob/master/getting-started/self-hosting.md)
