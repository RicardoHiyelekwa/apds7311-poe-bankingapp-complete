import React, { useEffect, useState, useRef } from 'react';
export default function CustomerDashboard(){
  const [amount,setAmount]=useState('500.00');
  const [swift,setSwift]=useState('ABSAZAJJ');
  const [account,setAccount]=useState('1234567890');
  const [msg,setMsg]=useState(null);
  const [txs,setTxs]=useState([]);
  const [notes,setNotes]=useState([]);
  const pollRef = useRef(null);

  async function load(){
    try{
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/transactions/mine`, { credentials:'include' });
      const j = await res.json();
      if(res.ok) setTxs(j.transactions || []);
    }catch(e){ console.error(e); }
  }

  async function create(e){
    e.preventDefault(); setMsg(null);
    try{
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/transactions`, {
        method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ amount, swift, beneficiaryAccount: account })
      });
      const j = await res.json();
      if(res.ok){ setMsg({type:'success', text:'Created'}); load(); }
      else setMsg({type:'danger', text: j.error || JSON.stringify(j)});
    }catch(e){ setMsg({type:'danger', text:e.message}); }
  }

  async function poll(){
    try{
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/transactions/notifications`, { credentials:'include' });
      const j = await res.json();
      if(res.ok && j.notifications && j.notifications.length>0) setNotes(j.notifications);
    }catch(e){ console.error(e); }
  }

  useEffect(()=>{ load(); poll(); pollRef.current=setInterval(poll,5000); return ()=>clearInterval(pollRef.current); },[]);

  return (
    <div className="row">
      <div className="col-md-8">
        <h4>Your Dashboard</h4>
        <form onSubmit={create} className="mt-3">
          <div className="mb-3"><label>Amount (ZAR)</label><input className="form-control" value={amount} onChange={e=>setAmount(e.target.value)} /></div>
          <div className="mb-3"><label>SWIFT</label><input className="form-control" value={swift} onChange={e=>setSwift(e.target.value)} /></div>
          <div className="mb-3"><label>Beneficiary Account</label><input className="form-control" value={account} onChange={e=>setAccount(e.target.value)} /></div>
          <button className="btn btn-success">Create</button>
          {msg && <div className={`alert alert-${msg.type} mt-3`}>{msg.text}</div>}
        </form>
        <hr/>
        <h5>Your Transactions</h5>
        <div className="list-group mt-3">{txs.map(t=>(<div key={t._id} className="list-group-item"><div><strong>{t._id}</strong> <span className="small-muted">- {t.status}</span></div><div className="small-muted">Amount: {t.amount} {t.currency}</div><div className="small-muted">SWIFT: {t.swift}</div></div>))}</div>
      </div>
      <div className="col-md-4">
        <h5>Notifications</h5>
        {notes.length===0 && <div className="small-muted">No notifications</div>}
        {notes.map(n=>(<div key={n._id} className="alert alert-info">Transaction {n._id} is now <strong>{n.status}</strong></div>))}
      </div>
    </div>
  );
}
