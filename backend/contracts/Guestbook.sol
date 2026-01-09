// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Guestbook {
    // Definisi struktur pesan
    struct Message {
        address sender;
        string message;
        uint256 timestamp;
    }

    // Array untuk menyimpan semua pesan
    Message[] public messages;

    // Event yang akan dipancarkan ketika pesan baru dibuat
    event NewMessage(address indexed sender, string message, uint256 timestamp);

    // Fungsi untuk menulis pesan ke guestbook
    // Input: _message (string) - isi pesan
    function postMessage(string memory _message) public {
        // Validasi: Pesan tidak boleh kosong
        require(bytes(_message).length > 0, "Pesan tidak boleh kosong");

        // Membuat pesan baru dan menambahkannya ke array
        messages.push(Message(msg.sender, _message, block.timestamp));

        // Memancarkan event agar frontend tahu ada pesan baru
        emit NewMessage(msg.sender, _message, block.timestamp);
    }

    // Fungsi untuk mengambil semua pesan
    // Output: Array of Message
    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }
}
