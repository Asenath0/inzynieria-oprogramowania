import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button, TextField } from "@mui/material";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <TextField label="Email" variant="outlined" color="primary" fullWidth />
      <TextField label="Password" variant="outlined" fullWidth />
      <Button variant="contained" fullWidth>
        Log in
      </Button>
    </div>
  );
}
