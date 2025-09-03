// Base EURO Formatter
const euroFormat = new Intl.NumberFormat(
    "pt-PT",
    {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }
)

// Format to "pt-PT" euro currency using Intl.NumberFormat method
export function formatCurrency(value) {
    const n = typeof value === "number" ? value : parseNumber(value)
    if (!Number.isFinite(n)) return "0.00"
    return euroFormat.format(n)
}

// Convert input to a JS number
export function parseNumber(input) {
    if (input == null) return NaN
    // change , to .
    const inToStr = String(input).trim().replace(/\s/g, "").replace(",", ".")
    // remove currenct symbols, etc...
    const clean = inToStr.replace(/[^\d.+-eE]/g, "")
    const finalInput = Number(clean)
    return Number.isFinite(finalInput) ? finalInput : NaN
}