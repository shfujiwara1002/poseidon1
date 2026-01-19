import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, DashboardResponse } from "@shared/routes";

// Mock data for when the backend is unavailable
const mockDashboardData: DashboardResponse = {
  engines: [
    {
      id: 1,
      name: "Protect",
      status: "active",
      score: "0.02",
      metricLabel: "Threat Score",
      metricValue: "0.02%",
      details: "1,248 transactions scanned",
      lastUpdated: new Date(),
    },
    {
      id: 2,
      name: "Grow",
      status: "active",
      score: "98.4",
      metricLabel: "Accuracy",
      metricValue: "98.4%",
      details: "$4,200 projected surplus",
      lastUpdated: new Date(),
    },
    {
      id: 3,
      name: "Optimize",
      status: "optimizing",
      score: "408",
      metricLabel: "Pending Savings",
      metricValue: "$408/yr",
      details: "3 optimizations available",
      lastUpdated: new Date(),
    },
  ],
  recentTransactions: [
    { id: 1, merchant: "Amazon", amount: "142.50", date: new Date(), status: "safe", riskScore: 5 },
    { id: 2, merchant: "Spotify", amount: "9.99", date: new Date(), status: "safe", riskScore: 2 },
    { id: 3, merchant: "Unknown Vendor", amount: "299.00", date: new Date(), status: "suspicious", riskScore: 78 },
    { id: 4, merchant: "Whole Foods", amount: "87.32", date: new Date(), status: "safe", riskScore: 3 },
    { id: 5, merchant: "Netflix", amount: "15.99", date: new Date(), status: "safe", riskScore: 1 },
  ],
  forecasts: [
    { id: 1, month: "Jan", actual: "45000", projected: "45000", lowerBound: "43000", upperBound: "47000" },
    { id: 2, month: "Feb", actual: "47200", projected: "47200", lowerBound: "45000", upperBound: "49400" },
    { id: 3, month: "Mar", actual: null, projected: "49800", lowerBound: "47500", upperBound: "52100" },
    { id: 4, month: "Apr", actual: null, projected: "52100", lowerBound: "49500", upperBound: "54700" },
    { id: 5, month: "May", actual: null, projected: "54800", lowerBound: "52000", upperBound: "57600" },
    { id: 6, month: "Jun", actual: null, projected: "57200", lowerBound: "54200", upperBound: "60200" },
  ],
  pendingActions: [
    { id: 1, type: "subscription_cancel", description: "Cancel unused Hulu subscription", amount: "17.99", status: "pending", date: new Date() },
    { id: 2, type: "fund_transfer", description: "Move $500 to high-yield savings", amount: "500.00", status: "pending", date: new Date() },
    { id: 3, type: "subscription_cancel", description: "Downgrade cloud storage plan", amount: "5.00", status: "pending", date: new Date() },
  ],
  alerts: [
    { id: 1, title: "Unusual Login Attempt", message: "New login detected from San Francisco, CA. If this wasn't you, please review your account security.", severity: "medium", read: false, timestamp: new Date() },
    { id: 2, title: "Large Transaction Flagged", message: "$299.00 charge from Unknown Vendor requires your review.", severity: "high", read: false, timestamp: new Date() },
  ],
};

// GET /api/dashboard
export function useDashboardData() {
  return useQuery({
    queryKey: [api.dashboard.get.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.dashboard.get.path, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        return api.dashboard.get.responses[200].parse(await res.json());
      } catch {
        // Return mock data when backend is unavailable
        console.info("Using mock dashboard data (backend unavailable)");
        return mockDashboardData;
      }
    },
    // Refresh frequently for "live" feel
    refetchInterval: 5000,
  });
}

// GET /api/engines (Individual list if needed, though dashboard covers it)
export function useEngines() {
  return useQuery({
    queryKey: [api.engines.list.path],
    queryFn: async () => {
      const res = await fetch(api.engines.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch engines");
      return api.engines.list.responses[200].parse(await res.json());
    },
  });
}

// POST /api/actions/:id/execute
export function useExecuteAction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.actions.execute.path, { id });
      const res = await fetch(url, {
        method: api.actions.execute.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 404) throw new Error("Action not found");
        throw new Error("Failed to execute action");
      }
      return api.actions.execute.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      // Invalidate dashboard to refresh pending actions list and engine status
      queryClient.invalidateQueries({ queryKey: [api.dashboard.get.path] });
    },
  });
}
