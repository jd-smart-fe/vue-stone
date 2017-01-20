

// host: Remote server IP/Hostname.
// port: sftp port, 22 by default.
// username: sftp server's username.
// password:

// from:  local file
// to:  	remote dir

var package = require('./package.json');

// 测试环境
// module.exports = {
//   host : 'm5.pengxiulin.com',
//   username : 'pengxiulin',
//   password : '666666',

//   from: 'dist',
//   to: '/export/data/tomcatRoot/m5.pengxiulin.com/',
// }


// 预发布(线上)
module.exports = {
  host: '192.168.202.48',
  username: 'root',
  password: 'tianP@ss2014',
  from: 'dist',
  to: '/var/www/html/static.360buyimg.com/nsng/smart-wlgo/' + package.version + '/'
  
}

// module.exports = {
//   host: '192.168.202.48',
//   username: 'root',
//   password: 'tianP@ss2014',

//   from: 'dist',
//   to: '/home/admin/static.360buyimg.com/nsng/fridge-app/'+package.version + '/'
// }

