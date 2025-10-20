import './style.css'; // 导入样式
import logo from '@renderer/assets/logo.png';

function Info(): JSX.Element {
  const openDevTool = () => {
    // 打开开发者工具的逻辑
    console.log('开发者工具');
  };

  const minimize = () => {
    // 最小化窗口的逻辑
    console.log('最小化');
  };

  const maximize = () => {
    // 最大化窗口的逻辑
    console.log('最大化');
  };

  const close = () => {
    // 关闭窗口的逻辑
    console.log('关闭');
  };


  const process = {
    platform: 'win32', // 根据实际平台设置
  };

  return (
    <div className="info-wrapper">
      <div className="info">
        <img src={logo} />
        <span>rubick 系统菜单</span>
      </div>
      <div className="handle-container">
        <div className="handle">
          <div className="devtool" onClick={openDevTool} title="开发者工具"></div>
        </div>
        <div className="window-handle" style={{ display: process.platform !== 'darwin' ? 'flex' : 'none' }}>
          <div className="minimize" onClick={minimize}></div>
          <div className="maximize" onClick={maximize}></div>
          <div className="close" onClick={close}></div>
        </div>
      </div>
    </div>
  );
}

export default Info;
