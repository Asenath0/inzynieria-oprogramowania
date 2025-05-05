"use client";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          borderBottom: "1px solid #D4C8B0",
        }}
      >
        <Box>
          <Image src="/logo.svg" alt="Logo" width={100} height={40} />
        </Box>

        <Box>
          <Button color="primary" variant="text" sx={{ marginRight: 2 }}>
            Zarejestruj się
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push("/login")}
          >
            Zaloguj się
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
