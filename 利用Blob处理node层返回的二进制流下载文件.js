// 前端调用
download() {
  let params = {
    contractNumber: num
  }
  // 调用下载文件接口，实质转成二进制流
  let content = await downloadContract(params)
  // 拿到二进制字符串 content
  // 再利用 Buffer 转为对象
  const buf = Buffer.from(content, 'binary')
  // 再输入 Blog 生成文件
  let blob = new Blob([buf], {type: 'application/pdf'});
  let a = document.createElement('a')
  // 指定生成的文件名
  a.download = num + '.pdf'
  a.href = URL.createObjectURL(blob)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}


// 后端 node 所写的接口(部分代码)
download() {
  let { ctx } = this
  // 根据传入的参数 contractNumber，查询得到文件地址 data.formalPdfUrl / data.draftPdfUrl
  // 查询...
  let url = data.formalPdfUrl || data.draftPdfUrl // 简便写法
  // 上面是简便写法，相当于
  // if (data.formalPdfUrl) {
  //   url = data.formalPdfUrl
  // } else if (data.draftPdfUrl) {
  //   url = data.draftPdfUrl
  // }
  let handle = this.handleFiles(url)
  let binaryFiles = await handle.then(data => {
    return data
  })
  // 返回到前端
  ctx.body = binaryFiles
},
handleFiles(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      res.setEncoding('binary') // 二进制
      let files = ''
      res.on('data', chunk => { // 加载到内存
        files += chunk
      }).on('end', () => { // 加载完
        resolve(binaryFiles)
      })
    })
  })
}
