import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./forgot_password.module.css";

const Password = () => {
  const params = useParams();
  const [password, setPassword] = useState("");

  const update = () => {
    console.log("These are the parameters");
    console.log(password);
    console.log(params.hash);
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
              />
              <input
                type="password"
                className={styles.input}
                placeholder="Repeat Password"
              />
              <button className={styles.button}>Reset</button>
            </div>
          </div>
        </div>

        <div id="signInBackgroundBubble1"></div>
        <div id="signInBackgroundBubble2"></div>
        <div id="signInBackgroundBubble3"></div>
        <div id="signInBackgroundBubble4"></div>
      </div>
    </React.Fragment>
  );
};

export default Password;
