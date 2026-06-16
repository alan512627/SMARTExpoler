import React, {useState} from "react";

export default function AgentPane(){
  const [input,setInput] = useState('');
  const [log,setLog] = useState([]);
  const [running,setRunning] = useState(false);

  async function startAgent(){
    if(!input) return;
    setRunning(true);
    setLog(prev=>[...prev, {from:'user', text: input}]);
    // Stubbed response (replace with IPC/call to agent backend)
    await new Promise(r=>setTimeout(r,500));
    setLog(prev=>[...prev, {from:'agent', text: `Agent stub executed: ${input}`}]);
    setRunning(false);
  }

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',padding:12}}>
      <div style={{fontWeight:600,marginBottom:8}}>AI Agent (stub)</div>
      <div style={{flex:1,overflow:'auto',background:'#fff',border:'1px solid #eee',padding:8}}>
        {log.map((m,i)=> (
          <div key={i} style={{marginBottom:6}}><strong>{m.from}:</strong> {m.text}</div>
        ))}
      </div>
      <div style={{display:'flex',marginTop:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} style={{flex:1,padding:8}} placeholder="Enter agent command..." />
        <button onClick={startAgent} disabled={running} style={{marginLeft:8}}>Run</button>
      </div>
    </div>
  );
}
