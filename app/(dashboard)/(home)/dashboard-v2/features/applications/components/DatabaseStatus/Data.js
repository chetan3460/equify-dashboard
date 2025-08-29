export const databaseData = {
    lastUpdated: "16:50:01",
    rows: [
        {
            key: "mysql",
            name: "MySQL",
            host: "equify-gcp-k1",
            cpu: 8.5,
            memory: 55.0,
            connections: 37,
            status: "Active",
            exceededThreshold: false,
        },
        {
            key: "clickhouse",
            name: "ClickHouse",
            host: "equify-gcp-k2",
            cpu: 45.6,
            memory: 40.6,
            connections: 65,
            status: "Inactive",
            exceededThreshold: false,
        },
    ],
}

export const ioDetails = {
    lastUpdated: "16:50:01",
    database: [
        { type: "Input DB", name: "MySQL", records: 30000, exceededThreshold: true },
        { type: "Output DB", name: "MSSQL", records: 300000, exceededThreshold: false },
    ],
}
