import React, { useState } from 'react';
export default function LoginCustomer(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [msg,setMsg]=useState(null);
  async function submit(e){ e.preventDefault(); setMsg(null);
    try{
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/auth/login-customer`, {
        method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ email, password })
      });
      const j = await res.json();
      if(res.ok){ setMsg({type:'success', text:'Login successful'}); window.location.href='/customer'; }
      else setMsg({type:'danger', text: j.error || JSON.stringify(j)});
    }catch(e){ setMsg({type:'danger', text: e.message}); }
  }
  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Customer Login</h4>
        <form onSubmit={submit} className="mt-3">
          <div className="mb-3"><label>Email</label><input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div className="mb-3"><label>Password</label><input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} /></div>
          <button className="btn btn-primary">Login</button>
          {msg && <div className={`alert alert-${msg.type} mt-3`}>{msg.text}</div>}
        </form>
      </div>
    </div>
  );
}
