document.head.innerHTML += "<style>*{margin:0;padding:0}body{background:#cef url(data:;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAATFJREFUeNrMVksWgyAMDF15I5c9T5eexDN12RM1O4taKZ8wJLApz9eHmNjJTBghYtZf8+ONn3Ias8/LZDblX5PzaXx7rrh9iWhetufq7sv2Wh0dY07n/tcHTNFtvAKGO6roTI5HAOTxpol2xtnC3pciEREgLQ7DBAh/MMK4oEGtAjvXyUoIu1EKM0sQeTuDpyJxksKELiqJ1vMmhemaofv6bTS9sCX7oHQywelwEaGLSoB1dJrSIbRxYfYuGkDX1obG2wak+EdJF2n8IINZs6xQfdsq5MLVBCI3rWljGjfg1bHPhDkXRbQcrJCl9nU1tW++0UyENNmPlc/dFIvcxNFwU4aeAzhh7KZduEhbdx8ugxf5tzRx1fYa/lBfLxw+F+F+HToXabT5v3MRlqSs8iPAAJcOq6pKXl4UAAAAAElFTkSuQmCC) repeat;font:100% monospace;text-align:center;padding-top:50px;}h1,h2{font-weight:400}h2{padding-top:10px;font-size:100%}</style>";

window.onload = function() {
  document.body.innerHTML = "<h1>moe</h1><h2></h2>";
  var h2 = document.getElementsByTagName("h2")[0];
  var newTitle = [];
  for(var i = 0; i < 4; i++) newTitle.push(i % 2 == 1 ? "MOE" : "moe");
  h2.innerHTML = newTitle.join(".") + ".";
  setInterval(function(){
    h2.innerHTML = h2.innerHTML.slice(1) + h2.innerHTML.slice(0, 1);
  }, 80);
};
