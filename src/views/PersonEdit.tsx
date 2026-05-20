import { Link, useParams } from 'react-router-dom'
import { useStore } from '@/store'
import { Input } from '@/shared/Input'

export default function PersonEdit() {
  const { id } = useParams<{ id: string }>()
  const person = useStore((state) => state.people.find((p) => p.id === Number(id)))
  const updatePersonAge = useStore((state) => state.updatePersonAge)

  if (!person) {
    return (
      <div>
        <p className="text-gray-600">Person not found</p>
        <Link to="/" className="text-violet-600 hover:underline text-sm">
          Back to list
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to="/" className="text-violet-600 hover:underline text-sm">
        &larr; Back
      </Link>

      <div className="group flex items-center gap-[16px]">
        <div className="box-border h-[90px] w-[90px] shrink-0 rounded-full border border-transparent bg-transparent p-[4px] transition-colors group-focus-within:border-[#3D06D7] group-focus-within:bg-white">
          <img
            src="/img.png"
            alt={person.name}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div>
          <label
            htmlFor="hours-input"
            className="cursor-pointer block font-koulen mb-[12px] text-[16px] font-normal leading-[15px] tracking-[0.02em] text-gray-700 transition-colors group-focus-within:text-[#3D06D7]"
          >
            {person.name.toUpperCase()} IS
          </label>
          <div className="flex items-center gap-3">
            <Input
              id="hours-input"
              value={String(person.ageInHours)}
              onChange={(digits) => updatePersonAge(person.id, Number(digits) || 0)}
              placeholder="0"
              className="text-lg"
            />
            <label
              htmlFor="hours-input"
              className="cursor-pointer font-inter text-[18px] font-normal leading-none tracking-normal text-[#3D06D7]"
            >
              hours old
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
