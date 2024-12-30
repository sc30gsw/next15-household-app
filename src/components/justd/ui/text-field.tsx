'use client'

// biome-ignore lint/correctness/noUndeclaredDependencies: This ia a 3rd party library
import type { TextInputDOMProps } from '@react-types/shared'
import { IconEye, IconEyeClosed } from 'justd-icons'
import {
  Button as ButtonPrimitive,
  TextField as TextFieldPrimitive,
  type TextFieldProps as TextFieldPrimitiveProps,
} from 'react-aria-components'

import type { FieldProps } from '@/components/justd/ui/field'
import {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
} from '@/components/justd/ui/field'
import { Loader } from '@/components/justd/ui/loader'
import { ctr } from '@/components/justd/ui/primitive'
import { type ReactNode, useState } from 'react'

type InputType = Exclude<TextInputDOMProps['type'], 'password'>

interface BaseTextFieldProps extends TextFieldPrimitiveProps, FieldProps {
  prefix?: ReactNode
  suffix?: ReactNode
  isPending?: boolean
  className?: string
}

interface RevealableTextFieldProps extends BaseTextFieldProps {
  isRevealable: true
  type: 'password'
}

interface NonRevealableTextFieldProps extends BaseTextFieldProps {
  isRevealable?: never
  type?: InputType
}

type TextFieldProps = RevealableTextFieldProps | NonRevealableTextFieldProps

const TextField = ({
  placeholder,
  label,
  description,
  errorMessage,
  prefix,
  suffix,
  isPending,
  className,
  isRevealable,
  type,
  ...props
}: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const inputType = isRevealable
    ? isPasswordVisible
      ? 'text'
      : 'password'
    : type

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }
  return (
    <TextFieldPrimitive
      type={inputType}
      {...props}
      className={ctr(className, 'group flex flex-col gap-y-1.5')}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup data-loading={isPending ? 'true' : undefined}>
        {prefix ? (
          <span data-slot="prefix" className="atrs x2e2">
            {prefix}
          </span>
        ) : null}
        <Input placeholder={placeholder} />
        {isRevealable ? (
          <ButtonPrimitive
            type="button"
            aria-label="Toggle password visibility"
            onPress={handleTogglePasswordVisibility}
            className="mr-2.5 relative [&>[data-slot=icon]]:text-muted-fg focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
          >
            {isPasswordVisible ? <IconEyeClosed /> : <IconEye />}
          </ButtonPrimitive>
        ) : isPending ? (
          <Loader variant="spin" data-slot="suffix" />
        ) : suffix ? (
          <span data-slot="suffix">{suffix}</span>
        ) : null}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </TextFieldPrimitive>
  )
}

export { TextField, TextFieldPrimitive, type TextFieldProps }