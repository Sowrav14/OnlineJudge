export function generateShortUUID(): string {
    return Math.random().toString(36).substring(2, 10);
}

export function getCurrentTime() : string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const statusMap: Record<string, { label: string; color: string }> = {
    'AC': { label: "Accepted", color: "text-green-500" },
    'WA': { label: "Wrong Answer", color: "text-red-500" },
    'TLE': { label: "Time Limit Exceeded", color: "text-yellow-500" },
    'MLE': { label: "Memory Limit Exceeded", color: "text-purple-500" },
    'RE': { label: "Runtime Error", color: "text-orange-500" },
    'CE': { label: "Compilation Error", color: "text-pink-500" },
    'Queued': { label: "Queued", color: "text-blue-500" },
};

export function getVerdictColor(status : string){
    const color = statusMap[status]?.color || 'text-cyan-400';
    return color;
}
export function getVerdictLabel(status:string){
    const label = statusMap[status]?.label || status;
    return label;
}