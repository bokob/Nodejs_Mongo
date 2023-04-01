const express = require("express"); // 라이브러리 첨부
const app = express(); // 객체 생성
app.use(express.urlencoded({ extended: true }));

const MongoClient = require("mongodb").MongoClient;
var db;
var url = require("./key.json").url;
MongoClient.connect(url, { useUnifiedTopology: true }, function (에러, client) {
  if (에러) return console.log(에러);
  db = client.db("todoapp");

  db.collection("post").insertOne(
    { 이름: "John", _id: 100 },
    function (에러, 결과) {
      console.log("저장완료");
    }
  );

  app.listen(8080, function () {
    console.log("listening on 8080");
  });
});

app.get("/pet", function (req, res) {
  res.send("펫 페이지요");
});

app.get("/beauty", function (req, res) {
  res.send("뷰티 페이지요");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", function (요청, 응답) {
  응답.sendFile(__dirname + "/write.html");
});

app.post("/add", function (req, res) {
  res.send("전송완료");

  db.collection("post").insertOne(
    { 제목: req.body.title, 날짜: req.body.date },
    function (에러, 결과) {
      console.log("저장완료");
    }
  );
});
