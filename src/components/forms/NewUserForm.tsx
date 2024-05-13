"use client";
import {Box, Paper, TextField, Typography} from '@mui/material';
import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {useFormState, useFormStatus} from "react-dom"

import Action_NewUser from "@/server/actions/newUser";


function Form({error}: { error: string }) {
    const {pending} = useFormStatus();
    return <>
        <TextField
            // type={"url"}
            label={"Link"}
            placeholder={
                "https://example.com"
            }

            variant={"outlined"}
            name={"url"}
            required
            error={!!error}
            disabled={pending}
            helperText={"Enter a valid URL"}
        />
        <LoadingButton sx={{
            mt: 2,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
        }} type={"submit"} loading={pending} variant={"contained"}>
            Shorten
        </LoadingButton></>;
}

function NewUserForm() {

    const initialState = {
        error: "",
    }
    const [form, dispatch, isPending] = useFormState(Action_NewUser, initialState)

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100dvh - 64px)",

        }}>

            <Paper sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minWidth: "450px",
            }} component={'form'} action={dispatch}>
                <Typography variant={'h5'}>
                    {form.error ? "This is not a valid URL!" : "Shorten your first link!"}
                </Typography>


                <Form error={form.error}/>

            </Paper>
        </Box>

    );
}

export default NewUserForm;