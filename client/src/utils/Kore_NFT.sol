// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.3/contracts/token/ERC721/ERC721.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.3/contracts/access/Ownable.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.3/contracts/utils/Counters.sol";

contract KoreNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private _tokenURIs;

    // Hardcoded metadata
    string private constant NAME = "Kore NFT";
    string private constant DESCRIPTION = "A unique NFT from the Kuverse Kore collection.";
    string private constant IMAGE_URL = "https://kuverse.app/kuLogo.JPG";

    event KoreMinted(uint256 indexed tokenId, address indexed owner, string tokenURI);

    constructor() ERC721("KoreNFT", "KORE") {}

    // Mint a new Kore NFT with hardcoded metadata
    function mintKore(address to) public onlyOwner returns (uint256) {
        require(to != address(0), "Cannot mint to zero address");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, generateTokenURI(newTokenId));

        emit KoreMinted(newTokenId, to, _tokenURIs[newTokenId]);
        return newTokenId;
    }

    // Generate a token URI using hardcoded metadata
    function generateTokenURI(uint256 tokenId) internal view returns (string memory) {
        // Construct a JSON metadata string
        string memory json = string(
            abi.encodePacked(
                '{"name": "', NAME, ' #', uintToString(tokenId), '",',
                '"description": "', DESCRIPTION, '",',
                '"image": "', IMAGE_URL, '"}'
            )
        );
        // Return as a data URI (base64 encoding optional)
        return string(abi.encodePacked("data:application/json;utf8,", json));
    }

    // Internal function to set URI
    function _setTokenURI(uint256 tokenId, string memory metadataURI) internal {
        // Replace _exists with a check using ownerOf
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        _tokenURIs[tokenId] = metadataURI;
    }

    // Get token URI (overrides ERC721)
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    // Transfer function with additional checks
    function transfer(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(to != address(0), "Cannot transfer to zero address");
        _transfer(msg.sender, to, tokenId);
    }

    // Get total supply
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    // Helper function to convert uint to string
    function uintToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + (value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}