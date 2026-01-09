const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Guestbook", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployGuestbookFixture() {
        const [owner, otherAccount] = await ethers.getSigners();

        const Guestbook = await ethers.getContractFactory("Guestbook");
        const guestbook = await Guestbook.deploy();

        return { guestbook, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should start with 0 messages", async function () {
            const { guestbook } = await loadFixture(deployGuestbookFixture);

            const messages = await guestbook.getAllMessages();
            expect(messages.length).to.equal(0);
        });
    });

    describe("Transactions", function () {
        it("Should allow a user to post a message", async function () {
            const { guestbook, owner } = await loadFixture(deployGuestbookFixture);

            const messageContent = "Hello Web3!";
            await guestbook.postMessage(messageContent);

            const messages = await guestbook.getAllMessages();
            expect(messages.length).to.equal(1);
            expect(messages[0].message).to.equal(messageContent);
            expect(messages[0].sender).to.equal(owner.address);
        });

        it("Should emit NewMessage event", async function () {
            const { guestbook, owner } = await loadFixture(deployGuestbookFixture);
            const messageContent = "Event Test";

            await expect(guestbook.postMessage(messageContent))
                .to.emit(guestbook, "NewMessage")
                .withArgs(owner.address, messageContent, anyValue); // We accept any timestamp
        });

        it("Should reject empty messages", async function () {
            const { guestbook } = await loadFixture(deployGuestbookFixture);

            await expect(guestbook.postMessage("")).to.be.revertedWith(
                "Pesan tidak boleh kosong"
            );
        });
    });
});
