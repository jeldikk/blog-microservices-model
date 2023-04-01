**How to run application services locally**
As present commit, run the node servers on different terminals.

these services work on different ports and an event bus service is used with pub/sub pattern. there is special endpoint on each services which would listen for any event coming from event bus service

```
posts-service: 4000
```

```
comments-service: 4001
```

```
query-service: 4002
```

```
moderation-service: 4003
```

```
eventbus-service: 4005
```

```
client-service(React App): 3000
```

each service folder also have a Dockerfile which can used to build the image. use below command to build a image for the service
```
docker build -t <some-tab-to-call-image> .
```

