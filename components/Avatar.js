import * as React from "react";
import { Avatar } from "@mui/material";
import Link from "next/link";

function getInitialLetters(name) {
    // get first two letters of string
    let initials = name.substring(0, 2);
    return initials.toUpperCase();
}

export default function AppAvatar({ user, size, style }) {
  return (
    <Link href="/profile" style={{textDecoration: "none", color: "inherit"}}>
      <Avatar
        sx={{ ...style, width: size, height: size, bgcolor: (theme) => theme.palette.primary.main, color: "#000", fontSize: "1rem", fontWeight: 800 }}
        // src={user.picture}
        // alt="User Image"
      >
        {getInitialLetters(user.name)}
      </Avatar>
    </Link>
  );
}
