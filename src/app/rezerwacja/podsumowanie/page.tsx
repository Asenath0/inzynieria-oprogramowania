/**
 * @file Reservation summary page component.
 * @summary Displays a confirmation message after a successful reservation.
 */

"use client";
import Header from "@/components/composed/Header/Header";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

/**
 * @function Home
 * @summary Renders the reservation summary page.
 * @returns {JSX.Element} The rendered reservation summary page.
 */
export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.confirmationBox}>
          <Image src="/logo.svg" alt="Logo" width={400} height={100} />
          <h1>Twoja rezerwacja została przyjęta!</h1>
          <p>
            Dziękujemy za dokonanie rezerwacji w naszym hotelu. Szczegóły
            rezerwacji zostały wysłane na podany adres e-mail. W razie pytań
            prosimy o kontakt z recepcją.
          </p>
          <div>
            <Button variant="contained" onClick={() => router.push("/")}>
              Powrót na stronę główną
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
