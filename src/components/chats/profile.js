import React from "react";

function Profile({ name, contacts, clickContact }) {
  return (
    <div className="profile">
      <header>{name}</header>
      <ul>
        {contacts.map((user) => {
          return (
            <li onClick={() => clickContact(user)} key={user.id}>
              {user.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Profile;
