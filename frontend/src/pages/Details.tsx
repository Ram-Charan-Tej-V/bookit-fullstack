import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getExperience } from '../services/api'

export default function Details(){
  const { id } = useParams();
  const [exp, setExp] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const navigate = useNavigate()

  useEffect(()=>{ if (!id) return; getExperience(Number(id)).then(d=>{ setExp(d); setLoading(false) }) },[id])

  if (loading) return <div>Loading...</div>
  if (!exp) return <div>Not found</div>

  return (
    <div className="bg-white rounded p-4">
      <img src={exp.image} className="w-full h-56 object-cover rounded" />
      <h2 className="text-2xl font-bold mt-3">{exp.title}</h2>
      <p className="mt-2">{exp.description}</p>
      <div className="mt-4">
        <h4 className="font-semibold">Available slots</h4>
        <div className="grid gap-2 mt-2">
          {exp.slots.map((s:any)=> (
            <button key={s.id} onClick={()=> setSelectedSlot(s.id)} className={`p-2 border rounded text-left ${selectedSlot===s.id?'border-blue-600':''}`}>
              <div>{s.slot_date} {s.slot_time}</div>
              <div className="text-sm">Capacity: {s.capacity}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button disabled={!selectedSlot} onClick={()=> {
          navigate('/checkout', { state: { experience: exp, slotId: selectedSlot } })
        }} className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50">Proceed to checkout</button>
      </div>
    </div>
  )
}
