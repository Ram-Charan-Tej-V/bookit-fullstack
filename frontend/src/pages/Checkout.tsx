import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { validatePromo, createBooking } from '../services/api'

export default function Checkout(){
  const nav = useNavigate()
  const { state }: any = useLocation()
  const { experience, slotId } = state || {}
  if (!experience || !slotId) return <div>No booking data. Go back to <a href="/">home</a></div>

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)
  const [loading, setLoading] = useState(false)

  const applyPromo = async () => {
    if (!promo) return;
    const res:any = await validatePromo(promo)
    if (!res.valid) return alert('Invalid code')
    if (res.type === 'percent') setDiscount(Math.round((experience.price * res.value)/100))
    if (res.type === 'flat') setDiscount(res.value)
    alert('Promo applied')
  }

  const submit = async () => {
    if (!name || !email) return alert('Name and email required')
    setLoading(true)
    try{
      const payload = { experience_id: experience.id, slot_id: slotId, name, email, phone, total_price: experience.price - discount }
      const res:any = await createBooking(payload)
      nav('/result', { state: { success: true, booking: res.booking } })
    }catch(err:any){
      console.error(err)
      nav('/result', { state: { success: false, error: err?.response?.data || 'Failed' } })
    }finally{ setLoading(false) }
  }

  return (
    <div className="bg-white p-4 rounded">
      <h3 className="font-bold text-xl">Checkout</h3>
      <div className="mt-3">
        <div className="mb-2">Experience: <b>{experience.title}</b></div>
        <div className="mb-2">Price: ₹{experience.price}</div>
        <div className="mb-2">Discount: ₹{discount}</div>
        <div className="mb-2">Payable: ₹{experience.price - discount}</div>
      </div>

      <div className="mt-3 grid gap-2">
        <input className="border p-2 rounded" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
        <div className="flex gap-2">
          <input className="border p-2 rounded flex-1" placeholder="Promo code" value={promo} onChange={e=>setPromo(e.target.value)} />
          <button onClick={applyPromo} className="bg-blue-600 text-white px-3 rounded">Apply</button>
        </div>
        <div className="flex gap-2">
          <button onClick={submit} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">Confirm & Pay</button>
        </div>
      </div>
    </div>
  )
}
