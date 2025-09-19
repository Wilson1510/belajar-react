import './index.css'
import { useState } from 'react'

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend(){
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend){
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend){
    setSelectedFriend(current => current?.id === friend.id ? null : friend);
    setShowAddFriend(false);
  }

  function handleSplitBill(value){
    setFriends(friends.map(
      friend => friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + value } : friend
    ));
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} selectedFriend={selectedFriend} handleSelection={handleSelection} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? 'Close' : 'Add Friend'}</Button>
      </div>
      {selectedFriend && <FormSplitBill friend={selectedFriend} onSplitBill={handleSplitBill} />}
    </div>
  )
}

function FriendsList({ friends, selectedFriend, handleSelection }){
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} selectedFriend={selectedFriend} handleSelection={handleSelection} />
      ))}
    </ul>
  )
}

function Friend({ friend, selectedFriend, handleSelection }){
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>}
      {friend.balance > 0 && <p className="green">{friend.name} owes you ${friend.balance}</p>}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => handleSelection(friend)}>{isSelected ? 'Close' : 'Select'}</Button>
    </li>
  )
}

function Button({ children, onClick }){
  return (
    <button className="button" onClick={onClick}>{children}</button>
  )
}

function FormAddFriend({ onAddFriend }){
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleAddFriend(e){
    e.preventDefault();

    if (!name || !image) return;
    
    const id = crypto.randomUUID();
    
    const friend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }
    onAddFriend(friend)
    setName('')
    setImage('https://i.pravatar.cc/48')
  }

  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>👫 Friend name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label>🌄 Image URL</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

      <label>💰 Balance</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill({ friend, onSplitBill }){
  const [bill, setBill] = useState('');
  const [yourExpense, setYourExpense] = useState('');
  const friendExpense = bill ? bill - yourExpense : '';
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>

      <label>💰 Bill value</label>
      <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))} />

      <label>💰 Your expense</label>
      <input type="text" value={yourExpense} onChange={(e) => setYourExpense(
        Number(e.target.value) > bill ? yourExpense : Number(e.target.value)
      )} />

      <label>💰 {friend.name} expense</label>
      <input type="text" disabled value={friendExpense} />

      <label>🤑 Who is paying the bill</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>

      <Button onClick={() => onSplitBill(whoIsPaying === 'user' ? friendExpense : -yourExpense)}>Split</Button>
    </form>
  )
}

export default App;