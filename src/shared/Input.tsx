import { useLayoutEffect, useRef, useState } from 'react'

function formatDigitGroups(digits: string, groupSize = 3): string {
  if (!digits) return ''
  const chunks: string[] = []
  for (let end = digits.length; end > 0; ) {
    const start = Math.max(0, end - groupSize)
    chunks.unshift(digits.slice(start, end))
    end = start
  }
  return chunks.join(' ')
}

function caretAfterNDigits(formatted: string, digitCount: number): number {
  if (digitCount <= 0) return 0
  let seen = 0
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]!)) {
      seen++
      if (seen === digitCount) return i + 1
    }
  }
  return formatted.length
}

type InputProps = Omit<
  React.ComponentProps<'input'>,
  'value' | 'defaultValue' | 'onChange' | 'type' | 'size'
> & {
  value?: string
  defaultValue?: string
  onChange?: (digits: string) => void
}

export function Input({
  value: valueProp,
  defaultValue = '',
  onChange,
  className = '',
  ...rest
}: InputProps) {
  const isControlled = valueProp !== undefined
  const [uncontrolledDigits, setUncontrolledDigits] = useState(() =>
    defaultValue.replace(/\D/g, '')
  )
  const digits = isControlled ? valueProp.replace(/\D/g, '') : uncontrolledDigits
  const display = formatDigitGroups(digits)

  const inputRef = useRef<HTMLInputElement>(null)
  const pendingDigitCaret = useRef<number | null>(null)

  const setDigits = (next: string) => {
    if (!isControlled) setUncontrolledDigits(next)
    onChange?.(next)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target
    const start = el.selectionStart ?? 0
    pendingDigitCaret.current = el.value.slice(0, start).replace(/\D/g, '').length

    const nextDigits = el.value.replace(/\D/g, '')
    setDigits(nextDigits)
  }

  useLayoutEffect(() => {
    const el = inputRef.current
    const n = pendingDigitCaret.current
    if (el === null || n === null) return

    const pos = caretAfterNDigits(formatDigitGroups(digits), n)
    el.setSelectionRange(pos, pos)
    pendingDigitCaret.current = null
  }, [digits])

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      value={display}
      onChange={handleChange}
      className={`box-border min-w-[72px] max-w-full rounded-[6px] border-[1.5px] border-[#CFCADF] bg-white px-[11px] py-[8px] font-mono text-sm text-[#CFCADF] tabular-nums outline-none field-sizing-content focus:border-[#1E0E4C] focus:text-[#1E0E4C] focus:caret-[#1E0E4C] ${className}`.trim()}
      {...rest}
    />
  )
}
