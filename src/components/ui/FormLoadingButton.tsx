"use client";
import { type ButtonProps } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormStatus } from "react-dom";

type Props = ButtonProps;

export default function FormLoadingButton({
  children,
  variant,
  ...props
}: Props) {
  const { pending } = useFormStatus();
  const variantProp = variant ? variant : "contained";
  return (
    <LoadingButton loading={pending} {...props} variant={variantProp}>
      {children}
    </LoadingButton>
  );
}
