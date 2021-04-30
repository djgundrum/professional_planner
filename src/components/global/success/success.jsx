import React, { useState, useEffect } from "react";

import styles from "./success.module.css";

/**
 * Success front end class, a little popup window when things go correctly
 *
 * *Required
 * @param success (boolean) whether or not to display it
 * @param message (string) message that will be displayed in the window
 * @param close (callback function) function that closes the window
 */
const Success = (props) => {
  useEffect(() => {}, []);
  return (
    <React.Fragment>
      {props.success == false ? null : (
        <div id={styles.success_container}>
          <div id={styles.success_box}>
            <div className={styles.error_close} onClick={props.close}></div>
            <div className={styles.error_message}>
              <div id={styles.error_header}>Success!</div>
              <div id={styles.error_body}>{props.message}</div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Success;
