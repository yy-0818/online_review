function download(res, filename, fileSuffix) {
  let blob = new Blob([res], {type: `application/${fileSuffix}`});
  let url = window.URL.createObjectURL(blob);
  const link = document.createElement("a"); // 创建a标签
  link.href = url;
  link.download = filename; // 重命名文件
  console.log(link.download);
  link.click();
  URL.revokeObjectURL(url); // 释放内存
}


export default download;
