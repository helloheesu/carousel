var carousel = (function(){
  var $_container = $('<div id="carousel" class="carousel"></div>');
  var $_pagination = $('<ul class="carousel-pagination"></ul>');
  var $_navigation = $('<a class="prev"></a><a class="next"></a>');
  var _index;

  return function (options) {
    var listSelector = options['listSelector'];
    var $list = $(listSelector);
    $list.addClass('carousel-list');
    var itemWidth = $list.width();
    var itemHeight = $list.height();
    
    var itemSelector = options['itemSelector'];
    var $items = $(itemSelector);
    $items.addClass('carousel-item');
    $_container.width($items.length * 100 + '%');
    $list.prepend($_container);
    $_container.append($items);
    $items.width(100 / $items.length + '%');
    $items.height(itemHeight);
    $items.each(function (index) {
      $(this).data('slide', index);
    });

    if(options['pagination']) {
      for(var i=$items.length;i;i--) {
        $_pagination.append($('<li></li>'));
      }
      $_pagination.on('click', 'li', function (event) {
        // http://stackoverflow.com/questions/5545283/get-index-of-clicked-element-in-collection-with-jquery
        // console.log($(this).index());
        moveTo($(this).index());
      });
      $_container.append($_pagination);
    }
    if(options['navigation']) {
      $_container.append($_navigation);
      $_container.children('.prev').on('click', function () {
        moveTo(_index-1);
      });
      $_container.children('.next').on('click', function () {
        moveTo(_index+1);        
      });
    }
    
    var moveTo = function (index) {
      if (_index == index) return;
      if (options['pagination']) {
        $('li', $_pagination).eq(_index).removeClass('on');
        $('li', $_pagination).eq(index).addClass('on');
      }
      if (options['navigation']) {
        if (index <= 0) {
          $('.prev', $_container).hide();
        } else {
          $('.prev', $_container).show();
        }
        if (index >= $items.length-1) {
          $('.next', $_container).hide();
        } else {
          $('.next', $_container).show();
        }
      }
      $_container.css('margin-left', -index*itemWidth);
      _index = index;
    };
    moveTo(0);
  }
})();

carousel({
  'listSelector' : 'ul',
  'itemSelector' : 'li',
  'pagination'   : true,
  'navigation'   : true
});


/* todo
* user.css should overwrite default.css
* pagination/navigation Hide : pagination/navigation appears only on hover
* loop
*/