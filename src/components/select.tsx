'use client'

import { Listbox } from '@headlessui/react'
import { useState } from 'react'

const periods = [
  { id: 1, name: 'По дням', value: 'daily' },
  { id: 2, name: 'По неделям', value: 'weekly' },
  { id: 3, name: 'По месяцам', value: 'monthly' },
  { id: 4, name: 'По годам', value: 'yearly' },
];

export function PeriodSelect() {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[2]);

  return (
    <Listbox value={selectedPeriod} onChange={setSelectedPeriod}>
      {({ open }) => (
        <div className="relative w-full md:w-64">
          <Listbox.Button className="
            w-full px-4 py-2 pr-10
            text-left bg-white
            border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-green-500
            transition-all duration-200
            flex items-center justify-between
          ">
            <span>{selectedPeriod.name}</span>
            <svg
              className={`w-5 h-5 text-gray-400 transform transition-transform ${open ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Listbox.Button>

          <Listbox.Options className="
            absolute z-10 mt-1 w-full
            bg-white shadow-lg rounded-lg
            py-1 ring-1 ring-black ring-opacity-5
            focus:outline-none
          ">
            {periods.map((period) => (
              <Listbox.Option
                key={period.id}
                value={period}
                className={({ active }) => `
                  ${active ? 'bg-green-50 text-green-900' : 'text-gray-900'}
                  cursor-pointer select-none relative py-2 pl-3 pr-9
                `}
              >
                {({ selected }) => (
                  <>
                    <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                      {period.name}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-600">
                        ✓
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
}