const EventEmitter = require('./event-emitter');

const myEvent = new EventEmitter();

console.log('>>> PROCESS 2 <<<')

setInterval(function () {
  myEvent.emit('watcher',{param : 1})
}, 3000);
