var fs = require('fs'),
    path = require('path');

module.exports = EventEmitter;

function EventEmitter(doYouWantToOverrideIfExist){
  var dirWatchers = path.join(__dirname,'./watchers');
  if(!fs.existsSync(dirWatchers)){
    fs.mkdirSync(dirWatchers);
  }

  this.emit = function(eventName,params){
    var watcher = path.join(dirWatchers,'./.'+eventName);

    fs.writeFile(watcher,params,(err) => {
      if(err) throw err;
    });
  };

  this.on = function(eventName,cb){
    var watcher = path.join(dirWatchers,'./.'+eventName);
    if(!fs.existsSync(watcher)){
      fs.writeFileSync(watcher,'');
    }

    fs.watch(watcher,(event) => {
      if(event === 'change'){
        cb();
      }
    })
  }
}
