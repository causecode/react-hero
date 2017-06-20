# React Hero (v1.1.2)

Plugin provides utility directives and services.

## Installation

1. `npm Install`
2. `typings Install`
3. `npm run start:dev`
4. Installing new typings, eg. `typings install dt~react-dom --global --save`

## Releasing a new Version

After you have merged everything to the master branch, follow the following steps to release a new version.

1. Uglify all script files
2. Add all uglified files to the repository `$ git add .` and commit them `$ git commit`
3. Use bump task to release a new version passing required arguments

## Running Test Cases

    jest --no-cache --coverage

## Detailed Documentation

### 1. ResponsiveView :

  - Used to render device specific Views.
  - Create a Component by extending `ResponsiveView<P, S>` and implement device specific render methods.
  `renderDefault` needs to be implemented if not any other render methods.
  Example:
    ```
    class TestView extends ResponsiveView<ITestViewProps, ITestViewState> {

      renderDefault() {
        return <div></div>
      }
      renderMobile() {
        return <div></div>
      }
      renderMobilePortrait() {
        return <div></div>
      }
      renderTablet() {
        return <div></div>
      }
    }
    ```
- If any render method is not overridden in the implementing app for a particular device type with a specific orientation, then `renderDefault` will be executed.

### 2. HeaderFooterLayout :

- Provides the basic skeleton of a HeaderFooterLayout with some basic styles.

- Usage:
  ```
  render() {
    return (
      <HeaderFooterLayout>
        <HeaderView></HeaderView>
        <ContentView></ContentView>
        <FooterView></FooterView>
        <NavigationMenu></NavigationMenu>
      </HeaderFooterLayout>
      )
  }
  ```
- If `NavigationMenu`component is rendered within the `HeaderFooterLayout` the sliding nav-menu along with the burger icon in the Header will be generated automatically. If it is not defined neither the icon nor the menu will be rendered.
- There are also a few custom Widgets that have been provided for use in the `HeaderFooterLayout` which provide pre defined styles.
eg:
  - `Title`
  - `Description`
  - `Content`
  - `ButtonList`
  - `ButtonListItem`
- `HeaderFooterLayout` accepts a `style` prop to override the default styles:
  ```
  const customStyle = {
      header: {
          padding: '0px',
          background: 'transparent',
      },
      content: {
          overflow: 'auto'
      },
      navIcon: {
          display: 'none'
      },
      nav: {
          backgroundColor: '#EEA303'
      },
      footer: {
          padding: '0px'
      }
  };

  render() {
	    return (
	      <HeaderFooterLayout style={customStyle}>
	        ...
	      </HeaderFooterLayout>
	    )
  }
  ```

### 3 Themeable Layout

- Themeable layout is used in the scenarios when we want to use the same functionality of an app with the different theme/layouts.
- Prerequisites:

    - A default app directrory: `src/default/yourComponentPath`
    - A themed app directory: `src/yourThemeName/yourComponentPath`
    - The theme name should be present in the redux store before the app is rendered. The structure of the store should be:

       ```
       state: {
	          theme: yourThemeName
       }
       ```
- The function `getThemedComponent` accepts two parameters:

    -  `componentPath` : The path of the component from your theme directory.
    -  `componentName` : The component name to be rendered. A component file can have multiple exported modules. Therefore, this parameter is needed

 - Usage:

   ```
   const ThemedComponent = getThemedComponent('Test/HomePage', 'HomePage')

   render(
       <Router history={hashHistory}>
           <Route path="/" component={ThemedComponent}/>
       </Router>
   );
   ```

- If the theme name or the `ThemedComponent` is not found, the component from the `default` directory will get rendered.

### 4 HTTP requests

