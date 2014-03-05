var data = {
  tasks: [
    {
      name: 'Scripts',
      plugin: [
        { type: 'src', values: '[ "1.txt", "2.txt" ]', }, 
        { type: 'gulp-concat', value: '"combined.txt"', },
        { type: 'dest', values: '"build/"' }, 
      ]
    }
  ] 
};

module.exports = data;
