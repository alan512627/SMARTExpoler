import React from "react";

export default function TabView({ tabs, activeId, onSelect, onClose, onDuplicate }){
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
      <div style={{display:'flex',borderBottom:'1px solid #ddd',background:'#fafafa'}}>
        {tabs.map(tab => (
          <div key={tab.id} onClick={() => onSelect(tab.id)}
            style={{padding:'8px 12px',cursor:'pointer',borderRight:'1px solid #eee',background: tab.id===activeId? '#fff':'transparent'}}>
            <strong style={{fontSize:13}}>{tab.title}</strong>
            <button onClick={(e)=>{e.stopPropagation(); onDuplicate(tab.id)}} style={{marginLeft:8}}>⎘</button>
            <button onClick={(e)=>{e.stopPropagation(); onClose(tab.id)}} style={{marginLeft:6}}>✕</button>
          </div>
        ))}
      </div>
      <div style={{flex:1,overflow:'auto',padding:12}}>
        {tabs.length===0 && <div style={{color:'#666'}}>No open tabs — open a file from the left.</div>}
        {tabs.map(tab => tab.id===activeId && (
          <div key={tab.id} style={{height:'100%'}}>
            <div style={{marginBottom:8,color:'#333',fontSize:12}}>Path: {tab.path}</div>
            <textarea value={tab.content} readOnly style={{width:'100%',height:'calc(100% - 40px)',fontFamily:'monospace',fontSize:13}} />
          </div>
        ))}
      </div>
    </div>
  );
}
