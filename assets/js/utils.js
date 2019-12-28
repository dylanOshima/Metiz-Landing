
// Returns the direction that an element was last scrolled
var getScrollDirection = function(elem) {
  let lastScroll = 0;
  return function() {
    let isScrollingLeft = elem.scrollLeft < lastScroll;
    lastScroll = elem.scrollLeft;
    return isScrollingLeft;
  };
}

// Note: Might want throttling for the scroll effect
function debounce(func, time) {
  let called = false;
  let context, args;
  return function() {
    context = this;
    args = Array.from(arguments);
    if(!called) {
      called = true;
      setTimeout(() => {
        called = false;
        func.bind(context)(...args);
      }, time);
    }
  }
}