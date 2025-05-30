"use client";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmail = (email: string) => {
    setEmail(email);
    if (!validateEmail(email)) {
      setEmailError("Nieprawidłowy format adresu e-mail");
      return false;
    }
    setEmailError("")
  }
  
  return (
    <div className={styles.form}>
      <TextField error={(emailError.length > 0)} helperText={emailError} label="e-mail" variant="outlined" color="primary" fullWidth value={email} onChange={(e) => handleEmail(e.target.value)} />
      <TextField label="hasło" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)}/>
      <Button variant="contained" fullWidth onClick={() => router.push("/")}>
        Zaloguj się
      </Button>
    </div>
  );
};

export default LoginForm;
