

// host: Remote server IP/Hostname.
// port: sftp port, 22 by default.
// username: sftp server's username.
// password:

// from:  local file
// to:    remote dir

var package = require('./package.json');

// 测试环境
// module.exports = {
//   host : 'm5.pengxiulin.com',
//   username : 'pengxiulin',
//   password : '666666',

//   from: 'dist',
//   to: '/export/data/tomcatRoot/m5.pengxiulin.com/',
// }


module.exports.env_49 = {
  host: '192.168.202.49',
  username: 'static',
  password: 'static',

  from: 'dist/static',
  to: '/var/www/html/static.360buyimg.com/nsng/vue-stone/static/'
}

module.exports.env_48 = {

  host: '192.168.202.48',
  username: 'static',
  password: 'static',

  from: 'dist/static',
  to: '/export/sites/static.360buyimg.com/vue-stone/static'
}

module.exports.default = module.exports.env_48;




