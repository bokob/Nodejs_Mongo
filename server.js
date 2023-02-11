const express = require("express"); // 라이브러리 첨부
const app = express(); // 객체 생성

app.listen(8080, function () {
  console.log("start");
}); // 서버 열기

app.get("/shop", function (req, res) {
  res.send("쇼핑 페이지요");
});

app.get("/beauty", function (req, res) {
  res.send("뷰티 페이지요");
});
