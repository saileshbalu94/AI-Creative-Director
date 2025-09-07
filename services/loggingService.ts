interface LogEntry {
  timestamp: string;
  context: string;
  data: any;
}

const logs: LogEntry[] = [];

export const addLog = (context: string, data: any) => {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    context,
    data,
  };
  logs.push(entry);
  console.log(`[LOG] ${context}`, data); // Also log to console for real-time debugging
};

export const getLogsAsString = (): string => {
    if (logs.length === 0) {
        return "No logs have been recorded yet.";
    }
    return logs.map(entry =>
        `==================================================\n[${entry.timestamp}] - ${entry.context}\n==================================================\n${JSON.stringify(entry.data, null, 2)}\n\n`
    ).join('');
}

export const downloadLogs = () => {
  const logData = getLogsAsString();
  const blob = new Blob([logData], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `creative-director-logs-${new Date().toISOString().slice(0,19).replace('T', '_').replace(/:/g, '-')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
