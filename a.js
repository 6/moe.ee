document.head.innerHTML += "<style>*{margin:0;padding:0;font-size:100%}body{font-family:monospace;text-align:center}h1{font-weight:400;padding:10px;text-align:left}</style>";

randomRange = function(from, to) {
  return Math.floor(Math.random() * (to + 1)) + from;
};

pickRandom = function(arr) {
  return arr[randomRange(0, arr.length - 1)];
};

randomCap = function(str) {
  var chars = str.split("");
  var newString = "";
  for(var i = 0; i < chars.length; i++) {
    newString += randomRange(0, 1) == 0 ? chars[i].toUpperCase() : chars[i].toLowerCase();
  }
  return newString;
};

window.onload = function() {
  document.body.innerHTML = "<h1>moe</h1>";
  var h1 = document.getElementsByTagName("h1")[0];
  var newTitle = "";
  var separators = "#%^*=?/+_-~!:$.".split("");

  for(var i = 0; i < 5; i++) newTitle += randomCap("moe")+pickRandom(separators);
  h1.innerHTML = newTitle;
  var firstChar;
  setInterval(function(){
    firstChar = h1.innerHTML.slice(0, 1);
    if(separators.indexOf(firstChar) >= 0) firstChar = pickRandom(separators);
    h1.innerHTML = h1.innerHTML.slice(1) + firstChar;
  }, 110);
};
