import { CornerUpLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const KBackHistory: React.FC = () => {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate('/admin')}>
      <CornerUpLeft className="size-5" style={{ marginRight: '8px' }} />
    </button>
  )
}
