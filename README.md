# React Hero (v0.0.1)

Plugin provides utility directives and services.

## Installation

If you're using bower, you can add this to your bower.json:

```
"ngcore": "git@bitbucket.org:causecode/ngcore.git"
OR
"ngcore": "git@bitbucket.org:causecode/ngcore.git#0.3.2"
```

Add the other bower dependencies to your HTML:

```
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
<script src="bower_components/angular-route/angular-route.js"></script>
<script src="bower_components/angular-touch/angular-touch.js"></script>
<script src="bower_components/angular-superswipe/superswipe.js"></script>
```

And files from `scripts` folder to your HTML:

```
<script src="bower_components/ngcore/scripts/app.js"></script>
```

Or, you can directly use the minified Ngcore files in your application after running `$ grunt uglify`.

```
<script src="bower_components/ngcore/scripts/dist/app.js"></script>
```

## Releasing a new Version

After you have merged everything to the master branch, follow the following steps to release a new version.

1. Uglify all script files `$ grunt uglify`
2. Add all uglified files to the repository `$ git add .` and commit them `$ git commit`
3. Use bump task to release a new version passing required arguments `$ grunt bump`

## Running Test Cases

Using Karma test runner for angular app with Jasmine framework. Before testing app
install all plugin dependencies.

Command: ```karma start {path-to-karma-configuration-file}```

## Detailed Documentation

### Directive: **pagedList**

#### Usage
```
    <paged-list model-name="'Deal'" items-per-page="15" filter="true" template-url="{template-url}"></paged-list>
    Or
    <paged-list model-name="'Deal'" items-per-page="15" filter="true">
        <-- Custom filter code -->
    </paged-list>
```
> model-name : (Required) Model name for which list is getting rendered.
> items-per-page : (Required) Number of items required to on each list page.
> filter : (Required) Boolean value [true|false] for using default filters.
> template-url : (Optional) Path to template which renders list.

#### Functionality

* Paged list directive Uses AngularJS custom injectors for injecting models using argument passed model-name.
* With the help of `baseModel` , list is returned and rendered using default email template.
* Default list template provides Order by and Sort by filters with bulk operation feature.
* Default list template also used `paged-list` directives select All feature. See `html/_list.html` for more reference.
* To use bulk operation on list instances add following code snippet to your controllers scope :
```
    $scope.userActions = {
        {Method Name}: '{Method visible Name}'
    };
```
Example:
```
    $scope.userActions = {
        export: 'Export Report'
    };

```
* On Selecting 'Export Report' operation, scope method `export()` will be executed on selected bulk instances.

### Directive: **filter**

#### Usage
```
    <filter>
        <form ng-submit="filterList()">
            <- HTML elements, Select2 with submit button ->
        </form>
    </filter>
```
> (Required) Parent directive should exist with `getList()` method to execute filter directive.

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

### Directive: **form**

Using form element as directive, so we need not append some attributes to each form to apply custom validations.
To add handler: on-submit, use <code>on-submit</code> instead of <code>ng-submit</code>, since ng-submit directive doesn't care about invalid elements.
```
    <form name="testForm" on-submit="submitData()">
        <- HTML elements with submit type button->
    </form>
```

### Directive: **validationErrors**

A directive which must be applied to every input element on which we need to show custom validations. Those element
must have ng-model attribute defined.

This directive will automatically add has-error class on the parent .form-group element and displays the validation
message automatically.

Custom supported validations are:

    1. For number, add attribute number instead of type number in input class (for int, float & double),
    2. For digits, add attribute digits (only for int),
    3. For minimum length validation, use HTML5 minlength attribute (Will work for non HTML5 browsers),
    4. For maximum length validation, use HTML5 maxlength attribute (Will work for non HTML5 browsers),
    5. For max number validation, use HTML5 max attribute,
    6. For min number validation, use HTML5 min attribute,
    7. For required validation, use HTML5 required attribute.

On any validation error message, a default message will be shown to users, which can be customized dynamically with the
element itself.

For example: If you have a failing minlength validation for which message needs to be customized, we can add a
<code>title-minlength="Some custom message"</code> to the input element itself.

```
    <input type="text" class="form-control" ng-model="instance.numbers" required digits maxlength="9" />
```

### Generating JavaScript documentation.

Run command:
grunt ngdocs
