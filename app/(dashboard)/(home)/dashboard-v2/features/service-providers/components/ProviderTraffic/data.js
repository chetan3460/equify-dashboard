/*
  Module: Data
  Purpose: Mock/demo data and mapping helpers for this component (suitable for charts/tables).
*/
// data.js
export const rawData = {
    "lastUpdated": "01:15:45",

    Airtel: 25,
    Jio: 25,
    VI: 5,
    BSNL: 10,
    Synch: 0,
    "Text Local": 15,
    Equance: 10,
    Infobip: 10,
};

export const data = Object.entries(rawData)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));
