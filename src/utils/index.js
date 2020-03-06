export const formatRange = range =>
  range && range.toFixed && `${range.toFixed(0)} miles`

const priceformatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
})
export const formatPrice = price => priceformatter.format(price)
