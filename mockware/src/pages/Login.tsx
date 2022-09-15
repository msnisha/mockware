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
          padding: "30px",
          background: "#c0cfbf",
          borderRadius: "10px",
          width: "50%",
          height: "60%",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ flexGrow: 2 }}>
          <div style={{ display: "inline-block" }}>
            <Logo />
          </div>
          <h3 style={{ color: "#5a5555", fontSize: "24px", lineHeight: "1.6" }}>
            Create & manage mock services <br />
            for Pega integrations
            <br />
          </h3>
        </div>
        <div
          style={{
            minHeight: "400px",
            width: "200px",
            background: "#fafafa",
            marginLeft: "20px",
            borderRadius: "6px",
            padding: "20px",
            boxShadow: "4px 4px 15px #ccc",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <h1>Login</h1>
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

            <div className="form-inline">
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
            <div className="form-inline">
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
