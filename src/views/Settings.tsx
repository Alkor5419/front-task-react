import { Link } from 'react-router-dom'
import { Input } from '@/shared/Input'
import { useStore } from '@/store'

export default function Settings() {
  const minimumAgeInMonths = useStore((state) => state.minimumAgeInMonths)
  const setMinimumAgeInMonths = useStore((state) => state.setMinimumAgeInMonths)

  return (
    <div className="flex flex-col gap-4">
      <Link to="/" className="text-violet-600 hover:underline text-sm">
        &larr; Back
      </Link>

      <h1 className="text-xl font-bold text-gray-700">Settings</h1>

      <div>
        <label
          htmlFor="min-age-input"
          className="block text-sm font-bold tracking-wide text-gray-700"
        >
          MINIMUM AGE
        </label>
        <div className="flex items-center gap-2">
          <Input
            id="min-age-input"
            value={String(minimumAgeInMonths)}
            onChange={(digits) => setMinimumAgeInMonths(Number(digits) || 0)}
            placeholder="0"
            className="text-lg"
          />
          <span className="text-gray-600">months</span>
        </div>
      </div>
    </div>
  )
}
