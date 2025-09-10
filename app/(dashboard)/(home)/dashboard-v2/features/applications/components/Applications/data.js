/*
  Module: Data
  Purpose: Mock/demo data and mapping helpers for this component (suitable for charts/tables).
*/
export const applicationsData = {
  lastUpdated: "16:50:01",
  applications: [
    {
      host: "equify-gcp-k1",
      timestamp: "2025-08-07T16:30:01",
      componentType: "Application",
      name: "EquifyConfig",
      status: "Active",
      cpu: 1.4,
      memory: 89,
      threads: 40,
      heap: 103.69,
      exceededThreshold: true
    },
    {
      host: "equify-gcp-vm2",
      timestamp: "2025-08-07T16:30:01",
      componentType: "Application",
      name: "Equify-API_DBConnector",
      status: "Active",
      cpu: 0.8,
      memory: 2,
      threads: 48,
      heap: 43.93,
      exceededThreshold: false
    },
    {
      host: "equify-gcp-vm3",
      timestamp: "2025-08-07T16:30:01",
      componentType: "Application",
      name: "Equify-DBConnector",
      status: "Active",
      cpu: 2.1,
      memory: 3.8,
      threads: 64,
      heap: 81.46,
      exceededThreshold: false
    },
    {
      host: "equify-gcp-vm4",
      timestamp: "2025-08-07T16:30:01",
      componentType: "Application",
      name: "Equify-Dispatcher-con-airtel",
      status: "Active",
      cpu: 3.6,
      memory: 6.9,
      threads: 136,
      heap: 325.42,
      exceededThreshold: false
    },
    {
      host: "equify-gcp-vm5",
      timestamp: "2025-08-07T16:30:01",
      componentType: "Application",
      name: "Service provider",
      status: "Active",
      cpu: 1.3,
      memory: 2.4,
      threads: 178,
      heap: 45.73,
      exceededThreshold: false
    },
    {
      host: "equify-gcp-vm6",
      timestamp: "2025-08-07T16:30:01",
      componentType: "Application",
      name: "Service provider1",
      status: "Active",
      cpu: 1.3,
      memory: 2.5,
      threads: 191,
      heap: 27.45,
      exceededThreshold: false
    },
    {
      host: "equify-gcp-vm7",
      timestamp: "2025-08-07T16:30:01",
      componentType: "Application",
      name: "NotificationWorker",
      status: "Active",
      cpu: 0.7,
      memory: 1.8,
      threads: 88,
      heap: 12.34,
      exceededThreshold: false
    },
    {
      host: "equify-gcp-vm8",
      timestamp: "2025-08-07T16:30:01",
      componentType: "Application",
      name: "BillingService",
      status: "Inactive",
      cpu: 8.3,
      memory: 65.2,
      threads: 420,
      heap: 256.78,
      exceededThreshold: true
    },
    {
      host: "aws-ecs-app-01",
      timestamp: "2025-08-07T16:30:01",
      componentType: "Application",
      name: "AnalyticsJob",
      status: "Active",
      cpu: 23.6,
      memory: 45.1,
      threads: 111,
      heap: 98.77,
      exceededThreshold: false
    },
    {
      host: "azure-app-02",
      timestamp: "2025-08-07T16:30:01",
      componentType: "Application",
      name: "S3Sync",
      status: "Maintenance",
      cpu: 0.2,
      memory: 0.7,
      threads: 14,
      heap: 3.21,
      exceededThreshold: false
    },
    {
      host: "edge-app-03",
      timestamp: "2025-08-07T16:30:01",
      componentType: "Application",
      name: "EdgeProxy",
      status: "Active",
      cpu: 55.0,
      memory: 72.3,
      threads: 980,
      heap: 512.0,
      exceededThreshold: true
    }
  ]
};

