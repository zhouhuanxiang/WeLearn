
12.5
秦堤

    -views/chat.ejs           聊天页面
      post:
        name="content"//页面输入的内容
      get:
        msg//历史消息的列表 格式： userName: content (time)
    -views/chatSearch.ejs     选择私信的课程页面
      get:
        course//课程的名称列表
      post:
        select 
          name="courseName"//选中的课程名

周焕祥

     修改数据库字段会报错，貌似node.js 没有 Django 方便的 migrate，例如修改了 Student 表，需要如下改进
    1 删除所有Student数据
    2 在数据库命令行，依次
        use welearndb
        db.students.dropIndexes()

12.3
周焕祥

      -handler                  微信消息处理 handler
      -Models/Student           字段添加 openid
     第三方包
     1 session
      已配置好，简单的说就是在路由函数里，都有seq.session.openid 作为当前用户的标识符，可以借此在数据库找到该用户（类似于 Django的request.user）

11.28
周焕祥

      使用 npm 第三方包 wechat，接入微信
      -setting.js               环境变量
      -wrapper.js               类似上次的 get_url
      -routes/wechat.js         微信消息处理
      -routes/login.js        学生页面，做了登录功能
      -Models                   数据模型

     常用的第三方包
       包名           文档网址
      简介
     1 body-parser   https://github.com/expressjs/body-parser
      只处理 application/x-www-form-urlencoded 信息
     2 multer        https://github.com/expressjs/multer/blob/master/README.md
      只处理 multipart/form-data
     3 request       https://github.com/request/request
      发起请求，用于爬虫，登录功能就是用这个写的
     4 mongoose      https://github.com/Automattic/mongoose
      管理数据库，模型创建参看 Models/Students

      附：
     1 express 4 中的包和 express 3 很不一样，可以参考 http://jser.me/2014/03/18/express4.x新特性以及如何从3.x升级到4.x.html
     2 用 console.log 可以在 WebStorm 输出几乎所有东西，调试十分方便
     3 不出意外的话就用 mongodb 数据库了，需要在系统安装该数据库，运行项目前要先运行数据库，Windows 环境不清楚，配出来之后发篇教程到群里吧
     4 github 是个好地方
