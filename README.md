# logar
Logar is a simple node.js stdout logger. 
```sh
npm install logar --save
```

## Usage
Logar can be used like this:


Just require the package:
```javascript
var logar = require("logar")("MyApp"[, enableTimestamps]);
```
"MyApp" will be used as keyword. You can leave this empty if you want. If you want to disable timestamps, pass 'false' as second argument.

*Note:* you can also use the LOGAR_KEYWORD environment variable to set the keyword.

#### Basic functions
These are the basic functions of Logar. They have colored output in the console.

```javascript
logar.i("this is an info message"); //ouput an info message
logar.e("this is an error "); //log an error
logar.success("this is a success message"); //log a success message
logar.ll("this is a light message"); //log a light message
logar.warn("this is a warning"); //log a warning
logar.nl(); //create a new line
```
Example output:
```sh
[16:44:37] MyApp: ✓ this is a success message
```


#### Loading function
Logar also has a loading function. It can be used like this:
```javascript
//create a loader instance
var loader = logar.loading("Creating user schemes");

//async call
createSchemesAsync().then(function () {
    //pass the success message if it succeeds (optional)
	loader("Created user schemes succesfully");
}, function (err) {
    //pass an error message/object as second parameter if something went wrong
    //or use 'true' as second parameter
	loader("Error while creating user schemes", err);
});
```