// 系统级别错误 token过期 无权限 业务级别错误  网络级别错误  数据库错误
exports.resdata = function (msg, data = '') {
  return {
    'code': '0',
    'msg': msg || 'success',
    'data': data
  };
};

exports.errdata = function (msg, err = '') {
  return {
    'code': '-1',
    'msg': msg || 'error',
    'err': err
  };
};
