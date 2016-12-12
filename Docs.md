# React-Hero Overview:

### 1. ResponsiveView :

  - Used to render device specific Views.
  - Create a Component with by extending `ResponsiveView<P, S>` and implement device specific render methods.
  `renderDefault` needs to be implemented if not any other render methods.
  eg:
  ```
  class TestView extends ResponsiveView<{}, {}> {
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
- You can find out the render methods by looking at the code.
- If any render method is not overridden in the implementing app for a particular device type with a specific orientation, then `renderDefualt` will be executed.

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
