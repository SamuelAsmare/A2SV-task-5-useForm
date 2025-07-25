import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Contact.module.css";

function Contact() {
  const [popup, setPopup] = useState(null); // {message, type}
  const { register, handleSubmit, formState: { errors } } = useForm();

  const showPopup = (message, type = "success") => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 3000); // hide after 3 seconds
  };

  const Succed = (data) => {
    console.log(data);
    showPopup("Form submitted successfully!", "success");
  };

  const Err = () => {
    if (errors.username) showPopup(errors.username.message, "error");
    else if (errors.email) showPopup(errors.email.message, "error");
    else if (errors.message) showPopup(errors.message.message, "error");
  };

  return (
    <div className={styles.container}>
      {popup && (
        <div className={`${styles.popup} ${popup.type === "error" ? styles.error : styles.success}`}>
          {popup.message}
        </div>
      )}
    <div style={{ position: "relative" }}>
      <form onSubmit={handleSubmit(Succed, Err)} className={styles.form}>
        <input
          {...register("username", { required: "Username is required" })}
          placeholder="Username"
        />

        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
        />

        <textarea
          placeholder="Message"
          {...register("message", { required: "Message is required" })}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div></div>
  );
}

export default Contact;
