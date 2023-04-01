const express = require("express"); // 라이브러리 첨부
const app = express(); // 객체 생성
app.use(express.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");
app.use("/public", express.static("public"));

var db;
var url = require("./key.json").url;
MongoClient.connect(url, { useUnifiedTopology: true }, function (에러, client) {
  if (에러) return console.log(에러);
  db = client.db("todoapp");

  // db.collection("post").insertOne(
  //   { 이름: "John", _id: 100 },
  //   function (에러, 결과) {
  //     console.log("저장완료");
  //   }
  // );

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

app.post("/add", function (요청, 응답) {
  db.collection("counter").findOne(
    { name: "게시물갯수" },
    function (에러, 결과) {
      var 총게시물갯수 = 결과.totalPost;

      db.collection("post").insertOne(
        { _id: 총게시물갯수 + 1, 제목: 요청.body.title, 날짜: 요청.body.date },
        function (에러, 결과) {
          db.collection("counter").updateOne(
            { name: "게시물갯수" },
            { $inc: { totalPost: 1 } },
            function (에러, 결과) {
              if (에러) {
                return console.log(에러);
              }
              응답.send("전송완료");
            }
          );
        }
      );
    }
  );
});

app.get("/list", function (req, res) {
  db.collection("post")
    .find()
    .toArray(function (에러, 결과) {
      console.log(결과);
      res.render("list.ejs", { posts: 결과 });
    });
});

app.delete("/delete", function (req, res) {
  console.log(req.body);
  req.body._id = parseInt(req.body._id);
  db.collection("post").deleteOne(req.body, function (에러, 결과) {
    console.log("삭제완료");
    res.status(200).send({ message: "성공했습니다" });
  });
});

app.get("/detail/:id", function (req, res) {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    function (에러, 결과) {
      console.log(결과);
      res.render("detail.ejs", { data: 결과 });
    }
  );
});
