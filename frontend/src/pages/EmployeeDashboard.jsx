import React, { useEffect, useState } from 'react';
export default function EmployeeDashboard(){
  const [txs,setTxs]=useState([]);
  const [msg,setMsg]=useState(null);
  async function load(){ try{ const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/transactions/pending`, { credentials:'include' }); const j=await res.json(); if(res.ok) setTxs(j.transactions||[]); }catch(e){ console.error(e); } }
  async function act(id, a){ try{ const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/transactions/${id}/${a}`, { method:'PUT', credentials:'include' }); const j=await res.json(); if(res.ok){ setMsg({type:'success', text:j.message}); load(); } else setMsg({type:'danger', text: j.error || JSON.stringify(j)}); }catch(e){ setMsg({type:'danger', text:e.message}); } }
  useEffect(()=>{ load(); },[]);
  return (
    <div>
      <h4>Employee - Pending</h4>
      {msg && <div className={`alert alert-${msg.type} mt-3`}>{msg.text}</div>}
      <div className="list-group mt-3">{txs.length===0 && <div className="small-muted">No pending</div>}{txs.map(t=>(<div key={t._id} className="list-group-item d-flex justify-content-between align-items-start"><div><div><strong>{t._id}</strong> <span className="small-muted">- {t.status}</span></div><div className="small-muted">Customer: {t.customerName}</div><div className="mt-1">Amount: {t.amount} {t.currency} | SWIFT: {t.swift}</div></div><div className="btn-group"><button className="btn btn-sm btn-outline-primary" onClick={()=>act(t._id,'approve')}>Approve</button><button className="btn btn-sm btn-outline-danger" onClick={()=>act(t._id,'reject')}>Reject</button><button className="btn btn-sm btn-outline-success" onClick={()=>act(t._id,'submit')}>Submit</button></div></div>))}</div>
    </div>
  );
}
