import React, { useState } from "react";
import Image from "next/image";

const AddFriendModal = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle searching for friends
  const handleSearch = () => {
    // Here you would perform a search based on the searchQuery
    // For demo purpose, let's just simulate some search results
    const results = [
      { id: 1, username: "user1" },
      { id: 2, username: "user2" },
      { id: 3, username: "user3" },
    ];
    setSearchResults(results);
  };

  // Function to handle adding a friend
  const handleAddFriend = (username) => {
    console.log("Friend added:", username);

    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add a Friend</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a friend..."
            className="border border-gray-300 rounded-md px-2 py-1 mr-2 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-primary-yellow hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
          >
            Search
          </button>
        </div>
        <ul>
          {searchResults.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center border-b border-gray-200 py-2"
            >
              <span>{user.username}</span>
              <button
                onClick={() => handleAddFriend(user.username)}
                className="bg-primary-yellow hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
              >
                Add Friend
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AddFriendButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="flex items-center bg-primary-yellow hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
      >
        <div>
          <Image
            src="/add-friend-icon.png"
            alt="Add Friend"
            width={30}
            height={30}
          />
        </div>
      </button>
      {isModalOpen && <AddFriendModal onClose={toggleModal} />}
    </div>
  );
};

export default AddFriendButton;
