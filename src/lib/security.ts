import DOMPurify from 'isomorphic-dompurify';
import validator from 'validator';

/**
 * Sanitizes input string to prevent XSS.
 * @param input The raw input string
 * @returns The sanitized string
 */
export function sanitizeInput(input: string): string {
    if (typeof input !== 'string') return input;
    return DOMPurify.sanitize(input);
}

/**
 * Validates if the input is a valid email.
 * @param email The email string
 * @returns boolean
 */
export function isValidEmail(email: string): boolean {
    return validator.isEmail(email);
}

/**
 * Validates that string only contains alphanumeric characters and basic punctuation.
 * @param text Input text
 * @returns boolean
 */
export function isSafeText(text: string): boolean {
    // Allow letters, numbers, spaces, and basic punctuation (.,!?-@)
    const regex = /^[a-zA-Z0-9\s.,!?-@]*$/;
    return regex.test(text);
}
