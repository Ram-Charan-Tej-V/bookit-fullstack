import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function Result(){
  const { state }: any = useLocation()
  if (!state) return <div>No result</div>
  if (!state.success) return (
    <div className="bg-white p-4 rounded">
      <h3 className="text-xl font-bold">Booking failed</h3>
      <div className="mt-2">{JSON.stringify(state.error)}</div>
      <Link to="/">Back to home</Link>
    </div>
  )

  const booking = state.booking
  return (
    <div className="bg-white p-4 rounded">
      <h3 className="text-xl font-bold">Booking confirmed</h3>
      <div className="mt-2">Booking ID: {booking.id}</div>
      <div className="mt-1">Name: {booking.name}</div>
      <div className="mt-1">Email: {booking.email}</div>
      <div className="mt-1">Total: ₹{booking.total_price}</div>
      <Link to="/">Back to home</Link>
    </div>
  )
}
