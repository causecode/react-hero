# React Hero (v1.0.0)

Plugin provides utility directives and services.

## Installation

1. `npm Install`
2. `typings Install`
3. `npm run start: dev`

## Releasing a new Version

After you have merged everything to the master branch, follow the following steps to release a new version.

1. Uglify all script files
2. Add all uglified files to the repository `$ git add .` and commit them `$ git commit`
3. Use bump task to release a new version passing required arguments

## Running Test Cases

## Detailed Documentation

### Directive: **pagedList**

#### Usage

#### Functionality

```
* On Selecting 'Export Report' operation, scope method `export()` will be executed on selected bulk instances.

#### Functionality

* Filter directive Uses paged-list directive to filter list according to filters applied with the help of different
HTML element or Select2 element.
* Returns filtered list with custom parameters applied.

### Service: **appService**

#### blockPage
Used to display a block message at center of the page with black backdrop behind it.
```
    appService.blockPage(true);  // Add backdrop
    appService.blockPage(false);  // Remove backdrop
```

#### alert
Used to display an alert message at center of the page.
```
    appService.alert({message}, {type});
```
> message : (Required) Alert Message
> type : (Optional) Type Of Alert.(['success', 'warn', 'info', etc.])

#### confirm
Used to show an confirm message at center of the page, Returns callback to calling method.
```
    appService.confirm({message}, {type}).then( function() {
        // Success Callback
    }, function() {
        // Failure Callback
    });
```
> message : (Required) Alert Message
> type : (Optional) Type Of Alert.(['success', 'warn', 'info', etc.])

#### copy
A generic method which extends usage of angular.copy() method to provide include, exclude options for copying to new object.
```
    var obj = {k1: 1, k2: 2, k3: 3};
    appService.copy(obj, null, ['k1', 'k2']) === {k1: 1, k2: 2};
```

#### showAlertMessage
Used to display alert messages at top of any page.
```
    appService.showAlertMessage({message}, '{type}');
```
> message: (Required) Message to show on alert box
> type: (Optional) type of alert message- success, error, info. Default to 'warning'.

> params: JavaScript object containing two values-
>> element: If other alert message to shown. Default to '#alert-message'.
>> makeStrong: Set it to true if the text in alert message needs to be bold.
>> timeout: Set timeout to automatically hide alert block after a particular time.
>> scrollToAlert: set to true to automatic scroll window to alert message.

#### hideAlertMessage
Used to hide alert messages from page.
```
    appService.hideAlertMessage();
```

#### toQueryString
Used to create query String from parameters received.
```
    appService.toQueryString({parameters})
```
> parameters : Key value pair to be passed as query string.

### Service: **ValidationService**
Used in conjunction with ValidationErrors directive.

### Script File: **String**
Used to perform various string operations.

### Generating JavaScript documentation.
