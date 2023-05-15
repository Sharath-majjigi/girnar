import React, { useState } from "react";

const Index = () => {
  const [user, setUser] = useState({ userId: "", email: "" });
  const { userId, email } = user;

  const inputStyle =
    "border-2 border-black rounded w-44 ml-2 outline-0 px-2 py-1";
  const containerStyle = "flex gap-6 flex-wrap justify-between w-3/4 mx-auto";

  return (
    <section>
      <div className={containerStyle}>
        <div>
          <label htmlFor="userId">User Id:</label>
          <input
            type="text"
            id="userId"
            className={inputStyle}
            name="userId"
            value={userId}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, userId: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            className={inputStyle}
            name="email"
            value={email}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Index;
