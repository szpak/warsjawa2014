Build:

```docker build --tag warsjawa-workshops .```

Run:

```docker run -t -i -p 3000:3000 -v `pwd`/src:/workshops/src warsjawa-workshops /bin/bash```

And then:
```
root@99dea30c829b:/workshops# meteor
[[[[[ ~workshops ]]]]]

=> Started proxy.
=> Started MongoDB.
=> Started your app.

=> App running at: http://localhost:3000/
```