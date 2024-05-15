"use client";
import React, { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Button, Paper, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
// import GoogleIcon from '@/components/client/icons/google';
// import DiscordIcon from '@/components/client/icons/discord';

function LoginForm() {
  const params = useSearchParams();
  const handleGoogleLogin = useCallback(() => {
    void signIn("google", {
      callbackUrl: params.get("callbackUrl") ?? "/profile",
    });
  }, [params]);
  const handleDiscordLogin = useCallback(() => {
    void signIn("discord", {
      callbackUrl: params.get("callbackUrl") ?? "/profile",
    });
  }, [params]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100dvh - 64px)",
      }}
    >
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant={"h4"} textAlign={"center"}>
          Login
        </Typography>
        <Typography variant={"subtitle1"}>
          You can login using Discord, more options may be added in the future.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/*<Button onClick={handleGoogleLogin} aria-label={'login-with-google'}>*/}
          {/*  <Box*/}
          {/*    component={"span"}*/}
          {/*    sx={{*/}
          {/*      display: "flex",*/}
          {/*      gap: 1,*/}
          {/*      alignItems: "center",*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <GoogleIcon />*/}
          {/*    Google*/}
          {/*  </Box>*/}
          {/*</Button>*/}
          <Button onClick={handleDiscordLogin}>
            <Box
              component={"span"}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              {/*<DiscordIcon />*/}
              Discord
            </Box>
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginForm;
