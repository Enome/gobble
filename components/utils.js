var utils = {

  // Src: https://gist.github.com/pguillory/729616

  catchStream: function (stream, callback) {

    var old_write = stream.write;

    stream.write = function (string, encoding, fd) {
      //write.apply(stream, arguments);
      callback(string, encoding, fd);
    };

    return function () {
      stream.write = old_write;
    };
  }

};

module.exports = utils;
