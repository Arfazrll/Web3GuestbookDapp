// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Guestbook {
    struct Message {
        address sender;
        string message;
        uint256 timestamp;
    }

    Message[] public messages;

    event NewMessage(address indexed sender, string message, uint256 timestamp);

    function postMessage(string memory _message) public {
        require(bytes(_message).length > 0, "Pesan tidak boleh kosong");

        messages.push(Message(msg.sender, _message, block.timestamp));

        emit NewMessage(msg.sender, _message, block.timestamp);
    }

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }
}
