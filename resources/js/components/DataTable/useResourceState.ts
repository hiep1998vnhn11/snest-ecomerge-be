import { useState, useCallback, useEffect } from 'react'

export function useIndexResourceState<T extends { id: number }>(data: T[]) {
  const [allResourcesSelected, setAllResourcesSelected] = useState(false)
  const [selectedResources, setSelectedResources] = useState<number[]>([])
  useEffect(() => {
    setAllResourcesSelected(false)
    setSelectedResources([])
  }, [data])
  const handleSelectionChange = useCallback(
    (selectionType: string, toggleType: boolean, selection?: number) => {
      if (selectionType === 'page' || selectionType === 'all') {
        if (toggleType) {
          setSelectedResources(data.map((item) => item.id))
          setAllResourcesSelected(true)
        } else {
          setAllResourcesSelected(false)
          setSelectedResources([])
        }
      } else {
        if (!selection) return
        if (toggleType) {
          setSelectedResources([...selectedResources, selection])
        } else {
          setSelectedResources(
            selectedResources.filter((item) => item !== selection)
          )
        }
      }
    },
    [allResourcesSelected, selectedResources]
  )

  const removeSelected = useCallback(
    (selection: number) => {
      setSelectedResources(
        selectedResources.filter((item) => item !== selection)
      )
    },
    [selectedResources]
  )

  return {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    removeSelected,
  }
}
