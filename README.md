
<div align="center">

# 📒 Web3 Guestbook DApp

<img src="https://a.storyblok.com/f/176646/7ae7bb98d5/bitpanda-academy-intermediate-14-dapp-header-bg.png" width="100%" style="max-height: 200px; object-fit: cover; border-radius: 10px;">

<br>
<br>

<p>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"></a>
  <a href="https://hardhat.org/"><img src="https://img.shields.io/badge/Built%20with-Hardhat-yellow.svg?style=flat-square" alt="Hardhat"></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Frontend-Next.js-black?style=flat-square" alt="Next.js"></a>
  <a href="https://docs.soliditylang.org/"><img src="https://img.shields.io/badge/Smart%20Contract-Solidity-363636?style=flat-square" alt="Solidity"></a>
</p>

<p style="font-size: 1.1rem; max-width: 600px;">
  <strong>A decentralized application allowing users to leave their mark on the blockchain forever.</strong><br>
  Connect wallet, sign the guestbook, be part of history.
</p>

<p>
  <a href="#"><strong>View Demo ↗</strong></a> &nbsp; • &nbsp;
  <a href="#-getting-started"><strong>Get Started 🚀</strong></a> &nbsp; • &nbsp;
  <a href="https://github.com/arfazrll/web3guestbookdapp/issues"><strong>Report Bug 🐛</strong></a>
</p>

</div>

---

## 🧐 About The Project

<div align="left">
  <p>
    <strong>Web3GuestbookDapp</strong> demonstrates the bridge between Web2 (Next.js) and Web3 (Ethereum).
    <br>
    Every entry in this guestbook is <strong>Immutable</strong>, <strong>Decentralized</strong>, and <strong>Transparent</strong>.
  </p>

</div>

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🦊 **Wallet Connect** | Seamless login using MetaMask / Web3 Providers. |
| ✍️ **Sign Guestbook** | Write immutable messages to the Blockchain. |
| 📜 **Real-time Feed** | Auto-fetch and display new entries instantly. |
| 🎉 **Reactions** | Send a virtual "Wave" alongside your message. |

---

## 📂 Project Structure

<details>
<summary><strong>Click to expand file structure details ▾</strong></summary>
<br>

The project is organized as a Monorepo containing two distinct environments:

```bash
web3guestbookdapp/
├── 📂 backend/              # Hardhat Environment (Blockchain)
│   ├── contracts/
│   │   └── Guestbook.sol    # Smart Contract Logic
│   ├── scripts/
│   │   └── deploy.js        # Deployment Script
│   └── test/                # Automated Tests
│
└── 📂 frontend/             # Next.js Environment (User Interface)
    ├── app/
    │   ├── page.js          # Main UI Logic
    │   ├── abi.json         # Contract ABI (Bridge)
    │   └── globals.css      # Styling
    └── public/

```

</details>

---

## 🚀 Getting Started

Follow this simple guide to run the project locally.

### 1️⃣ Prerequisites

* [Node.js](https://nodejs.org/) (v16+)
* [MetaMask](https://metamask.io/) Browser Extension

### 2️⃣ Backend Setup (Smart Contract)

First, we launch the local blockchain.

```bash
cd backend
npm install
npx hardhat node

```

*> Open a new terminal window for the next step:*

```bash
npx hardhat run scripts/deploy.js --network localhost

```

⚠️ **Important:** Copy the `Contract Address` from the terminal output!

### 3️⃣ Frontend Setup (UI)

Connect the interface to your local blockchain.

```bash
cd ../frontend
npm install

```

*> Open `frontend/app/contract-address.json` and paste your Contract Address.*

```bash
npm run dev

```

Visit `http://localhost:3000` 🚀

---

## ⚠️ Troubleshooting

<details>
<summary><strong>Common Issues & Fixes (Click to view) ▾</strong></summary>

| Error | Cause & Solution |
| --- | --- |
| **"Nonce too high"** | **Cause:** Resetting Hardhat node resets the chain ID, but MetaMask remembers old transactions.<br>

<br>**Fix:** MetaMask > Settings > Advanced > Clear Activity Tab Data. |
| **Transaction Failed** | **Cause:** Frontend is talking to an old contract address.<br>

<br>**Fix:** Re-deploy backend & update `contract-address.json`. |

</details>

---

