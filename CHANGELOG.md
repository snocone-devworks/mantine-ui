# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 1.2.1 - 2022-12-10
### Fixed
- Typo in logic for ThemedCard causing the title to display twice and the subtitle to not display. The title will now correctly display only once while also displaying the subtitle should it be passed as a prop.

## 1.2.0 - 2022-11-21
### Added
- AppContainer component now has a `drawerTitle` prop that accepts a `React.ReactNode` value. Passing this will add a title of the contents passed to the nav drawer.

## 1.1.1 - 2022-11-21
### Fixed
- useDeviceSize hook wasn't properly setting the height and width on initialization. This should now be fixed.

## 1.1.0 - 2022-11-21
### Added
- Adding actual contents of package

### Fixed
- Fixed release action

## 1.0.0 - 2022-11-14
### Added
- Initial Release
- Changelog
