import { ethers } from "ethers";

//check if the environment have ethereum global vars.
function getEth() {
    // @ts-ignore
    const eth = window.ethereum;

    if(!eth){
        throw new Error("No ethereum provider found");
    }
    return eth;


}

//check if the account is reachable
async function requestAccess(){ 

    const eth = getEth();
    const result = await eth.request({method:"eth_requestAccounts"}) as string[];

    return result && result.length>0;

}

async function hasSiners() {
    const metamask = getEth();
    const signer = await metamask.request({method: "eth_accounts"}) as string[];
    return signer.length > 0;
}

//connect contract
async function getContract(){
    // 1.ADDRESS
    // 2.FUNCTION NAME 
    // 3.provider

    if (!await hasSiners() && !await requestAccess()){
        throw new Error("No ethereum provider found");
    }

    const provider = new ethers.BrowserProvider(getEth());
    const address = process.env.CONTRACT_ADDRESS;
    const contract = new ethers.Contract(
        address,
        [
            "function hello() public pure returns(string memory)"
        ],
        provider

    )
    document.body.innerHTML = await contract.hello();

}

async function main() {
    await getContract();
}

main();