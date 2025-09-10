/*
  Module: Data
  Purpose: Mock/demo data and mapping helpers for this component (suitable for charts/tables).
*/
export function getChartData(period, smsData) {
  switch (period) {
    case "Today":
      return [
        { time: "10:00", total: 45000, delivered: 38000, failed: 7000, retry: 0 },
        { time: "11:00", total: 89000, delivered: 72000, failed: 17000, retry: 0 },
        {
          time: "12:00",
          total: smsData?.["12:00"]?.total || 155130,
          delivered: smsData?.["12:00"]?.delivered || 77434,
          failed: smsData?.["12:00"]?.failed || 22575,
          retry: smsData?.["12:00"]?.retry || 55121,
        },
        {
          time: "13:00",
          total: smsData?.["13:00"]?.total || 155130,
          delivered: smsData?.["13:00"]?.delivered || 77434,
          failed: smsData?.["13:00"]?.failed || 22575,
          retry: smsData?.["13:00"]?.retry || 55121,
        },
        {
          time: "14:00",
          total: smsData?.["14:00"]?.total || 155130,
          delivered: smsData?.["14:00"]?.delivered || 77434,
          failed: smsData?.["14:00"]?.failed || 22575,
          retry: smsData?.["14:00"]?.retry || 55121,
        },
        {
          time: "15:00",
          total: smsData?.["15:00"]?.total || 155130,
          delivered: smsData?.["15:00"]?.delivered || 77434,
          failed: smsData?.["15:00"]?.failed || 22575,
          retry: smsData?.["15:00"]?.retry || 55121,
        },
        { time: "16:00", total: 140000, delivered: 110000, failed: 30000, retry: 55121 },
        { time: "17:00", total: 95000, delivered: 78000, failed: 17000, retry: 12200 },
      ];
    case "This week":
      return [
        { time: "Mon", total: 280000, delivered: 260000, failed: 20000, retry: 15000 },
        { time: "Tue", total: 320000, delivered: 300000, failed: 20000, retry: 18000 },
        { time: "Wed", total: 290000, delivered: 270000, failed: 20000, retry: 16000 },
        { time: "Thu", total: 350000, delivered: 330000, failed: 20000, retry: 22000 },
        { time: "Fri", total: 420000, delivered: 400000, failed: 20000, retry: 28000 },
        { time: "Sat", total: 220000, delivered: 210000, failed: 10000, retry: 14000 },
        { time: "Sun", total: 180000, delivered: 170000, failed: 10000, retry: 12000 },
      ];
    case "This month":
      return [
        { time: "Week 1", total: 1850000, delivered: 1720000, failed: 130000, retry: 280000 },
        { time: "Week 2", total: 2120000, delivered: 1980000, failed: 140000, retry: 320000 },
        { time: "Week 3", total: 1980000, delivered: 1850000, failed: 130000, retry: 290000 },
        { time: "Week 4", total: 2350000, delivered: 2210000, failed: 140000, retry: 350000 },
      ];
    default:
      return [];
  }
}

