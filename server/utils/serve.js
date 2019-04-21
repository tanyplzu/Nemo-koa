// 系统级别错误 token过期 无权限 业务级别错误  网络级别错误  数据库错误
exports.resdata = function (code, msg, data = '') {
  return {
    'code': code || '0',
    'msg': msg || 'success',
    'data': data
  };
};

exports.errdata = function (err, code, msg) {
  return {
    'code': code || '-1',
    'msg': msg || 'error',
    'err': err
  };
};
