document.head.innerHTML += "<style>*{margin:0;padding:0}body{font:100% monospace;text-align:center;padding-top:50px;}h1,h2{font-weight:400}h2{padding-top:10px;font-size:100%}</style>";

randomRange = function(from, to) {
  return Math.floor(Math.random() * (to + 1)) + from;
};

pickRandom = function(arr) {
  return arr[randomRange(0, arr.length - 1)];
};

window.onload = function() {
  document.body.innerHTML = "<h1>moe</h1><h2></h2>";
  var h2 = document.getElementsByTagName("h2")[0];
  var newTitle = "";
  var separators = ["#", "%", "^", "*", "=", "?", "/", "+", "_", "-", "~", "!", ":", "$", "."];

  for(var i = 0; i < 5; i++) newTitle += "moe"+pickRandom(separators);
  h2.innerHTML = newTitle;
  var firstChar;
  setInterval(function(){
    firstChar = h2.innerHTML.slice(0, 1);
    if(separators.indexOf(firstChar) >= 0) firstChar = pickRandom(separators);
    h2.innerHTML = h2.innerHTML.slice(1) + firstChar;
  }, 110);
};