- Before using this feature the following configuration should be present in the  package.json:

    ```
    "reactHero": {
        "serverUrl": "http://example.com/",
        "APIUrl": "http://example.com/api/version"
    },
    ```

 - `APIUrl` is prefixed to the path provided with every request via `HTTP` module. If the `APIUrl` is not found, `serverUrl` is used.
 - API:

     | Function name   | Parameters                                                                                                                                                   |
     |-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
     |  `postRequest`  |  `path`: The path of the server endpoint. <br/><br/> `headers`(optional): Headers to sent with the request.<br/><br/>  `data`(optional): Data to be sent as the request body     |
     |   `getRequest`  |  `path`: The path of the server endpoint.<br/><br/>  `headers`(optional): Headers to sent with the request.<br/><br/>  `data`(optional): Data to be sent as the query parameters |
     |   `putRequest`  |  `path`: The path of the server endpoint.<br/><br/>  `headers`(optional): Headers to sent with the request.<br/><br/>  `data`(optional): Data to be sent as the request body     |
     | `deleteRequest` |  `path`: The path of the server endpoint.<br/><br/>  `headers`(optional): Headers to sent with the request.                                                            |


### 5 BaseModel

- __resourceName__: String
    - The name of the model for which the CRUD operations are to be performed
    - Example: `static resourceName: string = 'demo';`
- __propTypes__: { [any]: ModelPropTypes }
    - The object containing the properties or the fields on which the operations are to be performed.
    - `ModelPropTypes` should be used for specifying the data type.
    - The create and edit pages renders the form inputs based on the `ModelPropTypes` assigned for each property.
    - Example:
        ```
        static propTypes = {
            id: ModelPropTypes.NUMBER(),
            firstname: ModelPropTypes.STRING(),
            lastname: ModelPropTypes.STRING()
        };
        ```

- __defaultProps__: { [any]: any }

    - `defaultProps` specifies the default value for each of the `propTypes`
    - These default values will be present in the inputs of the create page form.
    - Example:

		```
        static defaultProps = {
        	id: 001,
        	firstname: 'John',
            lastname: 'Doe'
        };
        ```

- __columnNames__: string[]

	- By default, the listing page generated the table with a column for each of the property specified in the `propTypes`
	- This default behaviour can be avoided by specifying the property name as a string in the `columnNames`
	- Example:

		```
        static columnNames: string[] = [
        	'id',
        	'firstname',
        ];
        ```

     - With the above example only two columns (*Id* and the *Firstname*) will be generated in the table.

