const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    const Guestbook = await hre.ethers.getContractFactory("Guestbook");

    const guestbook = await Guestbook.deploy();

    await guestbook.waitForDeployment();

    const address = await guestbook.getAddress();

    console.log(`Guestbook deployed to: ${address}`);

    const frontendDir = path.join(__dirname, "..", "..", "frontend", "app");

    const addressFile = path.join(frontendDir, "contract-address.json");
    fs.writeFileSync(
        addressFile,
        JSON.stringify({ address: address }, null, 2)
    );

    const artifact = await hre.artifacts.readArtifact("Guestbook");
    const abiFile = path.join(frontendDir, "abi.json");
    fs.writeFileSync(
        abiFile,
        JSON.stringify({ abi: artifact.abi }, null, 2)
    );

    console.log("Frontend files updated.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
