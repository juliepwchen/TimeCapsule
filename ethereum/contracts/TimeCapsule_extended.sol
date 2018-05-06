pragma solidity ^0.4.21;

/// @title Interface for contracts conforming to ERC-721: Non-Fungible Tokens
/// @author Dieter Shirley <dete@axiomzen.co> (https://github.com/dete)
contract ERC721 {
    // Required methods
    function totalSupply() public view returns (uint256 total);
    function balanceOf(address owner) public view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function approve(address to, uint256 tokenId) external;
    function transfer(address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;

    // Events
    event Transfer(address from, address to, uint256 tokenId);
    event Approval(address owner, address approved, uint256 tokenId);

    // Optional
    function name() public view returns (string name);
    function symbol() public view returns (string symbol);
    function tokensOfOwner(address _owner) external view returns (uint256[] tokenIds);
    function tokenMetadata(uint256 _tokenId, string _preferredTransport) public view returns (string infoUrl);

    // ERC-165 Compatibility (https://github.com/ethereum/EIPs/issues/165)
    function supportsInterface(bytes4 _interfaceID) external view returns (bool);
}

contract TimeCapsuleFactory {
    address[] public deployTimeCapsules;

    function createTimeCapsule() public {
        deployTimeCapsules.push(new TimeCapsule(msg.sender));
    }
    function getDeployTimeCapsules() public view returns(address[]) {
        return deployTimeCapsules;
    }
}

contract TimeCapsule is ERC721 {
    struct Letter {
        uint256 tokenId;
        bytes32 letterType;
        bytes32 ipfsHash;
        bytes32 letterDescription;
        uint timeAllowToOpen;
        uint expirationDate;
        address senderID;
        address receiverID;
        address ownerID;
        bool receiverGottenFromIPFS;
        bool releasedToReceiver;
        bytes32 shortMessage;
        bytes32 codeName;
        bytes32 hints;
    }
    address private manager;     //Contract manager
    Letter[] internal letters;   //manager owns ALL Letters in Contract

    //Letters own by creator/owner - ownershipTokenCount
    mapping(address => Letter[]) internal ownerLetterList;

    mapping(address => Letter[]) internal senderLetterList;
    mapping(address => Letter[]) internal receiverLetterList;
    address[] private senderList;   //all senders in Contract
    address[] private receiverList; //all receivers in Contract
    address[] private ownerList;    //all owner of Letters in Contract
    mapping(address => address[]) private receiverListOfSender;
    mapping(address => address[]) private senderListOfReceiver;
    mapping(address => address[]) private senderListOfOwner;
    mapping(address => address[]) private receiverListOfOwner;

    mapping(uint256 => address) private ownerOfToken;  //return owner owning token
    mapping(address => mapping(uint256 => uint256)) private tokenByOwner;
    mapping(address => uint256[]) private tokensByOwner; //return array of tokens
    mapping(uint256 => bool) private tokenExists;

    //ERC165 -----------------------------------------------------
    bytes4 constant InterfaceSignature_ERC165 = bytes4(keccak256("supportsInterface(bytes4)"));

    //ERC721 -----------------------------------------------------
    /// @notice Name and symbol of the non fungible token, as defined in ERC721.
    //string public constant name = "TimeCapsule";
    //string public constant symbol = "TC";

    bytes4 constant InterfaceSignature_ERC721 = 
    bytes4(keccak256("name()")) ^ 
    bytes4(keccak256("symbol()")) ^ 
    bytes4(keccak256("totalSupply()")) ^
    bytes4(keccak256("balanceOf(address)")) ^
    bytes4(keccak256("ownerOf(uint256)")) ^
    bytes4(keccak256("approve(address,uint256)")) ^
    bytes4(keccak256("transfer(address,uint256)")) ^
    bytes4(keccak256("transferFrom(address,address,uint256)")) ^
    bytes4(keccak256("tokensOfOwner(address)")) ^
    bytes4(keccak256("tokenMetadata(uint256,string)"));

    //use Keccak256 to programmatically compare the strings
    function compareStrings (string a, string b) internal view returns (bool){
        return keccak256(a) == keccak256(b);
    }
    /// @notice Introspection interface as per ERC-165 (https://github.com/ethereum/EIPs/issues/165).
    ///  Returns true for any standardized interfaces implemented by this contract. 
    ///  This Contract implements ERC-165 and ERC-721.
    function supportsInterface(bytes4 interfaceID) external view returns (bool)
    {
        // DEBUG ONLY
        //require((InterfaceSignature_ERC165 == 0x01ffc9a7) && (InterfaceSignature_ERC721 == 0x9a20483d));

        return ((interfaceID == InterfaceSignature_ERC165) || (interfaceID == InterfaceSignature_ERC721));
    }

    //ERC-20-like functions
    function name() public view returns (string) {
        return "Time Capsule";
    }
    function symbol() public view returns (string) {
        return "TC";
    }
    function totalSupply() public view returns (uint) {
        return letters.length - 1;
    }
    /// @notice Returns the number of Letters owned by a specific address.
    /// @param owner The owner address to check.
    /// @dev Required for ERC-721 compliance
    function balanceOf(address owner) public view returns (uint256 count) {
        return ownerLetterList[owner].length;
    }
    /// @notice Returns the address currently assigned ownership of a given Letter.
    /// @dev Required for ERC-721 compliance.
    function ownerOf(uint256 tokenId) external view returns (address owner)
    {
        require(tokenExists[tokenId]);
        owner = ownerOfToken[tokenId];

        //require(owner != address(0));
    }
    //return a token own by Owner at index
    function tokenOfOwnerByIndex(address owner, uint256 index) internal constant returns (uint){
        return tokenByOwner[owner][index];
    }
    /// @notice Returns a list of all Letter token IDs assigned to an address.
    /// @param owner The owner whose Letters we are interested in.
    function tokensOfOwner(address owner) external view returns(uint256[]) {
        uint256 tokenCount = balanceOf(owner);

        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            return tokensByOwner[owner];
        }
    }
    //TODO!
    event Transfer(address indexed from, address indexed to, uint256 tokenId);
    function transfer(address to, uint256 tokenId) external {
        address currentOwner = msg.sender;
        address newOwner = to;
        require(tokenExists[tokenId]);
        require(currentOwner == ownerOf(tokenId));
        require(currentOwner != newOwner);
        require(newOwner != address(0));
        removeFromTokenList(tokenId);
        balances[oldOwner] -= 1;
        tokenOwners[tokenId] = newOwner;
        balances[newOwner] += 1;
        Transfer(oldOwner, newOwner, tokenId);
    }
    /// @dev Assigns ownership of a specific Letter to an address.
    function transfer(address from, address to, uint256 tokenId) internal {
        // Since the number of letters is capped to 2^32 we can't overflow this
        tokensByOwner[to]++;
        // transfer ownership
        ownerOfToken[tokenId] = to;
        // When creating new letters from is 0x0, but we can't account that address.
        if (from != address(0)) {
            ownerLetterList[from]--;
            // once the kitten is transferred also clear sire allowances
            delete sireAllowedToAddress[tokenId];
            // clear any previously approved ownership exchange
            delete kittyIndexToApproved[tokenId];
        }
        // Emit the transfer event.
        emit Transfer(from, to, tokenId);
    }
    /// @dev Checks if a given address is the current owner of a particular Letter.
    /// @param _claimant the address we are validating against.
    /// @param _tokenId kitten id, only valid when > 0
    function owns(address claimant, uint256 tokenId) internal view returns (bool) {
        return ownerOfToken[tokenId] == claimant;
    }
    /// @notice Transfers a Letter to another address. 
    /// @param to The address of the recipient, can be a user or contract.
    /// @param tokenId The ID of the Letter to transfer.
    /// @dev Required for ERC-721 compliance.
    function transfer( address to, uint256 tokenId ) external whenNotPaused
    {
        // You can only send your own cat.
        require(owns(msg.sender, tokenId));

        // Reassign ownership, clear pending approvals, emit Transfer event.
        transfer(msg.sender, to, tokenId);
    }
    /// @notice Transfer a Letter owned by another address, for which the calling address
    ///  has previously been granted transfer approval by the owner.
    /// @param from The address that owns the Letter to be transfered.
    /// @param to The address that should take ownership of the Letter. Can be any address,
    ///  including the caller.
    /// @param tokenId The ID of the Letter to be transferred.
    /// @dev Required for ERC-721 compliance.

    //TODO!
    function transferFrom (
        address from,
        address to,
        uint256 tokenId
    )
        external
        whenNotPaused
    {
        // Safety check to prevent against an unexpected 0x0 default.
        require(to != address(0));
        // Disallow transfers to this contract to prevent accidental misuse.
        // The contract should never own any kitties (except very briefly
        // after a gen0 cat is created and before it goes on auction).
        require(to != address(this));
        // Check for approval and valid ownership
        require(approvedFor(msg.sender, tokenId));
        require(owns(from, tokenId));

        // Reassign ownership (also clears pending approvals and emits Transfer event).
        transfer(from, to, tokenId);
    }
    //TODO!
    event Approval(address indexed owner, address indexed approved, uint256 tokenId);
    mapping(address => mapping (address => uint256)) allowed;
    function approve(address to, uint256 tokenId) external {
        require(msg.sender == ownerOf(tokenId));
        require(msg.sender != to);
        allowed[msg.sender][to] = tokenId;
        emit Approval(msg.sender, to, tokenId);
    }
    /// @notice Grant another address the right to transfer a specific Kitty via
    ///  transferFrom(). This is the preferred flow for transfering NFTs to contracts.
    /// @param _to The address to be granted transfer approval. Pass address(0) to
    ///  clear all approvals.
    /// @param _tokenId The ID of the Kitty that can be transferred if this call succeeds.
    /// @dev Required for ERC-721 compliance.
    function approve(
        address _to,
        uint256 _tokenId
    )
        external
        whenNotPaused
    {
        // Only an owner can grant transfer approval.
        require(_owns(msg.sender, _tokenId));

        // Register the approval (replacing any previous approval).
        _approve(_tokenId, _to);

        // Emit approval event.
        Approval(msg.sender, _to, _tokenId);
    }
    //TODO!
    function takeOwnership(uint256 tokenId){
        require(tokenExists[tokenId]);
        address oldOwner = ownerOf(tokenId);
        address newOwner = msg.sender;
        require(newOwner != oldOwner);
        require(allowed[oldOwner][newOwner] == tokenId);
        balances[oldOwner] -= 1;
        tokenOwners[tokenId] = newOwner;
        balances[newOwner] += 1;
        emit Transfer(oldOwner, newOwner, tokenId);
    }
    //TODO!
    mapping(address => mapping(uint256 => uint256)) private ownerTokens;
    function removeFromTokenList(address owner, uint256 tokenId) private {
        for(uint256 i = 0;ownerTokens[owner][i] != tokenId;i++){
        ownerTokens[owner][i] = 0;
        }
    }
    //TODO!
    mapping(uint256 => string) tokenLinks;
    function tokenMetadata(uint256 tokenId, string preferredTransport) public view returns (string infoUrl) {
        return tokenLinks[tokenId];
    }
    //------------------------------------------------------------
       
    function TimeCapsule(address sender) public {
        manager = sender;
    }

    modifier managerOnly() {
        require(msg.sender == manager);
        _;
    }
    modifier ownerOnly() {
        require(ownerLetterList[msg.sender].length > 0);
        _;
    }
    modifier senderOnly() {
        require(senderLetterList[msg.sender].length > 0);
        _;
    }
    modifier receiverOnly() {
        require(receiverLetterList[msg.sender].length > 0);
        _;
    }

    //Flow - before creating the Letter
    //0) FIle is already encripted, deployed on IPFS, returning a Hash
    //1) Grandpa creates a Letter of 'Will' for grand-daughter on her 18th birthday
    //2) letterType = 'Will', msgDescription = 'Happy Birthday!'
    //   timeAllowToOpen = '1/1/2030', expireationDate = '1/1/3000'
    //   (address vs email) senderID = 0xafdasdf, receiverID = 0xasdfsdf
    //   creatorLetterID = 0xasdfasdf , 
    //   ipfsHash = Qm....., receiverGottenFromIPFS=false
    //   releasedToReceiver = True or False depends on creator (checkbox)
    function createLetter(
        bytes32 letterType,
        bytes32 letterDescription,
        uint timeAllowToOpen,
        uint expirationDate,
        address senderID,
        address receiverID,
        bytes32 ipfsHash,
        bool releasedToReceiver,
        bytes32 shortMessage,
        bytes32 codeName,
        bytes32 hints
    ) public {
        Letter memory newLetter = Letter({
            tokenId: letters.length + 1,
            letterType: letterType,
            letterDescription: letterDescription,
            timeAllowToOpen: timeAllowToOpen,
            expirationDate: expirationDate,
            senderID: senderID,
            receiverID: receiverID,
            ownerID: msg.sender,
            ipfsHash: ipfsHash,
            receiverGottenFromIPFS: false,
            releasedToReceiver: releasedToReceiver,
            shortMessage: shortMessage,
            codeName: codeName,
            hints: hints
        });
        letters.push(newLetter);
        senderList.push(senderID);
        receiverList.push(receiverID);
        ownerList.push(msg.sender);

        ownerLetterList[msg.sender].push(newLetter);
        senderLetterList[senderID].push(newLetter);
        receiverLetterList[receiverID].push(newLetter);

        receiverListOfSender[senderID].push(receiverID);
        senderListOfReceiver[receiverID].push(senderID);
        senderListOfOwner[msg.sender].push(senderID);
        receiverListOfOwner[msg.sender].push(receiverID);

        ownerOfToken[letters.length+1] = msg.sender;
        tokenExists[letters.length+1] = true;
        tokenByOwner[msg.sender][letters.length+1] = letters.length+1;
        tokensByOwner[msg.sender].push(letters.length+1);
        
    }
    
    //return a list of Letters associated with Creator, Sender, or Receiver's address
    function getOwnerLetters(address ownerID) internal view returns (Letter[]) {
        return ownerLetterList[ownerID];
    }   
    function getSenderLetters(address senderID) internal view returns (Letter[]) {
        return senderLetterList[senderID];
    }  
    function getReceiverLetters(address receiverID) internal view returns (Letter[]) {
        return receiverLetterList[receiverID];
    } 
    function getAllLetter() internal view returns (Letter[]) {
        return letters;
    } 

    //return a list of Receiver addresses associated with Owner of Letter
    function getReceiverListOfOwner() public view ownerOnly returns (address[]) {
        return receiverListOfOwner[msg.sender];
    } 
    //return a list of Sender addresses associated with Owner of Letter
    function getSenderListOfOwner() public view ownerOnly returns (address[]) {
        return senderListOfOwner[msg.sender];
    } 
    //return a list of Receiver addresses associated with Sender
    function getReceiverListOfSender(address senderID) public view senderOnly returns (address[]) {
        return receiverListOfSender[senderID];
    } 
    //return a list of Sender addresses associated with Receiver
    function getSenderListOfReceiver(address receiverID) public view receiverOnly returns (address[]) {
        return senderListOfReceiver[receiverID];
    } 
    //return a list of Sender addresses associated with Manager of Contract
    function getSenderListOfManager() public view managerOnly returns(address[]) {
        return senderList;
    }
    //return a list of Receiver addresses associated with Manager of Contract
    function getReceiverListOfManager() public view managerOnly returns(address[]) {
        return receiverList;
    }
    //return a list of Creator addresses associated with Manager of Contract
    function getOwnerListOfManager()public view managerOnly returns(address[]) {
        return ownerList;
    }   
}


