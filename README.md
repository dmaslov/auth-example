auth-example
============

Example of social networks authentication with AngularJS and hello.js


Note:
============

This example implements authentication via twitter only, you can find out how to add other networks in hello.js [documentation](http://adodson.com/hello.js/)

How to run:
============

At first need to register twitter app. Check this [link](http://iag.me/socialmedia/how-to-create-a-twitter-app-in-8-easy-steps/) to find out how to do that.

Next step is to add ```client_id``` from registered twiter app to ```dev/js/app.js``` file. Search for string:

```
hello.init({twitter: 'client_id_here'}
```

And replace ```client_id_here``` string.


Next step is to add ```client_id``` and ```client_secret``` to proxy server settings in ```server.js``` file. Search for:

```
oauthshim.init({
  'client_id_here' : 'client_secret_here'
});
```

And replace ```client_id_here``` and ```client_secret_here``` with your data.

Ok, then navigate in terminal to project folder and run:

Install server side dependencies
```
npm install
```


Install client side dependencies
```
bower install
```


Combine js files
```
gulp
```


Run the server
```
npm start
```

License:
============

[MIT License](http://opensource.org/licenses/MIT)
