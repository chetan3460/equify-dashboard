/*
  Module: Data
  Purpose: Mock/demo data and mapping helpers for this component (suitable for charts/tables).
*/
// ProviderStatus data and helpers

export const providerStatus = {
  lastUpdated: "01:15:45",
  Airtel: 1,
  Jio: 1,
  Vi: 1,
  BSNL: 0,
  Synch: 1,
  "Text Local": 1,
  Equance: 1,
  Infobip: 0,
};

// Returns a list of { name, status } excluding the lastUpdated field
export function getStatusList(statusMap = providerStatus) {
  return Object.entries(statusMap)
    .filter(([key]) => key !== "lastUpdated")
    .map(([name, status]) => ({ name, status }));
}

