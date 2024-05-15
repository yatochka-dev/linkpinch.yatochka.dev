"use client";

import { ShortenedURL } from "@prisma/client";
import React from "react";
import { Box, Paper } from "@mui/material";

interface EditShortenedURLFormProps {
  page: boolean;
  data: ShortenedURL & {
    _count: {
      clicks: number;
    };
  };
}

export default function EditShortenedURLForm({
  data,
  page,
}: EditShortenedURLFormProps) {
  return <Box component={page ? Paper : Box}>hello</Box>;
}
