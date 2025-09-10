/*
  Module: Data
  Purpose: Mock/demo data and mapping helpers for this component (suitable for charts/tables).
*/
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
        },
        {
            host: "equify-gcp-pg1",
            timestamp: "2025-08-07T16:30:01",
            componentType: "Database",
            name: "PostgreSQL",
            status: "Inactive",
            cpu: 27.2,
            memory: 41.3,
            connections: 120,
            exceededThreshold: false
        },
        {
            host: "aws-mongo-01",
            timestamp: "2025-08-07T16:30:01",
            componentType: "Database",
            name: "MongoDB",
            status: "Active",
            cpu: 70.5,
            memory: 82.1,
            connections: 1024,
            exceededThreshold: true
        },
        {
            host: "azure-ora-01",
            timestamp: "2025-08-07T16:30:01",
            componentType: "Database",
            name: "Oracle",
            status: "Maintenance",
            cpu: 3.8,
            memory: 15.9,
            connections: 12,
            exceededThreshold: false
        },
        {
            host: "equify-gcp-mdb2",
            timestamp: "2025-08-07T16:30:01",
            componentType: "Database",
            name: "MariaDB",
            status: "ACTIVE",
            cpu: 0.1,
            memory: 2.4,
            connections: 5,
            exceededThreshold: false
        },
        {
            host: "local-sqlite",
            timestamp: "2025-08-07T16:30:01",
            componentType: "Database",
            name: "SQLite",
            status: "Active",
            cpu: 0.0,
            memory: 0.1,
            connections: 1,
            exceededThreshold: false
        },
        {
            host: "aws-cas-03",
            timestamp: "2025-08-07T16:30:01",
            componentType: "Database",
            name: "Cassandra",
            status: "Inactive",
            cpu: 55.0,
            memory: 73.4,
            connections: 640,
            exceededThreshold: true
        },
        {
            host: "ibm-db2-01",
            timestamp: "2025-08-07T16:30:01",
            componentType: "Database",
            name: "DB2",
            status: "Active",
            cpu: 42.0,
            memory: 68.0,
            connections: 333,
            exceededThreshold: false
        },
        {
            host: "cloud-snow-01",
            timestamp: "2025-08-07T16:30:01",
            componentType: "Database",
            name: "Snowflake",
            status: "Active",
            cpu: 12.3,
            memory: 34.5,
            connections: 210,
            exceededThreshold: false
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