- __list__

	- It fetches a list from the server and saves it in the redux store with the key: `${resourceName}List`. For this example, the key would be `demoList` since the `resourceName` is __demo__.
	- Parameters:

		| Name | Optional | Default value | Description |
        |-----------------|----------|------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
        | filters | Yes | {} | Query parameters to be sent with the HTTP request. |
        | valueInStore | Yes | false | If *false* then dispatch an action which fetches the instance list from the server, save the instance to the store and return the instance list.<br/><br/> If *true* then simply fetch the instance list from the store and return it(i.e. don't dispatch an action to fetch the list from the server). |
        | headers | Yes | {} | HTTP request headers. |
        | successCallBack | Yes | () => {} | Operation to be performed when the list is fetched successfully. |
        | failureCallBack | Yes | () => {} | Operation to be performed if any error occurred while fetching the list. |
        | path | Yes | resourceName | The server path from where the list is to be fetched.

- __get__

    - This function fetches the data for an instance id.
    - The request is sent to the path: `${resourceName}/${id}`.
    - Parameters:

		| Name | Optional | Default value | Description |
        |-----------------|----------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
        | id | No |  | The instance id for which the data is to be fetched. The request path would be `${resourceName}/${id}` |
        | valueInStore | Yes | false | If *false* then dispatch an action which fetches the instance data from the server, save the instance to the store and return the instance.<br/><br/> If *true* then simply fetch the instance from the store and return it(i.e. don't dispatch an action to fetch the data from the server). |
        | headers | Yes | {} | HTTP request headers. |
        | successCallBack | Yes | () => {} | Operation to be performed when the data is fetched successfully. |
        | failureCallBack | Yes | () => {} | Operation to be performed if any error occurred while fetching the data. |

- __$save__

	- It sends a POST request to the server for creating a new instance.
	- Parameters:

		| Name | Optional | Default value | Description |
        |-----------------|----------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
        | flush | Yes | true | If *true* then dispatch an action which sends POST request to the server and save the instance to the store.<br/><br/> If *false* then create an instance only in the redux store. |
        | headers | Yes | {} | HTTP request headers. |
        | successCallBack | Yes | () => {} | Operation to be performed when data saved successfully. |
        | failureCallBack | Yes | () => {} | Operation to be performed if any error occurred while saving the data. |
        | path | Yes | resourceName | The server URL to which the POST request is to be made. |

- __$update__

	- This function is used to modify the data of an existing instance.
	- Prameters:

		| Name | Optional | Default value | Description |
        |-----------------|----------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
        | flush | Yes | true | If *true* then dispatch an action which sends the PUT request to the server and save the instance in the store.<br/><br/> If *false* then update the instance data only in the redux store. |
        | headers | Yes | {} | HTTP request headers. |
        | successCallBack | Yes | () => {} | Operation to be performed when the instance is updated successfully. |
        | failureCallBack | Yes | () => {} | Operation to be performed if any error occurred while updating the instance. |
        | path | Yes | resourceName/id | The server URL to which the PUT request is to be made. |

- __$delete__

	- Parameters

		| Name | Optional | Default value | Description |
        |-----------------|----------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
        | flush | Yes | true | If *true* then dispatch an action which sends the DELETE request to the server, and deletes the instance from the store.<br/><br/> If *false* then delete the instance from the redux store. |
        | headers | Yes | {} | HTTP request headers. |
        | successCallBack | Yes | () => {} | Operation to be performed when the instance is deleted successfully. |
        | failureCallBack | Yes | () => {} | Operation to be performed if any error occurred while deleting the instance. |
        | path | Yes | resourceName/id | The server URL to which the DELETE request is to be made. |


### 6 CRUD CLI

- Available commands:
		- `npm run RH-generate-edit`
		- `npm run RH-generate-show`
		- `npm run RH-generate-list`
		- `npm run RH-generate-create`

- Flags:

     | Flag | Required for pages | Description |
     |-------------|--------------------|------------------------------------------------------------------------------------|
     | --modelPath | All  | Relative path of the model from the `src` directory. |
     | --modelName | All | The resource name provided in the model. |
     | --onCancel | Create, Show | The route to open when the Cancel button is clicked in the edit and the show page. |

- Example:

  ```
  npm run RH-generate-edit -- --modelPath /models/DemoModel --modelName demo --onCancel /demoList
  ```

### 7 Filters

- __DropDownFilter__

	* It creates a drop-down input with the possible values provided in the prop.
	* Props:

        | Name | Type | Description |
        |----------------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
        | label | String | Name or the label for the input box. If  `label` is not provided, `paramName` will be used  |
        | paramName | String | The request will be sent to the server with this key. |
        | possibleValues | {value: string, label: string}[] | The `label` will get rendered in the list and the `value` will be assigned to the key `${paramName}` while sending the request to the server. |

    * Example:

		```
        <DropDownFilter
            label="Order"
            paramName="order"
            possibleValues={[
                {label: 'Ascending', value: 'asc'},
                {label: 'Descending', value: 'desc'}
            ]}
        />
        ```

- __QueryFilter__

	* It filters out the list based on the string provided as input.
	* Props:

		| Name | Type | Description |
        |-------------|--------|--------------------------------------------------------------------------------------------|
        | label | String | Name or the label for the input box. If  `label` is not provided, `paramName` will be used |
        | paramName | String | The request will be sent to the server with this key. |
        | placeholder | String | The placeholder for the input box. |

	* Example:

        ```
        <QueryFilter
            label="Search"
            paramName="query"
            placeholder="Subject, Name, Body"
        />
        ```

- __RangeFilter__

	* Props:

		| Name | Type | Description |
        |-----------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
        | label | String | Name or the label for the input boxes. If  `label` is not provided, `paramName` will be used. <br/> Two input box would be generated with the labels: `${label}From` and `${label}To` |
        | paramName | String | The key with which the request is to be made to the server. |

    * This is a generic filter used for filtering out the list for given range. For example: if we want to view the product list for a given price range:

		```
        <RangeFilter
            label = "Amount"
            paramName = "price"
        />
        ```
        On submit, the request will be sent to the server with the query: `example.com?priceFrom=1000&priceTo=5000`.

- __DateRangeFilter__

	* The props and the functionality of this filter is same as that of the __RangeFilter__. Except in this case, the date selector input is rendered.
	* Example:

		```
        <DateRangeFilter
        	label = "Date Created"
        	paramName = "dateCreated"
        />
        ```


- __AutocompleteQueryFilter__

	* This is essentially a query filter with autocomplete functionality. When you start typing, it will compare the input text with the data list and render the matched items as a drop-down list.
	* Props:

		| Name | Type | Description |
        |-------------|----------------------------------|----------------------------------------------------------------------|
        | label | String | Name or the label for the input box. |
        | paramName | String | The key with which the request is to be made to the server. |
        | style | React.CSSProperties | Custom CSS properties. |
        | options | {value: string, label: string}[] | The data list with which the input text is to be compared. |
        | onInputChange | Function | This works similar to the `onchange` function of the html input tag. |

	* Example:

		In the following example, I have assigned the value of the options to a state: `selectOptions: {label: string, value: string}[]`

		```
        <AutocompleteQueryFilter
            style={{width: '300px'}}
            label="Employee"
            paramName="employeeID"
            options={this.state.selectOptions}
            onInputChange={this.handleInputChange}
        />
        ```

        Whenever the user start typing in the input, `handleInputChange` is executed. In this function a request is made to the server with the the input data. The response is then saved to the `selectOptions`.

        ```
        handleInputChange = (value: string): void => {
        	HTTP.getRequest(`action/autocomplete`, {}, {query: value})
            .then((response) => {
            	this.setState({selectOptions: response.data});
            });
        }
        ```

### 8 PagedList

 * This component is responsible for rendering the table and the filters in the listing pages.
 * Props:

	| Name | Type | Default value | Description |
    |-------------------|-------------------------------------|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | max | Number | 20 | The maximum number of rows to display. |
    | resource | String |  | The resource name specified in the Model |
    | pageHeader | JSX.Element | `<h1>${resource}List</h1>` | The text to be rendered at the top of the table. |
    | showDefaultAction | Boolean | true | If __true__, a column is added to the table which contains actions to view, edit and delete the record. <br/><br/> If __false__, the default actions will not be rendered. |
    | customAction | React.ReactNode |  | `customAction` overrides the default actions in the listing page. It can be a JSX.Element, a function or a class.  |
    | userActionMap | {label: string, action: Function}[] |  | This prop is used for the bulk operations (eg: exporting the records to csv or deleting multiple records at once) to be performed on the list.<br/> The `label` is the text which will be rendered in the drop-down menu. When an item selected from the drop-down, the `action` is executed. |

   * Example:

		```
        <PagedList
            resource="demo"
            max={15}
            userActionMap={[
            	{label: 'Delete Records', action: handleDelete}
            ]}
            customActions={TestAction}>
                <DropDownFilter
                    label = "status"
                    paramName = "status"
                    possibleValues = {[
                      {label: 'Enable', value: 'enable'},
                      {label: 'Disable', value: 'disable'},
                      {label: 'Inactive', value: 'inactive'}
                    ]}
                />
                <RangeFilter
                    label = "Bill Amount"
                    paramName = "billAmount"
                />
        </PagedList>
        ```

        In the above example, following function will be executed when the user selects `Delete Records` from the drop-down.
        ```
        this.handleDelete = () => {
        	//perform operations to delete.
        }
        ```

        In this case, the custom action is a class:
        ```
        class TestAction extends React.Component<{instance: any}, void> {

            openAlert = (): void => {
                alert(this.props.instance);
            }

            render() {
                return (
                    <div>
                        <button onClick={this.openAlert}>Open ALert</button>
                    </div>
                );
             }
        }
        ```

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
