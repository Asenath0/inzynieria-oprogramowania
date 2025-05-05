"use client";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const router = useRouter();
  return (
    <div className={styles.form}>
      <TextField label="e-mail" variant="outlined" color="primary" fullWidth />
      <TextField label="hasło" variant="outlined" fullWidth />
      <Button variant="contained" fullWidth onClick={() => router.push("/")}>
        Zaloguj się
      </Button>
    </div>
  );
};

export default LoginForm;
