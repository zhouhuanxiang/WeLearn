12.6
杨景
        1.微信端可处理消息 bind, unbind, lesson, schedule, library seat
        2.绑定的时候，用学号没有错，用用户名则会出错
        3.目前课程文件，课程作业api还没有完成

12.5 张诗文
        菜单构造和响应
        首先改settings(当然大家都知道）
        菜单响应的实现都在handler目录下，
        各位如果要修改菜单，请按照以下步骤：

        菜单的结构在menu_template.js中，注意微信最多只能有三个主菜单（我才知道）
        三个菜单的handler对应着lesson_handler,conversation_handler,schedule_handler,请各位实现每个handler中的第二个函数即可（当然如果想改名
        字的话请不要忘了在main_handler中修改相应的名字，至于修改哪里大家应该一眼就能看出）
        而accesstoken checkrequest menucontrol三个js不需要改动

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
