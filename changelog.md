# Changelog

## [2.0.6] - [Unreleased]
## Fixed
- Error response on failure of requests.

## [2.0.5] - [Unreleased]
### Changed
- Now `FormInput` can take any html attribute as prop.

## [2.0.4] - [Unreleased]
### Removed
- require statement in fetchComponent method. (it was causing issue while chunking)

## [2.0.3] - 2017-11-13

### Added
- Now we can pass custom callback `onNavClose` to be invoked when Primary or Secondary Navigation Menu is closed
- Added `enzyme-adapter-react-16@1.0.2` to make test cases compatible with `react 16`
- Added `.circleci/config.yml` for continous integration.
- Added `.circleci/npmSetup.sh` for resolving version dependencies during build.
- Added `publishConfig` block in `package.json`.
### Changed
- Updated `enzyme` to `3.1.0` to make test cases compatible with `react 16`.
- Updated `.gitignore` for including `npmSetup.sh` into VCS.
- Set `"private": false` in `package.json` for enabling publish operation.
### Fixed
- Some type issues.
- `react-select` import in `DropDownInputTemplate`.
- Fixed `onChange` handler in `DropDownInputTemplate`.

## [2.0.1] - 2017-10-31

### Added
- `KeywordMatcher` component for conditional rendering based on keywords.

### Changed
- Refactored `Input` in widgets to modularize `GenericInputTemplate`, `BooleanInputTemplate`, `DropDownInputTemplate`, `DateTimeComponent` and `ListInputTemplate`
- Replaced the use of `react-datetime` with `FormControl[type="date"]` in DateTimeComponent.
- Replaced custom dropdown in `DropDownInputTemplate` with `react-select`

## [1.1.9] - 2017-10-13

### Added
- Added props to style headers in PagedList
- Added isJobBoardManager permission

## [1.1.5] - 2017-08-20

### Added

- Utilty method in commonUtils to get Nested Data (`getNestedData`)

### Changed

- Updated typings of `react@15.0.21`, `react-bootstrap@0.0.50`, `react-do@0.14.23`
- Added prop `onNavClose` to call custom method when `MenuLauncherIcon` is closed
- Added support for nested `columnNames` in `Model` and `DataGrid`

### Removed

- Removed deprecated typings of `redux` and used typings which was coming with `redux`.

## [1.1.6] - 2017-08-25

### Added

- Secondary navigation drawer.
- A check to restrict the number of navigation drawer and fixed the demo file.
- Documentation for the navigation menu.
- Checks for the boolean type input label.
- Object prototype functions:
    * `isEmpty` to check if an object is empty.
    * `objectEach` to iterate over an object.

## [1.1.7] - 2017-08-28

### Added

- `getRowStyle` Method support in Model to get custom style for every Row of DataGrid. When defined in Model, it will be called for every instance in instanceList and CSS returned from that method will be applied to Row of that Grid.
- Added boolean prop `exact` in `AuthRoute` which will add prop `exact` to `Route` of `react-router-dom` if specified.

### Changed
 - Reseted `activePage` for `Pagination` on `componentWillMount` of `PagedList`, So when coming back again on Listing Page from any other page, pagination will start from 1.

### Removed

- Object prototype functions:
    * `isEmpty`.
    * `objectEach`.
