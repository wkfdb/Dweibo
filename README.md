### Dweibo-一个去中心化的社交平台

这个仓库里面全都是代码部分，依赖的npm包很多文件量很大所以没有上传上来。

要想运行此代码，请先运行以下命令：

```
cnpm install express --save
cnpm install body-parser --save
cnpm install cookie-parser --save
cnpm install multer --save
cnpm install web3@^0.20.0 --save
```

合约如何部署以及Dapp使用方式和运行效果见实验报告。

合约的源代码在contracts/contracts/Dweibo

安装好依赖的环境之后直接

ganache-cli

打开私链环境

然后进入contracts文件夹运行

truffle.cmd migrate

部署私链

然后在ganache-cli的命令行中找到合约的地址，然后替换express_demo中的全局变量address。然后

node express_demo.js

然后访问localhost:8081即可。