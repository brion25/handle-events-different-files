const EventEmitter = require('./event-emitter');

const myEvent = new EventEmitter();

console.log('>>> PROCESS 1 <<<');

setInterval(process1, 1000);

myEvent.on('watcher',() => {
  console.log('Something happen...start the actions!');
  process1();
})

function process1(){
  console.log('Something is happening in process 1');
}
