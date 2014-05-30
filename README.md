# 
# [rethinkpagination](http://jensmartsch.de/rethinkpagination)

## Scrollable Pagination with previews of the content of the page you would like to visit.  This is UX design principle accompanied by a jquery plugin.

## Demo
http://jensmartsch.de/rethinkpagination

## Installation

You can install with [Bower](http://bower.io/):

```shell
bower install rethinkpagination
```

### Installation from GitHub

Git clone rethinkpagination to the place where you want to install it:

```
git clone https://github.com/jmar/rethinkpagination.git
```

Add the stylesheet to your head
```html
<link rel="stylesheet" href="styles/rethinkpagination.css">
```

In the foot of your web page before the closing body tag:

```html
<script src="path/to/jquery.js"></script>
<script src="path/to/rethinkpagination/scripts/rethinkpagination.min.js"></script>
<script>
jQuery(function($) {
  $('.pagination').rethinkpagination({options});
});
</script>
```

You can also call rethinkpagination with options as an object:
```javascript
jQuery(function($) {
  $('.pagination').rethinkpagination({animation: 'fadeInDown', selector: 'h1'});
});
</script>
```

#### Dependencies

- jQuery 1.7+

##Compatibility

Works in Firefox 22+, Chrome 20+, IE8+, Safari


## More Examples
_(Coming soon)_

## Release History
-1.0.0 First stable release

# Contributing

Please, read the [Contributing Guidelines](CONTRIBUTING.md) for this project.