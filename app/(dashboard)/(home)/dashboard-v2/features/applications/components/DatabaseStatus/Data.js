export const databaseData = {
    lastUpdated: "16:50:01",
    database: [
        {
            host: "equify-gcp-k1",
            timestamp: "2025-08-07T16:30:01",
            componentType: "Database",
            name: "MySQL",
            status: "active",
            cpu: 1,
            memory: 7,
            connections: 89,
            exceededThreshold: false
        },
        {
            host: "equify-gcp-vm6",
            timestamp: "2025-08-07T16:30:01",
            componentType: "Database",
            name: "ClickHouse",
            status: "activating",
            cpu: 9.1,
            memory: 7.9,
            connections: 0,
            exceededThreshold: true
        }
    ]
}

export const ioDetails = {
    lastUpdated: "16:50:01",
    database: [
        {
            type: "Input DB",
            name: "MySQL",
            records: 30001,
            exceededThreshold: true
        },
        {
            type: "Output DB",
            name: "MSSQL",
            records: 300000,
            exceededThreshold: false
        }
    ]
}
