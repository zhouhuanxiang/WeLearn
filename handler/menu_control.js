/**
 * Created by FROST on 2016/12/5.
 */

var request=require("request")

var menutmp=require("./menu_template")


/*var menus = {
    "button": [
        {
            "name": "测试菜单",
            "sub_button": [
                {
                    "type": "view",
                    "name": "授权登录",
                    "url": "http://wuyrsp3tma.proxy.qqbrowser.cc/auth"
                }]
        }]
};
*/
exports.create_menu=function create_menu(token) {

    var options = {
        url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token='+ token,
        form: JSON.stringify(menutmp.WEIXIN_COSTUM_MENU_TEMPLATE),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    request.post(options, function (err, res, body) {
        if (err) {
            console.log(err);
        }else {
            console.log(body);
        }
    })

}
