# Changelog

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