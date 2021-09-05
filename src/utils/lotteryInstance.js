import abi from '../shared/lottery-abi.json'
import Web3 from 'web3'
import { toast } from 'react-toastify';

function createLotteryInstance(provider) {
  const web3 = new Web3(provider);
  const contractAddress = '0x3AFb922D64454b331e41dEa9b47b250bC9478234';
  window.lotteryInstance = new web3.eth.Contract(abi, contractAddress)
}

export default createLotteryInstance;

export const manager = async () => await window.lotteryInstance.methods.manager().call();
export const round = async () => await window.lotteryInstance.methods.round().call();
export const winner = async () => await window.lotteryInstance.methods.winner().call();
export const balance = async () => await window.lotteryInstance.methods.getBalance().call();
export const playersNumber = async () => await window.lotteryInstance.methods.getPlayersNumber().call();

export const drawLottery = async (userAddress) => {
  try {
    await window.lotteryInstance.methods.drawLottery().send({
      from: userAddress,
      value: 0
    })
    toast.success(`开奖成功, 获胜者: ${await winner()}`)
  } catch (err) {
    toast.error('非管理员不能开奖')
  }
};

export const play = async (userAddress) => {
  try {
    await window.lotteryInstance.methods.play().send({
      from: userAddress,
      value: Web3.utils.toWei('1', 'ether'),
      gas: '3000000'
    })
    toast.success('投注成功')
  } catch (err) {
    toast.error('投注失败')
  }
};

export const fetchLotteryInfo = async function fetchLotteryInfo() {
  createLotteryInstance(window.ethereum);
  return {
    manager: (await manager()).substring(0, 7),
    round: await round(),
    winner: (await winner()).substring(0, 7),
    balance: Web3.utils.fromWei((await balance()), 'ether'),
    playersNumber: await playersNumber(),
    account: await window.ethereum.selectedAddress
  }
}