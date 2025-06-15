/**
 * @file Login page component.
 * @summary Displays the login form and logo.
 */

import LoginForm from "@/components/composed/LoginForm/LoginForm";
import Image from "next/image";
import styles from "./page.module.css";

/**
 * @function Home
 * @summary Renders the login page.
 * @returns {JSX.Element} The rendered login page.
 */
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
