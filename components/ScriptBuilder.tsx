"use client";

import { useMemo, useState } from 'react';
import { generateScript, type Language, type ScriptOptions } from '@/lib/generators';

const defaultOptions: ScriptOptions = {
  scriptName: '',
  description: '',
  parseArgs: true,
  readEnv: false,
  httpRequest: false,
  writeFile: false,
  loopArgs: false,
  coloredOutput: true,
};

export default function ScriptBuilder() {
  const [language, setLanguage] = useState<Language>('bash');
  const [opts, setOpts] = useState<ScriptOptions>(defaultOptions);

  const code = useMemo(() => generateScript(language, opts), [language, opts]);

  const download = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ext = language === 'bash' ? '.sh' : language === 'python' ? '.py' : '.mjs';
    const name = (opts.scriptName?.trim() || 'script') + ext;
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <div className="grid">
      <div className="card">
        <div className="row">
          <div>
            <label className="label">????????? ?? ???</label>
            <input className="input" placeholder="???: data-tool" value={opts.scriptName}
              onChange={(e) => setOpts({ ...opts, scriptName: e.target.value })} />
          </div>
          <div>
            <label className="label">???? (Language)</label>
            <select className="select" value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
              <option value="bash">Bash</option>
              <option value="python">Python</option>
              <option value="node">Node.js</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <label className="label">????? (Description)</label>
          <textarea className="textarea" rows={3} placeholder="???? ????????? ???? ??????"
            value={opts.description}
            onChange={(e) => setOpts({ ...opts, description: e.target.value })} />
        </div>

        <hr />
        <div className="options">
          <label className="label">?????? ?????</label>
          <div className="option">
            <input type="checkbox" checked={opts.parseArgs} onChange={(e) => setOpts({ ...opts, parseArgs: e.target.checked })} />
            <span>??????????? ????? ???? (-n, --flag, help)</span>
          </div>
          <div className="option">
            <input type="checkbox" checked={opts.readEnv} onChange={(e) => setOpts({ ...opts, readEnv: e.target.checked })} />
            <span>ENV ??????? ????? (API_TOKEN)</span>
          </div>
          <div className="option">
            <input type="checkbox" checked={opts.httpRequest} onChange={(e) => setOpts({ ...opts, httpRequest: e.target.checked })} />
            <span>HTTP ????????? ???? (httpbin.org)</span>
          </div>
          <div className="option">
            <input type="checkbox" checked={opts.writeFile} onChange={(e) => setOpts({ ...opts, writeFile: e.target.checked })} />
            <span>???? ????? (output.txt)</span>
          </div>
          <div className="option">
            <input type="checkbox" checked={opts.loopArgs} onChange={(e) => setOpts({ ...opts, loopArgs: e.target.checked })} />
            <span>??????????? ?? ???</span>
          </div>
          <div className="option">
            <input type="checkbox" checked={opts.coloredOutput} onChange={(e) => setOpts({ ...opts, coloredOutput: e.target.checked })} />
            <span>????? ??????</span>
          </div>
        </div>

        <div className="btns" style={{ marginTop: 16 }}>
          <button className="button" onClick={download}>???????</button>
          <button className="button secondary" onClick={copy}>????</button>
          <span className="badge small">?????? ???????</span>
        </div>
      </div>

      <div className="card codeWrap">
        <button className="button secondary copy" onClick={copy}>????</button>
        <pre className="code" aria-label="Code preview">{code}</pre>
      </div>
    </div>
  );
}
