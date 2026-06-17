import React, { useState } from "react";
import FileList from "./components/FileList";
import TabView from "./components/TabView";
import AgentPane from "./components/AgentPane";

function makeId(){ return Math.random().toString(36).slice(2,9); }

export default function App(){
  const sampleFiles = [
    { path: 'C:/example/logs/app.log', name: 'app.log', size: '12 KB' },
    { path: 'C:/example/readme.txt', name: 'readme.txt', size: '1 KB' },
    { path: 'C:/example/config.json', name: 'config.json', size: '2 KB' }
  ];

  const [files] = useState(sampleFiles);
  const [tabs,setTabs] = useState([]);
  const [active,setActive] = useState(null);
  const [showAgent,setShowAgent] = useState(false);

  async function openFile(file){
    const existing = tabs.find(t=>t.path===file.path);
    if(existing){ setActive(existing.id); return; }
    const id = makeId();
    const placeholder = `Loading ${file.name}...`;
    const newTab = { id, title: file.name, path: file.path, content: placeholder };
    setTabs(prev=>[...prev,newTab]);
    setActive(id);

    // attempt to read via Electron API if available
    if(window.api && window.api.readFile){
      try{
        const res = await window.api.readFile(file.path);
        if(res && res.ok){
          setTabs(prev=>prev.map(t=> t.id===id ? {...t, content: res.content} : t));
        } else {
          setTabs(prev=>prev.map(t=> t.id===id ? {...t, content: `Error reading file: ${res && res.error ? res.error : 'unknown'}`} : t));
        }
      } catch(e){
        setTabs(prev=>prev.map(t=> t.id===id ? {...t, content: `Exception: ${e.message}`} : t));
      }
    } else {
      // not running in Electron; keep placeholder
      setTabs(prev=>prev.map(t=> t.id===id ? {...t, content: `Preview not available in browser. Path: ${file.path}`} : t));
    }
  }

  function closeTab(id){
    setTabs(prev=>{
      const n = prev.filter(t=>t.id!==id);
      if(n.length===0){ setActive(null); return n }
      if(id===active){ setActive(n[n.length-1].id) }
      return n;
    });
  }

  function duplicateTab(id){
    const t = tabs.find(x=>x.id===id);
    if(!t) return;
    const copy = { ...t, id: makeId(), title: t.title + ' (copy)' };
    setTabs(prev=>[...prev,copy]);
    setActive(copy.id);
  }

  return (
    <div style={{display:'flex',height:'100vh'}}>
      <div style={{width:300,borderRight:'1px solid #e6e6e6',overflow:'auto'}}>
        <FileList files={files} onOpen={openFile} />
      </div>
      <div style={{flex:1,display:'grid',gridTemplateColumns: showAgent ? '1fr 360px' : '1fr', gap:0}}>
        <div style={{borderRight: showAgent ? '1px solid #e6e6e6' : 'none'}}>
          <TabView tabs={tabs} activeId={active} onSelect={setActive} onClose={closeTab} onDuplicate={duplicateTab} />
        </div>
        {showAgent && (
          <div style={{background:'#f7f9fb'}}>
            <AgentPane />
          </div>
        )}
      </div>
      <div style={{position:'fixed',right:12,bottom:12}}>
        <button onClick={()=>setShowAgent(s=>!s)}>{showAgent ? 'Hide Agent' : 'Show Agent'}</button>
      </div>
    </div>
  );
}
