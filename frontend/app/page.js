"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import GuestbookABI from "./abi.json";

import contractAddressData from "./contract-address.json";

// Ganti dengan alamat contract setelah deploy.
// Untuk local hardhat biasanya: 0x5FbDB2315678afecb367f032d93F642f64180aa3
const contractAddress = contractAddressData.address;

export default function Home() {
    const [currentAccount, setCurrentAccount] = useState("");
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [status, setStatus] = useState("");

    // Fungsi untuk mengecek apakah wallet terhubung
    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                setStatus("Pastikan Anda memiliki Metamask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                setCurrentAccount(account);
                setStatus("Wallet terhubung.");
            } else {
                setStatus("Belum terhubung ke Wallet.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Fungsi untuk menghubungkan wallet
    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            const chainId = await ethereum.request({ method: "eth_chainId" });
            console.log("Connected to chain " + chainId);

            // 0x7a69 is 31337 in hex
            if (chainId !== "0x7a69") {
                alert("Please connect to Localhost 8545 (Chain ID 31337)");
            }

            setCurrentAccount(accounts[0]);
            setStatus("Wallet terhubung!");
        } catch (error) {
            console.log(error);
        }
    };

    // Fungsi untuk mengambil pesan
    const getAllMessages = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.BrowserProvider(ethereum);
                const signer = await provider.getSigner();

                // Cek apakah contract ada di network ini
                const code = await provider.getCode(contractAddress);
                if (code === "0x") {
                    console.error("Contract not found at address:", contractAddress);
                    setStatus("Error: Contract belum dideploy di network ini. Jalankan deploy script!");
                    return;
                }

                const guestbookContract = new ethers.Contract(contractAddress, GuestbookABI.abi, signer);

                const messages = await guestbookContract.getAllMessages();

                // Format pesan agar lebih mudah dibaca
                const messagesCleaned = messages.map(msg => {
                    return {
                        sender: msg.sender,
                        message: msg.message,
                        timestamp: Number(msg.timestamp) // Konversi BigInt ke int biasa menggunakan Number()
                    };
                });

                // Set state
                setAllMessages(messagesCleaned);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
            setStatus("Gagal mengambil pesan. Pastikan Hardhat node jalan & sudah deploy.");
        }
    };

    // Fungsi untuk mengirim pesan
    const sendMessage = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.BrowserProvider(ethereum);
                const signer = await provider.getSigner();
                const guestbookContract = new ethers.Contract(contractAddress, GuestbookABI.abi, signer);

                const txn = await guestbookContract.postMessage(message);
                setStatus("Mengirim pesan... Harap tunggu.");
                await txn.wait();

                setStatus("Pesan terkirim!");
                setMessage("");
                getAllMessages(); // Refresh pesan
            }
        } catch (error) {
            console.log(error);
            setStatus("Gagal mengirim pesan.");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        getAllMessages();
        console.log("Contract Address being used:", contractAddress);
        console.log("ABI loaded:", GuestbookABI.abi ? "Yes" : "No");
    }, []);

    return (
        <main className="container">
            <header className="header">
                <h1 className="title">BLOCKCHAIN GUESTBOOK</h1>
                <p className="subtitle">NODE: LOCALHOST :: STATUS: ONLINE</p>
            </header>

            <div className="card" style={{ textAlign: "center" }}>
                {!currentAccount ? (
                    <div>
                        <p style={{ marginBottom: "1rem" }}>Hubungkan dompet untuk mulai menulis.</p>
                        <button className="connect-btn" onClick={connectWallet}>
                            Hubungkan Wallet
                        </button>
                    </div>
                ) : (
                    <div>
                        <div style={{ marginBottom: "1rem" }}>
                            <span className="badge">{currentAccount.substring(0, 6)}...{currentAccount.substring(38)}</span>
                        </div>
                        <p style={{ color: "var(--primary)", fontWeight: "bold" }}>{status}</p>
                    </div>
                )}
            </div>

            {currentAccount && (
                <div className="card input-area">
                    <textarea
                        className="textarea"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Masukkan data ke dalam blok..."
                    />
                    <button className="connect-btn" onClick={sendMessage}>
                        EKSEKUSI TRANSAKSI
                    </button>
                    <div style={{ marginTop: "1rem" }}>
                        <button
                            style={{
                                backgroundColor: "transparent",
                                border: "1px solid var(--text)",
                                color: "var(--text)",
                                padding: "0.5rem 1rem",
                                cursor: "pointer",
                                fontSize: "0.8rem"
                            }}
                            onClick={() => {
                                getAllMessages();
                                alert("Memeriksa status kontrak...");
                            }}
                        >
                            Cek Koneksi Kontrak
                        </button>
                    </div>
                </div>
            )}

            <div className="message-list">
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Pesan Terbaru</h2>
                {allMessages.map((msg, index) => (
                    <div key={index} className="message-item">
                        <div className="message-meta">
                            <span className="badge">{msg.sender.substring(0, 6)}...{msg.sender.substring(38)}</span>
                            <span>{new Date(msg.timestamp * 1000).toLocaleString()}</span>
                        </div>
                        <div className="message-content">{msg.message}</div>
                    </div>
                ))}
                {allMessages.length === 0 && (
                    <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>
                        Belum ada pesan. Jadilah yang pertama!
                    </div>
                )}
            </div>
        </main>
    );
}
