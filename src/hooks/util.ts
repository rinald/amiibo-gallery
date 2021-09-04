import { useRef, useEffect } from 'react'

// used to avoid running effect on initial mount
const useDidMount = () => {
  const mountRef = useRef(false)

  useEffect(() => {
    mountRef.current = true
  }, [])

  return mountRef.current
}

export { useDidMount }
