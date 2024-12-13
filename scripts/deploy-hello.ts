import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy(){
    const HW = await ethers.getContractFactory("HelloWorld");
    const hw = await HW.deploy();
    await hw.waitForDeployment();
    return hw;
}

async function sayHello(hello:any){
    console.log(await hello.hello());
}

deploy().then(sayHello);