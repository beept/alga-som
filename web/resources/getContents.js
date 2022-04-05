const fs = require("fs");
const pattern = /src="([\w\W\s]+?")/g;
const sliptPattern = /"?,"?/g;
fs.readFile("searchSong.html", "utf8", (err, data) => {
  if (err) {
    console.error("Reading Error: ", err);
    return;
  }

  let arr = data.match(pattern);
  data = arr.toString();
  data = data.replace(sliptPattern, '\n');
  data = data.replaceAll('src="', '');
  data = data.replaceAll('"', '');
  console.log(data);
  fs.writeFile("contents.txt", data, (err) => {
    if (err) {
      console.error("Write Error: ", err);
    }
  });
});


