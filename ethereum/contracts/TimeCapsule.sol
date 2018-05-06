pragma solidity ^0.4.21;
//pragma experimental ABIEncoderV2; 


/// @title Factory contract for TimeCapsule. Holds all TimeCapsule Contracts.
/// @author Julie Chen
/// @dev more documentation to be written.
contract TimeCapsuleFactory {
    address[] public deployTimeCapsules;

    //TODO! add Time Capsule Code Name - Header
    //TODO! add Time Capsule Description - Description
    //TODO! add Time Capsule Hints - meta 
    function createTimeCapsule(uint minimum) public {
        deployTimeCapsules.push(new TimeCapsule(minimum, msg.sender));
    }
    function getDeployTimeCapsules() public view returns(address[]) {
        return deployTimeCapsules;
    }
}

/// @title Base contract for TimeCapsule. Holds all common structs, events and base variables.
/// @author Julie Chen
/// @dev documentation to be written.
contract TimeCapsule {

    //Letter
    struct Letter {
        uint256 tokenId;
        bytes32 letterType;
        bytes32 letterDescription;
        bytes32 ipfsHash;
        uint64 timeAllowToOpen;
        uint64 timeAllowToRelease;
        uint64 expirationDate;
        address senderID;
        address receiverID;
        address ownerID;
        bool isIPFSFileReceived;
        bool isIPFSFileReleased;
        bytes32 shortMessage;
        bytes32 codeName;
        //bytes32 hints; 
    }
    //Manager who created TimeCapsule Contract
    address public manager;  
    //Minimum contribution for qualifying Owners who can create a Letter
    uint minimumContribution;

    //TODO! WHO can set the time for Time Capsule to be OPENED
    //TODO! Items can only be seen when Time Capsule is OPENED
    //TODO! Item
    //category, value, 

    //Array stores all Letters in TimeCapsule Contract
    Letter[] public letters;   

    //Letters own by Owner/Creator, Sender, Receiver - ownershipTokenCount
    mapping(address => mapping(uint256 => Letter)) private lettersOfOwner;
    mapping(address => mapping(uint256 => Letter)) private lettersOfSender;
    mapping(address => mapping(uint256 => Letter)) private lettersOfReceiver;
    mapping(address => uint256) private ownerLetterCount;
    mapping(address => uint256) private senderLetterCount;
    mapping(address => uint256) private receiverLetterCount;
   
    //Arrays store all Owners, Senders, Recievers in TimeCapusle Contract
    address[] private listOfSenders;   
    address[] private listOfReceivers; 
    address[] private listOfOwners;  
    mapping(address => bool) private senders;
    mapping(address => bool) private receivers;
    mapping(address => bool) private owners;

    //Arrays of addresses in relationship to Owners, Senders, Recievers 
    mapping(address => address[]) private receiverListOfSender;
    mapping(address => address[]) private senderListOfReceiver;
    mapping(address => address[]) private senderListOfOwner;
    mapping(address => address[]) private receiverListOfOwner;

    //Return Owner of Letter when given Letter's Token ID
    mapping(uint256 => address) private ownerOfTokenID;  
    //Return Letter's Token ID when given Owner's address & a Letter Index in array of Letters
    mapping(address => mapping(uint256 => uint256)) private tokenIDByOwner;
    //Return an array of Letter's Token IDs own by Owner when given a Owner's address
    mapping(address => uint256[]) private tokenIDsByOwner;
    //Return True when Letter's TokenId exists
    mapping(uint256 => bool) private tokenIDExists;

    /// @dev use Keccak256 to programmatically compare the strings
    //function compareStrings (string a, string b) internal pure returns (bool){
        //return keccak256(a) == keccak256(b);
    //}

    function TimeCapsule(uint minimum, address sender) public {
        manager = sender;
        minimumContribution = minimum;
    }
    ///msg.value = in Wei
    //payable to Contract TimeCapsule - increase Contract balance
    function contribute() public payable {
        require(msg.value > minimumContribution);
        owners[msg.sender] = true;
        listOfOwners.push(msg.sender);
        //approversCount++;
    }

    modifier managerOnly() {
        require(msg.sender == manager);
        _;
    }
    modifier ownerOnly() {
        require(owners[msg.sender]==true);
        _;
    }
    modifier senderOnly() {
        require(senders[msg.sender]);
        _;
    }
    modifier receiverOnly() {
        require(receivers[msg.sender]);
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
        uint64 timeAllowToOpen,
        uint64 timeAllowToRelease,
        uint64 expirationDate,
        address senderID,
        address receiverID,
        bytes32 ipfsHash,
        bytes32 shortMessage,
        bytes32 codeName
        //bytes32 hints
    ) public ownerOnly {
        Letter memory newLetter = Letter({
            tokenId: letters.length + 1,
            letterType: letterType,
            letterDescription: letterDescription,
            timeAllowToOpen: timeAllowToOpen,
            timeAllowToRelease: timeAllowToRelease,
            expirationDate: expirationDate,
            senderID: senderID,
            receiverID: receiverID,
            ownerID: msg.sender,
            ipfsHash: ipfsHash,
            isIPFSFileReceived: false,
            isIPFSFileReleased: false,
            shortMessage: shortMessage,
            codeName: codeName
            //hints: hints
        });

        ownerLetterCount[msg.sender]++;
        senderLetterCount[senderID]++;
        receiverLetterCount[receiverID]++;
        
        lettersOfOwner[msg.sender][ownerLetterCount[msg.sender]] = newLetter;
        lettersOfSender[senderID][senderLetterCount[senderID]] = newLetter;
        lettersOfReceiver[receiverID][receiverLetterCount[receiverID]] = newLetter;

        listOfSenders.push(senderID);
        listOfReceivers.push(receiverID);
        //listOfOwners.push(msg.sender);
        senders[senderID] = true;
        receivers[receiverID] = true;
        //owners[msg.sender] = true;

        receiverListOfSender[senderID].push(receiverID);
        senderListOfReceiver[receiverID].push(senderID);
        senderListOfOwner[msg.sender].push(senderID);
        receiverListOfOwner[msg.sender].push(receiverID);

        ownerOfTokenID[letters.length+1] = msg.sender;
        tokenIDByOwner[msg.sender][letters.length+1] = letters.length+1;
        tokenIDsByOwner[msg.sender].push(letters.length+1);
        tokenIDExists[letters.length+1] = true; 

        letters.push(newLetter);  
    }

    //return a list of Letters associated with Creator, Sender, or Receiver's address
    function getOwnerLetterType(uint256 index) public view ownerOnly returns (bytes32) {
        return lettersOfOwner[msg.sender][index].letterType;
    }   
    function getSenderLetterType(uint256 index) public view senderOnly returns (bytes32) {
        return lettersOfSender[msg.sender][index].letterType;
    }  
    function getReceiverLetterType(uint256 index) public view receiverOnly returns (bytes32) {
        return lettersOfReceiver[msg.sender][index].letterType;
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
    function getReceiverListOfSender() public view senderOnly returns (address[]) {
        return receiverListOfSender[msg.sender];
    } 
    //return a list of Sender addresses associated with Receiver
    function getSenderListOfReceiver() public view receiverOnly returns (address[]) {
        return senderListOfReceiver[msg.sender];
    } 
    //return a list of Sender addresses associated with Manager of Contract
    function getSenderListOfManager() public view managerOnly returns(address[]) {
        return listOfSenders;
    }
    //return a list of Receiver addresses associated with Manager of Contract
    function getReceiverListOfManager() public view managerOnly returns(address[]) {
        return listOfReceivers;
    }
    //return a list of Creator addresses associated with Manager of Contract
    function getOwnerListOfManager()public view managerOnly returns(address[]) {
        return listOfOwners;
    }   
    //function getLetter(uint256 index) public view managerOnly returns(Letter) {
        //return letters[index];
    //}
    function getSummary() public view managerOnly returns(
        uint, uint, uint, uint, uint, address
    ) {
        return(
            address(this).balance,  //this.balance deprecated - convert to address
            uint(letters.length),
            uint(listOfSenders.length),
            uint(listOfReceivers.length),
            uint(listOfOwners.length),
            manager
        );
    }
    function getLettersCount() public view managerOnly returns (uint) {
        return uint(letters.length);
    }
}