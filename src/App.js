import { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import {fetchLotteryInfo, play, drawLottery} from './utils/lotteryInstance'

function App() {
  const [lotteryInfo, setLotteryInfo] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchLotteryInfo(window.ethereum).then(info => setLotteryInfo(info))
    window.ethereum.on('accountsChanged', function (accounts) {
      setRefresh(!refresh)
    })
  }, [refresh]);

  return (
    <div className="App flex-center">
      <img 
        src="https://steveyuowo.com/static/46bbbd79ad052a2d571f0710e919310d/profile.png" 
        alt="lottery hero"
        width="400"
        height="400" />
      <h1>Steve Yu‘s Lottery DApp</h1>

      <div className="info">
        <div className="award flex-center">
          <div className="title">奖池: </div>
          <div className="content">{lotteryInfo.balance} ETH</div>
        </div>
        <div className="round flex-center">
          第 {lotteryInfo.round} 轮
        </div>

        <div className="flex-center">
          <button className="common m-10" onClick={() => play(lotteryInfo.account ?? '').then(() => setRefresh(!refresh))}>投注 1eth 参与</button>
          <button className="common m-10" onClick={() => drawLottery(lotteryInfo.account ?? '').then(() => setRefresh(!refresh))}>管理员开奖</button>
        </div>

        <div className="other-info flex-center">
          {lotteryInfo.playersNumber} 人参与
        </div>
        <div className="other-info flex-center">
          <div>当前账户:</div>
          <div className="pd-r-10">{lotteryInfo.account?.substr(0, 7) ?? '无'}</div>
          <div>上轮获胜: </div>
          <div className="pd-r-10">{lotteryInfo.winner === '0x00000' ? '无': lotteryInfo.winner}</div>
          <div>管理员: </div>
          <div className="pd-r-10">{lotteryInfo.manager}</div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
