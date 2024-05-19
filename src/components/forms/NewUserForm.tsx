'use client'
import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { useFormState } from 'react-dom'

import Action_NewUser from '@/server/actions/newUser'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { newUserSchema } from '@/server/actions/schemas/new-user'
import FormLoadingButton from '@/components/ui/FormLoadingButton'
import FormDisablingTextField from '@/components/ui/FormDisablingTextField'

function NewUserForm() {
    const [lastResult, dispatch] = useFormState(Action_NewUser, undefined)

    const [form, fields] = useForm({
        // Sync the result of last submission
        lastResult,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: newUserSchema })
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

                <FormDisablingTextField
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
                <FormLoadingButton
                    sx={{
                        mt: 2,
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                    }}
                    type={'submit'}
                    variant={'contained'}
                >
                    Shorten
                </FormLoadingButton>
            </Paper>
        </Box>
    )
}

export default NewUserForm
