import React, { useState } from "react";

const index = () => {
  const [user, setUser] = useState({ userId: "", email: "" });
  const { userId, email } = user;

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

export default index;
