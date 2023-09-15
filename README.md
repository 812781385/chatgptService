# chatgpt
使用nodejs，5分钟快速搭建chatgpt
众所周知，openai API在国内目前无法访问。
我看了有很多教程和项目都是让你访问他的代理，这样不但不安全，还有被盗号的风险。
本项目是需要自行部署在海外服务器上，服务器可以使用大厂的云服务，非常简单。
apikey可以直接去申请，或者去某宝购买。

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### api：
- `http://localhost:7001/creatChat`，参数 `userId`, `prompt`
- `http://localhost:7001/creatImg`，参数  `prompt`

博客园
https://www.cnblogs.com/wangrui38/

csdn
https://blog.csdn.net/qq_40279232/article/details/131090346?spm=1001.2014.3001.5501