import './pure-min.css'
import './main.css'
const bento4 = require('bento4-installer')
const chileProcess = require('child_process')
import Message from './message'
let message = new Message()

let app = document.getElementById('app')
let body = document.querySelector('body')

let readme = document.createElement('div')
readme.classList.add('readme')
readme.innerHTML =
`<div>
  <div class="delete-btn">X</div>
  <h3>mp4转fmp4小工具</h3>
  <h4>1.支持功能</h4>
  <ul>
    <li>视频格式转换</li>
    <li>视频格式校验</li>
  </ul>
  <h4>2.用法</h4>
  <ol>
    <li>首先选择需要转码或校验的视频</li>
    <li>点击视频转换或者视频校验按钮</li>
  </ol>
  <div>视频转换功能会默认将转码后的视频输出到需要转码的视频的所在的目录并命名，如输入视频名称为
  <span class="warn">号码保护.mp4</span>，则输出视频名称为<span class="warn">号码保护-新.mp4</span></div>
</div>`

let videoInput = document.createElement('input')
videoInput.setAttribute('type', 'file')
videoInput.id = 'videoInput'

let resetBtn = document.createElement('button')
resetBtn.innerText = '清空视频'
resetBtn.className = 'pure-button button-error'
resetBtn.style = 'margin-top:20px;'

let transformBtn = document.createElement('button')
transformBtn.innerText = '视频转换'
transformBtn.id = 'transformBtn'
transformBtn.className = 'pure-button pure-button-primary'
transformBtn.style = 'margin-top:20px;'

let checkBtn = document.createElement('button')
checkBtn.innerText = '视频检测'
checkBtn.id='checkBtn'
checkBtn.className = 'pure-button button-success'
checkBtn.style = 'margin-top:20px;'

body.appendChild(readme)
app.appendChild(videoInput)
app.appendChild(resetBtn)
app.appendChild(transformBtn)
app.appendChild(checkBtn)

resetBtn.addEventListener('click', function () {
  videoInput.value = ''
  message.success('清除成功')
})

transformBtn.addEventListener('click', function (event) {
  if (!videoInput.files[0]) {
    message.error('请选择要转换的视频文件！')
    return
  }
  let filePath = videoInput.files[0].path
  let newFilepath = filePath.split('.mp4')
  newFilepath = newFilepath[0] + '-新' + '.mp4'
  chileProcess.execFile(bento4.mp4fragment, [filePath, newFilepath], (error, stdout) => {
    if (error) {
      message.error('视频转换失败！')
      throw error
    } else {
      console.log(stdout)
      message.success('视频转换成功！')
    }
  })
})

checkBtn.addEventListener('click', function () {
  if (!videoInput.files[0]) {
    message.error('请选择要检测的视频文件！')
    return
  }
  let filePath = videoInput.files[0].path
  chileProcess.execFile(bento4.mp4info, [filePath], (error, stdout) => {
    if (error) {
      message.error('视频检测失败！')
      throw error
    } else {
      let isFmp4 = /fragments:  yes/.test(stdout)
      if (isFmp4) {
        message.success('该视频格式为fmp4')
      } else {
        message.error('该视频格式不是fmp4，请转换！')
      }
    }
  })
})

let deleteReadMeBtn = document.querySelector('.delete-btn')
deleteReadMeBtn.addEventListener('click', function () {
  body.removeChild(readme)
})