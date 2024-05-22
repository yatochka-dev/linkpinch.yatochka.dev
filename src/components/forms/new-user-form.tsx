'use client'
import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { useFormState } from 'react-dom'

import Action_SignNewUser from '@/server/actions/sign-new-user'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { signNewUserSchema } from '@/server/actions/schemas/sign-new-user-schema'
import PendingButton from '@/components/ui/pending-button'
import PendingTextfield from '@/components/ui/pending-textfield'

function NewUserForm() {
    const [lastResult, dispatch] = useFormState(Action_SignNewUser, undefined)

    const [form, fields] = useForm({
        // Sync the result of last submission
        lastResult,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: signNewUserSchema })
        },

        // Validate the form on blur event triggered
        shouldValidate: 'onBlur',
    })

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 200px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    minWidth: '450px',
                }}
                component={'form'}
                action={dispatch}
                id={form.id}
                onSubmit={form.onSubmit}
                noValidate
            >
                <Typography variant={'h5'}>
                    {!!fields.url.errors
                        ? 'This is not a valid URL!'
                        : 'Shorten your first link!'}
                </Typography>

                <PendingTextfield
                    // type={"url"}
                    label={'Link'}
                    placeholder={'https://example.com'}
                    variant={'outlined'}
                    name={fields.url.name}
                    required
                    error={!!fields.url.errors}
                    helperText={
                        !!fields.url.errors
                            ? fields.url.errors
                            : 'Enter a valid URL'
                    }
                />
                <PendingButton
                    sx={{
                        mt: 2,
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                    }}
                    type={'submit'}
                    variant={'contained'}
                >
                    Shorten
                </PendingButton>
            </Paper>
        </Box>
    )
}

export default NewUserForm
