import React, { useState } from "react";
import Logo from "../component/logo";

const LoginPage = ({
  onLogin,
  isWaiting,
}: {
  onLogin: (username: string, password: string) => void;
  isWaiting: boolean;
}) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [HasSubmitted, setHasSubmitted] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
      className="mockaware login"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "hsl(208deg 75% 95%)",
          opacity: 0.9,
          width: "100%",
          height: "100%",
        }}
      >

        <div
          style={{
            opacity: 1,
            width: "300px",
            background: "rgb(255 255 255)",
            marginLeft: "20px",
            borderRadius: "4px",
            padding: "20px",
            boxShadow: "rgb(204 204 204) 0px 4px 12px",
            justifyContent: "center",
          }}
        >
          <Logo />
          <p style={{ margin: "8px 0px", color: "#343434" }}>
            Create and manage mock services for Pega integrations.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin(Username, Password);
              setHasSubmitted(true);
            }}
          >
            {HasSubmitted && !isWaiting && (
              <div
                style={{
                  background: "#d23752",
                  padding: "8px",
                  margin: "16px 0px",
                  color: "#fff",
                }}
              >
                Please correct username or password
              </div>
            )}

            <div style={{ display: "block", paddingRight: "16px" }}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <br />
            <div style={{ display: "block", paddingRight: "16px" }}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div >
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "10px" }}
                disabled={isWaiting}
              >
                {isWaiting && <div>Waiting...</div>}
                {!isWaiting && <div>Login</div>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
props: {
}
