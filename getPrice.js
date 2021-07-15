const Web3 = require("web3")


const web3 = new Web3("https://bsc-dataseed.binance.org");
const abi = [
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsOut",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  }
];

const ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; //v2
const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";

const fetch = async (input) => {
    const amountIn = web3.utils.toWei("1", "ether")
    const tokenOut = input.trim()
    const router = new web3.eth.Contract(abi, ROUTER)
    const amounts = await router.methods.getAmountsOut(amountIn, [tokenOut, BUSD]).call()
    const currentPrice = amounts[1] / Math.pow(10, 18);
    console.log("price = ", currentPrice, "USD");
}
fetch("0xF4Ed363144981D3A65f42e7D0DC54FF9EEf559A1"); //random token
fetch("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"); //wbnb