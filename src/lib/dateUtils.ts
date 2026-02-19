
/**
 * Utility functions for business day calculations and post distribution.
 */

// Portuguese Month Names
export const MONTH_NAMES_PT = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

/**
 * Checks if a date is a business day (Monday to Friday).
 */
export function isBusinessDay(date: Date): boolean {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 is Sunday, 6 is Saturday
}

/**
 * Gets all business days in a specific month/year.
 */
export function getBusinessDaysInMonth(year: number, month: number): Date[] {
    const days: Date[] = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        if (isBusinessDay(date)) {
            days.push(new Date(date));
        }
        date.setDate(date.getDate() + 1);
    }
    return days;
}

/**
 * Gets business days from a specific start date until the end of its month.
 */
export function getRemainingBusinessDaysInMonth(startDate: Date): Date[] {
    const days: Date[] = [];
    const date = new Date(startDate);
    const month = date.getMonth();
    while (date.getMonth() === month) {
        if (isBusinessDay(date)) {
            days.push(new Date(date));
        }
        date.setDate(date.getDate() + 1);
    }
    return days;
}

/**
 * Adds business days to a date.
 */
export function addBusinessDays(startDate: Date, daysToAdd: number): Date {
    const date = new Date(startDate);
    let added = 0;
    while (added < daysToAdd) {
        date.setDate(date.getDate() + 1);
        if (isBusinessDay(date)) {
            added++;
        }
    }
    return date;
}

/**
 * Formats a date to YYYY-MM-DD for API keys or storage.
 */
export function formatDateISO(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}
