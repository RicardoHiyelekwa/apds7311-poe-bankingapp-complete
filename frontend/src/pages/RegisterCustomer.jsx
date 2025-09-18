import React, { useState } from 'react';
export default function RegisterCustomer(){
  const [fullName,setFullName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [msg,setMsg]=useState(null);
  async function submit(e){
    e.preventDefault(); setMsg(null);
    try{
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/auth/register-customer`, {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ fullName, email, password })
      });
      const j = await res.json();
      if(res.ok) { setMsg({type:'success', text:'Registration successful'}); window.location.href='/login-customer'; }
      else setMsg({type:'danger', text: j.error || JSON.stringify(j)});
    }catch(e){ setMsg({type:'danger', text:e.message}); }
  }
  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Customer Registration</h4>
        <form onSubmit={submit} className="mt-3">
          <div className="mb-3"><label>Full name</label><input className="form-control" value={fullName} onChange={e=>setFullName(e.target.value)} required/></div>
          <div className="mb-3"><label>Email</label><input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
          <div className="mb-3"><label>Password</label><input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
          <button className="btn btn-primary">Register</button>
          {msg && <div className={`alert alert-${msg.type} mt-3`}>{msg.text}</div>}
        </form>
      </div>
      <div className="col-md-6 d-none d-md-block"><h5>Why register?</h5><p className="small-muted">Create an account to manage payments.</p></div>
    </div>
  );
}
