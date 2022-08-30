//导入 express
const express = require("express");
const path = require("path");

//导入路由对象
const router = require("./router/index");

//创建服务器的实例对象
const app = express();

const joi = require("@hapi/joi");

//导入并配置 cors 中间件 解决跨域
const cors = require("cors");
app.use(cors());

//配置解析表单数据的中间件,注意：这个中间件只能解析application/x-www-form-urlencodedd 格式的表单数据
app.use(express.urlencoded({ extended: false }));

// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json());

//处理静态资源的中间件
app.use(express.static(path.join(__dirname, "uploads")));

//一定要在路由之前封装 res.cc 函数
app.use((req, res, next) => {
  //status 默认值为 1 ，表示失败的情况

  //err 的值，可能是一个错误对象，也可能是一个错误描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      msg: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 处理静态资源
app.use(express.static(path.join(__dirname, "images")));

//一定要在路由之前配置解析 Token 的中间件
const config = require("./config");

// 解析 token 的中间件
const expressJWT = require("express-jwt");

//只要配置express-jwt这个中间件，就可以把解析出来的信息挂载在req.user上
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] })
);
//导入文章内容的路由模块
const artcat = require("./router/nav");
app.use("/api", artcat);

//导入并使用用户路由模块
app.use("/api", router.userRouter);

//导入并使用微信用户路由模块
app.use("/api", router.wxuserRouter);

// 导入并使用用户信息路由模块
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use("/my", router.userinfoRouter);

// 导入并使用用户地址路由模块
app.use("/my", router.user_address);

// 导入并使用微信用户基本信息路由模块
app.use("/my", router.wx_userinfoRouter);

// 导入并使用获取所有微信用户的路由模块
app.use("/my", router.getwxusersRouter);

// 导入并使用我的医生路由模块
app.use("/my", router.mydoctorRouter);

//导入并使用groups信息模块
app.use("/api", router.groupsRouter);

//导入并使用menu信息模块

app.use("/api", router.menuRouter);

//导入并使用lbt信息模块

app.use("/api", router.lbtRouter);

//导入并使用doctor信息模块

app.use("/api", router.doctorRouter);

//导入并使用cooperation信息模块

app.use("/api", router.cooperationRouter);

//导入并使用dynamic信息模块

app.use("/api", router.dynamicRouter);

//导入并使用 nav 信息模块
app.use("/api",router.dynamicRouter)

//导入并使用prescription信息模块

app.use("/api",router.prescriptionRouter)

//导入并使用groupData信息模块

app.use("/api",router.groupDataRouter)

//导入并使用专家说信息模块
app.use('/api',router.navRouter)

//定义错误级别的中间件
app.use((err, req, res, next) => {
  //验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err);
  // 捕获身份认证失败的错误
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
  //未知的错误
  console.log(err);
  res.cc(err);
});

//启动服务器
app.listen(3007, () => {
  console.log("服务器启动成功 baseUrl: http://127.0.0.1:3007");
});
