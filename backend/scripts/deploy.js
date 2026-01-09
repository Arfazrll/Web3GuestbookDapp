const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    // Mendapatkan contract factory
    const Guestbook = await hre.ethers.getContractFactory("Guestbook");

    // Melakukan deploy contract
    const guestbook = await Guestbook.deploy();

    // Menunggu sampai proses deployment selesai
    await guestbook.waitForDeployment();

    const address = await guestbook.getAddress();

    console.log(`Guestbook deployed to: ${address}`);

    // Update Frontend Files
    const frontendDir = path.join(__dirname, "..", "..", "frontend", "app");

    // Save Address
    const addressFile = path.join(frontendDir, "contract-address.json");
    fs.writeFileSync(
        addressFile,
        JSON.stringify({ address: address }, null, 2)
    );

    // Save ABI
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
