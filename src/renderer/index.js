import './pure-min.css'
import './main.css'
const bento4 = require('bento4-installer')
const chileProcess = require('child_process')
import Message from './message'
let message = new Message()

let app = document.getElementById('app')
let videoInput = document.createElement('input')
videoInput.setAttribute('type', 'file')
videoInput.id = 'videoInput'

let resetBtn = document.createElement('button')
resetBtn.innerText = '清空视频'
resetBtn.className = 'pure-button button-error'
resetBtn.style = 'margin-right:20px;'

let transformBtn = document.createElement('button')
transformBtn.innerText = '转换视频'
transformBtn.id = 'transformBtn'
transformBtn.className = 'pure-button pure-button-primary'

app.appendChild(videoInput)
app.appendChild(resetBtn)
app.appendChild(transformBtn)


resetBtn.addEventListener('click', function () {
  videoInput.value = ''
  message.success('清除成功')
})

transformBtn.addEventListener('click', function (event) {
  if (!videoInput.files[0]) {
    message.error('请选择视频文件！')
    return
  }
  let filePath = videoInput.files[0].path
  let newFilepath = filePath.split('.mp4')
  newFilepath = newFilepath[0] + '-新' + '.mp4'
  console.log(bento4.mp4fragment, filePath, newFilepath)
  chileProcess.execFile(bento4.mp4fragment, [filePath, newFilepath], (error, stdout) => {
    if (error) {
      console.log('error')
      message.error('视频转换失败！')
    } else {
      console.log(stdout)
      message.success('视频转换成功！')
    }
  })
})