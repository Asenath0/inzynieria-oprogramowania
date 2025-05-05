import LoginForm from "@/components/composed/LoginForm/LoginForm";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Image src="/logo.svg" alt="Logo" width={400} height={100} />
        <LoginForm />
      </div>
    </div>
  );
}
