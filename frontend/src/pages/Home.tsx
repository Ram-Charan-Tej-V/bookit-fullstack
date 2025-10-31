import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getExperiences } from '../services/api'

export default function Home(){
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ getExperiences().then((d)=>{ setList(d); setLoading(false) }) },[])

  if (loading) return <div>Loading experiences...</div>
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {list.map(e => (
        <div key={e.id} className="bg-white rounded shadow p-4">
          <img src={e.image} alt={e.title} className="h-40 w-full object-cover rounded" />
          <h3 className="font-bold text-lg mt-2">{e.title}</h3>
          <p className="text-sm mt-1">{e.description}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="text-lg font-semibold">₹{e.price}</div>
            <Link to={`/experience/${e.id}`} className="bg-blue-600 text-white px-3 py-1 rounded">View</Link>
          </div>
        </div>
      ))}
    </div>
  )
}
