ethereum.autoRefreshOnNetworkChange = false;
ethereum.enable();

const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer = provider.getSigner(); // the person signed into mask is the 'signer'
const contractAddress = "0x89ec369cBdD2B16a136cd0d6f4Cc33b984f184b9"; // insert your contract address here
const contractABI = [
  "function changeStatus() public",
  "function viewStatus() public view returns (string memory)"
];

// we use the 'contract' variable when we need to read from the blockchain
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// we use the 'tokenWithSigner' variable when we need to do a transaction that
// involves spending ETH (e.g. sending ETH, sending tokens, writing to a contract)
const tokenWithSigner = contract.connect(signer);


// executes the status change upon clicking the button
$('.change-status').click(changeStatus)

// reads and displays the contract's art status directly from the blockchain
viewStatus();

// an asynchrononous function to view the art status of the contract
async function viewStatus() {
    let status = await contract.viewStatus();

    $('.is-art').text(`${status}`);
    // console.log(status);
}

// Change the status of the contract between "is not art" and "is art"
function changeStatus() {
    tokenWithSigner.changeStatus();
}

// a not so elegant but totally functioning way to automatically
// update the displayed status of the contract after changing it
setInterval(function(){
    viewStatus();
    // console.log("checking...")
}, 2000);