import './styles.css' // 导入样式
import {  useNavigate } from 'react-router-dom'
import { useEffect,useRef } from 'react'
import wechat from '@renderer/assets/wechat.png'
import paypal from '@renderer/assets/paypal.png'
import qq from '@renderer/assets/qq.png'

function Search(): JSX.Element {
  const navigate = useNavigate() // 使用 React Router 的 useNavigate Hook
  const inputRef = useRef<HTMLInputElement>(null) // 创建一个 ref 引用
  // 页面加载后自动聚焦输入框
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const goToSettings = () => {
    console.log('跳转到设置页')
    navigate('/info') // 跳转到设置页面
  }

  // 示例搜索结果数据
  const searchResult = [
    { id: 1, title: '微信', icon: wechat, path: wechat },
    { id: 2, title: 'Paypal', icon: paypal, path: paypal },
    { id: 3, title: 'QQ', icon: qq, path: qq }
  ]

  const handleResultClick = (path: string) => {
    console.log(`打开应用或链接: ${path}`)
    // 在这里添加打开应用或链接的逻辑
  }
  return (
    <>
      <div className="search-wrapper">
        {/* 图标按钮 */}
        <div className="info-logo" onClick={goToSettings} title="打开设置">
          ⚙️
        </div>
        {/* 搜索输入框 */}
        <input   ref={inputRef}   className="search-input" type="text" placeholder="请输入内容..." />
      </div>
      <div className="search-container">
        {/* 其他内容可以放在这里 */}
        <h3>搜索结果</h3>
        <div className="search-result-list">
          {searchResult.map((result) => (
            <div key={result.id} className="search-result-item" onClick={handleResultClick}>
              <div className="result-icon">
                {/* 渲染图片 */}
                <img src={result.icon} alt={result.title} />
              </div>
              <div className="result-name">{result.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Search
