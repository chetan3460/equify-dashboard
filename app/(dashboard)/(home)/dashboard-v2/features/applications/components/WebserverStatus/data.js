export const webservers = {
    lastUpdated: "16:50:01",
    rows: [
        { service: "SMS API", host: "equify-gcp-k1", statusCode: 200, status: "Active" },
        { service: "DLR Webhook", host: "equify-gcp-k2", statusCode: 403, status: "Inactive" },
        { service: "Portal UI", host: "equify-gcp-web1", statusCode: 301, status: "Active" },
        { service: "Admin API", host: "aws-web-01", statusCode: 500, status: "Degraded" },
        { service: "Docs", host: "aws-web-02", statusCode: 404, status: "Inactive" },
        { service: "Auth Service", host: "azure-web-01", statusCode: 200, status: "Active" },
        { service: "Metrics", host: "azure-web-02", statusCode: 204, status: "Maintenance" },
        { service: "Internal Proxy", host: "gcp-web-03", statusCode: 502, status: "Inactive" },
        { service: "CDN Edge", host: "edge-pop-01", statusCode: 200, status: "Active" },
        { service: "Notification API", host: "gcp-web-04", statusCode: 429, status: "Active" },
    ],
}
