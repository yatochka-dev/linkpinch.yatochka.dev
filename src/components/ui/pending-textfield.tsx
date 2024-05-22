'use client'
import { TextField, type TextFieldProps } from '@mui/material'
import { useFormStatus } from 'react-dom'

type Props = TextFieldProps

export default function PendingTextfield({ children, ...props }: Props) {
    const { pending } = useFormStatus()

    return (
        <TextField {...props} disabled={pending}>
            {children}
        </TextField>
    )
}
