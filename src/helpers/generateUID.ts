export default function generateUID(): number {
  return Math.floor(Math.random() * 1_000_000_000_000)
}
