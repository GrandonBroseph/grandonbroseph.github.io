module.exports = (function() {
  window.addEventListener("load", function() {
    var attributeName = "data-parallax";
    var elements = document.querySelectorAll("[" + attributeName + "]");
    var data = [];
    for (var i = 0, element; element = elements[i++];) { // Loop through relevant elements
      for (var j = 0, attribute; attribute = element.attributes[j++];) { // Loop through attributes
        if (attribute.name === attributeName) {
          data.push({
            element: element,
            scale: parseFloat(attribute.value)
          });
          element.removeAttribute(attributeName);
          break;
        }
      }
    }
    var scrollTick, scrollPos;
    function parelax(scrollPos) {
      for (var i = 0, item; item = data[i++];) {
        item.element.style.transform = "translateY("+(scrollPos * item.scale)+"px)";
      }
    }
    function listener(event) {
      scrollPos = (event.target.scrollingElement || document.body).scrollTop;
      if (!scrollTick) {
        window.requestAnimationFrame(function() {
          parelax(scrollPos);
          scrollTick = false;
        });
      }
      scrollTick = true;
    }
    ["scroll", "resize", "orientationchange"].some(function(event) {
      window.addEventListener(event, listener)
    });
    listener();
  });
  return {
    listen: function() {

    }
  };
})();