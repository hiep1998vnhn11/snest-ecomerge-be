import React, { useCallback, useMemo, useState } from 'react'
import { Combobox, Icon, Listbox, Loading, TextField } from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'

function LoadingAutocompleteExample() {
  const deselectedOptions = useMemo(
    () => [
      { value: 'rustic', label: 'Rustic' },
      { value: 'antique', label: 'Antique' },
      { value: 'vinyl', label: 'Vinyl' },
      { value: 'vintage', label: 'Vintage' },
      { value: 'refurbished', label: 'Refurbished' },
    ],
    []
  )

  const [selectedOption, setSelectedOption] = useState()
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState(deselectedOptions)
  const [loading, setLoading] = useState(false)

  const updateText = useCallback(
    (value) => {
      setInputValue(value)

      if (!loading) {
        setLoading(true)
      }

      setTimeout(() => {
        if (value === '') {
          setOptions(deselectedOptions)
          setLoading(false)
          return
        }
        const filterRegex = new RegExp(value, 'i')
        const resultOptions = options.filter((option) =>
          option.label.match(filterRegex)
        )
        setOptions(resultOptions)
        setLoading(false)
      }, 300)
    },
    [deselectedOptions, loading, options]
  )

  const updateSelection = useCallback(
    (selected) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selected)
      })

      setSelectedOption(selected)
      setInputValue((matchedOption && matchedOption.label) || '')
    },
    [options]
  )

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const { label, value } = option

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOption === value}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          )
        })
      : null

  const loadingMarkup = loading ? (
    <Listbox.Loading accessibilityLabel="null" />
  ) : null

  const listboxMarkup =
    optionsMarkup || loadingMarkup ? (
      <Listbox onSelect={updateSelection}>
        {optionsMarkup && !loading ? optionsMarkup : null}
        {loadingMarkup}
      </Listbox>
    ) : null

  return (
    <Combobox
      activator={
        <Combobox.TextField
          prefix={<Icon source={SearchMinor} />}
          onChange={updateText}
          label="Search customers"
          labelHidden
          value={inputValue}
          placeholder="Search customers"
          autoComplete="off"
        />
      }
    >
      {listboxMarkup}
    </Combobox>
  )
}

export default LoadingAutocompleteExample
