import * as React from 'react';
import { Input } from '@/components/ui/input';

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'maxLength'> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');

  // Limit to 10 digits
  const limitedDigits = digits.slice(0, 10);

  // Format as (XXX) XXX-XXXX
  if (limitedDigits.length === 0) return '';
  if (limitedDigits.length <= 3) return `(${limitedDigits}`;
  if (limitedDigits.length <= 6) {
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
  }
  return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6)}`;
};

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onValueChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      setDisplayValue(formatted);

      // Extract just digits for the actual value
      const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
      if (onValueChange) {
        onValueChange(digits);
      }
    };

    return (
      <Input
        ref={ref}
        type="tel"
        value={displayValue}
        onChange={handleChange}
        placeholder="(555) 123-4567"
        className={className}
        {...props}
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
