const web3 = new Web3(window.ethereum);

window.ethereum.enable(); // Запрос на подключение к кошельку

// Адрес контракта и ABI (вам нужно заменить на актуальный адрес вашего контракта)
const contractAddress = "0x173799E94Bf1d95Da829B7F7099cC13C583f3E27";
const contractABI = YOUR_CONTRACT_ABI;

// Получение данных о балансе
async function getBalance() {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const balance = await contract.methods.balanceOf(account).call();
    const formattedBalance = web3.utils.fromWei(balance, 'ether');
    document.getElementById("balance").innerText = formattedBalance + " USDT";
}

// Получение цены токена с API CoinGecko
async function getTokenPrice() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd');
    const data = await response.json();
    const price = data.tether.usd;
    document.getElementById("price").innerText = price;
}

// Установка изображения токена
function setTokenImage() {
    const imageUrl = "https://www.coingecko.com/en/coins/tether"; // Замените на ссылку на изображение
    document.getElementById("token-img").src = imageUrl;
}

// Инициализация
async function init() {
    await getBalance();
    await getTokenPrice();
    setTokenImage();
}

init();
