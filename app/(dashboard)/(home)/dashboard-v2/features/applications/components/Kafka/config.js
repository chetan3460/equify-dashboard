// ./config.js
// export const columns = {
//     name: { key: "name", label: "Name" },
//     host: { key: "host", label: "Host" },
//     cpu: { key: "cpu", label: "CPU %" },
//     memory: { key: "memory", label: "Memory %" },
//     threads: { key: "threads", label: "Threads" },
//     connections: { key: "connections", label: "Connections" },
//     heap: { key: "heap", label: "Heap (MB)" },
//     health: { key: "health", label: "Health" },
//     status: { key: "status", label: "Status" },
// };

// export const topicBatchSize = 20; // or whatever number you want
// ./config.js
export const columns = {
    name: { label: "Name" },
    host: { label: "Host" },
    cpu: { label: "CPU %" },
    memory: { label: "Memory %" },
    threads: { label: "Threads" },
    connections: { label: "Connections" },
    heapMb: { label: "Heap (MB)" },
    health: { label: "Health" },
    status: { label: "Status" },
};

export const topicBatchSize = 20;
