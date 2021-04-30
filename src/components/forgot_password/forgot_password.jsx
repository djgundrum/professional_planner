import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Error from "../global/error/error";
import Loading from "../global/loading/loading";
import Success from "../global/success/success";

import styles from "./forgot_password.module.css";

const Password = () => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState({ error: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    success: false,
    message: "I really just want to see it in action",
  });

  const update = () => {
    setLoading(true);

    let hash = params.hash;

    let check = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

    if (!password === repeat || !check.test(password)) {
      setError({
        error: true,
        message:
          "Make sure that your passwords match and they contain: A lowercase letter, a uppercase letter, a number, and is at least 6 characters long.",
      });
      setLoading(false);
      return;
    }

    let url = "/api/user/forgot_password_update";
    let data = { hash: hash, password: password };

    axios.post(url, data).then(
      (result) => {
        if (!result.data.valid) {
          setError({ error: true, message: result.data.body.message });
        } else {
          setSuccess({ success: true, message: result.data.body.message });
        }
        setLoading(false);
      },
      (err) => {
        setLoading(false);
      }
    );
  };

  return (
    <React.Fragment>
      <div id="loginScreen">
        <div className={styles.full}>
          <div className={styles.content}>
            <div className={styles.spacer}>Enter your new password</div>
            <div className={styles.inputs}>
              <input
                type="password"
                className={styles.input}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                type="password"
                className={styles.input}
                placeholder="Repeat Password"
                onChange={(e) => {
                  setRepeat(e.target.value);
                }}
              />
              <button onClick={update} className={styles.button}>
                Reset
              </button>
            </div>
          </div>
        </div>

        <div id="signInBackgroundBubble1"></div>
        <div id="signInBackgroundBubble2"></div>
        <div id="signInBackgroundBubble3"></div>
        <div id="signInBackgroundBubble4"></div>
        <Error
          error={error.error}
          message={error.message}
          close={() => {
            setError({ error: false, message: "" });
          }}
        />
        <Success
          success={success.success}
          message={success.message}
          close={() => {
            setSuccess({ success: false, message: "" });
          }}
        />
        <Loading loading={loading} />
      </div>
    </React.Fragment>
  );
};

export default Password;
