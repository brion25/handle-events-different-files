# How can we fire events across processes in Node?

Well, that's an interesting question, basically there's no nothing native in Node that can help us with that, so we need to do some tweaks about it. So far I just can think in 2 ways to do this:
- **Server Strategy** : Creating an small server with 1 route on the listener part and making a request on the emitter part
- **I/O Strategy** Add a watcher to a dummy file on the listener part and write something on that file on the emitter part

Both are good strategies to achieve what we want, but, which one is the best? both have pros and cons:
- **Server Strategy**:
  - *Pros*
    - It's relatively faster, taking in consideration your network traffic
    - It's cleaner, because we don't create extra files
  - *Cons*
    - It could lead in problems if you use an improper port
    - It could work wrong (or even not work) in case the server got corrputed by a wrong request
- **I/O Strategy**
  - *Pros*
    - It's less error prone, we just need to have the proper rights on the file to watch and edit
    - It's independent, because we can create the file where we want, we don't depend on network traffic nor port availability
  - *Cons*
    - It's slower, because we're writting/watching files
      - this is partially correct, depending on the data we're writting, if we're writing tiny messages: `{msg : 'This is a message'}` then it's as faster as the Server Strategy, but if you want to write base64 encoded images : `{msg : 'data/url...'}` then it's going to be slower than the other strategy.
    - It's a 'dirty' strategy because we're writting extra files.

For this example I chosen the **I/O Strategy** because it's less error prone. to run the test you just need to write the command: `npm run start`, I'm using concurrently to run both processes on the same cli window, but you can run it in separate windows by running the commands : `node ./process1` and `node ./process2`
